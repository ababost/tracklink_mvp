"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

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

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="upcoming">
            Upcoming ({mockBookings.upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({mockBookings.pending.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({mockBookings.past.length})
          </TabsTrigger>
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
          <div className="space-y-2">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{booking.eventName}</h3>
              <p className="text-sm text-muted-foreground">
                {booking.date} at {booking.time}
              </p>
              <p className="text-sm text-muted-foreground">{booking.venue}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                <span className="text-muted-foreground">Promoter:</span> {booking.promoter}
              </p>
              <p className="text-sm">{booking.details}</p>
            </div>
          </div>
          <div className="text-right space-y-2">
            <p className="font-semibold text-lg text-primary">{booking.fee}</p>
            <Badge 
              variant={booking.status === 'confirmed' 
                ? 'success' 
                : booking.status === 'completed'
                ? 'secondary'
                : 'pending'}
            >
              {booking.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
