'use client';

import { useState } from 'react';
import { useChat, type UIMessage } from '@ai-sdk/react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export function ChatBot() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    // Verificar se o usuário está autenticado
    if (!isAuthenticated) {
      // Redirecionar para a página de login
      router.push('/login');
      return;
    }

    const userMessage = input;
    setInput('');
    setIsTyping(true);

    try {
      await sendMessage({
        role: 'user',
        parts: [{ type: 'text', text: userMessage }],
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="w-16 h-16 bg-[#045C6D] hover:bg-[#0891b2] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group cursor-pointer"
          aria-label="Abrir chat"
        >
          <Image
            src="/images/chat/chat-bot.png"
            alt="ChatBot"
            width={32}
            height={32}
            className="filter brightness-0 invert group-hover:scale-110 transition-transform duration-200"
          />
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-[#045C6D] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/chat/chat-bot.png"
                alt="ChatBot"
                width={24}
                height={24}
                className="filter brightness-0 invert"
              />
              <div>
                <h3 className="font-semibold text-sm">Assistente MIRC</h3>
                <p className="text-xs opacity-90">Online agora</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors cursor-pointer"
              aria-label="Fechar chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {!isAuthenticated ? (
              <div className="text-center">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-600 text-sm mb-2">
                    🔒 Para usar o chat, você precisa estar logado.
                  </p>
                  <button
                    onClick={() => router.push('/login')}
                    className="mt-2 px-4 py-2 bg-[#045C6D] text-white text-xs rounded-lg hover:bg-[#0891b2] transition-colors cursor-pointer"
                  >
                    Fazer Login
                  </button>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-600 text-sm mb-2">
                    👋 Olá{user?.firstName ? `, ${user.firstName}` : ''}! Sou o assistente do MIRC.
                  </p>
                  <p className="text-gray-500 text-xs">
                    Pergunte-me sobre o projeto ou riscos climáticos.
                  </p>
                </div>
              </div>
            ) : null}

            {messages.map((m: UIMessage) => (
               <div
                 key={m.id}
                 className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
               >
                 <div
                   className={`py-3 px-4 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                     m.role === 'user'
                       ? 'bg-[#045C6D] text-white rounded-br-md'
                       : 'bg-white text-gray-800 border border-gray-100 rounded-bl-md'
                   }`}
                 >
                   {m.parts.map((part, index) => {
                     if (part.type === 'text') {
                       return <span key={index} className="whitespace-pre-wrap">{part.text}</span>;
                     }
                     return null;
                   })}
                 </div>
               </div>
             ))}

            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-xs">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder={isAuthenticated ? "Digite sua pergunta..." : "Faça login para usar o chat"}
                disabled={!isAuthenticated}
                className={`flex-1 px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#045C6D] focus:border-transparent ${
                  !isAuthenticated ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              />
              <button
                  type="submit"
                  disabled={!input.trim() || isTyping || !isAuthenticated}
                  className="w-10 h-10 bg-[#045C6D] hover:bg-[#0891b2] disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
                  aria-label="Enviar mensagem"
                >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" transform="rotate(45 12 12)" />
                 </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

