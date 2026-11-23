
export interface MessengerMessage {
  id: string;
  conversationId: string;
  text: string;
  sender: 'customer' | 'page';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface MessengerConversation {
  id: string;
  customerName: string;
  customerInitials: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: MessengerMessage[];
}
