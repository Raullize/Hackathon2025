import { NextResponse } from 'next/server';

// Interface para definir a estrutura dos nossos dados do mapa
export interface CityMapData {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  data: {
    waterLevel: number; 
    status: 'normal' | 'alerta' | 'emergencia';
    riskLevel: 'baixo' | 'medio' | 'alto';
    lastUpdate: string;
    details: string;
    temperature: number; 
    humidity: number;    
    population: number;  
  };
}

// mock de dados para o mapa
const mockMapData: CityMapData[] = [
  {
    id: 'arroio_dos_ratos',
    name: 'Arroio dos Ratos',
    coordinates: {
      lat: -30.0758,
      lng: -51.7303,
    },
    imageUrl: "/maps/arroio-dos-ratos.jpg", 
    data: {
      waterLevel: 1.5,
      status: 'normal',
      riskLevel: 'baixo',
      lastUpdate: new Date().toISOString(),
      details: 'Nível do rio estável. Sem riscos imediatos reportados.',
      temperature: 24.5,
      humidity: 75,
      population: 13645,
    },
  },
  {
    id: 'barao_do_triunfo',
    name: 'Barão do Triunfo',
    coordinates: {
      lat: -30.3842,
      lng: -51.7056,
    },
    imageUrl: "/maps/barao-do-triunfo.jpg", 
    data: {
      waterLevel: 1.2,
      status: 'normal',
      riskLevel: 'baixo',
      lastUpdate: new Date().toISOString(),
      details: 'Situação normal. Monitoramento de rotina.',
      temperature: 23.1,
      humidity: 80,
      population: 7249,
    },
  },
  {
    id: 'butia',
    name: 'Butiá',
    coordinates: {
      lat: -30.1206,
      lng: -51.9639,
    },
    imageUrl: "/maps/butia.jpg", 
    data: {
      waterLevel: 2.0,
      status: 'alerta',
      riskLevel: 'medio',
      lastUpdate: new Date().toISOString(),
      details: 'Nível do rio subindo. Atenção para áreas próximas à bacia.',
      temperature: 24.2,
      humidity: 77,
      population: 21146,
    },
  },
  {
    id: 'charqueadas',
    name: 'Charqueadas',
    coordinates: {
      lat: -29.9555,
      lng: -51.6254,
    },
    imageUrl: "/maps/charqueadas.jpg", 
    data: {
      waterLevel: 2.2,
      status: 'alerta',
      riskLevel: 'medio',
      lastUpdate: new Date().toISOString(),
      details: 'Nível do rio subindo moderadamente. Risco de inundação em áreas ribeirinhas baixas.',
      temperature: 25.0,
      humidity: 72,
      population: 41183,
    },
  },
  {
    id: 'general_camara',
    name: 'General Câmara',
    coordinates: {
      lat: -29.9078,
      lng: -51.7917,
    },
    imageUrl: "/maps/general-camara.jpg", 
    data: {
      waterLevel: 2.9,
      status: 'emergencia',
      riskLevel: 'alto',
      lastUpdate: new Date().toISOString(),
      details: 'Nível de água se aproximando da cota de inundação. Risco iminente.',
      temperature: 24.8,
      humidity: 74,
      population: 7837,
    },
  },
  {
    id: 'minas_do_leao',
    name: 'Minas do Leão',
    coordinates: {
      lat: -30.1347,
      lng: -52.0519,
    },
    imageUrl: "/maps/minas-do-leao.jpg", 
    data: {
      waterLevel: 1.9,
      status: 'alerta',
      riskLevel: 'medio',
      lastUpdate: new Date().toISOString(),
      details: 'Chuvas intensas na cabeceira. Monitoramento constante.',
      temperature: 23.9,
      humidity: 78,
      population: 7666,
    },
  },
  {
    id: 'sao_jeronimo',
    name: 'São Jerônimo',
    coordinates: {
      lat: -29.9592,
      lng: -51.7224,
    },
    imageUrl: "/maps/sao-jeronimo.jpg", 
    data: {
      waterLevel: 2.3,
      status: 'alerta',
      riskLevel: 'medio',
      lastUpdate: new Date().toISOString(),
      details: 'Nível do rio acima do normal. Pontos de atenção monitorados.',
      temperature: 24.7,
      humidity: 73,
      population: 22136,
    },
  },
  {
    id: 'triunfo',
    name: 'Triunfo',
    coordinates: {
      lat: -29.9429,
      lng: -51.718,
    },
    imageUrl: "/maps/triunfo.jpg", 
    data: {
      waterLevel: 3.2,
      status: 'emergencia',
      riskLevel: 'alto',
      lastUpdate: new Date().toISOString(),
      details: 'Nível de água acima da cota de inundação. Alerta máximo para evacuação de áreas de risco.',
      temperature: 25.1,
      humidity: 71,
      population: 30467,
    },
  },
];

/**
 * API Handler para buscar os dados mocados do mapa.
 */
export async function GET(request: Request) {
  try {
    const data = mockMapData;
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Erro ao buscar dados do mapa:', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}