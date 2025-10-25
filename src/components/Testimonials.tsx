'use client';

import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      location: "São Jerônimo, RS",
      avatar: "MS",
      rating: 5,
      text: "O sistema me alertou sobre uma enchente 2 horas antes de acontecer. Consegui retirar minha família e nossos pertences a tempo. Sem dúvida salvou nossas vidas!",
      category: "Alerta de Enchente"
    },
    {
      id: 2,
      name: "João Santos",
      location: "Triunfo, RS", 
      avatar: "JS",
      rating: 5,
      text: "O chatbot me ajudou a entender os riscos da minha região em poucos minutos. Muito prático e informativo, agora sei exatamente como me preparar para emergências.",
      category: "Chatbot Informativo"
    },
    {
      id: 3,
      name: "Ana Costa",
      location: "Charqueadas, RS",
      avatar: "AC",
      rating: 5,
      text: "Recebi um alerta de deslizamento que me fez evacuar minha casa. No dia seguinte, parte do morro realmente deslizou. Sou eternamente grata por este sistema!",
      category: "Alerta de Deslizamento"
    },
    {
      id: 4,
      name: "Carlos Oliveira",
      location: "Butiá, RS",
      avatar: "CO",
      rating: 5,
      text: "Como empresário, uso o sistema para proteger meus funcionários. Os alertas são precisos e me permitem tomar decisões rápidas para garantir a segurança de todos.",
      category: "Proteção Empresarial"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Depoimentos
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Conheça as histórias de pessoas que foram protegidas pelo nosso sistema de alertas
            e encontraram no nosso chatbot uma fonte confiável de informações sobre segurança.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              {/* Header do Card */}
              <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center min-w-0 flex-1">
                  {/* Avatar */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#045C6D] rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm mr-3 sm:mr-4 shrink-0">
                    {testimonial.avatar}
                  </div>
                  
                  {/* Nome e Localização */}
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{testimonial.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{testimonial.location}</p>
                  </div>
                </div>

                {/* Categoria */}
                <span className="bg-[#045C6D]/10 text-[#045C6D] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shrink-0">
                  {testimonial.category}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                ))}
              </div>

              {/* Depoimento */}
              <blockquote className="text-gray-700 italic text-sm sm:text-base leading-relaxed">
                &quot;{testimonial.text}&quot;
              </blockquote>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Você também pode fazer parte dessas histórias de proteção e segurança.
          </p>
          <button className="bg-[#045C6D] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#0891b2] transition-colors duration-200 cursor-pointer">
            Ver Mais Depoimentos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;