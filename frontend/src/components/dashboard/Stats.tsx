// src/components/dashboard/Stats.tsx
import { CurrencyDollarIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl border border-[#E0D3F3] shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-[#E0D3F3] rounded-lg">
            <CurrencyDollarIcon className="h-6 w-6 text-black" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Total Earnings</p>
            <h3 className="text-xl font-semibold text-black">$12,500</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-[#E0D3F3] shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-[#E0D3F3] rounded-lg">
            <CalendarIcon className="h-6 w-6 text-black" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Upcoming Gigs</p>
            <h3 className="text-xl font-semibold text-black">8</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-[#E0D3F3] shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-[#E0D3F3] rounded-lg">
            <UserGroupIcon className="h-6 w-6 text-black" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Total Bookings</p>
            <h3 className="text-xl font-semibold text-black">24</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
