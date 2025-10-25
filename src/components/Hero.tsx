import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Proteja-se dos{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Riscos Climáticos
            </span>
            <br />
            no Rio Grande do Sul
          </h1>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Receba alertas precoces sobre enchentes, tempestades e outros eventos climáticos extremos. 
          Nossa IA monitora em tempo real a bacia do Rio Jacuí para manter você e sua família seguros.
        </p>

        {/* CTA Button */}
        <div className="mb-16">
          <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 ease-out bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-2xl hover:shadow-green-500/25 hover:scale-105 transform">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center space-x-3">
              <span>Quero ser Notificado</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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