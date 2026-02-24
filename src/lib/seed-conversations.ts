import { supabase } from './supabase';
import { setConversationMeta } from './conversations';
import { ConversationMeta } from './types';

const SEED_KEY = 'donaObraSeeded';

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
  messages: SeedMsg[];
}

/* ── Sample conversations ── */

const SAMPLE_CONVERSATIONS: SeedConv[] = [
  // ─ Conversation 1: Plumbing repair (full flow with photo) ─
  {
    meta: {
      type: 'dona_obra',
      title: 'Doña Obra',
      lastMessage: '✅ ¡Solicitud enviada! Roberto M. recibirá tu...',
      lastMessageAt: '', // set dynamically
    },
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
          '¡Uy mijo! Se ve que está chorreando bastante esa tubería 😬 Pero tranqui, eso se arregla fácil.\n\n¿Es agua fría o caliente la que gotea? ¿Y más o menos desde cuándo está así? 🔧',
        delay_minutes: 3,
      },
      {
        role: 'user',
        content: 'Es agua fría, empezó ayer en la noche',
        delay_minutes: 5,
      },
      {
        role: 'assistant',
        content:
          'Listo mijo, aquí va tu estimación 💪\n\n🔧 Reparación de tubería de agua fría\n💰 $30 — $80\n⭐ Complejidad: Baja\n\nIncluye materiales básicos y mano de obra. Una tubería de agua fría con goteo activo se resuelve rápido.',
        delay_minutes: 6,
      },
      {
        role: 'assistant',
        content:
          'Te encontré 3 plomeros verificados en tu zona 💪\n\n⭐ Roberto M. — 4.9★ (127 reseñas) · Desde $30\n🔧 Carlos P. — 4.8★ (89 reseñas) · Desde $35\n🛠️ Miguel A. — 4.7★ (64 reseñas) · Desde $40\n\nRoberto es mi pick — trabaja limpio y es super puntual 👌',
        delay_minutes: 7,
      },
      {
        role: 'user',
        content: 'Quiero contactar a Roberto 👍',
        delay_minutes: 9,
      },
      {
        role: 'assistant',
        content:
          '✅ ¡Solicitud enviada!\n\nRoberto M. recibirá tu solicitud y se pondrá en contacto contigo pronto.\n\n📱 WhatsApp · Llamada disponible\n\n¡Va a quedar como nuevo ese baño, mijo! Roberto es de los mejores 🔧💪',
        delay_minutes: 10,
      },
    ],
  },

  // ─ Conversation 2: Interior painting (full flow with photo) ─
  {
    meta: {
      type: 'dona_obra',
      title: 'Doña Obra',
      lastMessage: '✅ ¡Solicitud enviada! José L. recibirá tu...',
      lastMessageAt: '',
    },
    messages: [
      {
        role: 'assistant',
        content: WELCOME_MESSAGE,
        delay_minutes: 0,
      },
      {
        role: 'user',
        content: 'Quiero pintar la sala y el comedor de mi apartamento, ¿cuánto me sale?',
        image_urls: [
          'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&h=400&fit=crop&auto=format',
        ],
        delay_minutes: 1,
      },
      {
        role: 'assistant',
        content:
          '¡Dale! Pintura le cambia la cara a cualquier espacio 🎨\n\n¿Cuántos metros cuadrados tiene el área entre la sala y el comedor? ¿Y ya tienes algún color en mente?',
        delay_minutes: 2,
      },
      {
        role: 'user',
        content: 'Como 40 metros entre las dos áreas. Quiero un tono beige o crema',
        delay_minutes: 4,
      },
      {
        role: 'assistant',
        content:
          'Buena elección, los tonos claros dan amplitud y frescura 👌\n\n🎨 Pintura interior — Sala y comedor (40 m²)\n💰 $200 — $450\n⭐ Complejidad: Media\n\nIncluye materiales, preparación de superficies y 2 manos de pintura.',
        delay_minutes: 5,
      },
      {
        role: 'assistant',
        content:
          'Te encontré 2 pintores de confianza 💪\n\n⭐ José L. — 4.9★ (156 reseñas) · Desde $180\n🎨 Ana M. — 4.8★ (92 reseñas) · Desde $220\n\nJosé es un crack con la brocha, te lo recomiendo 🤙',
        delay_minutes: 6,
      },
      {
        role: 'user',
        content: 'Me interesa José, tiene buenas reseñas 🙌',
        delay_minutes: 8,
      },
      {
        role: 'assistant',
        content:
          '✅ ¡Solicitud enviada!\n\nJosé L. recibirá tu solicitud y se pondrá en contacto contigo en las próximas horas.\n\n📱 WhatsApp · Llamada disponible\n\n¡Te va a quedar espectacular! José tiene mano de artista 🎨💪',
        delay_minutes: 9,
      },
    ],
  },
];

/**
 * Seeds sample conversations into the database.
 * Only runs once (tracked by localStorage flag).
 * Returns the created conversation metas for the sidebar.
 */
export async function seedSampleConversations(): Promise<ConversationMeta[]> {
  // Check if already seeded
  if (typeof window !== 'undefined' && localStorage.getItem(SEED_KEY)) {
    return [];
  }

  const createdMetas: ConversationMeta[] = [];

  for (const conv of SAMPLE_CONVERSATIONS) {
    try {
      // Create conversation
      const baseTime = new Date();
      // Offset conversations so they have different "started_at" times
      const convOffset = SAMPLE_CONVERSATIONS.indexOf(conv) * 60; // 60 min apart
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
        })
        .select('id')
        .single();

      if (convError || !convData) {
        console.error('Seed: error creating conversation', convError);
        continue;
      }

      const convId = convData.id;

      // Insert messages with proper timestamps
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

      // Set conversation metadata
      const lastMsg = conv.messages[conv.messages.length - 1];
      const meta: ConversationMeta = {
        id: convId,
        type: conv.meta.type,
        title: conv.meta.title,
        lastMessage: lastMsg.content.slice(0, 80),
        lastMessageAt: new Date(
          convStartTime.getTime() + lastMsg.delay_minutes * 60 * 1000
        ).toISOString(),
        providerName: conv.meta.providerName,
        providerId: conv.meta.providerId,
        providerAvatar: conv.meta.providerAvatar,
      };

      setConversationMeta(meta);
      createdMetas.push(meta);
    } catch (err) {
      console.error('Seed: unexpected error', err);
    }
  }

  // Mark as seeded
  if (typeof window !== 'undefined' && createdMetas.length > 0) {
    localStorage.setItem(SEED_KEY, 'true');
  }

  return createdMetas;
}
