'use client';

import { useState, useEffect } from 'react';
import { ChatBubbleLeftIcon, XMarkIcon, MinusIcon } from '@heroicons/react/24/outline';
import type { Artist, Message } from '@/types/artist';

export default function AgentProfile() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // Mock data - replace with API calls
  const artists: Artist[] = [
    {
      id: '1',
      name: 'Taylor Swift',
      genre: 'Pop',
      image: '/placeholder.jpg',
      stats: {
        monthlyListeners: 85000000,
        followers: 50000000
      }
    },
    {
      id: '2',
      name: 'Ed Sheeran',
      genre: 'Pop/Folk',
      image: '/placeholder.jpg',
      stats: {
        monthlyListeners: 75000000,
        followers: 45000000
      }
    }
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      artistId: selectedArtist?.id
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I'll help you manage ${selectedArtist?.name || 'your artists'}. What would you like to know?`,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        artistId: selectedArtist?.id
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="fixed right-4 bottom-4 flex flex-col items-end z-50">
      <button 
        onClick={() => setIsChatOpen(true)}
        className="bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600"
      >
        <ChatBubbleLeftIcon className="h-6 w-6" />
      </button>

      {isChatOpen && (
        <div className={`bg-white rounded-lg shadow-xl mt-4 ${isMinimized ? 'h-12' : 'h-96'} w-80 flex flex-col`}>
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">AI Agent Chat</h3>
            <div className="flex gap-2">
              <button onClick={() => setIsMinimized(!isMinimized)}>
                <MinusIcon className="h-5 w-5" />
              </button>
              <button onClick={() => setIsChatOpen(false)}>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="p-4 border-b">
                <h4 className="text-sm font-semibold mb-2">Your Artists:</h4>
                <div className="flex gap-4 overflow-x-auto">
                  {artists.map(artist => (
                    <button
                      key={artist.id}
                      onClick={() => setSelectedArtist(artist)}
                      className={`flex-shrink-0 text-center ${
                        selectedArtist?.id === artist.id ? 'ring-2 ring-blue-500 rounded-lg' : ''
                      }`}
                    >
                      <img 
                        src={artist.image} 
                        alt={artist.name} 
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                      <p className="text-xs mt-1">{artist.name}</p>
                      {artist.stats && (
                        <p className="text-xs text-gray-500">
                          {formatNumber(artist.stats.monthlyListeners)} listeners
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-2 ${
                      message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-75">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={`Ask about ${selectedArtist?.name || 'your artists'}...`}
                    className="flex-1 p-2 border rounded-lg"
                  />
                  <button 
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}