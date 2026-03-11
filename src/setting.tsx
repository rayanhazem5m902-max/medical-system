import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Microscope, Pill,
  ClipboardList, UsersRound, Contact2, Briefcase, Warehouse,
  Layers, Wallet, FileText, Coins, Activity,
  Settings, Search, Menu, Globe, Bell, LogOut, ChevronLeft,
  Plus, Trash2, Edit2, CheckCircle2, Moon, Sun, Palette,
  Calendar, Mail, Phone, MapPin, Building2,
  Shield, Camera, Save
} from 'lucide-react';
import { cn } from './utils/cn';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [darkMode, setDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#1a4fa0');
  const [secondaryColor, setSecondaryColor] = useState('#1a4fa0');
  const [hospitalName, setHospitalName] = useState('مستشفى الشفاء');
  const [email, setEmail] = useState('info@alshifa-hospital.com');
  const [address, setAddress] = useState('الرياض، المملكة العربية السعودية، حي الملقا');
  const [phone, setPhone] = useState('+966 11 234 5678');
  const [taxNumber, setTaxNumber] = useState('1234567890');
  const [dragActive, setDragActive] = useState(false);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isRTL = lang === 'ar';

  const [users] = useState<User[]>([
    { id: 1, name: 'د. أحمد محمد', email: 'ahmed@alshifa.com', role: 'System Admin', joinDate: '2024-01-15', avatar: 'AM' },
    { id: 2, name: 'أ. فاطمة علي', email: 'fatima@alshifa.com', role: 'Doctor', joinDate: '2024-02-20', avatar: 'FA' },
    { id: 3, name: 'م. خالد سعود', email: 'khalid@alshifa.com', role: 'Receptionist', joinDate: '2024-03-10', avatar: 'KS' },
    { id: 4, name: 'أ. سارة عبدالله', email: 'sara@alshifa.com', role: 'Nurse', joinDate: '2024-04-05', avatar: 'SA' },
  ]);

  const translations = {
    ar: {
      dashboard: 'لوحة القيادة',
      patients: 'سجلات المرضى',
      appointments: 'المواعيد',
      reception: 'الاستقبال والتسجيل',
      doctors: 'الأطباء',
      pharmacy: 'الصيدلي',
      laboratory: 'المعامل',
      management: 'الإدارة',
      doctorManagement: 'إدارة الأطباء',
      employeeManagement: 'إدارة الموظفين',
      servicesManagement: 'إدارة الخدمات',
      pharmacyWarehouse: 'إدارة الصيدلية والمخزون',
      deptManagement: 'إدارة الأقسام',
      financialManagement: 'الإدارة المالية',
      payrollManagement: 'إدارة الرواتب',
      settings: 'إعدادات النظام',
      settingsSub: 'تخصيص إعدادات النظام الأساسية والمظهر',
      saveChanges: 'حفظ التغييرات',
      generalSettings: 'الإعدادات العامة',
      hospitalInfo: 'معلومات المستشفى الأساسية',
      hospitalName: 'اسم المستشفى',
      hospitalEmail: 'البريد الإلكتروني المؤسسي',
      hospitalAddress: 'العنوان التفصيلي',
      hospitalPhone: 'رقم التواصل الرئيسي',
      taxNumber: 'الرقم الضريبي',
      brandingSettings: 'إعدادات العلامة التجارية',
      brandingSub: 'تخصيص مظهر النظام وشعار المركز',
      hospitalLogo: 'شعار المستشفى',
      dragDrop: 'اسحب وأفلت الشعار هنا',
      clickChoose: 'أو انقر للاختيار من الملفات',
      primaryColor: 'لون السمة الأساسي',
      secondaryColor: 'لون السمة الثانوي',
      quickColors: 'ألوان سريعة',
      typography: 'خط الطباعة',
      typographyDesc: 'Cairo - خط عربي حديث ومقروء - المستخدم في لوحة التحكم',
      userManagement: 'إدارة المستخدمين',
      userManagementDesc: 'جميع مستخدمي النظام وصلاحياتهم',
      addUser: 'إضافة مستخدم جديد',
      colUser: 'المستخدم',
      colEmail: 'البريد الإلكتروني',
      colRole: 'الدور',
      colJoinDate: 'تاريخ الانضمام',
      colActions: 'الإجراءات',
      admin: 'مدير النظام',
      doctor: 'طبيب',
      nurse: 'ممرض/ة',
      receptionist: 'موظف استقبال',
      dashboardBack: 'الرجوع للوحة التحكم',
      search: 'بحث...',
      success: 'تم حفظ التغييرات بنجاح!'
    },
    en: {
      dashboard: 'Dashboard',
      patients: 'Patient Records',
      appointments: 'Appointments',
      reception: 'Reception & Registration',
      doctors: 'Doctors',
      pharmacy: 'Pharmacist',
      laboratory: 'Laboratory',
      management: 'Management',
      doctorManagement: 'Doctor Management',
      employeeManagement: 'Employee Management',
      servicesManagement: 'Services Management',
      pharmacyWarehouse: 'Pharmacy & Warehouse',
      deptManagement: 'Departments Management',
      financialManagement: 'Financial Management',
      payrollManagement: 'Payroll Management',
      settings: 'System Settings',
      settingsSub: 'Customize core system settings and appearance',
      saveChanges: 'Save Changes',
      generalSettings: 'General Settings',
      hospitalInfo: 'Basic Hospital Information',
      hospitalName: 'Hospital Name',
      hospitalEmail: 'Corporate Email',
      hospitalAddress: 'Detailed Address',
      hospitalPhone: 'Main Contact Number',
      taxNumber: 'Tax Number',
      brandingSettings: 'Branding Settings',
      brandingSub: 'Customize system appearance and center logo',
      hospitalLogo: 'Hospital Logo',
      dragDrop: 'Drag and drop logo here',
      clickChoose: 'Or click to choose from files',
      primaryColor: 'Primary Theme Color',
      secondaryColor: 'Secondary Theme Color',
      quickColors: 'Quick Colors',
      typography: 'Typography',
      typographyDesc: 'Cairo - Modern and readable Arabic font used in dashboard',
      userManagement: 'User Management',
      userManagementDesc: 'All system users and their permissions',
      addUser: 'Add New User',
      colUser: 'User',
      colEmail: 'Email',
      colRole: 'Role',
      colJoinDate: 'Join Date',
      colActions: 'Actions',
      admin: 'System Admin',
      doctor: 'Doctor',
      nurse: 'Nurse',
      receptionist: 'Receptionist',
      dashboardBack: 'Back to Dashboard',
      search: 'Search...',
      success: 'Changes saved successfully!'
    }
  };

  const t = translations[lang];

  const mainMenuItems = [
    { id: 'dash', label: t.dashboard, icon: LayoutDashboard },
    { id: 'patients', label: t.patients, icon: FileText },
    { id: 'appts', label: t.appointments, icon: Calendar },
    { id: 'reception', label: t.reception, icon: ClipboardList },
    { id: 'doctors', label: t.doctors, icon: Activity },
    { id: 'pharmacy', label: t.pharmacy, icon: Pill },
    { id: 'laboratory', label: t.laboratory, icon: Microscope },
  ];

  const managementItems = [
    { id: 'doc-mgmt', label: t.doctorManagement, icon: UsersRound },
    { id: 'emp-mgmt', label: t.employeeManagement, icon: Contact2 },
    { id: 'serv-mgmt', label: t.servicesManagement, icon: Briefcase },
    { id: 'pharma-mgmt', label: t.pharmacyWarehouse, icon: Warehouse },
    { id: 'dept-mgmt', label: t.deptManagement, icon: Layers },
    { id: 'fin-mgmt', label: t.financialManagement, icon: Wallet },
    { id: 'payroll-mgmt', label: t.payrollManagement, icon: Coins },
  ];

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: '', show: false }), 3000);
  };

  const handleSave = () => {
    showToast(t.success);
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
    showToast(lang === 'ar' ? 'تم رفع الشعار بنجاح!' : 'Logo uploaded successfully!');
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      showToast(lang === 'ar' ? 'تم اختيار الشعار بنجاح!' : 'Logo selected successfully!');
    }
  };

  return (
    <div className={cn("min-h-screen flex bg-[#f0f4f8]", darkMode ? 'dark bg-gray-900' : '')} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar Toggle Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-6 left-6 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-bold text-sm tracking-tight">{toast.message}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 z-50 w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 transform lg:relative lg:translate-x-0 border-l border-slate-100",
        sidebarOpen ? "translate-x-0" : (isRTL ? "translate-x-full" : "-translate-x-full")
      )}>
        <div className="p-8 pb-4 text-right">
          <div className="flex items-center gap-4 group justify-start">
            <div className="w-12 h-12 bg-[#1a4fa0] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-slate-900">{isRTL ? 'مستشفى الشفاء' : 'Al-Shifa'}</h1>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest leading-none mt-1">Medical Center</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto no-scrollbar text-right">
          <p className="px-5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 mt-4">{isRTL ? 'القائمة الرئيسية' : 'Main Menu'}</p>
          {mainMenuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'reception') navigate('/reception');
                if (item.id === 'appts') navigate('/appointment');
                if (item.id === 'dash') navigate('/dashboard');
                if (item.id === 'patients') navigate('/patients');
                if (item.id === 'pharmacy') navigate('/dispense');
                if (item.id === 'laboratory') navigate('/laboratory');
                if (item.id === 'doctors') navigate('/doctors');
              }}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group text-right justify-start",
                "text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0]"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", "text-slate-400 group-hover:text-[#1a4fa0]")} />
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-4 pb-2 px-6 text-right">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.management}</h4>
          </div>

          {managementItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'serv-mgmt') navigate('/services');
                if (item.id === 'emp-mgmt') navigate('/employee');
                if (item.id === 'doc-mgmt') navigate('/doctor-management');
                if (item.id === 'dept-mgmt') navigate('/department');
                if (item.id === 'pharma-mgmt') navigate('/pharmacy-inventory');
                if (item.id === 'fin-mgmt') navigate('/payroll');
                if (item.id === 'payroll-mgmt') navigate('/salary-management');
              }}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group text-right justify-start",
                "text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0]"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", "text-slate-400 group-hover:text-[#1a4fa0]")} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 mx-2 mb-2 text-right">
          <button
            onClick={() => navigate('/setting')}
            className={cn(
              "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-right justify-start group",
              "bg-[#1a4fa0] text-white shadow-xl shadow-blue-600/20"
            )}
          >
            <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-sm font-bold text-white">{t.settings}</span>
          </button>
        </div>

        <div className="p-4 border-t border-slate-100 mx-2 pb-8 bg-slate-50/50 rounded-b-[40px] text-right">
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm justify-start text-right">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a4fa0] to-blue-700 flex items-center justify-center text-white font-black text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 truncate">{isRTL ? 'محاسب النظام' : 'System Accountant'}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t.management}</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="px-8 h-20 flex items-center justify-between bg-white border-b border-slate-100 sticky top-0 z-40 gap-4">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-slate-50 text-slate-500">
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm justify-start">
              <span className="text-blue-600 font-bold tracking-tight">{t.dashboard}</span>
              <ChevronLeft className="w-4 h-4 text-slate-300" />
              <span className="text-slate-400 font-medium">{t.settings}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t.search}
                className="w-64 pr-11 pl-4 py-2.5 bg-slate-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-2xl text-sm outline-none transition-all text-right"
              />
            </div>
            <button onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-500 transition-all font-bold text-xs flex items-center gap-2">
              <Globe size={20} className="text-blue-600" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={cn(
                "p-3 rounded-2xl transition-all",
                darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              )}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="relative p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-500 transition-all group">
              <Bell size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="absolute top-3 left-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-200 cursor-pointer hover:scale-105 transition-transform">
              AD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-10 max-w-[1400px] mx-auto w-full">
          {/* Page Title & Back Button */}
          <div className="flex items-end justify-between border-b border-slate-100 pb-10">
            <div className="text-right">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-3">{t.settings}</h2>
              <p className="text-slate-500 font-bold ml-1">{t.settingsSub}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl text-sm font-black hover:bg-slate-50 transition-all shadow-sm"
              >
                <ChevronLeft className={cn("w-4 h-4", isRTL ? "" : "rotate-180")} />
                <span>{t.dashboardBack}</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-[#1a4fa0] hover:bg-blue-700 text-white px-8 py-3 rounded-2xl text-sm font-black shadow-2xl shadow-blue-100 transition-all active:scale-95 group"
              >
                <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{t.saveChanges}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - General & Branding */}
            <div className="lg:col-span-2 space-y-10">
              {/* General Settings */}
              <section className="bg-white rounded-[40px] shadow-sm border border-slate-50 overflow-hidden transform transition-all duration-500">
                <div className="p-10 border-b border-slate-50 bg-slate-50/20">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                      <Building2 size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight">{t.generalSettings}</h3>
                      <p className="text-slate-400 font-bold text-sm mt-1">{t.hospitalInfo}</p>
                    </div>
                  </div>
                </div>

                <div className="p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.hospitalName}</label>
                      <div className="relative">
                        <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input
                          type="text"
                          value={hospitalName}
                          onChange={e => setHospitalName(e.target.value)}
                          className="w-full pr-11 pl-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl text-sm font-bold text-slate-700 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.hospitalEmail}</label>
                      <div className="relative">
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full pr-11 pl-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl text-sm font-bold text-slate-700 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.hospitalAddress}</label>
                      <div className="relative">
                        <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input
                          type="text"
                          value={address}
                          onChange={e => setAddress(e.target.value)}
                          className="w-full pr-11 pl-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl text-sm font-bold text-slate-700 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.hospitalPhone}</label>
                      <div className="relative">
                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full pr-11 pl-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl text-sm font-bold text-slate-700 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.taxNumber}</label>
                      <div className="relative">
                        <FileText className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input
                          type="text"
                          value={taxNumber}
                          onChange={e => setTaxNumber(e.target.value)}
                          className="w-full pr-11 pl-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl text-sm font-bold text-slate-700 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Branding Settings */}
              <section className="bg-white rounded-[40px] shadow-sm border border-slate-50 overflow-hidden transform transition-all duration-500">
                <div className="p-10 border-b border-slate-50 bg-slate-50/20">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                      <Palette size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight">{t.brandingSettings}</h3>
                      <p className="text-slate-400 font-bold text-sm mt-1">{t.brandingSub}</p>
                    </div>
                  </div>
                </div>

                <div className="p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-5">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.hospitalLogo}</label>
                      <div
                        onClick={handleFileSelect}
                        className={cn(
                          "h-56 border-4 border-dashed rounded-[32px] flex flex-col items-center justify-center gap-3 transition-all cursor-pointer relative overflow-hidden group",
                          dragActive ? "border-blue-500 bg-blue-50 shadow-inner" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                        )}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                        <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm shadow-blue-100">
                          <Camera size={32} />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-black text-slate-700 mb-1">{t.dragDrop}</p>
                          <p className="text-xs font-bold text-slate-400">{t.clickChoose}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.primaryColor}</label>
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                            <input
                              type="color"
                              value={primaryColor}
                              onChange={e => setPrimaryColor(e.target.value)}
                              className="absolute inset-[-10px] w-[150%] h-[150%] cursor-pointer border-0"
                            />
                          </div>
                          <input
                            type="text"
                            value={primaryColor}
                            onChange={e => setPrimaryColor(e.target.value)}
                            className="flex-1 px-5 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl text-sm font-black text-slate-600 uppercase transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.secondaryColor}</label>
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                            <input
                              type="color"
                              value={secondaryColor}
                              onChange={e => setSecondaryColor(e.target.value)}
                              className="absolute inset-[-10px] w-[150%] h-[150%] cursor-pointer border-0"
                            />
                          </div>
                          <input
                            type="text"
                            value={secondaryColor}
                            onChange={e => setSecondaryColor(e.target.value)}
                            className="flex-1 px-5 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl text-sm font-black text-slate-600 uppercase transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.quickColors}</label>
                        <div className="flex gap-2.5 flex-wrap">
                          {['#2b7de9', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#334155'].map(c => (
                            <button
                              key={c}
                              onClick={() => setPrimaryColor(c)}
                              className={cn(
                                "w-11 h-11 rounded-xl transition-all hover:scale-110 hover:-translate-y-1 shadow-sm",
                                primaryColor === c ? "ring-4 ring-blue-100 ring-offset-0 border-2 border-white scale-110 -translate-y-1 shadow-md" : ""
                              )}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-slate-50">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t.typography}</label>
                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                          <p className="text-lg font-black text-slate-800 tracking-tight leading-none mb-1">Cairo (Standard)</p>
                          <p className="text-xs font-bold text-slate-400">{t.typographyDesc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - User Management & Quick Info */}
            <div className="space-y-10">
              {/* User Management Section */}
              <section className="bg-white rounded-[40px] shadow-sm border border-slate-50 overflow-hidden transform transition-all duration-500">
                <div className="p-8 border-b border-slate-50 bg-slate-50/20">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shadow-inner">
                      <UsersRound size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 leading-tight">{t.userManagement}</h3>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{t.management}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <button className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-200 rounded-[24px] text-sm font-black text-slate-600 transition-all hover:-translate-y-1 group">
                    <Plus size={20} className="text-blue-500 group-hover:rotate-90 transition-transform duration-500" />
                    <span>{t.addUser}</span>
                  </button>

                  <div className="space-y-4 pt-4">
                    {users.map(user => (
                      <div key={user.id} className="group p-4 bg-white border border-slate-100 rounded-3xl hover:border-blue-100 transition-all shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-black text-sm group-hover:from-blue-600 group-hover:to-indigo-700 group-hover:text-white transition-all duration-500 shadow-sm">
                            {user.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-black text-slate-800 text-sm mb-0.5 truncate">{user.name}</p>
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                                user.role === 'System Admin' ? "bg-purple-50 text-purple-600" :
                                  user.role === 'Doctor' ? "bg-blue-50 text-blue-600" :
                                    "bg-emerald-50 text-emerald-600"
                              )}>
                                {user.role}
                              </span>
                              <span className="text-[9px] font-bold text-slate-400">{user.joinDate}</span>
                            </div>
                          </div>
                          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* System Status Card */}
              <section className="bg-gradient-to-br from-[#2b7de9] to-blue-800 rounded-[40px] p-10 text-white shadow-2xl shadow-blue-300 transform transition-all hover:scale-[1.02] duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl group-hover:bg-blue-400/20 transition-all duration-700" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[32px] flex items-center justify-center border border-white/20 shadow-2xl">
                    <Shield size={36} className="text-white drop-shadow-lg animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black tracking-tight">{isRTL ? 'نظام مشفّر وآمن' : 'Secured System'}</h4>
                    <p className="text-blue-100 text-sm font-bold opacity-80 leading-relaxed px-4">
                      {isRTL ? 'جميع البيانات محمية بتقنيات التشفير المتقدمة ومتوافقة مع المعايير الصحية العالمية.' : 'All data is protected with advanced encryption technologies and complies with global health standards.'}
                    </p>
                  </div>
                  <div className="w-full pt-4 h-px bg-white/10" />
                  <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                    <span className="text-xs font-black uppercase tracking-widest">{isRTL ? 'الحالة: نشط' : 'Status: Online'}</span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="h-20" />
        </div>
      </main>
    </div>
  );
};

export { Setting };
export default Setting;