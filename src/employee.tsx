import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, LayoutDashboard, Microscope, Pill,
  ClipboardList, UsersRound, Contact2, Briefcase, Warehouse,
  Layers, Wallet, FileText, Coins, Activity, UserPlus,
  Settings, Search, Menu, Globe, Shield, AlertTriangle, Bell, LogOut, Users, Save, X, Phone, Mail, Building2, CreditCard, User, ChevronDown, ChevronLeft, Info, ShieldCheck, HelpCircle
} from 'lucide-react';
import { cn } from './utils/cn';

export default function Employee() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<'add' | 'list'>('list');
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phone: '',
    email: '',
    jobRole: '',
    department: '',
    joiningDate: '',
    status: 'active',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const isRTL = lang === 'ar';

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
      financialReports: 'التقارير المالية',
      payrollManagement: 'إدارة الرواتب',
      settings: 'الإعدادات',
      addEmployee: 'إضافة موظف جديد',
      personalInfo: 'المعلومات الشخصية',
      fullName: 'الاسم الكامل',
      idNumber: 'رقم الهوية',
      phone: 'رقم الجوال',
      email: 'البريد الإلكتروني',
      jobRole: 'المسمى الوظيفي',
      department: 'القسم',
      joiningDate: 'تاريخ الالتحاق',
      status: 'حالة التوظيف',
      save: 'حفظ البيانات',
      cancel: 'إلغاء',
      active: 'نشط',
      onLeave: 'في إجازة',
      allEmployees: 'جميع الموظفين',
      employeeList: 'قائمة الموظفين',
      searchEmployee: 'البحث عن موظف...',
      noEmployees: 'لا يوجد موظفون مضافون حالياً.',
      actions: 'الإجراءات',
      edit: 'تعديل',
      delete: 'حذف'
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
      financialReports: 'Financial Reports',
      payrollManagement: 'Payroll Management',
      settings: 'Settings',
      addEmployee: 'Add New Employee',
      personalInfo: 'Personal Information',
      fullName: 'Full Name',
      idNumber: 'ID Number',
      phone: 'Phone Number',
      email: 'Email Address',
      jobRole: 'Job Role',
      department: 'Department',
      joiningDate: 'Joining Date',
      status: 'Employment Status',
      save: 'Save Data',
      cancel: 'Cancel',
      active: 'Active',
      onLeave: 'On Leave',
      allEmployees: 'All Employees',
      employeeList: 'Employee List',
      searchEmployee: 'Search staff...',
      noEmployees: 'No employees added yet.',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete'
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
    { id: 'emp-mgmt', label: t.employeeManagement, icon: Contact2, active: true },
    { id: 'serv-mgmt', label: t.servicesManagement, icon: Briefcase },
    { id: 'pharma-mgmt', label: t.pharmacyWarehouse, icon: Warehouse },
    { id: 'dept-mgmt', label: t.deptManagement, icon: Layers },
    { id: 'fin-mgmt', label: t.financialManagement, icon: Wallet },
    { id: 'fin-reports', label: t.financialReports, icon: FileText },
    { id: 'payroll-mgmt', label: t.payrollManagement, icon: Coins },
  ];

  const departments = [
    'قسم الطوارئ',
    'قسم الجراحة',
    'قسم الباطنية',
    'قسم الأطفال',
    'قسم العظام',
    'قسم القلب',
    'قسم الأشعة',
    'قسم المختبرات',
    'الإدارة العامة',
    'قسم التمريض',
  ];

  const jobRoles = [
    'طبيب استشاري',
    'طبيب أخصائي',
    'طبيب مقيم',
    'ممرض/ة',
    'فني مختبر',
    'فني أشعة',
    'صيدلي',
    'إداري',
    'محاسب',
    'موظف استقبال',
  ];

  const [employees] = useState([
    { id: 1, name: 'أحمد العتيبي', role: 'طبيب استشاري', dept: 'قسم الطوارئ', status: 'active', email: 'ahmed@hospital.com', phone: '0501234567' },
    { id: 2, name: 'سارة خالد', role: 'ممرض/ة', dept: 'قسم الجراحة', status: 'active', email: 'sara@hospital.com', phone: '0507654321' },
    { id: 3, name: 'محمد علي', role: 'محاسب', dept: 'الإدارة العامة', status: 'leave', email: 'mohammed@hospital.com', phone: '0509998887' },
    { id: 4, name: 'ليلى منصور', role: 'طبيب أخصائي', dept: 'قسم الأطفال', status: 'active', email: 'layla@hospital.com', phone: '0505554443' },
  ]);

  return (
    <div className={cn("min-h-screen bg-[#f0f4f8] flex")} dir={isRTL ? 'rtl' : 'ltr'}>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 z-50 w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 transform lg:relative lg:translate-x-0 border-l border-slate-100",
        sidebarOpen ? "translate-x-0" : (isRTL ? "translate-x-full" : "-translate-x-full")
      )}>
        <div className="p-8 pb-4 text-right">
          <div className="flex items-center gap-4 group justify-start">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
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
                if (item.id === 'doctors') navigate('/doctor-management');
              }}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group text-right justify-start",
                "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", "text-slate-400 group-hover:text-blue-600")} />
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
                if (item.id === 'pharma-mgmt') navigate('/dispense');
                if (item.id === 'fin-mgmt') navigate('/payroll');
                if (item.id === 'fin-reports') navigate('/reports');
                if (item.id === 'payroll-mgmt') navigate('/salary-management');
              }}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group text-right justify-start",
                item.active ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", item.active ? "text-white" : "text-slate-400 group-hover:text-blue-600")} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 mx-2 mb-2 text-right">
          <button
            onClick={() => navigate('/setting')}
            className="w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-slate-500 hover:bg-slate-50 hover:text-blue-600 text-right justify-start group"
          >
            <Settings className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
            <span className="text-sm font-bold">{t.settings}</span>
          </button>
        </div>

        <div className="p-4 border-t border-slate-100 mx-2 pb-8 bg-slate-50/50 rounded-b-[40px] text-right">
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm justify-start">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white font-black text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 truncate">{isRTL ? 'محاسب النظام' : 'System Accountant'}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase">{t.management}</p>
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

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button + Breadcrumb */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-sm justify-start">
                <span className="text-blue-600 font-medium">{t.employeeManagement}</span>
                <ChevronLeft className="w-4 h-4 text-gray-300" />
                <span className="text-gray-400">{view === 'add' ? t.addEmployee : t.employeeList}</span>
              </div>
            </div>

            {/* Search & Notifications */}
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={isRTL ? 'بحث...' : 'Search...'}
                  className="w-64 pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:border-blue-300"
                />
              </div>
              <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 left-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/20 cursor-pointer">
                {isRTL ? 'أح' : 'AD'}
              </div>
              <button
                onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
                className="p-2 rounded-xl hover:bg-gray-100 text-slate-500 transition-all font-bold text-xs"
              >
                <Globe className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
          {/* Header Actions & Tabs */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-right">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {view === 'add' ? t.addEmployee : t.employeeList}
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                {view === 'add'
                  ? (isRTL ? 'يرجى تعبئة جميع الحقول المطلوبة لإضافة موظف جديد.' : 'Please fill in all required fields to add a new employee.')
                  : (isRTL ? 'استعرض وقم بإدارة كافة الموظفين في المستشفى.' : 'View and manage all hospital staff members.')}
              </p>
            </div>

            <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-100 flex gap-1">
              <button
                onClick={() => setView('add')}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2",
                  view === 'add' ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                )}
              >
                <UserPlus className="w-4 h-4" />
                <span>{t.addEmployee}</span>
              </button>
              <button
                onClick={() => setView('list')}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2",
                  view === 'list' ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                )}
              >
                <ClipboardList className="w-4 h-4" />
                <span>{t.allEmployees}</span>
              </button>
            </div>
          </div>

          {view === 'add' ? (
            /* Form Card */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-right">
              {/* Card Header */}
              <div className="bg-gradient-to-l from-blue-500 to-blue-600 px-6 sm:px-8 py-5 text-right">
                <div className="flex items-center gap-3 justify-start">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110">
                    <UserPlus className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-white font-bold text-base">{t.personalInfo}</h3>
                    <p className="text-blue-100 text-xs mt-0.5">{isRTL ? 'معلومات الموظف الأساسية' : 'Basic employee information'}</p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  {/* Full Name */}
                  <div className="space-y-2 text-right">
                    <label className="block text-sm font-semibold text-gray-700">
                      {t.fullName} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className={cn("absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors", focusedField === 'fullName' ? 'text-blue-500' : 'text-gray-400')} />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        onFocus={() => setFocusedField('fullName')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={isRTL ? 'أدخل الاسم الكامل' : 'Enter full name'}
                        className="w-full pr-11 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-400 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* ID Number */}
                  <div className="space-y-2 text-right">
                    <label className="block text-sm font-semibold text-gray-700">
                      {t.idNumber} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <CreditCard className={cn("absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors", focusedField === 'idNumber' ? 'text-blue-500' : 'text-gray-400')} />
                      <input
                        type="text"
                        value={formData.idNumber}
                        onChange={(e) => handleChange('idNumber', e.target.value)}
                        onFocus={() => setFocusedField('idNumber')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={isRTL ? 'أدخل رقم الهوية' : 'Enter ID number'}
                        className="w-full pr-11 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-400 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2 text-right">
                    <label className="block text-sm font-semibold text-gray-700">
                      {t.phone} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className={cn("absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors", focusedField === 'phone' ? 'text-blue-500' : 'text-gray-400')} />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="05xxxxxxxx"
                        className="w-full pr-11 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-400 transition-all outline-none"
                        dir="ltr"
                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2 text-right">
                    <label className="block text-sm font-semibold text-gray-700">
                      {t.email} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className={cn("absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors", focusedField === 'email' ? 'text-blue-500' : 'text-gray-400')} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="example@hospital.com"
                        className="w-full pr-11 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-400 transition-all outline-none"
                        dir="ltr"
                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                      />
                    </div>
                  </div>

                  {/* Job Role Dropdown */}
                  <div className="space-y-2 text-right">
                    <label className="block text-sm font-semibold text-gray-700">
                      {t.jobRole} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className={cn("absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors", focusedField === 'jobRole' ? 'text-blue-500' : 'text-gray-400')} />
                      <ChevronDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <select
                        value={formData.jobRole}
                        onChange={(e) => handleChange('jobRole', e.target.value)}
                        onFocus={() => setFocusedField('jobRole')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pr-11 pl-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 appearance-none focus:bg-white focus:border-blue-400 cursor-pointer outline-none transition-all"
                      >
                        <option value="" disabled>
                          {isRTL ? 'اختر المسمى الوظيفي' : 'Select Job Role'}
                        </option>
                        {jobRoles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Department Dropdown */}
                  <div className="space-y-2 text-right">
                    <label className="block text-sm font-semibold text-gray-700">
                      {t.department} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className={cn("absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors", focusedField === 'department' ? 'text-blue-500' : 'text-gray-400')} />
                      <ChevronDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <select
                        value={formData.department}
                        onChange={(e) => handleChange('department', e.target.value)}
                        onFocus={() => setFocusedField('department')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pr-11 pl-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 appearance-none focus:bg-white focus:border-blue-400 cursor-pointer outline-none transition-all"
                      >
                        <option value="" disabled>
                          {isRTL ? 'اختر القسم' : 'Select Department'}
                        </option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Joining Date */}
                  <div className="space-y-2 text-right">
                    <label className="block text-sm font-semibold text-gray-700">
                      {t.joiningDate} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className={cn("absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors", focusedField === 'joiningDate' ? 'text-blue-500' : 'text-gray-400')} />
                      <input
                        type="date"
                        value={formData.joiningDate}
                        onChange={(e) => handleChange('joiningDate', e.target.value)}
                        onFocus={() => setFocusedField('joiningDate')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pr-11 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:border-blue-400 cursor-pointer outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Employment Status Radio */}
                  <div className="space-y-2 text-right">
                    <label className="block text-sm font-semibold text-gray-700">
                      {t.status} <span className="text-red-400">*</span>
                    </label>
                    <div className="flex items-center gap-3 pt-1 justify-start">
                      <label
                        className={cn(
                          "flex-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200",
                          formData.status === 'active' ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
                        )}
                      >
                        <input
                          type="radio"
                          name="status"
                          value="active"
                          checked={formData.status === 'active'}
                          onChange={(e) => handleChange('status', e.target.value)}
                          className="sr-only"
                        />
                        <div className={cn("w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all", formData.status === 'active' ? "border-blue-500" : "border-gray-300")}>
                          {formData.status === 'active' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />}
                        </div>
                        <span className="text-sm font-medium">{t.active}</span>
                      </label>
                      <label
                        className={cn(
                          "flex-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200",
                          formData.status === 'leave' ? "border-amber-500 bg-amber-50 text-amber-700 shadow-sm" : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
                        )}
                      >
                        <input
                          type="radio"
                          name="status"
                          value="leave"
                          checked={formData.status === 'leave'}
                          onChange={(e) => handleChange('status', e.target.value)}
                          className="sr-only"
                        />
                        <div className={cn("w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all", formData.status === 'leave' ? "border-amber-500" : "border-gray-300")}>
                          {formData.status === 'leave' && <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />}
                        </div>
                        <span className="text-sm font-medium">{t.onLeave}</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 my-8" />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-start">
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-l from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 active:scale-[0.98]">
                    <Save className="w-4.5 h-4.5" />
                    <span>{t.save}</span>
                  </button>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-gray-50 text-gray-600 px-10 py-3.5 rounded-xl text-sm font-bold border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 active:scale-[0.98]">
                    <X className="w-4.5 h-4.5" />
                    <span>{t.cancel}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* List View */
            <div className="space-y-6">
              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: isRTL ? 'إجمالي الموظفين' : 'Total Staff', count: 124, color: 'blue' },
                  { label: isRTL ? 'المناوبين حالياً' : 'Currently On Duty', count: 48, color: 'green' },
                  { label: isRTL ? 'في إجازة' : 'On Leave', count: 12, color: 'amber' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <h3 className="text-2xl font-black text-slate-800">{stat.count}</h3>
                    </div>
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                      stat.color === 'blue' ? "bg-blue-50 text-blue-600" :
                        stat.color === 'green' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    )}>
                      <UsersRound className="w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Card */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden text-right">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                  <div className="relative w-full max-w-md">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t.searchEmployee}
                      className="w-full pr-11 pl-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm focus:border-blue-500 outline-none transition-all shadow-sm text-right"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{t.fullName}</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{t.jobRole}</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{t.department}</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{t.status}</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {employees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3 justify-start">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-black text-slate-500 text-xs">
                                {emp.name[0]}
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-slate-800 text-sm mb-0.5">{emp.name}</p>
                                <p className="text-[10px] text-slate-400 font-medium">{emp.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center gap-2 justify-start">
                              <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                              <span className="text-sm font-bold text-slate-600">{emp.role}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center gap-2 justify-start">
                              <Building2 className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-sm font-semibold text-slate-500">{emp.dept}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-start">
                              <span className={cn(
                                "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm",
                                emp.status === 'active' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                              )}>
                                {emp.status === 'active' ? t.active : t.onLeave}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-blue-600 transition-all">
                                <Save className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-red-500 transition-all">
                                <X className="w-4 h-4" />
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
          )}

          {/* Footer spacer */}
          <div className="h-8" />
        </div>
      </main>
    </div>
  );
}
