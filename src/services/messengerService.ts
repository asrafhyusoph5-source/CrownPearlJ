
import type { MessengerConversation } from '../types/messenger';

export const DEMO_CONVERSATIONS: MessengerConversation[] = [
  {
    id: 'demo-001',
    customerName: 'Maria Santos',
    customerInitials: 'MS',
    lastMessage: 'Is this South Sea pearl genuine?',
    lastMessageTime: '10:30 AM',
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        conversationId: 'demo-001',
        text: 'Good morning! I saw your pearl necklace.',
        sender: 'customer',
        timestamp: '10:25 AM',
      },
      {
        id: 'm2',
        conversationId: 'demo-001',
        text: 'Is this South Sea pearl genuine?',
        sender: 'customer',
        timestamp: '10:30 AM',
      },
    ],
  },
  {
    id: 'demo-002',
    customerName: 'John Reyes',
    customerInitials: 'JR',
    lastMessage: 'Do you deliver to Manila?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'm3',
        conversationId: 'demo-002',
        text: 'Do you deliver to Manila?',
        sender: 'customer',
        timestamp: 'Yesterday',
      },
      {
        id: 'm4',
        conversationId: 'demo-002',
        text: 'Yes! We offer nationwide shipping.',
        sender: 'page',
        timestamp: 'Yesterday',
        status: 'read',
      },
    ],
  },
  {
    id: 'demo-003',
    customerName: 'Angela Cruz',
    customerInitials: 'AC',
    lastMessage: 'I need a bridal pearl set.',
    lastMessageTime: 'Monday',
    unreadCount: 1,
    messages: [
      {
        id: 'm5',
        conversationId: 'demo-003',
        text: 'I need a bridal pearl set.',
        sender: 'customer',
        timestamp: 'Monday',
      },
    ],
  },
];
