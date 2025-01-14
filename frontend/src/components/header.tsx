"use client";

import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquarePlus, Search, Plus } from 'lucide-react';

const getPageTitle = (pathname: string) => {
  const paths = {
    '/artists/dashboard': 'Dashboard',
    '/artists/messages': 'Messages',
    '/artists/calendar': 'Calendar',
    '/artists/bookings': 'Bookings',
    '/artists/venues': 'Venues',
    '/artists/analytics': 'Analytics',
    '/artists/settings': 'Settings',
  };
  return paths[pathname as keyof typeof paths] || 'Dashboard';
};

const getPageActions = (pathname: string) => {
  switch (pathname) {
    case '/artists/messages':
      return (
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search messages..."
            className="w-64"
            startIcon={<Search className="h-4 w-4 text-gray-500" />}
          />
          <Button>
            <MessageSquarePlus className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>
      );
    case '/artists/bookings':
      return (
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      );
    case '/artists/venues':
      return (
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search venues..."
            className="w-64"
            startIcon={<Search className="h-4 w-4 text-gray-500" />}
          />
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Venue
          </Button>
        </div>
      );
    default:
      return null;
  }
};

export function Header() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const actions = getPageActions(pathname);

  return (
    <header className="sticky top-0 z-40 border-b bg-white dark:bg-gray-900">
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-2xl font-bold">{pageTitle}</h1>
        <div className="flex items-center gap-4">
          {actions}
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-9 h-9",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
