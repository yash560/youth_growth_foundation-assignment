import { NextResponse } from 'next/server';
import { INITIAL_DEVICES } from '@/lib/network-devices';

export async function GET() {
  const randomizedDevices = INITIAL_DEVICES.map(d => ({
    ...d,
    cpuUsage: parseFloat(Math.min(99, Math.max(15, d.cpuUsage + (Math.random() * 4 - 2))).toFixed(1)),
    memoryUsage: parseFloat(Math.min(95, Math.max(25, d.memoryUsage + (Math.random() * 2 - 1))).toFixed(1)),
    lastHeartbeat: new Date().toISOString()
  }));

  const totalBandwidthGbps = (randomizedDevices.reduce((acc, d) => {
    return acc + d.interfaces.reduce((iAcc, iface) => iAcc + (iface.rxBps + iface.txBps), 0);
  }, 0) / 1e9).toFixed(1);

  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    totalDevices: randomizedDevices.length,
    healthyCount: randomizedDevices.filter(d => d.status === 'healthy').length,
    warningCount: randomizedDevices.filter(d => d.status === 'warning').length,
    criticalCount: randomizedDevices.filter(d => d.status === 'critical').length,
    aggregateBandwidthGbps: totalBandwidthGbps,
    devices: randomizedDevices
  });
}
