import React from 'react';
import { MessageThread } from '../../../components/messages/MessageThread';

interface MessagePageProps {
  params: {
    gigId: string;
  };
}

export default function MessagePage({ params }: MessagePageProps) {
  // Note: In a real application, you would get these IDs from your auth context
  // and the gig details from your API
  const artistId = 'current-artist-id'; // Replace with actual artist ID
  const promoterId = 'gig-promoter-id'; // Replace with actual promoter ID

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Messages for Gig #{params.gigId}</h1>
      <div className="bg-white rounded-lg shadow-sm border min-h-[600px]">
        <MessageThread
          gigId={params.gigId}
          artistId={artistId}
          promoterId={promoterId}
        />
      </div>
    </div>
  );
}
