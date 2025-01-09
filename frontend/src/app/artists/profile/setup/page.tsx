"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';

export default function ProfileSetupPage() {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const profileData = {
      artistName: formData.get('artistName'),
      genre: formData.get('genre'),
      bio: formData.get('bio'),
      location: formData.get('location'),
      hourlyRate: formData.get('hourlyRate'),
    };

    try {
      // Here you would typically save this data to your backend
      // For now, we'll just simulate a delay and redirect
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After saving, redirect to dashboard
      router.push('/artists/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Artist Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Artist/DJ Name</label>
              <Input
                name="artistName"
                placeholder="Your stage name"
                defaultValue={user?.username || ''}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Genre</label>
              <Input
                name="genre"
                placeholder="e.g., House, Techno, Hip-Hop"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Bio</label>
              <Textarea
                name="bio"
                placeholder="Tell promoters about yourself and your music..."
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Location</label>
              <Input
                name="location"
                placeholder="City, Country"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Hourly Rate</label>
              <Input
                name="hourlyRate"
                type="number"
                min="0"
                placeholder="Your base rate per hour"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Complete Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
