import { NextRequest, NextResponse } from 'next/server';
import { generateSyntheticFlows } from '@/lib/anomaly-engine';

export async function GET(req: NextRequest) {
  const count = Number(req.nextUrl.searchParams.get('count')) || 12;
  const flows = generateSyntheticFlows(count);

  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    totalFlows: flows.length,
    anomalies: flows.filter(f => f.status === 'anomaly').length,
    benign: flows.filter(f => f.status === 'benign').length,
    flows
  });
}
