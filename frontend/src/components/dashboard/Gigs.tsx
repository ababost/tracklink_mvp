
// src/components/dashboard/Gigs.tsx
export function Gigs() {
    const upcomingGigs = [
      {
        id: 1,
        venue: "Club XYZ",
        date: "2024-12-31",
        time: "22:00",
        fee: "$1,000",
        status: "confirmed"
      },
      // Add more gigs...
    ]
  
    return (
      <div className="bg-white rounded-xl border border-[#E0D3F3] shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Upcoming Gigs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-[#E0D3F3]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-black">Venue</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-black">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-black">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-black">Fee</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-black">Status</th>
                </tr>
              </thead>
              <tbody>
                {upcomingGigs.map((gig) => (
                  <tr key={gig.id} className="border-b border-[#E0D3F3]">
                    <td className="py-3 px-4 text-black">{gig.venue}</td>
                    <td className="py-3 px-4 text-black">{gig.date}</td>
                    <td className="py-3 px-4 text-black">{gig.time}</td>
                    <td className="py-3 px-4 text-black">{gig.fee}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {gig.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }