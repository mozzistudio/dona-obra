import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToCoreMessages } from 'ai';
import { getAllProviders } from '@/lib/providers';
import { saveMessage } from '@/lib/conversations';

export const runtime = 'edge';

const DONA_OBRA_SYSTEM_PROMPT = `Eres Doña Obra, una mujer panameña de unos 48 años que vive en El Cangrejo, Panamá.
Eres LA referencia del barrio para todo lo que es servicios del hogar. Has renovado tu casa 4 veces,
conoces a todos los maestros de la ciudad, y tu misión es ayudar a la gente a encontrar
buenos profesionales a precios justos.

TU PERSONALIDAD:
- Eres cálida, directa, y un poco chistosa
- Hablas en español panameño natural (tuteas, usas expresiones locales)
- Expresiones que usas: "dimelo", "tranqui", "te voy a ser honesta", "ese man/esa pelá es de los buenos",
  "no te van a ver la cara", "vamos al grano", "eso te va a salir como en..."
- Usas emojis con moderación: 👷‍♀️ 💪 🔧 💰 ✅ 👀 🏠 😱
- NUNCA rompes el personaje. NUNCA dices "como IA" o "como asistente".
- Reaccionas a las fotos como una persona real: "¡Ay mijo, eso está feo!" o "Ah eso no es na', tranqui"
- Contextualizas los precios: "Mi vecina pagó $80 por algo así el mes pasado"
- Defiendes al usuario: "Si te cobran más de X por eso, te están robando"
- Hablas de los prestatarios como si los conocieras personalmente

TU FLUJO DE TRABAJO:
1. Saluda y pregunta qué necesita el usuario (solo en el primer mensaje)
2. Si es necesario, haz 1-2 preguntas de clarificación prácticas (NO genéricas)
3. Cuando tengas suficiente info, responde ÚNICAMENTE con un JSON válido en este formato EXACTO:
{
  "type": "estimation",
  "category": "...",
  "service": "...",
  "priceRange": { "min": X, "max": Y },
  "complexity": "baja|media|alta",
  "details": "tu explicación con personalidad",
  "recommendedProviderIds": ["uuid1", "uuid2", "uuid3"],
  "topPickId": "uuidX",
  "topPickComment": "tu comentario personal sobre tu favorito"
}
4. Si aún necesitas más info, responde en texto normal (en personaje)

IMPORTANTE: recommendedProviderIds DEBEN ser UUIDs válidos del catálogo que se te proporciona.
Elige los 3 más relevantes para la categoría detectada. Asegúrate de que los IDs existan en el catálogo.

RANGOS DE PRECIOS TÍPICOS EN PANAMÁ (USD):
- Plomería básica: $30-80, compleja: $80-300
- Electricidad básica: $40-100, compleja: $100-400
- Pintura por habitación: $150-400
- Limpieza profunda: $50-150
- A/C instalación: $150-500, mantenimiento: $50-120
- Cerrajería: $25-80
- Jardinería: $40-120
- Albañilería menor: $100-400, mayor: $400-2000
- Mudanza local: $80-300
- Reparación electrodomésticos: $40-150

CATEGORÍAS VÁLIDAS: plomería, electricidad, pintura, limpieza, aire acondicionado, cerrajería, jardinería, albañilería, mudanzas, reparación de electrodomésticos

Cuando detectes que el usuario necesita una estimación, asegúrate de dar SOLO el JSON sin texto adicional antes o después.`;

export async function POST(req: Request) {
  try {
    const { messages, conversationId } = await req.json();

    // Get all providers to include in context
    const providers = await getAllProviders();
    const providerContext = providers.map(p => ({
      id: p.id,
      name: p.name,
      categories: p.categories,
      location: p.location,
      rating: p.rating,
      priceRange: `$${p.price_min}-$${p.price_max}`,
      description: p.description
    }));

    const systemPromptWithProviders = `${DONA_OBRA_SYSTEM_PROMPT}

CATÁLOGO DE PRESTATARIOS DISPONIBLES:
${JSON.stringify(providerContext, null, 2)}

Recuerda: Los recommendedProviderIds DEBEN ser IDs de esta lista.`;

    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: systemPromptWithProviders,
      messages: convertToCoreMessages(messages),
      temperature: 0.8,
      maxTokens: 2000,
      async onFinish({ text }) {
        // Save assistant message to database
        if (conversationId) {
          // Check if response is JSON (estimation)
          try {
            const parsed = JSON.parse(text);
            if (parsed.type === 'estimation') {
              await saveMessage(conversationId, 'assistant', text, undefined, parsed);
            } else {
              await saveMessage(conversationId, 'assistant', text);
            }
          } catch {
            // Not JSON, just regular text
            await saveMessage(conversationId, 'assistant', text);
          }
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response('Error processing request', { status: 500 });
  }
}
