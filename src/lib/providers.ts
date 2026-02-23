import { supabase } from './supabase';
import { Provider, Review } from './types';

export async function getAllProviders(): Promise<Provider[]> {
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .order('rating', { ascending: false });

  if (error) {
    console.error('Error fetching providers:', error);
    return [];
  }

  return data || [];
}

export async function getProvidersByCategory(category: string): Promise<Provider[]> {
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .contains('categories', [category])
    .order('rating', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching providers by category:', error);
    return [];
  }

  return data || [];
}

export async function getProviderById(id: string): Promise<Provider | null> {
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching provider:', error);
    return null;
  }

  return data;
}

export async function getProvidersByIds(ids: string[]): Promise<Provider[]> {
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .in('id', ids);

  if (error) {
    console.error('Error fetching providers:', error);
    return [];
  }

  return data || [];
}

export async function getProviderReviews(providerId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('provider_id', providerId)
    .order('date', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }

  return data || [];
}

export async function validateAndFetchProviders(
  providerIds: string[],
  fallbackCategory?: string
): Promise<Provider[]> {
  let providers = await getProvidersByIds(providerIds);

  // If we got fewer than 2 valid providers, supplement with category search
  if (providers.length < 2 && fallbackCategory) {
    const { data } = await supabase
      .from('providers')
      .select('*')
      .contains('categories', [fallbackCategory])
      .order('rating', { ascending: false })
      .limit(5 - providers.length);

    providers = [...providers, ...(data || [])];
  }

  return providers;
}
