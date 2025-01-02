"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

import {
  Calendar,
  MessageSquare,
  BarChart3,
  BookOpen,
  Settings,
  LayoutDashboard,
  MapPin,
  Sun,
  Moon
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
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex flex-col h-screen w-64 border-r bg-gray-50 dark:bg-dark">
      {/* Logo Section */}
      <div className="p-4">
        <Image
          src={theme === 'dark' ? '/Logo_tracklink_white.png' : '/Logo_tracklink_black.png'}
          alt="TrackLink Logo"
          width={150}
          height={40}
          priority
          className="object-contain"
        />
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-primary text-secondary dark:bg-primary-light dark:text-primary'
                  : 'text-gray-600 hover:bg-primary/10 dark:text-gray-300 dark:hover:bg-primary-light/10'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  isActive ? 'text-current' : 'text-gray-400 dark:text-gray-500'
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={toggleTheme}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary-light/10 rounded-md transition-colors"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="mr-3 h-5 w-5" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="mr-3 h-5 w-5" />
              Dark Mode
            </>
          )}
        </button>
      </div>
    </div>
  );
}
