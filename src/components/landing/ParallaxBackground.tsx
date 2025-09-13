import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
const ParallaxBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!backgroundRef.current) return;
    const layers = backgroundRef.current.querySelectorAll('.parallax-layer');
    // Initialize the matrix digital rain
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
        const columns = Math.floor(canvas.width / 20);
        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
          drops[i] = 1;
        }
        const draw = () => {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#0f0';
          ctx.font = '15px monospace';
          for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * 20, drops[i] * 20);
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
        };
        setInterval(draw, 35);
      }
    }
    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.5;
        const offsetX = (0.5 - x) * speed;
        const offsetY = (0.5 - y) * speed;
        gsap.to(layer, {
          duration: 0.5,
          x: offsetX * 30,
          y: offsetY * 30,
          ease: 'power1.out'
        });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    // Handle window resize for canvas
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return <div ref={backgroundRef} className="absolute inset-0 overflow-hidden">
      {/* Digital rain background */}
      <canvas id="matrix-canvas" className="absolute inset-0 opacity-20"></canvas>
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      {/* Parallax layers */}
      <div className="parallax-layer absolute inset-0">
        <div className="absolute w-40 h-40 border-2 border-green-500 rounded-full top-1/4 left-1/4 opacity-20"></div>
        <div className="absolute w-64 h-64 border border-purple-500 top-1/3 right-1/4 opacity-10"></div>
      </div>
      <div className="parallax-layer absolute inset-0">
        <div className="absolute w-80 h-80 border-2 border-blue-500 rounded-full bottom-1/4 right-1/3 opacity-15"></div>
        <div className="absolute w-32 h-32 border border-yellow-500 top-1/2 left-1/3 opacity-20"></div>
      </div>
      <div className="parallax-layer absolute inset-0">
        <div className="absolute w-20 h-20 bg-green-500 rounded-full top-1/3 left-1/5 opacity-5"></div>
        <div className="absolute w-24 h-24 bg-purple-500 rounded-full bottom-1/3 right-1/5 opacity-5"></div>
      </div>
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50"></div>
    </div>;
};
export default ParallaxBackground;