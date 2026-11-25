import type { CSSProperties } from 'react';
import { getMediaAsset } from '../../config/media.config';

interface StudioPictureProps {
  mediaId: string;
  altOverride?: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  objectPosition?: string;
  priority?: boolean;
}

export function StudioPicture({
  mediaId,
  altOverride,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className = '',
  imgClassName = 'w-full h-full object-cover',
  style,
  objectPosition,
  priority = false,
}: StudioPictureProps) {
  const asset = getMediaAsset(mediaId);
  const pos = objectPosition ?? asset.objectPosition ?? '50% 50%';

  return (
    <picture
      className={`block overflow-hidden bg-[#ECE6E2] ${className}`}
      style={{
        backgroundImage: asset.lqip ? `url("${asset.lqip}")` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: pos,
        ...style,
      }}
    >
      <source type="image/avif" srcSet={asset.avifSrcset} sizes={sizes} />
      <source type="image/webp" srcSet={asset.webpSrcset} sizes={sizes} />
      <img
        src={asset.fallbackSrc}
        alt={altOverride ?? asset.alt}
        width={asset.width}
        height={asset.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
        style={{ objectPosition: pos }}
      />
    </picture>
  );
}
