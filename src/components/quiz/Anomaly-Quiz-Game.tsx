import React, { useEffect, useState, useRef } from "react";
import skullImg from "./skull.png"; 
import React, { useEffect, useState, useRef } from "react";
import skullImg from "./skull.png"; 

type Question = {
  id: number;
  text: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
};

// --- STORY & QUESTIONS (WITH INTRO TEXT) ---
const STORY_TEXT = {
  level1Intro: `TRA COMMLINK INITIATED...\n"Agent, welcome. The Fracture's initial shockwave has destabilized the most fundamental events. We're detecting paradoxes in basic historical sequences—birthdates, resource allocations, simple logic. Your first task is to stabilize these 'Primary Nodes' by solving the temporal anomalies corrupting them. Use your core aptitude skills. The fate of a simple timeline depends on it."`,
  level1Complete: `THE SKULL AWAKENS...`,
  level2Intro: `TRA COMMLINK UPDATE...\n"Agent, the attack is sophisticated. The core timeline is represented by complex data structures, which are now riddled with recursive paradoxes and pointer corruption. You must traverse these unstable structures, correct the code, and patch the memory leaks. Our scans indicate ten critical errors. Fix them."`,
  level2Complete: `THE RED SKULL EMERGES 🔥`,
  level3Intro: `"The final breach is here, in the TRA headquarters itself. The final level is the hardest: a direct assault on the source of The Fracture. The final puzzle awaits. Good luck, Agent. The truth is the final anomaly."`,
  level3Complete: `THE FINAL PORTAL IS UNLOCKED!`
};

const chars =
  "アァイィウヴエェオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const QUESTION_BANK: { level1: Question[]; level2: Question[]; level3: Question[] } = {
  level1: [
    { id: 1, text: "Temporal Calibration: The Fracture caused a temporal loop in the year 2100. For every 5 years that pass forward, 2 years are reversed. If an event was originally scheduled for the year 2157, how many total years forward from 2100 must pass to reach it?", options: ["95 years", "399 years", "455 years", "525 years"], correctIndex: 0 },
    { id: 2, text: "Paradox Resourcing: The TRA has 3 Time-Core Generators. To stabilize a node, the energy must be split in a 2:3:4 ratio. If the smallest share is 80 tera-joules, what is the total energy output?", options: ["180 TJ", "360 TJ", "540 TJ", "720 TJ"], correctIndex: 1 },
    { id: 3, text: "Anomaly Sequencing: A corrupted timeline sequence is observed: 5, 11, 17, 23, ?. What is the next value to correct the sequence and restore flow?", options: ["29", "31", "35", "37"], correctIndex: 0 },
    { id: 4, text: "Chronological Age Puzzle: A historical figure's birth year is corrupted. It is known they were 35 years old in the year 2080. What was their year of birth?", options: ["2115", "2045", "2145", "2015"], correctIndex: 1 },
    { id: 5, text: "Probability of Stability: There's a 60% chance a timeline node will stabilize on the first attempt. If it fails, there's a 45% chance on the second. What is the overall probability of stabilizing the node within two attempts?", options: ["78%", "87%", "93%", "105%"], correctIndex: 0 },
    { id: 6, text: "Temporal Work Rate: Agent K can repair a timeline anomaly in 6 hours. Agent J can repair the same anomaly in 4 hours. How long would it take them to repair it working together?", options: ["2.4 hours", "3.0 hours", "4.5 hours", "5.0 hours"], correctIndex: 0 },
    { id: 7, text: "Paradox Percentage: A stable timeline has 100 events. The Fracture corrupted 35% of them. After your first repair, you fixed 20 events. What percentage of the total events are still corrupted?", options: ["10%", "15%", "20%", "25%"], correctIndex: 1 },
    { id: 8, text: "Velocity of Decay: The unraveling of reality is spreading at a rate of 1.5 years of history per second. At this rate, how many minutes will it take to erase a century (100 years)?", options: ["1.11 minutes", "1.33 minutes", "1.67 minutes", "1.89 minutes"], correctIndex: 0 },
    { id: 9, text: "Binary Time Code: A time lock requires a 4-bit binary code. The clues are: the sum of the digits is 3, and the first digit is 1. What is the code?", options: ["1001", "1010", "1100", "1011"], correctIndex: 3 },
    { id: 10, text: "Area of Stability: To anchor a time beacon, you need to create a stable zone of 100 m². If the zone must be a square, what is the length of one side?", options: ["7.5 m", "10.0 m", "12.5 m", "15.0 m"], correctIndex: 1 },
  ],
  level2: [
    { id: 1, text: "TRA COMMS: A temporal event buffer processes data using a Last-In, First-Out (LIFO) protocol. What is this data structure called?", correctAnswer: "stack" },
    { id: 2, text: "TRA COMMS: To maintain chronological order, events are processed First-In, First-Out (FIFO). Identify this structure.", correctAnswer: "queue" },
    { id: 3, text: "TRA COMMS: In a timeline represented as a binary tree, a terminal event with no subsequent events is known by what term?", correctAnswer: "leaf" },
    { id: 4, text: "TRA COMMS: The 'O' notation for an algorithm whose execution time is constant, regardless of the size of the timeline data, is O of what number?", correctAnswer: "1" },
    { id: 5, text: "TRA COMMS: What is the name for the single, originating event from which all other events in a timeline tree branch?", correctAnswer: "root" },
    { id: 6, text: "TRA COMMS: A traversal algorithm visits the left branch, the current event, then the right branch. Name this traversal.", correctAnswer: "inorder" },
    { id: 7, text: "TRA COMMS: This simple sorting algorithm repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.", correctAnswer: "bubble" },
    { id: 8, text: "TRA COMMS: A graph with no cycles is called a DAG. What does the 'A' stand for?", correctAnswer: "acyclic" },
    { id: 9, text: "TRA COMMS: A search algorithm for sorted data repeatedly divides the search interval in half. What is this search method called?", correctAnswer: "binary" },
    { id: 10, text: "TRA COMMS: A collection that stores unique elements in no particular order. What is this data structure?", correctAnswer: "set" },
  ],
  level3: [
    { id: 1, text: "I speak without a mouth and hear without ears. I have nobody, but I come alive with wind. What am I?", options: ["Echo", "Shadow", "Fire", "Silence"], correctIndex: 0 },
    { id: 2, text: "Which 4-digit number has digits that add up to 10 and is divisible by 5?", options: ["1004", "4006", "5500", "6700"], correctIndex: 2 },
    { id: 3, text: "Which of these numbers is a prime?", options: ["121", "143", "149", "169"], correctIndex: 2 },
    { id: 4, text: "Next in series: 2, 10, 12, 60, 62, ?", options: ["124", "310", "314", "62"], correctIndex: 1 },
    { id: 5, text: "I am an odd number. Take away one letter and I become even. What number am I?", options: ["Seven", "Eleven", "Five", "Nine"], correctIndex: 0 },
  ],
};

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-green-400"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l-.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

const chars = "アァイィウヴエェオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function AnomalyQuiz(): JSX.Element {
  const [level, setLevel] = useState<number>(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState<string>("");
  const [scoreByLevel, setScoreByLevel] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0 });
  
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'levelComplete' | 'gameComplete'>('intro');
  const [story, setStory] = useState<string>("");

  const finalVideoSrc = "/final-video.mp4";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skullCanvasRef = useRef<HTMLCanvasElement>(null);

  const submitScoreUpdate = async (updateData: { level: number; levelScore: number; totalScore?: number }) => {
    const gameSessionId = localStorage.getItem('gameSessionId');
    const name = localStorage.getItem('userName');
    const password = localStorage.getItem('userPassword');

    if (!gameSessionId || !name || !password) {
      console.error("User data or Game Session ID not found. Cannot update score.");
      return;
    }

    try {
      await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameSessionId, name, password, ...updateData }),
      });
    } catch (error) {
      console.error('Error submitting score update:', error);
    }
  };

  // --- set up questions per level ---
  useEffect(() => {
    if (level === 1) {
        setQuestions(QUESTION_BANK.level1);
        setStory(STORY_TEXT.level1Intro);
    } else if (level === 2) {
        setQuestions(QUESTION_BANK.level2);
        setStory(STORY_TEXT.level2Intro);
    } else if (level === 3) {
        setQuestions(QUESTION_BANK.level3);
        setStory(STORY_TEXT.level3Intro);
    }
    setIndex(0);
    setSelectedOption(null);
    setTextAnswer("");
    setGameState('intro');
  }, [level]);

  // --- MODIFICATION 1: Logic moved here from goNextQuestion ---
  function handleOptionClick(optionIndex: number) {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    
    const currentQ = questions[index];
    const isCorrect = currentQ.correctIndex !== undefined && optionIndex === currentQ.correctIndex;
    const isLastQuestion = index + 1 >= questions.length;

    // Calculate the final score now, don't wait for the state update
    let finalScore = scoreByLevel[level] || 0;
    if (isCorrect) {
      finalScore++;
      setScoreByLevel((s) => ({ ...s, [level]: (s[level] || 0) + 1 }));
    }

    setTimeout(() => {
      if (isLastQuestion) {
        handleLevelComplete(finalScore); // Pass the correct final score
      } else {
        goNextQuestion();
      }
    }, 1200);
  }
  
  // --- MODIFICATION 2: Logic moved here from goNextQuestion ---
  function handleTextSubmit() {
    if (!textAnswer.trim()) return;

    const currentQ = questions[index];
    const isCorrect = currentQ.correctAnswer && textAnswer.trim().toLowerCase() === currentQ.correctAnswer.toLowerCase();
    const isLastQuestion = index + 1 >= questions.length;
    
    let finalScore = scoreByLevel[level] || 0;
    if (isCorrect) {
      finalScore++;
      setScoreByLevel((s) => ({ ...s, [level]: (s[level] || 0) + 1 }));
    }
    
    setTextAnswer("");

    // No timeout needed for text submission
    if (isLastQuestion) {
      handleLevelComplete(finalScore); // Pass the correct final score
    } else {
      goNextQuestion();
    }
  }

  // --- MODIFICATION 3: Removed level completion logic ---
  // This function now only handles moving to the next question.
  function goNextQuestion() {
    const nextIndex = index + 1;
    if (nextIndex < questions.length) {
      setIndex(nextIndex);
      setSelectedOption(null);
      setTextAnswer("");
    }
  }

  // --- MODIFICATION 4: Accepts the correct score as an argument ---
  function handleLevelComplete(currentLevelScore: number) {
    // The line reading from stale state is now gone.
    submitScoreUpdate({ level: level, levelScore: currentLevelScore });
    
    setQuestions([]);
    setSelectedOption(null);

    if (level === 1) {
      setStory(STORY_TEXT.level1Complete);
      setGameState('levelComplete');
    } else if (level === 2) {
      setStory(STORY_TEXT.level2Complete);
      setGameState('levelComplete');
    } else if (level === 3) {
      const allScores = { ...scoreByLevel, [level]: currentLevelScore };
      const totalScore = Object.values(allScores).reduce((sum, current) => sum + current, 0);
      submitScoreUpdate({ level: 3, levelScore: currentLevelScore, totalScore: totalScore });
      setStory(STORY_TEXT.level3Complete);
      setGameState('levelComplete');
    }
  }

  function startNextLevel() {
    if (level < 3) {
        setLevel(level + 1)
    } else {
        setGameState('gameComplete');
    }
  }

  function restartGame() {
    localStorage.clear();
    window.location.href = '/';
  }

  // --- MATRIX BACKGROUND EFFECT ---
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
    let animationId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,255,0,0.35)";
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // --- SKULL ANIMATION EFFECT ---
  useEffect(() => {
    if (gameState !== 'levelComplete') return;
    const canvas = skullCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = 300;
    const height = 360;
    canvas.width = width;
    canvas.height = height;
    const img = new Image();
    img.src = skullImg;
    let animationId: number;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      ctx.clearRect(0, 0, width, height);
      const points: { x: number; y: number }[] = [];
      for (let y = 0; y < height; y += 6) {
        for (let x = 0; x < width; x += 6) {
          const idx = (y * width + x) * 4;
          const r = imageData.data[idx];
          const g = imageData.data[idx + 1];
          const b = imageData.data[idx + 2];
          const a = imageData.data[idx + 3];
          const brightness = (r + g + b) / 3;
          if (a > 100 && brightness > 100) points.push({ x, y });
        }
      }
      let t = 0;
      function animate() {
        ctx.clearRect(0, 0, width, height);
        points.forEach((p, i) => {
          const dx = Math.sin(t / 15 + i) * 1.2;
          const dy = Math.cos(t / 18 + i) * 1.2;
          const size = 1.2 + Math.sin(t / 20 + i) * 0.5;
          ctx.beginPath();
          ctx.arc(p.x + dx, p.y + dy, size, 0, Math.PI * 2);
          if (level === 1) {
            ctx.fillStyle = `rgba(0,255,0,${0.6 + Math.random() * 0.4})`;
            ctx.shadowColor = "lime";
          } else {
            ctx.fillStyle = `rgba(255,0,0,${0.6 + Math.random() * 0.4})`;
            ctx.shadowColor = "red";
          }
          ctx.shadowBlur = 4;
          ctx.fill();
        });
        t++;
        animationId = requestAnimationFrame(animate);
      }
      animate();
    };
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [gameState, level]);

  const renderContent = () => {
    switch (gameState) {
      case 'intro':
        return (
          <div className="text-center py-8">
            <SettingsIcon />
            <h3 className="text-xl font-bold my-4 text-green-400">MISSION BRIEFING: LEVEL {level}</h3>
            <p className="mb-6 whitespace-pre-wrap text-left text-green-300 max-w-2xl mx-auto">{story}</p>
            <button onClick={() => setGameState('playing')} className="px-6 py-2 rounded-lg bg-green-500 text-black font-semibold shadow-md hover:bg-green-400 transition-colors">
              BEGIN CALIBRATION
            </button>
          </div>
        );
      case 'levelComplete':
        return (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4 text-green-400">LEVEL {level} COMPLETE ✅</h3>
            <canvas ref={skullCanvasRef} width={300} height={360} className="mx-auto mb-6" />
            <p className="mb-6 whitespace-pre-line font-semibold">{story}</p>
            <button
              onClick={startNextLevel}
              className="px-6 py-2 rounded-lg bg-green-500 text-black font-semibold shadow-md hover:bg-green-400 transition-colors"
            >
              {level < 3 ? `Start Level ${level + 1}` : "Unlock Final Portal"}
            </button>
          </div>
        );
      case 'gameComplete':
        return (
          <div className="text-center py-8">
            <h1 className="text-2xl font-extrabold mb-4 text-green-400">YOU HAVE SUCCESSFULLY UNLOCKED THE PORTAL 🔓✨</h1>
            <div className="mx-auto max-w-2xl">
              <video src={finalVideoSrc} controls autoPlay className="w-full rounded-lg shadow-lg" />
            </div>
            <div className="mt-6">
              <button onClick={restartGame} className="px-5 py-2 rounded bg-green-500 text-black font-medium">
                Play Again
              </button>
            </div>
          </div>
        );
      case 'playing':
        const currentQuestion = questions[index];
        return currentQuestion ? (
          <div>
            <div className="mb-3 text-sm opacity-80">
              Question {index + 1} of {questions.length}
            </div>
            <div className="p-6 rounded-lg mb-4 border border-green-500/30 bg-black/40">
              <div className="text-lg font-semibold mb-4 text-green-200">{currentQuestion.text}</div>
              
              {(level === 1 || level === 3) && currentQuestion.options && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQuestion.options.map((opt, i) => {
                      const isSelected = selectedOption === i;
                      const isCorrect = i === currentQuestion.correctIndex;
                      const isWrong = isSelected && !isCorrect;
                      let extraClasses = "border-green-500/30 bg-black/20 hover:bg-green-900/40";
                      if (selectedOption !== null) {
                        if (isCorrect) extraClasses = "border-green-400 bg-green-500/30 scale-105";
                        else if (isWrong) extraClasses = "border-red-400 bg-red-500/20 scale-95";
                        else extraClasses = "opacity-50";
                      }
                      return (
                        <button key={i} className={`px-4 py-3 rounded-lg border cursor-pointer text-left font-medium transition-all duration-300 ${extraClasses}`} onClick={() => handleOptionClick(i)} disabled={selectedOption !== null}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-green-800/40 text-sm">{String.fromCharCode(65 + i)}</div>
                            <div>{opt}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
              )}

              {level === 2 && (
                 <div className="flex gap-3 mt-4">
                    <input
                      type="text"
                      value={textAnswer}
                      onChange={(e) => setTextAnswer(e.target.value)}
                      className="flex-1 px-3 py-2 rounded bg-black/40 border border-green-400 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="DECRYPT TRANSMISSION..."
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") handleTextSubmit();
                      }}
                    />
                    <button onClick={handleTextSubmit} className="px-4 py-2 rounded bg-green-500 text-black font-semibold">
                      SUBMIT
                    </button>
                  </div>
              )}

            </div>
            <footer className="flex items-center justify-between text-sm opacity-80">
              <div>Progress: {index + 1}/{questions.length}</div>
              <div>Score: {scoreByLevel[level] || 0}</div>
            </footer>
          </div>
        ) : null;
      default: return null;
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden font-mono">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" />
        <div className="relative w-full max-w-4xl bg-black/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-500/50 z-10">
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-green-400">Anomaly - Puzzle Levels</h2>
                <div className="text-sm">
                    Level: <span className="font-bold text-green-300">{level}</span> | Score: <span className="font-bold text-green-300">{scoreByLevel[level] || 0}</span>
                </div>
            </header>
            {renderContent()}
        </div>
    </div>
  );
}
