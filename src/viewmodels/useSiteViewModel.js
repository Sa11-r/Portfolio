import { useState, useEffect, useRef } from 'react';
import { siteData } from '../models/siteData';

export const useSiteViewModel = () => {
  const [activeTab, setActiveTab] = useState('welcome');
  const [skillsStartIndex, setSkillsStartIndex] = useState(0);
  const [expandedExpId, setExpandedExpId] = useState(null);

  // مرجع لمنع تداخل السكرول التلقائي مع مراقب السكرول وتجنب التعليق
  const isScrollingByClick = useRef(false);
  const scrollTimeout = useRef(null);

  const navbarData = siteData.header;
  const heroData = siteData.hero;
  const aboutMeData = siteData.aboutMe;
  const techStackData = siteData.techStack;
  const experienceData = siteData.experience;
  const educationAndCertsData = siteData.educationAndCerts;
  const projectsData = siteData.projects;
  const contactData = siteData.contact;

  // ------------------------Navbar-------------------------------------

  // مراقبة السكرول يدوياً بناءً على إحداثيات ومساحة كل قسم
  useEffect(() => {
    const handleScroll = () => {
      // إذا كان التمرير ناتجاً عن ضغطة زر، نتجاهل التحديث المؤقت لمنع الوميض
      if (isScrollingByClick.current) return;

      const sectionIds = navbarData.tabs.map((tab) => tab.id);
      const scrollPosition = window.scrollY + window.innerHeight / 2; // معيار منتصف الشاشة

      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          // التحقق إذا كان منتصف الشاشة واقعاً ضمن حدود هذا القسم
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // الفحص الأولي عند التحميل

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navbarData.tabs]);

  // دالة الضغط على أي تبويب في شريط التنقل العلوي
  const handleTabClick = (tabId) => {
    setActiveTab(tabId); // تحديث مكان الخط النشط فوراً
    isScrollingByClick.current = true; // تفعيل القفل لتجنب تداخل السكرول

    const targetSection = document.getElementById(tabId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' }); // التمرير السلس للقسم
    }

    // إعادة فتح مراقب السكرول بعد انتهاء حركة التمرير السلس
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isScrollingByClick.current = false;
    }, 800);
  };

  // ------------------------hero-------------------------------------

  // دالة فتح رابط الـ CV من siteData مباشرة
  const handleViewCV = () => {
    const cvUrl = heroData.buttons.primary.url;
    if (cvUrl) {
      window.open(cvUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  // دالة الضغط على زر التواصل في الهيرو
  const handleScrollToContact = () => {
    setActiveTab('contact'); 
    isScrollingByClick.current = true;
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isScrollingByClick.current = false;
    }, 800);
  };

  //------------------------------Skills------------------------------------------

  const handleNextSkills = () => {
    const totalSkills = techStackData.skills.length;
    setSkillsStartIndex((prevIndex) => (prevIndex + 5) % totalSkills);
  };

  const handlePrevSkills = () => {
    const totalSkills = techStackData.skills.length;
    setSkillsStartIndex((prevIndex) => (prevIndex - 5 + totalSkills) % totalSkills);
  };

  const visibleSkillsCount = 6;
  const visibleSkills = Array.from({ length: visibleSkillsCount }).map((_, i) => {
    const index = (skillsStartIndex + i) % techStackData.skills.length;
    return techStackData.skills[index];
  });

  //------------------------------Experience------------------------------------------

  const handleToggleExperience = (id) => {
    setExpandedExpId((prevId) => (prevId === id ? null : id));
    
  };



  //------------------------------certifications------------------------------------------


const handleExternalLink = (url) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};


  //------------------------------Project------------------------------------------

  const handleOpenGithub = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  //------------------------------Contact------------------------------------------

  const handleContactClick = (channel) => {
    if (!channel || !channel.link) return;

    if (channel.type === 'email') {
      window.location.href = channel.link;
    } else {
      window.open(channel.link, '_blank', 'noopener,noreferrer');
    }
  };

  return {
    // البيانات
    navbarData,
    heroData,
    aboutMeData,
    techStackData,
    experienceData,
    educationAndCertsData,
    projectsData,
    contactData,
    
    // الحالات والدوال
    activeTab,      
    visibleSkills,
    expandedExpId,      
    handleTabClick,      
    handleViewCV,
    handleScrollToContact,
    handleNextSkills, 
    handlePrevSkills,
    handleToggleExperience, 
    handleExternalLink,
    handleOpenGithub,
    handleContactClick
  };
};