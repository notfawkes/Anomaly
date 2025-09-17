import React from 'react';
import { motion } from 'framer-motion';
const AboutSection = () => {
  return <motion.section className="py-20" initial={{
    opacity: 0
  }} whileInView={{
    opacity: 1
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.8
  }}>
      <div className="glitch-divider mb-12"></div>
      <motion.h2 className="text-3xl md:text-4xl mb-8 text-center" initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.5
    }}>
        &lt; About the Mission &gt;
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div className="bg-black bg-opacity-50 p-6 border border-green-500 relative overflow-hidden group" initial={{
        opacity: 0,
        x: -50
      }} whileInView={{
        opacity: 1,
        x: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} whileHover={{
        scale: 1.02
      }}>
          <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          <h3 className="text-2xl mb-4 text-green-400">The Anomaly</h3>
          <p className="text-gray-300">
            In the year 2157, a catastrophic event shattered the timeline.
            Reality is fracturing, and paradoxes are appearing across history.
            As an agent of the Temporal Reconstruction Agency, you must use your
            hacking skills to navigate through corrupted systems and repair the
            broken timeline.
          </p>
        </motion.div>
        <motion.div className="bg-black bg-opacity-50 p-6 border border-purple-500 relative overflow-hidden group" initial={{
        opacity: 0,
        x: 50
      }} whileInView={{
        opacity: 1,
        x: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} whileHover={{
        scale: 1.02
      }}>
          <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          <h3 className="text-2xl mb-4 text-purple-400">Your Mission</h3>
          <p className="text-gray-300">
            Solve intricate puzzles that test your logic, aptitude, coding, and
            networking skills. Each solution helps stabilize a fragment of the
            timeline. Work through the corrupted terminal interface to decode
            the mystery behind the temporal collapse and prevent total reality
            failure.
          </p>
        </motion.div>
      </div>
    </motion.section>;
};
export default AboutSection;