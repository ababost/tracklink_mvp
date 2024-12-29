// src/components/dashboard/DashboardHeader.tsx
import { BellIcon } from '@heroicons/react/24/outline'

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-[#E0D3F3] rounded-full">
            <BellIcon className="h-6 w-6 text-black" />
          </button>
          <div className="flex items-center">
            <img 
              src="/api/placeholder/32/32"
              alt="Profile" 
              className="h-8 w-8 rounded-full bg-[#E0D3F3]"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
