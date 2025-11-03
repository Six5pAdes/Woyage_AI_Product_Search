import React from 'react';

type Props = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  priceRange: [number, number];
  selectedPrice: [number, number];
  onPriceChange: (value: [number, number]) => void;
  ratingMin: number;
  onRatingMinChange: (value: number) => void;
};

export default function Filters({ categories, selectedCategory, onCategoryChange, priceRange, selectedPrice, onPriceChange, ratingMin, onRatingMinChange }: Props) {
  const [min, max] = priceRange;
  const [selMin, selMax] = selectedPrice;

  return (
    <div className="card" style={{ padding: 12 }}>
      <div className="toolbar">
        <div>
          <label className="muted" style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>Category</label>
          <select className="select" value={selectedCategory} aria-label="Filter by category" onChange={(e) => onCategoryChange(e.target.value)}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="muted" style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>Min price: ${selMin.toFixed(0)}</label>
          <input
            className="range"
            type="range"
            min={min}
            max={max}
            value={selMin}
            onChange={(e) => onPriceChange([Number(e.target.value), selMax])}
            aria-label="Minimum price"
          />
        </div>

        <div>
          <label className="muted" style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>Max price: ${selMax.toFixed(0)}</label>
          <input
            className="range"
            type="range"
            min={min}
            max={max}
            value={selMax}
            onChange={(e) => onPriceChange([selMin, Number(e.target.value)])}
            aria-label="Maximum price"
          />
        </div>

        <div>
          <label className="muted" style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>Min rating: {ratingMin.toFixed(1)}</label>
          <input
            className="range"
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={ratingMin}
            onChange={(e) => onRatingMinChange(Number(e.target.value))}
            aria-label="Minimum rating"
          />
        </div>

      </div>
    </div>
  );
}
