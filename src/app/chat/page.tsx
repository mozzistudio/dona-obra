import { Suspense } from 'react';
import ChatApp from '@/components/ChatApp';

export const metadata = {
  title: 'Consultar',
  description:
    'Chatea con Doña Obra para encontrar el mejor profesional para tu hogar.',
};

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-coral text-xl">Cargando...</div>
        </div>
      }
    >
      <ChatApp />
    </Suspense>
  );
}
