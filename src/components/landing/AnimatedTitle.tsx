import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
const AnimatedTitle = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!titleRef.current) return;
    // Create glitch effect
    const glitchLoop = () => {
      if (!titleRef.current) return;
      // Random glitch timing
      const glitchDuration = Math.random() * 0.2 + 0.05;
      const glitchInterval = Math.random() * 5 + 2;
      // Create glitch effect
      gsap.to(titleRef.current, {
        skewX: () => Math.random() * 10 - 5,
        textShadow: '2px 0 #ff00ff, -2px 0 #00ffff',
        duration: glitchDuration,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.to(titleRef.current, {
            skewX: 0,
            textShadow: 'none',
            duration: glitchDuration,
            ease: 'power1.inOut'
          });
        }
      });
      // Schedule next glitch
      setTimeout(glitchLoop, glitchInterval * 1000);
    };
    // Start the glitch loop after initial animation
    setTimeout(glitchLoop, 3000);
  }, []);
  return <motion.h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-green-500 tracking-wider" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 2
  }}>
      <motion.span initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 0.5,
      duration: 1
    }}>
        ANOMALY
      </motion.span>
      <motion.span className="block text-2xl md:text-3xl lg:text-4xl text-purple-400 mt-2" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1.5,
      duration: 1
    }}>
        Restore the Broken Timeline
      </motion.span>
    </motion.h1>;
};
export default AnimatedTitle;