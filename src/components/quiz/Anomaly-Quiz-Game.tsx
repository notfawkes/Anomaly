/*
Anomaly-Quiz-Game.tsx
Updated with background that matches the terminal environment
*/

import { useEffect, useState } from "react";

type Question = {
  id: number;
  text: string;
  options: string[];
  correctIndex: number; // index into options
};

const QUESTION_BANK: { level1: Question[]; level2: Question[]; level3: Question[] } = {
  level1: [
    { id: 1, text: "What is 5 + 7?", options: ["10", "11", "12", "13"], correctIndex: 2 },
    { id: 2, text: "Which is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Venus"], correctIndex: 2 },
    { id: 3, text: "What color do you get when you mix red and white?", options: ["Pink", "Purple", "Orange", "Brown"], correctIndex: 0 },
    { id: 4, text: "If you have 3 apples and you double them, how many apples now?", options: ["5", "6", "7", "8"], correctIndex: 1 },
    { id: 5, text: "Which shape has 3 sides?", options: ["Square", "Triangle", "Circle", "Rectangle"], correctIndex: 1 },
    { id: 6, text: "Which of the following is a prime number?", options: ["9", "12", "13", "15"], correctIndex: 2 },
    { id: 7, text: "Which direction is opposite of East?", options: ["North", "South", "West", "Up"], correctIndex: 2 },
    { id: 8, text: "How many hours are there in two days?", options: ["24", "36", "48", "72"], correctIndex: 2 },
    { id: 9, text: "Which animal is known as 'King of the jungle'?", options: ["Elephant", "Lion", "Tiger", "Bear"], correctIndex: 1 },
    { id: 10, text: "What is the capital of France?", options: ["Madrid", "Berlin", "Paris", "Rome"], correctIndex: 2 },
  ],
  level2: [
    { id: 1, text: "If 3x = 12, what is x?", options: ["2", "3", "4", "6"], correctIndex: 2 },
    { id: 2, text: "A clock shows 3:15. What angle is between hour and minute hand?", options: ["0°", "7.5°", "15°", "90°"], correctIndex: 1 },
    { id: 3, text: "Which word is an anagram of 'listen'?", options: ["silent", "enlist", "inlets", "all of the above"], correctIndex: 3 },
    { id: 4, text: "Which number is both a perfect square and a perfect cube?", options: ["64", "36", "16", "8"], correctIndex: 0 },
    { id: 5, text: "If you take the next letter after Z, which letter follows in a circular alphabet?", options: ["A", "Z", "B", "None"], correctIndex: 0 },
    { id: 6, text: "What is the binary for decimal 5?", options: ["101", "010", "011", "100"], correctIndex: 0 },
    { id: 7, text: "Solve: 15 ÷ 3 × 2 = ?", options: ["10", "5", "20", "30"], correctIndex: 0 },
    { id: 8, text: "Which shape has 4 equal sides and 4 right angles?", options: ["Rhombus", "Rectangle", "Square", "Parallelogram"], correctIndex: 2 },
    { id: 9, text: "What comes next in the Fibonacci sequence: 1,1,2,3,5,8,?", options: ["13", "12", "11", "10"], correctIndex: 0 },
    { id: 10, text: "Which element has chemical symbol 'O'?", options: ["Gold", "Oxygen", "Iron", "Hydrogen"], correctIndex: 1 },
  ],
  level3: [
    { id: 1, text: "I speak without a mouth and hear without ears. I have nobody, but I come alive with wind. What am I?", options: ["Echo", "Shadow", "Fire", "Silence"], correctIndex: 0 },
    { id: 2, text: "Which 4-digit number has digits that add up to 10 and is divisible by 5?", options: ["1004", "4006", "5500", "6700"], correctIndex: 2 },
    { id: 3, text: "Which of these numbers is a prime?", options: ["121", "143", "149", "169"], correctIndex: 2 },
    { id: 4, text: "Next in series: 2, 10, 12, 60, 62, ?", options: ["124", "310", "314", "62"], correctIndex: 1 },
    { id: 5, text: "I am an odd number. Take away one letter and I become even. What number am I?", options: ["Seven", "Eleven", "Five", "Nine"], correctIndex: 0 },
  ],
};

export default function AnomalyQuiz(): JSX.Element {
  const [level, setLevel] = useState<number>(1);
  const [questions, setQuestions] = useState<Question[]>(QUESTION_BANK.level1);
  const [index, setIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [scoreByLevel, setScoreByLevel] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0 });
  const [showUnlockScreen, setShowUnlockScreen] = useState<boolean>(false);
  const [unlockMessage, setUnlockMessage] = useState<string>("");
  const [finalUnlocked, setFinalUnlocked] = useState<boolean>(false);

  const finalVideoSrc = "/final-video.mp4"; // Replace with your own video file in public/

  useEffect(() => {
    if (level === 1) setQuestions(QUESTION_BANK.level1);
    else if (level === 2) setQuestions(QUESTION_BANK.level2);
    else if (level === 3) setQuestions(QUESTION_BANK.level3);

    setIndex(0);
    setSelectedOption(null);
  }, [level]);

  function handleOptionClick(optionIndex: number) {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);

    const currentQ = questions[index];
    const isCorrect = optionIndex === currentQ.correctIndex;
    if (isCorrect) {
      setScoreByLevel((s) => ({ ...s, [level]: (s[level] || 0) + 1 }));
    }

    setTimeout(() => {
      const nextIndex = index + 1;
      if (nextIndex < questions.length) {
        setIndex(nextIndex);
        setSelectedOption(null);
      } else {
        handleLevelComplete();
      }
    }, 650);
  }

  function handleLevelComplete() {
    setQuestions([]);
    setSelectedOption(null);

    if (level === 1) {
      setUnlockMessage("Level 2 Unlocked Successfully\nNow the puzzles are going to be more interesting");
      setShowUnlockScreen(true);
    } else if (level === 2) {
      setUnlockMessage("Level 3 Unlocked Successfully\nNow the puzzles are going to be more interesting");
      setShowUnlockScreen(true);
    } else if (level === 3) {
      setFinalUnlocked(true);
    }
  }

  function startNextLevel() {
    setShowUnlockScreen(false);
    setSelectedOption(null);
    if (level === 1) setLevel(2);
    else if (level === 2) setLevel(3);
  }

  function restartGame() {
    setLevel(1);
    setScoreByLevel({ 1: 0, 2: 0, 3: 0 });
    setFinalUnlocked(false);
    setShowUnlockScreen(false);
  }

  const currentQuestion = questions[index];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-[#0a0a1a] to-black text-white">
      <div className="w-full max-w-3xl bg-black/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/10">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Anomaly — Puzzle Levels</h2>
          <div className="text-sm opacity-80">
            Level: <span className="font-bold">{level}</span> &nbsp;|&nbsp; Score: <span className="font-bold">{scoreByLevel[level] || 0}</span>
          </div>
        </header>

        {showUnlockScreen && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold mb-4">{unlockMessage.split("\n")[0]}</h3>
            <p className="mb-6 whitespace-pre-line">{unlockMessage.split("\n")[1]}</p>
            <button
              onClick={startNextLevel}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold shadow-md"
            >
              Start Level {level + 1}
            </button>
          </div>
        )}

        {finalUnlocked && (
          <div className="text-center py-8">
            <h1 className="text-2xl font-extrabold mb-4">You have successfully Unlocked the portal! 🔓✨</h1>
            <p className="mb-6">Enjoy the final reveal. (Replace the video file in public folder at {finalVideoSrc})</p>
            <div className="mx-auto max-w-2xl">
              <video src={finalVideoSrc} controls autoPlay className="w-full rounded-lg shadow-lg" />
            </div>
            <div className="mt-6">
              <button onClick={restartGame} className="px-5 py-2 rounded bg-white text-black font-medium">
                Play Again
              </button>
            </div>
          </div>
        )}

        {!showUnlockScreen && !finalUnlocked && questions.length > 0 && currentQuestion && (
          <div>
            <div className="mb-3 text-sm opacity-80">
              Question {index + 1} of {questions.length}
            </div>

            <div className="p-5 bg-white/5 rounded-lg mb-4">
              <div className="text-lg font-semibold mb-3">{currentQuestion.text}</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map((opt, i) => {
                  const isSelected = selectedOption === i;
                  const isCorrect = selectedOption !== null && i === currentQuestion.correctIndex;
                  const baseClass = "px-4 py-3 rounded-lg border cursor-pointer text-left font-medium";
                  let extra = "border-white/20 bg-white/3";

                  if (selectedOption !== null) {
                    if (isCorrect) extra = "border-green-400 bg-green-500/20";
                    else if (isSelected) extra = "border-red-400 bg-red-500/10";
                    else extra = "opacity-70";
                  } else {
                    extra = "hover:scale-[1.01] transition-transform";
                  }

                  return (
                    <button
                      key={i}
                      className={`${baseClass} ${extra}`}
                      onClick={() => handleOptionClick(i)}
                      disabled={selectedOption !== null}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/8 text-sm">
                          {String.fromCharCode(65 + i)}
                        </div>
                        <div>{opt}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <footer className="flex items-center justify-between text-sm opacity-80">
              <div>
                Level {level} progress: {index + 1}/{questions.length}
              </div>
              <div>Score (this level): {scoreByLevel[level] || 0}</div>
            </footer>
          </div>
        )}

        {!showUnlockScreen && !finalUnlocked && questions.length === 0 && (
          <div className="text-center py-12">
            <p className="mb-4">No questions loaded for this level.</p>
            <button onClick={() => setLevel(1)} className="px-4 py-2 bg-white text-black rounded">
              Restart from Level 1
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
