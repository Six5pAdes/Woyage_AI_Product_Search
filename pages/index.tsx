import Head from 'next/head';
import React from 'react';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { fetchCategories, fetchProducts, type DataSource } from '../lib/api';
import type { Product } from '../components/ProductCard';

type State = {
  products: Product[];
  filtered: Product[];
  categories: string[];
  source: DataSource;
  minPrice: number;
  maxPrice: number;
  selectedCategory: string;
  priceRange: [number, number];
  ratingMin: number;
  search: string;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'INIT_LOAD' }
  | { type: 'LOAD_SUCCESS'; products: Product[]; categories: string[] }
  | { type: 'LOAD_ERROR'; error: string }
  | { type: 'SET_SOURCE'; source: DataSource }
  | { type: 'SET_CATEGORY'; category: string }
  | { type: 'SET_PRICE'; range: [number, number] }
  | { type: 'SET_RATING_MIN'; ratingMin: number }
  | { type: 'SET_SEARCH'; search: string };

function applyFilters(products: Product[], search: string, category: string, range: [number, number], ratingMin: number) {
  const [min, max] = range;
  const q = search.trim().toLowerCase();
  return products.filter((p) => {
    if (category && p.category !== category) return false;
    if (p.price < min || p.price > max) return false;
    if ((p.rating ?? 0) < ratingMin) return false;
    if (!q) return true;
    const hay = `${p.title} ${p.description}`.toLowerCase();
    return hay.includes(q);
  });
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INIT_LOAD':
      return { ...state, loading: true, error: null };
    case 'LOAD_SUCCESS': {
      const prices = action.products.map((p) => p.price);
      const max = Math.ceil(Math.max(...prices));
      const filtered = applyFilters(action.products, state.search, state.selectedCategory, [0, max], state.ratingMin);
      return {
        ...state,
        loading: false,
        products: action.products,
        filtered,
        categories: action.categories,
        minPrice: 0,
        maxPrice: max,
        priceRange: [0, max]
      };
    }
    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'SET_SOURCE':
      return {
        ...state,
        source: action.source,
        loading: true,
        error: null,
        products: [],
        filtered: [],
        categories: [],
        minPrice: 0,
        maxPrice: 0,
        selectedCategory: '',
        priceRange: [0, 0],
        ratingMin: 0,
      };
    case 'SET_CATEGORY': {
      const filtered = applyFilters(state.products, state.search, action.category, state.priceRange, state.ratingMin);
      return { ...state, selectedCategory: action.category, filtered };
    }
    case 'SET_PRICE': {
      const [min, max] = action.range;
      const clamped: [number, number] = [Math.max(state.minPrice, Math.min(min, state.maxPrice)), Math.max(state.minPrice, Math.min(max, state.maxPrice))];
      const normalized: [number, number] = clamped[0] <= clamped[1] ? clamped : [clamped[1], clamped[0]];
      const filtered = applyFilters(state.products, state.search, state.selectedCategory, normalized, state.ratingMin);
      return { ...state, priceRange: normalized, filtered };
    }
    case 'SET_RATING_MIN': {
      const filtered = applyFilters(state.products, state.search, state.selectedCategory, state.priceRange, action.ratingMin);
      return { ...state, ratingMin: action.ratingMin, filtered };
    }
    case 'SET_SEARCH': {
      const filtered = applyFilters(state.products, action.search, state.selectedCategory, state.priceRange, state.ratingMin);
      return { ...state, search: action.search, filtered };
    }
    default:
      return state;
  }
}

export default function HomePage() {
  const [state, dispatch] = React.useReducer(reducer, {
    products: [],
    filtered: [],
    categories: [],
    source: 'dummyjson' as DataSource,
    minPrice: 0,
    maxPrice: 0,
    selectedCategory: '',
    priceRange: [0, 0],
    ratingMin: 0,
    search: '',
    loading: false,
    error: null
  });

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!state.loading) dispatch({ type: 'INIT_LOAD' });
        const [products, categories] = await Promise.all([fetchProducts(state.source), fetchCategories(state.source)]);
        if (!mounted) return;
        dispatch({ type: 'LOAD_SUCCESS', products, categories });
      } catch (e: any) {
        if (!mounted) return;
        dispatch({ type: 'LOAD_ERROR', error: e?.message ?? 'Unknown error' });
      }
    })();
    return () => { mounted = false; };
  }, [state.source]);

  return (
    <>
      <Head>
        <title>Woyage Product Search</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="container">
        <section className="header">
          <div>
            <h1 style={{ margin: 0 }}>Products</h1>
            <p className="muted" style={{ marginTop: 6 }}>Browse and filter products</p>
          </div>
          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <select
              className="select"
              value={state.source}
              onChange={(e) => dispatch({ type: 'SET_SOURCE', source: e.target.value as DataSource })}
              aria-label="Select data source"
              style={{ minWidth: 160 }}
            >
              <option value="dummyjson">DummyJSON</option>
              <option value="fakestore">Fake Store API</option>
            </select>
          </div>
        </section>

        <div style={{ marginTop: 12 }}>
          <SearchBar value={state.search} onChange={(v) => dispatch({ type: 'SET_SEARCH', search: v })} />
        </div>
        <div style={{ marginTop: 12 }}>
          <Filters
            categories={state.categories}
            selectedCategory={state.selectedCategory}
            onCategoryChange={(v) => dispatch({ type: 'SET_CATEGORY', category: v })}
            priceRange={[state.minPrice, state.maxPrice]}
            selectedPrice={state.priceRange}
            onPriceChange={(r) => dispatch({ type: 'SET_PRICE', range: r })}
            ratingMin={state.ratingMin}
            onRatingMinChange={(val) => dispatch({ type: 'SET_RATING_MIN', ratingMin: val })}
          />
        </div>

        <div style={{ marginTop: 16 }}>
          <ProductGrid products={state.filtered} isLoading={state.loading} isError={state.error} />
        </div>
      </main>
    </>
  );
}
