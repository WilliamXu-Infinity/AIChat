'use client';

import Sidebar from '@/components/Sidebar/Sidebar';
import ChatBox from '@/components/ChatBox/ChatBox';
import { useSidebar } from '@/hooks/useSidebar';
import { useChat } from '@/hooks/useChat';
import { useState } from 'react';

export default function Home() {
  const { sessions, activeSessionId, setActiveSessionId, handleNewSession, handleRename, handleDelete, handleNewMessage, activeSession } = useSidebar();
  const { input, setInput, handleSubmit, loading } = useChat(activeSession?.messages ?? [], (msg) => {
    if (activeSessionId) handleNewMessage(activeSessionId, msg);
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <button
        className="absolute top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded shadow lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>

      <div
        className={`z-40 fixed top-0 left-0 h-full w-64 bg-gray-200 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:translate-x-0 lg:block border-r`}
      >
        <Sidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          setActiveSessionId={setActiveSessionId}
          handleNewSession={handleNewSession}
          handleRename={handleRename}
          handleDelete={handleDelete}
        />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {activeSession ? (
        <ChatBox
          messages={activeSession.messages}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      ) : (
        <div className="flex-1 flex justify-center items-center text-gray-500 text-lg">
          Please create a new chat session.
        </div>
      )}

    </div>
  );
}
