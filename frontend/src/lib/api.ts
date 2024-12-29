// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchArtist(id: string) {
  const response = await fetch(`${API_URL}/artists/${id}`);
  if (!response.ok) throw new Error('Failed to fetch artist');
  return response.json();
}

export async function fetchArtistGigs(id: string) {
  const response = await fetch(`${API_URL}/artists/${id}/gigs`);
  if (!response.ok) throw new Error('Failed to fetch gigs');
  return response.json();
}