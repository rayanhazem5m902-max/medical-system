import { useState } from 'react';
import { User, Lock, Eye, EyeOff, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
type Lang = 'en' | 'ar';

const translations: Record<Lang, Record<string, string>> = {
  en: {
    portalTitle: 'Al-Amal Hospital Management',
    portalDesc: 'A comprehensive hospital management system designed to assist doctors and streamline medical department management with high efficiency.',
    signIn: 'Sign In',
    signInDesc: 'Enter your credentials to continue',
    username: 'Username',
    usernamePlaceholder: 'Enter your username',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    forgotPassword: 'Forgot Password?',
    login: 'Login',
    or: 'or',
    signUp: 'Sign up',
    langLabel: 'العربية',
    invalidCredentials: 'Invalid credentials! Please check your username and password.',
    noAccount: "Don't have an account?",
    managementExcellence: 'Management Excellence',
  },
  ar: {
    portalTitle: 'نظام الأمل لإدارة المستشفيات',
    portalDesc: 'نظام متكامل لإدارة المستشفيات مصمم لمساعدة الأطباء وتسهيل إدارة الأقسام الطبية بكفاءة عالية واحترافية.',
    signIn: 'تسجيل الدخول',
    signInDesc: 'أدخل بياناتك للمتابعة',
    username: 'اسم المستخدم',
    usernamePlaceholder: 'أدخل اسم المستخدم',
    password: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    login: 'دخول',
    or: 'أو',
    signUp: 'إنشاء حساب',
    langLabel: 'English',
    invalidCredentials: 'بيانات الدخول غير صحيحة! يرجى التأكد من اسم المستخدم وكلمة المرور.',
    noAccount: "ليس لديك حساب؟",
    managementExcellence: 'تميز في الإدارة',
  },
};

const MedicalIcons = () => {
  return (
    <>
      {/* Stethoscope */}
      <svg
        className="absolute opacity-10 w-32 h-32 text-white animate-float-slow"
        style={{ top: '10%', left: '5%' }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4.892 6.885A3.496 3.496 0 0 1 8.5 4c1.712 0 3.186 1.226 3.45 2.885M12 7.5a3.5 3.5 0 0 1 3.5 3.5v2a3.5 3.5 0 0 1-3.5 3.5M12 16.5v4M9 20.5h6M15.5 15.5a2.5 2.5 0 0 1 2.5 2.5v2a2.5 2.5 0 0 1-2.5 2.5M8.5 15.5A2.5 2.5 0 0 0 6 18v2a2.5 2.5 0 0 0 2.5 2.5" />
      </svg>

      {/* Pills */}
      <svg
        className="absolute opacity-10 w-20 h-20 text-white animate-float-medium"
        style={{ top: '25%', right: '10%' }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M10.5 10.5l-4.5 4.5a2.121 2.121 0 0 0 0 3l1.5 1.5a2.121 2.121 0 0 0 3 0l4.5-4.5M13.5 13.5l4.5-4.5a2.121 2.121 0 0 0 0-3l-1.5-1.5a2.121 2.121 0 0 0-3 0l-4.5 4.5" />
        <path d="M8 16l-2 2M16 8l2-2" />
      </svg>

      {/* Syringe */}
      <svg
        className="absolute opacity-10 w-24 h-24 text-white animate-float-fast"
        style={{ bottom: '20%', left: '15%' }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M18 2l4 4-10 10M21 14l-7 7M14 6l4 4M10 10l4 4M6 14l-4 4M2 18l4 4" />
        <circle cx="12" cy="12" r="2" />
      </svg>

      {/* Heart */}
      <svg
        className="absolute opacity-10 w-28 h-28 text-white animate-float-slow"
        style={{ bottom: '10%', right: '5%' }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>

      {/* Cross/Medical */}
      <svg
        className="absolute opacity-10 w-16 h-16 text-white animate-float-medium"
        style={{ top: '50%', left: '25%' }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="10" />
      </svg>

      {/* DNA */}
      <svg
        className="absolute opacity-10 w-20 h-20 text-white animate-float-fast"
        style={{ top: '60%', right: '15%' }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M2 15c6.667-6 13.333 0 20-6M9 22c1.798-1.998 2.518-3.995 2.807-5.993M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
        <path d="M17 12a5 5 0 1 1-10 0" />
      </svg>
    </>
  );
};

const EKGLine = () => {
  return (
    <svg
      className="absolute w-full h-32 opacity-30"
      style={{ top: '50%', left: '0', transform: 'translateY(-50%)' }}
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="ekgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0 }} />
          <stop offset="50%" style={{ stopColor: 'white', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path
        d="M0,50 L100,50 L120,30 L140,70 L160,50 L300,50 L320,20 L340,80 L360,50 L500,50 L520,10 L540,90 L560,50 L700,50 L720,35 L740,65 L760,50 L900,50 L920,25 L940,75 L960,50 L1100,50 L1200,50"
        fill="none"
        stroke="url(#ekgGradient)"
        strokeWidth="2"
        className="animate-ekg"
      />
    </svg>
  );
};

const Logo = () => {
  return (
    <div className="relative flex items-center justify-center mb-8">
      <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30 animate-pulse-glow"></div>
      <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-6 border border-white/20">
        <svg
          className="w-20 h-20 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </div>
    </div>
  );
};

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [lang, setLang] = useState<Lang>('ar');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[lang];
  const isRTL = lang === 'ar';



  const navigate = useNavigate(); // تعريف أداة التنقل

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من البيانات
    if (username === 'root' && password === 'root') {
      // إذا كانت البيانات صحيحة، انتقل لصفحة السجل الطبي
      navigate('/dashboard');
    } else {
      // إذا كانت خاطئة، أظهر رسالة خطأ داخل الواجهة
      setError(t.invalidCredentials);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-['Cairo']" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Language Toggle Button - Small Globe */}
      <div className="fixed top-4 z-50" style={{ right: isRTL ? 'auto' : '16px', left: isRTL ? '16px' : 'auto' }}>
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="group flex items-center justify-center w-9 h-9 bg-white/90 backdrop-blur-md rounded-full shadow-md hover:shadow-lg border border-gray-200/60 transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Change language"
          >
            <Globe className="w-4 h-4 text-blue-600 transition-transform duration-500 group-hover:rotate-180" />
          </button>

          {/* Dropdown */}
          <div
            className={`absolute top-full mt-1.5 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top ${langMenuOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
            style={{ right: isRTL ? 'auto' : '0', left: isRTL ? '0' : 'auto', minWidth: '140px' }}
          >
            <button
              onClick={() => {
                setLang('en');
                setLangMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs transition-colors duration-200 ${lang === 'en'
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <span className="text-sm">🇺🇸</span>
              <span>English</span>
              {lang === 'en' && (
                <svg className="w-3 h-3 ms-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <div className="border-t border-gray-100"></div>
            <button
              onClick={() => {
                setLang('ar');
                setLangMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs transition-colors duration-200 ${lang === 'ar'
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <span className="text-sm">🇸🇦</span>
              <span>العربية</span>
              {lang === 'ar' && (
                <svg className="w-3 h-3 ms-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {langMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
      )}

      {/* Left Side - Medical Theme */}
      <div
        className="hidden lg:flex lg:w-[60%] relative overflow-hidden flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #2b7de9 0%, #1a4fa0 100%)',
        }}
      >
        <MedicalIcons />
        <EKGLine />

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-12">
          <Logo />
          <h1 className="text-5xl font-black mb-6 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            {t.portalTitle}
          </h1>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform transition-all duration-500 hover:scale-[1.02]">
            <p className="text-xl text-center leading-relaxed font-light italic">
              "{t.portalDesc}"
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 lg:w-[40%] bg-white flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Hero Header */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="bg-blue-600 rounded-full p-4 mb-3 shadow-lg shadow-blue-200">
              <svg
                className="w-10 h-10 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{t.portalTitle}</h1>
            <p className="text-gray-500 text-sm mt-1">{t.portalDesc}</p>
          </div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {t.managementExcellence}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.signIn}</h2>
            <p className="text-gray-500">{t.signInDesc}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                {t.username}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 flex items-center pointer-events-none ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'}`}>
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError(null);
                  }}
                  className={`w-full py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                  placeholder={t.usernamePlaceholder}
                  required
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t.password}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 flex items-center pointer-events-none ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'}`}>
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  className={`w-full py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'}`}
                  placeholder={t.passwordPlaceholder}
                  required
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 flex items-center text-gray-400 hover:text-gray-600 transition-colors ${isRTL ? 'left-0 pl-3' : 'right-0 pr-3'}`}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className={`p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300`}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Forgot Password */}
            <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                {t.forgotPassword}
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              {t.login}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">{t.or}</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t.noAccount}{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                {t.signUp}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

