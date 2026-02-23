import { X } from 'lucide-react';

interface ImagePreviewProps {
  images: string[];
  onRemove?: (index: number) => void;
  size?: 'small' | 'medium';
}

export default function ImagePreview({ images, onRemove, size = 'medium' }: ImagePreviewProps) {
  const sizeClasses = size === 'small' ? 'w-16 h-16' : 'w-24 h-24';

  return (
    <div className="flex flex-wrap gap-2">
      {images.map((image, index) => (
        <div key={index} className={`relative ${sizeClasses} rounded-lg overflow-hidden`}>
          <img
            src={image}
            alt={`Preview ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {onRemove && (
            <button
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
