"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import DynamicBackground from "@/components/ui/DynamicBackground";
import styles from "@/app/page.module.css";

const PHRASES = ["MASTERPIECE", "EVOLUTION", "ZENINFITH", "ELEVATE", "STREETWEAR"];
const CHARS = "!<>-_\\/[]{}—=+*^?#________";

function ScrambledTitle() {
  const [text, setText] = useState(PHRASES[0]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let animationFrameId: number;
    let phraseIndex = 0;

    const scramble = () => {
      const startText = PHRASES[phraseIndex];
      const endText = PHRASES[(phraseIndex + 1) % PHRASES.length];
      phraseIndex = (phraseIndex + 1) % PHRASES.length;

      const length = Math.max(startText.length, endText.length);
      let frame = 0;

      const update = () => {
        let output = "";
        let complete = 0;

        for (let i = 0; i < length; i++) {
          if (frame >= i * 3) {
            output += endText[i] || "";
            complete++;
          } else {
            output += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setText(output);

        if (complete === length) {
          timeoutId = setTimeout(scramble, 3000);
        } else {
          frame++;
          animationFrameId = requestAnimationFrame(update);
        }
      };

      update();
    };

    timeoutId = setTimeout(scramble, 3000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.h1 
      className={styles.heroTitle}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {text}
      <br />
      <span style={{ color: "var(--brand-red)" }}>OF EVOLUTION</span>
    </motion.h1>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className={styles.hero}>
      <DynamicBackground />
      
      <motion.div 
        className={styles.heroContent}
        style={{ y: y1, opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.p 
          className={styles.heroSubtitle}
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.1em" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Before entering the store...
        </motion.p>
        
        <ScrambledTitle />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link href="/catalog">
            <button className={styles.ctaButton}>
              <span className={styles.ctaText}>Shop Collection</span>
              <div className={styles.ctaOverlay} />
            </button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  );
}
