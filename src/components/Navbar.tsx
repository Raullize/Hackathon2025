'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleLogoutClick = () => {
    logout();
    router.push('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { name: 'Parceiros', href: '#parceiros' },
    { name: 'Mapa', href: '#mapa' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contato', href: '#contato' }
  ];

  return (
    <>
      <nav className="bg-[#19323B] shadow-lg border-b border-[#045C6D]/20 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="shrink-0">
              <Image 
                src="/logos/logo-2.png" 
                alt="MIRC Logo" 
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-baseline space-x-6">
                 {['Parceiros', 'Mapa', 'Depoimentos', 'FAQ', 'Contato'].map((item) => (
                   <a
                     key={item}
                     href={`#${item.toLowerCase()}`}
                     className="text-gray-300 hover:text-white hover:bg-[#045C6D]/30 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out border border-transparent hover:border-[#045C6D]/50 cursor-pointer"
                   >
                     {item}
                   </a>
                 ))}
               </div>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300 text-sm">
                    Olá, {user?.firstName}
                  </span>
                  <button 
                    onClick={handleLogoutClick}
                    className="bg-red-500/10 backdrop-blur-md hover:bg-red-500/20 text-red-300 hover:text-red-200 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out border border-red-500/20 hover:border-red-500/40 shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleLoginClick}
                  className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Entrar
                </button>
              )}
            </div>
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-white p-2 cursor-pointer transition-colors duration-200"
                aria-label="Abrir menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <div className={`fixed top-0 left-0 h-full w-80 bg-[#19323B] transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-[#045C6D]/20">
          <div className="flex items-center">
            <Image 
              src="/logos/logo-2.png" 
              alt="MIRC Logo" 
              width={32}
              height={32}
              className="h-8 w-auto"
            />
          </div>
          <button 
            onClick={closeMobileMenu}
            className="text-gray-300 hover:text-white p-2 cursor-pointer transition-colors duration-200"
            aria-label="Fechar menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="py-6">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={closeMobileMenu}
              className="block px-6 py-4 text-gray-300 hover:text-white hover:bg-[#045C6D]/20 transition-all duration-200 cursor-pointer border-l-4 border-transparent hover:border-[#0891b2]"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="border-t border-[#045C6D]/20 mx-6"></div>

        <div className="p-6">
          <h3 className="text-[#0891b2] text-lg font-semibold mb-4">Entre em Contato</h3>
          <div className="space-y-3">
            <p className="text-gray-300 text-sm">contato@mirc.com.br</p>
            <p className="text-gray-300 text-sm">(51) 3333-4444</p>
          </div>
          
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-gray-300 hover:text-[#0891b2] transition-colors duration-200 cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-[#0891b2] transition-colors duration-200 cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-[#0891b2] transition-colors duration-200 cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-[#0891b2] transition-colors duration-200 cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </a>
          </div>

          {isAuthenticated ? (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-gray-300 text-sm">
                  Olá, {user?.firstName}
                </span>
              </div>
              <button 
                onClick={() => {
                  handleLogoutClick();
                  closeMobileMenu();
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer"
              >
                Sair
              </button>
            </div>
          ) : (
            <button 
              onClick={() => {
                handleLoginClick();
                closeMobileMenu();
              }}
              className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;