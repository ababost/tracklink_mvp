"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  // ... other mock messages
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

export default function MessagesPage() {
  const router = useRouter();

  return (
    <div className="p-6 space-y-6">
      {/* Header with search and compose */}

      {/* Messages list */}
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {mockMessages.map((message) => (
            <Card
              key={message.id}
              className={`cursor-pointer transition-all duration-200 hover:bg-primary-light/10 ${message.unread ? 'border-l-4 border-l-primary' : ''}`}
              onClick={() => router.push(`/artists/messages/${message.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-secondary">
                      {getInitials(message.sender)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold ${message.unread ? 'text-primary' : ''}`}>
                            {message.sender}
                          </h3>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{message.company}</span>
                        </div>
                        <p className="text-sm font-medium">{message.subject}</p>
                        <p className="text-sm text-muted-foreground">{message.preview}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-muted-foreground">{message.date}</span>
                        {message.unread && (
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            New
                          </span>
                        )}
                      </div>
                    </div>
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
