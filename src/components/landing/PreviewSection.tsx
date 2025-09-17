import React from 'react';
import { motion } from 'framer-motion';
const PreviewSection = () => {
  const terminalLines = ['> connect --node temporal_core', 'CONNECTING TO TEMPORAL CORE...', 'CONNECTION ESTABLISHED', 'WARNING: MULTIPLE TIMELINE FRACTURES DETECTED', '> scan --anomalies', 'SCANNING FOR TEMPORAL ANOMALIES...', '3 CRITICAL ANOMALIES DETECTED:', '  - ECHO CHAMBER (LOCKED)', '  - PARADOX ENGINE (LOCKED)', '  - QUANTUM LOOP (LOCKED)', '> decrypt --node echo_chamber', 'INITIATING DECRYPTION SEQUENCE...', 'ACCESS DENIED: SOLVE THE PARADOX TO PROCEED', '> solve --paradox "This statement is false"', 'PROCESSING LOGICAL PARADOX...', '...'];
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
        &lt; Preview &gt;
      </motion.h2>
      <motion.div className="bg-black p-4 rounded-md border border-green-500 font-mono text-sm md:text-base relative overflow-hidden" initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} viewport={{
      once: true
    }} transition={{
      duration: 1
    }}>
        <div className="flex items-center mb-2 border-b border-green-800 pb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-gray-400 text-xs">
            temporal_reconstruction_terminal
          </span>
        </div>
        <div className="terminal-content">
          {terminalLines.map((line, index) => <motion.div key={index} className={`mb-1 ${line.startsWith('>') ? 'text-green-500' : 'text-gray-300'}`} initial={{
          opacity: 0,
          x: -10
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.3,
          delay: index * 0.15
        }}>
              {line}
            </motion.div>)}
          <motion.div className="inline-block h-5 w-2 bg-green-500" animate={{
          opacity: [1, 0, 1]
        }} transition={{
          duration: 1,
          repeat: Infinity
        }} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-green-900 opacity-5"></div>
          <div className="scan-line"></div>
        </div>
      </motion.div>
    </motion.section>;
};
export default PreviewSection;