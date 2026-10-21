'use client';

import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle2, Sliders, Filter, Zap, Activity } from 'lucide-react';
import { generateSyntheticFlows, AnomalyFlow } from '@/lib/anomaly-engine';

export default function AnomalyDetector() {
  const [flows, setFlows] = useState<AnomalyFlow[]>(generateSyntheticFlows(12));
  const [threshold, setThreshold] = useState<number>(0.055);
  const [filterType, setFilterType] = useState<'all' | 'anomaly' | 'benign'>('all');
  const [mitigatedIps, setMitigatedIps] = useState<string[]>([]);

  const handleMitigate = (ip: string) => {
    if (!mitigatedIps.includes(ip)) {
      setMitigatedIps([...mitigatedIps, ip]);
    }
  };

  const handleRefresh = () => {
    setFlows(generateSyntheticFlows(12));
  };

  const filteredFlows = flows.filter(f => {
    if (filterType === 'anomaly') return f.mseLoss > threshold;
    if (filterType === 'benign') return f.mseLoss <= threshold;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80">
                <Shield className="w-5 h-5" />
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Unsupervised Machine Learning Intrusion Detection System (Autoencoder IDS)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Unlike supervised rule engines that miss novel attack patterns, NetPulse employs a 5-layer bottleneck Autoencoder. It learns normal manifold representations of benign traffic and flags any sample whose Mean Squared Error (MSE) reconstruction loss exceeds τ as a zero-day intrusion.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              data-testid="refresh-ids-btn"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-blue-500" />
              <span>Sample New Packets</span>
            </button>
          </div>
        </div>

        {/* Controls: Threshold Slider & Filter Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-500" />
                <span>Autoencoder Reconstruction Threshold (τ):</span>
              </span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{threshold.toFixed(4)}</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="0.10"
              step="0.005"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0.020 (Strict / High False-Positive)</span>
              <span>0.100 (Permissive)</span>
            </div>
          </div>

          <div>
            <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Filter Flows by Classification:
            </span>
            <div className="flex items-center space-x-2">
              {(['all', 'anomaly', 'benign'] as const).map((ft) => (
                <button
                  key={ft}
                  onClick={() => setFilterType(ft)}
                  data-testid={`filter-${ft}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                    filterType === ft
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {ft === 'all' ? 'All Flows' : ft === 'anomaly' ? 'Anomalies Only' : 'Benign Baseline'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Flow Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="pb-3 font-semibold">Flow ID</th>
                <th className="pb-3 font-semibold">Source IP</th>
                <th className="pb-3 font-semibold">Destination IP</th>
                <th className="pb-3 font-semibold">Packet Size</th>
                <th className="pb-3 font-semibold">Autoencoder MSE</th>
                <th className="pb-3 font-semibold">Isolation Score</th>
                <th className="pb-3 font-semibold">Classification</th>
                <th className="pb-3 font-semibold text-right">Autonomous Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {filteredFlows.map((flow) => {
                const isAnom = flow.mseLoss > threshold;
                const isMitigated = mitigatedIps.includes(flow.srcIp);

                return (
                  <tr key={flow.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 font-medium text-slate-900 dark:text-white">{flow.id}</td>
                    <td className="py-3 text-slate-700 dark:text-slate-300">{flow.srcIp}</td>
                    <td className="py-3 text-slate-500 dark:text-slate-400">{flow.dstIp}</td>
                    <td className="py-3 text-slate-600 dark:text-slate-300">{flow.packetSize} B</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        isAnom
                          ? 'bg-red-100 text-red-700 dark:bg-red-950/70 dark:text-red-400'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400'
                      }`}>
                        {flow.mseLoss.toFixed(4)}
                      </span>
                    </td>
                    <td className="py-3 text-slate-600 dark:text-slate-300">{flow.isolationScore.toFixed(3)}</td>
                    <td className="py-3 font-sans">
                      {isAnom ? (
                        <span className="flex items-center space-x-1 text-red-600 dark:text-red-400 font-semibold text-[11px]">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{flow.type}</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Benign Baseline</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-right font-sans">
                      {isAnom ? (
                        <button
                          onClick={() => handleMitigate(flow.srcIp)}
                          disabled={isMitigated}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                            isMitigated
                              ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                              : 'bg-red-600 hover:bg-red-500 text-white shadow-sm'
                          }`}
                        >
                          {isMitigated ? 'eBPF Blocked' : 'Block via eBPF'}
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">Forward Allowed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
