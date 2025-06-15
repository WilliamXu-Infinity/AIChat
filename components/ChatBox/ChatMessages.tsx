'use client';

import Message from './Message';
import { ChatMessage } from '@/models/chat';
import { useEffect, useRef } from 'react';

interface ChatMessagesProps {
  messages: ChatMessage[];
  loading: boolean;
}

export default function ChatMessages({ messages, loading }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (messages.length === 0 && !loading) {
    return (
      <div className="flex flex-1 justify-center items-center text-gray-500">
        Start a new chat to get started.
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto space-y-4">
      {messages.map((msg, idx) => (
        <Message key={idx} role={msg.role} content={msg.content} />
      ))}
      {loading && <Message role="assistant" content="Thinking..." />}
      <div ref={bottomRef}></div>
    </div>
  );
}
