import { useState, useEffect, useRef } from 'react';
import { useSiteViewModel } from '../viewmodels/useSiteViewModel';

export const Hero = () => {
  const { heroData, handleViewCV, handleScrollToContact } = useSiteViewModel();
  
  const cvUrl = heroData?.buttons?.primary?.url; 
  const fullText = heroData.bio;
  
  const [hasRunBefore] = useState(() => {
    return sessionStorage.getItem('hero_typed_once') === 'true';
  });

  const [displayedText, setDisplayedText] = useState(hasRunBefore ? fullText : '');
  const [hasStarted, setHasStarted] = useState(hasRunBefore);
  const heroRef = useRef(null);

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 25; 
    const rotateY = (x - centerX) / 25;

    setCoords({ x, y, rotateX, rotateY });
  };

  useEffect(() => {
    if (hasRunBefore) return;
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 3100);
    return () => clearTimeout(timer);
  }, [hasRunBefore]);

  useEffect(() => {
    if (!hasStarted || hasRunBefore) return;
    sessionStorage.setItem('hero_typed_once', 'true');
    setDisplayedText(''); 
    let index = 0;
    
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 35);

    return () => clearInterval(timer);
  }, [hasStarted, hasRunBefore, fullText]);

  return (
    <main 
      ref={heroRef}
      id="welcome"
      style={{ 
        width: '100vw',
        minHeight: 'calc(100vh - 45px)',
        backgroundColor: 'transparent',
        color: '#e5e7eb', 
        fontFamily: 'monospace', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '0 80px',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}
    >
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          /* منع التغبيش وتحسين وضوح النصوص في الـ 3D */
          .sharp-text {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
        `}
      </style>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%', 
        maxWidth: '1280px', 
        gap: '80px' 
      }}>

        {/* القسم الأيسر: النصوص والأزرار */}
        <div style={{ flex: '1', maxWidth: '580px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} className="sharp-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', marginBottom: '22px', fontSize: '14px' }}>
            <span>―</span>
            <span>{heroData.filePathTag}</span>
          </div>

          <div style={{ width: '100%', textAlign: 'left', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 4px 0', lineHeight: '1.1', letterSpacing: '-0.5px' }}>
              {heroData.name.firstName}
            </h1>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#ffffff', margin: 0, lineHeight: '1.1', letterSpacing: '-0.5px' }}>
              {heroData.name.lastName}
            </h1>
          </div>

          <div style={{ fontSize: '17px', color: '#10b981', marginBottom: '6px', fontWeight: '500', textAlign: 'left', width: '100%' }}>
            {heroData.titles[0]}
          </div>
          <div style={{ fontSize: '17px', color: '#c084fc', marginBottom: '20px', fontWeight: '500', textAlign: 'left', width: '100%' }}>
            {heroData.titles[1]}
          </div>

          <div style={{ width: '100%', minHeight: '65px', marginBottom: '32px', textAlign: 'left' }}>
            <p style={{ fontSize: '16px', color: '#9ca3af', lineHeight: '1.6', margin: 0, display: 'inline' }}>
              {hasRunBefore ? fullText : displayedText}
            </p>
            {(!hasRunBefore && hasStarted && displayedText.length < fullText.length) && (
              <span style={{ 
                display: 'inline-block', 
                width: '8px', 
                height: '16px', 
                backgroundColor: '#3b82f6', 
                marginLeft: '6px', 
                verticalAlign: 'middle',
                animation: 'blink 1s infinite'
              }}></span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '18px', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
            <button 
              onClick={() => {
                if (cvUrl) handleViewCV();
              }}
              style={{ 
                padding: '16px 40px', 
                background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '10px', 
                fontSize: '16px', 
                fontWeight: 'bold', 
                cursor: cvUrl ? 'pointer' : 'default', 
                boxShadow: '0 8px 22px rgba(59, 130, 246, 0.45)',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => { if (cvUrl) e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e) => { if (cvUrl) e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {heroData.buttons.primary.label}
            </button>
            
            <button 
              onClick={handleScrollToContact}
              style={{ 
                padding: '16px 32px', 
                backgroundColor: '#191924', 
                color: '#d1d5db', 
                border: '1px solid #2d2d3d', 
                borderRadius: '10px', 
                fontSize: '16px', 
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = '#4f46e5'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = '#2d2d3d'; e.currentTarget.style.color = '#d1d5db'; }}
            >
              {heroData.buttons.secondary.label}
            </button>
          </div>
        </div>

        {/* القسم الأيمن: الصناديق البرمجية */}
        <div 
          style={{ 
            width: '500px', 
            height: '420px', 
            position: 'relative', 
            flexShrink: 0,
            perspective: '1200px'
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setCoords({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transform: isHovered 
              ? `rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg)` 
              : 'rotateX(0deg) rotateY(0deg)',
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-in-out',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }} className="sharp-text">

            {/* المربع الرئيسي (الكود) */}
            <div style={{ 
              position: 'absolute', 
              top: '0', 
              right: '0', 
              width: '480px', 
              backgroundColor: '#171721', 
              borderRadius: '12px', 
              border: '1px solid',
              borderColor: isHovered ? '#4f46e5' : '#272738',
              overflow: 'hidden', 
              boxShadow: isHovered 
                ? '0 20px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(79, 70, 229, 0.25)' 
                : '0 12px 30px rgba(0, 0, 0, 0.4)', 
              boxSizing: 'border-box',
              zIndex: 2,
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
            }}>
              {isHovered && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle 180px at ${coords.x}px ${coords.y}px, rgba(79, 70, 229, 0.12), transparent 80%)`,
                  pointerEvents: 'none',
                  zIndex: 3
                }} />
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '12px 16px', borderBottom: '1px solid #272738' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
                <span style={{ fontSize: '12px', color: '#888899', marginLeft: '6px' }}>
                  {heroData.codeEditorCard.fileName}
                </span>
              </div>

              <div style={{ display: 'flex', fontSize: '13px', fontFamily: 'monospace', lineHeight: '1.9', padding: '16px 0' }}>
                <div style={{ color: '#555566', display: 'flex', flexDirection: 'column', userSelect: 'none', padding: '0 12px', textAlign: 'right', borderRight: '1px solid #222230' }}>
                  <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
                </div>
                <div style={{ color: '#d4d4d4', textAlign: 'left', paddingLeft: '14px' }}>
                  <div><span style={{ color: '#c084fc' }}>const</span> <span style={{ color: '#3b82f6' }}>developer</span> = &#123;</div>
                  <div><span style={{ color: '#60a5fa' }}>name</span>: <span style={{ color: '#34d399' }}>"{heroData.codeEditorCard.code.name}"</span>,</div>
                  <div><span style={{ color: '#60a5fa' }}>role</span>: <span style={{ color: '#34d399' }}>"{heroData.codeEditorCard.code.role}"</span>,</div>
                  <div><span style={{ color: '#60a5fa' }}>mindset</span>: <span style={{ color: '#34d399' }}>"{heroData.codeEditorCard.code.mindset}"</span>,</div>
                  <div>&#125;;</div>
                </div>
              </div>
            </div>

            {/* مربع الحالة (Status) */}
            <div style={{ 
              position: 'absolute', 
              top: '24px', 
              right: '18px', 
              zIndex: 5,
              backgroundColor: '#1c1c28', 
              border: '1px solid',
              borderColor: isHovered ? '#10b981' : '#323248',
              padding: '12px 20px', 
              borderRadius: '10px', 
              fontSize: '11px', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              gap: '4px',
              boxShadow: isHovered ? '0 15px 30px rgba(0,0,0,0.7), 0 0 20px rgba(16, 185, 129, 0.3)' : '0 10px 25px rgba(0,0,0,0.5)',
              transition: 'all 0.3s ease'
            }}>
              <span style={{ letterSpacing: '1px', fontSize: '10px', fontWeight: 'bold', color: '#9ca3af' }}>STATUS</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px #10b981' }}></span>
                <span style={{ color: '#34d399', fontWeight: '600', fontSize: '12px' }}>{heroData.codeEditorCard.statusOverlay}</span>
              </div>
            </div>

            {/* مربع التيرمينال السفلي */}
            <div style={{ 
              position: 'absolute', 
              bottom: '0', 
              right: '15px', 
              width: '310px', 
              backgroundColor: '#171721', 
              borderRadius: '12px', 
              border: '1px solid',
              borderColor: isHovered ? '#3b82f6' : '#272738',
              overflow: 'hidden',
              boxShadow: isHovered 
                ? '0 20px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(59, 130, 246, 0.25)' 
                : '0 12px 30px rgba(0, 0, 0, 0.5)', 
              boxSizing: 'border-box',
              zIndex: 4,
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '12px 16px', borderBottom: '1px solid #272738', marginBottom: '14px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
                <span style={{ fontSize: '12px', color: '#888899', marginLeft: '6px' }}>
                  {heroData.terminalCard.title}
                </span>
              </div>

              <div style={{ fontSize: '13px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left', padding: '0 16px 16px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#3b82f6' }}>➜</span> 
                  <span style={{ color: '#60a5fa' }}>~</span> 
                  <span style={{ color: '#34d399' }}>{heroData.terminalCard.command}</span>
                </div>
                <div style={{ color: '#888899', lineHeight: '1.4' }}>{heroData.terminalCard.outputLine1}</div>
                <div style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px', lineHeight: '1.4' }}>
                  <span>✓</span> {heroData.terminalCard.outputLine2}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
};

export default Hero;