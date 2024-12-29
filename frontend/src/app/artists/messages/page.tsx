import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    sender: 'John Promoter',
    subject: 'Booking Request for Summer Festival',
    preview: 'Hi, I would love to book you for our upcoming summer festival...',
    date: '2024-01-15',
    unread: true,
  },
  {
    id: 2,
    sender: 'Club Nebula',
    subject: 'Available dates in March?',
    preview: 'We have some dates available in March and would like to...',
    date: '2024-01-14',
    unread: false,
  },
  {
    id: 3,
    sender: 'Festival Organizer',
    subject: 'Follow-up on Beach Festival Booking',
    preview: 'Thank you for your interest. Regarding the performance fee...',
    date: '2024-01-13',
    unread: true,
  },
  {
    id: 4,
    sender: 'Music Agency',
    subject: 'New Opportunity - European Tour',
    preview: 'We have an exciting opportunity for a European tour...',
    date: '2024-01-12',
    unread: false,
  }
];

export default function MessagesPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header with search */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Messages</h1>
        <Input
          type="search"
          placeholder="Search messages..."
          className="w-64"
        />
      </div>

      {/* Messages list */}
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {mockMessages.map((message) => (
            <Card
              key={message.id}
              className={`cursor-pointer transition-colors hover:bg-gray-50 ${message.unread ? 'border-l-4 border-l-blue-500' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-semibold ${message.unread ? 'text-blue-600' : ''}`}>
                      {message.sender}
                    </h3>
                    <p className="text-sm font-medium text-gray-800">{message.subject}</p>
                    <p className="text-sm text-gray-500 mt-1">{message.preview}</p>
                  </div>
                  <span className="text-xs text-gray-400">{message.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
