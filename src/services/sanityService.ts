import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  images: any[];
  categoryName: string;
  description: string;
  price_id?: string;
}

export async function getProducts(): Promise<Product[]> {
  const query = groq`*[_type == "product"] {
    "id": _id,
    title,
    "slug": slug.current,
    price,
    images,
    "categoryName": category->name,
    description,
    price_id
  }`;
  
  return await client.fetch(query);
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const query = groq`*[_type == "product" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    price,
    images,
    "categoryName": category->name,
    description,
    price_id
  }`;
  
  return await client.fetch(query, { slug });
}
