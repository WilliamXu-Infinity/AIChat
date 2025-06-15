'use client';

import { ChatSession } from '@/models/chat';
import { useState, useRef, useEffect } from 'react';

interface SessionItemProps {
  session: ChatSession;
  activeSessionId: string | null;
  setActiveSessionId: (id: string) => void;
  handleRename: (id: string, newTitle: string) => void;
  handleDelete: (id: string) => void;
}

export default function SessionItem({ session, activeSessionId, setActiveSessionId, handleRename, handleDelete }: SessionItemProps) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(session.title);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const submitRename = () => {
    handleRename(session.id, editTitle.trim() || 'Untitled');
    setEditing(false);
  };

  return (
    <div onClick={() => setActiveSessionId(session.id)}
      className={`group p-3 cursor-pointer hover:bg-gray-300 flex items-center justify-between relative ${activeSessionId === session.id ? 'bg-gray-400' : ''}`}>
      {editing ? (
        <div className="flex w-full gap-2">
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="flex-1 p-1 border rounded" />
          <button onClick={submitRename} className="bg-blue-500 text-white px-2 rounded">Save</button>
        </div>
      ) : (
        <>
          <div className="truncate">{session.title}</div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center p-1"
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}>
            <span className="text-xl font-bold">⋯</span>
          </div>
          {menuOpen && (
            <div ref={menuRef} className="absolute right-0 top-10 bg-white border rounded shadow-md z-10">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={(e) => { e.stopPropagation(); setEditing(true); setMenuOpen(false); }}>Rename</div>
              <div className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleDelete(session.id); setMenuOpen(false); }}>Delete</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
