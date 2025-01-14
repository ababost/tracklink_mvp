"use client";

import { usePathname, useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquarePlus, Search, Plus, Calendar, ArrowLeft } from 'lucide-react';

// Helper function to get initials
function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

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

// Mock thread data - in production, this would come from your data store
const mockThread = {
  promoter: {
    name: 'John Promoter',
    company: 'Summer Fest Productions',
  },
  subject: 'Booking Request for Summer Festival',
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
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-sm">
            12 Upcoming Events
          </Badge>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Booking
          </Button>
        </div>
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
    case '/artists/calendar':
      return (
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-sm">
            4 Events This Week
          </Badge>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      );
    default:
      return null;
  }
};

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Check if we're in a message conversation
  const isMessageThread = pathname.match(/^\/artists\/messages\/[^/]+$/);

  if (isMessageThread) {
    return (
      <div className="w-full bg-background dark:bg-gray-900">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary-light text-primary">
                  {getInitials(mockThread.promoter.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{mockThread.subject}</h1>
                <p className="text-sm text-muted-foreground">
                  with {mockThread.promoter.name} from {mockThread.promoter.company}
                </p>
              </div>
            </div>
          </div>
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
    );
  }

  // Regular header for other pages
  return (
    <div className="w-full bg-background dark:bg-gray-900">
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-2xl font-bold">{getPageTitle(pathname)}</h1>
        <div className="flex items-center gap-4">
          {getPageActions(pathname)}
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
    </div>
  );
}
