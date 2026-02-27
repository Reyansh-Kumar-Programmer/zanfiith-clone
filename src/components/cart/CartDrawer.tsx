"use client";

import { useCart } from "@/hooks/useCart";
import styles from "./CartDrawer.module.css";
import { X } from "lucide-react";
import { clsx } from "clsx";
import { urlFor } from "@/sanity/lib/image";

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeFromCart, totalPrice } = useCart();

  return (
    <>
      <div 
        className={clsx(styles.overlay, isOpen && styles.overlayOpen)} 
        onClick={() => setIsOpen(false)}
      />
      <div className={clsx(styles.drawer, isOpen && styles.drawerOpen)}>
        <div className={styles.header}>
          <h2 className={styles.title}>Your Cart</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.itemsList}>
          {cart.length === 0 ? (
            <div className={styles.emptyState}>
              Your cart is empty
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img 
                  src={item.images?.[0] ? urlFor(item.images[0]).url() : ""} 
                  alt={item.title} 
                  className={styles.itemImage} 
                />
                <div className={styles.itemInfo}>
                  <div>
                    <h3 className={styles.itemName}>{item.title}</h3>
                    <p className={styles.itemPrice}>
                      {item.quantity} x ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  <button 
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <button className={styles.checkoutButton}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
