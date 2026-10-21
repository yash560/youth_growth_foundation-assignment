import { NextRequest, NextResponse } from 'next/server';
import { TOPOLOGY_NODES, TOPOLOGY_LINKS } from '@/lib/sdn-controller';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    nodes: TOPOLOGY_NODES,
    links: TOPOLOGY_LINKS
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const reroute = body.action === 'reroute_congested_flow';

  const updatedLinks = TOPOLOGY_LINKS.map(link => {
    if (link.id === 'l3-congested') {
      return {
        ...link,
        currentGbps: reroute ? 12.4 : 37.8,
        latencyMs: reroute ? 4.1 : 24.8,
        lossPct: reroute ? 0.0 : 4.8,
        isActivePath: !reroute
      };
    }
    if (link.id === 'l4-alt-bypass' || link.id === 'l5-alt-to-core') {
      return {
        ...link,
        currentGbps: reroute ? 21.6 : 4.2,
        isActivePath: reroute
      };
    }
    return link;
  });

  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    rerouted: reroute,
    activePath: reroute
      ? 'WAN -> FortiGate FW1 -> Edge-Router R2 -> [BYPASS via pfSense Sec-GW] -> Core-Router R1'
      : 'WAN -> FortiGate FW1 -> Edge-Router R2 -> [DIRECT CONGESTED LINK] -> Core-Router R1',
    rewardGained: reroute ? '+48.2 (Q-learning optimization reward)' : '0.0',
    links: updatedLinks
  });
}
