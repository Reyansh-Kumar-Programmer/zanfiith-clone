"use client";

import Header from "@/components/layout/Header";
import ProductGrid from "@/components/product/ProductGrid";
import styles from "./catalog.module.css";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts, Product } from "@/services/sanityService";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>Products</h1>
          </div>
        </section>

        <section className="container">
          <div className={styles.controls}>
            <div className={styles.filterGroup}>
              <div className={styles.filterItem}>
                Availability <ChevronDown size={14} />
              </div>
              <div className={styles.filterItem}>
                Price <ChevronDown size={14} />
              </div>
            </div>
            
            <div className={styles.filterGroup}>
              <div className={styles.productCount}>
                {loading ? "..." : products.length} products
              </div>
              <div className={styles.filterItem}>
                Sort by <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: "40px 0", textAlign: "center" }}>Loading Catalog...</div>
          ) : (
            <ProductGrid products={products} />
          )}
        </section>
      </main>
    </>
  );
}
