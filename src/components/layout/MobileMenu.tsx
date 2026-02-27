"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/services/sanityService";
import { urlFor } from "@/sanity/lib/image";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const menuVariants = {
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 },
};

export default function MobileMenu({ isOpen, onClose, products = [] }: MobileMenuProps) {
  const menuLinks = [
    { name: "HOME", href: "/" },
    { name: "CATALOG", href: "/catalog" },
    { name: "TRACK YOUR ORDER", href: "/track" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
        >
          <div className={styles.header}>
            <button className={styles.closeButton} onClick={onClose} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          <nav className={styles.nav}>
            {menuLinks.map((link) => (
              <motion.div key={link.name} variants={itemVariants}>
                <Link href={link.href} className={styles.navLink} onClick={onClose}>
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div 
            className={styles.footer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className={styles.decorationImages}>
              {products.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/product/${product.slug}`} 
                  className={styles.decorationImageItem}
                  onClick={onClose}
                >
                  <img 
                    src={product.images?.[0] ? urlFor(product.images[0]).url() : "/api/placeholder/400/400"} 
                    alt={product.title} 
                  />
                  <div className={styles.decorationInfo}>
                    <p>{product.title.toUpperCase()}</p>
                    <span>₹{product.price.toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
