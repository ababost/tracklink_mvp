'use client';

import { useState } from 'react';
import { ChatBubbleLeftIcon, XMarkIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function AgentProfile() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const artists = [
    { id: 1, name: 'Taylor Swift', genre: 'Pop', img: '/placeholder.jpg' },
    { id: 2, name: 'Ed Sheeran', genre: 'Pop/Folk', img: '/placeholder.jpg' },
    { id: 3, name: 'Drake', genre: 'Hip Hop', img: '/placeholder.jpg' }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    setMessages([...messages, { 
      text: inputMessage, 
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }]);
    setInputMessage('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I'm your AI agent. How can I help you manage these artists?",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      }]);
    }, 1000);
  };

  return (
    <div className="fixed right-4 bottom-4 flex flex-col items-end">
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
                <h4 className="text-sm font-semibold mb-2">Managing Artists:</h4>
                <div className="flex gap-2 overflow-x-auto">
                  {artists.map(artist => (
                    <div key={artist.id} className="flex-shrink-0">
                      <img src={artist.img} alt={artist.name} className="w-10 h-10 rounded-full" />
                      <p className="text-xs text-center mt-1">{artist.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-2 ${
                      message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-75">{message.timestamp}</span>
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
                    placeholder="Type your message..."
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