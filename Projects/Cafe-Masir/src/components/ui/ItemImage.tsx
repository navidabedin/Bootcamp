import { useState } from 'react';

interface ItemImageProps {
  src: string;
  alt: string;
  emoji: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * تصویر آیتم با حالت جایگزین:
 * اگر تصویر لود نشد، گرادیان + ایموجی نمایش داده می‌شود (هیچ‌وقت عکس شکسته نداریم).
 */
export function ItemImage({
  src,
  alt,
  emoji,
  className,
  loading = 'lazy',
}: ItemImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`img-fallback ${className ?? ''}`} role="img" aria-label={alt}>
        {emoji}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
