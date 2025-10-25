'use client';

import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de login aqui
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado Esquerdo - Formulário de Login */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Título */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#045C6D] mb-2">
              Faça seu login
            </h2>
          </div>

          {/* Formulário */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Campo Email */}
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#045C6D] focus:border-[#045C6D] focus:z-10 text-sm"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Campo Senha */}
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#045C6D] focus:border-[#045C6D] focus:z-10 text-sm"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Opções */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#045C6D] focus:ring-[#045C6D] border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 text-gray-600">
                  Lembrar senha
                </label>
              </div>

              <div>
                <a href="#" className="text-[#045C6D] hover:text-[#0891b2] font-medium">
                  Esqueceu minha senha
                </a>
              </div>
            </div>

            {/* Botão de Login */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#045C6D] hover:bg-[#0891b2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#045C6D] transition-all duration-200"
              >
                Entrar
              </button>
            </div>

            {/* Link para Criar Conta */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Não tem conta ainda?{' '}
                <a href="#" className="font-medium text-[#045C6D] hover:text-[#0891b2]">
                  Crie agora
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Lado Direito - Vídeo Background */}
      <div className="hidden lg:flex flex-1 relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/background-2.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
        
        {/* Overlay escuro para melhor legibilidade */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Blur verde sutil */}
        <div className="absolute inset-0 bg-[#045C6D]/25 backdrop-blur-[1px]"></div>
      </div>
    </div>
  );
};

export default Login;