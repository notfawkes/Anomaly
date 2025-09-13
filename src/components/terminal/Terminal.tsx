import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import CommandProcessor from './CommandProcessor';
const Terminal = () => {
  const [history, setHistory] = useState<{
    type: string;
    content: string;
  }[]>([{
    type: 'system',
    content: 'TEMPORAL RECONSTRUCTION SYSTEM ONLINE'
  }, {
    type: 'system',
    content: 'TYPE "help" FOR AVAILABLE COMMANDS'
  }]);
  const [input, setInput] = useState('');
  const [commandLock, setCommandLock] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);
  // Focus input when terminal is clicked
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener('click', handleClick);
    }
    return () => {
      if (terminal) {
        terminal.removeEventListener('click', handleClick);
      }
    };
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || commandLock) return;
    // Add user input to history
    setHistory(prev => [...prev, {
      type: 'input',
      content: input
    }]);
    // Lock commands during processing
    setCommandLock(true);
    // Process command
    const responses = await CommandProcessor(input);
    // Add responses to history
    setTimeout(() => {
      setHistory(prev => [...prev, ...responses.map(res => ({
        type: 'system',
        content: res
      }))]);
      setCommandLock(false);
    }, 500);
    // Clear input
    setInput('');
  };
  return <div className="flex flex-col h-full">
      <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto terminal-bg">
        {history.map((item, index) => <motion.div key={index} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }} className={`mb-2 ${item.type === 'input' ? 'text-green-400' : 'text-gray-300'}`}>
            {item.type === 'input' ? `> ${item.content}` : item.content}
          </motion.div>)}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-green-900 p-4 bg-black bg-opacity-80">
        <div className="flex items-center">
          <span className="text-green-500 mr-2">&gt;</span>
          <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} disabled={commandLock} className="flex-1 bg-transparent border-none outline-none text-green-500 font-mono" autoFocus spellCheck="false" autoComplete="off" />
        </div>
      </form>
    </div>;
};
export default Terminal;