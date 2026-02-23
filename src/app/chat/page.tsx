'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Chat from '@/components/Chat';

function ChatWithParams() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return <Chat initialCategory={category} />;
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen bg-cream"><span className="text-muted">Cargando...</span></div>}>
      <ChatWithParams />
    </Suspense>
  );
}
