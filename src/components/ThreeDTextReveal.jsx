import React from 'react';
import { motion } from 'framer-motion';

export const ThreeDTextReveal = ({ text, delay = 0 }) => {
  if (!text) return null;

  // Split text into individual characters (retaining spaces)
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      rotateX: -95,
      y: 15,
      z: -30
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      z: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 90
      }
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      style={{
        display: 'inline-block',
        perspective: '1200px', // Creates a sleek depth perspective
        transformStyle: 'preserve-3d',
      }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{
            display: 'inline-block',
            whiteSpace: 'pre',
            transformOrigin: '50% 0%', // Pivot from the top
            backfaceVisibility: 'hidden',
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default ThreeDTextReveal;
