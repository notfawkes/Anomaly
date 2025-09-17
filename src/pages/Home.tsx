import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/landing/Hero';
import AboutSection from '../components/landing/AboutSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import PreviewSection from '../components/landing/PreviewSection';
import Footer from '../components/common/Footer';
const Home = () => {
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.backgroundColor = '#050510';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.overflow = '';
    };
  }, []);
  return <div className="min-h-screen bg-black text-green-500 font-mono">
      <Hero />
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 0.5,
      duration: 1
    }} className="container mx-auto px-4">
        <AboutSection />
        <FeaturesSection />
        <PreviewSection />
        <motion.div className="py-20 text-center" initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }}>
          <h2 className="text-3xl mb-8 glitch-text">
            Ready to restore the timeline?
          </h2>
          <Link to="/game" className="inline-block px-8 py-4 bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 text-xl relative overflow-hidden group">
            <span className="relative z-10">&gt; ENTER THE SYSTEM</span>
            <span className="absolute inset-0 bg-green-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          </Link>
        </motion.div>
      </motion.div>
      <Footer />
    </div>;
};
export default Home;