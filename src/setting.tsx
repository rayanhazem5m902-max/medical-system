import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './setting.css';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  avatar: string;
}

const Setting: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#2b7de9');
  const [secondaryColor, setSecondaryColor] = useState('#1a4fa0');
  const [hospitalName, setHospitalName] = useState('مستشفى الشفاء');
  const [email, setEmail] = useState('info@alshifa-hospital.com');
  const [address, setAddress] = useState('الرياض، المملكة العربية السعودية، حي الملقا');
  const [phone, setPhone] = useState('+966 11 234 5678');
  const [taxNumber, setTaxNumber] = useState('1234567890');
  const [dragActive, setDragActive] = useState(false);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [users] = useState<User[]>([
    { id: 1, name: 'د. أحمد محمد', email: 'ahmed@alshifa.com', role: 'System Admin', joinDate: '2024-01-15', avatar: 'AM' },
    { id: 2, name: 'أ. فاطمة علي', email: 'fatima@alshifa.com', role: 'Doctor', joinDate: '2024-02-20', avatar: 'FA' },
    { id: 3, name: 'م. خالد سعود', email: 'khalid@alshifa.com', role: 'Receptionist', joinDate: '2024-03-10', avatar: 'KS' },
    { id: 4, name: 'أ. سارة عبدالله', email: 'sara@alshifa.com', role: 'Nurse', joinDate: '2024-04-05', avatar: 'SA' },
  ]);

  const menuItems = [
    { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'الرئيسية' },
    { icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', label: 'المرضى' },
    { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'المواعيد' },
    { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'المالية' },
  ];

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: '', show: false }), 3000);
  };

  const handleSave = () => {
    showToast('تم حفظ التغييرات بنجاح!');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    showToast('تم رفع الشعار بنجاح!');
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      showToast('تم اختيار الشعار بنجاح!');
    }
  };

  return (
    <div dir="rtl" className={`min-h-screen transition-colors duration-300 font-['Cairo'] ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 left-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {toast.message}
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`w-20 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg p-4 flex flex-col items-center space-y-6 border-l border-gray-100`}>
          {/* Logo */}
          <div onClick={() => navigate('/dashboard')} className="w-12 h-12 bg-gradient-to-br from-[#2b7de9] to-blue-700 rounded-xl flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>

          <p className={`text-xs font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'} text-center`}>نظام الشفاء</p>

          <div className="w-8 h-px bg-gray-200"></div>

          {/* Navigation Icons */}
          <nav className="flex flex-col space-y-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index === 0) navigate('/dashboard');
                  if (index === 1) navigate('/patients');
                  if (index === 2) navigate('/appointment');
                }}
                className={`p-3 rounded-xl transition-all duration-200 group relative ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-50'}`}
                title={item.label}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity z-50">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="w-8 h-px bg-gray-200"></div>

          {/* System Settings - Active */}
          <button className="p-3 bg-[#2b7de9] text-white rounded-xl shadow-md shadow-blue-200" title="إعدادات النظام">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className={`mt-auto p-3 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'} rounded-xl hover:bg-[#2b7de9] hover:text-white transition-all`}
            title="الرجوع للوحة التحكم"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-[#2b7de9] text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                حفظ التغييرات
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-lg transition-all duration-200 ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                title={darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-left">
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>إعدادات النظام</h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>تخصيص إعدادات النظام الأساسية</p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* General Settings Card */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-2xl shadow-xl p-8 border border-gray-100`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-50 rounded-xl">
                  <svg className="w-6 h-6 text-[#137FEC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>الإعدادات العامة</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>معلومات المستشفى الأساسية</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>اسم المستشفى</label>
                  <input
                    type="text"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-[#137FEC] focus:border-[#137FEC] focus:bg-white transition-all duration-200 outline-none`}
                    placeholder="أدخل اسم المستشفى"
                  />
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>البريد الإلكتروني المؤسسي</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-[#137FEC] focus:border-[#137FEC] focus:bg-white transition-all duration-200 outline-none`}
                    placeholder="email@hospital.com"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>العنوان التفصيلي</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-[#137FEC] focus:border-[#137FEC] focus:bg-white transition-all duration-200 outline-none`}
                    placeholder="أدخل العنوان التفصيلي"
                  />
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>رقم التواصل الرئيسي</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-[#137FEC] focus:border-[#137FEC] focus:bg-white transition-all duration-200 outline-none`}
                    placeholder="+966 XX XXX XXXX"
                  />
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>الرقم الضريبي</label>
                  <input
                    type="text"
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                    className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-[#137FEC] focus:border-[#137FEC] focus:bg-white transition-all duration-200 outline-none`}
                    placeholder="أدخل الرقم الضريبي"
                  />
                </div>
              </div>
            </div>

            {/* Branding Settings Card */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-2xl shadow-xl p-8 border border-gray-100`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-teal-50 rounded-xl">
                  <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div>
                  <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>إعدادات العلامة التجارية</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>تخصيص مظهر النظام</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Upload */}
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>شعار المستشفى</label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${dragActive ? 'border-[#137FEC] bg-blue-50' : darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={handleFileSelect}
                  >
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                    <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-[#137FEC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>اسحب وأفلت الشعار هنا</p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>أو انقر للاختيار من الملفات</p>
                    <p className={`text-xs mt-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>PNG, JPG حتى 2MB</p>
                  </div>
                </div>

                {/* Colors */}
                <div className="space-y-5">
                  <div className="space-y-3">
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>لون السمة الأساسي</label>
                    <div className="flex items-center gap-4">
                      <div className="relative group">
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0"
                        />
                        <div className="absolute inset-0 rounded-xl border-2 border-white shadow-lg pointer-events-none"></div>
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} border rounded-xl font-mono text-sm`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>لون السمة الثانوي</label>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <input
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0"
                        />
                        <div className="absolute inset-0 rounded-xl border-2 border-white shadow-lg pointer-events-none"></div>
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} border rounded-xl font-mono text-sm`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Colors */}
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>ألوان سريعة</label>
                    <div className="flex gap-2 flex-wrap">
                      {['#137FEC', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setPrimaryColor(color)}
                          className={`w-10 h-10 rounded-xl transition-transform hover:scale-110 ${primaryColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography Preview */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>خط الطباعة</label>
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-5`}>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Cairo</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>خط عربي حديث ومقروء - المستخدم في لوحة التحكم</p>
                    </div>
                    <div className={`text-xs ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-white text-gray-600'} px-3 py-1.5 rounded-full shadow-sm`}>
                      مثال: 123abc
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Management Table */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-2xl shadow-xl p-8 border border-gray-100`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-purple-50 rounded-xl">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>إدارة المستخدمين</h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>جميع مستخدمي النظام</p>
                  </div>
                </div>
                <button className="px-5 py-2.5 bg-[#2b7de9] text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-md hover:shadow-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  إضافة مستخدم جديد
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full">
                  <thead>
                    <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-right`}>
                      <th className={`px-6 py-4 text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>المستخدم</th>
                      <th className={`px-6 py-4 text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>البريد الإلكتروني</th>
                      <th className={`px-6 py-4 text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>الدور</th>
                      <th className={`px-6 py-4 text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>تاريخ الانضمام</th>
                      <th className={`px-6 py-4 text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className={`${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'} border-t transition-colors duration-150`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#137FEC] to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                              {user.avatar}
                            </div>
                            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user.name}</span>
                          </div>
                        </td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${user.role === 'System Admin' ? 'bg-purple-100 text-purple-700' : user.role === 'Doctor' ? 'bg-blue-100 text-blue-700' : user.role === 'Nurse' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {user.role === 'System Admin' ? 'مدير النظام' : user.role === 'Doctor' ? 'طبيب' : user.role === 'Nurse' ? 'ممرض' : 'موظف استقبال'}
                          </span>
                        </td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.joinDate}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-[#137FEC]">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-500 hover:text-red-500">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export { Setting };
export default Setting;