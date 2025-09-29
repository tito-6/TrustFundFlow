import { useState, useEffect } from "react";

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState("ar");

  useEffect(() => {
    // Check for stored language preference, default to Arabic
    const storedLang = localStorage.getItem("preferred-language") || "ar";
    setCurrentLanguage(storedLang);
  }, []);

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    
    // Update HTML attributes for RTL/LTR
    const html = document.documentElement;
    if (lang === "ar") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", lang);
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
    
    // Store language preference
    localStorage.setItem("preferred-language", lang);
  };

  const shouldShowLanguage = (lang: string) => {
    return currentLanguage === lang;
  };

  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const targetId = target.getAttribute("href")?.substring(1);
        const targetElement = targetId ? document.getElementById(targetId) : null;
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
        }
      }
    };

    // Add scroll effect to navbar
    const navbar = document.querySelector("nav");
    let lastScrollTop = 0;
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (navbar) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          navbar.style.transform = "translateY(-100%)";
        } else {
          navbar.style.transform = "translateY(0)";
        }
        navbar.style.transition = "transform 0.3s ease-in-out";
      }
      
      lastScrollTop = scrollTop;
    };

    document.addEventListener("click", handleNavClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleNavClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`bg-background text-foreground font-arabic antialiased ${currentLanguage === "ar" ? "rtl" : "ltr"}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <i className="fas fa-exchange-alt text-white text-lg"></i>
              </div>
              {shouldShowLanguage("ar") && (
                <div className="font-bold text-lg text-primary">مكتب الحاضر المالي</div>
              )}
              {shouldShowLanguage("en") && (
                <div className="font-bold text-lg text-primary font-latin">Al-Hader Financial</div>
              )}
              {shouldShowLanguage("tr") && (
                <div className="font-bold text-lg text-primary font-latin">Al-Hader Mali</div>
              )}
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              <a href="#hero" className="text-muted-foreground hover:text-primary transition-colors" data-testid="nav-home">
                {shouldShowLanguage("ar") && "الرئيسية"}
                {shouldShowLanguage("en") && <span className="font-latin">Home</span>}
                {shouldShowLanguage("tr") && <span className="font-latin">Ana Sayfa</span>}
              </a>
              <a href="#rates" className="text-muted-foreground hover:text-primary transition-colors" data-testid="nav-rates">
                {shouldShowLanguage("ar") && "الأسعار"}
                {shouldShowLanguage("en") && <span className="font-latin">Rates</span>}
                {shouldShowLanguage("tr") && <span className="font-latin">Oranlar</span>}
              </a>
              <a href="#trust" className="text-muted-foreground hover:text-primary transition-colors" data-testid="nav-trust">
                {shouldShowLanguage("ar") && "لماذا نحن"}
                {shouldShowLanguage("en") && <span className="font-latin">Why Us</span>}
                {shouldShowLanguage("tr") && <span className="font-latin">Neden Biz</span>}
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors" data-testid="nav-contact">
                {shouldShowLanguage("ar") && "اتصل بنا"}
                {shouldShowLanguage("en") && <span className="font-latin">Contact</span>}
                {shouldShowLanguage("tr") && <span className="font-latin">İletişim</span>}
              </a>
            </div>
            
            {/* Language Switcher */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <select 
                value={currentLanguage}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-secondary border border-border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                data-testid="language-selector"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
                <option value="tr">Türkçe</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-16 gradient-bg overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-right">
              {shouldShowLanguage("ar") && (
                <>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    مكتب الحاضر المالي<br/>
                    <span className="text-accent">مكتب حوالة وصرافة موثوق</span><br/>
                    في المحللق الجنوبي، حلب
                  </h1>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
                    مكتب حوالة وصرافة سريعة وآمنة. في شارع السربيس، المحللق الجنوبي لخدمة مجتمعنا المحلي بأفضل الأسعار والخدمات الموثوقة.
                  </p>
                </>
              )}
              {shouldShowLanguage("en") && (
                <>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-latin">
                    Al-Hader Financial<br/>
                    <span className="text-accent">Trusted Hawala & Exchange Office</span><br/>
                    in Al-Mahallak Al-Janoubi, Aleppo
                  </h1>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 font-latin">
                    Fast and secure hawala office and currency exchange. In Al-Sarbis Street, Al-Mahallak Al-Janoubi to serve our local community with the best rates and trusted services.
                  </p>
                </>
              )}
              {shouldShowLanguage("tr") && (
                <>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-latin">
                    Al-Hader Mali<br/>
                    <span className="text-accent">Güvenilir Havale ve Döviz Ofisi</span><br/>
                    Al-Mahallak Al-Janoubi, Halep'te
                  </h1>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 font-latin">
                    Hızlı ve güvenli havale ofisi ve döviz bozdurma hizmetleri. Al-Sarbis Caddesi, Al-Mahallak Al-Janoubi'de yerel topluluğumuza en iyi oranlar ve güvenilir hizmetlerle hizmet vermek için.
                  </p>
                </>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="https://wa.me/905355002504" 
                  className="gold-gradient text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 inline-flex items-center justify-center"
                  data-testid="button-whatsapp-transfer"
                >
                  <i className={`fab fa-whatsapp ${currentLanguage === "ar" ? "ml-2" : "mr-2"}`}></i>
                  {shouldShowLanguage("ar") && "ابدأ حوالتك الآن"}
                  {shouldShowLanguage("en") && <span className="font-latin">Start Your Transfer Now</span>}
                  {shouldShowLanguage("tr") && <span className="font-latin">Transferinizi Şimdi Başlatın</span>}
                </a>
                
                <a 
                  href="tel:+905355002504" 
                  className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all inline-flex items-center justify-center"
                  data-testid="button-phone-call"
                >
                  <i className={`fas fa-phone ${currentLanguage === "ar" ? "ml-2" : "mr-2"}`}></i>
                  {shouldShowLanguage("ar") && "اتصل بنا"}
                  {shouldShowLanguage("en") && <span className="font-latin">Call Us</span>}
                  {shouldShowLanguage("tr") && <span className="font-latin">Bizi Arayın</span>}
                </a>
              </div>
            </div>
            
            {/* Visual */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-80 h-80 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-float">
                    <i className="fas fa-shield-alt text-accent text-3xl"></i>
                  </div>
                  <div className="absolute top-1/3 right-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float" style={{animationDelay: "0.5s"}}>
                    <i className="fas fa-bolt text-white text-2xl"></i>
                  </div>
                  <div className="absolute top-1/3 left-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float" style={{animationDelay: "1s"}}>
                    <i className="fas fa-mobile-alt text-accent text-2xl"></i>
                  </div>
                  <div className="absolute bottom-1/4 left-1/4 w-18 h-18 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float" style={{animationDelay: "1.5s"}}>
                    <i className="fas fa-globe text-white text-2xl"></i>
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 w-18 h-18 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float" style={{animationDelay: "2s"}}>
                    <i className="fas fa-handshake text-accent text-2xl"></i>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <i className="fas fa-exchange-alt text-primary text-4xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exchange Rates Section */}
      <section id="rates" className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {shouldShowLanguage("ar") && (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">أسعار الصرف ومكتب الحوالة اليومية</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  أسعار محدثة لحظياً في مكتب الحوالة لضمان أفضل صفقة لعملائنا الكرام
                </p>
              </>
            )}
            {shouldShowLanguage("en") && (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-latin">Daily Exchange and Hawala Office Rates</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-latin">
                  Real-time updated rates at our hawala office to ensure the best deal for our valued customers
                </p>
              </>
            )}
            {shouldShowLanguage("tr") && (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-latin">Günlük Döviz ve Havale Ofisi Oranları</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-latin">
                  Havale ofisimizde değerli müşterilerimiz için en iyi fırsatı garanti etmek üzere gerçek zamanlı güncellenmiş oranlar
                </p>
              </>
            )}
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* USD/SYP Rate Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all" data-testid="card-rate-usd">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className="fas fa-dollar-sign text-primary text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">USD/SYP</h3>
                    {shouldShowLanguage("ar") && <p className="text-muted-foreground text-sm">دولار أمريكي</p>}
                    {shouldShowLanguage("en") && <p className="text-muted-foreground text-sm font-latin">US Dollar</p>}
                    {shouldShowLanguage("tr") && <p className="text-muted-foreground text-sm font-latin">ABD Doları</p>}
                  </div>
                </div>
                <div className="text-green-600">
                  <i className="fas fa-arrow-up text-sm"></i>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  {shouldShowLanguage("ar") && <span className="text-muted-foreground">شراء</span>}
                  {shouldShowLanguage("en") && <span className="text-muted-foreground font-latin">Buy</span>}
                  {shouldShowLanguage("tr") && <span className="text-muted-foreground font-latin">Alış</span>}
                  <span className="font-bold text-lg" data-testid="rate-usd-buy">13,150</span>
                </div>
                <div className="flex justify-between items-center">
                  {shouldShowLanguage("ar") && <span className="text-muted-foreground">بيع</span>}
                  {shouldShowLanguage("en") && <span className="text-muted-foreground font-latin">Sell</span>}
                  {shouldShowLanguage("tr") && <span className="text-muted-foreground font-latin">Satış</span>}
                  <span className="font-bold text-lg" data-testid="rate-usd-sell">13,250</span>
                </div>
              </div>
            </div>
            
            {/* EUR/SYP Rate Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all" data-testid="card-rate-eur">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className="fas fa-euro-sign text-primary text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">EUR/SYP</h3>
                    {shouldShowLanguage("ar") && <p className="text-muted-foreground text-sm">يورو أوروبي</p>}
                    {shouldShowLanguage("en") && <p className="text-muted-foreground text-sm font-latin">Euro</p>}
                    {shouldShowLanguage("tr") && <p className="text-muted-foreground text-sm font-latin">Euro</p>}
                  </div>
                </div>
                <div className="text-green-600">
                  <i className="fas fa-arrow-up text-sm"></i>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  {shouldShowLanguage("ar") && <span className="text-muted-foreground">شراء</span>}
                  {shouldShowLanguage("en") && <span className="text-muted-foreground font-latin">Buy</span>}
                  {shouldShowLanguage("tr") && <span className="text-muted-foreground font-latin">Alış</span>}
                  <span className="font-bold text-lg" data-testid="rate-eur-buy">14,280</span>
                </div>
                <div className="flex justify-between items-center">
                  {shouldShowLanguage("ar") && <span className="text-muted-foreground">بيع</span>}
                  {shouldShowLanguage("en") && <span className="text-muted-foreground font-latin">Sell</span>}
                  {shouldShowLanguage("tr") && <span className="text-muted-foreground font-latin">Satış</span>}
                  <span className="font-bold text-lg" data-testid="rate-eur-sell">14,390</span>
                </div>
              </div>
            </div>
            
            {/* TRY/SYP Rate Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all" data-testid="card-rate-try">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className="fas fa-lira-sign text-primary text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">TRY/SYP</h3>
                    {shouldShowLanguage("ar") && <p className="text-muted-foreground text-sm">ليرة تركية</p>}
                    {shouldShowLanguage("en") && <p className="text-muted-foreground text-sm font-latin">Turkish Lira</p>}
                    {shouldShowLanguage("tr") && <p className="text-muted-foreground text-sm font-latin">Türk Lirası</p>}
                  </div>
                </div>
                <div className="text-red-600">
                  <i className="fas fa-arrow-down text-sm"></i>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  {shouldShowLanguage("ar") && <span className="text-muted-foreground">شراء</span>}
                  {shouldShowLanguage("en") && <span className="text-muted-foreground font-latin">Buy</span>}
                  {shouldShowLanguage("tr") && <span className="text-muted-foreground font-latin">Alış</span>}
                  <span className="font-bold text-lg" data-testid="rate-try-buy">490</span>
                </div>
                <div className="flex justify-between items-center">
                  {shouldShowLanguage("ar") && <span className="text-muted-foreground">بيع</span>}
                  {shouldShowLanguage("en") && <span className="text-muted-foreground font-latin">Sell</span>}
                  {shouldShowLanguage("tr") && <span className="text-muted-foreground font-latin">Satış</span>}
                  <span className="font-bold text-lg" data-testid="rate-try-sell">510</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Services Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-all text-center" data-testid="card-service-transfers">
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-paper-plane text-white text-2xl"></i>
              </div>
              {shouldShowLanguage("ar") && (
                <>
                  <h3 className="text-xl font-bold mb-4">مكتب الحوالة</h3>
                  <p className="text-muted-foreground mb-6">مكتب حوالة سريع وآمن إلى جميع أنحاء العالم بأفضل الأسعار وأعلى معايير الأمان</p>
                  <a href="#contact" className="text-primary font-bold hover:underline" data-testid="link-transfers-learn-more">اعرف المزيد →</a>
                </>
              )}
              {shouldShowLanguage("en") && (
                <>
                  <h3 className="text-xl font-bold mb-4 font-latin">Hawala Office</h3>
                  <p className="text-muted-foreground mb-6 font-latin">Fast and secure hawala office worldwide with the best rates and highest security standards</p>
                  <a href="#contact" className="text-primary font-bold hover:underline font-latin" data-testid="link-transfers-learn-more">Learn More →</a>
                </>
              )}
              {shouldShowLanguage("tr") && (
                <>
                  <h3 className="text-xl font-bold mb-4 font-latin">Havale Ofisi</h3>
                  <p className="text-muted-foreground mb-6 font-latin">En iyi oranlar ve en yüksek güvenlik standartlarıyla dünya çapında hızlı ve güvenli havale ofisi</p>
                  <a href="#contact" className="text-primary font-bold hover:underline font-latin" data-testid="link-transfers-learn-more">Daha Fazla Bilgi →</a>
                </>
              )}
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-all text-center" data-testid="card-service-exchange">
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-exchange-alt text-white text-2xl"></i>
              </div>
              {shouldShowLanguage("ar") && (
                <>
                  <h3 className="text-xl font-bold mb-4">صرافة العملات</h3>
                  <p className="text-muted-foreground mb-6">صرف جميع العملات الأجنبية بأسعار تنافسية ومعاملات شفافة وسريعة</p>
                  <a href="#contact" className="text-primary font-bold hover:underline" data-testid="link-exchange-learn-more">اعرف المزيد →</a>
                </>
              )}
              {shouldShowLanguage("en") && (
                <>
                  <h3 className="text-xl font-bold mb-4 font-latin">Currency Exchange</h3>
                  <p className="text-muted-foreground mb-6 font-latin">Exchange all foreign currencies at competitive rates with transparent and fast transactions</p>
                  <a href="#contact" className="text-primary font-bold hover:underline font-latin" data-testid="link-exchange-learn-more">Learn More →</a>
                </>
              )}
              {shouldShowLanguage("tr") && (
                <>
                  <h3 className="text-xl font-bold mb-4 font-latin">Döviz Bozdurma</h3>
                  <p className="text-muted-foreground mb-6 font-latin">Rekabetçi oranlarla şeffaf ve hızlı işlemlerle tüm dövizleri bozdurma</p>
                  <a href="#contact" className="text-primary font-bold hover:underline font-latin" data-testid="link-exchange-learn-more">Daha Fazla Bilgi →</a>
                </>
              )}
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-all text-center" data-testid="card-service-financial">
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-chart-line text-white text-2xl"></i>
              </div>
              {shouldShowLanguage("ar") && (
                <>
                  <h3 className="text-xl font-bold mb-4">الخدمات المالية</h3>
                  <p className="text-muted-foreground mb-6">استشارات مالية ومساعدة في التحويلات التجارية والشخصية</p>
                  <a href="#contact" className="text-primary font-bold hover:underline" data-testid="link-financial-learn-more">اعرف المزيد →</a>
                </>
              )}
              {shouldShowLanguage("en") && (
                <>
                  <h3 className="text-xl font-bold mb-4 font-latin">Financial Services</h3>
                  <p className="text-muted-foreground mb-6 font-latin">Financial consultations and assistance with commercial and personal transfers</p>
                  <a href="#contact" className="text-primary font-bold hover:underline font-latin" data-testid="link-financial-learn-more">Learn More →</a>
                </>
              )}
              {shouldShowLanguage("tr") && (
                <>
                  <h3 className="text-xl font-bold mb-4 font-latin">Mali Hizmetler</h3>
                  <p className="text-muted-foreground mb-6 font-latin">Mali danışmanlık ve ticari ve kişisel transferlerde yardım</p>
                  <a href="#contact" className="text-primary font-bold hover:underline font-latin" data-testid="link-financial-learn-more">Daha Fazla Bilgi →</a>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {shouldShowLanguage("ar") && (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">لماذا يثق بنا أهل الحاضر؟</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  خبرة محلية، ثقة مجتمعية، وخدمة متميزة جعلتنا الخيار الأول لعائلات الحاضر
                </p>
              </>
            )}
            {shouldShowLanguage("en") && (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-latin">Why Do The People of Al-Hader Trust Us?</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-latin">
                  Local expertise, community trust, and exceptional service made us the first choice for Al-Hader families
                </p>
              </>
            )}
            {shouldShowLanguage("tr") && (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-latin">Al-Hader Halkı Neden Bize Güveniyor?</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-latin">
                  Yerel uzmanlık, toplumsal güven ve olağanüstü hizmet bizi Al-Hader aileleri için ilk tercih haline getirdi
                </p>
              </>
            )}
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="feature-speed">
              <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check text-white text-2xl"></i>
              </div>
              {shouldShowLanguage("ar") && (
                <>
                  <h3 className="text-xl font-bold mb-4">أعلى سرعة تحويل</h3>
                  <p className="text-muted-foreground">
                    نكمل معاملاتك في دقائق معدودة، وليس ساعات. شبكتنا المحلية والدولية تضمن وصول أموالك بأسرع وقت ممكن.
                  </p>
                </>
              )}
              {shouldShowLanguage("en") && (
                <>
                  <h3 className="text-xl font-bold mb-4 font-latin">Fastest Transfer Speed</h3>
                  <p className="text-muted-foreground font-latin">
                    We complete your transactions in minutes, not hours. Our local and international network ensures your money reaches its destination as quickly as possible.
                  </p>
                </>
              )}
              {shouldShowLanguage("tr") && (
                <>
                  <h3 className="text-xl font-bold mb-4 font-latin">En Hızlı Transfer Hızı</h3>
                  <p className="text-muted-foreground font-latin">
                    İşlemlerinizi saatlerde değil dakikalarda tamamlarız. Yerel ve uluslararası ağımız paranızın mümkün olan en hızlı şekilde hedefe ulaşmasını sağlar.
                  </p>
                </>
              )}
            </div>
            
            <div className="text-center" data-testid="feature-transparency">
              <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check text-white text-2xl"></i>
              </div>
              {shouldShowLanguage("ar") && (
                <>
                  <h3 className="text-xl font-bold mb-4">شفافية في الأسعار</h3>
                  <p className="text-muted-foreground">
                    لا رسوم خفية، لا تلاعب بالأسعار. نعرض أسعارنا بوضوح ونلتزم بها مع كل عميل بنفس المعاملة العادلة.
                  </p>
                </>
              )}
              {shouldShowLanguage("en") && (
                <>
                  <h3 className="text-xl font-bold mb-4 font-latin">Price Transparency</h3>
                  <p className="text-muted-foreground font-latin">
                    No hidden fees, no price manipulation. We display our rates clearly and commit to them with every customer with the same fair treatment.
                  </p>
                </>
              )}
              {shouldShowLanguage("tr") && (
                <>
                  <h3 className="text-xl font-bold mb-4 font-latin">Fiyat Şeffaflığı</h3>
                  <p className="text-muted-foreground font-latin">
                    Gizli ücret yok, fiyat manipülasyonu yok. Oranlarımızı açık bir şekilde gösteriyoruz ve her müşteriyle aynı adil muameleyle bunlara bağlı kalıyoruz.
                  </p>
                </>
              )}
            </div>
            
            <div className="text-center" data-testid="feature-local-team">
              <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check text-white text-2xl"></i>
              </div>
              {shouldShowLanguage("ar") && (
                <>
                  <h3 className="text-xl font-bold mb-4">فريق محلي ودود</h3>
                  <p className="text-muted-foreground">
                    نحن من أهل الحاضر، نعرف احتياجاتكم ونتحدث لغتكم. فريقنا المحلي يقدم خدمة شخصية تشعرون معها بالأمان والراحة.
                  </p>
                </>
              )}
              {shouldShowLanguage("en") && (
                <>
                  <h3 className="text-xl font-bold mb-4 font-latin">Friendly Local Team</h3>
                  <p className="text-muted-foreground font-latin">
                    We are from Al-Hader, we know your needs and speak your language. Our local team provides personal service that makes you feel safe and comfortable.
                  </p>
                </>
              )}
              {shouldShowLanguage("tr") && (
                <>
                  <h3 className="text-xl font-bold mb-4 font-latin">Samimi Yerel Takım</h3>
                  <p className="text-muted-foreground font-latin">
                    Al-Hader'danlıyız, ihtiyaçlarınızı biliyoruz ve dilinizi konuşuyoruz. Yerel ekibimiz size güven ve rahatlık hissettiren kişisel hizmet sağlar.
                  </p>
                </>
              )}
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-border" data-testid="stats-section">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-years">5+</div>
                {shouldShowLanguage("ar") && <div className="text-muted-foreground">سنوات خبرة</div>}
                {shouldShowLanguage("en") && <div className="text-muted-foreground font-latin">Years Experience</div>}
                {shouldShowLanguage("tr") && <div className="text-muted-foreground font-latin">Yıl Tecrübe</div>}
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-customers">2000+</div>
                {shouldShowLanguage("ar") && <div className="text-muted-foreground">عميل راض</div>}
                {shouldShowLanguage("en") && <div className="text-muted-foreground font-latin">Happy Customers</div>}
                {shouldShowLanguage("tr") && <div className="text-muted-foreground font-latin">Mutlu Müşteri</div>}
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-countries">15</div>
                {shouldShowLanguage("ar") && <div className="text-muted-foreground">دولة تحويل</div>}
                {shouldShowLanguage("en") && <div className="text-muted-foreground font-latin">Countries</div>}
                {shouldShowLanguage("tr") && <div className="text-muted-foreground font-latin">Ülke</div>}
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-support">24/7</div>
                {shouldShowLanguage("ar") && <div className="text-muted-foreground">دعم العملاء</div>}
                {shouldShowLanguage("en") && <div className="text-muted-foreground font-latin">Support</div>}
                {shouldShowLanguage("tr") && <div className="text-muted-foreground font-latin">Destek</div>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {shouldShowLanguage("ar") && (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">تواصل معنا</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  نحن هنا لخدمتكم في قلب قرية الحاضر. زوروا مكتبنا أو تواصلوا معنا عبر الهاتف
                </p>
              </>
            )}
            {shouldShowLanguage("en") && (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-latin">Contact Us</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-latin">
                  We are here to serve you in the heart of Al-Hader village. Visit our office or contact us by phone
                </p>
              </>
            )}
            {shouldShowLanguage("tr") && (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-latin">Bizimle İletişime Geçin</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-latin">
                  Al-Hader köyünün kalbinde size hizmet etmek için buradayız. Ofisimizi ziyaret edin veya telefonla bizimle iletişime geçin
                </p>
              </>
            )}
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Address */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-border" data-testid="contact-address">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-white text-xl"></i>
                  </div>
                  <div className="flex-1">
                    {shouldShowLanguage("ar") && (
                      <>
                        <h3 className="font-bold text-lg mb-2">عنواننا</h3>
                        <p className="text-muted-foreground">المحللق الجنوبي، شارع السربيس<br/>مدينة حلب، سوريا</p>
                      </>
                    )}
                    {shouldShowLanguage("en") && (
                      <>
                        <h3 className="font-bold text-lg mb-2 font-latin">Our Address</h3>
                        <p className="text-muted-foreground font-latin">Al-Mahallak Al-Janoubi, Al-Sarbis Street<br/>Aleppo City, Syria</p>
                      </>
                    )}
                    {shouldShowLanguage("tr") && (
                      <>
                        <h3 className="font-bold text-lg mb-2 font-latin">Adresimiz</h3>
                        <p className="text-muted-foreground font-latin">Al-Mahallak Al-Janoubi, Al-Sarbis Caddesi<br/>Halep, Suriye</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Working Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-border" data-testid="contact-hours">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-white text-xl"></i>
                  </div>
                  <div className="flex-1">
                    {shouldShowLanguage("ar") && (
                      <>
                        <h3 className="font-bold text-lg mb-2">أوقات العمل</h3>
                        <p className="text-muted-foreground">
                          السبت - الخميس: ٨:٠٠ صباحاً - ٥:٠٠ مساءً<br/>
                          الجمعة: مغلق
                        </p>
                      </>
                    )}
                    {shouldShowLanguage("en") && (
                      <>
                        <h3 className="font-bold text-lg mb-2 font-latin">Working Hours</h3>
                        <p className="text-muted-foreground font-latin">
                          Saturday - Thursday: 8:00 AM - 5:00 PM<br/>
                          Friday: Closed
                        </p>
                      </>
                    )}
                    {shouldShowLanguage("tr") && (
                      <>
                        <h3 className="font-bold text-lg mb-2 font-latin">Çalışma Saatleri</h3>
                        <p className="text-muted-foreground font-latin">
                          Cumartesi - Perşembe: 08:00 - 17:00<br/>
                          Cuma: Kapalı
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Contact Methods */}
              <div className="grid sm:grid-cols-3 gap-4">
                <a href="tel:+905355002504" className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all text-center group" data-testid="contact-phone">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <i className="fas fa-phone text-white text-xl"></i>
                  </div>
                  {shouldShowLanguage("ar") && <h4 className="font-bold mb-2">اتصل بنا</h4>}
                  {shouldShowLanguage("en") && <h4 className="font-bold mb-2 font-latin">Call Us</h4>}
                  {shouldShowLanguage("tr") && <h4 className="font-bold mb-2 font-latin">Arayın</h4>}
                  <p className="text-sm text-muted-foreground">+90 535 500 25 04</p>
                </a>
                
                <a href="https://wa.me/905355002504" className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all text-center group" data-testid="contact-whatsapp">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <i className="fab fa-whatsapp text-white text-xl"></i>
                  </div>
                  <h4 className="font-bold mb-2">WhatsApp</h4>
                  <p className="text-sm text-muted-foreground">+90 535 500 25 04</p>
                </a>
                
                <a href="https://t.me/alhaderfinancial" className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all text-center group" data-testid="contact-telegram">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <i className="fab fa-telegram text-white text-xl"></i>
                  </div>
                  <h4 className="font-bold mb-2">Telegram</h4>
                  <p className="text-sm text-muted-foreground">@alhaderfinancial</p>
                </a>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border" data-testid="contact-map">
              {shouldShowLanguage("ar") && <h3 className="font-bold text-lg mb-4">موقعنا على الخريطة</h3>}
              {shouldShowLanguage("en") && <h3 className="font-bold text-lg mb-4 font-latin">Our Location</h3>}
              {shouldShowLanguage("tr") && <h3 className="font-bold text-lg mb-4 font-latin">Konumumuz</h3>}
              
              <div className="w-full h-80 bg-secondary rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-br from-primary to-accent"></div>
                </div>
                <div className="relative text-center">
                  <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <i className="fas fa-map-marker-alt text-white text-2xl"></i>
                  </div>
                  {shouldShowLanguage("ar") && (
                    <>
                      <h4 className="font-bold text-lg">المحللق الجنوبي</h4>
                      <p className="text-muted-foreground">حلب، سوريا</p>
                    </>
                  )}
                  {shouldShowLanguage("en") && (
                    <>
                      <h4 className="font-bold text-lg font-latin">Al-Mahallak Al-Janoubi</h4>
                      <p className="text-muted-foreground font-latin">Aleppo, Syria</p>
                    </>
                  )}
                  {shouldShowLanguage("tr") && (
                    <>
                      <h4 className="font-bold text-lg font-latin">Al-Mahallak Al-Janoubi</h4>
                      <p className="text-muted-foreground font-latin">Halep, Suriye</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center">
                  <i className="fas fa-exchange-alt text-white text-xl"></i>
                </div>
                {shouldShowLanguage("ar") && <div className="font-bold text-xl">مكتب الحاضر المالي</div>}
                {shouldShowLanguage("en") && <div className="font-bold text-xl font-latin">Al-Hader Financial</div>}
                {shouldShowLanguage("tr") && <div className="font-bold text-xl font-latin">Al-Hader Mali</div>}
              </div>
              {shouldShowLanguage("ar") && (
                <p className="text-background/80 mb-4">
                  مكتبكم الموثوق للحوالات المالية وصرافة العملات في قلب قرية الحاضر. نخدم مجتمعنا منذ سنوات بأعلى معايير الجودة والثقة.
                </p>
              )}
              {shouldShowLanguage("en") && (
                <p className="text-background/80 mb-4 font-latin">
                  Your trusted office for financial transfers and currency exchange in the heart of Al-Hader village. We have been serving our community for years with the highest standards of quality and trust.
                </p>
              )}
              {shouldShowLanguage("tr") && (
                <p className="text-background/80 mb-4 font-latin">
                  Al-Hader köyünün kalbinde mali transferler ve döviz bozdurma için güvenilir ofisiniz. Yıllardır topluluğumuza en yüksek kalite ve güven standartlarıyla hizmet veriyoruz.
                </p>
              )}
            </div>
            
            {/* Quick Links */}
            <div>
              {shouldShowLanguage("ar") && <h4 className="font-bold text-lg mb-4">روابط سريعة</h4>}
              {shouldShowLanguage("en") && <h4 className="font-bold text-lg mb-4 font-latin">Quick Links</h4>}
              {shouldShowLanguage("tr") && <h4 className="font-bold text-lg mb-4 font-latin">Hızlı Bağlantılar</h4>}
              <ul className="space-y-2">
                <li>
                  <a href="#hero" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-home">
                    {shouldShowLanguage("ar") && "الرئيسية"}
                    {shouldShowLanguage("en") && <span className="font-latin">Home</span>}
                    {shouldShowLanguage("tr") && <span className="font-latin">Ana Sayfa</span>}
                  </a>
                </li>
                <li>
                  <a href="#rates" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-rates">
                    {shouldShowLanguage("ar") && "أسعار الصرف"}
                    {shouldShowLanguage("en") && <span className="font-latin">Exchange Rates</span>}
                    {shouldShowLanguage("tr") && <span className="font-latin">Döviz Kurları</span>}
                  </a>
                </li>
                <li>
                  <a href="#trust" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-trust">
                    {shouldShowLanguage("ar") && "لماذا نحن"}
                    {shouldShowLanguage("en") && <span className="font-latin">Why Us</span>}
                    {shouldShowLanguage("tr") && <span className="font-latin">Neden Biz</span>}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-contact">
                    {shouldShowLanguage("ar") && "اتصل بنا"}
                    {shouldShowLanguage("en") && <span className="font-latin">Contact Us</span>}
                    {shouldShowLanguage("tr") && <span className="font-latin">Bize Ulaşın</span>}
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              {shouldShowLanguage("ar") && <h4 className="font-bold text-lg mb-4">معلومات الاتصال</h4>}
              {shouldShowLanguage("en") && <h4 className="font-bold text-lg mb-4 font-latin">Contact Info</h4>}
              {shouldShowLanguage("tr") && <h4 className="font-bold text-lg mb-4 font-latin">İletişim Bilgileri</h4>}
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 space-x-reverse">
                  <i className="fas fa-phone text-accent"></i>
                  <span className="text-background/80">+90 535 500 25 04</span>
                </li>
                <li className="flex items-center space-x-3 space-x-reverse">
                  <i className="fab fa-whatsapp text-accent"></i>
                  <span className="text-background/80">+90 535 500 25 04</span>
                </li>
                <li className="flex items-center space-x-3 space-x-reverse">
                  <i className="fas fa-map-marker-alt text-accent"></i>
                  {shouldShowLanguage("ar") && <span className="text-background/80">المحللق الجنوبي، حلب</span>}
                  {shouldShowLanguage("en") && <span className="text-background/80 font-latin">Al-Mahallak Al-Janoubi, Aleppo</span>}
                  {shouldShowLanguage("tr") && <span className="text-background/80 font-latin">Al-Mahallak Al-Janoubi, Halep</span>}
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            {shouldShowLanguage("ar") && (
              <p className="text-background/60 text-sm">
                © 2024 مكتب الحاضر المالي. جميع الحقوق محفوظة.
              </p>
            )}
            {shouldShowLanguage("en") && (
              <p className="text-background/60 text-sm font-latin">
                © 2024 Al-Hader Financial Office. All rights reserved.
              </p>
            )}
            {shouldShowLanguage("tr") && (
              <p className="text-background/60 text-sm font-latin">
                © 2024 Al-Hader Mali Ofis. Tüm hakları saklıdır.
              </p>
            )}
            
            {/* Language Selector in Footer */}
            <div className="flex items-center space-x-4 space-x-reverse mt-4 md:mt-0">
              {shouldShowLanguage("ar") && <span className="text-background/60 text-sm">اللغة:</span>}
              {shouldShowLanguage("en") && <span className="text-background/60 text-sm font-latin">Language:</span>}
              {shouldShowLanguage("tr") && <span className="text-background/60 text-sm font-latin">Dil:</span>}
              <select 
                value={currentLanguage}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-background/10 border border-background/20 rounded-lg px-3 py-1 text-sm text-background focus:outline-none focus:ring-2 focus:ring-accent/50"
                data-testid="footer-language-selector"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
                <option value="tr">Türkçe</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
