'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import TopologyMap from '@/components/TopologyMap';
import McpServerConsole from '@/components/McpServerConsole';
import AnomalyDetector from '@/components/AnomalyDetector';
import CongestionPredictor from '@/components/CongestionPredictor';
import SdnController from '@/components/SdnController';
import AdversarialDefense from '@/components/AdversarialDefense';
import QuizAssessor from '@/components/QuizAssessor';
import DeviceFleetModal from '@/components/DeviceFleetModal';
import { INITIAL_DEVICES } from '@/lib/network-devices';
import { Network, Server, Shield, Activity, Cpu, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isRerouted, setIsRerouted] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const toggleReroute = () => {
    setIsRerouted(!isRerouted);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white transition-colors duration-200">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* TAB: OVERVIEW / NOC */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Executive Hero Banner */}
            <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-950 rounded-3xl border border-blue-500/30 p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    AI Agent Development • Youth Growth Foundation
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Form Assessment 100%
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Autonomous AI Network Security & Hardware MCP Orchestration Platform
                </h1>
                <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                  Engineered for high-throughput enterprise backbones (Cisco ASR, Juniper MX, Nexus fabrics, and FortiGate/pfSense perimeters). Integrates an RFC-compliant <strong>Model Context Protocol (MCP) server</strong> for AI agents, unsupervised deep Autoencoders for zero-day intrusion detection, bidirectional LSTM time-series congestion forecasting, and an intelligent SDN reinforcement learning controller.
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-5">
                  <button
                    onClick={() => setActiveTab('mcp-server')}
                    data-testid="hero-mcp-btn"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <Server className="w-4 h-4" />
                    <span>Launch MCP Server Console</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('assessment-matrix')}
                    data-testid="hero-matrix-btn"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>View Form Assessment Verification</span>
                  </button>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            </div>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Backbone Throughput</span>
                  <Activity className="w-4 h-4 text-blue-500" />
                </div>
                <div className="mt-2 flex items-baseline space-x-2">
                  <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">164.8</span>
                  <span className="text-xs font-bold text-slate-500">Gbps</span>
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block font-medium">
                  +12.4% vs peak baseline
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Unsupervised IDS</span>
                  <Shield className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="mt-2 flex items-baseline space-x-2">
                  <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">99.4%</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block font-medium">
                  Autoencoder MSE Loss: 0.012
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">LSTM Horizon</span>
                  <Cpu className="w-4 h-4 text-purple-500" />
                </div>
                <div className="mt-2 flex items-baseline space-x-2">
                  <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">+60</span>
                  <span className="text-xs font-bold text-slate-500">sec</span>
                </div>
                <span className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 block font-medium">
                  Early buffer congestion prediction
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">MCP Server Fleet</span>
                  <Server className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="mt-2 flex items-baseline space-x-2">
                  <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">6 / 6</span>
                  <span className="text-xs font-bold text-emerald-500">Online</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block font-medium">
                  JSON-RPC 2.0 Agent Gateway
                </span>
              </div>
            </div>

            {/* Interactive SVG Network Topology */}
            <TopologyMap
              isRerouted={isRerouted}
              onToggleReroute={toggleReroute}
              onSelectDevice={(id) => setSelectedDevice(id)}
            />

            {/* Device Fleet Cards Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Server className="w-4 h-4 text-blue-500" />
                  <span>Managed Network Device Fleet (Routers, Switches, Firewalls)</span>
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Click any card to inspect interfaces and live CLI
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {INITIAL_DEVICES.map((dev) => (
                  <div
                    key={dev.id}
                    onClick={() => setSelectedDevice(dev.id)}
                    data-testid={`device-card-${dev.id}`}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all cursor-pointer shadow-sm group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                            {dev.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {dev.vendor}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mt-0.5">
                          {dev.ip}
                        </span>
                      </div>

                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        dev.status === 'healthy'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-400'
                      }`}>
                        {dev.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-1">
                      {dev.role}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block">CPU</span>
                        <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">{dev.cpuUsage}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Memory</span>
                        <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">{dev.memoryUsage}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">BGP/OSPF</span>
                        <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">{dev.bgpPeersUp} UP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: MCP SERVER */}
        {activeTab === 'mcp-server' && <McpServerConsole />}

        {/* TAB: ANOMALY DETECTION */}
        {activeTab === 'anomaly-detection' && <AnomalyDetector />}

        {/* TAB: CONGESTION PREDICTION */}
        {activeTab === 'congestion-prediction' && <CongestionPredictor />}

        {/* TAB: SDN CONTROLLER */}
        {activeTab === 'sdn-controller' && (
          <SdnController isRerouted={isRerouted} onToggleReroute={toggleReroute} />
        )}

        {/* TAB: ADVERSARIAL DEFENSE */}
        {activeTab === 'adversarial-defense' && <AdversarialDefense />}

        {/* TAB: ASSESSMENT MATRIX */}
        {activeTab === 'assessment-matrix' && <QuizAssessor />}
      </main>

      {/* Device Inspector Modal */}
      <DeviceFleetModal
        deviceId={selectedDevice}
        onClose={() => setSelectedDevice(null)}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 py-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">NetPulse Guardian OS</span>
            <span>•</span>
            <span>Enterprise AI Agent Network Security & MCP Gateway</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20 text-[11px]">
              Powered by TheWebVale
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/yash560/youth_growth_foundation-assignment"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition-colors flex items-center space-x-1"
            >
              <span>GitHub Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Youth Growth Foundation Assessment</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
