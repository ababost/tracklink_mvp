export interface Message {
  id: string;
  subject: string;
  content: string;
  fromId: string;
  fromType: 'artist' | 'promoter';
  toId: string;
  toType: 'artist' | 'promoter';
  read: boolean;
  createdAt: string;
  updatedAt: string;
}