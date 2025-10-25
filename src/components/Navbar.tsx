import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-[#19323B] shadow-lg border-b border-[#045C6D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <span className="text-xl font-bold text-white">Logo</span>
          </div>

          {/* Navigation Links - Moved to right side */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-6">
               {['Parceiros', 'Mapa', 'Depoimentos', 'FAQ', 'Contato'].map((item) => (
                 <a
                   key={item}
                   href={`#${item.toLowerCase()}`}
                   className="text-gray-300 hover:text-white hover:bg-[#045C6D]/30 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out border border-transparent hover:border-[#045C6D]/50"
                 >
                   {item}
                 </a>
               ))}
             </div>

            {/* Login/Signup Button - Glass Effect */}
            <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl">
              Entrar
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;