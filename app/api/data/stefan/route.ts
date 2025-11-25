import { NextResponse } from 'next/server';
import { loadFingerprintData } from '@/lib/data-parser';

export const maxDuration = 30; // Increase timeout for large files

export async function GET() {
  try {
    const startTime = Date.now();
    const data = loadFingerprintData('stefan-fingerprint.md');
    const loadTime = Date.now() - startTime;
    
    console.log(`Stefan data loaded in ${loadTime}ms`);
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error loading Stefan data:', error);
    return NextResponse.json(
      { error: 'Failed to load data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

