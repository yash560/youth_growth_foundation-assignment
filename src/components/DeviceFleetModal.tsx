'use client';

import React, { useState } from 'react';
import { X, Server, Activity, Shield, Terminal, CheckCircle2, Cpu } from 'lucide-react';
import { INITIAL_DEVICES, NetworkDevice } from '@/lib/network-devices';

export default function DeviceFleetModal({
  deviceId,
  onClose
}: {
  deviceId: string | null;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'interfaces' | 'cli'>('interfaces');

  if (!deviceId) return null;
  const device = INITIAL_DEVICES.find(d => d.id === deviceId) || INITIAL_DEVICES[0];

  const getCliOutput = (dev: NetworkDevice) => {
    if (dev.vendor === 'Cisco') {
      return `RP/0/RSP0/CPU0:${dev.name}# show ip route summary
Route Source    Networks    Subnets     Replicates  Overhead
connected       0           14          0           1120
static          2           8           0           640
bgp 65001       1420        98420       0           7873600
Total           1422        98442       0           7875360

RP/0/RSP0/CPU0:${dev.name}# show bgp summary
BGP router identifier ${dev.ip}, local AS number 65001
BGP generic scan interval 60 secs
BGP table state: Active, 142850 network entries
Neighbor        Spk    AS MsgRcvd MsgSent   TblVer  InQ OutQ  Up/Down  State/PfxRcd
10.254.0.2        0 65002  412904  412890   142850    0    0 14w2d           48920
10.254.1.10       0 65001  894102  894098   142850    0    0 28w4d           93930`;
    }
    if (dev.vendor === 'Juniper') {
      return `root@${dev.name}> show interfaces terse
Interface               Admin Link Proto    Local                 Remote
ge-0/0/0                up    up
xe-0/0/0                up    up   inet     10.254.0.2/30
xe-0/0/1                up    up   inet     10.254.0.6/30 (CONGESTED 95%)

root@${dev.name}> show route summary
Autonomous system number: 65002
Router ID: ${dev.ip}
inet.0: 98400 destinations, 142100 routes (98400 active, 0 holddown, 0 hidden)
              Direct:          8 routes,          8 active
               Local:          8 routes,          8 active
                 BGP:     142084 routes,      98384 active`;
    }
    return `[admin@${dev.name}]# pfctl -sr
pass in quick on ix0-lan all flags S/SA keep state
block drop in quick on port1-wan from 198.51.100.74 to any (Autoencoder IDS Quarantined)
pass out quick on port1-wan all flags S/SA modulate state`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">{device.name}</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {device.vendor} • {device.model}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                IP: {device.ip} • Role: {device.role}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Telemetry Metrics Bar */}
        <div className="grid grid-cols-4 gap-2 p-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">CPU Load</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5">{device.cpuUsage}%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Memory</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5">{device.memoryUsage}%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">BGP Peers</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">{device.bgpPeersUp}/{device.bgpPeersTotal} UP</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Active Flows</span>
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400 block mt-0.5">{device.activeFlows.toLocaleString()}</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-5 pt-3 space-x-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('interfaces')}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === 'interfaces'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Physical Interfaces ({device.interfaces.length})
          </button>
          <button
            onClick={() => setActiveTab('cli')}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === 'cli'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Live CLI Diagnostics
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 max-h-80 overflow-y-auto">
          {activeTab === 'interfaces' ? (
            <div className="space-y-3">
              {device.interfaces.map((iface) => (
                <div
                  key={iface.name}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{iface.name}</span>
                      <span className="text-slate-500 ml-2 text-[10px]">({iface.speed})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">
                      RX: {(iface.rxBps / 1e9).toFixed(1)}G • TX: {(iface.txBps / 1e9).toFixed(1)}G
                    </span>
                    <span className="text-[10px] text-slate-400 block">CRC Errors: {iface.errors}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs border border-slate-800 whitespace-pre-wrap leading-relaxed">
              {getCliOutput(device)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
