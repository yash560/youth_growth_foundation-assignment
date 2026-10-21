'use client';

import React from 'react';
import { Network, Server, Shield, Zap, AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';
import { TOPOLOGY_NODES, TOPOLOGY_LINKS, TopologyNode } from '@/lib/sdn-controller';

export default function TopologyMap({
  isRerouted,
  onToggleReroute,
  onSelectDevice
}: {
  isRerouted: boolean;
  onToggleReroute: () => void;
  onSelectDevice: (nodeId: string) => void;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Enterprise Network Topology & SDN Data Plane</h2>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
              Live Flow Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time multi-vendor fabric (Cisco IOS-XR / Junos / VyOS / FortiOS / pfSense). Click any device to inspect interfaces and BGP states.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleReroute}
            data-testid="toggle-reroute-btn"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
              isRerouted
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/20'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
            <span>{isRerouted ? 'Active: SDN RL Route (Bypass via pfSense)' : 'Simulate SDN RL Reroute (Evade Congestion)'}</span>
          </button>
        </div>
      </div>

      {/* SVG Topology Canvas */}
      <div className="relative w-full overflow-x-auto bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/80 dark:border-slate-800/80 p-4">
        <svg viewBox="0 0 920 340" className="w-full h-auto min-w-[760px] select-none">
          <defs>
            <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="grad-red" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Render Links */}
          {TOPOLOGY_LINKS.map((link) => {
            const src = TOPOLOGY_NODES.find(n => n.id === link.source)!;
            const tgt = TOPOLOGY_NODES.find(n => n.id === link.target)!;
            const isCongestedLink = link.id === 'l3-congested';
            const isBypassLink = link.id === 'l4-alt-bypass' || link.id === 'l5-alt-to-core';

            let strokeColor = '#94a3b8';
            let strokeWidth = 3;
            let dashClass = '';

            if (isCongestedLink) {
              if (isRerouted) {
                strokeColor = '#64748b';
                strokeWidth = 2;
                dashClass = '';
              } else {
                strokeColor = '#ef4444';
                strokeWidth = 4;
                dashClass = 'link-flow-congested';
              }
            } else if (isBypassLink) {
              if (isRerouted) {
                strokeColor = '#10b981';
                strokeWidth = 4;
                dashClass = 'link-flow-active';
              } else {
                strokeColor = '#475569';
                strokeWidth = 2;
                dashClass = 'stroke-dasharray: 4 4';
              }
            } else {
              strokeColor = '#3b82f6';
              strokeWidth = 3;
              dashClass = 'link-flow-active';
            }

            const midX = (src.x + tgt.x) / 2;
            const midY = (src.y + tgt.y) / 2;

            return (
              <g key={link.id}>
                <line
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  className={dashClass}
                />
                {/* Latency and Throughput Tag */}
                <rect
                  x={midX - 28}
                  y={midY - 12}
                  width="56"
                  height="16"
                  rx="4"
                  className="fill-white dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-700"
                  strokeWidth="1"
                />
                <text
                  x={midX}
                  y={midY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[9px] font-mono fill-slate-700 dark:fill-slate-300 font-semibold"
                >
                  {isCongestedLink && !isRerouted
                    ? '38G (95%)'
                    : isBypassLink && isRerouted
                    ? '22G (Active)'
                    : `${link.currentGbps}G`}
                </text>
              </g>
            );
          })}

          {/* Render Nodes */}
          {TOPOLOGY_NODES.map((node) => {
            const isCongested = node.id === 'r2' && !isRerouted;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => onSelectDevice(node.id)}
                className="cursor-pointer group"
              >
                {/* Outer Glow */}
                <circle
                  r="28"
                  className={`transition-all duration-300 ${
                    isCongested
                      ? 'fill-red-500/20 stroke-red-500 animate-pulse'
                      : 'fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 group-hover:stroke-blue-500 group-hover:fill-blue-50/50'
                  }`}
                  strokeWidth="2"
                />

                {/* Node Icon Circle */}
                <circle
                  r="20"
                  className={`${
                    isCongested
                      ? 'fill-red-500 text-white'
                      : node.type === 'firewall'
                      ? 'fill-indigo-600 text-white'
                      : node.type === 'router'
                      ? 'fill-blue-600 text-white'
                      : 'fill-cyan-600 text-white'
                  }`}
                />

                {/* Status Dot */}
                <circle
                  cx="14"
                  cy="-14"
                  r="5"
                  className={isCongested ? 'fill-red-500 animate-ping' : 'fill-emerald-400'}
                />
                <circle
                  cx="14"
                  cy="-14"
                  r="4"
                  className={isCongested ? 'fill-red-400' : 'fill-emerald-400'}
                />

                {/* Labels */}
                <text
                  y="40"
                  textAnchor="middle"
                  className="text-[11px] font-bold fill-slate-900 dark:fill-white tracking-tight"
                >
                  {node.label}
                </text>
                <text
                  y="53"
                  textAnchor="middle"
                  className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400"
                >
                  {node.ip}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Summary Footer Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60">
          <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Active SDN Route</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 truncate block mt-0.5">
            {isRerouted ? 'Bypass Link (pfSense Sec-GW)' : 'Direct Link (Juniper R2 -> Cisco R1)'}
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60">
          <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">End-to-End Latency</span>
          <span className={`font-bold font-mono text-sm block mt-0.5 ${isRerouted ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
            {isRerouted ? '14.2 ms (Optimal)' : '38.4 ms (Elevated)'}
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60">
          <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Buffer Loss Rate</span>
          <span className={`font-bold font-mono text-sm block mt-0.5 ${isRerouted ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
            {isRerouted ? '0.01% (Zero Drops)' : '4.80% (Congested Drop)'}
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60">
          <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">MCP Server State</span>
          <span className="font-bold text-blue-600 dark:text-blue-400 block mt-0.5">
            6/6 Devices Online & Ready
          </span>
        </div>
      </div>
    </div>
  );
}
