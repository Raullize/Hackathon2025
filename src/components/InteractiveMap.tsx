'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface CityData {
  nome: string;
  temperatura: string;
  umidade: string;
  risco: 'Baixo' | 'Médio' | 'Alto';
  alertas: string[];
  populacao: string;
  ultimaAtualizacao: string;
}

const InteractiveMap = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Dados mockados das cidades da região do Jacuí
  const cidadesData: Record<string, CityData> = {
    'arroio-dos-ratos': {
      nome: 'Arroio dos Ratos',
      temperatura: '24°C',
      umidade: '68%',
      risco: 'Baixo',
      alertas: ['Chuva leve prevista para hoje à tarde'],
      populacao: '13.606 hab',
      ultimaAtualizacao: '10:30'
    },
    'minas-do-leao': {
      nome: 'Minas do Leão',
      temperatura: '23°C',
      umidade: '72%',
      risco: 'Médio',
      alertas: ['Possível alagamento em áreas baixas', 'Vento forte até 18h'],
      populacao: '9.212 hab',
      ultimaAtualizacao: '10:25'
    },
    'barao-do-triunfo': {
      nome: 'Barão do Triunfo',
      temperatura: '22°C',
      umidade: '65%',
      risco: 'Baixo',
      alertas: [],
      populacao: '3.076 hab',
      ultimaAtualizacao: '10:20'
    },
    'sao-jeronimo': {
      nome: 'São Jerônimo',
      temperatura: '25°C',
      umidade: '70%',
      risco: 'Alto',
      alertas: ['Alerta de enchente - Rio Jacuí', 'Evacuação preventiva recomendada'],
      populacao: '22.134 hab',
      ultimaAtualizacao: '10:35'
    },
    'butia': {
      nome: 'Butiá',
      temperatura: '24°C',
      umidade: '66%',
      risco: 'Médio',
      alertas: ['Chuva intensa nas próximas 2h'],
      populacao: '20.832 hab',
      ultimaAtualizacao: '10:28'
    },
    'triunfo': {
      nome: 'Triunfo',
      temperatura: '26°C',
      umidade: '74%',
      risco: 'Alto',
      alertas: ['Nível do Rio Jacuí em elevação', 'Monitoramento contínuo ativo'],
      populacao: '27.712 hab',
      ultimaAtualizacao: '10:32'
    },
    'charqueadas': {
      nome: 'Charqueadas',
      temperatura: '25°C',
      umidade: '69%',
      risco: 'Médio',
      alertas: ['Chuva moderada até 16h'],
      populacao: '38.615 hab',
      ultimaAtualizacao: '10:26'
    },
    'general-camara': {
      nome: 'General Câmara',
      temperatura: '23°C',
      umidade: '71%',
      risco: 'Baixo',
      alertas: ['Tempo estável'],
      populacao: '8.447 hab',
      ultimaAtualizacao: '10:22'
    }
  };

  const getRiskColor = (risco: string) => {
    switch (risco) {
      case 'Alto': return '#ef4444';
      case 'Médio': return '#f59e0b';
      case 'Baixo': return '#10b981';
      default: return '#6b7280';
    }
  };

  const handleCityClick = (cityId: string) => {
    setSelectedCity(cityId);
  };

  const selectedCityData = selectedCity ? cidadesData[selectedCity] : null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#0891b2] mb-4">
          Mapa de Riscos Climáticos - Região do Jacuí
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Clique nas cidades para ver informações climáticas em tempo real
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mapa SVG */}
          <div className="lg:w-2/3">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 relative h-full">
              {/* Legenda movida para fora do SVG */}
              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md border border-gray-200">
                <p className="text-sm font-bold text-gray-800 mb-2">Nível de Risco Climático:</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-700">Baixo</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-gray-700">Médio</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-gray-700">Alto</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Fonte: Dados simulados para demonstração</p>
              </div>
              
              {/* Mapa do Rio Grande do Sul usando imagem */}
              <div className="relative flex justify-center">
                <Image 
                  src="/images/map/rs.png" 
                  alt="Mapa do Rio Grande do Sul" 
                  width={800}
                  height={600}
                  className="max-w-full h-auto object-contain"
                  style={{ maxHeight: '500px' }}
                  priority
                />
                
                {/* SVG overlay para os pontos das cidades */}
                <svg 
                  className="absolute top-0 left-0 w-full h-full" 
                  viewBox="0 0 800 600" 
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g>
                        {/* Charqueadas */}
                        <g className="cursor-pointer group" onClick={() => handleCityClick('charqueadas')}>
                          <circle
                            cx="550"
                            cy="150"
                            r="8"
                            fill={getRiskColor(cidadesData['charqueadas'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          <text x="550" y="135" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            Charqueadas
                          </text>
                        </g>
                        
                        {/* Triunfo */}
                        <g className="cursor-pointer group" onClick={() => handleCityClick('triunfo')}>
                          <circle
                            cx="450"
                            cy="175"
                            r="8"
                            fill={getRiskColor(cidadesData['triunfo'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          <text x="450" y="160" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            Triunfo
                          </text>
                        </g>
                        
                        {/* General Câmara */}
                        <g className="cursor-pointer group" onClick={() => handleCityClick('general-camara')}>
                          <circle
                            cx="370"
                            cy="200"
                            r="8"
                            fill={getRiskColor(cidadesData['general-camara'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          <text x="370" y="185" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            General Câmara
                          </text>
                        </g>
                        
                        {/* São Jerônimo */}
                        <g className="cursor-pointer group" onClick={() => handleCityClick('sao-jeronimo')}>
                          <circle
                            cx="490"
                            cy="225"
                            r="8"
                            fill={getRiskColor(cidadesData['sao-jeronimo'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          <text x="490" y="210" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            São Jerônimo
                          </text>
                        </g>
                        
                        {/* Arroio dos Ratos */}
                        <g className="cursor-pointer group" onClick={() => handleCityClick('arroio-dos-ratos')}>
                          <circle
                            cx="520"
                            cy="275"
                            r="8"
                            fill={getRiskColor(cidadesData['arroio-dos-ratos'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          <text x="520" y="260" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            Arroio dos Ratos
                          </text>
                        </g>
                        
                        {/* Butiá */}
                        <g className="cursor-pointer group" onClick={() => handleCityClick('butia')}>
                          <circle
                            cx="420"
                            cy="310"
                            r="8"
                            fill={getRiskColor(cidadesData['butia'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          <text x="420" y="295" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            Butiá
                          </text>
                        </g>
                        
                        {/* Minas do Leão */}
                        <g className="cursor-pointer group" onClick={() => handleCityClick('minas-do-leao')}>
                          <circle
                            cx="320"
                            cy="340"
                            r="8"
                            fill={getRiskColor(cidadesData['minas-do-leao'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          <text x="320" y="325" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            Minas do Leão
                          </text>
                        </g>
                        
                        {/* Barão do Triunfo */}
                        <g className="cursor-pointer group" onClick={() => handleCityClick('barao-do-triunfo')}>
                          <circle
                            cx="450"
                            cy="395"
                            r="8"
                            fill={getRiskColor(cidadesData['barao-do-triunfo'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          <text x="450" y="380" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            Barão do Triunfo
                          </text>
                        </g>
                      </g>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Sidebar com informações */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 h-full">
              {selectedCityData ? (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {selectedCityData.nome}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Temperatura</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {selectedCityData.temperatura}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Umidade</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {selectedCityData.umidade}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Nível de Risco</p>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getRiskColor(selectedCityData.risco) }}
                        />
                        <p className="text-lg font-semibold text-gray-800">
                          {selectedCityData.risco}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-gray-600">População</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {selectedCityData.populacao}
                      </p>
                    </div>
                    
                    {selectedCityData.alertas.length > 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                        <p className="text-sm font-semibold text-yellow-800 mb-2">
                          Alertas Ativos
                        </p>
                        <ul className="space-y-1">
                          {selectedCityData.alertas.map((alerta, index) => (
                            <li key={index} className="text-sm text-yellow-700">
                              • {alerta}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500 text-center">
                      Última atualização: {selectedCityData.ultimaAtualizacao}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium mb-2">
                    Selecione uma cidade
                  </p>
                  <p className="text-sm">
                    Clique em qualquer cidade no mapa para ver informações climáticas detalhadas
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;