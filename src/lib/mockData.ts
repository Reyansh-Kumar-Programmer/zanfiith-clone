export interface Product {
  id: string;
  title: string;
  price: number;
  images: any[];
  categoryName: string;
  description?: string;
  slug: string;
  isNew?: boolean;
  isLimited?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Masterpiece of Evolution Tee",
    price: 1499,
    images: [{ _type: 'image', asset: { _ref: 'dummy' } }], // Placeholder
    categoryName: "Tees",
    slug: "masterpiece-of-evolution-tee",
    isNew: true,
    isLimited: true
  },
  {
    id: "2",
    title: "Evolution Signature Hoodie",
    price: 2999,
    images: [{ _type: 'image', asset: { _ref: 'dummy2' } }],
    categoryName: "Hoodies",
    slug: "evolution-signature-hoodie",
    isNew: true
  },
  {
    id: "3",
    title: "Aged Black Oversized Tee",
    price: 1299,
    images: [{ _type: 'image', asset: { _ref: 'dummy3' } }],
    categoryName: "Tees",
    slug: "aged-black-oversized-tee"
  },
  {
    id: "4",
    title: "Core Logo Sweatshirt",
    price: 2499,
    images: [{ _type: 'image', asset: { _ref: 'dummy4' } }],
    categoryName: "Hoodies",
    slug: "core-logo-sweatshirt"
  }
];
