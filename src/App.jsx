import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// WebAudio procedural sound helper (no external assets needed)
const playSound = (freq, type = 'sine', duration = 0.08, volume = 0.05) => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = freq;

    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio Context blocked or unsupported
  }
};

const PROJECTS_DATA = [
  {
    id: 1,
    num: '01',
    title: 'Localist',
    category: 'React App',
    shortDesc: 'HyperLocal Discovery Platform bridges the gap between customers and local fashion retailers',
    longDesc: 'A cutting-edge WebGL simulation that renders complex 3D particle maps in real-time. Designed to test WebGL limits on mobile devices while delivering a consistent 60fps interaction pipeline.',
    features: [
      'Local Shop listing',
      'AI model image generation',
      'Inventory management',
      'Increased consumer visibility and online presence'
    ],
    tags: ['React', 'Tailwindcss', 'MongoDB', 'Express.js', 'React Native'],
    boxClass: 'neo-box-pink',
    textClass: 'text-cyber-pink',
    bgMutedClass: 'bg-cyber-pink/20',
    borderMutedClass: 'border-cyber-pink/30',
    hoverBgClass: 'group-hover:bg-cyber-pink/10',
    hoverTextClass: 'group-hover:text-cyber-pink',
    altTextClass: 'text-cyber-blue',
    icon: (
      <svg className="w-12 h-12 text-cyber-pink group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
        <line x1="12" y1="22" x2="12" y2="15.5"></line>
        <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
        <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
      </svg>
    ),
    demoLink: 'http://anshsingh.me/localist-landing-page/',
    sourceLink: 'https://github.com/Anshsing/localist'
  },
  {
    id: 2,
    num: '02',
    title: 'Algorithm Visualiser',
    category: 'DSA App',
    shortDesc: 'Algorithm Visualizer helps developers visualize and understand how different sorting algorithms work.',
    longDesc: 'Visualizes and compares performance of various sorting algorithms with custom array generation, speed control, and step-by-step step visualization mode.',
    features: [
      'Visual comparison of algorithms',
      'Custom array generation',
      'Speed control',
      'support for multiple algorithms'
    ],
    tags: ['Tailwind', 'React', 'DSA'],
    boxClass: 'neo-box-blue',
    textClass: 'text-cyber-blue',
    bgMutedClass: 'bg-cyber-blue/20',
    borderMutedClass: 'border-cyber-blue/30',
    hoverBgClass: 'group-hover:bg-cyber-blue/10',
    hoverTextClass: 'group-hover:text-cyber-blue',
    altTextClass: 'text-cyber-pink',
    icon: (
      <svg className="w-12 h-12 text-cyber-blue group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
      </svg>
    ),
    demoLink: 'http://anshsingh.me/sorting-visualizer/',
    sourceLink: 'https://github.com/Anshsing/sorting-visualizer/'
  },

];

export default function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('hero');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    'NEON CORE V4.2 INITIALIZED...',
    'SYSTEM STATUS: ACTIVE',
    'TYPE /help FOR AVAILABLE COMMANDS.'
  ]);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState('idle'); // idle | submitting | success | error

  // Custom Cursor state
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const logsContainerRef = useRef(null);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Custom cursor movement
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);

    const handleHoverStart = () => {
      if (cursorRef.current) cursorRef.current.classList.add('scale-150', 'bg-white/10', 'border-cyber-pink');
    };
    const handleHoverEnd = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('scale-150', 'bg-white/10', 'border-cyber-pink');
    };

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .neo-box');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
      el.addEventListener('mouseenter', () => {
        if (audioEnabled) playSound(600, 'square', 0.04, 0.02);
      });
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [audioEnabled]);

  // Handle escape key to close project modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        if (audioEnabled) playSound(150, 'sawtooth', 0.08, 0.03);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [audioEnabled]);

  // Auto-scroll terminal logs container internally
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Handle page scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Terminal commands interpreter
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    if (audioEnabled) playSound(350, 'sawtooth', 0.1, 0.04);

    const command = terminalInput.trim().toLowerCase();
    let response = [];

    switch (command) {
      case '/help':
        response = [
          'AVAILABLE SYSTEM PROTOCOLS:',
          '  /about      - SHOW AGENT INFORMATION',
          '  /projects   - REVEAL COMPLETED PORTFOLIOS',
          '  /skills     - LOAD CORE SKILL COMPLIANCE',
          '  /clear      - RESET DATA BUFFER',
          '  /sound      - TOGGLE AUDIO MODE'
        ];
        break;
      case '/about':
        response = [
          'AGENT: Ansh Singh',
          'ROLE: Fullstack Dev',
          'FOCUS: MERN Stack ',
          'LOCATION: MP, IND'
        ];
        break;
      case '/projects':
        response = [
          'COMPLETED PROJECTS IN CONSOLE:',
          '  1. Localist- Hyperlocal cloth discovery',
          '  2. Algorithm Visualizer'
        ];
        break;
      case '/skills':
        response = [
          'SKILLS PROFILE DETECTED:',
          '  [REACT/JS]  ■■■■■■■■■□ 92%',
          '  [DSA]  ■■■■■■■■■■ 98%',
          '  [Express.js]  ■■■■■■■■□□ 80%',
          '  [MONGODB]  ■■■■■■■■■□ 95%'
        ];
        break;
      case '/sound':
        setAudioEnabled(prev => !prev);
        response = [`AUDIO MODE TOGGLED: ${!audioEnabled ? 'ON' : 'OFF'}`];
        break;
      case '/clear':
        setTerminalLogs([]);
        setTerminalInput('');
        return;
      default:
        response = [`ERROR: PROTOCOL "${command}" NOT RECOGNIZED. TYPE /help.`];
    }

    setTerminalLogs(prev => [...prev, `> ${terminalInput}`, ...response]);
    setTerminalInput('');
  };

  const handleNavClick = (sectionId) => {
    setActiveTab(sectionId);
    if (audioEnabled) playSound(800, 'sine', 0.05, 0.03);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMobileMenu(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (audioEnabled) playSound(1000, 'sine', 0.2, 0.05);
    setContactStatus('submitting');

    fetch("https://script.google.com/macros/s/AKfycbzNsEooHcNV-fgrQS9l-gmRyRroLPXMI8S9UuPDEW7Ma98hNy5pyc50CbO4i2bAN-AJ3w/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactForm)
    })
      .then(() => {
        setContactStatus('success');
        setContactForm({ name: '', email: '', message: '' });
        if (audioEnabled) playSound(1200, 'sine', 0.3, 0.05);
        setTimeout(() => setContactStatus('idle'), 5000);
      })
      .catch((err) => {
        setContactStatus('error');
        if (audioEnabled) playSound(150, 'sawtooth', 0.4, 0.05);
        setTimeout(() => setContactStatus('idle'), 5000);
      });
  };

  return (
    <div className="relative min-h-screen bg-cyber-darker text-gray-200 selection:bg-cyber-yellow selection:text-black">
      {/* Neo scanlines backdrop */}
      <div className="scanlines"></div>

      {/* Floating neon grid backdrop elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] z-0">
        <div className="absolute h-[200%] w-[200%] top-[-50%] left-[-50%] bg-[linear-gradient(to_right,#00f0ff_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff_1px,transparent_1px)] bg-[size:40px_40px] transform rotate-12"></div>
      </div>

      {/* Custom Neo-Brutalist Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-none border-2 border-cyber-blue pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-200 hidden md:block"
      />
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-cyber-pink pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />

      {/* Top Banner Ticker */}
      <div className="bg-cyber-yellow text-black py-2 px-4 border-b-3 border-black text-center font-heading font-extrabold uppercase text-xs tracking-wider z-50 relative overflow-hidden">
        <div className="inline-block whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          ⚠️ SECURITY WARNING: HIGHLY INTERACTIVE CYBERNETIC AREA • SYSTEM TIME: {currentTime} • AUDIO STATUS: {audioEnabled ? "ENABLED" : "MUTED"} • ⚠️
        </div>
      </div>

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-cyber-dark border-b-3 border-black p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-cyber-pink text-black font-heading font-extrabold text-2xl px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
            {t('ANSH.SYS')}
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-4 font-heading font-extrabold text-sm uppercase">
          {['hero', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              className={`px-3 py-1.5 border-2 border-black transition-all ${activeTab === section
                ? 'bg-cyber-blue text-black shadow-[2px_2px_0px_#000] -translate-x-0.5 -translate-y-0.5'
                : 'hover:bg-cyber-pink hover:text-black hover:shadow-[2px_2px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5'
                }`}
            >
              {section}
            </button>
          ))}
        </nav>

        {/* Audio Toggle & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setAudioEnabled(!audioEnabled);
              playSound(440, 'sine', 0.1, 0.05);
            }}
            className={`p-2 border-2 border-black font-extrabold text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-y-0.5 ${audioEnabled ? 'bg-cyber-yellow text-black' : 'bg-cyber-dark text-gray-400'
              }`}
          >
            🔊 Sound: {audioEnabled ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 border-2 border-black bg-cyber-pink text-black"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="md:hidden border-b-3 border-black bg-cyber-dark font-heading font-extrabold p-4 flex flex-col gap-2 z-30 relative">
          {['hero', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              className="w-full py-2 text-left px-3 border-2 border-black hover:bg-cyber-pink hover:text-black"
            >
              {section.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Main Core Layout */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col gap-16 relative z-10">

        {/* HERO SECTION */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <span className="bg-cyber-blue text-black font-heading font-extrabold uppercase px-3 py-1 text-xs border-2 border-black shadow-[2px_2px_0px_#000]">
              [ GRID LAYER: STABLE ]
            </span>
            <h1 className="font-heading font-extrabold text-5xl md:text-7xl leading-tight text-white uppercase tracking-tighter">
              CRAFTING <br />
              <span className="bg-cyber-pink text-black px-4 inline-block transform -rotate-1 shadow-[4px_4px_0px_#000] border-3 border-black">
                IMMERSIVE
              </span> <br />
              CYBER ART
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg border-l-4 border-cyber-blue pl-4">
              I am Ansh Singh. A creative front-end engineer crafting high-performance, responsive interfaces packed with neon styling, interactive console commands, and fluid dynamics.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleNavClick('projects')}
                className="neo-btn px-6 py-3 font-heading font-black"
              >
                {t('Access Projects')}
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="neo-btn bg-cyber-blue hover:bg-cyber-blue/80 px-6 py-3 font-heading font-black"
              >
                {t('Establish Link')}
              </button>
              <a
                href="resume.pdf"
                download="resume.pdf"
                className="neo-btn bg-cyber-yellow hover:bg-cyber-yellow/80 px-6 py-3 font-heading font-black flex items-center gap-2"
              >
                {t('Download Resume')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Interactive Cyber Console Widget inside Hero */}
          <div className="lg:col-span-5">
            <div className="neo-box neo-box-pink p-4 flex flex-col gap-3 font-mono">
              <div className="flex justify-between items-center border-b-2 border-black pb-2 bg-black/40 px-2 py-1">
                <span className="text-cyber-pink font-extrabold text-xs">CYBER_CONSOLE.EXE</span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyber-pink"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-cyber-blue"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-cyber-yellow"></span>
                </div>
              </div>
              <div
                ref={logsContainerRef}
                className="h-48 overflow-y-auto bg-black/85 p-3 border-2 border-black rounded text-xs leading-relaxed flex flex-col gap-1.5 scrollbar-thin scrollbar-thumb-cyber-pink scrollbar-track-black"
              >
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className={log.startsWith('>') ? 'text-cyber-blue' : log.startsWith('ERROR') ? 'text-cyber-pink' : 'text-green-400'}>
                    {log}
                  </div>
                ))}
              </div>
              <form onSubmit={handleTerminalSubmit} className="flex gap-2">
                <span className="text-cyber-blue font-extrabold self-center">&gt;</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type a command (e.g. /help, /about)..."
                  className="flex-1 bg-black/70 border-2 border-black rounded px-3 py-1.5 text-xs text-cyber-blue font-mono outline-none focus:border-cyber-pink"
                />
                <button
                  type="submit"
                  className="bg-cyber-blue text-black border-2 border-black font-extrabold px-3 text-xs uppercase hover:bg-cyber-blue/80"
                >
                  Run
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t-3 border-black">
          <div className="lg:col-span-5 flex justify-center">
            {/* Custom Neo-Brutalist Avatar/Visual Block */}
            <div className="relative group">
              <div className="absolute inset-0 bg-cyber-blue border-3 border-black shadow-[4px_4px_0px_#000] transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <div className="relative neo-box neo-box-pink p-3 bg-cyber-dark overflow-hidden z-10 w-72 h-80 flex flex-col justify-between">
                <div className="bg-black/90 p-4 border-2 border-black flex-1 flex items-center justify-center relative overflow-hidden">
                  {/* Decorative neon graphics */}
                  <svg className="w-40 h-40 animate-[spin_60s_linear_infinite] opacity-35" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" stroke="#ff007f" strokeWidth="2" fill="none" strokeDasharray="6 4" />
                    <rect x="25" y="25" width="50" height="50" stroke="#00f0ff" strokeWidth="2" fill="none" strokeDasharray="10 5" />
                    <polygon points="50,10 90,80 10,80" stroke="#ffee00" strokeWidth="2" fill="none" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="font-heading font-black text-2xl text-white tracking-widest block group-hover:animate-pulse">
                      Ansh Singh
                    </span>
                    <span className="font-mono text-[10px] text-cyber-blue tracking-wider block mt-1">
                      [ CREATIVE ENGINE ]
                    </span>
                  </div>
                </div>
                <div className="border-t-2 border-black pt-3 flex justify-between items-center mt-3 font-mono text-[10px] text-gray-400">
                  <span>SEC_LEVEL: ALPHA</span>
                  <span className="text-cyber-yellow">ONLINE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-cyber-pink font-heading font-extrabold text-sm uppercase tracking-wider block">
              // 01. INTEL DIRECTIVE
            </span>
            <h2 className="font-heading font-black text-4xl text-white uppercase">
              ABOUT THE ENGINEER
            </h2>
            <div className="neo-box neo-box-blue p-6 flex flex-col gap-4">
              <h3 className="font-heading font-extrabold text-xl text-cyber-blue">
                Blending procedural systems with raw retro aesthetics.
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                I develop interactive spaces that live at the intersection of coding architecture and cyberpunk aesthetics. Over five years of professional workspace engagement, I have delivered premium interfaces to ambitious startups and creative development studios.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm">
                My execution patterns emphasize solid front-end foundations (highly responsive layout blocks, semantic layouts) paired with high-impact micro-animations, neon board grids, custom CSS spring movements, and procedural audio synthesis.
              </p>
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE SECTION */}
        <section id="experience" className="flex flex-col gap-8 pt-8 border-t-3 border-black">
          <div className="flex flex-col gap-3">
            <span className="text-cyber-pink font-heading font-extrabold text-sm uppercase tracking-wider block">
              // 02. RECORDED TIMELINE
            </span>
            <h2 className="font-heading font-black text-4xl text-white uppercase">
              WORK EXPERIENCE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Exp Card 1 */}
            <div className="neo-box neo-box-purple p-6 flex flex-col gap-4 relative overflow-hidden group">
              <span className="absolute top-2 right-2 bg-cyber-pink text-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase border border-black">
                ACTIVE
              </span>
              <span className="font-mono text-xs text-cyber-pink font-extrabold">June, 2026 - July, 2026</span>
              <h3 className="font-heading font-extrabold text-xl text-white group-hover:text-cyber-pink transition-colors">
                Frontend Developer Intern
              </h3>
              <span className="text-cyber-blue font-mono font-bold text-xs">Flutter Flirt</span>
              <p className="text-gray-400 text-xs leading-relaxed border-t-2 border-black/40 pt-3">
                Lead frontend engineering on React websites. Built interactive UI core layers and landing pages for Flutter Flirt’s new SaaS product launch.
              </p>
            </div>

            {/* Exp Card 2 
            <div className="neo-box neo-box-blue p-6 flex flex-col gap-4 relative overflow-hidden group">
              <span className="font-mono text-xs text-cyber-blue font-extrabold">2022 - 2024</span>
              <h3 className="font-heading font-extrabold text-xl text-white group-hover:text-cyber-blue transition-colors">
                Interactive Developer
              </h3>
              <span className="text-cyber-purple font-mono font-bold text-xs">Vapor Labs Inc.</span>
              <p className="text-gray-400 text-xs leading-relaxed border-t-2 border-black/40 pt-3">
                Designed and built SaaS dashboard analytics interfaces with high-performance CSS grids. Engineered complex user flows, layout transitions, and fluid animations.
              </p>
            </div>

            {/* Exp Card 3 *
            <div className="neo-box neo-box-yellow p-6 flex flex-col gap-4 relative overflow-hidden group">
              <span className="font-mono text-xs text-cyber-yellow font-extrabold">2020 - 2022</span>
              <h3 className="font-heading font-extrabold text-xl text-white group-hover:text-cyber-yellow transition-colors">
                UI Designer & Developer
              </h3>
              <span className="text-cyber-pink font-mono font-bold text-xs">Pixel & Byte Agency</span>
              <p className="text-gray-400 text-xs leading-relaxed border-t-2 border-black/40 pt-3">
                Constructed high-fidelity mockups in Figma and generated optimized production templates. Managed responsive style sheets and created interactive vector animations.
              </p>
            </div>
            */}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="flex flex-col gap-8 pt-8 border-t-3 border-black">
          <div className="flex flex-col gap-3">
            <span className="text-cyber-pink font-heading font-extrabold text-sm uppercase tracking-wider block">
              // 03. COMPLETED PORTFOLIOS
            </span>
            <h2 className="font-heading font-black text-4xl text-white uppercase">
              FEATURED PROJECTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS_DATA.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  if (audioEnabled) playSound(700, 'square', 0.1, 0.04);
                }}
                className={`neo-box ${project.boxClass} p-5 flex flex-col gap-4 group cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-heading font-extrabold text-3xl text-white/20 ${project.hoverTextClass} transition-colors`}>
                    {project.num}
                  </span>
                  <span className={`${project.bgMutedClass} ${project.textClass} border ${project.borderMutedClass} font-mono text-[9px] uppercase px-2 py-0.5`}>
                    {project.category}
                  </span>
                </div>
                <div className={`h-40 bg-black/60 border-2 border-black flex items-center justify-center ${project.hoverBgClass} transition-colors`}>
                  {project.icon}
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-white group-hover:underline">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                    {project.shortDesc}
                  </p>
                </div>
                <div className={`flex flex-wrap gap-2 mt-auto font-mono text-[10px] ${project.altTextClass}`}>
                  {project.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNICAL SKILLS SECTION */}
        <section id="skills" className="flex flex-col gap-8 pt-8 border-t-3 border-black">
          <div className="flex flex-col gap-3">
            <span className="text-cyber-pink font-heading font-extrabold text-sm uppercase tracking-wider block">
              // 04. CYBER INTELLIGENCE
            </span>
            <h2 className="font-heading font-black text-4xl text-white uppercase">
              TECHNICAL SKILLS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tech Box 1 */}
            <div className="neo-box neo-box-blue p-6 flex flex-col gap-6">
              <h3 className="font-heading font-extrabold text-xl text-cyber-blue uppercase">
                Frontend Tech
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { name: 'HTML5 / CSS3 / Tailwind CSS v4', val: 98 },
                  { name: 'React / JavaScript (ES6+)', val: 92 },
                  { name: 'shadcn/ui', val: 88 }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span>{item.name}</span>
                      <span className="text-cyber-blue">{item.val}%</span>
                    </div>
                    <div className="h-3 bg-black border-2 border-black rounded-none overflow-hidden">
                      <div className="h-full bg-cyber-blue" style={{ width: `${item.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Box 2 */}
            <div className="neo-box neo-box-pink p-6 flex flex-col gap-6">
              <h3 className="font-heading font-extrabold text-xl text-cyber-pink uppercase">
                Backend Integration
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { name: 'Node.js', val: 90 },
                  { name: 'Express.js', val: 95 },
                  { name: 'MongoDB', val: 96 }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span>{item.name}</span>
                      <span className="text-cyber-pink">{item.val}%</span>
                    </div>
                    <div className="h-3 bg-black border-2 border-black rounded-none overflow-hidden">
                      <div className="h-full bg-cyber-pink" style={{ width: `${item.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Tech Box 3*/}
            <div className="neo-box neo-box-pink p-6 flex flex-col gap-6">
              <h3 className="font-heading font-extrabold text-xl text-cyber-pink uppercase">
                Tools & Platforms
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { name: 'Git & GitHub', val: 90 },
                  { name: 'VS Code', val: 95 },
                  { name: 'Figma', val: 96 },
                  { name: 'Postman', val: 96 }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span>{item.name}</span>
                      <span className="text-cyber-pink">{item.val}%</span>
                    </div>
                    <div className="h-3 bg-black border-2 border-black rounded-none overflow-hidden">
                      <div className="h-full bg-cyber-pink" style={{ width: `${item.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Tech Box */}
            <div className="neo-box neo-box-blue p-6 flex flex-col gap-6">
              <h3 className="font-heading font-extrabold text-xl text-cyber-blue uppercase">
                Core Concepts
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { name: 'OOPs', val: 90 },
                  { name: 'Data Structures', val: 95 },
                  { name: 'Algorithms', val: 96 },
                  { name: 'REST APIs', val: 96 }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span>{item.name}</span>
                      <span className="text-cyber-blue">{item.val}%</span>
                    </div>
                    <div className="h-3 bg-black border-2 border-black rounded-none overflow-hidden">
                      <div className="h-full bg-cyber-blue" style={{ width: `${item.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t-3 border-black">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-cyber-pink font-heading font-extrabold text-sm uppercase tracking-wider block">
              // 05. CORE ENVELOPE
            </span>
            <h2 className="font-heading font-black text-4xl text-white uppercase">
              ESTABLISH CONNECT
            </h2>
            <div className="neo-box neo-box-yellow p-6 flex flex-col gap-4">
              <h3 className="font-heading font-extrabold text-xl text-cyber-yellow">
                Transmit your project specs.
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Have a premium application design proposal, active software contract opening, or just want to swap development logs? Deploy details using the communication matrix.
              </p>
              <div className="flex flex-col gap-3 font-mono text-xs text-gray-400 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-cyber-blue">✉</span>
                  <span>13anshsingh@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyber-pink">📍</span>
                  <span>Grid Location: MP, IN</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="neo-box neo-box-pink p-6">
              <form
                onSubmit={handleContactSubmit}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-extrabold text-xs uppercase text-cyber-blue">Identity Node Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    disabled={contactStatus === 'submitting'}
                    className="bg-black/80 border-2 border-black rounded px-4 py-2 text-sm text-cyber-blue outline-none focus:border-cyber-pink disabled:opacity-50"
                    placeholder="E.g., Agent Carter"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-extrabold text-xs uppercase text-cyber-pink">Communication Routing E-Mail</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    disabled={contactStatus === 'submitting'}
                    className="bg-black/80 border-2 border-black rounded px-4 py-2 text-sm text-cyber-pink outline-none focus:border-cyber-blue disabled:opacity-50"
                    placeholder="E.g., carter@shield.net"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-heading font-extrabold text-xs uppercase text-cyber-yellow">Transmission Packet Payload</label>
                  <textarea
                    rows="4"
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    disabled={contactStatus === 'submitting'}
                    className="bg-black/80 border-2 border-black rounded px-4 py-2 text-sm text-cyber-yellow outline-none focus:border-cyber-pink resize-none disabled:opacity-50"
                    placeholder="E.g., Initiating secure development dialogue..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={contactStatus === 'submitting'}
                  className="neo-btn py-3 font-heading font-black text-sm disabled:opacity-50 cursor-pointer flex justify-center items-center gap-2"
                >
                  {contactStatus === 'submitting' && 'Transmitting Data... 📡'}
                  {contactStatus === 'success' && 'Packet Dispatched! ✅'}
                  {contactStatus === 'error' && 'Link Failed! ❌'}
                  {contactStatus === 'idle' && 'Send Transmission 📡'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-16 bg-cyber-dark border-t-3 border-black py-8 px-4 text-center z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[10px] text-gray-500">
            &copy; 2026 ANSH.SYS CORE INC. CRAFTED FOR RAW PERFORMANCE.
          </span>
          <div className="flex gap-4 font-heading font-black text-xs uppercase">
            <a href="https://github.com/Anshsing" className="hover:text-cyber-pink transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/anshsingh13" className="hover:text-cyber-yellow transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Selected Project Details Modal Popup */}
      {
        selectedProject && (
          <div
            className="fixed inset-0 bg-black/85 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in animate-[fadeIn_0.15s_ease-out]"
            onClick={() => {
              setSelectedProject(null);
              if (audioEnabled) playSound(150, 'sawtooth', 0.08, 0.03);
            }}
          >
            <div
              className={`neo-box ${selectedProject.boxClass} w-full max-w-2xl bg-cyber-dark p-6 relative flex flex-col gap-5 max-h-[90vh] overflow-y-auto animate-scale-in`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Banner inside popup */}
              <div className="flex justify-between items-center border-b-2 border-black pb-3 bg-black/40 px-3 py-1.5 -mx-6 -mt-6">
                <span className="text-cyber-blue font-extrabold text-xs uppercase tracking-wider">
                  PROJECT_STATUS: INITIALIZED // 0{selectedProject.id}
                </span>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    if (audioEnabled) playSound(150, 'sawtooth', 0.08, 0.03);
                  }}
                  className="text-cyber-pink hover:text-white font-mono font-bold text-lg border-2 border-black bg-black px-2.5 py-0.5 hover:bg-cyber-pink hover:text-black transition-colors cursor-pointer"
                >
                  X
                </button>
              </div>

              {/* Main Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-2">
                <div className="md:col-span-4 flex flex-col gap-4">
                  <div className="aspect-square bg-black/70 border-3 border-black flex items-center justify-center p-6 shadow-[2px_2px_0px_#000]">
                    {selectedProject.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-heading font-extrabold text-xs uppercase text-cyber-blue">[ Tech Specs ]</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] bg-black/60 border border-black px-2 py-0.5 text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8 flex flex-col gap-4">
                  <div>
                    <span className={`${selectedProject.bgMutedClass} ${selectedProject.textClass} border ${selectedProject.borderMutedClass} font-mono text-[9px] font-bold px-2 py-0.5 uppercase`}>
                      {selectedProject.category}
                    </span>
                    <h3 className="font-heading font-black text-3xl text-white mt-1.5 uppercase">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed border-l-3 border-cyber-pink pl-3 bg-black/20 py-2 pr-2">
                    {selectedProject.longDesc}
                  </p>

                  <div className="flex flex-col gap-2">
                    <span className="font-heading font-extrabold text-xs uppercase text-cyber-yellow">[ Key Protocols ]</span>
                    <ul className="list-none flex flex-col gap-1.5 text-xs text-gray-400 font-mono">
                      {selectedProject.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyber-pink font-bold">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 border-t-2 border-black/40 pt-4 mt-2">
                <a
                  href={selectedProject.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { if (audioEnabled) playSound(900, 'sine', 0.1, 0.03); }}
                  className="neo-btn bg-cyber-blue hover:bg-cyber-blue/80 px-5 py-2.5 text-xs font-heading font-extrabold flex-1 text-center decoration-none"
                >
                  Initialize Sandbox Live ⚡
                </a>
                <a
                  href={selectedProject.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { if (audioEnabled) playSound(900, 'sine', 0.1, 0.03); }}
                  className="neo-btn bg-cyber-yellow hover:bg-cyber-yellow/80 px-5 py-2.5 text-xs font-heading font-extrabold flex-1 text-center decoration-none"
                >
                  Access Matrix Code 💻
                </a>
              </div>
            </div>
          </div>
        )
      }

      {/* Scroll to Top Button */}
      {
        showScrollTop && (
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              if (audioEnabled) playSound(900, 'sine', 0.1, 0.04);
            }}
            className="fixed bottom-6 right-6 z-50 bg-cyber-yellow text-black border-2 border-black p-3 font-bold shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] transition-all cursor-pointer animate-fade-in"
            aria-label="Scroll to Top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        )
      }
    </div >
  );
}
