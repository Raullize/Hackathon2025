'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // Primeiro item aberto por padrão

  const faqData = [
    {
      question: "Vocês garantem resultado?",
      answer: "Sim! Nosso sistema utiliza dados em tempo real de órgãos oficiais como INMET, CEMADEN e Defesa Civil. Garantimos alertas precisos e atualizados para que você possa se preparar adequadamente para eventos climáticos extremos. Nossa tecnologia tem mais de 95% de precisão na detecção de riscos."
    },
    {
      question: "Quais serviços vocês prestam?",
      answer: "Oferecemos alertas personalizados para diversos tipos de desastres naturais: chuvas intensas, enchentes, deslizamentos, secas, tempestades e eventos sísmicos. Também fornecemos mapas interativos de risco, histórico de eventos na sua região e recomendações de segurança específicas para cada situação."
    },
    {
      question: "Como funciona o sistema de alertas?",
      answer: "Nosso sistema monitora continuamente dados meteorológicos e geológicos de diversas fontes oficiais. Quando detectamos condições de risco na sua região, enviamos alertas instantâneos via SMS, email, push notification e WhatsApp, com informações detalhadas sobre o tipo de risco e medidas preventivas recomendadas."
    },
    {
      question: "Quais regiões são cobertas?",
      answer: "Atualmente estamos operando apenas na região carbonífera. Nossa estratégia de expansão é gradual: primeiro consolidamos nosso serviço na região carbonífera, depois expandimos para todo o Rio Grande do Sul e, por fim, para todo o território brasileiro. Essa abordagem nos permite garantir a máxima qualidade e precisão dos alertas antes de escalar nacionalmente."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[#045C6D] uppercase tracking-wide mb-2">
            FAQ
          </p>
          <h2 className="text-3xl font-bold text-[#045C6D] mb-4">
            Dúvidas Frequentes
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                <span className="font-medium text-gray-900 pr-4">
                  {item.question}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 shrink-0 ${
                    openItems.includes(index) ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ainda tem dúvidas? Entre em contato conosco!
          </p>
          <button className="bg-[#045C6D] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0891b2] transition-colors duration-200 cursor-pointer">
            Falar com Suporte
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;