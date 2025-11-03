import React from 'react';
import ProductCard, { Product } from './ProductCard';

type Props = {
  products: Product[];
  isLoading?: boolean;
  isError?: string | null;
};

export default function ProductGrid({ products, isLoading, isError }: Props) {
  if (isLoading) {
    return (
      <div className="grid" aria-busy="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="card" aria-hidden>
            <div style={{ width: '100%', aspectRatio: '4 / 3' }} className="skeleton" />
            <div style={{ padding: 12 }}>
              <div className="skeleton" style={{ height: 16, width: '60%', borderRadius: 6 }} />
              <div className="skeleton" style={{ height: 12, width: '90%', borderRadius: 6, marginTop: 8 }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="center">
        <div className="card" style={{ padding: 16, textAlign: 'center' }}>
          <p style={{ margin: 0 }}>Failed to load products.</p>
          <p className="muted" style={{ marginTop: 8, fontSize: 13 }}>{isError}</p>
        </div>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="center">
        <div className="card" style={{ padding: 16, textAlign: 'center' }}>
          <p style={{ margin: 0 }}>No products match your filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
