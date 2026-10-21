'use client';

import React, { useState } from 'react';
import { Cpu, RefreshCw, Zap, ArrowRight, ShieldCheck, CheckCircle2, Layers } from 'lucide-react';

export default function SdnController({
  isRerouted,
  onToggleReroute
}: {
  isRerouted: boolean;
  onToggleReroute: () => void;
}) {
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    await new Promise(r => setTimeout(r, 600));
    onToggleReroute();
    setIsOptimizing(false);
  };

  const openFlowRules = [
    {
      tableId: 0,
      priority: 1000,
      match: 'in_port=xe-0/0/0, ip_proto=6, dst_port=443',
      action: isRerouted ? 'set_field:10.254.2.5->eth_dst, output:ix0-lan (BYPASS)' : 'output:xe-0/0/1 (CONGESTED)',
      packetsCount: isRerouted ? '14,892,100' : '4,210,500'
    },
    {
      tableId: 0,
      priority: 950,
      match: 'ip_proto=17, dst_port=53 (DNS Ingress)',
      action: 'output:local, rate_limit:5000pps',
      packetsCount: '891,420'
    },
    {
      tableId: 1,
      priority: 500,
      match: 'eth_type=0x8847 (MPLS Label: 1042)',
      action: isRerouted ? 'pop_mpls, output:HundredGigE0/0/0/1' : 'pop_mpls, output:HundredGigE0/0/0/0',
      packetsCount: '32,104,800'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/80">
                <Cpu className="w-5 h-5" />
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Intelligent SDN Controller (Knowledge Plane & Deep Q-Routing)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              In Software-Defined Networking, the centralized controller that uses artificial intelligence to optimize traffic engineering is termed an <strong>Intelligent SDN Controller</strong> (or Cognitive SDN Controller). It monitors global telemetry across switches and solves continuous-space Bellman routing optimization via Reinforcement Learning.
            </p>
          </div>

          <button
            onClick={handleOptimize}
            disabled={isOptimizing}
            data-testid="sdn-optimize-action-btn"
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer ${
              isRerouted
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/20'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'Recomputing Q-Matrix...' : isRerouted ? 'Revert to Default Route' : 'Execute AI Reinforcement Learning Optimization'}</span>
          </button>
        </div>

        {/* Reinforcement Learning Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Reward Formulation
            </span>
            <span className="font-mono font-bold text-xs text-slate-900 dark:text-white mt-1 block">
              R = - (α·Latency + β·Loss + γ·Jitter)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Q-Table Convergence
            </span>
            <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400 mt-1 block">
              99.8% (Exploration ε = 0.02)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Latency Gain
            </span>
            <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400 mt-1 block">
              {isRerouted ? '38.4ms -> 14.2ms (-63%)' : 'Baseline 38.4ms'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Southbound Protocol
            </span>
            <span className="font-mono font-bold text-xs text-slate-900 dark:text-white mt-1 block">
              OpenFlow 1.5 & P4 Runtime
            </span>
          </div>
        </div>

        {/* Live OpenFlow Flow Table */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-purple-500" />
              <span>Southbound Data Plane Flow Table (OpenFlow Flow-Mod Pipeline)</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
              Synchronized
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="pb-2 font-semibold">Table</th>
                  <th className="pb-2 font-semibold">Priority</th>
                  <th className="pb-2 font-semibold">Header Match Fields</th>
                  <th className="pb-2 font-semibold">Action Instruction</th>
                  <th className="pb-2 font-semibold text-right">Packets Matched</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {openFlowRules.map((rule, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-2.5 text-slate-600 dark:text-slate-400">{rule.tableId}</td>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-200">{rule.priority}</td>
                    <td className="py-2.5 text-blue-600 dark:text-blue-400">{rule.match}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        rule.action.includes('BYPASS')
                          ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400'
                          : rule.action.includes('CONGESTED')
                          ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {rule.action}
                      </span>
                    </td>
                    <td className="py-2.5 text-right text-slate-600 dark:text-slate-400">{rule.packetsCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
