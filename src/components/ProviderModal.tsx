'use client';

import { useEffect, useState } from 'react';
import { Provider, Review } from '@/lib/types';
import { X, Star, MapPin, Phone, Clock, Award, Image as ImageIcon } from 'lucide-react';
import { getProviderReviews } from '@/lib/providers';

interface ProviderModalProps {
  provider: Provider;
  onClose: () => void;
  onContact: () => void;
}

export default function ProviderModal({ provider, onClose, onContact }: ProviderModalProps) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function loadReviews() {
      const data = await getProviderReviews(provider.id);
      setReviews(data);
    }
    loadReviews();
  }, [provider.id]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white w-full md:max-w-2xl md:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{provider.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Avatar and rating */}
          <div className="flex items-start gap-4">
            <img
              src={provider.avatar_url || '/placeholder-avatar.png'}
              alt={provider.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold text-gray-800">{provider.rating}</span>
                <span className="text-gray-500">({provider.review_count} reseñas)</span>
              </div>
              {provider.location && (
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{provider.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Doña Obra's comment */}
          {provider.dona_obra_comment && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <img src="/dona-obra-logo.png" alt="Doña Obra" className="w-7 h-7 rounded-full object-cover" />
                <span className="font-bold text-gray-800">Doña Obra dice:</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{provider.dona_obra_comment}</p>
            </div>
          )}

          {/* Description */}
          {provider.description && (
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Sobre {provider.name}</h3>
              <p className="text-gray-600 leading-relaxed">{provider.description}</p>
            </div>
          )}

          {/* Details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {provider.price_min && provider.price_max && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-xl">💰</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rango de precios</p>
                  <p className="font-semibold text-gray-800">
                    ${provider.price_min} - ${provider.price_max}
                  </p>
                </div>
              </div>
            )}

            {provider.years_experience && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experiencia</p>
                  <p className="font-semibold text-gray-800">{provider.years_experience} años</p>
                </div>
              </div>
            )}

            {provider.availability && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Disponibilidad</p>
                  <p className="font-semibold text-gray-800">{provider.availability}</p>
                </div>
              </div>
            )}

            {provider.whatsapp && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <p className="font-semibold text-gray-800">{provider.whatsapp}</p>
                </div>
              </div>
            )}
          </div>

          {/* Services */}
          {provider.services && provider.services.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Servicios</h3>
              <div className="flex flex-wrap gap-2">
                {provider.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Photo gallery */}
          {provider.photos && provider.photos.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Trabajos realizados
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {provider.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`Trabajo ${idx + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {reviews.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Reseñas recientes</h3>
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800">{review.author}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-700">{review.rating}</span>
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(review.date).toLocaleDateString('es-PA')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact button */}
          <button
            onClick={onContact}
            className="w-full py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
          >
            📱 Contactar a {provider.name}
          </button>
        </div>
      </div>
    </div>
  );
}
