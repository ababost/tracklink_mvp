"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { MessageSquarePlus } from 'lucide-react';

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    sender: 'John Promoter',
    company: 'Summer Fest Productions',
    subject: 'Booking Request for Summer Festival',
    preview: 'Hi, I would love to book you for our upcoming summer festival...',
    date: '2024-01-15',
    unread: true,
  },
  {
    id: 2,
    sender: 'Mike Manager',
    company: 'Club Nebula',
    subject: 'Available dates in March?',
    preview: 'We have some dates available in March and would like to...',
    date: '2024-01-14',
    unread: false,
  },
  {
    id: 3,
    sender: 'Sarah Events',
    company: 'Beach Party Co',
    subject: 'Follow-up on Beach Festival Booking',
    preview: 'Thank you for your interest. Regarding the performance fee...',
    date: '2024-01-13',
    unread: true,
  },
  {
    id: 4,
    sender: 'James Agent',
    company: 'Global Music Agency',
    subject: 'New Opportunity - European Tour',
    preview: 'We have an exciting opportunity for a European tour...',
    date: '2024-01-12',
    unread: false,
  }
];

export default function MessagesPage() {
  const router = useRouter();

  return (
    <div className="p-6 space-y-6">
      {/* Header with search and compose */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-gray-500">
            {mockMessages.filter(m => m.unread).length} unread messages
          </p>
        </div>
        <div className="flex gap-4">
          <Input
            type="search"
            placeholder="Search messages..."
            className="w-64"
          />
          <Button>
            <MessageSquarePlus className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>
      </div>

      {/* Messages list */}
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {mockMessages.map((message) => (
            <Card
              key={message.id}
              className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                message.unread ? 'border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => router.push(`/artists/messages/${message.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${
                        message.unread ? 'text-blue-600' : ''
                      }`}>
                        {message.sender}
                      </h3>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{message.company}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800">{message.subject}</p>
                    <p className="text-sm text-gray-500">{message.preview}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-gray-400">{message.date}</span>
                    {message.unread && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
