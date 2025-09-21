import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const chars =
  "アァイィウヴエェオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const BootSequence = () => {
  const [bootStep, setBootStep] = useState(0);
  const bootMessages = [
    "INITIALIZING TEMPORAL CORE...",
    "LOADING QUANTUM ENCRYPTION MODULES...",
    "ESTABLISHING SECURE CONNECTION...",
    "SCANNING FOR TIMELINE ANOMALIES...",
    "CALIBRATING PARADOX DETECTION SYSTEMS...",
    "TERMINAL ACCESS GRANTED",
  ];

  useEffect(() => {
    if (bootStep < bootMessages.length - 1) {
      const timer = setTimeout(() => {
        setBootStep((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [bootStep]);

  // 🔥 Matrix glitch background
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

  return (
    <div className="relative min-h-screen bg-black flex flex-col justify-center items-center p-4 overflow-hidden">
      {/* 🔥 Glitchy Matrix Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

      {/* ✅ Original Boot UI untouched */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl z-20"
      >
        <pre className="text-green-500 mb-8 text-center text-xs sm:text-sm md:text-base">
          {`
  █████╗ ███╗   ██╗ ██████╗ ███╗   ███╗ █████╗ ██╗  ██╗   ██╗
 ██╔══██╗████╗  ██║██╔═══██╗████╗ ████║██╔══██╗██║  ╚██╗ ██╔╝
 ███████║██╔██╗ ██║██║   ██║██╔████╔██║███████║██║   ╚████╔╝ 
 ██╔══██║██║╚██╗██║██║   ██║██║╚██╔╝██║██╔══██║██║    ╚██╔╝  
 ██║  ██║██║ ╚████║╚██████╔╝██║ ╚═╝ ██║██║  ██║███████╗██║   
 ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚═╝   
 TEMPORAL RECONSTRUCTION AGENCY - CLASSIFIED ACCESS
`}
        </pre>
        <div className="border border-green-700 p-4">
          {bootMessages.slice(0, bootStep + 1).map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-green-400 mb-2"
            >
              {`> ${message}`}
              {index === bootStep && index !== bootMessages.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  _
                </motion.span>
              )}
            </motion.div>
          ))}
          {bootStep === bootMessages.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-center text-green-300"
            >
              WELCOME AGENT. PREPARE FOR TEMPORAL RECONSTRUCTION MISSION.
            </motion.div>
          )}
        </div>
        <div className="mt-8 flex justify-between text-xs text-gray-500">
          <div>TRA-OS v7.3.21</div>
          <div>SECURITY LEVEL: ALPHA</div>
        </div>
      </motion.div>
    </div>
  );
};

export default BootSequence;
