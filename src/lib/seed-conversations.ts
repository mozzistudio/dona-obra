import { supabase } from './supabase';
import { setConversationMeta } from './conversations';
import { ConversationMeta } from './types';

const SEED_KEY = 'donaObraSeeded_v4';

const WELCOME_MESSAGE = `¡Ey, dimelo! 👷‍♀️ Soy Doña Obra, tu vecina de confianza pa' todo lo que es reparaciones y servicios del hogar. Yo conozco a todos los buenos maestros de la ciudad 💪

Cuéntame qué necesitas — mándame texto, fotos, lo que sea — y yo te digo cuánto te va a salir y quién te lo puede resolver. ¡Vamos al grano! 🔧`;

interface SeedMsg {
  role: 'user' | 'assistant';
  content: string;
  image_urls?: string[];
  delay_minutes: number;
}

interface SeedConv {
  meta: Omit<ConversationMeta, 'id'>;
  user_name: string;
  user_avatar: string;
  topic: string;
  messages: SeedMsg[];
}

const SAMPLE_CONVERSATIONS: SeedConv[] = [
  {
    meta: {
      type: 'dona_obra',
      title: 'Doña Obra',
      lastMessage: 'Aquí están los 3 mejores profesionales disponibles en tu zona 👇',
      lastMessageAt: '',
    },
    user_name: '',
    user_avatar: '',
    topic: 'Tubería goteando en el baño',
    messages: [
      {
        role: 'assistant',
        content: WELCOME_MESSAGE,
        delay_minutes: 0,
      },
      {
        role: 'user',
        content: 'Mira esta tubería del baño, está goteando fuerte 😰',
        image_urls: [
          'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop&auto=format',
        ],
        delay_minutes: 2,
      },
      {
        role: 'assistant',
        content:
          '¡Uy mijo! Se ve que está chorreando bastante esa tubería 😬 Pero tranqui, eso se arregla.\n\n¿Es una fuga activa ahora mismo o es algo a revisar sin urgencia?',
        delay_minutes: 3,
      },
      {
        role: 'user',
        content: 'Es activa ahora, agua fría, sale de las conexiones visibles debajo del lavamanos',
        delay_minutes: 5,
      },
      {
        role: 'assistant',
        content:
          'Perfecto, ya entendí el problema 💪 Para afinar el estimado — ¿en qué barrio o corregimiento está la propiedad, y para cuándo lo necesitas?\n→ Hoy urgente / Esta semana / Sin prisa',
        delay_minutes: 6,
      },
      {
        role: 'user',
        content: 'Bella Vista, para hoy urgente',
        delay_minutes: 8,
      },
      {
        role: 'assistant',
        content:
          'Listo mijo 💪 Con urgencia en Bella Vista, aquí va tu estimación:\n\n💰 **Estimación para tu proyecto**\n**Mano de obra:** $35 – $80\n**Materiales estimados:** $10 – $30 *(sellos, conectores, cinta teflón)*\n**Total estimado:** $45 – $110\n⚠️ *Esta estimación es orientativa. El precio final lo define el profesional tras evaluar en sitio.*\nLos factores que más pueden afectar el precio: urgencia del día, acceso a las conexiones, estado general de la tubería.\n\nAquí están los 3 mejores profesionales disponibles en tu zona 👇',
        delay_minutes: 9,
      },
    ],
  },
];

export async function seedSampleConversations(): Promise<ConversationMeta[]> {
  if (typeof window !== 'undefined' && localStorage.getItem(SEED_KEY)) {
    return [];
  }

  const createdMetas: ConversationMeta[] = [];

  for (const conv of SAMPLE_CONVERSATIONS) {
    try {
      const baseTime = new Date();
      const convOffset = SAMPLE_CONVERSATIONS.indexOf(conv) * 60;
      const convStartTime = new Date(baseTime.getTime() - convOffset * 60 * 1000);

      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .insert({
          status: 'active',
          started_at: convStartTime.toISOString(),
          last_message_at: new Date(
            convStartTime.getTime() +
              conv.messages[conv.messages.length - 1].delay_minutes * 60 * 1000
          ).toISOString(),
          user_name: conv.user_name,
          user_avatar: conv.user_avatar,
          topic: conv.topic,
        })
        .select('id')
        .single();

      if (convError || !convData) {
        console.error('Seed: error creating conversation', convError);
        continue;
      }

      const convId = convData.id;

      const messagesToInsert = conv.messages.map((msg) => ({
        conversation_id: convId,
        role: msg.role,
        content: msg.content,
        image_urls: msg.image_urls || null,
        metadata: null,
        created_at: new Date(
          convStartTime.getTime() + msg.delay_minutes * 60 * 1000
        ).toISOString(),
      }));

      const { error: msgError } = await supabase
        .from('messages')
        .insert(messagesToInsert);

      if (msgError) {
        console.error('Seed: error inserting messages', msgError);
        continue;
      }

      const lastMsg = conv.messages[conv.messages.length - 1];
      const meta: ConversationMeta = {
        id: convId,
        type: conv.meta.type,
        title: conv.user_name,
        lastMessage: lastMsg.content.slice(0, 80),
        lastMessageAt: new Date(
          convStartTime.getTime() + lastMsg.delay_minutes * 60 * 1000
        ).toISOString(),
        userName: conv.user_name,
        userAvatar: conv.user_avatar,
        topic: conv.topic,
      };

      setConversationMeta(meta);
      createdMetas.push(meta);
    } catch (err) {
      console.error('Seed: unexpected error', err);
    }
  }

  if (typeof window !== 'undefined' && createdMetas.length > 0) {
    localStorage.setItem(SEED_KEY, 'true');
  }

  return createdMetas;
}
