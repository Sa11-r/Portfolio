import { useState, useEffect, useRef } from 'react';
import { siteData } from '../models/siteData';

export const AboutMe = () => {
  const about = siteData.aboutMe;

  const terminalData = about.terminalWindow?.data || {};
  const terminalEntries = Object.entries(terminalData).map(
    ([key, value]) => `${key}: ${value}`
  );

  const commandText = about.terminalWindow?.command || "whoami";
  const paragraphs = about.codeEditorWindow?.paragraphs || [];

  // نتحقق من الـ sessionStorage لمعرفة هل تمت الكتابة مسبقاً في هذه الجلسة أم لا
  const hasAlreadyTyped = sessionStorage.getItem('aboutMe_typed') === 'true';

  const [displayedLines, setDisplayedLines] = useState(
    hasAlreadyTyped ? terminalEntries : []
  );
  const [currentLineIndex, setCurrentLineIndex] = useState(
    hasAlreadyTyped ? terminalEntries.length : 0
  );
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isCommandTyped, setIsCommandTyped] = useState(hasAlreadyTyped);
  
  const [hasStartedTyping, setHasStartedTyping] = useState(hasAlreadyTyped);
  const sectionRef = useRef(null);

  // 1. مراقب الشاشة الذكي لمنع الكتابة اثناء المرور السريع
  useEffect(() => {
    if (hasStartedTyping || hasAlreadyTyped) return;

    let timeoutId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          timeoutId = setTimeout(() => {
            const finalRect = sectionRef.current?.getBoundingClientRect();
            if (
              finalRect &&
              finalRect.top >= -100 &&
              finalRect.top <= window.innerHeight * 0.5
            ) {
              setHasStartedTyping(true);
              observer.disconnect();
            }
          }, 500);
        } else {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
        }
      },
      { 
        threshold: [0.3, 0.6, 0.9] 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasStartedTyping, hasAlreadyTyped]);

  // 2. حلقة الكتابة الفعلية مع حفظ الحالة في الـ sessionStorage عند الاكتمال
  useEffect(() => {
    if (!hasStartedTyping || hasAlreadyTyped) return;

    if (!isCommandTyped) {
      if (currentCharIndex < commandText.length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsCommandTyped(true);
        setCurrentCharIndex(0);
      }
      return;
    }

    if (currentLineIndex < terminalEntries.length) {
      const currentTargetLine = terminalEntries[currentLineIndex];
      
      if (currentCharIndex < currentTargetLine.length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1);
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setDisplayedLines((prev) => {
          const updated = [...prev, currentTargetLine];
          // إذا وصلنا للنهاية، نقوم بحفظ الحالة في الـ sessionStorage
          if (updated.length === terminalEntries.length) {
            sessionStorage.setItem('aboutMe_typed', 'true');
          }
          return updated;
        });
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    }
  }, [hasStartedTyping, hasAlreadyTyped, isCommandTyped, currentLineIndex, currentCharIndex, commandText, terminalEntries]);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      style={{ 
        width: '100%',
        backgroundColor: 'transparent',
        color: '#e5e7eb',
        fontFamily: 'monospace',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 80px',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}
    >
      <div style={{ width: '100%', maxWidth: '1280px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        
        {/*  مسار الملف العلوي */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', marginBottom: '16px', fontSize: '14px' }}>
          <span>{about.sectionTag || 'about.json'}</span>
        </div>

        {/* عنوان القسم */}
        <h2 style={{ fontSize: '40px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.5px', textAlign: 'left' }}>
          {about.title}
        </h2>

        {/* الوصف */}
        <p style={{ fontSize: '16px', color: '#9ca3af', margin: '0 0 40px 0', textAlign: 'left' }}>
          {about.subtitle}
        </p>

        {/* الصندوقين بجانب بعضهما */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
          gap: '24px',
          alignItems: 'start',
          width: '100%'
        }}>
          
          {/* 1. صندوق الـ Terminal (whoami - bash)  */}
          <div style={{
            backgroundColor: '#171721',
            border: '1px solid #272738',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              borderBottom: '1px solid #272738',
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
              <span style={{ fontSize: '12px', color: '#888899', marginLeft: '6px' }}>
                {about.terminalWindow?.title}
              </span>
            </div>

            <div style={{ padding: '24px', fontSize: '14px', color: '#e5e7eb', lineHeight: '1.8' }}>
              <div style={{ color: '#10b981', marginBottom: '12px' }}>
                ➜ {commandText.slice(0, (isCommandTyped || hasAlreadyTyped) ? commandText.length : currentCharIndex)}
                {(!isCommandTyped && !hasAlreadyTyped) && <span style={{ display: 'inline-block', width: '8px', height: '15px', backgroundColor: '#10b981', verticalAlign: 'middle', marginLeft: '2px' }}></span>}
              </div>

              {displayedLines.map((line, index) => {
                const colonIndex = line.indexOf(':');
                const keyPart = colonIndex !== -1 ? line.slice(0, colonIndex) : line;
                const valPart = colonIndex !== -1 ? line.slice(colonIndex + 1) : '';
                return (
                  <div key={index} style={{ marginBottom: '4px' }}>
                    <span style={{ color: '#9ca3af' }}>{keyPart}:</span>
                    <span style={{ color: keyPart.trim().toLowerCase() === 'name' ? '#e5e7eb' : '#10b981' }}>{valPart}</span>
                  </div>
                );
              })}

              {(!hasAlreadyTyped && isCommandTyped && currentLineIndex < terminalEntries.length) && (
                <div style={{ marginBottom: '4px' }}>
                  {(() => {
                    const currentLine = terminalEntries[currentLineIndex];
                    const typedPart = currentLine.slice(0, currentCharIndex);
                    const colonIndex = currentLine.indexOf(':');
                    const keyPart = colonIndex !== -1 ? currentLine.slice(0, colonIndex) : currentLine;
                    
                    return (
                      <>
                        <span style={{ color: '#9ca3af' }}>
                          {keyPart.length >= typedPart.length ? typedPart : keyPart + ':'}
                        </span>
                        <span style={{ color: '#10b981' }}>
                          {keyPart.length < typedPart.length ? typedPart.slice(keyPart.length + 1) : ''}
                        </span>
                        <span style={{ display: 'inline-block', width: '8px', height: '15px', backgroundColor: '#10b981', verticalAlign: 'middle', marginLeft: '2px' }}></span>
                      </>
                    );
                  })()}
                </div>
              )}

              {(currentLineIndex >= terminalEntries.length || hasAlreadyTyped) && (
                <div style={{ color: '#10b981', marginTop: '12px' }}>
                  ➜ <span style={{ display: 'inline-block', width: '8px', height: '15px', backgroundColor: '#10b981', verticalAlign: 'middle', marginLeft: '2px' }}></span>
                </div>
              )}
            </div>
          </div>

          {/* 2. صندوق الـ Editor (overview.json) */}
          <div style={{
            backgroundColor: '#171721',
            border: '1px solid #272738',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              borderBottom: '1px solid #272738'
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
              <span style={{ fontSize: '12px', color: '#888899', marginLeft: '6px' }}>
                {about.codeEditorWindow?.fileName || "overview.json"}
              </span>
            </div>

            <div style={{ 
              fontSize: '13px', 
              lineHeight: '1.8', 
              padding: '20px 16px',
              maxHeight: '430px',
              overflowY: 'auto'
            }}>
              {paragraphs.map((paragraphText, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  marginBottom: index < paragraphs.length - 1 ? '16px' : '0' 
                }}>
                  <span style={{ 
                    color: '#555566', 
                    userSelect: 'none', 
                    textAlign: 'right', 
                    paddingRight: '14px', 
                    marginRight: '14px',
                    borderRight: '1px solid #222230',
                    minWidth: '24px',
                    flexShrink: 0
                  }}>
                    {index + 1}
                  </span>

                  <span style={{ color: '#d4d4d4', wordBreak: 'break-word', whiteSpace: 'pre-wrap', flex: 1 }}>
                    {paragraphText}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};