import { supabase } from './supabase';
import { Conversation, Message, ContactRequest, ConversationMeta } from './types';

export async function createConversation(): Promise<string | null> {
  const { data, error } = await supabase
    .from('conversations')
    .insert({ status: 'active' })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating conversation:', error);
    return null;
  }

  return data?.id || null;
}

export async function getConversation(id: string): Promise<Conversation | null> {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching conversation:', error);
    return null;
  }

  return data;
}

export async function updateConversationTimestamp(id: string): Promise<void> {
  const { error } = await supabase
    .from('conversations')
    .update({ last_message_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating conversation timestamp:', error);
  }
}

export async function saveMessage(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string,
  imageUrls?: string[],
  metadata?: any
): Promise<Message | null> {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      role,
      content,
      image_urls: imageUrls || null,
      metadata: metadata || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving message:', error);
    return null;
  }

  await updateConversationTimestamp(conversationId);

  return data;
}

export async function getConversationMessages(conversationId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data || [];
}

export async function createContactRequest(
  conversationId: string,
  providerId: string,
  serviceDescription: string,
  priceMin?: number,
  priceMax?: number,
  contactMethod: 'whatsapp' | 'call' | 'solicitud' = 'solicitud'
): Promise<ContactRequest | null> {
  const { data, error } = await supabase
    .from('contact_requests')
    .insert({
      conversation_id: conversationId,
      provider_id: providerId,
      service_description: serviceDescription,
      estimated_price_min: priceMin || null,
      estimated_price_max: priceMax || null,
      contact_method: contactMethod,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating contact request:', error);
    return null;
  }

  return data;
}

export async function getAllConversations(): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .order('last_message_at', { ascending: false })
    .limit(30);

  if (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }

  return data || [];
}

export async function getLastMessageForConversations(
  conversationIds: string[]
): Promise<Record<string, Message>> {
  if (conversationIds.length === 0) return {};

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .in('conversation_id', conversationIds)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching last messages:', error);
    return {};
  }

  const lastMessages: Record<string, Message> = {};
  for (const msg of data || []) {
    if (!lastMessages[msg.conversation_id]) {
      lastMessages[msg.conversation_id] = msg;
    }
  }
  return lastMessages;
}

// localStorage helpers for conversation metadata
const CONVERSATIONS_META_KEY = 'conversationsMeta';

export function getConversationsMeta(): Record<string, ConversationMeta> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CONVERSATIONS_META_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setConversationMeta(meta: ConversationMeta): void {
  if (typeof window === 'undefined') return;
  const all = getConversationsMeta();
  all[meta.id] = meta;
  localStorage.setItem(CONVERSATIONS_META_KEY, JSON.stringify(all));
}

export function updateConversationMetaLastMessage(
  id: string,
  lastMessage: string
): void {
  if (typeof window === 'undefined') return;
  const all = getConversationsMeta();
  if (all[id]) {
    all[id].lastMessage = lastMessage;
    all[id].lastMessageAt = new Date().toISOString();
    localStorage.setItem(CONVERSATIONS_META_KEY, JSON.stringify(all));
  }
}
