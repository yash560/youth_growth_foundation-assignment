'use client';

import React, { useState } from 'react';
import { Activity, Clock, Waves, Cpu, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { generateCongestionTimeSeries } from '@/lib/congestion-engine';

export default function CongestionPredictor() {
  const [horizon, setHorizon] = useState<number>(60);
  const data = generateCongestionTimeSeries();

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/80">
                <Activity className="w-5 h-5" />
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Time-Series Congestion Prediction: LSTM vs RNN vs STFT Spectrogram CNN
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Demonstrates the three valid neural network techniques for predicting network congestion from sequential flow data: (1) Long Short-Term Memory (LSTM) with gating units, (2) Recurrent Neural Networks (RNN), and (3) Convolutional Neural Networks (CNN) applied to 2D Short-Time Fourier Transform (STFT) spectrogram heatmaps.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-950/60 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-slate-500 font-medium">Forward Horizon:</span>
            {[15, 30, 60, 120].map((h) => (
              <button
                key={h}
                onClick={() => setHorizon(h)}
                data-testid={`horizon-${h}`}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  horizon === h
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                +{h}s
              </button>
            ))}
          </div>
        </div>

        {/* Time-Series Comparison Visualization */}
        <div className="bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/80 dark:border-slate-800/80 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Backbone Link Traffic (Gbps) & 60s Predictive Horizon
            </span>
            <div className="flex items-center space-x-4 text-[11px]">
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-slate-600 dark:text-slate-400 font-medium">Actual Ground Truth</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-600 dark:text-slate-400 font-medium">LSTM Prediction (MSE: 0.012)</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-slate-600 dark:text-slate-400 font-medium">RNN Prediction (Drifting)</span>
              </span>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 800 240" className="w-full h-auto min-w-[650px]">
              {/* Grid Lines */}
              <line x1="50" y1="30" x2="760" y2="30" stroke="#334155" strokeDasharray="3 3" opacity="0.3" />
              <text x="40" y="34" textAnchor="end" className="text-[10px] fill-slate-400">100G</text>

              <line x1="50" y1="80" x2="760" y2="80" stroke="#334155" strokeDasharray="3 3" opacity="0.3" />
              <text x="40" y="84" textAnchor="end" className="text-[10px] fill-slate-400">80G</text>

              <line x1="50" y1="130" x2="760" y2="130" stroke="#334155" strokeDasharray="3 3" opacity="0.3" />
              <text x="40" y="134" textAnchor="end" className="text-[10px] fill-slate-400">50G</text>

              <line x1="50" y1="180" x2="760" y2="180" stroke="#334155" strokeDasharray="3 3" opacity="0.3" />
              <text x="40" y="184" textAnchor="end" className="text-[10px] fill-slate-400">20G</text>

              {/* Congestion Threshold Line at 82G */}
              <line x1="50" y1="75" x2="760" y2="75" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="755" y="70" textAnchor="end" className="text-[9px] fill-red-400 font-semibold">
                Congestion Buffer Limit (82 Gbps)
              </text>

              {/* Present Time Marker (t = 0) */}
              <line x1="400" y1="20" x2="400" y2="200" stroke="#60a5fa" strokeWidth="2" strokeDasharray="2 2" />
              <text x="400" y="215" textAnchor="middle" className="text-[10px] font-bold fill-blue-400">NOW (t=0)</text>

              {/* Historical Actual Traffic Polyline (t = -60 to 0) */}
              <polyline
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
                points={data.history
                  .filter(p => p.timeSec <= 0)
                  .map(p => {
                    const x = 50 + ((p.timeSec + 60) / 120) * 700;
                    const y = 200 - ((p.actualGbps || 0) / 100) * 170;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />

              {/* LSTM Predicted Path (t = 0 to +60) */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="4 2"
                points={data.history
                  .filter(p => p.timeSec >= 0)
                  .map(p => {
                    const x = 50 + ((p.timeSec + 60) / 120) * 700;
                    const y = 200 - (p.lstmPredictedGbps / 100) * 170;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />

              {/* Vanilla RNN Predicted Path (t = 0 to +60) */}
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="2 2"
                points={data.history
                  .filter(p => p.timeSec >= 0)
                  .map(p => {
                    const x = 50 + ((p.timeSec + 60) / 120) * 700;
                    const y = 200 - (p.rnnPredictedGbps / 100) * 170;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />
            </svg>
          </div>
        </div>

        {/* STFT Spectrogram Heatmap */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                <Waves className="w-4 h-4 text-indigo-500" />
                <span>Short-Time Fourier Transform (STFT) Spectrogram Heatmap (CNN Input)</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                2D time-frequency energy decomposition identifying high-frequency micro-burst packet arrivals prior to buffer exhaustion.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              CNN Convolution Ready
            </span>
          </div>

          <div className="grid grid-cols-12 gap-1 bg-slate-950 p-4 rounded-xl border border-slate-800">
            {data.spectrogram.map((cell, idx) => {
              // Color based on intensity
              let bg = 'bg-slate-900';
              if (cell.intensity > 0.8) bg = 'bg-red-500';
              else if (cell.intensity > 0.6) bg = 'bg-amber-500';
              else if (cell.intensity > 0.4) bg = 'bg-emerald-500';
              else if (cell.intensity > 0.2) bg = 'bg-cyan-700';

              return (
                <div
                  key={idx}
                  title={`Freq: ${cell.freqKhz} kHz, Time: ${cell.timeSec}s, Intensity: ${cell.intensity}`}
                  className={`h-7 rounded-sm ${bg} transition-all hover:scale-105 cursor-pointer flex items-center justify-center`}
                >
                  <span className="text-[8px] font-mono text-white/80 font-bold">
                    {Math.round(cell.intensity * 100)}%
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
            <span>-60s (Past History)</span>
            <span className="text-blue-400 font-bold">0s (NOW)</span>
            <span>+60s (Forward Horizon)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
