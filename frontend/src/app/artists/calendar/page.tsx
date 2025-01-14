"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { addDays, format } from 'date-fns';

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: 'Summer Festival Performance',
    date: new Date(2024, 6, 15), // July 15, 2024
    time: '20:00',
    venue: 'Central Park',
    status: 'confirmed',
    fee: '$2,000',
    description: 'Main stage performance at Summer Festival',
  },
  {
    id: 2,
    title: 'Club Night Show',
    date: new Date(2024, 6, 20), // July 20, 2024
    time: '23:00',
    venue: 'Club Nebula',
    status: 'pending',
    fee: '$800',
    description: '2-hour DJ set',
  },
  {
    id: 3,
    title: 'Private Event',
    date: new Date(2024, 6, 25), // July 25, 2024
    time: '21:00',
    venue: 'The Grand Hotel',
    status: 'confirmed',
    fee: '$1,500',
    description: 'Corporate event performance',
  },
];

// Get the next 3 upcoming events
const upcomingEvents = mockEvents
  .filter(event => event.date > new Date())
  .sort((a, b) => a.date.getTime() - b.date.getTime())
  .slice(0, 3);

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0]);

  // Function to get events for a specific date
  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(
      event => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="p-6 space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              modifiers={{
                booked: (date) => getEventsForDate(date).length > 0,
              }}
              modifiersStyles={{
                booked: {
                  fontWeight: 'bold',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="cursor-pointer p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{event.title}</h3>
                    <Badge
                      variant={event.status === 'confirmed' ? 'success' : 'pending'}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{format(event.date, 'MMM do, yyyy')} at {event.time}</p>
                    <p>{event.venue}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Selected Event Details */}
          {selectedEvent && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">{selectedEvent.title}</h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">
                      {format(selectedEvent.date, 'MMMM do, yyyy')} at {selectedEvent.time}
                    </p>
                    <p className="text-muted-foreground">{selectedEvent.venue}</p>
                    <p className="font-medium text-primary">{selectedEvent.fee}</p>
                    <p className="mt-2">{selectedEvent.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
