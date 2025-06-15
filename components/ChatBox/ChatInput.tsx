'use client';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export default function ChatInput({ value, onChange, onSubmit, disabled }: ChatInputProps) {
  return (
    <div className="flex my-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        className="flex-1 border rounded-l p-2"
        placeholder="Ask me questions..."
        disabled={disabled}
      />
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 rounded-r"
        disabled={disabled}
      >
        Send
      </button>
    </div>
  );
}
