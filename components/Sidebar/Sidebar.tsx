'use client';

import { ChatSession } from '@/models/chat';
import SessionItem from './SessionItem';

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  setActiveSessionId: (id: string) => void;
  handleNewSession: () => void;
  handleRename: (id: string, newTitle: string) => void;
  handleDelete: (id: string) => void;
}

export default function Sidebar({ sessions, activeSessionId, setActiveSessionId, handleNewSession, handleRename, handleDelete }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-200 h-full flex flex-col border-r">
      <div className="border-b font-bold flex">
        <button className="flex flex-1 m-4 p-2 bg-blue-500 text-white rounded cursor-pointer" onClick={handleNewSession}>
          + New Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sessions.map((s) => (
          <SessionItem key={s.id} session={s} activeSessionId={activeSessionId} setActiveSessionId={setActiveSessionId} handleRename={handleRename} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
