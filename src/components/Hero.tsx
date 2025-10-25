'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  const handleSignupClick = () => {
    router.push('/login?mode=register');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/background-1.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
      
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-4">
            Proteja-se dos{' '}
            <span className="text-[#0891b2]">
              Riscos Climáticos
            </span>
            <br />
            no Rio Grande do Sul
          </h1>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-gray-100 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
          Receba alertas precoces sobre enchentes, tempestades e outros eventos climáticos extremos. 
          O MIRC monitora em tempo real a bacia do Rio Jacuí para manter você e sua família seguros.
        </p>

        <div className="mb-12 sm:mb-16 px-4">
          <button 
            onClick={handleSignupClick}
            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 ease-out bg-[#045C6D] hover:bg-[#0891b2] rounded-lg shadow-2xl hover:shadow-[#0891b2]/25 hover:scale-105 transform cursor-pointer w-full sm:w-auto"
          >
            <span className="relative flex items-center justify-center space-x-2 sm:space-x-3">
              <span className="text-center">Cadastre-se para Alertas</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;