'use client';

import { useState } from 'react';
import { useChat, type UIMessage } from '@ai-sdk/react';

export function ChatBot() {
  const { messages, sendMessage } = useChat();

  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    sendMessage({
      role: 'user',
      parts: [{ type: 'text', text: input }],
    });

    setInput('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto my-4 bg-white border border-gray-200 rounded-lg shadow-lg h-[70vh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-center text-gray-500">
            Olá! Sou o assistente do MIRC. Pergunte-me sobre o projeto ou riscos climáticos.
          </p>
        )}

        {messages.map((m: UIMessage) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`py-2 px-4 rounded-2xl max-w-[80%] whitespace-pre-wrap ${m.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800'
                }`}
            >
              {m.parts.map((part, index) => {
                if (part.type === 'text') {
                  return <span key={index}>{part.text}</span>;
                }
                return null;
              })}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center p-3 border-t border-gray-200 bg-gray-50">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Minha rua é segura? O que é o MIRC?"
          className="flex-1 w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-3 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

