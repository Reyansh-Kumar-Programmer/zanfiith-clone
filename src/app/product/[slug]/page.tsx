"use client";

import Header from "@/components/layout/Header";
import { useParams } from "next/navigation";
import styles from "./product.module.css";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { useCart } from "@/hooks/useCart";
import { getProductBySlug, Product } from "@/services/sanityService";
import { urlFor } from "@/sanity/lib/image";

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const sizes = ["S", "M", "L", "XL", "XXL"];

  if (loading) return <div className="container" style={{ padding: "100px 0" }}>Loading...</div>;
  if (!product) return <div className="container" style={{ padding: "100px 0" }}>Product not found</div>;

  return (
    <>
      <Header />
      <main className={clsx(styles.pdp, "container")}>
        <div className={styles.layout}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              {product.images?.[0] ? (
                <img src={urlFor(product.images[0]).url()} alt={product.title} />
              ) : (
                <div className={styles.imagePlaceholder}>No image available</div>
              )}
            </div>
            {/* If there are more images, we could render a sub-gallery here */}
          </div>

          <div className={styles.details}>
            <div className={styles.header}>
              <span className={styles.categoryLabel}>{product.categoryName}</span>
              <h1 className={styles.title}>{product.title}</h1>
              <span className={styles.price}>₹{product.price.toLocaleString()}</span>
            </div>

            <p className={styles.description}>
              {product.description || "Premium heavyweight cotton garment. Designed for a modern oversized fit. Made in India."}
            </p>

            <div className={styles.selectors}>
              <div>
                <p className={styles.selectorLabel}>Select Size</p>
                <div className={styles.sizeGrid}>
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={clsx(styles.sizeButton, selectedSize === size && styles.sizeButtonActive)}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button 
                className={styles.addToCart}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <button className={styles.buyNow}>Buy it Now</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
