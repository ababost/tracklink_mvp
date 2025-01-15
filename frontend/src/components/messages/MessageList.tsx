import React, { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { messageService } from '../../services/message.service';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface MessageListProps {
  artistId: string;
}

export function MessageList({ artistId }: MessageListProps) {
  const {
    data: messages,
    loading,
    error,
    execute: fetchMessages
  } = useApi(messageService.getArtistMessages);

  useEffect(() => {
    fetchMessages(artistId);
  }, [artistId, fetchMessages]);

  if (loading) return <div className="p-4">Loading messages...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading messages</div>;

  const groupedMessages = messages?.reduce((acc, message) => {
    const gigId = message.gigId;
    if (!acc[gigId]) {
      acc[gigId] = [];
    }
    acc[gigId].push(message);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(groupedMessages || {}).map(([gigId, messages]) => {
        const latestMessage = messages[messages.length - 1];
        return (
          <Link
            key={gigId}
            href={`/messages/${gigId}`}
            className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Conversation for Gig #{gigId}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {latestMessage.content.length > 100
                    ? `${latestMessage.content.substring(0, 100)}...`
                    : latestMessage.content}
                </p>
              </div>
              <div className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(latestMessage.createdAt), {
                  addSuffix: true
                })}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
