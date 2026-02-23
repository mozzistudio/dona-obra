-- Create providers table
create table providers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  avatar_url text,
  rating numeric(2,1) default 4.5,
  review_count integer default 0,
  location text,
  categories text[] not null,
  price_min numeric(10,2),
  price_max numeric(10,2),
  whatsapp text,
  phone text,
  description text,
  services text[],
  availability text,
  years_experience integer,
  photos text[],
  dona_obra_comment text,
  created_at timestamptz default now()
);

-- Create reviews table
create table reviews (
  id uuid default gen_random_uuid() primary key,
  provider_id uuid references providers(id) on delete cascade,
  author text not null,
  rating numeric(2,1) not null,
  comment text,
  date date default current_date,
  created_at timestamptz default now()
);

-- Create conversations table
create table conversations (
  id uuid default gen_random_uuid() primary key,
  started_at timestamptz default now(),
  last_message_at timestamptz default now(),
  status text default 'active'
);

-- Create messages table
create table messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references conversations(id) on delete cascade,
  role text not null,
  content text not null,
  image_urls text[],
  metadata jsonb,
  created_at timestamptz default now()
);

-- Create contact_requests table
create table contact_requests (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references conversations(id),
  provider_id uuid references providers(id),
  service_description text,
  estimated_price_min numeric(10,2),
  estimated_price_max numeric(10,2),
  contact_method text,
  created_at timestamptz default now()
);

-- Create indexes for better performance
create index idx_messages_conversation_id on messages(conversation_id);
create index idx_reviews_provider_id on reviews(provider_id);
create index idx_providers_categories on providers using gin(categories);
