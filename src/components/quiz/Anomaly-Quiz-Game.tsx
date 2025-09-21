import React, { useEffect, useState, useRef } from "react";
import skullImg from "./skull.png"; 

type Question = {
  id: number;
  text: string;
  options?: string[]; // Level 1 & 3
  correctIndex?: number; // Level 1 & 3
  correctKeywords?: string[]; // Level 2
};

const chars =
  "アァイィウヴエェオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const QUESTION_BANK: { level1: Question[]; level2: Question[]; level3: Question[] } = {
  // 50 amplitude-based MCQs
  level1: [
    { id: 1, text: "Amplitude is the measure of:", options: ["Frequency of wave", "Maximum displacement from equilibrium", "Wavelength", "Wave speed"], correctIndex: 1 },
    { id: 2, text: "Which unit can represent amplitude for displacement waves?", options: ["Meters (m)", "Hertz (Hz)", "Seconds (s)", "Meters/second (m/s)"], correctIndex: 0 },
    { id: 3, text: "Increasing amplitude of a sound wave will make it sound:", options: ["Lower pitch", "Shorter", "Louder", "Longer"], correctIndex: 2 },
    { id: 4, text: "In a transverse wave, amplitude is measured from:", options: ["One trough to other trough", "Crest to equilibrium", "One crest to next crest", "Two successive troughs"], correctIndex: 1 },
    { id: 5, text: "If amplitude doubles, the energy transported by a wave (approximately) becomes:", options: ["Double", "Quadruple", "Halved", "Unchanged"], correctIndex: 1 },
    { id: 6, text: "Amplitude in simple harmonic motion is determined by:", options: ["Mass only", "Initial displacement/conditions", "Friction only", "Time only"], correctIndex: 1 },
    { id: 7, text: "The amplitude of an electromagnetic wave corresponds to:", options: ["Electric/magnetic field strength", "Particle displacement", "Pressure variation", "Temperature"], correctIndex: 0 },
    { id: 8, text: "A seismic wave with larger amplitude indicates:", options: ["Smaller earthquake", "Stronger earthquake", "Faster quake", "No relation"], correctIndex: 1 },
    { id: 9, text: "Which of these does amplitude NOT affect?", options: ["Loudness of sound", "Energy carried by wave", "Frequency (pitch)", "Signal strength"], correctIndex: 2 },
    { id: 10, text: "Amplitude is half of which measurement in a wave?", options: ["Crest-to-trough distance", "Wavelength", "Wave period", "Frequency"], correctIndex: 0 },
    { id: 11, text: "In a graph of displacement vs time for SHM, amplitude is the:", options: ["Frequency of oscillation", "Maximum y-value (positive or negative)", "Slope at t=0", "Average value"], correctIndex: 1 },
    { id: 12, text: "Which instrument measures amplitude of sound?", options: ["Thermometer", "Ammeter", "Sound level meter (decibel meter)", "Odometer"], correctIndex: 2 },
    { id: 13, text: "If two waves of equal frequency but different amplitudes interfere, the amplitude of the resultant depends on:", options: ["Relative phase", "Absolute phase only", "Wavelength only", "Frequency only"], correctIndex: 0 },
    { id: 14, text: "For a sinusoidal wave y = A sin(ωt), A represents:", options: ["Angular frequency", "Amplitude", "Phase", "Wave number"], correctIndex: 1 },
    { id: 15, text: "In optics, amplitude of light wave relates to:", options: ["Color (wavelength)", "Intensity (brightness)", "Polarization", "Speed"], correctIndex: 1 },
    { id: 16, text: "Doubling amplitude of a sound wave will change perceived loudness approximately by:", options: ["Twice as loud (perception linear)", "About +6 dB (power-related)", "No change", "Lower pitch"], correctIndex: 1 },
    { id: 17, text: "A wave’s amplitude is independent of which property?", options: ["Energy", "Initial displacement", "Frequency (in many cases)", "Medium density always"], correctIndex: 2 },
    { id: 18, text: "Which of these best describes peak amplitude?", options: ["Distance from crest to trough", "Distance from equilibrium to crest", "Time between peaks", "Wavelength"], correctIndex: 1 },
    { id: 19, text: "Amplitude modulation (AM) in radio uses amplitude to encode:", options: ["Frequency information only", "Signal information (audio)", "Time of arrival", "Polarization"], correctIndex: 1 },
    { id: 20, text: "If two identical waves are in phase, the resulting amplitude when they meet is:", options: ["Zero", "Sum of amplitudes (constructive)", "Difference of amplitudes", "Unchanged"], correctIndex: 1 },
    { id: 21, text: "Which physical quantity for transverse waves is analogous to amplitude for longitudinal waves?", options: ["Displacement for transverse, compression for longitudinal", "Wavelength for both", "Frequency only", "Period only"], correctIndex: 0 },
    { id: 22, text: "Amplitude envelope of a wavepacket describes:", options: ["Local amplitude variation (overall shape)", "Frequency only", "Speed only", "Phase only"], correctIndex: 0 },
    { id: 23, text: "In mechanical oscillators, damping causes amplitude to:", options: ["Increase exponentially", "Decrease with time", "Remain constant", "Become infinite"], correctIndex: 1 },
    { id: 24, text: "Which term is typically used to express amplitude of sound in engineering?", options: ["Meters", "Volts", "Decibels (dB)", "Watts"], correctIndex: 2 },
    { id: 25, text: "Amplitude-phase relationship: changing amplitude while keeping phase constant will affect:", options: ["Frequency", "Signal strength/intensity", "Time period", "Wavelength"], correctIndex: 1 },
    { id: 26, text: "In a wave y(x,t)=2 cos(kx - ωt), the amplitude is:", options: ["k", "ω", "2", "kx - ωt"], correctIndex: 2 },
    { id: 27, text: "True or False: Amplitude can be negative in SHM graphs (sign indicates direction).", options: ["True", "False", "Depends", "None"], correctIndex: 0 },
    { id: 28, text: "Which parameter would you change to change amplitude in a vibrating string?", options: ["Tension only", "Initial pluck displacement", "Wavelength only", "Period only"], correctIndex: 1 },
    { id: 29, text: "The amplitude spectrum of a signal shows what?", options: ["Phase vs time", "Amplitude vs frequency", "Wavelength vs amplitude", "Time vs frequency"], correctIndex: 1 },
    { id: 30, text: "Sound amplitude is most directly related to which human perception?", options: ["Pitch", "Loudness", "Timbre", "Duration"], correctIndex: 1 },
    { id: 31, text: "Amplitude and intensity relation (for many waves):", options: ["Intensity ∝ amplitude", "Intensity ∝ amplitude^2", "Intensity ∝ 1/amplitude", "No relation"], correctIndex: 1 },
    { id: 32, text: "Which phenomenon can reduce amplitude over time?", options: ["Resonance", "Damping", "Constructive interference", "Amplification"], correctIndex: 1 },
    { id: 33, text: "In electronics, amplitude of a voltage signal is measured in:", options: ["Ohms", "Volts", "Amperes", "Farads"], correctIndex: 1 },
    { id: 34, text: "If amplitude = 0 for an oscillation, that means:", options: ["Maximum motion", "No oscillation (particle at equilibrium)", "Infinite energy", "Undefined"], correctIndex: 1 },
    { id: 35, text: "Which operation increases amplitude in an amplifier stage?", options: ["Attenuation", "Gain", "Filtering", "Rectifying"], correctIndex: 1 },
    { id: 36, text: "Amplitude in a standing wave is highest at:", options: ["Nodes", "Antinodes", "Midpoint only", "All points equal"], correctIndex: 1 },
    { id: 37, text: "Amplitude is usually represented by which letter in y = A sin(ωt + φ)?", options: ["ω", "A", "φ", "t"], correctIndex: 1 },
    { id: 38, text: "A wave transmitting more energy will likely have:", options: ["Smaller amplitude", "Larger amplitude", "Same amplitude always", "Lower frequency always"], correctIndex: 1 },
    { id: 39, text: "When two waves of equal amplitude are exactly out of phase, they:", options: ["Double in amplitude", "Cancel each other (destructive)", "Form standing wave", "Change frequency"], correctIndex: 1 },
    { id: 40, text: "Which of these signals has amplitude information that changes over time?", options: ["Constant DC", "AM signal", "Pure tone of fixed amplitude", "None"], correctIndex: 1 },
    { id: 41, text: "Amplitude in AC electricity refers to:", options: ["Peak voltage/current", "Average power only", "Resistance", "Frequency"], correctIndex: 0 },
    { id: 42, text: "In medical ultrasounds, amplitude affects:", options: ["Image color only", "Echo strength (brightness)", "Machine cost", "Scan duration"], correctIndex: 1 },
    { id: 43, text: "Amplitude of a pulse can be reduced by:", options: ["Gain", "Attenuation", "Amplification", "Resonance"], correctIndex: 1 },
    { id: 44, text: "True or False: Amplitude determines the pitch of a sound.", options: ["True", "False", "Sometimes", "Depends on medium"], correctIndex: 1 },
    { id: 45, text: "If two sinusoidal signals are added, the resulting amplitude depends on their:", options: ["Relative phase and amplitudes", "Wavelength only", "Frequency only", "Medium only"], correctIndex: 0 },
    { id: 46, text: "Which physical quantity is proportional to amplitude squared in many wave types?", options: ["Wavelength", "Energy or intensity", "Period", "Phase"], correctIndex: 1 },
    { id: 47, text: "Amplitude of a damped oscillator decays typically as:", options: ["Exponential decay", "Linear increase", "Sinusoidal only", "Constant"], correctIndex: 0 },
    { id: 48, text: "For a standing wave on a string, amplitude at a node is:", options: ["Maximum", "Minimum (zero)", "Undefined", "Equal to antinode"], correctIndex: 1 },
    { id: 49, text: "Which of these would you change to increase amplitude of a driven oscillator?", options: ["Drive amplitude (input)", "Time period only", "Wavelength only", "Frequency only"], correctIndex: 0 },
    { id: 50, text: "Amplitude is fundamentally a measure of:", options: ["Temporal frequency", "Spatial phase", "Magnitude of oscillation/displacement", "Temperature"], correctIndex: 2 }
  ],

  // 50 DSA questions (level2) with loose keyword arrays
  level2: [
    { id: 1, text: "Describe push and pop operations in a stack. GIVE YOUR ANSWER", correctKeywords: ["lifo", "push", "pop", "last in first out"] },
    { id: 2, text: "Explain how a queue works and name its main operations. GIVE YOUR ANSWER", correctKeywords: ["fifo", "enqueue", "dequeue", "first in first out"] },
    { id: 3, text: "How do you reverse a singly linked list? GIVE YOUR ANSWER", correctKeywords: ["reverse linked list", "prev next", "iterative reverse", "reverse pointers"] },
    { id: 4, text: "What is inorder traversal of a binary tree? GIVE YOUR ANSWER", correctKeywords: ["left root right", "inorder"] },
    { id: 5, text: "Difference between binary tree and binary search tree. GIVE YOUR ANSWER", correctKeywords: ["bst", "ordered", "binary search tree", "left smaller right larger"] },
    { id: 6, text: "Write the idea behind bubble sort. GIVE YOUR ANSWER", correctKeywords: ["bubble sort", "adjacent swap", "compare and swap"] },
    { id: 7, text: "Average time complexity of quicksort. GIVE YOUR ANSWER", correctKeywords: ["n log n", "nlogn", "n * log n"] },
    { id: 8, text: "Explain binary search. GIVE YOUR ANSWER", correctKeywords: ["binary search", "sorted", "divide and conquer", "mid"] },
    { id: 9, text: "What causes stack overflow? GIVE YOUR ANSWER", correctKeywords: ["infinite recursion", "too deep recursion", "exceed stack"] },
    { id: 10, text: "Difference between queue and deque. GIVE YOUR ANSWER", correctKeywords: ["deque", "double ended", "both ends"] },
    { id: 11, text: "How to detect a cycle in a linked list? GIVE YOUR ANSWER", correctKeywords: ["floyd", "tortoise hare", "cycle detection"] },
    { id: 12, text: "Explain level order traversal of a tree. GIVE YOUR ANSWER", correctKeywords: ["bfs", "level order", "queue"] },
    { id: 13, text: "What is height and depth of a node in a tree? GIVE YOUR ANSWER", correctKeywords: ["height depth", "height of node", "depth of node"] },
    { id: 14, text: "Describe merge sort concept. GIVE YOUR ANSWER", correctKeywords: ["merge sort", "divide and conquer", "merge"] },
    { id: 15, text: "How to insert into a binary search tree? GIVE YOUR ANSWER", correctKeywords: ["bst insert", "compare and go left right", "insert bst"] },
    { id: 16, text: "What is amortized analysis? GIVE YOUR ANSWER", correctKeywords: ["amortized"] },
    { id: 17, text: "Explain difference between array and linked list. GIVE YOUR ANSWER", correctKeywords: ["random access", "dynamic size", "contiguous", "linked list"] },
    { id: 18, text: "What is a priority queue? GIVE YOUR ANSWER", correctKeywords: ["priority queue", "heap", "priority"] },
    { id: 19, text: "Explain two-pointer technique. GIVE YOUR ANSWER", correctKeywords: ["two pointer", "two pointers", "two-pointer"] },
    { id: 20, text: "How does insertion sort work? GIVE YOUR ANSWER", correctKeywords: ["insertion sort", "insert into sorted", "shift elements"] },
    { id: 21, text: "Explain what a balanced tree is. GIVE YOUR ANSWER", correctKeywords: ["balanced tree", "height balanced", "avl", "red black"] },
    { id: 22, text: "Describe how a hash table handles collisions. GIVE YOUR ANSWER", correctKeywords: ["chaining", "open addressing", "collision"] },
    { id: 23, text: "What is the time complexity of searching in a linked list? GIVE YOUR ANSWER", correctKeywords: ["o(n)", "linear", "linear time"] },
    { id: 24, text: "Explain preorder traversal. GIVE YOUR ANSWER", correctKeywords: ["root left right", "preorder"] },
    { id: 25, text: "Describe postorder traversal. GIVE YOUR ANSWER", correctKeywords: ["left right root", "postorder"] },
    { id: 26, text: "How to perform breadth-first search (BFS)? GIVE YOUR ANSWER", correctKeywords: ["bfs", "queue"] },
    { id: 27, text: "How to perform depth-first search (DFS)? GIVE YOUR ANSWER", correctKeywords: ["dfs", "stack", "recursive"] },
    { id: 28, text: "What is quickselect used for? GIVE YOUR ANSWER", correctKeywords: ["kth", "quickselect", "select"] },
    { id: 29, text: "Explain stable vs unstable sorting. GIVE YOUR ANSWER", correctKeywords: ["stable", "unstable", "relative order"] },
    { id: 30, text: "What is tail recursion? GIVE YOUR ANSWER", correctKeywords: ["tail recursion", "last call"] },
    { id: 31, text: "Difference between array-based queue and linked-list queue. GIVE YOUR ANSWER", correctKeywords: ["circular buffer", "array queue", "linked queue"] },
    { id: 32, text: "How to delete a node from a singly linked list if only given that node? GIVE YOUR ANSWER", correctKeywords: ["copy next", "copy data", "delete by copying"] },
    { id: 33, text: "Explain how a min-heap is different from a max-heap. GIVE YOUR ANSWER", correctKeywords: ["min heap", "max heap", "root smallest largest"] },
    { id: 34, text: "What is the best case complexity of bubble sort? GIVE YOUR ANSWER", correctKeywords: ["n", "o(n)", "already sorted"] },
    { id: 35, text: "How to check if a binary tree is a BST? GIVE YOUR ANSWER", correctKeywords: ["inorder sorted", "min max", "bst check"] },
    { id: 36, text: "Describe how to merge two sorted arrays in place. GIVE YOUR ANSWER", correctKeywords: ["merge two sorted", "two pointers"] },
    { id: 37, text: "Explain the concept of hashing. GIVE YOUR ANSWER", correctKeywords: ["hash", "hash function"] },
    { id: 38, text: "What is cycle detection in directed graphs? GIVE YOUR ANSWER", correctKeywords: ["dfs recursion stack", "topological sort", "cycle detection"] },
    { id: 39, text: "How to rotate an array by k positions? GIVE YOUR ANSWER", correctKeywords: ["reverse method", "rotate", "k positions"] },
    { id: 40, text: "Difference between linear search and binary search. GIVE YOUR ANSWER", correctKeywords: ["binary search", "sorted", "o(n) vs o(log n)"] },
    { id: 41, text: "Explain how to implement a queue using two stacks. GIVE YOUR ANSWER", correctKeywords: ["two stacks", "enqueue dequeue", "amortized"] },
    { id: 42, text: "What is the complexity of searching in a balanced BST? GIVE YOUR ANSWER", correctKeywords: ["log n", "o(log n)", "logarithmic"] },
    { id: 43, text: "Explain Rabin-Karp algorithm idea for string search. GIVE YOUR ANSWER", correctKeywords: ["rolling hash", "rabin karp"] },
    { id: 44, text: "How to find lowest common ancestor in BST? GIVE YOUR ANSWER", correctKeywords: ["lca", "compare values", "bst lca"] },
    { id: 45, text: "Describe topological sort. GIVE YOUR ANSWER", correctKeywords: ["topological", "dag", "order"] },
    { id: 46, text: "How to detect palindrome in linked list? GIVE YOUR ANSWER", correctKeywords: ["reverse second half", "stack", "compare halves"] },
    { id: 47, text: "Explain Floyd’s cycle-finding algorithm. GIVE YOUR ANSWER", correctKeywords: ["floyd", "tortoise hare"] },
    { id: 48, text: "What is divide and conquer? GIVE YOUR ANSWER", correctKeywords: ["divide and conquer", "divide conquer combine"] },
    { id: 49, text: "How to implement binary search on floating point with precision? GIVE YOUR ANSWER", correctKeywords: ["epsilon", "precision"] },
    { id: 50, text: "Explain the concept of sentinel nodes in linked lists. GIVE YOUR ANSWER", correctKeywords: ["sentinel", "dummy head", "dummy node"] }
  ],

  // Level 3 unchanged (kept short)
  level3: [
    { id: 1, text: "I speak without a mouth and hear without ears. I have nobody, but I come alive with wind. What am I?", options: ["Echo", "Shadow", "Fire", "Silence"], correctIndex: 0 },
    { id: 2, text: "Which 4-digit number has digits that add up to 10 and is divisible by 5?", options: ["1004", "4006", "5500", "6700"], correctIndex: 2 },
    { id: 3, text: "Which of these numbers is a prime?", options: ["121", "143", "149", "169"], correctIndex: 2 },
    { id: 4, text: "Next in series: 2, 10, 12, 60, 62, ?", options: ["124", "310", "314", "62"], correctIndex: 1 },
    { id: 5, text: "I am an odd number. Take away one letter and I become even. What number am I?", options: ["Seven", "Eleven", "Five", "Nine"], correctIndex: 0 }
  ]
};

// --- helper to pick random questions ---
function getRandomSubset<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

export default function AnomalyQuiz(): JSX.Element {
  const [level, setLevel] = useState<number>(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState<string>("");
  const [scoreByLevel, setScoreByLevel] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0 });
  const [showUnlockScreen, setShowUnlockScreen] = useState<boolean>(false);
  const [unlockMessage, setUnlockMessage] = useState<string>("");
  const [finalUnlocked, setFinalUnlocked] = useState<boolean>(false);

  const finalVideoSrc = "/final-video.mp4";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skullCanvasRef = useRef<HTMLCanvasElement>(null);

  // --- set up questions per level ---
  useEffect(() => {
    if (level === 1) setQuestions(getRandomSubset(QUESTION_BANK.level1, 10));
    else if (level === 2) setQuestions(getRandomSubset(QUESTION_BANK.level2, 10));
    else if (level === 3) setQuestions(QUESTION_BANK.level3);

    setIndex(0);
    setSelectedOption(null);
    setTextAnswer("");
  }, [level]);

  // --- handle answers ---
  function handleOptionClick(optionIndex: number) {
    if (selectedOption !== null) return;

    setSelectedOption(optionIndex);
    const currentQ = questions[index];
    const isCorrect = currentQ.correctIndex !== undefined && optionIndex === currentQ.correctIndex;
    if (isCorrect) setScoreByLevel((s) => ({ ...s, [level]: (s[level] || 0) + 1 }));

    setTimeout(() => goNextQuestion(), 1200);
  }

  function handleTextSubmit() {
    if (!textAnswer.trim()) return;
    const currentQ = questions[index];
    const user = textAnswer.trim().toLowerCase();
    const keywords = currentQ.correctKeywords || [];
    const isCorrect = keywords.some((kw) => user.includes(kw.toLowerCase()));
    if (isCorrect) setScoreByLevel((s) => ({ ...s, [level]: (s[level] || 0) + 1 }));

    setTextAnswer("");
    goNextQuestion();
  }

  function goNextQuestion() {
    const nextIndex = index + 1;
    if (nextIndex < questions.length) {
      setIndex(nextIndex);
      setSelectedOption(null);
      setTextAnswer("");
    } else {
      handleLevelComplete();
    }
  }

  function handleLevelComplete() {
    setQuestions([]);
    setSelectedOption(null);

    if (level === 1) {
      setUnlockMessage("LEVEL 1 COMPLETE ✅\nTHE SKULL AWAKENS...");
      setShowUnlockScreen(true);
    } else if (level === 2) {
      setUnlockMessage("LEVEL 2 COMPLETE ✅\nTHE RED SKULL EMERGES 🔥");
      setShowUnlockScreen(true);
    } else if (level === 3) {
      setUnlockMessage("LEVEL 3 COMPLETE ✅\nTHE FINAL PORTAL IS UNLOCKED!");
      setShowUnlockScreen(true);
    }
  }

  function startNextLevel() {
    setShowUnlockScreen(false);
    setSelectedOption(null);
    if (level === 1) setLevel(2);
    else if (level === 2) setLevel(3);
    else if (level === 3) setFinalUnlocked(true);
  }

  function restartGame() {
    setLevel(1);
    setScoreByLevel({ 1: 0, 2: 0, 3: 0 });
    setFinalUnlocked(false);
    setShowUnlockScreen(false);
  }

  const currentQuestion = questions[index];

  // --- matrix background effect ---
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

  // --- skull effect (green L1, red L2) ---
  useEffect(() => {
    if (!showUnlockScreen || (level !== 1 && level !== 2)) return;

    const canvas = skullCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const img = new Image();
    img.src = skullImg;

    let animationId: number;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      ctx.clearRect(0, 0, width, height);

      const points: { x: number; y: number }[] = [];
      for (let y = 0; y < height; y += 6) {   // bigger step (fewer points)
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

    ctx.shadowBlur = 4; // reduced blur
    ctx.fill();
  });

  t++;
  setTimeout(() => requestAnimationFrame(animate), 33); // ~30fps
}
animate();

    };

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [showUnlockScreen, level]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" />

      <div className="relative w-full max-w-4xl bg-black/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-green-400 z-20">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-green-400">Anomaly — Puzzle Levels</h2>
          <div className="text-sm opacity-80">
            Level: <span className="font-bold text-green-300">{level}</span> | Score:{" "}
            <span className="font-bold text-green-300">{scoreByLevel[level] || 0}</span>
          </div>
        </header>

        {showUnlockScreen && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4 text-green-400">{unlockMessage.split("\n")[0]}</h3>
            {(level === 1 || level === 2) && (
              <canvas ref={skullCanvasRef} width={300} height={360} className="mx-auto mb-6" />
            )}
            <p className="mb-6 whitespace-pre-line">{unlockMessage.split("\n")[1]}</p>
            <button
              onClick={startNextLevel}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold shadow-md"
            >
              {level < 3 ? `Start Level ${level + 1}` : "Unlock Final Portal"}
            </button>
          </div>
        )}

        {finalUnlocked && (
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
        )}

        {!showUnlockScreen && !finalUnlocked && questions.length > 0 && currentQuestion && (
          <div>
            <div className="mb-3 text-sm opacity-80">
              Question {index + 1} of {questions.length}
            </div>

            <div className="p-6 rounded-lg mb-4 border border-green-500/30 bg-black/30">
              <div className="text-lg font-semibold mb-4 text-green-200">{currentQuestion.text}</div>

              {(level === 1 || level === 3) && currentQuestion.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQuestion.options.map((opt, i) => {
                    const isSelected = selectedOption === i;
                    const isCorrect = currentQuestion.correctIndex !== undefined && i === currentQuestion.correctIndex;
                    const baseClass =
                      "px-4 py-3 rounded-lg border cursor-pointer text-left font-medium transition-all duration-300";
                    let extra = "border-green-500/30 bg-green-900/20";
                    if (selectedOption !== null) {
                      if (isCorrect) extra = "border-green-400 bg-green-500/20 scale-105";
                      else if (isSelected && !isCorrect) extra = "border-red-400 bg-red-500/10 scale-95";
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
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-800/40 text-sm">
                            {String.fromCharCode(65 + i)}
                          </div>
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
                    className="flex-1 px-3 py-2 rounded bg-black/40 border border-green-400 text-green-200"
                    placeholder="GIVE YOUR ANSWER"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") handleTextSubmit();
                    }}
                  />
                  <button
                    onClick={handleTextSubmit}
                    className="px-4 py-2 rounded bg-green-500 text-black font-semibold"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>

            <footer className="flex items-center justify-between text-sm opacity-80">
              <div>Level {level} progress: {index + 1}/{questions.length}</div>
              <div>Score (this level): {scoreByLevel[level] || 0}</div>
            </footer>
          </div>
        )}

        {!showUnlockScreen && !finalUnlocked && questions.length === 0 && (
          <div className="text-center py-12">
            <p className="mb-4">No questions loaded for this level.</p>
            <button onClick={() => setLevel(1)} className="px-4 py-2 bg-green-500 text-black rounded">
              Restart from Level 1
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
