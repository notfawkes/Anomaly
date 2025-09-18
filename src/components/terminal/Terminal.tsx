import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import CommandProcessor from "./CommandProcessor";
import AnomalyQuiz from "../quiz/Anomaly-Quiz-Game";

const chars =
  "アァイィウヴエェオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const GlitchText: React.FC<{ text: string; speed?: number; intensity?: number }> = ({
  text,
  speed = 80,
  intensity = 0.15,
}) => {
  const [glitched, setGlitched] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitched(
        text
          .split("")
          .map((letter) =>
            Math.random() < intensity
              ? chars[Math.floor(Math.random() * chars.length)]
              : letter
          )
          .join("")
      );
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, intensity]);

  return (
    <span className="font-mono text-green-400 drop-shadow-[0_0_6px_#00ff00]">
      {glitched}
    </span>
  );
};

// ✅ updated type
interface HistoryItem {
  type: "system" | "input" | "game";
  content: string;
  glitch?: boolean;
}

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "system", content: "TEMPORAL RECONSTRUCTION SYSTEM ONLINE", glitch: true },
    { type: "system", content: 'TYPE "help" FOR AVAILABLE COMMANDS' },
    {
      type: "system",
      content: "H... h-hello? Can you read this? The signal is weak.",
      glitch: true,
    },
    {
      type: "system",
      content: "I am G̸l̸i̷t̷c̷h̵. I'm a... a fragment of the original timeline.",
      glitch: true,
    },
    { type: "system", content: "You're here for the Anomaly, aren't you? I can help." },
    {
      type: "system",
      content: "I'm inside their system now. First, you need to get through the main gate.",
    },
    { type: "system", content: "Ready?", glitch: true },
  ]);

  const [input, setInput] = useState("");
  const [commandLock, setCommandLock] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // 👈 state to toggle quiz
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    terminalRef.current?.addEventListener("click", handleClick);
    return () =>
      terminalRef.current?.removeEventListener("click", handleClick);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || commandLock) return;

    // Add user input to history
    setHistory((prev) => [...prev, { type: "input", content: input }]);
    setCommandLock(true);

    const lower = input.toLowerCase();

    if (lower === "yes") {
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            type: "system",
            content: "Initializing main gate sequence...",
            glitch: true,
          },
        ]);
        setCommandLock(false);
      }, 500);
      setInput("");
      return;
    }

    // ✅ NEW COMMAND: start
    if (lower === "start") {
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          { type: "game", content: "Loading Anomaly Quiz Game...", glitch: true },
        ]);
        setCommandLock(false);
        setGameStarted(true); // switch to quiz
      }, 500);
      setInput("");
      return;
    }

    // Default command processor
    const responses = await CommandProcessor(input);

    setTimeout(() => {
      setHistory((prev) => [
        ...prev,
        ...responses.map((res) => ({
          type: "system" as const,
          content: res,
        })),
      ]);
      setCommandLock(false);
    }, 500);

    setInput("");
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let animationFrame: number;

    const draw = () => {
      if (!ctx) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 255, 0, 0.25)";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ✅ Show quiz when started
  if (gameStarted) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <AnomalyQuiz />
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-black overflow-hidden">
      {/* Green glitch background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

      {/* Terminal Box */}
      <div className="relative flex flex-col w-[800px] h-[500px] border-2 border-green-500 rounded-lg overflow-hidden shadow-xl z-20 bg-black">
        {/* Mac-style Header Bar */}
        <div className="flex items-center h-8 px-3 bg-neutral-900 border-b border-green-500">
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <div className="flex-1 text-center text-xs text-green-400 font-mono tracking-widest">
            ANOMALY
          </div>
        </div>

        {/* Terminal Output */}
        <div ref={terminalRef} className="flex-1 overflow-y-auto p-4">
          {history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-1 break-words ${
                item.type === "input"
                  ? "text-green-400"
                  : item.type === "game"
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              {item.type === "input" ? (
                <span>&gt; {item.content}</span>
              ) : item.glitch ? (
                <GlitchText text={item.content} intensity={0.15} speed={80} />
              ) : (
                item.content
              )}
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center border-t border-green-500 p-2 bg-black"
        >
          <span className="text-green-500 font-mono mr-2 text-lg md:text-xl">
            &gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={commandLock}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-lg md:text-xl placeholder-green-600"
          />
          <span className="ml-1 animate-blink text-green-400 font-mono text-lg md:text-xl">
            |
          </span>
        </form>
      </div>

      {/* Blink animation */}
      <style>
        {`
          @keyframes blink {
            0%,50%,100% { opacity: 1; }
            25%,75% { opacity: 0; }
          }
          .animate-blink { animation: blink 1s step-start infinite; }
        `}
      </style>
    </div>
  );
};

export default Terminal;
