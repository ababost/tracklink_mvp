import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/Logo_tracklink_black.png"
              alt="TrackLink Logo"
              width={150}
              height={40}
              className="dark:hidden"
            />
            <Image
              src="/Logo_tracklink_white.png"
              alt="TrackLink Logo"
              width={150}
              height={40}
              className="hidden dark:block"
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Streamline Your <span className="text-primary">Music Bookings</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Manage your bookings, communicate with promoters, and grow your music career - all in one place.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="/artists/dashboard" className="text-lg px-8 py-3 bg-primary text-white rounded-lg">
          <Button size="lg" className="text-lg px-8">
            Start Now
          </Button>
          </a>
          <Button variant="link" className="text-lg">
            Learn more <span aria-hidden="true">→</span>
          </Button>
        </div>

        {/* Features Preview */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Smart Scheduling</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
              Manage your bookings and availability in one place
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Streamlined Communication</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
              Chat with promoters and manage negotiations efficiently
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Performance Analytics</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
              Track your growth and optimize your bookings
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
