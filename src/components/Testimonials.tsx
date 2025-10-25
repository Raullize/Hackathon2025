'use client';

import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      location: "Criciúma, SC",
      avatar: "MS",
      rating: 5,
      text: "O sistema me alertou sobre uma enchente 2 horas antes de acontecer. Consegui retirar minha família e nossos pertences a tempo. Sem dúvida salvou nossas vidas!",
      category: "Alerta de Enchente"
    },
    {
      id: 2,
      name: "João Santos",
      location: "Tubarão, SC", 
      avatar: "JS",
      rating: 5,
      text: "O chatbot me ajudou a entender os riscos da minha região em poucos minutos. Muito prático e informativo, agora sei exatamente como me preparar para emergências.",
      category: "Chatbot Informativo"
    },
    {
      id: 3,
      name: "Ana Costa",
      location: "Lauro Müller, SC",
      avatar: "AC",
      rating: 5,
      text: "Recebi um alerta de deslizamento que me fez evacuar minha casa. No dia seguinte, parte do morro realmente deslizou. Sou eternamente grata por este sistema!",
      category: "Alerta de Deslizamento"
    },
    {
      id: 4,
      name: "Carlos Oliveira",
      location: "Siderópolis, SC",
      avatar: "CO",
      rating: 5,
      text: "Como empresário, uso o sistema para proteger meus funcionários. Os alertas são precisos e me permitem tomar decisões rápidas para garantir a segurança de todos.",
      category: "Proteção Empresarial"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Depoimentos
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conheça as histórias de pessoas que foram protegidas pelo nosso sistema de alertas
            e encontraram no nosso chatbot uma fonte confiável de informações sobre segurança.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Header do Card */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-4">
                    {testimonial.avatar}
                  </div>
                  
                  {/* Nome e Localização */}
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>

                {/* Categoria */}
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {testimonial.category}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Depoimento */}
              <blockquote className="text-gray-700 italic">
                "{testimonial.text}"
              </blockquote>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Você também pode fazer parte dessas histórias de proteção e segurança.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
            Cadastre-se para Alertas
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;