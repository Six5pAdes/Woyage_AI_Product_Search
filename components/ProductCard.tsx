import Image from 'next/image';
import React from 'react';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const imageSrc = product.thumbnail || product.images?.[0] || '';
  return (
    <article className="card" aria-label={product.title}>
      {imageSrc ? (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3' }}>
          <Image src={imageSrc} alt={product.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
        </div>
      ) : (
        <div style={{ width: '100%', aspectRatio: '4 / 3' }} className="skeleton" />
      )}
      <div style={{ padding: 12 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0, fontSize: 16, lineHeight: 1.2 }}>{product.title}</h3>
          <strong>${product.price.toFixed(2)}</strong>
        </div>
        <p className="muted" style={{ fontSize: 13, marginTop: 6, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="muted" style={{ fontSize: 12, textTransform: 'capitalize' }}>{product.category}</span>
          {product.rating ? <span className="muted" style={{ fontSize: 12 }}>⭐ {product.rating.toFixed(1)}</span> : null}
        </div>
      </div>
    </article>
  );
}
