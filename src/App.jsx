import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

export function App() {
  const [isLoading, setIsLoading] = useState(() => {
    const hasShown = window.name === 'hacker_intro_shown';
    if (hasShown) return false;
    window.name = 'hacker_intro_shown';
    return true;
  });

  const [codeLines, setCodeLines] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const dummySnippets = [
      '// Loading stylesheet dependencies...',
      '// Compiling JSX modules successfully...',
      'import { React, Vite, Component } from "@core";',
      'npm run build --optimize=true',
      'Executing main thread sequence...',
      'const portfolio = new Developer("Sara");',
      'Rendering UI components... done',
      'git commit -m "Initial commit - v1.0.0"',
      'Connecting to secure mainframe... OK',
      'Decrypting user profile data...',
      'Bypassing firewall security layer...',
      'Access granted to root directory...',
      'Initializing system architecture...',
      'Allocating memory buffer pools...',
      'Verifying digital cryptographic signatures...',
      'Parsing virtual DOM nodes...',
      'Injecting CSS variables & themes...',
      'Establishing WebSocket connection [200 OK]'
    ];

    const interval = setInterval(() => {
      const randomSnippet =
        dummySnippets[Math.floor(Math.random() * dummySnippets.length)];
      setCodeLines(prev => [...prev.slice(-85), randomSnippet]);
    }, 35);

    // ضبط حساب شريط التحميل ليتطابق تماماً مع الوقت (يزيد بدقة ليصل 100% عند زمن الثواني اللازم )
    const totalDuration = 2800;
    const stepTime = 30; 
    const increment = 100 / (totalDuration / stepTime);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const nextVal = prev + increment;
        if (nextVal >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return nextVal;
      });
    }, stepTime);

    const timer = setTimeout(() => {
      setIsLoading(false);
      clearInterval(interval);
      clearInterval(progressInterval);
    }, totalDuration);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#12121a',
        width: '100%',
        minHeight: '100vh',
        overflowX: 'hidden'
      }}
    >
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#0c0c10',
            color: '#4ade80',
            fontFamily: 'monospace',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 50px',
            zIndex: 9999,
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}
        >
          {/* الجانب الأيسر (العبارات الثلاثة + شريط التحميل تحتها مباشرة) */}
          <div
            style={{
              maxWidth: '450px',
              width: '100%',
              fontSize: '15px',
              lineHeight: '1.8',
              zIndex: 2
            }}
          >
            <p style={{ color: '#8b949e', margin: '0 0 10px 0' }}>
              // initializing developer portfolio environment...
            </p>

            <p style={{ color: '#38bdf8', margin: '0 0 10px 0' }}>
              &gt; loading modules [React, Vite, ViewModel]...
            </p>

            <p style={{ color: '#a855f7', margin: '0 0 15px 0' }}>
              &gt; compiling components [Navbar, Hero, Projects, Contact]...
            </p>

            {/* سطر الحالة والنسبة المئوية */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px'
              }}
            >
              <p style={{ color: '#4ade80', fontWeight: 'bold', margin: 0 }}>
                &gt; Status: Success [exit code 0] ({Math.round(progress)}%)
              </p>

              <img
                src="https://img.icons8.com/pastel-glyph/64/12B886/shutdown--v4.png"
                alt="shutdown"
                style={{
                  width: '18px',
                  height: '18px',
                  display: 'inline-block',
                  verticalAlign: 'middle'
                }}
              />
            </div>

            {/* شريط التحميل (Progress Bar) */}
            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: 'rgba(74, 222, 128, 0.15)',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid rgba(74, 222, 128, 0.3)'
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: '#4ade80',
                  boxShadow: '0 0 10px #4ade80',
                  transition: 'width 0.03s linear'
                }}
              />
            </div>
          </div>

          {/* الجانب الأيمن - أكواد الافتراضية */}
          <div
            style={{
              position: 'absolute',
              right: '30px',
              top: '0px',
              bottom: '0px',
              width: '52%',
              height: '100vh',
              opacity: '0.9',
              fontSize: '11.5px',
              color: '#4ade80',
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: '2px',
              overflow: 'hidden',
              textAlign: 'left',
              borderLeft: '1px dashed rgba(74, 222, 128, 0.2)',
              paddingLeft: '30px'
            }}
          >
            {codeLines.map((line, index) => (
              <span
                key={index}
                style={{
                  whiteSpace: 'nowrap',
                  textShadow: '0 0 5px rgba(74,222,128,0.5)'
                }}
              >
                {`$ ${line}`}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* الخلفية و المحتوى */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', backgroundColor: '#A67BF0', opacity: '0.15', borderRadius: '50%', filter: 'blur(120px)' }} />
        <div style={{ position: 'absolute', top: '35%', left: '-10%', width: '650px', height: '650px', backgroundColor: '#35D0D0', opacity: '0.12', borderRadius: '50%', filter: 'blur(140px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '15%', width: '600px', height: '600px', backgroundColor: '#4F8FFF', opacity: '0.13', borderRadius: '50%', filter: 'blur(130px)' }} />
        <div style={{ position: 'absolute', top: '50%', right: '5%', width: '500px', height: '500px', backgroundColor: '#8B5CF6', opacity: '0.10', borderRadius: '50%', filter: 'blur(130px)' }} />
        <div style={{ position: 'absolute', top: '5%', left: '5%', width: '550px', height: '550px', backgroundColor: '#06B6D4', opacity: '0.09', borderRadius: '50%', filter: 'blur(140px)' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '-5%', width: '500px', height: '500px', backgroundColor: '#3B82F6', opacity: '0.11', borderRadius: '50%', filter: 'blur(130px)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <Navbar />
        <Hero />
        <AboutMe />
        <Skills />
        <Experience />
        <Certifications />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;