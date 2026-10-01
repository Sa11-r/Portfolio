import { useState } from 'react';
import { useSiteViewModel } from '../viewmodels/useSiteViewModel';

export const Projects = () => {
  const { projectsData } = useSiteViewModel();
  
  const [activeTabs, setActiveTabs] = useState(
    projectsData.items.reduce((acc, item) => ({ ...acc, [item.id]: 'Overview' }), {})
  );

  const handleTabChange = (project, tab) => {
    if (tab === 'GitHub' && project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setActiveTabs(prev => ({ ...prev, [project.id]: tab }));
  };

  return (
    <section 
      id="projects"
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
        
        {/* مسار الملف العلوي */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', marginBottom: '16px', fontSize: '14px' }}>
          <span>//</span>
          <span>{projectsData.sectionTag.replace('// ', '')}</span>
        </div>
        <h2 style={{ fontSize: '40px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.5px', textAlign: 'left' }}>
          {projectsData.title}
        </h2>
        <p style={{ fontSize: '16px', color: '#9ca3af', margin: '0 0 50px 0', textAlign: 'left' }}>
          {projectsData.subtitle}
        </p>

        {/* قائمة المشاريع */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '40px', boxSizing: 'border-box' }}>
          {projectsData.items.map((project) => {
            const currentTab = activeTabs[project.id] || 'Overview';

            return (
              <div 
                key={project.id}
                style={{ 
                  backgroundColor: '#171721', 
                  borderRadius: '14px', 
                  border: '1px solid #272738', 
                  overflow: 'hidden', 
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)', 
                  boxSizing: 'border-box',
                  width: '100%'
                }}
              >
                {/* شريط عنوان النافذة */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px', 
                  padding: '12px 20px', 
                  backgroundColor: '#1f1f2e',
                  borderBottom: '1px solid #272738' 
                }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56', display: 'inline-block' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f', display: 'inline-block' }}></span>
                  </div>
                  <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                    {project.windowTitle}
                  </span>
                </div>

                {/* تبويبات النافذة (Overview / GitHub) */}
                <div style={{ 
                  display: 'flex', 
                  gap: '24px', 
                  padding: '0 20px', 
                  backgroundColor: '#15151f', 
                  borderBottom: '1px solid #272738',
                  fontSize: '13px' 
                }}>
                  <button
                    onClick={() => handleTabChange(project, 'Overview')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: currentTab === 'Overview' ? '#ffffff' : '#6b7280',
                      padding: '12px 0',
                      cursor: 'pointer',
                      fontFamily: 'monospace',
                      fontWeight: currentTab === 'Overview' ? 'bold' : 'normal',
                      borderBottom: currentTab === 'Overview' ? '2px solid #f59e0b' : '2px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => handleTabChange(project, 'GitHub')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#6b7280',
                      padding: '12px 0',
                      cursor: 'pointer',
                      fontFamily: 'monospace',
                      borderBottom: '2px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}
                  >
                    GitHub ↗
                  </button>
                </div>

                {/* محتوى المشروع */}
                <div style={{ display: 'flex', minHeight: '400px', flexWrap: 'wrap' }}>
                  
                  {/* العمود الأيسر: معاينة الفيديو أو الصورة */}
                  <div style={{ 
                    flex: '1', 
                    minWidth: '280px',
                    backgroundColor: '#12121a', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    padding: '40px',
                    borderRight: '1px solid #272738',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: '210px', 
                      height: '380px', 
                      backgroundColor: '#1a1a24', 
                      borderRadius: '30px', 
                      border: '4px solid #333344',
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
                      position: 'relative'
                    }}>
                      <div style={{ position: 'absolute', top: '8px', width: '70px', height: '12px', backgroundColor: '#111', borderRadius: '6px', zIndex: 5 }}></div>
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: '12px', textAlign: 'center', overflow: 'hidden', borderRadius: '24px' }}>
                        
                        {project.videoUrl ? (
                          <video 
                            src={project.videoUrl} 
                            controls 
                            controlsList="nodownload"
                            playsInline
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'contain', 
                              backgroundColor: '#000', 
                              borderRadius: '24px' 
                            }}
                          />
                        ) : project.previewImage ? (
                          <img 
                            src={project.previewImage} 
                            alt={project.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px' }} 
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <span>{project.name} Preview</span>
                        )}

                      </div>
                    </div>
                  </div>

                  {/* العمود الأيمن: التفاصيل */}
                  <div style={{ 
                    flex: '1.2', 
                    minWidth: '300px', 
                    padding: '40px 45px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    textAlign: 'left' 
                  }}>
                    
                    {/* اسم المشروع و الـ Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: 0, fontFamily: 'monospace' }}>
                        {project.name}
                      </h3>
                      {project.badge && (
                        <span style={{ 
                          backgroundColor: 'rgba(245, 158, 11, 0.12)', 
                          color: '#fcd34d', 
                          fontSize: '11px', 
                          padding: '3px 10px', 
                          borderRadius: '6px', 
                          fontFamily: 'monospace',
                          border: '1px solid rgba(245, 158, 11, 0.4)'
                        }}>
                          {project.badge}
                        </span>
                      )}
                    </div>

                    {/* الوصف */}
                    <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                      {project.description}
                    </p>

                    {/* المميزات */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '0 0 28px 0' }}>
                      {project.features.map((feature, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#d1d5db' }}>
                          <span style={{ color: '#f59e0b', fontWeight: 'bold', marginTop: '1px' }}>✓</span>
                          <span style={{ lineHeight: '1.4' }}>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* تقنيات المشروع */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: 0 }}>
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          style={{ 
                            backgroundColor: 'rgba(245, 158, 11, 0.08)', 
                            color: '#fcd34d', 
                            border: '1px solid rgba(245, 158, 11, 0.3)', 
                            padding: '6px 14px', 
                            borderRadius: '8px', 
                            fontSize: '12px',
                            fontWeight: '500'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};