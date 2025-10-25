'use client';

import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login, register, isLoading } = useAuth();
  
  // Estados para mensagens de erro e sucesso
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Estados para login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Estados para registro
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [registerStep, setRegisterStep] = useState(1);

  // Detectar se deve iniciar em modo de cadastro
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'register') {
      // Use setTimeout para evitar setState síncrono dentro do effect
      setTimeout(() => {
        setIsRegisterMode(true);
        setRegisterStep(1);
      }, 0);
    }
  }, [searchParams]);
  
  // Dados do registro - Etapa 1
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  
  // Dados do registro - Etapa 2
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegisterMode) {
      if (registerStep === 1) {
        // Validar primeira etapa e avançar
        if (!firstName || !lastName || !registerEmail || !phone || !zipCode || !city || !state) {
          setRegisterError('Todos os campos são obrigatórios');
          return;
        }
        setRegisterError('');
        setRegisterStep(2);
      } else {
        // Processar registro completo
        if (!registerPassword || !confirmPassword) {
          setRegisterError('Todos os campos são obrigatórios');
          return;
        }
        
        if (registerPassword !== confirmPassword) {
          setRegisterError('As senhas não coincidem');
          return;
        }
        
        if (!acceptTerms) {
          setRegisterError('Você deve aceitar os termos de uso');
          return;
        }
        
        setRegisterError('');
        
        const result = await register({
          firstName,
          lastName,
          email: registerEmail,
          phone,
          password: registerPassword,
          zipCode,
          city,
          state
        });
        
        if (result.success) {
          setRegisterSuccess(true);
          // Limpar formulário
          setFirstName('');
          setLastName('');
          setRegisterEmail('');
          setPhone('');
          setZipCode('');
          setCity('');
          setState('');
          setRegisterPassword('');
          setConfirmPassword('');
          setAcceptTerms(false);
          
          // Voltar para login após 2 segundos
          setTimeout(() => {
            setRegisterSuccess(false);
            backToLogin();
          }, 2000);
        } else {
          setRegisterError(result.error || 'Erro no cadastro');
        }
      }
    } else {
      // Lógica de login
      if (!email || !password) {
        setLoginError('Email e senha são obrigatórios');
        return;
      }
      
      setLoginError('');
      
      const result = await login(email, password);
      
      if (result.success) {
        // Aguardar um pouco para garantir que o estado foi atualizado
        setTimeout(() => {
          router.push('/');
        }, 100);
      } else {
        setLoginError(result.error || 'Erro no login');
      }
    }
  };

  // Função para alternar visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Função para alternar visibilidade da senha de registro
  const toggleRegisterPasswordVisibility = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };

  // Função para alternar visibilidade da confirmação de senha
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Função para alternar entre login e registro
  const toggleToRegister = () => {
    setIsRegisterMode(true);
    setRegisterStep(1);
  };

  // Função para voltar ao login
  const backToLogin = () => {
    setIsRegisterMode(false);
    setRegisterStep(1);
  };

  // Função para voltar à primeira etapa do registro
  const goBackToStep1 = () => {
    setRegisterStep(1);
  };

  // Função para voltar à página inicial
  const goBackToHome = () => {
    router.push('/');
  };

  // Função para ir para a segunda etapa
  const goToStep2 = () => {
    setRegisterStep(2);
  };

  // Função para calcular força da senha
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    
    // Comprimento mínimo
    if (password.length >= 8) strength += 25;
    
    // Contém letras minúsculas
    if (/[a-z]/.test(password)) strength += 15;
    
    // Contém letras maiúsculas
    if (/[A-Z]/.test(password)) strength += 15;
    
    // Contém números
    if (/\d/.test(password)) strength += 15;
    
    // Contém caracteres especiais
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 15;
    
    // Comprimento extra (mais de 12 caracteres)
    if (password.length >= 12) strength += 15;
    
    return Math.min(strength, 100);
  };

  // Função para obter texto da força da senha
  const getPasswordStrengthText = (strength: number): string => {
    if (strength < 50) return 'Fraca';
    if (strength < 75) return 'Média';
    return 'Forte';
  };

  // Função para obter cor da barra de força
  const getPasswordStrengthColor = (strength: number): string => {
    if (strength < 50) return 'bg-red-500';
    if (strength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado Esquerdo - Formulário de Login */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Botão Voltar */}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={goBackToHome}
              className="flex items-center text-[#045C6D] hover:text-[#0891b2] font-medium cursor-pointer transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>
          </div>

          {/* Título */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#045C6D] mb-2">
              {isRegisterMode 
                ? 'Criar conta'
                : 'Faça seu login'
              }
            </h2>
            {isRegisterMode && (
              <div className="flex justify-center mt-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${registerStep === 1 ? 'bg-[#045C6D]' : 'bg-gray-300'}`}></div>
                  <div className={`w-8 h-0.5 ${registerStep === 2 ? 'bg-[#045C6D]' : 'bg-gray-300'}`}></div>
                  <div className={`w-3 h-3 rounded-full ${registerStep === 2 ? 'bg-[#045C6D]' : 'bg-gray-300'}`}></div>
                </div>
              </div>
            )}
          </div>

          {/* Formulário */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {!isRegisterMode ? (
              // FORMULÁRIO DE LOGIN
              <>
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
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="appearance-none relative block w-full px-4 py-3 pr-12 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#045C6D] focus:border-[#045C6D] focus:z-10 text-sm"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Mensagem de erro para login */}
                {loginError && (
                  <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                    {loginError}
                  </div>
                )}

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
                    <a href="#" className="text-[#045C6D] hover:text-[#0891b2] font-medium cursor-pointer">
                      Esqueceu minha senha
                    </a>
                  </div>
                </div>

                {/* Botão de Login */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#045C6D] hover:bg-[#0891b2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#045C6D] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </button>
                </div>

                {/* Link para Criar Conta */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Não tem conta ainda?{' '}
                <button 
                  type="button"
                  onClick={toggleToRegister}
                  className="font-medium text-[#045C6D] hover:text-[#0891b2] cursor-pointer"
                >
                  Crie agora
                </button>
              </p>
            </div>
              </>
            ) : registerStep === 1 ? (
              // FORMULÁRIO DE REGISTRO - ETAPA 1
              <>
                <div className="space-y-4">
                  {/* Nome */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#045C6D] focus:border-[#045C6D] focus:z-10 text-sm"
                        placeholder="Nome"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#045C6D] focus:border-[#045C6D] focus:z-10 text-sm"
                        placeholder="Sobrenome"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      id="registerEmail"
                      name="registerEmail"
                      type="email"
                      required
                      className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#045C6D] focus:border-[#045C6D] focus:z-10 text-sm"
                      placeholder="E-mail"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                  </div>

                  {/* Telefone */}
                  <div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#045C6D] focus:border-[#045C6D] focus:z-10 text-sm"
                      placeholder="Telefone (11) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  {/* CEP e Cidade */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        required
                        maxLength={8}
                        className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#045C6D] focus:border-[#045C6D] focus:z-10 text-sm"
                        placeholder="CEP"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#045C6D] focus:border-[#045C6D] focus:z-10 text-sm"
                        placeholder="Cidade"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Estado */}
                  <div>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      required
                      maxLength={2}
                      className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#045C6D] focus:border-[#045C6D] focus:z-10 text-sm"
                      placeholder="Estado (SP)"
                      value={state}
                      onChange={(e) => setState(e.target.value.toUpperCase())}
                    />
                  </div>
                </div>

                {/* Mensagem de erro para registro etapa 1 */}
                {registerError && registerStep === 1 && (
                  <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                    {registerError}
                  </div>
                )}

                {/* Botões */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={goToStep2}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#045C6D] hover:bg-[#0891b2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#045C6D] transition-all duration-200"
                  >
                    Próximo
                  </button>
                  
                  <div className="w-full text-center text-sm text-gray-600">
                    Já tem conta?{' '}
                    <button
                      type="button"
                      onClick={backToLogin}
                      className="font-medium text-[#045C6D] hover:text-[#0891b2] cursor-pointer"
                    >
                      Faça login
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // FORMULÁRIO DE REGISTRO - ETAPA 2
              <>
                <div className="space-y-4">
                  {/* Campo Senha */}
                  <div className="relative">
                    <input
                      id="registerPassword"
                      name="registerPassword"
                      type={showRegisterPassword ? "text" : "password"}
                      required
                      className="appearance-none relative block w-full px-4 py-3 pr-12 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#045C6D] focus:border-[#045C6D] focus:z-10 text-sm"
                      placeholder="Digite sua senha"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={toggleRegisterPasswordVisibility}
                    >
                      {showRegisterPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Barra de Força da Senha */}
                  {registerPassword && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Força da senha:</span>
                        <span className={`font-medium ${
                          calculatePasswordStrength(registerPassword) < 50 ? 'text-red-500' : 
                          calculatePasswordStrength(registerPassword) < 75 ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {getPasswordStrengthText(calculatePasswordStrength(registerPassword))}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(calculatePasswordStrength(registerPassword))}`}
                          style={{ width: `${calculatePasswordStrength(registerPassword)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Campo Confirmar Senha */}
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      className={`appearance-none relative block w-full px-4 py-3 pr-12 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#045C6D] focus:border-[#045C6D] focus:z-10 text-sm ${
                        confirmPassword && registerPassword !== confirmPassword 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300'
                      }`}
                      placeholder="Confirme sua senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Mensagem de erro para senhas diferentes */}
                  {confirmPassword && registerPassword !== confirmPassword && (
                    <p className="text-red-500 text-xs">As senhas não coincidem</p>
                  )}
                </div>

                {/* Mensagem de erro para registro etapa 2 */}
                {registerError && registerStep === 2 && (
                  <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                    {registerError}
                  </div>
                )}

                {/* Mensagem de sucesso para registro */}
                {registerSuccess && (
                  <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-lg">
                    Conta criada com sucesso! Redirecionando para o login...
                  </div>
                )}

                {/* Checkbox de aceitar termos */}
                <div className="flex items-start space-x-3">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 text-[#045C6D] focus:ring-[#045C6D] border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-gray-600 cursor-pointer">
                    Eu aceito os{' '}
                    <a href="#" className="text-[#045C6D] hover:text-[#0891b2] font-medium cursor-pointer">
                      Termos de Uso
                    </a>
                    {' '}e a{' '}
                    <a href="#" className="text-[#045C6D] hover:text-[#0891b2] font-medium cursor-pointer">
                      Política de Privacidade
                    </a>
                  </label>
                </div>

                {/* Botões */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={!registerPassword || !confirmPassword || registerPassword !== confirmPassword || !acceptTerms || isLoading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#045C6D] hover:bg-[#045C6D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#045C6D] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isLoading ? 'Criando conta...' : 'Criar conta'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={goBackToStep1}
                    className="w-full text-center text-sm text-gray-600 hover:text-[#045C6D] cursor-pointer"
                  >
                    Voltar
                  </button>
                </div>
              </>
            )}
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