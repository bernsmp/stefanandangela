import { NextResponse } from 'next/server';
import { loadLeadershipInterfaceMap } from '@/lib/data-parser';

export const maxDuration = 30; // Increase timeout for large files

export async function GET() {
  try {
    const startTime = Date.now();
    const data = loadLeadershipInterfaceMap();
    const loadTime = Date.now() - startTime;
    
    console.log(`Leadership map data loaded in ${loadTime}ms`);
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error loading Leadership Map data:', error);
    return NextResponse.json(
      { error: 'Failed to load data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

