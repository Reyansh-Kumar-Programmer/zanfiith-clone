import Link from "next/link";
import styles from "./ProductCard.module.css";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: {
    title: string;
    slug: string;
    price: number;
    images: any[];
    categoryName: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0] ? urlFor(product.images[0]).url() : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/product/${product.slug}`} className={styles.card}>
        <div className={styles.imageWrapper}>
          <img 
            src={imageUrl} 
            alt={product.title} 
            className={styles.image} 
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{product.title}</h3>
          <span className={styles.category}>{product.categoryName}</span>
          <span className={styles.price}>₹{product.price.toLocaleString()}</span>
        </div>
      </Link>
    </motion.div>
  );
}
