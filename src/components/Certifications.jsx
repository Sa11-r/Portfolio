import { useSiteViewModel } from '../viewmodels/useSiteViewModel';

export const Certifications = () => {
  const { educationAndCertsData, handleExternalLink } = useSiteViewModel();

  const filePath = educationAndCertsData?.sectionTag || '// certifications.yml';
  const title = educationAndCertsData?.title || 'Education & Certifications';
  const subtitle = educationAndCertsData?.subtitle || 'educational background and completed courses .';
  
  const degreesWin = educationAndCertsData?.degreesWindow;
  const certsWin = educationAndCertsData?.certificatesWindow;

  // التحقق مما إذا كانت الدورات موجودة لتحديد ما إذا كنا سنعرض العمودين أو عمود واحد
  const hasCerts = certsWin?.courses && certsWin.courses.length > 0;

  return (
    <section 
      id="certifications"
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
        
        {/* تاج مسار الملف */}
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

        {/* حاوية النافذتين (تتغير تلقائياً إلى عمود واحد إذا لم توجد دورات) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: hasCerts ? '1fr 1fr' : '1fr', 
          gap: '30px', 
          width: '100%',
          alignItems: 'start'
        }}>
          
          {/* ================= النافذة اليسرى: degreesWindow ================= */}
          <div style={{
            backgroundColor: '#171721',
            border: '1px solid #272738',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column'
          }}>
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
                {degreesWin?.fileName}
              </span>
            </div>

            {/* محتوى نافذة الدرجات العلمية */}
            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div 
                onClick={() => handleExternalLink(degreesWin?.url)}
                style={{
                  backgroundColor: '#12121a',
                  border: '1px solid #272738',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  cursor: degreesWin?.url ? 'pointer' : 'default',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#4f46e5'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = '#272738'; }}
              >
                {/* رأس البطاقة: اسم الجامعة والتاريخ على اليمين */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src="https://learn.seu.edu.sa/_next/image?url=%2Fimages%2FSEU-Logo-C.png&w=128&q=75" 
                      alt="Saudi Electronic University Logo" 
                      style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                    />
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'monospace', color: '#ffffff', margin: 0 }}>
                      {degreesWin?.institution}
                    </h3>
                  </div>

                  {/* التاريخ تم نقله لجهة اليمين */}
                  <span style={{
                    border: '1px solid #272738',
                    borderRadius: '20px',
                    padding: '6px 16px',
                    color: '#9ca3af',
                    fontSize: '12px',
                    display: 'inline-block',
                    whiteSpace: 'nowrap'
                  }}>
                    {degreesWin?.period}
                  </span>
                </div>

                <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0, paddingLeft: '36px' }}>
                  {degreesWin?.degree}
                </p>
              </div>
            </div>
          </div>

          {/* ================= النافذة اليمنى: certificatesWindow (تظهر فقط إذا وُجدت دورات) ================= */}
          {hasCerts && (
            <div style={{
              backgroundColor: '#171721',
              border: '1px solid #272738',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column'
            }}>
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
                  {certsWin?.fileName}
                </span>
              </div>

              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '16px' 
                }}>
                  {certsWin?.courses?.map((cert) => (
                    <div 
                      key={cert.id} 
                      onClick={() => handleExternalLink(cert.url)}
                      style={{
                        backgroundColor: '#12121a',
                        border: '1px solid #272738',
                        borderRadius: '10px',
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                        cursor: cert.url ? 'pointer' : 'default',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = '#4f46e5'; }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = '#272738'; }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <img 
                            src="https://img.icons8.com/sf-regular-filled/96/7950F2/contract.png" 
                            alt="Certification Icon" 
                            style={{ width: '18px', height: '18px', objectFit: 'contain', marginTop: '2px' }}
                          />
                          <h4 style={{ fontSize: '15px', fontWeight: 'bold', fontFamily: 'monospace', color: '#ffffff', margin: 0, lineHeight: '1.4' }}>
                            {cert.title}
                          </h4>
                        </div>
                        
                        <span style={{ fontSize: '12px', color: '#9ca3af', paddingLeft: '26px' }}>
                          {cert.issuer}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#10b981', paddingLeft: '26px' }}>
                        <span>✓</span>
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};