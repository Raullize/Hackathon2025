'use client';

import React from 'react';
import Image from 'next/image';

const Partners = () => {
  // Array com os logos dos parceiros - JGB, Gerdau e GKN duas vezes cada
  const partners = [
    { name: 'JGB', logo: '/images/companies/jgb-logo.png' },
    { name: 'Gerdau', logo: '/images/companies/gerdau-logo.png' },
    { name: 'GKN', logo: '/images/companies/gkn-logo.png' },
    { name: 'JGB', logo: '/images/companies/jgb-logo.png' },
    { name: 'Gerdau', logo: '/images/companies/gerdau-logo.png' },
    { name: 'GKN', logo: '/images/companies/gkn-logo.png' }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0891b2] mb-8 sm:mb-12">
          Veja quem confia no nosso trabalho
        </h2>
        
        {/* Grid de logos estático */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 justify-items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="w-32 h-16 sm:w-40 sm:h-20 lg:w-48 lg:h-24 bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-200 p-2 sm:p-4"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={60}
                className="object-contain max-w-full max-h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;