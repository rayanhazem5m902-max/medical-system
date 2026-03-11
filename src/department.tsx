import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, LayoutDashboard, Microscope, Pill,
  ClipboardList, UsersRound, Contact2, Briefcase, Warehouse,
  Layers, Wallet, FileText, Coins, Activity, UserPlus,
  Settings, Search, Menu, Globe, Shield, AlertTriangle, Bell, LogOut, Users, Save, X, Phone, Mail, Building2, CreditCard, User, ChevronDown, ChevronLeft, Info, ShieldCheck, HelpCircle,
  Plus, Filter, Download, Eye, Edit3, Ban, MoreVertical
} from 'lucide-react';
import { cn } from './utils/cn';

/* ───────── Types ───────── */
type Lang = 'ar' | 'en';
interface StatCard { titleAr: string; titleEn: string; value: string | number; subtitleAr: string; subtitleEn: string; icon: React.ReactNode; iconBg: string; iconColor: string; trendAr?: string; trendEn?: string; trendUp?: boolean }
interface DepartmentData { id: number; nameAr: string; nameEn: string; headAr: string; headEn: string; headAvatar: string; doctorCount: number; status: 'active' | 'inactive'; established: string; locationAr: string; locationEn: string }

export default function Department() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<Lang>('ar');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [actionMenuId, setActionMenuId] = useState<number | null>(null);

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
      payrollManagement: 'إدارة الرواتب',
      settings: 'الإعدادات',
      pageTitle: 'إدارة الأقسام',
      pageSubtitle: 'إدارة ومتابعة جميع أقسام المستشفى',
      searchPlaceholder: 'البحث عن قسم...',
      addDept: 'إضافة قسم جديد',
      deptList: 'قائمة الأقسام',
      deptUnit: 'قسم',
      allStatuses: 'جميع الحالات',
      active: 'نشط',
      inactive: 'غير نشط',
      exportBtn: 'تصدير',
      colDeptName: 'اسم القسم',
      colHead: 'رئيس القسم',
      colDoctors: 'عدد الأطباء',
      colLocation: 'الموقع',
      colStatus: 'الحالة',
      colActions: 'الإجراءات',
      established: 'تأسس',
      view: 'عرض',
      edit: 'تعديل',
      disable: 'تعطيل',
      viewDetails: 'عرض التفاصيل',
      transferDoctors: 'نقل الأطباء',
      deleteDept: 'حذف القسم',
      showing: 'عرض',
      of: 'من',
      item: 'عنصر',
      prev: 'السابق',
      next: 'التالي',
      langSwitch: 'English',
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
      settings: 'Settings',
      pageTitle: 'Department Management',
      pageSubtitle: 'Manage and monitor all hospital departments',
      searchPlaceholder: 'Search for a department...',
      addDept: 'Add New Department',
      deptList: 'Departments List',
      deptUnit: 'dept',
      allStatuses: 'All Statuses',
      active: 'Active',
      inactive: 'Inactive',
      exportBtn: 'Export',
      colDeptName: 'Department Name',
      colHead: 'Head of Department',
      colDoctors: 'Doctors',
      colLocation: 'Location',
      colStatus: 'Status',
      colActions: 'Actions',
      established: 'Est.',
      view: 'View',
      edit: 'Edit',
      disable: 'Disable',
      viewDetails: 'View Details',
      transferDoctors: 'Transfer Doctors',
      deleteDept: 'Delete Department',
      showing: 'Showing',
      of: 'of',
      item: 'items',
      prev: 'Previous',
      next: 'Next',
      langSwitch: 'العربية',
    },
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
    { id: 'dept-mgmt', label: t.deptManagement, icon: Layers, active: true },
    { id: 'fin-mgmt', label: t.financialManagement, icon: Wallet },
    { id: 'payroll-mgmt', label: t.payrollManagement, icon: Coins },
  ];

  const stats: StatCard[] = [
    { titleAr: 'إجمالي الأقسام', titleEn: 'Total Departments', value: 12, subtitleAr: 'قسم في المستشفى', subtitleEn: 'departments in hospital', icon: <Building2 size={24} />, iconBg: 'bg-sky-50', iconColor: 'text-sky-500', trendAr: '+2 هذا الشهر', trendEn: '+2 this month', trendUp: true },
    { titleAr: 'الأقسام النشطة', titleEn: 'Active Departments', value: 10, subtitleAr: 'قسم يعمل حالياً', subtitleEn: 'currently operational', icon: <ShieldCheck size={24} />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500', trendAr: '83% من الإجمالي', trendEn: '83% of total', trendUp: true },
    { titleAr: 'إجمالي الأطباء', titleEn: 'Total Doctors', value: 85, subtitleAr: 'طبيب في جميع الأقسام', subtitleEn: 'doctors across all depts', icon: <Users size={24} />, iconBg: 'bg-blue-50', iconColor: 'text-blue-500', trendAr: '+5 أطباء جدد', trendEn: '+5 new doctors', trendUp: true },
  ];

  const departmentData: DepartmentData[] = [
    { id: 1, nameAr: 'قسم الطوارئ', nameEn: 'Emergency Department', headAr: 'د. أحمد محمود', headEn: 'Dr. Ahmed Mahmoud', headAvatar: 'AM', doctorCount: 15, status: 'active', established: '2018', locationAr: 'الطابق الأرضي', locationEn: 'Ground Floor' },
    { id: 2, nameAr: 'قسم القلب', nameEn: 'Cardiology', headAr: 'د. سارة خالد', headEn: 'Dr. Sara Khaled', headAvatar: 'SK', doctorCount: 12, status: 'active', established: '2019', locationAr: 'الطابق الثاني', locationEn: '2nd Floor' },
    { id: 3, nameAr: 'قسم الأطفال', nameEn: 'Pediatrics', headAr: 'د. فاطمة علي', headEn: 'Dr. Fatima Ali', headAvatar: 'FA', doctorCount: 10, status: 'active', established: '2017', locationAr: 'الطابق الثالث', locationEn: '3rd Floor' },
    { id: 4, nameAr: 'قسم الأشعة', nameEn: 'Radiology', headAr: 'د. عمر حسن', headEn: 'Dr. Omar Hassan', headAvatar: 'OH', doctorCount: 8, status: 'active', established: '2020', locationAr: 'الطابق الأول', locationEn: '1st Floor' },
    { id: 5, nameAr: 'قسم العظام', nameEn: 'Orthopedics', headAr: 'د. خالد يوسف', headEn: 'Dr. Khaled Youssef', headAvatar: 'KY', doctorCount: 9, status: 'active', established: '2018', locationAr: 'الطابق الثاني', locationEn: '2nd Floor' },
    { id: 6, nameAr: 'قسم العيون', nameEn: 'Ophthalmology', headAr: 'د. منى إبراهيم', headEn: 'Dr. Mona Ibrahim', headAvatar: 'MI', doctorCount: 7, status: 'active', established: '2021', locationAr: 'الطابق الرابع', locationEn: '4th Floor' },
    { id: 7, nameAr: 'قسم الأعصاب', nameEn: 'Neurology', headAr: 'د. حسام الدين', headEn: 'Dr. Hossam Eldin', headAvatar: 'HE', doctorCount: 6, status: 'active', established: '2019', locationAr: 'الطابق الثالث', locationEn: '3rd Floor' },
    { id: 8, nameAr: 'قسم الجراحة', nameEn: 'Surgery', headAr: 'د. نادية سمير', headEn: 'Dr. Nadia Samir', headAvatar: 'NS', doctorCount: 11, status: 'active', established: '2016', locationAr: 'الطابق الأول', locationEn: '1st Floor' },
    { id: 9, nameAr: 'قسم الباطنة', nameEn: 'Internal Medicine', headAr: 'د. ياسر عبدالله', headEn: 'Dr. Yasser Abdullah', headAvatar: 'YA', doctorCount: 5, status: 'inactive', established: '2022', locationAr: 'الطابق الخامس', locationEn: '5th Floor' },
    { id: 10, nameAr: 'قسم التخدير', nameEn: 'Anesthesiology', headAr: 'د. ليلى محمد', headEn: 'Dr. Layla Mohammed', headAvatar: 'LM', doctorCount: 4, status: 'active', established: '2020', locationAr: 'الطابق الأول', locationEn: '1st Floor' },
    { id: 11, nameAr: 'قسم المسالك البولية', nameEn: 'Urology', headAr: 'د. كريم فوزي', headEn: 'Dr. Karim Fawzy', headAvatar: 'KF', doctorCount: 3, status: 'inactive', established: '2023', locationAr: 'الطابق الرابع', locationEn: '4th Floor' },
    { id: 12, nameAr: 'قسم الأنف والأذن', nameEn: 'ENT Department', headAr: 'د. هدى عبدالرحمن', headEn: 'Dr. Huda Abdulrahman', headAvatar: 'HA', doctorCount: 5, status: 'active', established: '2021', locationAr: 'الطابق الثالث', locationEn: '3rd Floor' },
  ];

  const avatarColors = [
    'from-sky-400 to-blue-500', 'from-emerald-400 to-green-500', 'from-violet-400 to-purple-500',
    'from-amber-400 to-orange-500', 'from-rose-400 to-pink-500', 'from-teal-400 to-cyan-500',
  ];

  /* table logic */
  const itemsPerPage = 7;
  const filteredDepts = departmentData.filter(d => filterStatus === 'all' ? true : d.status === filterStatus);
  const totalPages = Math.ceil(filteredDepts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDepts = filteredDepts.slice(startIndex, startIndex + itemsPerPage);
  const showingFrom = filteredDepts.length > 0 ? startIndex + 1 : 0;
  const showingTo = Math.min(startIndex + itemsPerPage, filteredDepts.length);

  const textAlign = isRTL ? 'text-right' : 'text-left';

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
                item.active ? "bg-[#1a4fa0] text-white shadow-xl shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0]"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", item.active ? "text-white" : "text-slate-400 group-hover:text-[#1a4fa0]")} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 mx-2 mb-2 text-right">
          <button
            onClick={() => navigate('/setting')}
            className="w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0] text-right justify-start group"
          >
            <Settings className="w-5 h-5 text-slate-400 group-hover:text-[#1a4fa0]" />
            <span className="text-sm font-bold">{t.settings}</span>
          </button>
        </div>

        <div className="p-4 border-t border-slate-100 mx-2 pb-8 bg-slate-50/50 rounded-b-[40px] text-right">
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm justify-start">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a4fa0] to-blue-700 flex items-center justify-center text-white font-black text-xs">
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
                <span className="text-blue-600 font-medium">{t.deptManagement}</span>
                <ChevronLeft className="w-4 h-4 text-gray-300" />
                <span className="text-gray-400">{t.deptList}</span>
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
        <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
            <div className="text-right">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{t.pageTitle}</h1>
              <p className="text-gray-500 text-sm mt-1">{t.pageSubtitle}</p>
            </div>
            <button className={`flex items-center gap-2 bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all duration-200 cursor-pointer`}>
              <Plus size={18} />
              <span>{t.addDept}</span>
            </button>
          </div>

          {/* ══════════ STATS CARDS ══════════ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex items-center justify-between group">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{isRTL ? stat.titleAr : stat.titleEn}</p>
                  <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">{isRTL ? stat.subtitleAr : stat.subtitleEn}</p>
                </div>
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm",
                  stat.iconBg, stat.iconColor
                )}>
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>

          {/* ══════════ DEPARTMENT TABLE ══════════ */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden text-right">
            {/* Table header actions */}
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{t.deptList}</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{filteredDepts.length} {t.deptUnit}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => { setFilterStatus(e.target.value as 'all' | 'active' | 'inactive'); setCurrentPage(1); }}
                    className="appearance-none bg-white border border-slate-200 text-slate-600 text-sm rounded-xl pr-10 pl-4 py-2.5 focus:border-blue-500 outline-none cursor-pointer shadow-sm transition-all"
                  >
                    <option value="all">{t.allStatuses}</option>
                    <option value="active">{t.active}</option>
                    <option value="inactive">{t.inactive}</option>
                  </select>
                  <Filter size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-sm rounded-xl px-5 py-2.5 hover:bg-slate-50 shadow-sm transition-all cursor-pointer font-bold">
                  <Download size={16} />
                  <span className="hidden sm:inline">{t.exportBtn}</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{t.colDeptName}</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{t.colHead}</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">{t.colDoctors}</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">{t.colLocation}</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">{t.colStatus}</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">{t.colActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginatedDepts.map((dept, idx) => (
                    <tr key={dept.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 text-white font-black text-xs shadow-sm",
                            avatarColors[idx % avatarColors.length]
                          )}>
                            {isRTL ? dept.nameAr.charAt(4) : dept.nameEn.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm mb-0.5">{isRTL ? dept.nameAr : dept.nameEn}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.established} {dept.established}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColors[(idx + 2) % avatarColors.length]} flex items-center justify-center flex-shrink-0 shadow-sm shadow-black/5`}>
                            <span className="text-white text-[10px] font-black">{dept.headAvatar}</span>
                          </div>
                          <span className="text-sm text-slate-700 font-bold">{isRTL ? dept.headAr : dept.headEn}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center bg-blue-50 text-blue-600 text-sm font-black rounded-xl w-10 h-8 border border-blue-100">{dept.doctorCount}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-semibold text-slate-500">{isRTL ? dept.locationAr : dept.locationEn}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={cn(
                          "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm",
                          dept.status === 'active' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-500 border border-red-100"
                        )}>
                          {dept.status === 'active' ? t.active : t.inactive}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-blue-600 transition-all cursor-pointer" title={t.view}><Eye size={16} /></button>
                          <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-blue-600 transition-all cursor-pointer" title={t.edit}><Edit3 size={16} /></button>
                          <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-red-500 transition-all cursor-pointer" title={t.disable}><Ban size={16} /></button>
                          <div className="relative">
                            <button
                              className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-gray-600 transition-all cursor-pointer"
                              onClick={() => setActionMenuId(actionMenuId === dept.id ? null : dept.id)}
                            >
                              <MoreVertical size={16} />
                            </button>
                            {actionMenuId === dept.id && (
                              <div className={cn(
                                "absolute top-full mt-1 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20 overflow-hidden",
                                isRTL ? 'left-0' : 'right-0'
                              )}>
                                <button className={`w-full ${textAlign} px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer`} onClick={() => setActionMenuId(null)}>{t.viewDetails}</button>
                                <button className={`w-full ${textAlign} px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer`} onClick={() => setActionMenuId(null)}>{t.transferDoctors}</button>
                                <div className="border-t border-slate-50 my-1" />
                                <button className={`w-full ${textAlign} px-5 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors cursor-pointer`} onClick={() => setActionMenuId(null)}>{t.deleteDept}</button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-6 border-t border-slate-50 flex-wrap gap-4 bg-slate-50/30">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                {t.showing} <span className="text-slate-800">{showingFrom}</span> - <span className="text-slate-800">{showingTo}</span> {t.of} <span className="text-slate-800">{filteredDepts.length}</span> {t.item}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
                >
                  {t.prev}
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "w-9 h-9 text-xs font-black rounded-xl transition-all shadow-sm cursor-pointer",
                      currentPage === page ? "bg-blue-600 text-white shadow-blue-200" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                    )}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
                >
                  {t.next}
                </button>
              </div>
            </div>
          </div>

          <div className="h-8" />
        </div>
      </main>
    </div>
  );
}
