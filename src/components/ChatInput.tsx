'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Send, Paperclip, X } from 'lucide-react';
import ImagePreview from './ImagePreview';

interface ChatInputProps {
  onSend: (message: string, images: string[]) => void;
  disabled?: boolean;
  initialMessage?: string;
}

export default function ChatInput({ onSend, disabled, initialMessage }: ChatInputProps) {
  const [message, setMessage] = useState(initialMessage || '');
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = async (file: File, maxWidth = 1024, quality = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL('image/jpeg', quality));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const imagePromises = Array.from(files).map((file) => compressImage(file, 1024, 0.7));

    const newImages = await Promise.all(imagePromises);
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (!message.trim() && images.length === 0) return;

    onSend(message.trim(), images);
    setMessage('');
    setImages([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-black/6 bg-white/80 backdrop-blur-md p-4 shrink-0">
      {/* Image preview */}
      {images.length > 0 && (
        <div className="mb-3">
          <ImagePreview images={images} onRemove={handleRemoveImage} size="small" />
        </div>
      )}

      {/* Input area */}
      <div className="flex items-end gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="p-3 text-muted hover:bg-warm rounded-full transition-colors disabled:opacity-50"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          multiple
          className="hidden"
        />

        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            placeholder="Escribe tu mensaje..."
            className="w-full px-5 py-3 bg-warm border-2 border-transparent rounded-[100px] resize-none focus:outline-none focus:border-coral/30 disabled:opacity-50 text-charcoal placeholder:text-muted/60 transition-colors"
            rows={1}
            style={{
              minHeight: '48px',
              maxHeight: '120px',
            }}
          />
        </div>

        <button
          onClick={handleSend}
          disabled={disabled || (!message.trim() && images.length === 0)}
          className="p-3 bg-coral text-white rounded-full hover:bg-coral-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(232,97,77,0.35)] hover:shadow-[0_8px_20px_rgba(232,97,77,0.4)]"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
