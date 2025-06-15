'use client';

import { ChatMessage } from '@/models/chat';

export default function Message({ role, content }: ChatMessage) {
  const isUser = role === 'user';
  return (
    <div className={`p-3 rounded-xl max-w-[70%] ${isUser ? 'bg-blue-100 self-end text-right' : 'bg-gray-200 self-start'}`}>
      <div className="font-semibold mb-1">{isUser ? 'You' : 'AI'}</div>
      <div className="break-words">{content}</div>
    </div>
  );
}
