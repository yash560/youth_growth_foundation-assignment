export interface AnomalyFlow {
  id: string;
  timestamp: string;
  srcIp: string;
  dstIp: string;
  protocol: 'TCP' | 'UDP' | 'ICMP';
  packetSize: number;
  interArrivalMs: number;
  mseLoss: number;
  isolationScore: number;
  status: 'benign' | 'anomaly' | 'mitigated';
  type: string;
}

export function generateSyntheticFlows(count: number = 10): AnomalyFlow[] {
  const types = [
    { name: 'Benign HTTPS Stream', isAnomaly: false, size: [400, 1400], jitter: [10, 45], loss: [0.005, 0.025], iso: [0.35, 0.85] },
    { name: 'Benign Database Sync', isAnomaly: false, size: [1200, 1500], jitter: [5, 20], loss: [0.008, 0.030], iso: [0.40, 0.90] },
    { name: 'SYN-Flood Micro-Burst', isAnomaly: true, size: [40, 60], jitter: [0.2, 1.5], loss: [0.075, 0.145], iso: [-0.92, -0.65] },
    { name: 'Adversarial Evasion Probe', isAnomaly: true, size: [512, 600], jitter: [15, 22], loss: [0.088, 0.160], iso: [-0.85, -0.55] },
    { name: 'DNS Amplification Ingress', isAnomaly: true, size: [1200, 3000], jitter: [1, 4], loss: [0.095, 0.180], iso: [-0.95, -0.70] }
  ];

  const flows: AnomalyFlow[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const isSpecial = i % 4 === 0;
    const t = isSpecial ? types[Math.floor(Math.random() * (types.length - 2)) + 2] : types[Math.floor(Math.random() * 2)];

    const packetSize = Math.floor(t.size[0] + Math.random() * (t.size[1] - t.size[0]));
    const interArrivalMs = parseFloat((t.jitter[0] + Math.random() * (t.jitter[1] - t.jitter[0])).toFixed(2));
    const mseLoss = parseFloat((t.loss[0] + Math.random() * (t.loss[1] - t.loss[0])).toFixed(4));
    const isolationScore = parseFloat((t.iso[0] + Math.random() * (t.iso[1] - t.iso[0])).toFixed(3));

    flows.push({
      id: `FL-${(now - i * 3200).toString().slice(-6)}`,
      timestamp: new Date(now - i * 2000).toLocaleTimeString(),
      srcIp: t.isAnomaly ? `198.51.100.${Math.floor(Math.random() * 200 + 10)}` : `10.254.1.${Math.floor(Math.random() * 100 + 10)}`,
      dstIp: '10.254.0.2',
      protocol: t.name.includes('DNS') ? 'UDP' : 'TCP',
      packetSize,
      interArrivalMs,
      mseLoss,
      isolationScore,
      status: t.isAnomaly ? 'anomaly' : 'benign',
      type: t.name
    });
  }

  return flows;
}
