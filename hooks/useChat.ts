import { useState } from 'react';
import { ChatMessage } from '@/models/chat';

export function useChat(initialMessages: ChatMessage[], onNewMessage: (msg: ChatMessage) => void) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    onNewMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...initialMessages, userMessage] }),
      });

      const data = await res.json();
      onNewMessage({ role: 'assistant', content: data.reply });
    } catch {
      onNewMessage({ role: 'assistant', content: 'Error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return { input, setInput, handleSubmit, loading };
}
