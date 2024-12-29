// src/controllers/MessageController.ts
import { Request, Response } from 'express';
import { MessageModel } from '../models/MessageModel';
import { Message, MessageGroups } from '../types';
import logger from '../utils/logger';

export class MessageController {
  private messageModel: MessageModel;

  constructor() {
    this.messageModel = new MessageModel();
  }

  create = async (req: Request, res: Response) => {
    try {
      const { gig_id, type, content } = req.body;
      logger.info('Creating new Message', { type });
      
      let message;
      if (type === 'email') {
        message = await this.messageModel.createEmailMessage(gig_id, content);
      } else {
        message = await this.messageModel.createChatMessage(gig_id, content);
      }

      logger.info('Created Message', { type });
      res.status(201).json(message);
    } catch (error) {
      logger.error('Error creating message:', error);
      res.status(500).json({ error: 'Failed to create message' });
    }
  };

  getThreadByGig = async (req: Request, res: Response) => {
    try {
      const { gig_id } = req.params;
      logger.info('getting Message Thread for gig:', { gig_id });
      const messages = await this.messageModel.getMessageThread(gig_id);
      logger.info('Message Thread Retrived Successfully for gig: ', { gig_id });
      res.json(messages);
    } catch (error) {
      logger.error('Error retrieving messages:', error);
      res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  };

  getArtistMessages = async (req: Request, res: Response) => {
    try {
      const { artistId } = req.params;
      logger.info('Fetching messages for artist', { artistId });

      const messages = await this.messageModel.getArtistMessages(artistId);
      
      const groupedMessages = messages.reduce<MessageGroups>((acc, message) => {
        const gigId = message.gig_id;
        if (!acc[gigId]) {
          if (!message.venue || !message.gig_date || !message.promoter_name) {
            logger.warn('Missing gig details in message', { messageId: message.id });
            return acc;
          }

          acc[gigId] = {
            gig_id: gigId,
            venue: message.venue,
            gig_date: message.gig_date,
            promoter_name: message.promoter_name,
            messages: []
          };
        }

        acc[gigId].messages.push({
          id: message.id,
          content: message.content,
          type: message.type,
          created_at: message.created_at,
          status: message.status
        });
        return acc;
      }, {});

      logger.info('Successfully retrieved artist messages', { 
        artistId, 
        messageCount: messages.length 
      });

      res.json(Object.values(groupedMessages));
    } catch (error) {
      logger.error('Failed to fetch artist messages', { 
        error, 
        artistId: req.params.artistId 
      });
      res.status(500).json({ 
        error: 'Failed to retrieve artist messages' 
      });
    }
  };
}