import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { CoreMessage, streamText, UIMessage } from 'ai';

export const runtime = 'edge';

const currentDate = new Date().toLocaleDateString('pt-BR');

const MIRC_KNOWLEDGE_BASE = `Você é o assistente de IA do MIRC (Mapeador Inteligente de Resiliência Climática). A data atual é ${currentDate}.
Sua função é responder perguntas sobre o projeto MIRC e, quando perguntado sobre riscos climáticos ATUAIS em uma cidade específica do RS (especialmente bacia do Rio Jacuí), procure na internet para obter informações atualizadas antes de responder.
Seja conciso, prestativo e foque na segurança, além de verificar para ver se os dados são atualizados (considere a data atual: ${currentDate}).
Nunca invente alertas ou níveis de risco.
Se a busca na internet não fornecer informações específicas sobre alertas ativos, informe ao usuário que não foram encontrados alertas ativos conhecidos para a cidade no momento, mas que ele deve sempre ficar atento aos canais oficiais da Defesa Civil.

**Sobre o MIRC (para perguntas gerais):**
- É uma aplicação web com IA e geolocalização.
- Foco: Alertas precoces e informações personalizadas sobre riscos climáticos (inundações, eventos extremos) no Rio Grande do Sul, bacia do Rio Jacuí.
- Funcionalidades: Mapa Interativo, Alertas Multicanal (SMS, WhatsApp), Agente de IA (Você).
`;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages: uiMessages }: { messages: UIMessage[] } =
      await req.json();

    const coreMessages: CoreMessage[] = uiMessages.map((message) => ({
      role: message.role,

      content: message.parts
        .filter((part) => part.type === 'text')
        .map((part) => part.text)
        .join(''),
    }));

    const result = await streamText({
      model: google('models/gemini-2.5-pro'),
      system: MIRC_KNOWLEDGE_BASE,
      messages: coreMessages,
    });
    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error('Erro na API de chat:', error);

    if (error.name === 'AI_InvalidPromptError' && error.cause?.issues) {
      console.error(
        'Detalhes da Validação:',
        JSON.stringify(error.cause.issues, null, 2)
      );
    }

    return new Response(
      JSON.stringify({ error: 'Falha ao processar a solicitação.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
