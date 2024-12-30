import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockBookings = {
  upcoming: [
    {
      id: 1,
      eventName: 'Summer Music Festival',
      date: '2024-03-15',
      time: '8:00 PM',
      venue: 'Central Park',
      fee: '$2000',
      status: 'confirmed',
      promoter: 'John Smith',
      details: 'Main stage performance',
    },
    {
      id: 2,
      eventName: 'Club Night',
      date: '2024-03-20',
      time: '11:00 PM',
      venue: 'Club Nebula',
      fee: '$800',
      status: 'pending',
      promoter: 'Club Nebula Events',
      details: '2-hour DJ set',
    },
  ],
  pending: [
    {
      id: 3,
      eventName: 'Beach Party',
      date: '2024-04-05',
      time: '4:00 PM',
      venue: 'Sunset Beach',
      fee: '$1500',
      status: 'negotiating',
      promoter: 'Beach Events Co',
      details: 'Afternoon beach party set',
    },
  ],
  past: [
    {
      id: 4,
      eventName: 'Winter Concert',
      date: '2023-12-20',
      time: '9:00 PM',
      venue: 'City Hall',
      fee: '$1500',
      status: 'completed',
      promoter: 'City Events',
      details: 'End of year celebration',
    },
  ],
};

export default function BookingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Bookings</h1>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {mockBookings.upcoming.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-4">
          {mockBookings.pending.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-4">
          {mockBookings.past.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BookingCard({ booking }: { booking: any }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{booking.eventName}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-500">
                📅 {booking.date} at {booking.time}
              </p>
              <p className="text-sm text-gray-500">📍 {booking.venue}</p>
              <p className="text-sm text-gray-500">👤 {booking.promoter}</p>
              <p className="text-sm text-gray-500">ℹ️ {booking.details}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-lg">{booking.fee}</p>
            <span 
              className={`mt-2 inline-block px-2 py-1 rounded-full text-xs
                ${booking.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800' 
                  : booking.status === 'completed'
                  ? 'bg-gray-100 text-gray-800'
                  : booking.status === 'negotiating'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
                }`}
            >
              {booking.status}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
