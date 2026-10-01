import { useSiteViewModel } from '../viewmodels/useSiteViewModel';

export const Navbar = () => {
  const { navbarData, activeTab, handleTabClick } = useSiteViewModel();

  // دالة لتحديد اللون بناءً على نوع الملف
  const getFileColor = (label) => {
    if (label.endsWith('.tsx')) return '#3b82f6';      
    if (label.endsWith('.md')) return '#a855f7';       
    if (label.endsWith('.json')) return '#06b6d4';     
    if (label.endsWith('.log')) return '#10b981';     
    if (label.endsWith('.yml')) return '#8b5cf6';      
    if (label.endsWith('/')) return '#f59e0b';         
    if (label.endsWith('.sh')) return '#ef4444';       
    return '#3b82f6';
  };

  return (
    <header style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      zIndex: 1000, 
      backgroundColor: '#181824', 
      borderBottom: '2px solid #2a2a3c', 
      color: '#9ca3af', 
      fontFamily: 'monospace',
      boxSizing: 'border-box',
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
    }}>
      
      {/* الجزء العلوي: الأزرار وعنوان النافذة */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', backgroundColor: '#12121a',borderBottom: '1px solid #2a2a3c' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
          <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
          <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
          <span style={{ fontSize: '14px', color: '#8b949e', margin: '0 12px', fontWeight: 'bold' }}>
            {navbarData?.windowTitle || 'sara - visual-studio-code'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#4ade80' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 8px #22c55e' }}></span>
          <span style={{ fontWeight: '500' }}>{navbarData?.statusBadge || 'open to opportunities'}</span>
        </div>
      </div>

      {/* شريط التبويبات  جهة اليمين وبدون تمدد عشوائي */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'flex-start', 
        backgroundColor: '#14141c',
        width: '100%'
      }}>
        {navbarData?.tabs?.map((tab) => {
          const isActive = activeTab === tab.id;
          const dotColor = getFileColor(tab.label);

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              style={{
                flex: '0 1 auto', 
                padding: '12px 25px',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                border: 'none',
                borderTop: isActive ? `3px solid ${dotColor}` : '3px solid transparent',
                backgroundColor: isActive ? '#1e1e2f' : '#14141c',
                color: isActive ? '#ffffff' : '#9ca3af',
                fontWeight: isActive ? 'bold' : 'normal',
                transition: 'background-color 0.2s ease',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '3px', backgroundColor: dotColor, flexShrink: 0 }}></span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};