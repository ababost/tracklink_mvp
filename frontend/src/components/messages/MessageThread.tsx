import React, { useEffect } from 'react';
import { Message } from '../../types/message';
import { useApi } from '../../hooks/useApi';
import { messageService } from '../../services/message.service';
import { MessageComposer } from './MessageComposer';
import { formatDistanceToNow } from 'date-fns';

interface MessageThreadProps {
  gigId: string;
  artistId: string;
  promoterId: string;
}

export function MessageThread({ gigId, artistId, promoterId }: MessageThreadProps) {
  const {
    data: messages,
    loading,
    error,
    execute: fetchMessages
  } = useApi(messageService.getThreadByGig);

  useEffect(() => {
    fetchMessages(gigId);
  }, [gigId, fetchMessages]);

  const handleNewMessage = async (content: string) => {
    try {
      await messageService.create({
        content,
        gigId,
        fromId: artistId,
        fromType: 'artist',
        toId: promoterId,
        toType: 'promoter'
      });
      fetchMessages(gigId);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) return <div className="p-4">Loading conversation...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading conversation</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message: Message) => (
          <div
            key={message.id}
            className={`flex ${message.fromId === artistId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.fromId === artistId
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="text-sm">{message.content}</div>
              <div className="text-xs mt-1 opacity-70">
                {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <MessageComposer onSend={handleNewMessage} />
      </div>
    </div>
  );
}
