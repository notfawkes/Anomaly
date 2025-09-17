import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Terminal from '../components/terminal/Terminal';
import BootSequence from '../components/terminal/BootSequence';
const Game = () => {
  const [booting, setBooting] = useState(true);
  useEffect(() => {
    document.body.style.backgroundColor = '#050510';
    document.body.style.overflow = 'hidden';
    // Simulate boot sequence
    const bootTimer = setTimeout(() => {
      setBooting(false);
    }, 6000);
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.overflow = '';
      clearTimeout(bootTimer);
    };
  }, []);
  return <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col">
      {booting ? <BootSequence /> : <motion.div className="flex-1 flex flex-col" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 1
    }}>
          <div className="p-4 border-b border-green-900 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-gray-400">
                TEMPORAL_RECONSTRUCTION_TERMINAL v1.0.2
              </span>
            </div>
            <div className="text-xs text-gray-400">
              <span className="mr-4">USER: AGENT_ALPHA</span>
              <span>STATUS: CONNECTED</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <Terminal />
          </div>
        </motion.div>}
    </div>;
};
export default Game;