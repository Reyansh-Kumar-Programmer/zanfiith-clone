import Link from "next/link";
import styles from "./Footer.module.css";
import { Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>Zeninfith</div>
            <p className={styles.description}>
              Premium quality apparel designed for the modern individual. Masterpiece of evolution.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <h3 className={styles.linkTitle}>Shop</h3>
            <Link href="/catalog" className={styles.link}>All Products</Link>
            <Link href="/catalog?category=tees" className={styles.link}>T-Shirts</Link>
            <Link href="/catalog?category=hoodies" className={styles.link}>Hoodies</Link>
          </div>

          <div className={styles.footerLinks}>
            <h3 className={styles.linkTitle}>Support</h3>
            <Link href="/track" className={styles.link}>Track Order</Link>
            <Link href="/contact" className={styles.link}>Contact Us</Link>
            <Link href="/shipping" className={styles.link}>Shipping Policy</Link>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Zeninfith. All rights reserved.
          </p>
          <div className={styles.socials}>
            <Link href="#" className={styles.link} aria-label="Instagram">
              <Instagram size={20} />
            </Link>
            <Link href="#" className={styles.link} aria-label="Twitter">
              <Twitter size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
