"use client";

import Header from "@/components/layout/Header";
import styles from "./page.module.css";
import ProductGrid from "@/components/product/ProductGrid";
import { useEffect, useState } from "react";
import { getProducts, Product } from "@/services/sanityService";
import { motion } from "framer-motion";
import Hero from "@/components/home/Hero";

export default function Home() {
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
        <Hero />

        <section className={styles.featuredSection}>
          <div className="container">
            <motion.h2 
              className={styles.sectionTitle}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              New Arrivals
            </motion.h2>
            {loading ? (
              <p>Loading products...</p>
            ) : (
              <ProductGrid products={products.slice(0, 4)} />
            )}
          </div>
        </section>
      </main>
    </>
  );
}
