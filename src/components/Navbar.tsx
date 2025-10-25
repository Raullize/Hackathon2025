import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-[#19323B] shadow-lg border-b border-[#045C6D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-white">Logo</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Parceiros', 'Mapa', 'Depoimentos', 'FAQ', 'Contato'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white hover:bg-[#045C6D]/30 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Login/Signup Button */}
          <div className="flex items-center space-x-4">
            <button className="group relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-[#19323B] transition duration-300 ease-out bg-white rounded-full shadow-md hover:shadow-lg">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#045C6D] to-[#0891b2] group-hover:translate-x-0 ease">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-[#19323B] transition-all duration-300 transform group-hover:translate-x-full ease">
                Entrar
              </span>
              <span className="relative invisible">Entrar</span>
            </button>

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
      </div>
    </nav>
  );
};

export default Navbar;