"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Calendar,
  MessageSquare,
  BarChart3,
  BookOpen,
  Settings,
  LayoutDashboard,
  MapPin,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/artists/dashboard', icon: LayoutDashboard },
  { name: 'Calendar', href: '/artists/calendar', icon: Calendar },
  { name: 'Messages', href: '/artists/messages', icon: MessageSquare },
  { name: 'Bookings', href: '/artists/bookings', icon: BookOpen },
  { name: 'Venues', href: '/artists/venues', icon: MapPin },
  { name: 'Analytics', href: '/artists/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/artists/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 border-r bg-gray-50">
      <div className="p-4">
        <h2 className="text-xl font-bold">TrackLink</h2>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  isActive ? 'text-gray-900' : 'text-gray-400'
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
