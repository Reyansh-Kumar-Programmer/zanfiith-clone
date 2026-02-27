"use client";

import Header from "@/components/layout/Header";
import styles from "./contact.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PHRASES = ["HELLO.", "CREATE.", "INNOVATE.", "EVOLVE.", "CONNECT."];
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

  return <h1 className={styles.massiveTitle}>{text}</h1>;
}

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <>
      <Header />
      <main className={styles.contactWrapper}>
        <div className={styles.splitLayout}>
          <motion.div 
            className={styles.leftPanel}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.panelContent}>
              <ScrambledTitle />
              <p className={styles.panelText}>
                We're always looking for the next masterpiece of evolution. Connect with us to elevate your style.
              </p>
            </div>
            <div className={styles.decorativeCircle}></div>
            <div className={styles.decorativeCircle2}></div>
          </motion.div>

          <motion.div 
            className={styles.rightPanel}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className={styles.formContainer}>
              <h2 className={styles.formTitle}>Send a Message</h2>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.fieldGroup}>
                  <div className={styles.field}>
                    <input type="text" id="name" required placeholder="Name *" />
                  </div>
                  <div className={styles.field}>
                    <input type="email" id="email" required placeholder="Email *" />
                  </div>
                </div>
                <div className={styles.field}>
                  <input type="tel" id="phone" placeholder="Phone number" />
                </div>
                <div className={styles.field}>
                  <textarea id="comment" rows={5} required placeholder="Comment *"></textarea>
                </div>
                <button type="submit" className={styles.submitButton}>
                  Submit
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
