'use client';

import { useState } from 'react';
import { Provider } from '@/lib/types';
import { X, MessageCircle, Phone as PhoneIcon, Send } from 'lucide-react';

interface ContactModalProps {
  provider: Provider;
  onClose: () => void;
}

export default function ContactModal({ provider, onClose }: ContactModalProps) {
  const [requestSent, setRequestSent] = useState(false);

  const handleWhatsApp = () => {
    if (provider.whatsapp) {
      const phoneNumber = provider.whatsapp.replace(/[^0-9]/g, '');
      const message = encodeURIComponent(
        `Hola ${provider.name}, te contacto desde Doña Obra. Necesito información sobre tus servicios.`
      );
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }
  };

  const handleCall = () => {
    if (provider.phone) {
      window.location.href = `tel:${provider.phone}`;
    }
  };

  const handleSendRequest = () => {
    // Simulate sending a request
    setRequestSent(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (requestSent) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✅</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">¡Solicitud enviada!</h3>
          <p className="text-gray-600">
            {provider.name} recibirá tu solicitud y se pondrá en contacto contigo pronto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white w-full md:max-w-md md:rounded-2xl rounded-t-3xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Contactar a {provider.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {/* WhatsApp button */}
          {provider.whatsapp && (
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center gap-4 p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              <div className="p-3 bg-white/20 rounded-lg">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold">Abrir WhatsApp</p>
                <p className="text-sm text-green-100">{provider.whatsapp}</p>
              </div>
            </button>
          )}

          {/* Call button */}
          {provider.phone && (
            <button
              onClick={handleCall}
              className="w-full flex items-center gap-4 p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              <div className="p-3 bg-white/20 rounded-lg">
                <PhoneIcon className="w-6 h-6" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold">Llamar ahora</p>
                <p className="text-sm text-blue-100">{provider.phone}</p>
              </div>
            </button>
          )}

          {/* Send request button */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">o</span>
            </div>
          </div>

          <button
            onClick={handleSendRequest}
            className="w-full flex items-center gap-4 p-4 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <div className="p-3 bg-white rounded-lg">
              <Send className="w-6 h-6" />
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold">Enviar solicitud</p>
              <p className="text-sm text-gray-600">Te contactaremos pronto</p>
            </div>
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Al contactar, confirmas que aceptas compartir tus datos de contacto con el prestatario.
        </p>
      </div>
    </div>
  );
}
