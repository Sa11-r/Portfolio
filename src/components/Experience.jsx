import { useSiteViewModel } from '../viewmodels/useSiteViewModel';

export const Experience = () => {
  const { experienceData, expandedExpId, handleToggleExperience } = useSiteViewModel();

  const filePath = experienceData?.sectionTag || '// experience.log';
  const title = experienceData?.title || 'Experience Trace';
  const subtitle = experienceData?.subtitle || 'Documenting professional milestones and career progress.';
  const experiences = experienceData?.experiences || [];

  // ألوان أكواد  لكل خبرة
  const codeColors = ['#3ae4f9', '#7c2b9d', '#4f1a6e'];

  return (
    <section 
      id="experience"
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
          <span>{filePath.replace('// ', '')}</span>
        </div>

        {/* عنوان القسم */}
        <h2 style={{ fontSize: '40px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.5px', textAlign: 'left' }}>
          {title}
        </h2>

        {/* الوصف */}
        <p style={{ fontSize: '16px', color: '#9ca3af', margin: '0 0 50px 0', textAlign: 'left' }}>
          {subtitle}
        </p>

        {/* حاوية الخط الزمني (Timeline Container) */}
        <div style={{ position: 'relative', width: '100%', paddingLeft: '30px' }}>
          
          {/* الخط العمودي النازل */}
          <div style={{
            position: 'absolute',
            left: '4px',
            top: '10px',
            bottom: '10px',
            width: '2px',
            backgroundColor: '#272738'
          }}></div>

          {/* قائمة الخبرات */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {experiences.map((item, index) => {
              const isExpanded = expandedExpId === item.id;
              const codeColor = codeColors[index % codeColors.length];

              return (
                <div key={item.id} style={{ position: 'relative', display: 'flex', alignItems: 'flex-start' }}>
                  
                  {/* النقطة المضيئة على الخط الزمني */}
                  <div style={{
                    position: 'absolute',
                    left: '-30px',
                    top: '32px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: item.isCurrent ? '#10b981' : '#323246',
                    boxShadow: item.isCurrent ? '0 0 10px #10b981' : 'none',
                    zIndex: 2
                  }}></div>

                  {/* صندوق الخبرة الرئيسي */}
                  <div style={{
                    width: '100%',
                    backgroundColor: '#171721',
                    border: '1px solid #272738',
                    borderRadius: '14px',
                    padding: '28px 36px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = '#4f46e5'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = '#272738'; }}
                  >
                    
                    {/* الجزء العلوي: تفاصيل الوظيفة والتاريخ */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      
                      {/* الجانب الأيسر: الكود، المسمى، والشركة */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        
                        {/* الكود والـ current tag */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                          <span style={{ color: codeColor }}>{codeColor}</span>
                          {item.isCurrent && (
                            <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span>●</span> current
                            </span>
                          )}
                        </div>

                        {/* المسمى الوظيفي */}
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
                          {item.role}
                        </h3>

                        {/* الشركة وزر expand-tasks.sh */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '4px' }}>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontSize: '14px' }}>
                            <img 
                              src="https://img.icons8.com/papercut/60/company.png" 
                              alt="company" 
                              style={{ width: '20px', height: '20px', objectFit: 'contain' }} 
                            />
                            <span>{item.company}</span>
                          </div>

                          {/* زر expand-tasks.sh */}
                          <button 
                            onClick={() => handleToggleExperience(item.id)}
                            style={{
                              backgroundColor: '#1f1f2e',
                              border: '1px solid #323246',
                              borderRadius: '6px',
                              color: '#a78bfa',
                              padding: '6px 14px',
                              fontSize: '13px',
                              fontFamily: 'monospace',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#4f46e5'; e.currentTarget.style.color = '#fff'; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#323246'; e.currentTarget.style.color = '#a78bfa'; }}
                          >
                            <span style={{ color: '#10b981' }}>{isExpanded ? '[-]' : '[+]'}</span> {item.buttonText.replace('[+] ', '')}
                          </button>
                        </div>

                      </div>

                      {/* الجانب الأيمن: الفترة الزمنية */}
                      <div style={{
                        backgroundColor: '#1f1f2e',
                        border: '1px solid #272738',
                        borderRadius: '20px',
                        padding: '8px 18px',
                        color: '#9ca3af',
                        fontSize: '13px',
                        whiteSpace: 'nowrap',
                        alignSelf: 'flex-start'
                      }}>
                        {item.period}
                      </div>

                    </div>

                    {/* المهام التابعة */}
                    {isExpanded && item.tasks && item.tasks.length > 0 && (
                      <div style={{
                        marginTop: '10px',
                        paddingTop: '16px',
                        borderTop: '1px solid #272738',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        animation: 'fadeIn 0.3s ease'
                      }}>
                        <span style={{ fontSize: '12px', color: '#10b981' }}>// executed tasks & responsibilities:</span>
                        {item.tasks.map((task, tIndex) => (
                          <div key={tIndex} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontSize: '14px' }}>
                            <span style={{ color: '#4f46e5' }}>&gt;</span>
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};