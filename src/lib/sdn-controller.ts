export interface TopologyNode {
  id: string;
  label: string;
  type: 'router' | 'switch' | 'firewall' | 'cloud';
  x: number;
  y: number;
  ip: string;
  utilizationPct: number;
  status: 'healthy' | 'warning' | 'congested';
}

export interface TopologyLink {
  id: string;
  source: string;
  target: string;
  capacityGbps: number;
  currentGbps: number;
  latencyMs: number;
  lossPct: number;
  isActivePath: boolean;
  isAlternativePath: boolean;
}

export const TOPOLOGY_NODES: TopologyNode[] = [
  { id: 'wan-gw', label: 'Internet / WAN Peer', type: 'cloud', x: 80, y: 150, ip: '198.51.100.1', utilizationPct: 88, status: 'warning' },
  { id: 'fw1', label: 'NextGen FW-1 (FortiGate)', type: 'firewall', x: 260, y: 150, ip: '10.254.2.1', utilizationPct: 56, status: 'healthy' },
  { id: 'r2', label: 'Edge-Router R2 (Juniper)', type: 'router', x: 440, y: 150, ip: '10.254.0.2', utilizationPct: 84, status: 'congested' },
  { id: 'r1', label: 'Core-Router R1 (Cisco ASR)', type: 'router', x: 620, y: 150, ip: '10.254.0.1', utilizationPct: 42, status: 'healthy' },
  { id: 'sw1', label: 'Spine Switch SW1 (Nexus)', type: 'switch', x: 800, y: 90, ip: '10.254.1.10', utilizationPct: 35, status: 'healthy' },
  { id: 'sw2', label: 'Leaf Switch SW2 (VyOS)', type: 'switch', x: 800, y: 220, ip: '10.254.1.20', utilizationPct: 29, status: 'healthy' },
  { id: 'fw2', label: 'pfSense Sec-GW', type: 'firewall', x: 530, y: 260, ip: '10.254.2.5', utilizationPct: 38, status: 'healthy' }
];

export const TOPOLOGY_LINKS: TopologyLink[] = [
  { id: 'l1', source: 'wan-gw', target: 'fw1', capacityGbps: 40, currentGbps: 34.8, latencyMs: 3.2, lossPct: 0.1, isActivePath: true, isAlternativePath: false },
  { id: 'l2', source: 'fw1', target: 'r2', capacityGbps: 40, currentGbps: 34.5, latencyMs: 1.5, lossPct: 0.05, isActivePath: true, isAlternativePath: false },
  { id: 'l3-congested', source: 'r2', target: 'r1', capacityGbps: 40, currentGbps: 37.8, latencyMs: 24.8, lossPct: 4.8, isActivePath: true, isAlternativePath: false },
  { id: 'l4-alt-bypass', source: 'r2', target: 'fw2', capacityGbps: 25, currentGbps: 4.2, latencyMs: 2.1, lossPct: 0.0, isActivePath: false, isAlternativePath: true },
  { id: 'l5-alt-to-core', source: 'fw2', target: 'r1', capacityGbps: 25, currentGbps: 4.2, latencyMs: 2.5, lossPct: 0.0, isActivePath: false, isAlternativePath: true },
  { id: 'l6', source: 'r1', target: 'sw1', capacityGbps: 100, currentGbps: 42.1, latencyMs: 0.8, lossPct: 0.0, isActivePath: true, isAlternativePath: false },
  { id: 'l7', source: 'r1', target: 'sw2', capacityGbps: 25, currentGbps: 16.1, latencyMs: 1.1, lossPct: 0.0, isActivePath: true, isAlternativePath: false }
];
