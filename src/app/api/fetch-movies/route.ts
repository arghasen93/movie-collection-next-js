// Server-only code — never exposed to client
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nextPageKey = searchParams.get('NextPageKey');
  const query = nextPageKey ? `?NextPageKey=${encodeURIComponent(nextPageKey)}` : '';

  try {
    const lambdaUrl = `https://5hjl4oaz48.execute-api.ap-south-1.amazonaws.com/fetchMovies${query}`;
    const res = await axios.get(lambdaUrl);
    return NextResponse.json(res.data);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}