import Image from 'next/image';
import { images, type ImageKey } from '@/data/images';
import { withBase } from '@/lib/base-path';
import { cn } from '@/lib/utils';

/** Foto real, sempre com width/height (sem CLS). O recorte faz-se por CSS (object-cover). */
export function Photo({
  name,
  alt,
  className,
  priority,
  sizes,
}: {
  name: ImageKey;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const img = images[name];
  return (
    <Image
      src={withBase(img.src)}
      width={img.width}
      height={img.height}
      alt={alt}
      priority={priority}
      sizes={sizes}
      className={cn('object-cover', className)}
    />
  );
}
