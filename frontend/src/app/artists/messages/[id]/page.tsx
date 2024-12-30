"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send } from 'lucide-react';

// Mock data for a single message thread
const mockThread = {
  id: 1,
  subject: 'Booking Request for Summer Festival',
  messages: [
    {
      id: 1,
      sender: 'John Promoter',
      timestamp: '2024-01-15 10:30 AM',
      content: 'Hi, I would love to book you for our upcoming summer festival. We are looking for a headliner for our main stage on July 15th. The festival attracts around 5000 people. Would you be interested?',
      isSender: false,
    },
    {
      id: 2,
      sender: 'DJ Pulse',
      timestamp: '2024-01-15 11:45 AM',
      content: 'Hello John, thank you for reaching out! This sounds interesting. Could you provide more details about the festival, such as the location, set time, and your budget for the headliner?',
      isSender: true,
    },
    {
      id: 3,
      sender: 'John Promoter',
      timestamp: '2024-01-15 2:15 PM',
      content: "The festival is located in Central Park, NYC. We\'re looking at a 90-minute set from 10:30 PM to midnight. Our budget for the headliner is $5000, including accommodation and travel. Does this align with your requirements?",
      isSender: false,
    },
  ],
  promoter: {
    name: 'John Promoter',
    company: 'Summer Fest Productions',
    email: 'john@summerfest.com',
    phone: '+1 234 567 8900',
  },
};

export default function MessagePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    // Handle sending message
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{mockThread.subject}</h1>
          <p className="text-sm text-gray-500">
            with {mockThread.promoter.name} from {mockThread.promoter.company}
          </p>
        </div>
      </div>

      {/* Message Thread */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {mockThread.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] space-y-1 ${
                    message.isSender 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  } rounded-lg p-4`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <p className="font-medium">{message.sender}</p>
                    <p className="text-xs opacity-70">{message.timestamp}</p>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reply Box */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button onClick={handleSend}>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Promoter Info */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Promoter Information</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Name:</span> {mockThread.promoter.name}</p>
            <p><span className="text-gray-500">Company:</span> {mockThread.promoter.company}</p>
            <p><span className="text-gray-500">Email:</span> {mockThread.promoter.email}</p>
            <p><span className="text-gray-500">Phone:</span> {mockThread.promoter.phone}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
