import { supabase } from './supabase';
import { Conversation, Message, ContactRequest } from './types';

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
