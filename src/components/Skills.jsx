import { useState } from 'react';
import { useSiteViewModel } from '../viewmodels/useSiteViewModel';

export const Skills = () => {
  const { 
    techStackData, 
    visibleSkills, 
    handleNextSkills, 
    handlePrevSkills 
  } = useSiteViewModel();

  //   إحداث تأثير الإزاحة الأفقية عند الضغط
  const [slideDirection, setSlideDirection] = useState(0);

  const triggerSlide = (direction, callback) => {
    setSlideDirection(direction); 
    setTimeout(() => {
      callback(); 
      setSlideDirection(0); 
    }, 150); 
  };

  return (
    <section 
      id="skills"
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
          <span>//</span>
          <span>{techStackData?.filePathTag || 'skills.json'}</span>
        </div>

        {/* عنوان القسم */}
        <h2 style={{ fontSize: '40px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.5px', textAlign: 'left' }}>
          {techStackData?.title || 'Core Technical Stack & Tools'}
        </h2>

        {/* الوصف */}
        <p style={{ fontSize: '16px', color: '#9ca3af', margin: '0 0 40px 0', textAlign: 'left' }}>
          {techStackData?.subtitle || 'Categorized skills honed through academic learning, hands-on projects, and training'}
        </p>

        {/* صندوق الحاوية الرئيسي */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          backgroundColor: '#171721', 
          border: '1px solid #272738', 
          borderRadius: '16px', 
          padding: '40px 60px',
          boxSizing: 'border-box',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'hidden' 
        }}>

          {/* زر التمرير الأيسر (السابق)*/}
          <button 
            onClick={() => triggerSlide(30, handlePrevSkills)}
            style={{
              position: 'absolute',
              left: '20px',
              zIndex: 10,
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              backgroundColor: '#1f1f2e',
              border: '1px solid #323246',
              color: '#d1d5db',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#4f46e5'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#323246'; e.currentTarget.style.color = '#d1d5db'; }}
          >
            &#10094;
          </button>

          {/*  عرض المهارات مع إزاحة أفقية سلسة  */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '20px',
              width: '100%',
              padding: '0 10px',
              transform: `translateX(${slideDirection}px)`,
              opacity: slideDirection !== 0 ? 0.3 : 1,
              transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease'
            }}
          >
            {visibleSkills.map((skill, index) => (
              <div 
                key={`${skill.name}-${index}`}
                style={{
                  height: '180px',
                  backgroundColor: '#12121a',
                  border: '1px solid #272738',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  cursor: 'default',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#4f46e5';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(79, 70, 229, 0.25)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#272738';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.02)';
                }}
              >
                {/* صندوق الأيقونة */}
                <div style={{
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '12px',
                  backgroundColor: '#191924',
                  border: '1px solid #2d2d3d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {skill.icon && skill.icon.startsWith('http') ? (
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      style={{ 
                        width: skill.name === 'Miro' ? '60px' : '48px', 
                        height: skill.name === 'Miro' ? '60px' : '48px',
                        objectFit: 'contain'
                      }} 
                    />
                  ) : (
                    <span style={{ fontSize: '32px' }}>{skill.icon}</span>
                  )}
                </div>

                {/* اسم التقنية */}
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#e5e7eb', textAlign: 'center', padding: '0 4px' }}>
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          {/* زر التمرير الأيمن (التالي) */}
          <button 
            onClick={() => triggerSlide(-30, handleNextSkills)}
            style={{
              position: 'absolute',
              right: '20px',
              zIndex: 10,
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              backgroundColor: '#1f1f2e',
              border: '1px solid #323246',
              color: '#d1d5db',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#4f46e5'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#323246'; e.currentTarget.style.color = '#d1d5db'; }}
          >
            &#10095;
          </button>

        </div>

      </div>
    </section>
  );
};