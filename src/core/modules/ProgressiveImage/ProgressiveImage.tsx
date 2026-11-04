'use client';

import Image, { type ImageProps, type StaticImageData } from 'next/image';
import { useState } from 'react';

import styles from './ProgressiveImage.module.scss';

interface ProgressiveImageProps {
  readonly src: StaticImageData;
  readonly alt: string;
  readonly sizes: string;
  readonly className?: string;
  readonly fill?: boolean;
  readonly fit?: 'cover' | 'contain';
  readonly position?: string;
  readonly loading?: ImageProps['loading'];
  readonly fetchPriority?: ImageProps['fetchPriority'];
  readonly draggable?: boolean;
}

function ImageFrame({
  src,
  alt,
  sizes,
  className,
  fill,
  fit = 'cover',
  position = 'center',
  loading,
  fetchPriority,
  draggable,
}: ProgressiveImageProps) {
  const [ready, setReady] = useState(false);

  return (
    <span
      className={`${styles.frame} ${className ?? ''}`}
      data-fill={fill || undefined}
      data-ready={ready || undefined}
      style={fill ? undefined : { aspectRatio: `${src.width} / ${src.height}` }}
    >
      <span
        aria-hidden="true"
        className={styles.placeholder}
        style={{
          backgroundImage: src.blurDataURL ? `url("${src.blurDataURL}")` : undefined,
          backgroundSize: fit,
          backgroundPosition: position,
        }}
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={loading}
        fetchPriority={fetchPriority}
        draggable={draggable}
        className={styles.image}
        style={{ objectFit: fit, objectPosition: position }}
        onLoad={() => setReady(true)}
        onError={() => setReady(true)}
      />
    </span>
  );
}

export function ProgressiveImage(props: ProgressiveImageProps) {
  return <ImageFrame key={props.src.src} {...props} />;
}
