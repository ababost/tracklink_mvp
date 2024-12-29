// src/app/artists/dashboard/page.tsx
import { Gigs } from '@/components/dashboard/Gigs'
import { Stats } from '@/components/dashboard/Stats'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { Sidebar } from '@/components/dashboard/Sidebar'

export default function ArtistDashboard() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-8">
          <Stats />
          <Gigs />
        </main>
      </div>
    </div>
  )
}