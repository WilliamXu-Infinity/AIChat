'use client';

import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { ChatMessage } from '@/models/chat';

interface ChatBoxProps {
  messages: ChatMessage[];
  input: string;
  setInput: (value: string) => void;
  handleSubmit: () => Promise<void>;
  loading: boolean;
}

export default function ChatBox({ messages, input, setInput, handleSubmit, loading }: ChatBoxProps) {
  return (
    <div className="flex-1 px-4">
      <div className="flex flex-col h-[100dvh]">
        <ChatMessages messages={messages} loading={loading} />
        <ChatInput value={input} onChange={setInput} onSubmit={handleSubmit} disabled={loading} />
      </div>
    </div>
  );
}
