"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Send, Phone, Mail, Building, Clock, DollarSign, Calendar, MapPin } from 'lucide-react';

const mockThread = {
  id: 1,
  subject: 'Booking Request for Summer Festival',
  summary: {
    eventDate: '2024-07-15',
    location: 'Central Park, NYC',
    duration: '90 minutes',
    budget: '$5000',
    status: 'In Negotiation'
  },
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

// Helper function to get initials
function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

export default function MessagePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
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
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-gray-100 text-gray-600">
              {getInitials(mockThread.promoter.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{mockThread.subject}</h1>
            <p className="text-sm text-gray-500">
              with {mockThread.promoter.name} from {mockThread.promoter.company}
            </p>
          </div>
        </div>
      </div>

      {/* Summary and Promoter Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Booking Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{mockThread.summary.eventDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{mockThread.summary.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{mockThread.summary.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span>{mockThread.summary.budget}</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                {mockThread.summary.status}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="font-semibold">Promoter Information</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Building className="h-4 w-4 text-gray-500" />
                <span>{mockThread.promoter.company}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{mockThread.promoter.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{mockThread.promoter.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>
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
                {!message.isSender && (
                  <Avatar className="mr-2">
                    <AvatarFallback className="bg-gray-100 text-gray-600">
                      {getInitials(message.sender)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] space-y-1 ${
                    message.isSender 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  } rounded-lg p-4`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-xs opacity-70">{message.timestamp}</p>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.isSender && (
                  <Avatar className="ml-2">
                    <AvatarFallback className="bg-blue-500 text-white">
                      {getInitials(message.sender)}
                    </AvatarFallback>
                  </Avatar>
                )}
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
    </div>
  );
}
