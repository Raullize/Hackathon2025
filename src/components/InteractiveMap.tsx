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
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

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
                {/* Hover card no canto superior esquerdo */}
                {hoveredCity && (
                  <div className="absolute top-0 left-0 bg-white p-2 rounded-lg shadow-lg border border-gray-200 z-10">
                    <Image 
                      src={`/images/cities/${hoveredCity}.${hoveredCity === 'arroio-dos-ratos' ? 'png' : hoveredCity === 'sao-jeronimo' ? 'jpeg' : 'jpg'}`}
                      alt={cidadesData[hoveredCity].nome}
                      width={225}
                      height={225}
                      className="rounded-lg object-cover shadow-lg border-2 border-gray-100"
                    />
                  </div>
                )}
                
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
                        <g className="cursor-pointer group" 
                           onClick={() => handleCityClick('charqueadas')}
                           onMouseEnter={() => setHoveredCity('charqueadas')}
                           onMouseLeave={() => setHoveredCity(null)}>
                          <circle
                            cx="550"
                            cy="150"
                            r="8"
                            fill={getRiskColor(cidadesData['charqueadas'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          {selectedCity === 'charqueadas' && (
                            <g>
                              {/* Pin body - teardrop shape */}
                              <path
                                d="M550 125 C545 125 541 129 541 134 C541 139 550 150 550 150 C550 150 559 139 559 134 C559 129 555 125 550 125 Z"
                                fill="#dc2626"
                                stroke="white"
                                strokeWidth="2"
                                className="drop-shadow-xl"
                              />
                              {/* Inner circle */}
                              <circle
                                cx="550"
                                cy="134"
                                r="4"
                                fill="white"
                                className="drop-shadow-sm"
                              />
                            </g>
                          )}
                          <text x="550" y="135" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            Charqueadas
                          </text>
                        </g>
                        
                        {/* Triunfo */}
                        <g className="cursor-pointer group" 
                           onClick={() => handleCityClick('triunfo')}
                           onMouseEnter={() => setHoveredCity('triunfo')}
                           onMouseLeave={() => setHoveredCity(null)}>
                          <circle
                            cx="450"
                            cy="175"
                            r="8"
                            fill={getRiskColor(cidadesData['triunfo'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          {selectedCity === 'triunfo' && (
                            <g>
                              {/* Pin body - teardrop shape */}
                              <path
                                d="M450 150 C445 150 441 154 441 159 C441 164 450 175 450 175 C450 175 459 164 459 159 C459 154 455 150 450 150 Z"
                                fill="#dc2626"
                                stroke="white"
                                strokeWidth="2"
                                className="drop-shadow-xl"
                              />
                              {/* Inner circle */}
                              <circle
                                cx="450"
                                cy="159"
                                r="4"
                                fill="white"
                                className="drop-shadow-sm"
                              />
                            </g>
                          )}
                          <text x="450" y="160" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            Triunfo
                          </text>
                        </g>
                        
                        {/* General Câmara */}
                        <g className="cursor-pointer group" 
                           onClick={() => handleCityClick('general-camara')}
                           onMouseEnter={() => setHoveredCity('general-camara')}
                           onMouseLeave={() => setHoveredCity(null)}>
                          <circle
                            cx="370"
                            cy="200"
                            r="8"
                            fill={getRiskColor(cidadesData['general-camara'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          {selectedCity === 'general-camara' && (
                            <g>
                              {/* Pin body - teardrop shape */}
                              <path
                                d="M370 175 C365 175 361 179 361 184 C361 189 370 200 370 200 C370 200 379 189 379 184 C379 179 375 175 370 175 Z"
                                fill="#dc2626"
                                stroke="white"
                                strokeWidth="2"
                                className="drop-shadow-xl"
                              />
                              {/* Inner circle */}
                              <circle
                                cx="370"
                                cy="184"
                                r="4"
                                fill="white"
                                className="drop-shadow-sm"
                              />
                            </g>
                          )}
                          <text x="370" y="185" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            General Câmara
                          </text>
                        </g>
                        
                        {/* São Jerônimo */}
                        <g className="cursor-pointer group" 
                           onClick={() => handleCityClick('sao-jeronimo')}
                           onMouseEnter={() => setHoveredCity('sao-jeronimo')}
                           onMouseLeave={() => setHoveredCity(null)}>
                          <circle
                            cx="490"
                            cy="225"
                            r="8"
                            fill={getRiskColor(cidadesData['sao-jeronimo'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          {selectedCity === 'sao-jeronimo' && (
                            <g>
                              {/* Pin body - teardrop shape */}
                              <path
                                d="M490 200 C485 200 481 204 481 209 C481 214 490 225 490 225 C490 225 499 214 499 209 C499 204 495 200 490 200 Z"
                                fill="#dc2626"
                                stroke="white"
                                strokeWidth="2"
                                className="drop-shadow-xl"
                              />
                              {/* Inner circle */}
                              <circle
                                cx="490"
                                cy="209"
                                r="4"
                                fill="white"
                                className="drop-shadow-sm"
                              />
                            </g>
                          )}
                          <text x="490" y="210" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            São Jerônimo
                          </text>
                        </g>
                        
                        {/* Arroio dos Ratos */}
                        <g className="cursor-pointer group" 
                           onClick={() => handleCityClick('arroio-dos-ratos')}
                           onMouseEnter={() => setHoveredCity('arroio-dos-ratos')}
                           onMouseLeave={() => setHoveredCity(null)}>
                          <circle
                            cx="520"
                            cy="275"
                            r="8"
                            fill={getRiskColor(cidadesData['arroio-dos-ratos'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          {selectedCity === 'arroio-dos-ratos' && (
                            <g>
                              {/* Pin body - teardrop shape */}
                              <path
                                d="M520 250 C515 250 511 254 511 259 C511 264 520 275 520 275 C520 275 529 264 529 259 C529 254 525 250 520 250 Z"
                                fill="#dc2626"
                                stroke="white"
                                strokeWidth="2"
                                className="drop-shadow-xl"
                              />
                              {/* Inner circle */}
                              <circle
                                cx="520"
                                cy="259"
                                r="4"
                                fill="white"
                                className="drop-shadow-sm"
                              />
                            </g>
                          )}
                          <text x="520" y="260" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            Arroio dos Ratos
                          </text>
                        </g>
                        
                        {/* Butiá */}
                        <g className="cursor-pointer group" 
                           onClick={() => handleCityClick('butia')}
                           onMouseEnter={() => setHoveredCity('butia')}
                           onMouseLeave={() => setHoveredCity(null)}>
                          <circle
                            cx="420"
                            cy="310"
                            r="8"
                            fill={getRiskColor(cidadesData['butia'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          {selectedCity === 'butia' && (
                            <g>
                              {/* Pin body - teardrop shape */}
                              <path
                                d="M420 285 C415 285 411 289 411 294 C411 299 420 310 420 310 C420 310 429 299 429 294 C429 289 425 285 420 285 Z"
                                fill="#dc2626"
                                stroke="white"
                                strokeWidth="2"
                                className="drop-shadow-xl"
                              />
                              {/* Inner circle */}
                              <circle
                                cx="420"
                                cy="294"
                                r="4"
                                fill="white"
                                className="drop-shadow-sm"
                              />
                            </g>
                          )}
                          <text x="420" y="295" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            Butiá
                          </text>
                        </g>
                        
                        {/* Minas do Leão */}
                        <g className="cursor-pointer group" 
                           onClick={() => handleCityClick('minas-do-leao')}
                           onMouseEnter={() => setHoveredCity('minas-do-leao')}
                           onMouseLeave={() => setHoveredCity(null)}>
                          <circle
                            cx="320"
                            cy="340"
                            r="8"
                            fill={getRiskColor(cidadesData['minas-do-leao'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          {selectedCity === 'minas-do-leao' && (
                            <g>
                              {/* Pin body - teardrop shape */}
                              <path
                                d="M320 315 C315 315 311 319 311 324 C311 329 320 340 320 340 C320 340 329 329 329 324 C329 319 325 315 320 315 Z"
                                fill="#dc2626"
                                stroke="white"
                                strokeWidth="2"
                                className="drop-shadow-xl"
                              />
                              {/* Inner circle */}
                              <circle
                                cx="320"
                                cy="324"
                                r="4"
                                fill="white"
                                className="drop-shadow-sm"
                              />
                            </g>
                          )}
                          <text x="320" y="325" textAnchor="middle" className="text-sm fill-gray-800 font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            Minas do Leão
                          </text>
                        </g>
                        
                        {/* Barão do Triunfo */}
                        <g className="cursor-pointer group" 
                           onClick={() => handleCityClick('barao-do-triunfo')}
                           onMouseEnter={() => setHoveredCity('barao-do-triunfo')}
                           onMouseLeave={() => setHoveredCity(null)}>
                          <circle
                            cx="450"
                            cy="395"
                            r="8"
                            fill={getRiskColor(cidadesData['barao-do-triunfo'].risco)}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity drop-shadow-lg"
                          />
                          {selectedCity === 'barao-do-triunfo' && (
                            <g>
                              {/* Pin body - teardrop shape */}
                              <path
                                d="M450 370 C445 370 441 374 441 379 C441 384 450 395 450 395 C450 395 459 384 459 379 C459 374 455 370 450 370 Z"
                                fill="#dc2626"
                                stroke="white"
                                strokeWidth="2"
                                className="drop-shadow-xl"
                              />
                              {/* Inner circle */}
                              <circle
                                cx="450"
                                cy="379"
                                r="4"
                                fill="white"
                                className="drop-shadow-sm"
                              />
                            </g>
                          )}
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
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
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
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
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