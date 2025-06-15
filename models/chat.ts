export type Role = 'user' | 'assistant';

export interface ChatMessage {
  role: Role;
  content: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
}
