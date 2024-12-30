import { Card, CardContent } from '@/components/ui/card';

const mockEvents = [
  {
    id: 1,
    title: 'Summer Festival Performance',
    date: '2024-03-15',
    time: '8:00 PM',
    venue: 'Central Park',
    status: 'confirmed',
  },
  {
    id: 2,
    title: 'Club Night Show',
    date: '2024-03-20',
    time: '11:00 PM',
    venue: 'Club Nebula',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Private Event',
    date: '2024-03-25',
    time: '9:00 PM',
    venue: 'The Grand Hotel',
    status: 'confirmed',
  },
];

export default function CalendarPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Calendar</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-4">
              {/* Calendar placeholder - You'll need to add a calendar component here */}
              <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Calendar Coming Soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
          {mockEvents.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-4">
                <h3 className="font-semibold">{event.title}</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-500">
                    📅 {event.date} at {event.time}
                  </p>
                  <p className="text-sm text-gray-500">📍 {event.venue}</p>
                </div>
                <span 
                  className={`mt-2 inline-block px-2 py-1 rounded-full text-xs
                    ${event.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                    }`}
                >
                  {event.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
