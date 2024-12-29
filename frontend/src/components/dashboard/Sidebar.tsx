// src/components/dashboard/Sidebar.tsx
import Link from 'next/link'
import { CalendarIcon, ChartBarIcon, ChatBubbleLeftIcon, HomeIcon, UserCircleIcon } from '@heroicons/react/24/outline'

export function Sidebar() {
  return (
    <div className="w-64 bg-[#E0D3F3] min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">TrackLink</h1>
      </div>
      
      <nav className="space-y-2">
        <Link 
          href="/artists/dashboard" 
          className="flex items-center px-4 py-2 text-black hover:bg-white hover:bg-opacity-50 rounded-lg"
        >
          <HomeIcon className="h-5 w-5 mr-3" />
          Dashboard
        </Link>
        <Link 
          href="/artists/profile" 
          className="flex items-center px-4 py-2 text-black hover:bg-white hover:bg-opacity-50 rounded-lg"
        >
          <UserCircleIcon className="h-5 w-5 mr-3" />
          Profile
        </Link>
        <Link 
          href="/artists/calendar" 
          className="flex items-center px-4 py-2 text-black hover:bg-white hover:bg-opacity-50 rounded-lg"
        >
          <CalendarIcon className="h-5 w-5 mr-3" />
          Calendar
        </Link>
        <Link 
          href="/artists/analytics" 
          className="flex items-center px-4 py-2 text-black hover:bg-white hover:bg-opacity-50 rounded-lg"
        >
          <ChartBarIcon className="h-5 w-5 mr-3" />
          Analytics
        </Link>
        <Link 
          href="/artists/messages" 
          className="flex items-center px-4 py-2 text-black hover:bg-white hover:bg-opacity-50 rounded-lg"
        >
          <ChatBubbleLeftIcon className="h-5 w-5 mr-3" />
          Messages
        </Link>
      </nav>
    </div>
  )
}