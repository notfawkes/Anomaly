import React from 'react';
import { motion } from 'framer-motion';
const Footer = () => {
  return <motion.footer className="bg-black bg-opacity-70 border-t border-green-900 py-8 mt-20" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 1,
    delay: 0.5
  }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div className="mb-6 md:mb-0" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <h3 className="text-xl text-green-500 mb-2">ANOMALY</h3>
            <p className="text-gray-400 text-sm">
              © 2023 Temporal Reconstruction Agency
            </p>
          </motion.div>
          <motion.div className="flex space-x-6" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors duration-300">
              GitHub
            </a>
            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors duration-300">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors duration-300">
              Discord
            </a>
          </motion.div>
        </div>
        <motion.div className="mt-8 pt-6 border-t border-green-900 text-center text-gray-500 text-xs" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }}>
          <p>Created with React, Tailwind CSS, Framer Motion, and GSAP</p>
          <p className="mt-2">
            All systems are fictional. Any resemblance to real temporal
            anomalies is purely coincidental.
          </p>
        </motion.div>
      </div>
    </motion.footer>;
};
export default Footer;