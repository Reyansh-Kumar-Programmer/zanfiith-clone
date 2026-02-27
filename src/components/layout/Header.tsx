"use client";

import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import styles from "./Header.module.css";
import { clsx } from "clsx";
import { useCart } from "@/hooks/useCart";
import MobileMenu from "./MobileMenu";
import { getProducts, Product } from "@/services/sanityService";
import { useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const products = await getProducts();
        // Just take the first 2 for the menu
        setFeaturedProducts(products.slice(0, 2));
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.announcementBanner}>
        Masterpiece of Evolution
      </div>
      
      <div className={styles.mainHeader}>
        <div className={styles.mobileMenuToggle}>
          <button 
            className={styles.iconButton} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className={styles.navSection}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/catalog" className={styles.navLink}>Catalog</Link>
          <Link href="/track" className={styles.navLink}>Track Order</Link>
        </nav>

        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            Zeninfith
          </Link>
        </div>

        <div className={styles.actionSection}>
          <button className={styles.iconButton} aria-label="Search">
            <Search size={20} />
          </button>
          <Link href="/account" className={styles.iconButton} aria-label="Account">
            <User size={20} />
          </Link>
          <button 
            className={styles.iconButton} 
            aria-label="Cart"
            onClick={() => setIsOpen(true)}
          >
            <div style={{ position: 'relative' }}>
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-6px',
                  background: 'var(--brand-red)',
                  color: '#000',
                  fontSize: '9px',
                  fontWeight: '800',
                  padding: '1px 4px',
                  borderRadius: '10px',
                  minWidth: '14px',
                  textAlign: 'center',
                  lineHeight: '1'
                }}>
                  {totalItems}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        products={featuredProducts}
      />
    </header>
  );
}
