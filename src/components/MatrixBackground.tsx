// src/components/MatrixBackground.tsx

import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
    // useRef is used to get a direct reference to the <canvas> DOM element
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // useEffect runs after the component mounts to the screen
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Exit if the canvas isn't available yet

        const ctx = canvas.getContext('2d');
        if (!ctx) return; // Exit if the 2D context isn't available

        // Set initial canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const characters = katakana + latin + nums;
        
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        const draw = () => {
            // Change #1: Lower alpha value for a longer, more transparent trail
            ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Change #2: Use RGBA to make the characters semi-transparent
            ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const intervalId = setInterval(draw, 33);

        // This function handles window resizing
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Cleanup function to run when the component unmounts
        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', handleResize);
        };
    }, []); // The empty array [] ensures this effect runs only once

    return (
        <canvas 
            ref={canvasRef} 
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                zIndex: -1 
            }} 
        />
    );
};

export default MatrixBackground;