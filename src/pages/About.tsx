import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/common/Footer';
const About = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#050510';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);
  return <div className="min-h-screen bg-black text-green-500 font-mono">
      <header className="border-b border-green-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl text-green-500 hover:text-green-400 transition-colors duration-300">
            ANOMALY
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-500 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/game" className="text-gray-400 hover:text-green-500 transition-colors duration-300">
                  Play
                </Link>
              </li>
              <li>
                <span className="text-green-500">About</span>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <motion.h1 className="text-4xl md:text-5xl mb-12 text-center" initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>
          About The Project
        </motion.h1>
        <div className="max-w-3xl mx-auto">
          <motion.section className="mb-12" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <h2 className="text-2xl mb-4 text-purple-400">The Story</h2>
            <p className="text-gray-300 mb-4">
              In the year 2157, a catastrophic event known as "The Fracture"
              shattered the timeline. Reality itself began to unravel as
              paradoxes and anomalies spread throughout history. The Temporal
              Reconstruction Agency was formed with one mission: restore the
              broken timeline before reality collapses completely.
            </p>
            <p className="text-gray-300">
              As an agent of the TRA, you have been equipped with advanced
              temporal hacking tools. Your mission is to navigate through
              corrupted systems, solve intricate puzzles, and repair the damaged
              nodes that hold our timeline together.
            </p>
          </motion.section>
          <motion.section className="mb-12" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }}>
            <h2 className="text-2xl mb-4 text-blue-400">Learning Experience</h2>
            <p className="text-gray-300 mb-4">
              Anomaly is more than just a game. It's an educational journey that
              challenges your:
            </p>
            <ul className="list-disc pl-5 text-gray-300 mb-4">
              <li className="mb-2">
                Logical reasoning through paradoxes and mind-bending puzzles
              </li>
              <li className="mb-2">
                Coding skills with programming challenges that require real
                solutions
              </li>
              <li className="mb-2">
                Networking knowledge with simulated systems that mimic
                real-world protocols
              </li>
              <li className="mb-2">
                Problem-solving abilities with complex, multi-step challenges
              </li>
            </ul>
            <p className="text-gray-300">
              Each puzzle is carefully designed to be both entertaining and
              educational, providing valuable skills that apply to real-world
              technology and computer science.
            </p>
          </motion.section>
          <motion.section initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }}>
            <h2 className="text-2xl mb-4 text-green-400">How to Play</h2>
            <p className="text-gray-300 mb-4">
              Anomaly simulates a terminal interface that you'll use to interact
              with the game world. Type commands to navigate systems, solve
              puzzles, and progress through the story.
            </p>
            <p className="text-gray-300 mb-4">Basic commands include:</p>
            <div className="bg-black bg-opacity-50 p-4 border border-green-800 font-mono text-sm mb-6">
              <div className="text-green-400">
                help - Show available commands
              </div>
              <div className="text-green-400">scan - Look for anomalies</div>
              <div className="text-green-400">
                connect - Connect to a system node
              </div>
              <div className="text-green-400">
                solve - Attempt to solve a puzzle
              </div>
            </div>
            <p className="text-gray-300 mb-8">
              As you progress, you'll unlock new commands and abilities. Pay
              attention to system messages and hints to guide your journey.
            </p>
            <div className="text-center">
              <Link to="/game" className="inline-block px-8 py-4 bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 text-xl">
                Begin Mission
              </Link>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>;
};
export default About;