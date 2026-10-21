export interface NetworkDevice {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'firewall' | 'gateway';
  vendor: 'Cisco' | 'Juniper' | 'VyOS' | 'Fortinet' | 'pfSense';
  model: string;
  ip: string;
  role: string;
  status: 'healthy' | 'warning' | 'critical' | 'quarantined';
  interfaces: {
    name: string;
    speed: string;
    status: 'up' | 'down';
    rxBps: number;
    txBps: number;
    errors: number;
  }[];
  cpuUsage: number;
  memoryUsage: number;
  temperatureC: number;
  bgpPeersUp: number;
  bgpPeersTotal: number;
  ospfNeighbors: number;
  activeFlows: number;
  packetRatePps: number;
  firewallDropRatePps: number;
  adversarialJitterDetected: boolean;
  mcpConnected: boolean;
  lastHeartbeat: string;
}

export const INITIAL_DEVICES: NetworkDevice[] = [
  {
    id: 'dev-r1-core',
    name: 'Core-Router-R1',
    type: 'router',
    vendor: 'Cisco',
    model: 'ASR 9904 (IOS-XR 7.9.2)',
    ip: '10.254.0.1',
    role: 'Enterprise Core BGP/MPLS Backbone',
    status: 'healthy',
    interfaces: [
      { name: 'HundredGigE0/0/0/0', speed: '100 Gbps', status: 'up', rxBps: 42100000000, txBps: 38500000000, errors: 0 },
      { name: 'HundredGigE0/0/0/1', speed: '100 Gbps', status: 'up', rxBps: 29800000000, txBps: 31200000000, errors: 0 },
      { name: 'TenGigE0/1/0/0', speed: '10 Gbps', status: 'up', rxBps: 7800000000, txBps: 6400000000, errors: 2 }
    ],
    cpuUsage: 34.2,
    memoryUsage: 48.6,
    temperatureC: 41.5,
    bgpPeersUp: 8,
    bgpPeersTotal: 8,
    ospfNeighbors: 14,
    activeFlows: 142850,
    packetRatePps: 8400000,
    firewallDropRatePps: 120,
    adversarialJitterDetected: false,
    mcpConnected: true,
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'dev-r2-edge',
    name: 'Edge-Router-R2',
    type: 'router',
    vendor: 'Juniper',
    model: 'MX480 (Junos 22.4R2)',
    ip: '10.254.0.2',
    role: 'Multi-Homed WAN Edge & Peering Gateway',
    status: 'warning',
    interfaces: [
      { name: 'xe-0/0/0', speed: '40 Gbps', status: 'up', rxBps: 34500000000, txBps: 28900000000, errors: 14 },
      { name: 'xe-0/0/1', speed: '40 Gbps', status: 'up', rxBps: 37800000000, txBps: 35100000000, errors: 88 }
    ],
    cpuUsage: 78.4,
    memoryUsage: 68.1,
    temperatureC: 49.8,
    bgpPeersUp: 5,
    bgpPeersTotal: 6,
    ospfNeighbors: 8,
    activeFlows: 98400,
    packetRatePps: 5200000,
    firewallDropRatePps: 850,
    adversarialJitterDetected: true,
    mcpConnected: true,
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'dev-sw1-spine',
    name: 'Spine-Switch-SW1',
    type: 'switch',
    vendor: 'Cisco',
    model: 'Nexus 9336C-FX2 (NX-OS 10.3)',
    ip: '10.254.1.10',
    role: 'Leaf-Spine Datacenter Fabric Controller',
    status: 'healthy',
    interfaces: [
      { name: 'Eth1/1', speed: '100 Gbps', status: 'up', rxBps: 51200000000, txBps: 49800000000, errors: 0 },
      { name: 'Eth1/2', speed: '100 Gbps', status: 'up', rxBps: 48900000000, txBps: 50400000000, errors: 0 }
    ],
    cpuUsage: 28.1,
    memoryUsage: 41.3,
    temperatureC: 38.2,
    bgpPeersUp: 12,
    bgpPeersTotal: 12,
    ospfNeighbors: 24,
    activeFlows: 215000,
    packetRatePps: 11200000,
    firewallDropRatePps: 0,
    adversarialJitterDetected: false,
    mcpConnected: true,
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'dev-sw2-leaf',
    name: 'Leaf-Switch-SW2',
    type: 'switch',
    vendor: 'VyOS',
    model: 'VyOS 1.4-EPA (Open Network Linux)',
    ip: '10.254.1.20',
    role: 'ToR Server Access & VLAN Aggregation',
    status: 'healthy',
    interfaces: [
      { name: 'eth0', speed: '25 Gbps', status: 'up', rxBps: 18400000000, txBps: 17200000000, errors: 0 },
      { name: 'eth1', speed: '25 Gbps', status: 'up', rxBps: 16100000000, txBps: 15900000000, errors: 0 }
    ],
    cpuUsage: 31.9,
    memoryUsage: 39.5,
    temperatureC: 36.4,
    bgpPeersUp: 4,
    bgpPeersTotal: 4,
    ospfNeighbors: 6,
    activeFlows: 67300,
    packetRatePps: 3800000,
    firewallDropRatePps: 0,
    adversarialJitterDetected: false,
    mcpConnected: true,
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'dev-fw1-edge',
    name: 'NextGen-Firewall-FW1',
    type: 'firewall',
    vendor: 'Fortinet',
    model: 'FortiGate 600F (FortiOS 7.4.3)',
    ip: '10.254.2.1',
    role: 'Zero-Trust Perimetric Inspection & SSL Offload',
    status: 'healthy',
    interfaces: [
      { name: 'port1-wan', speed: '10 Gbps', status: 'up', rxBps: 8400000000, txBps: 7900000000, errors: 0 },
      { name: 'port2-dmz', speed: '10 Gbps', status: 'up', rxBps: 3200000000, txBps: 3100000000, errors: 0 }
    ],
    cpuUsage: 54.8,
    memoryUsage: 61.2,
    temperatureC: 44.0,
    bgpPeersUp: 2,
    bgpPeersTotal: 2,
    ospfNeighbors: 4,
    activeFlows: 89400,
    packetRatePps: 4100000,
    firewallDropRatePps: 2480,
    adversarialJitterDetected: false,
    mcpConnected: true,
    lastHeartbeat: new Date().toISOString()
  },
  {
    id: 'dev-fw2-pfsense',
    name: 'pfSense-Security-GW',
    type: 'firewall',
    vendor: 'pfSense',
    model: 'Netgate 6100 (pfSense Plus 24.03)',
    ip: '10.254.2.5',
    role: 'Automated Microsegmentation & VPN Ingress',
    status: 'healthy',
    interfaces: [
      { name: 'ix0-lan', speed: '10 Gbps', status: 'up', rxBps: 6200000000, txBps: 5800000000, errors: 0 },
      { name: 'ix1-sec', speed: '10 Gbps', status: 'up', rxBps: 2100000000, txBps: 1900000000, errors: 0 }
    ],
    cpuUsage: 42.1,
    memoryUsage: 51.7,
    temperatureC: 39.1,
    bgpPeersUp: 2,
    bgpPeersTotal: 2,
    ospfNeighbors: 2,
    activeFlows: 43200,
    packetRatePps: 2100000,
    firewallDropRatePps: 1140,
    adversarialJitterDetected: false,
    mcpConnected: true,
    lastHeartbeat: new Date().toISOString()
  }
];
