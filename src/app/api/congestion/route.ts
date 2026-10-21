import { NextResponse } from 'next/server';
import { generateCongestionTimeSeries } from '@/lib/congestion-engine';

export async function GET() {
  const data = generateCongestionTimeSeries();
  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    ...data
  });
}
