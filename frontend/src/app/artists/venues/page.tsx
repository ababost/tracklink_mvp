import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const mockVenues = [
  {
    id: 1,
    name: 'Club Nebula',
    location: 'New York, NY',
    capacity: '500',
    type: 'Nightclub',
    pastPerformances: 8,
    lastPerformed: '2024-01-15',
    rating: 4.8,
    contact: 'John Manager',
    email: 'john@clubnebula.com',
  },
  {
    id: 2,
    name: 'Sunset Beach Club',
    location: 'Miami, FL',
    capacity: '300',
    type: 'Beach Club',
    pastPerformances: 3,
    lastPerformed: '2023-12-20',
    rating: 4.5,
    contact: 'Sarah Smith',
    email: 'sarah@sunsetbeach.com',
  },
  {
    id: 3,
    name: 'The Grand Hotel',
    location: 'Las Vegas, NV',
    capacity: '1000',
    type: 'Hotel Venue',
    pastPerformances: 5,
    lastPerformed: '2024-02-01',
    rating: 4.9,
    contact: 'Mike Johnson',
    email: 'mike@grandhotel.com',
  },
];

export default function VenuesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Venues</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search venues..."
            className="w-64"
          />
          <Button>Add New Venue</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockVenues.map((venue) => (
          <Card key={venue.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{venue.name}</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {venue.rating} ★
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">📍</span>
                  <span>{venue.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">👥</span>
                  <span>Capacity: {venue.capacity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">🎶</span>
                  <span>{venue.type}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Performance History</h4>
                <div className="space-y-1 text-sm">
                  <p>Past Shows: {venue.pastPerformances}</p>
                  <p>Last Performed: {venue.lastPerformed}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Contact</h4>
                <div className="space-y-1 text-sm">
                  <p>{venue.contact}</p>
                  <p className="text-blue-600">{venue.email}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button size="sm">Contact</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
