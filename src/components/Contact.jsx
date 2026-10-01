import { useState, useEffect, useRef } from 'react';
import { useSiteViewModel } from '../viewmodels/useSiteViewModel';

export const Contact = () => {
  const { contactData, handleContactClick } = useSiteViewModel();

  const filePath = contactData?.sectionTag || '// contact.sh';
  const title = contactData?.title || 'Get in Touch';
  const subtitle = contactData?.subtitle || 'Feel free to reach out through any of the channels below.';
  const terminalWindow = contactData?.terminalWindow;
  const channels = terminalWindow?.channels || [];

  const fullCommand = terminalWindow?.command || './contact.sh --list --fields=email,whatsapp,location,github,linkedin';
  const fullStatus = terminalWindow?.statusMessage || '5 channels found, all reachable.';

  // التحقق هل تم تشغيل حركة الكتابة من قبل في هذه الجلسة أم لا
  const [hasRunBefore] = useState(() => {
    return sessionStorage.getItem('contact_typed_once') === 'true';
  });

  const [displayedCommand, setDisplayedCommand] = useState(hasRunBefore ? fullCommand : '');
  const [displayedStatus, setDisplayedStatus] = useState(hasRunBefore ? fullStatus : '');
  const [showCursor, setShowCursor] = useState(true);
  const [isCommandDone, setIsCommandDone] = useState(hasRunBefore);
  const [isStatusDone, setIsStatusDone] = useState(hasRunBefore);
  
  const sectionRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(hasRunBefore);

  // 1. مراقبة وصول المستخدم للقسم (مع التأكد من تجاوز شاشة الاكواد)
  useEffect(() => {
    if (hasRunBefore) return;

    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect(); 
          
          // مهلةزمنية لضمان اختفاء شاشة الاكواد بالكامل واستقرار الموقع
          timer = setTimeout(() => {
            setHasStarted(true);
          }, 500);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [hasRunBefore]);

  // 2. تأثير الكتابة التدريجية للجملتين
  useEffect(() => {
    if (!hasStarted || hasRunBefore) return;

    let isCancelled = false;
    sessionStorage.setItem('contact_typed_once', 'true');

    // وميض مؤشر الكتابة (Cursor)
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // كتابة الجملة الأولى (Command)
    let cmdIndex = 0;
    const typeCommand = () => {
      const cmdTimer = setInterval(() => {
        if (isCancelled) {
          clearInterval(cmdTimer);
          return;
        }

        if (cmdIndex < fullCommand.length) {
          setDisplayedCommand(fullCommand.slice(0, cmdIndex + 1));
          cmdIndex++;
        } else {
          clearInterval(cmdTimer);
          setIsCommandDone(true);

          setTimeout(typeStatus, 250);
        }
      }, 35);
    };

    // كتابة الجملة الثانية (Status Message)
    let statusIndex = 0;
    const typeStatus = () => {
      const statusTimer = setInterval(() => {
        if (isCancelled) {
          clearInterval(statusTimer);
          return;
        }

        if (statusIndex < fullStatus.length) {
          setDisplayedStatus(fullStatus.slice(0, statusIndex + 1));
          statusIndex++;
        } else {
          clearInterval(statusTimer);
          setIsStatusDone(true); 
        }
      }, 25);
    };

    typeCommand();

    return () => {
      isCancelled = true;
      clearInterval(cursorInterval);
    };
  }, [hasStarted, hasRunBefore, fullCommand, fullStatus]);

  return (
    <section 
      ref={sectionRef}
      id="contact"
      style={{ 
        width: '100%',
        backgroundColor: '#0d0d12',
        color: '#e5e7eb',
        fontFamily: 'monospace',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 40px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {/* تأثير الإضاءة الخلفية الخافتة */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '15%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, rgba(13, 13, 18, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        
        {/*  مسار الملف العلوي */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', marginBottom: '16px', fontSize: '14px' }}>
          <span>//</span>
          <span>{filePath.replace('// ', '')}</span>
        </div>

        {/* عنوان القسم */}
        <h2 style={{ fontSize: '40px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.5px', textAlign: 'left' }}>
          {title}
        </h2>

        {/* الوصف */}
        <p style={{ fontSize: '15px', color: '#9ca3af', margin: '0 0 40px 0', textAlign: 'left' }}>
          {subtitle}
        </p>

        {/* نافذة الـ Terminal الرئيسية */}
        <div style={{
          width: '100%',
          backgroundColor: '#171721',
          border: '1px solid #272738',
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* شريط النافذة العلوي */}
          <div style={{
            backgroundColor: '#1f1f2e',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            borderBottom: '1px solid #272738'
          }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56', display: 'inline-block' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f', display: 'inline-block' }}></span>
            </div>
            <span style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
              {terminalWindow?.title}
            </span>
          </div>

          {/* محتوى الـ Terminal */}
          <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* سطر الأوامر الأول مع مؤشر الكتابة */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', flexWrap: 'wrap' }}>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>➜</span>
              <span style={{ color: '#e5e7eb' }}>
                {hasRunBefore ? fullCommand : displayedCommand}
                {!hasRunBefore && hasStarted && !isCommandDone && (
                  <span style={{ opacity: showCursor ? 1 : 0, color: '#10b981', fontWeight: 'bold', marginLeft: '2px' }}>
                    █
                  </span>
                )}
              </span>
            </div>

            {/* رسالة الحالة الثانية مع مؤشر الكتابة */}
            <div style={{ fontSize: '13.5px', color: '#9ca3af', display: 'flex', alignItems: 'center', minHeight: '20px' }}>
              <span>{hasRunBefore ? fullStatus : displayedStatus}</span>
              {!hasRunBefore && hasStarted && isCommandDone && !isStatusDone && (
                <span style={{ opacity: showCursor ? 1 : 0, color: '#9ca3af', fontWeight: 'bold', marginLeft: '2px' }}>
                  █
                </span>
              )}
            </div>

            {/*  القنوات (أزرار التواصل) - تظهر عند اكتمال الكتابة */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '14px',
              marginTop: '4px',
              opacity: isStatusDone ? 1 : 0,
              transform: isStatusDone ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              pointerEvents: isStatusDone ? 'auto' : 'none'
            }}>
              {channels.map((channel, index) => (
                <div
                  key={index}
                  onClick={() => handleContactClick(channel)}
                  style={{
                    backgroundColor: '#12121a',
                    border: '1px solid #272738',
                    borderRadius: '10px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s ease',
                    cursor: channel.link ? 'pointer' : 'default'
                  }}
                  onMouseOver={(e) => { 
                    e.currentTarget.style.borderColor = '#4f46e5'; 
                    e.currentTarget.style.backgroundColor = '#1a1a26'; 
                  }}
                  onMouseOut={(e) => { 
                    e.currentTarget.style.borderColor = '#272738'; 
                    e.currentTarget.style.backgroundColor = '#12121a'; 
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', minWidth: '18px' }}>
                    {channel.icon && (
                      <img 
                        src={channel.icon} 
                        alt={channel.label}
                        style={{ width: '20px', height: '18px', objectFit: 'contain' }}
                      />
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span style={{ color: '#9ca3af' }}>{channel.label}</span>
                    <span style={{ color: '#6366f1' }}>→</span>
                    <span style={{ color: '#e5e7eb', fontWeight: '500' }}>{channel.value}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* سطر الـ حقوق النشر في الأسفل */}
        <div style={{ width: '100%', textAlign: 'center', marginTop: '60px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '13px', color: '#10b981' }}>
            {contactData?.footerStatus}
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            {contactData?.copyright}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;