import { supabase } from './supabase';
import { Provider, Review } from './types';

// Normalize category: remove accents and lowercase
function normalizeCategory(cat: string): string {
  return cat.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

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
  const normalized = normalizeCategory(category);

  // Try exact match first
  let { data, error } = await supabase
    .from('providers')
    .select('*')
    .contains('categories', [category])
    .order('rating', { ascending: false })
    .limit(10);

  // If no results, try normalized match
  if ((!data || data.length === 0) && !error) {
    const all = await supabase
      .from('providers')
      .select('*')
      .order('rating', { ascending: false });

    data = (all.data || []).filter((p: any) =>
      (p.categories || []).some((c: string) => normalizeCategory(c) === normalized)
    ).slice(0, 10);
  }

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
    const normalized = normalizeCategory(fallbackCategory);

    // Try exact match first, then normalized match
    let { data } = await supabase
      .from('providers')
      .select('*')
      .contains('categories', [fallbackCategory])
      .order('rating', { ascending: false })
      .limit(5 - providers.length);

    // If no results, fetch all and filter by normalized category
    if (!data || data.length === 0) {
      const all = await supabase
        .from('providers')
        .select('*')
        .order('rating', { ascending: false });

      data = (all.data || []).filter((p: any) =>
        (p.categories || []).some((c: string) => normalizeCategory(c) === normalized)
      ).slice(0, 5 - providers.length);
    }

    providers = [...providers, ...(data || [])];
  }

  return providers;
}
