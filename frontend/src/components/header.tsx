"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { UserButton } from '@clerk/nextjs';

export function Header() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/artists/dashboard" className="flex items-center">
          <Image
            src={theme === 'dark' ? '/Logo_tracklink_white.png' : '/Logo_tracklink_black.png'}
            alt="TrackLink Logo"
            width={150}
            height={40}
            priority
            className="transition-opacity hover:opacity-80"
          />
        </Link>

        <div className="flex items-center gap-4">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
