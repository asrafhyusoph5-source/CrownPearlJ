
import React, { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import {
  Search,
  Send,
  MessageCircle,
  ArrowLeft,
  MoreVertical,
  CheckCheck,
  Inbox,
  LogOut,
} from 'lucide-react';

import {
  subscribeAdminAuth,
  logoutAdmin,
  type AdminSession,
} from '../../services/adminAuth';

import { DEMO_CONVERSATIONS } from '../../services/messengerService';

import type {
  MessengerConversation,
  MessengerMessage,
} from '../../types/messenger';

const ADMIN_UID = 'EZymoDyHyuTH5wPxl3JoCE4OuUw1';

export const AdminMessengerPage: React.FC = () => {
  // Authentication
  const [session, setSession] = useState<AdminSession | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Messenger state
  const [conversations, setConversations] =
    useState<MessengerConversation[]>(DEMO_CONVERSATIONS);

  const [selectedId, setSelectedId] = useState<string | null>(
    DEMO_CONVERSATIONS[0]?.id ?? null
  );

  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  // Listen to Firebase Authentication
  useEffect(() => {
    const unsubscribe = subscribeAdminAuth((currentSession) => {
      setSession(currentSession);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Selected conversation
  const selected = conversations.find(
    (item) => item.id === selectedId
  );

  // Search conversations
  const filtered = useMemo(() => {
    return conversations.filter((item) =>
      item.customerName.toLowerCase().includes(search.toLowerCase())
    );
  }, [conversations, search]);

  // Select conversation
  const selectConversation = (id: string) => {
    setSelectedId(id);
    setMobileChatOpen(true);

    setConversations((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, unreadCount: 0 }
          : item
      )
    );
  };

  // Send demo message locally
  const sendMessage = () => {
    if (!message.trim() || !selectedId) return;

    const newMessage: MessengerMessage = {
      id: crypto.randomUUID(),
      conversationId: selectedId,
      text: message.trim(),
      sender: 'page',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'sent',
    };

    setConversations((previous) =>
      previous.map((item) =>
        item.id === selectedId
          ? {
              ...item,
              messages: [...item.messages, newMessage],
              lastMessage: newMessage.text,
              lastMessageTime: 'Now',
            }
          : item
      )
    );

    setMessage('');
  };

  // Authentication loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F6F5]">
        <p className="text-gray-500">
          Checking administrator access...
        </p>
      </div>
    );
  }

  // Protect Messenger inbox
  if (
    !session?.isAuthenticated ||
    session.uid !== ADMIN_UID
  ) {
    return <Navigate to="/admin/login" replace />;
  }

  // Logout
  const handleLogout = async () => {
    await logoutAdmin();
  };

  return (
    <div className="min-h-screen bg-[#F4F6F5] p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-serif text-[#3B4A50]">
              Messenger Inbox
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Crown Pearl Customer Conversations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Demo Mode
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Messenger Container */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] h-[680px]">

            {/* Conversation List */}
            <aside
              className={`border-r border-gray-100 flex flex-col ${
                mobileChatOpen ? 'hidden md:flex' : 'flex'
              }`}
            >
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-[#3B4A50] mb-3">
                  Conversations
                </h2>

                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search customers..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:border-[#7FC8C0]"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => selectConversation(item.id)}
                    className={`w-full flex items-start gap-3 p-4 text-left border-b border-gray-50 hover:bg-gray-50 ${
                      selectedId === item.id ? 'bg-[#F0F8F6]' : ''
                    }`}
                  >
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#DCEFEA] text-[#3B4A50] flex items-center justify-center font-semibold">
                      {item.customerInitials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <span className="font-semibold text-sm truncate">
                          {item.customerName}
                        </span>

                        <span className="text-[10px] text-gray-400">
                          {item.lastMessageTime}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 truncate mt-1">
                        {item.lastMessage}
                      </p>
                    </div>

                    {item.unreadCount > 0 && (
                      <span className="bg-[#0084FF] text-white text-[10px] rounded-full px-2 py-1">
                        {item.unreadCount}
                      </span>
                    )}
                  </button>
                ))}

                {filtered.length === 0 && (
                  <p className="p-6 text-center text-sm text-gray-400">
                    No conversations found.
                  </p>
                )}
              </div>
            </aside>

            {/* Chat Area */}
            <section
              className={`flex flex-col min-w-0 ${
                mobileChatOpen ? 'flex' : 'hidden md:flex'
              }`}
            >
              {selected ? (
                <>
                  <header className="h-[76px] border-b border-gray-100 px-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        className="md:hidden"
                        onClick={() => setMobileChatOpen(false)}
                        aria-label="Back to conversations"
                      >
                        <ArrowLeft />
                      </button>

                      <div className="w-10 h-10 rounded-full bg-[#DCEFEA] flex items-center justify-center font-semibold">
                        {selected.customerInitials}
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm">
                          {selected.customerName}
                        </h3>

                        <p className="text-xs text-gray-400">
                          Facebook Messenger · Demo
                        </p>
                      </div>
                    </div>

                    <button aria-label="More options">
                      <MoreVertical className="text-gray-400" />
                    </button>
                  </header>

                  <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FAFAF8]">
                    {selected.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender === 'page'
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div className="max-w-[80%]">
                          <div
                            className={`px-4 py-3 rounded-2xl text-sm ${
                              msg.sender === 'page'
                                ? 'bg-[#DCEFEA] text-[#3B4A50] rounded-br-sm'
                                : 'bg-white border border-gray-100 text-gray-700 rounded-bl-sm'
                            }`}
                          >
                            {msg.text}
                          </div>

                          <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                            {msg.timestamp}

                            {msg.sender === 'page' && (
                              <CheckCheck className="w-3 h-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
                    }}
                    className="p-4 border-t border-gray-100 flex items-center gap-2"
                  >
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#7FC8C0]"
                    />

                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="w-11 h-11 shrink-0 rounded-full bg-[#0084FF] text-white flex items-center justify-center disabled:opacity-40"
                      aria-label="Send demo reply"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                  <Inbox className="w-12 h-12 mb-3" />
                  <p>Select a conversation</p>
                </div>
              )}
            </section>

          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Demonstration inbox. Messages are temporary and are not sent to Facebook.
        </p>

      </div>
    </div>
  );
};

export default AdminMessengerPage;
