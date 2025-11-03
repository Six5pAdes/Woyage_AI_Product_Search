import { Product } from '../components/ProductCard';

export type DataSource = 'dummyjson' | 'fakestore';

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const DUMMY_BASE = 'https://dummyjson.com';
const FAKESTORE_BASE = 'https://fakestoreapi.com';

export async function fetchProducts(source: DataSource): Promise<Product[]> {
  if (source === 'fakestore') {
    const res = await fetch(`${FAKESTORE_BASE}/products`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: any[] = await res.json();
    return data.map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.description ?? '',
      price: Number(p.price) || 0,
      category: p.category ?? 'unknown',
      thumbnail: p.image ?? '',
      images: p.image ? [p.image] : [],
      rating: p.rating?.rate ?? undefined,
      brand: undefined,
      discountPercentage: undefined,
      stock: undefined,
    }));
  }

  const res = await fetch(`${DUMMY_BASE}/products?limit=100`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: ProductsResponse = await res.json();
  return data.products;
}

export async function fetchCategories(source: DataSource): Promise<string[]> {
  if (source === 'fakestore') {
    const res = await fetch(`${FAKESTORE_BASE}/products/categories`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const cats: string[] = await res.json();
    return cats;
  }

  const res = await fetch(`${DUMMY_BASE}/products/categories`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  // DummyJSON v1 returns string[]; v2 returns { slug, name, url }[]
  if (Array.isArray(data)) {
    return data.map((item: any) => (typeof item === 'string' ? item : item?.slug)).filter(Boolean);
  }
  return [];
}
