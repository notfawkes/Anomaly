import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ParallaxBackground from './ParallaxBackground';
import AnimatedTitle from './AnimatedTitle';
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!heroRef.current) return;
    // Create glitch effect on hover for buttons
    const buttons = heroRef.current.querySelectorAll('.hero-button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          duration: 0.1,
          x: '+=2',
          yoyo: true,
          repeat: 5,
          ease: 'power1.inOut'
        });
      });
    });
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', () => {});
      });
    };
  }, []);
  return <div ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <ParallaxBackground />
      <div className="relative z-10 text-center px-4">
        <AnimatedTitle />
        <motion.p initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 2.5,
        duration: 1
      }} className="text-xl md:text-2xl mb-12 text-green-400 max-w-2xl mx-auto">
          A timeline fractured. Reality corrupted. Hack your way through puzzles
          to restore what was lost.
        </motion.p>
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 3,
        duration: 0.8
      }} className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/game" className="hero-button px-8 py-3 bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 text-xl relative overflow-hidden group">
            <span className="relative z-10">&gt; PLAY NOW</span>
            <span className="absolute inset-0 bg-green-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          </Link>
          <Link to="/about" className="hero-button px-8 py-3 bg-transparent border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-black transition-all duration-300 text-xl relative overflow-hidden group">
            <span className="relative z-10">&gt; ABOUT</span>
            <span className="absolute inset-0 bg-purple-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          </Link>
        </motion.div>
      </div>
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 3.5,
      duration: 1
    }} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-green-500 text-sm flex flex-col items-center">
        <span>Scroll to learn more</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>;
};
export default Hero;