export interface CongestionDataPoint {
  timeSec: number;
  actualGbps: number | null;
  lstmPredictedGbps: number;
  rnnPredictedGbps: number;
  bufferOccupancyPct: number;
  rttMs: number;
  isCongested: boolean;
}

export interface SpectrogramCell {
  freqKhz: number;
  timeSec: number;
  intensity: number; // 0 to 1
}

export function generateCongestionTimeSeries(): {
  history: CongestionDataPoint[];
  spectrogram: SpectrogramCell[];
} {
  const history: CongestionDataPoint[] = [];
  const linkCapacity = 100; // Gbps

  for (let t = -60; t <= 60; t += 5) {
    const isFuture = t > 0;
    const baseWave = 50 + 25 * Math.sin(t / 15) + 12 * Math.cos(t / 7);
    const burst = t >= 10 && t <= 45 ? 20 * Math.exp(-Math.pow((t - 25) / 12, 2)) : 0;
    const total = Math.min(linkCapacity, Math.max(10, baseWave + burst + (Math.sin(t * 3) * 3)));

    const actual = isFuture ? null : parseFloat(total.toFixed(1));
    const lstmPred = parseFloat((total * (1 + (isFuture ? (Math.sin(t / 4) * 0.04) : 0.01))).toFixed(1));
    const rnnPred = parseFloat((total * (1 + (isFuture ? (Math.sin(t / 2) * 0.09) : 0.02))).toFixed(1));
    const buffer = Math.min(100, parseFloat(((total / linkCapacity) * 100 * (total > 80 ? 1.2 : 0.85)).toFixed(1)));
    const rtt = parseFloat((8.5 + (buffer > 70 ? (buffer - 70) * 1.5 : 0)).toFixed(1));

    history.push({
      timeSec: t,
      actualGbps: actual,
      lstmPredictedGbps: lstmPred,
      rnnPredictedGbps: rnnPred,
      bufferOccupancyPct: buffer,
      rttMs: rtt,
      isCongested: total > 82
    });
  }

  // Generate 8x12 STFT spectrogram cells (Frequency vs Time)
  const spectrogram: SpectrogramCell[] = [];
  const freqs = [1, 2, 4, 8, 16, 32, 64, 128]; // kHz
  for (let tIdx = 0; tIdx < 12; tIdx++) {
    const timeSec = -60 + tIdx * 10;
    for (let fIdx = 0; fIdx < freqs.length; fIdx++) {
      const f = freqs[fIdx];
      // Micro-burst energy spikes around t=10..30s at higher frequencies
      let energy = 0.15 + 0.25 * Math.sin(tIdx / 2) * Math.cos(fIdx / 2);
      if (timeSec >= 0 && timeSec <= 40 && f >= 16) {
        energy += 0.55;
      }
      spectrogram.push({
        freqKhz: f,
        timeSec,
        intensity: Math.min(1.0, Math.max(0.05, parseFloat(energy.toFixed(2))))
      });
    }
  }

  return { history, spectrogram };
}
