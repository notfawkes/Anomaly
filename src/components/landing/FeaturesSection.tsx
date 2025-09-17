import React from 'react';
import { motion } from 'framer-motion';
const FeaturesSection = () => {
  const features = [{
    title: 'Logic Puzzles',
    description: 'Solve paradoxes and logical conundrums to unlock corrupted data nodes.',
    color: 'green'
  }, {
    title: 'Coding Challenges',
    description: 'Write and debug code snippets to patch temporal anomalies.',
    color: 'blue'
  }, {
    title: 'Network Hacking',
    description: 'Navigate virtual networks to reconnect fragmented timelines.',
    color: 'purple'
  }, {
    title: 'Cryptography',
    description: 'Decrypt encoded messages from across different time periods.',
    color: 'yellow'
  }];
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
      <motion.h2 className="text-3xl md:text-4xl mb-12 text-center" initial={{
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
        &lt; Gameplay Features &gt;
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => <motion.div key={index} className={`bg-black bg-opacity-50 p-6 border border-${feature.color}-500 relative overflow-hidden group`} initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: index * 0.1
      }} whileHover={{
        scale: 1.05,
        boxShadow: `0 0 15px rgba(0, 255, 0, 0.3)`
      }}>
            <div className={`absolute inset-0 bg-${feature.color}-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            <h3 className={`text-xl mb-3 text-${feature.color}-400`}>
              {feature.title}
            </h3>
            <p className="text-gray-300 text-sm">{feature.description}</p>
          </motion.div>)}
      </div>
      <motion.div className="mt-16 bg-black bg-opacity-70 p-8 border border-green-500 relative overflow-hidden" initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.8,
      delay: 0.4
    }}>
        <h3 className="text-2xl mb-4 text-green-400">
          Immersive Terminal Experience
        </h3>
        <p className="text-gray-300">
          Navigate through a realistic terminal interface with authentic
          command-line interactions. Experience the thrill of hacking through
          corrupted systems with visual glitch effects, retro ASCII art, and
          dynamic responses. Each command you type brings you closer to
          restoring the timeline.
        </p>
      </motion.div>
    </motion.section>;
};
export default FeaturesSection;