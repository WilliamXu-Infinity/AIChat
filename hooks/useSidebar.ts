import { useState } from 'react';
import { ChatSession, ChatMessage } from '@/models/chat';
import { v4 as uuidv4 } from 'uuid';

export function useSidebar() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const handleNewSession = () => {
    const id = uuidv4();
    const newSession: ChatSession = { id, title: `New Chat ${sessions.length + 1}`, messages: [] };
    setSessions([...sessions, newSession]);
    setActiveSessionId(id);
  };

  const handleRename = (id: string, newTitle: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, title: newTitle } : s));
  };

  const handleDelete = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeSessionId === id) setActiveSessionId(null);
  };

  const handleNewMessage = (id: string, message: ChatMessage) => {
    setSessions(prev => prev.map(s =>
      s.id === id ? { ...s, messages: [...s.messages, message] } : s
    ));
  };

  const activeSession = sessions.find(s => s.id === activeSessionId);

  return { sessions, activeSessionId, setActiveSessionId, handleNewSession, handleRename, handleDelete, handleNewMessage, activeSession };
}
