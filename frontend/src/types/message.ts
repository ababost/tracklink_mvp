export interface Message {
  id: string;
  content: string;
  gigId: string;
  fromId: string;
  fromType: 'artist' | 'promoter';
  toId: string;
  toType: 'artist' | 'promoter';
  read: boolean;
  createdAt: string;
  updatedAt: string;
}