import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Leaf, ShieldCheck, HeartPulse, Phone, Mail, MapPin, ChevronDown, Star, Award, Users, Droplets, Zap, Activity, User, Sun, Sparkles, FlaskConical, Package, Factory, Recycle } from 'lucide-react';

// --- Translation Data ---
const translations = {
  en: {
    nav: { home: "Home", about: "About", benefits: "Benefits", dosage: "Dosage", contact: "Contact", order: "Order Now" },
    hero: {
      tagline: "Nature's Blessing... Health's Solution...",
      title: "Jeevan Samruddhi Spirulina",
      subtitle: "21st Century Sanjeevani - Medicine made from Natural Algae",
      description: "Spirulina is a microscopic blue-green algae consumed for centuries. Packed with essential nutrients, it is cultivated with care by farmer Tushar Thube in Nashik. The algae is harvested, washed, dried, and carefully processed into medicine form, then delivered straight from our farm to your home.",
      cta: "Order Now",
      cta2: "Learn More",
      scroll: "Scroll to explore"
    },
    about: {
      title: "About Spirulina",
      p1: "Spirulina is a microscopic blue-green algae that has been consumed for centuries. It is packed with essential nutrients, making it one of the most potent superfoods on Earth.",
      p2: "Our Spirulina is cultivated with care by farmer Tushar Thube in the fertile lands of Vadner Bhairav, Nashik. The algae is harvested, washed, dried, and processed into tablet form. We deliver nature's goodness straight from our farm to your home.",
      stats: { protein: "Protein", iron: "Iron", calcium: "Calcium", betacarotene: "Beta Carotene" },
      processTitle: "From Algae to Medicine",
      process: [
        { title: "Cultivation", desc: "Algae grown in high-alkaline water" },
        { title: "Harvesting", desc: "Separated from water using filters" },
        { title: "Processing", desc: "Washed, dried, and ground into powder" },
        { title: "Tableting", desc: "Pressed into easy-to-consume tablets" }
      ]
    },
    benefits: {
      title: "Why Spirulina?",
      subtitle: "Discover the incredible health benefits",
      list: [
        { title: "Boosts Immunity", desc: "Fights against diabetes, blood pressure, and improves resistance power." },
        { title: "Improves Hemoglobin", desc: "High iron content helps increase hemoglobin levels in the blood." },
        { title: "Manages Weight", desc: "Gamma Linolenic acid helps reduce extra fat accumulated in the body." },
        { title: "Anti-Aging", desc: "Superoxide Dismutase (SOD) keeps skin wrinkle-free and youthful." },
        { title: "Controls Blood Sugar", desc: "Helps regulate blood sugar levels naturally." },
        { title: "Eye Health", desc: "High beta-carotene reduces night-blindness and other optical problems." }
      ]
    },
    dosage: {
      title: "Dosage & Usage",
      subtitle: "How to consume Spirulina for best results",
      adults: "Adults", adultsDose: "1 or 2 Tablets, 1 hour before meals",
      children: "Children", childrenDose: "1 Tablet, 1 hour before meals",
      pregnant: "Pregnant Women", pregnantDose: "1-2 Tablets after meals",
      note: "Spirulina is 100% Vegetarian, Natural, and has NO side effects."
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Order your bottle today or visit our farm",
      name: "Tushar Thube", role: "Owner & Farmer",
      address: "Gat No. 919, Vadner Bhairav, Tal-Chandwad, Dist-Nashik, Maharashtra - 423111",
      phone: "+91 8668950743",
      email: "gfenergee@gmail.com",
      form: { name: "Your Name", phone: "Phone Number", message: "Message", submit: "Send Inquiry" }
    },
    footer: { rights: "All rights reserved.", made: "Made with ❤️ in Nashik" }
  },
  hi: {
    nav: { home: "होम", about: "परिचय", benefits: "फायदे", dosage: "खुराक", contact: "संपर्क", order: "अभी ऑर्डर करें" },
    hero: {
      tagline: "प्रकृति का वरदान... स्वास्थ्य का समाधान...",
      title: "जीवन समृद्धि स्पिरुलिना",
      subtitle: "21वीं सदी की संजीवनी - प्राकृतिक शैवाल से बनी दवा",
      description: "स्पिरुलिना एक सूक्ष्म नीला-हरा शैवाल है जिसका सेवन सदियों से किया जाता रहा है। आवश्यक पोषक तत्वों से भरपूर, इसे किसान तुषार ठुबे द्वारा नासिक में सावधानीपूर्वक उगाया जाता है। शैवाल को काटा जाता है, धोया जाता है, सुखाया जाता है और सावधानीपूर्वक दवा के रूप में तैयार किया जाता है, फिर सीधे हमारे खेत से आपके घर पहुंचाया जाता है।",
      cta: "अभी ऑर्डर करें", cta2: "और जानें", scroll: "जानने के लिए स्क्रॉल करें"
    },
    about: {
      title: "स्पिरुलिना के बारे में",
      p1: "स्पिरुलिना एक सूक्ष्म नीला-हरा शैवाल है जिसका सेवन सदियों से किया जाता रहा है। यह आवश्यक पोषक तत्वों से भरपूर है।",
      p2: "हमारी स्पिरुलिना किसान तुषार ठुबे द्वारा नासिक के वडनेर भैरव की उपजाऊ भूमि में सावधानीपूर्वक उगाई जाती है। शैवाल को काटा जाता है, धोया जाता है, सुखाया जाता है और गोली के रूप में तैयार किया जाता है।",
      stats: { protein: "प्रोटीन", iron: "आयरन", calcium: "कैल्शियम", betacarotene: "बीटा कैरोटीन" },
      processTitle: "शैवाल से दवा तक",
      process: [
        { title: "खेती", desc: "उच्च क्षारीय पानी में शैवाल उगाया जाता है" },
        { title: "कटाई", desc: "फिल्टर का उपयोग करके पानी से अलग किया जाता है" },
        { title: "प्रसंस्करण", desc: "धोया, सुखाया और पाउडर में पीसा जाता है" },
        { title: "गोली बनाना", desc: "आसानी से सेवन करने के लिए गोलियों में दबाया जाता है" }
      ]
    },
    benefits: {
      title: "स्पिरुलिना क्यों?", subtitle: "अविश्वसनीय स्वास्थ्य लाभों की खोज करें",
      list: [
        { title: "प्रतिरक्षा बढ़ाता है", desc: "मधुमेह, रक्तचाप से लड़ता है और प्रतिरोधक क्षमता में सुधार करता है।" },
        { title: "हीमोग्लोबिन में सुधार", desc: "उच्च आयरन सामग्री रक्त में हीमोग्लोबिन के स्तर को बढ़ाने में मदद करती है।" },
        { title: "वजन प्रबंधन", desc: "गामा लिनोलेनिक एसिड शरीर में जमा अतिरिक्त वसा को कम करने में मदद करता है।" },
        { title: "एंटी-एजिंग", desc: "सुपरऑक्साइड डिसम्यूटेज (SOD) त्वचा को झुर्रियों से मुक्त रखता है।" },
        { title: "रक्त शर्करा नियंत्रण", desc: "प्राकृतिक रूप से रक्त शर्करा के स्तर को नियंत्रित करने में मदद करता है।" },
        { title: "आंखों की सेहत", desc: "उच्च बीटा-कैरोटीन रतौंधी और अन्य दृष्टि समस्याओं को कम करता है।" }
      ]
    },
    dosage: {
      title: "खुराक और उपयोग", subtitle: "सर्वोत्तम परिणामों के लिए स्पिरुलिना कैसे लें",
      adults: "वयस्क", adultsDose: "1 या 2 गोलियाँ, भोजन से 1 घंटा पहले",
      children: "बच्चे", childrenDose: "1 गोली, भोजन से 1 घंटा पहले",
      pregnant: "गर्भवती महिलाएं", pregnantDose: "भोजन के बाद 1-2 गोलियाँ",
      note: "स्पिरुलिना 100% शाकाहारी, प्राकृतिक है, और इसका कोई साइड इफेक्ट नहीं है।"
    },
    contact: {
      title: "संपर्क करें", subtitle: "आज ही अपनी बोतल ऑर्डर करें या हमारे फार्म पर आएं",
      name: "तुषार ठुबे", role: "मालिक और किसान",
      address: "गट नं. 919, वडनेर भैरव, ता. चांदवड, जि. नासिक, महाराष्ट्र - 423111",
      phone: "+91 8668950743", email: "gfenergee@gmail.com",
      form: { name: "आपका नाम", phone: "फोन नंबर", message: "संदेश", submit: "पूछताछ भेजें" }
    },
    footer: { rights: "सर्वाधिकार सुरक्षित।", made: "नासिक में ❤️ के साथ निर्मित" }
  },
  mr: {
    nav: { home: "मुख्यपृष्ठ", about: "आमच्याबद्दल", benefits: "फायदे", dosage: "सेवन पद्धत", contact: "संपर्क", order: "आता ऑर्डर करा" },
    hero: {
      tagline: "निसर्गाचे वरदान... आरोग्याचे समाधान...",
      title: "जीवन समृद्धी स्पिरुलिना",
      subtitle: "२१ व्या शतकातील संजीवनी - नैसर्गिक शेवाळापासून बनवलेले औषध",
      description: "स्पिरुलिना हे एक सूक्ष्म निळसर-हिरवे शेवाळ आहे जे शतकानुशतके सेवन केले जात आहे. हे आवश्यक पोषक तत्वांनी भरपूर आहे. आमच्या शेतात तुषार ठुबे यांच्याकडून हे शेवाळ काळजीपूर्वक पिकवले जाते, त्यानंतर ते धुवून, वाळवून आणि औषधाच्या स्वरूपात तयार केले जाते. हे नैसर्गिक शेवाळ थेट तुमच्या घरी पोहोचवले जाते.",
      cta: "आता ऑर्डर करा", cta2: "अधिक जाणून घ्या", scroll: "अधिक जाणून घेण्यासाठी स्क्रोल करा"
    },
    about: {
      title: "स्पिरुलिना बद्दल",
      p1: "स्पिरुलिना हे एक सूक्ष्म निळसर-हिरवे शेवाळ आहे जे शतकानुशतके सेवन केले जात आहे. हे आवश्यक पोषक तत्वांनी भरपूर आहे.",
      p2: "आमची स्पिरुलिना शेतकरी तुषार ठुबे यांच्याकडून नाशिकच्या वडनेर भैरव येथील सुपीक जमिनीत काळजीपूर्वक पिकवली जाते. शेवाळ धुवून, वाळवून आणि गोळीच्या स्वरूपात तयार केले जाते.",
      stats: { protein: "प्रोटीन", iron: "लोह", calcium: "कॅल्शियम", betacarotene: "बीटा कॅरोटीन" },
      processTitle: "शेवाळापासून औषधापर्यंत",
      process: [
        { title: "लागवड", desc: "उच्च क्षारता असलेल्या पाण्यात शेवाळ वाढवले जाते" },
        { title: "कापणी", desc: "फिल्टर वापरून पाण्यापासून वेगळे केले जाते" },
        { title: "प्रक्रिया", desc: "धुवून, वाळवून आणि पावडरमध्ये बारीक केले जाते" },
        { title: "गोळी निर्मिती", desc: "सहज खाण्यासाठी गोळ्यांच्या स्वरूपात दाबले जाते" }
      ]
    },
    benefits: {
      title: "स्पिरुलिना का?", subtitle: "अविश्वसनीय आरोग्य फायदे शोधा",
      list: [
        { title: "प्रतिकारशक्ती वाढवते", desc: "मधुमेह, रक्तदाबाशी लढा देते आणि प्रतिकारशक्ती सुधारते." },
        { title: "हिमोग्लोबिन सुधारते", desc: "उच्च लोह सामग्री रक्तातील हिमोग्लोबिनची पातळी वाढविण्यास मदत करते." },
        { title: "वजन नियंत्रण", desc: "गामा लिनोलेनिक ऍसिड शरीरात जमा झालेले अतिरिक्त चरबी कमी करण्यास मदत करते." },
        { title: "अँटी-एजिंग", desc: "सुपरऑक्साइड डिस्म्युटेज (SOD) त्वचा सुरकुत्या-मुक्त आणि तरुण ठेवते." },
        { title: "रक्तशर्करा नियंत्रण", desc: "नैसर्गिकरित्या रक्तातील साखरेची पातळी नियंत्रित करण्यास मदत करते." },
        { title: "डोळ्यांचे आरोग्य", desc: "उच्च बीटा-कॅरोटीन रातांधळेपणा आणि इतर दृष्टी समस्या कमी करते." }
      ]
    },
    dosage: {
      title: "सेवन पद्धत", subtitle: "सर्वोत्तम परिणामांसाठी स्पिरुलिना कसे घ्यावे",
      adults: "प्रौढ", adultsDose: "१ किंवा २ गोळ्या, जेवणाच्या १ तास आधी",
      children: "मुले", childrenDose: "१ गोळी, जेवणाच्या १ तास आधी",
      pregnant: "गर्भवती महिला", pregnantDose: "जेवणानंतर १-२ गोळ्या",
      note: "स्पिरुलिना १००% शाकाहारी, नैसर्गिक आहे आणि त्याचे कोणतेही दुष्परिणाम नाहीत."
    },
    contact: {
      title: "संपर्क साधा", subtitle: "आजच तुमची बाटली ऑर्डर करा किंवा आमच्या शेतात भेट द्या",
      name: "तुषार ठुबे", role: "मालक आणि शेतकरी",
      address: "गट नं. ९१९, वडनेर भैरव, ता. चांदवड, जि. नाशिक, महाराष्ट्र - ४२३१११",
      phone: "+९१ ८६६८९५०७४३", email: "gfenergee@gmail.com",
      form: { name: "तुमचे नाव", phone: "फोन नंबर", message: "संदेश", submit: "चौकशी पाठवा" }
    },
    footer: { rights: "सर्व हक्क राखीव.", made: "नाशिकमध्ये ❤️ ने बनवलेले" }
  }
};

// --- Bottle Component (Stylized CSS Bottle) ---
const BottleGraphic = () => (
  <div className="relative w-48 h-72 md:w-56 md:h-80 mx-auto">
    {/* Bottle Cap */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-10 bg-gradient-to-b from-gray-200 to-gray-400 rounded-t-lg border-b-2 border-gray-500 z-20 shadow-md"></div>
    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-24 h-3 bg-gray-300 rounded-sm z-20"></div>
    
    {/* Bottle Neck */}
    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-r from-gray-100 via-white to-gray-200 z-10"></div>
    
    {/* Bottle Body */}
    <div className="absolute top-16 left-0 w-full h-[calc(100%-4rem)] bg-gradient-to-br from-white via-emerald-50 to-emerald-100 rounded-3xl shadow-2xl border border-white overflow-hidden z-10">
      {/* Label */}
      <div className="absolute inset-x-3 top-16 bottom-16 bg-gradient-to-b from-emerald-600 via-emerald-700 to-emerald-800 rounded-2xl p-4 flex flex-col items-center justify-center text-white shadow-inner">
        <Leaf className="w-8 h-8 mb-2" />
        <p className="text-[10px] font-bold tracking-widest opacity-80">JEEVAN SAMRUDDHI</p>
        <p className="text-lg font-extrabold text-center leading-tight my-1">SPIRULINA</p>
        <p className="text-[9px] tracking-wider opacity-90">NATURAL SUPER FOOD</p>
        <div className="mt-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
          <p className="text-[10px] font-semibold">500 MG • 60 TABS</p>
        </div>
      </div>
      
      {/* Reflection */}
      <div className="absolute top-0 right-4 w-8 h-full bg-gradient-to-b from-white/60 via-white/10 to-transparent rounded-full blur-sm"></div>
    </div>

    {/* Shadow */}
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-6 bg-emerald-900/30 rounded-full blur-xl"></div>
  </div>
);

const Navbar = ({ lang, setLang, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false); // ✅ नवीन state
  const langRef = useRef(null); // ✅ outside click detect करण्यासाठी

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Outside click वर dropdown बंद करणे
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'benefits', href: '#benefits' },
    { key: 'dosage', href: '#dosage' },
    { key: 'contact', href: '#contact' },
  ];

  const langLabels = { mr: 'मराठी', hi: 'हिंदी', en: 'English' };

  const handleLangSelect = (l) => {
    setLang(l);
    setLangOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 flex-shrink-0">
  <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-1.5 sm:p-2 rounded-xl shadow-md">
    <Leaf className="text-white w-5 h-5 sm:w-6 sm:h-6" />
  </div>
  <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-emerald-800 whitespace-nowrap">
    Jeevan Samruddhi
  </span>
</div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.key} href={item.href} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors relative group">
                {t.nav[item.key]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* ✅ Language Switcher — Click वर उघडतो */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-gray-700 font-medium px-3 py-2 rounded-full hover:bg-emerald-50 transition-all active:bg-emerald-100"
                aria-label="Select language"
              >
                <span className="text-sm sm:text-base">{langLabels[lang]}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-2xl overflow-hidden border border-emerald-100 z-50"
                  >
                    {['mr', 'hi', 'en'].map((l) => (
                      <button
                        key={l}
                        onClick={() => handleLangSelect(l)}
                        className={`block w-full text-left px-4 py-3 text-sm transition-all ${
                          lang === l
                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 font-bold'
                            : 'text-gray-700 hover:bg-emerald-50'
                        }`}
                      >
                        {langLabels[l]}
                        {lang === l && <span className="ml-2 text-emerald-500">✓</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#contact" className="hidden sm:block bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-xl hover:shadow-emerald-500/40 transition-all hover:-translate-y-0.5">
              {t.nav.order}
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 p-2"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-emerald-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-emerald-50 rounded-lg font-medium"
                >
                  {t.nav[item.key]}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-full font-medium mt-4"
              >
                {t.nav.order}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Hero ---
const Hero = ({ t }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bottleRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const bottleScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #fef3c7 30%, #fed7aa 50%, #a7f3d0 75%, #d1fae5 100%)' }}>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-400/15 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/3 w-72 h-72 bg-sky-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-rose-400/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <motion.div style={{ y: textY }} className="text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold tracking-wide uppercase text-xs px-4 py-2 rounded-full mb-4 shadow-lg"
          >
            ✨ {t.hero.tagline}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-emerald-900"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-emerald-700 mb-4 font-semibold"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-base text-gray-700 mb-8 leading-relaxed"
          >
            {t.hero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <a href="#contact" className="inline-block bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              {t.hero.cta}
            </a>
            <a href="#about" className="inline-block bg-white text-emerald-600 border-2 border-emerald-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-500 hover:text-white transition-all shadow-lg">
              {t.hero.cta2}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: bottleY, rotate: bottleRotate, scale: bottleScale }}
          className="flex justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
            className="relative"
          >
            <BottleGraphic />

            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -left-16 top-10 bg-gradient-to-br from-sky-400 to-blue-500 p-3 rounded-2xl shadow-lg">
              <ShieldCheck className="text-white w-6 h-6" />
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -right-16 bottom-20 bg-gradient-to-br from-rose-400 to-pink-500 p-3 rounded-2xl shadow-lg">
              <HeartPulse className="text-white w-6 h-6" />
            </motion.div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5 }} className="absolute -right-14 top-10 bg-gradient-to-br from-amber-400 to-yellow-500 p-3 rounded-2xl shadow-lg">
              <Sun className="text-white w-6 h-6" />
            </motion.div>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 4.5 }} className="absolute -left-14 bottom-10 bg-gradient-to-br from-purple-400 to-sky-500 p-3 rounded-2xl shadow-lg">
              <Sparkles className="text-white w-6 h-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// --- About ---
const About = ({ t }) => {
  const statColors = [
    'from-emerald-500 to-teal-500',
    'from-rose-500 to-pink-500',
    'from-sky-500 to-cyan-500',
    'from-amber-500 to-yellow-500'
  ];

  const processIcons = [FlaskConical, Recycle, Package, Factory];

  return (
    <section id="about" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #ecfdf5 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-emerald-900">
              {t.about.title}
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">{t.about.p1}</p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">{t.about.p2}</p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: t.about.stats.protein, value: "55-72%" },
                { label: t.about.stats.iron, value: "500% More" },
                { label: t.about.stats.calcium, value: "500% More" },
                { label: t.about.stats.betacarotene, value: "1000% More" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-br ${statColors[i]} p-4 rounded-2xl shadow-lg text-white`}
                >
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm font-medium opacity-95">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] p-8 flex items-center justify-center shadow-2xl relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #a7f3d0 0%, #10b981 40%, #14b8a6 70%, #0891b2 100%)' }}>
              <div className="text-center relative z-10 text-white">
                <Award className="w-24 h-24 mx-auto mb-6 drop-shadow-lg" />
                <h3 className="text-3xl font-bold mb-2 drop-shadow">WHO Certified</h3>
                <p className="opacity-95 mb-8">Declared as "Food for Future"</p>
                <div className="flex justify-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-md border border-white/30"><Users className="w-6 h-6" /></div>
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-md border border-white/30"><Droplets className="w-6 h-6" /></div>
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-md border border-white/30"><Zap className="w-6 h-6" /></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-24"
        >
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-12 text-emerald-900">
            {t.about.processTitle}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.process.map((step, i) => {
              const Icon = processIcons[i];
              const gradients = [
                'from-emerald-400 to-teal-500',
                'from-sky-400 to-blue-500',
                'from-amber-400 to-orange-500',
                'from-purple-400 to-pink-500'
              ];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 text-center relative"
                >
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                    {i + 1}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Benefits ---
const Benefits = ({ t }) => {
  const icons = [ShieldCheck, Activity, HeartPulse, Star, Droplets, Zap];
  const gradients = [
    'from-emerald-500 to-teal-500',
    'from-rose-500 to-pink-500',
    'from-sky-500 to-cyan-500',
    'from-amber-500 to-yellow-500',
    'from-violet-500 to-purple-500',
    'from-lime-500 to-green-500'
  ];

  return (
    <section id="benefits" className="py-24 relative"
      style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fed7aa 50%, #fffbeb 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-emerald-900">
            {t.benefits.title}
          </h2>
          <p className="text-xl text-emerald-700">{t.benefits.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.benefits.list.map((benefit, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform relative z-10`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3 relative z-10">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed relative z-10">{benefit.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Dosage ---
const Dosage = ({ t }) => {
  const cards = [
    { title: t.dosage.adults, desc: t.dosage.adultsDose, icon: User, gradient: 'from-sky-400 via-blue-500 to-indigo-500' },
    { title: t.dosage.children, desc: t.dosage.childrenDose, icon: Users, gradient: 'from-emerald-400 via-green-500 to-teal-500' },
    { title: t.dosage.pregnant, desc: t.dosage.pregnantDose, icon: HeartPulse, gradient: 'from-pink-400 via-rose-500 to-red-500' }
  ];

  return (
    <section id="dosage" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #e0f2fe 100%)' }}>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-emerald-900">
            {t.dosage.title}
          </h2>
          <p className="text-xl text-gray-700">{t.dosage.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-white border border-gray-100 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${item.gradient}`}></div>
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg bg-gradient-to-br ${item.gradient}`}>
                <item.icon size={36} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 rounded-2xl p-6 text-center max-w-2xl mx-auto shadow-lg"
          style={{ background: 'linear-gradient(90deg, #fef3c7 0%, #fde68a 50%, #fef3c7 100%)' }}
        >
          <p className="text-yellow-900 font-bold flex items-center justify-center gap-2 text-lg">
            <Star className="w-5 h-5 fill-yellow-600 text-yellow-600" />
            {t.dosage.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// --- Contact ---
const Contact = ({ t }) => {
  return (
    <section id="contact" className="py-24 text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #064e3b 0%, #1b5e3f 40%, #0891b2 100%)' }}>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            {t.contact.title}
          </h2>
          <p className="text-xl text-emerald-100">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-4 rounded-2xl shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{t.contact.name}</h3>
                <p className="text-emerald-200">{t.contact.role}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-4 rounded-2xl shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <p className="text-lg text-gray-100 leading-relaxed">{t.contact.address}</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-sky-400 to-blue-500 p-4 rounded-2xl shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-medium">{t.contact.phone}</p>
                <p className="text-sm text-emerald-200">Mon-Sat, 9AM - 6PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-rose-400 to-pink-500 p-4 rounded-2xl shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <p className="text-lg font-medium">{t.contact.email}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form.name}</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all text-gray-900" placeholder={t.contact.form.name} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form.phone}</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/20 outline-none transition-all text-gray-900" placeholder={t.contact.form.phone} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form.message}</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all resize-none text-gray-900" placeholder={t.contact.form.message}></textarea>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-emerald-500/40 transition-all hover:-translate-y-0.5">
                {t.contact.form.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = ({ t }) => {
  return (
    <footer className="text-white py-8 border-t border-white/10"
      style={{ background: 'linear-gradient(90deg, #064e3b 0%, #1b5e3f 50%, #064e3b 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-1.5 rounded-lg">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-emerald-200">
            Jeevan Samruddhi Spirulina
          </span>
        </div>
        <p className="text-sm text-gray-300">© {new Date().getFullYear()} {t.contact.name}. {t.footer.rights}</p>
        <p className="text-sm text-gray-300 flex items-center gap-1">{t.footer.made}</p>
      </div>
    </footer>
  );
};

// --- Main App ---
function App() {
  const [lang, setLang] = useState('mr');
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => document.documentElement.style.scrollBehavior = 'auto';
  }, []);

  return (
    <div className="min-h-screen bg-white font-marathi">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <About t={t} />
      <Benefits t={t} />
      <Dosage t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}

export default App;