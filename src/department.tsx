import { useState } from 'react';
import {
  LayoutDashboard, Users, CalendarCheck, DollarSign, ConciergeBell, Stethoscope,
  Wrench, UserCog, Pill, Building2, LogOut, ChevronDown, ChevronUp, Activity, X,
  Search, Plus, Bell, Menu, CheckCircle2, Filter, Download, Edit3, Ban, MoreVertical, Eye, Globe,
} from 'lucide-react';

/* ───────── Types ───────── */
type Lang = 'ar' | 'en';
interface NavItem { labelAr: string; labelEn: string; icon: React.ReactNode; active?: boolean }
interface StatCard { titleAr: string; titleEn: string; value: string | number; subtitleAr: string; subtitleEn: string; icon: React.ReactNode; iconBg: string; iconColor: string; trendAr?: string; trendEn?: string; trendUp?: boolean }
interface Department { id: number; nameAr: string; nameEn: string; headAr: string; headEn: string; headAvatar: string; doctorCount: number; status: 'active' | 'inactive'; established: string; locationAr: string; locationEn: string }

/* ───────── Translations ───────── */
const t = {
  ar: {
    hospitalSystem: 'نظام المستشفى',
    hospitalSub: 'Hospital System',
    mainMenu: 'القائمة الرئيسية',
    management: 'الإدارة',
    ceoTitle: 'المدير التنفيذي',
    ceoName: 'محمد أحمد',
    logout: 'تسجيل الخروج',
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
    hospitalSystem: 'Hospital System',
    hospitalSub: 'نظام المستشفى',
    mainMenu: 'Main Menu',
    management: 'Management',
    ceoTitle: 'Chief Executive Officer',
    ceoName: 'Mohammed Ahmed',
    logout: 'Logout',
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

/* ───────── Data ───────── */
const mainNavItems: NavItem[] = [
  { labelAr: 'لوحة التحكم', labelEn: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { labelAr: 'المرضى', labelEn: 'Patients', icon: <Users size={20} /> },
  { labelAr: 'المواعيد', labelEn: 'Appointments', icon: <CalendarCheck size={20} /> },
  { labelAr: 'المالية', labelEn: 'Finance', icon: <DollarSign size={20} /> },
  { labelAr: 'الاستقبال', labelEn: 'Reception', icon: <ConciergeBell size={20} /> },
  { labelAr: 'الأطباء', labelEn: 'Doctors', icon: <Stethoscope size={20} /> },
];

const managementItems: NavItem[] = [
  { labelAr: 'الخدمات', labelEn: 'Services', icon: <Wrench size={20} /> },
  { labelAr: 'الموظفون', labelEn: 'Staff', icon: <UserCog size={20} /> },
  { labelAr: 'الصيدلية', labelEn: 'Pharmacy', icon: <Pill size={20} /> },
  { labelAr: 'إدارة الأقسام', labelEn: 'Departments', icon: <Building2 size={20} />, active: true },
];

const getStats = (): StatCard[] => [
  { titleAr: 'إجمالي الأقسام', titleEn: 'Total Departments', value: 12, subtitleAr: 'قسم في المستشفى', subtitleEn: 'departments in hospital', icon: <Building2 size={24} />, iconBg: 'bg-sky-50', iconColor: 'text-sky-500', trendAr: '+2 هذا الشهر', trendEn: '+2 this month', trendUp: true },
  { titleAr: 'الأقسام النشطة', titleEn: 'Active Departments', value: 10, subtitleAr: 'قسم يعمل حالياً', subtitleEn: 'currently operational', icon: <CheckCircle2 size={24} />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500', trendAr: '83% من الإجمالي', trendEn: '83% of total', trendUp: true },
  { titleAr: 'إجمالي الأطباء', titleEn: 'Total Doctors', value: 85, subtitleAr: 'طبيب في جميع الأقسام', subtitleEn: 'doctors across all depts', icon: <Users size={24} />, iconBg: 'bg-blue-50', iconColor: 'text-blue-500', trendAr: '+5 أطباء جدد', trendEn: '+5 new doctors', trendUp: true },
];

const departments: Department[] = [
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

/* ───────── App ───────── */
export function App() {
  const [lang, setLang] = useState<Lang>('ar');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [managementOpen, setManagementOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [actionMenuId, setActionMenuId] = useState<number | null>(null);

  const isAr = lang === 'ar';
  const tx = t[lang];
  const stats = getStats();
  const dir = isAr ? 'rtl' : 'ltr';

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const toggleLang = () => setLang(prev => prev === 'ar' ? 'en' : 'ar');

  /* table logic */
  const itemsPerPage = 7;
  const filteredDepts = departments.filter(d => filterStatus === 'all' ? true : d.status === filterStatus);
  const totalPages = Math.ceil(filteredDepts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDepts = filteredDepts.slice(startIndex, startIndex + itemsPerPage);
  const showingFrom = filteredDepts.length > 0 ? startIndex + 1 : 0;
  const showingTo = Math.min(startIndex + itemsPerPage, filteredDepts.length);

  /* sidebar position classes based on direction */
  const sidebarSide = isAr ? 'right-0' : 'left-0';
  const mainMargin = isAr
    ? (sidebarCollapsed ? 'lg:mr-[78px]' : 'lg:mr-[270px]')
    : (sidebarCollapsed ? 'lg:ml-[78px]' : 'lg:ml-[270px]');
  const activeBorder = isAr ? 'border-r-[3px] border-primary-500' : 'border-l-[3px] border-primary-500';
  const searchIconPos = isAr ? 'right-3' : 'left-3';
  const searchPadding = isAr ? 'pr-10 pl-4' : 'pl-10 pr-4';
  const filterIconPos = isAr ? 'right-3' : 'left-3';
  const filterPadding = isAr ? 'pr-9 px-4' : 'pl-9 px-4';
  const textAlign = isAr ? 'text-right' : 'text-left';
  const autoMargin = isAr ? 'mr-auto' : 'ml-auto';

  return (
    <div className={`min-h-screen bg-gray-100 ${isAr ? 'font-cairo' : 'font-sans'}`} dir={dir}>

      {/* ══════════ SIDEBAR ══════════ */}
      {!sidebarCollapsed && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={toggleSidebar} />
      )}

      <aside className={`fixed top-0 ${sidebarSide} h-full bg-white shadow-lg z-50 transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'w-0 lg:w-[78px] overflow-hidden' : 'w-[270px]'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Activity size={22} className="text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-800 leading-tight">{tx.hospitalSystem}</span>
              <span className="text-[11px] text-gray-400">{tx.hospitalSub}</span>
            </div>
          )}
          <button className={`${autoMargin} lg:hidden text-gray-400 hover:text-gray-600 cursor-pointer`} onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {!sidebarCollapsed && <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">{tx.mainMenu}</p>}
          <ul className="space-y-1 mb-4">
            {mainNavItems.map((item) => (
              <li key={item.labelEn}>
                <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${item.active ? `bg-primary-50 text-primary-600 ${activeBorder}` : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'} ${sidebarCollapsed ? 'justify-center px-0' : ''}`}>
                  <span className={`flex-shrink-0 ${item.active ? 'text-primary-500' : 'text-gray-400'}`}>{item.icon}</span>
                  {!sidebarCollapsed && <span>{isAr ? item.labelAr : item.labelEn}</span>}
                </button>
              </li>
            ))}
          </ul>

          {!sidebarCollapsed && (
            <button onClick={() => setManagementOpen(!managementOpen)} className="w-full flex items-center justify-between px-3 mb-2 cursor-pointer">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{tx.management}</p>
              {managementOpen ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
            </button>
          )}
          {(managementOpen || sidebarCollapsed) && (
            <ul className="space-y-1">
              {managementItems.map((item) => (
                <li key={item.labelEn}>
                  <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${item.active ? `bg-primary-50 text-primary-600 ${activeBorder}` : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'} ${sidebarCollapsed ? 'justify-center px-0' : ''}`}>
                    <span className={`flex-shrink-0 ${item.active ? 'text-primary-500' : 'text-gray-400'}`}>{item.icon}</span>
                    {!sidebarCollapsed && <span>{isAr ? item.labelAr : item.labelEn}</span>}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* User profile */}
        <div className="border-t border-gray-100 p-4">
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
              {isAr ? 'م.أ' : 'MA'}
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{tx.ceoName}</p>
                <p className="text-[11px] text-gray-400">{tx.ceoTitle}</p>
              </div>
            )}
            {!sidebarCollapsed && (
              <button className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer" title={tx.logout}>
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <main className={`transition-all duration-300 min-h-screen ${mainMargin}`}>
        <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1400px]">

          {/* ══════════ HEADER ══════════ */}
          <header className="bg-white shadow-sm rounded-2xl px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer">
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">{tx.pageTitle}</h1>
                <p className="text-sm text-gray-400 mt-0.5">{tx.pageSubtitle}</p>
              </div>
            </div>

            <div className="order-last lg:order-none w-full lg:w-auto lg:flex-1 lg:max-w-md">
              <div className="relative">
                <Search size={18} className={`absolute ${searchIconPos} top-1/2 -translate-y-1/2 text-gray-400`} />
                <input type="text" placeholder={tx.searchPlaceholder} className={`w-full bg-gray-50 border border-gray-200 rounded-xl ${searchPadding} py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all`} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Toggle Button */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 cursor-pointer text-sm font-semibold"
                title={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
              >
                <Globe size={18} className="text-primary-500" />
                <span>{tx.langSwitch}</span>
              </button>

              <button className="relative w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer">
                <Bell size={19} />
                <span className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">3</span>
              </button>
              <button className={`flex items-center gap-2 bg-gradient-to-l from-primary-500 to-sky-500 hover:from-primary-600 hover:to-sky-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-primary-200 transition-all duration-200 cursor-pointer`}>
                <Plus size={18} />
                <span className="hidden sm:inline">{tx.addDept}</span>
              </button>
            </div>
          </header>

          {/* ══════════ STATS CARDS ══════════ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 font-medium">{isAr ? stat.titleAr : stat.titleEn}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{isAr ? stat.subtitleAr : stat.subtitleEn}</p>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl ${stat.iconBg} flex items-center justify-center ${stat.iconColor}`}>{stat.icon}</div>
                </div>
                {(stat.trendAr || stat.trendEn) && (
                  <div className="mt-4 pt-3 border-t border-gray-50">
                    <span className={`text-xs font-medium ${stat.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
                      {stat.trendUp ? '↑' : '↓'} {isAr ? stat.trendAr : stat.trendEn}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ══════════ DEPARTMENT TABLE ══════════ */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table header actions */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-gray-800">{tx.deptList}</h2>
                <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-2.5 py-1 rounded-lg">{filteredDepts.length} {tx.deptUnit}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value as 'all' | 'active' | 'inactive'); setCurrentPage(1); }} className={`appearance-none bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-xl ${filterPadding} py-2 focus:outline-none focus:ring-2 focus:ring-primary-200 cursor-pointer`}>
                    <option value="all">{tx.allStatuses}</option>
                    <option value="active">{tx.active}</option>
                    <option value="inactive">{tx.inactive}</option>
                  </select>
                  <Filter size={14} className={`absolute ${filterIconPos} top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none`} />
                </div>
                <button className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-xl px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Download size={16} />
                  <span className="hidden sm:inline">{tx.exportBtn}</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/70">
                    <th className={`${textAlign} text-xs font-semibold text-gray-400 uppercase px-6 py-3.5`}>{tx.colDeptName}</th>
                    <th className={`${textAlign} text-xs font-semibold text-gray-400 uppercase px-6 py-3.5`}>{tx.colHead}</th>
                    <th className="text-center text-xs font-semibold text-gray-400 uppercase px-6 py-3.5">{tx.colDoctors}</th>
                    <th className="text-center text-xs font-semibold text-gray-400 uppercase px-6 py-3.5">{tx.colLocation}</th>
                    <th className="text-center text-xs font-semibold text-gray-400 uppercase px-6 py-3.5">{tx.colStatus}</th>
                    <th className="text-center text-xs font-semibold text-gray-400 uppercase px-6 py-3.5">{tx.colActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedDepts.map((dept, idx) => (
                    <tr key={dept.id} className="hover:bg-sky-50/30 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} flex items-center justify-center flex-shrink-0`}>
                            <span className="text-white text-xs font-bold">{isAr ? dept.nameAr.charAt(4) : dept.nameEn.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{isAr ? dept.nameAr : dept.nameEn}</p>
                            <p className="text-[11px] text-gray-400">{tx.established} {dept.established}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColors[(idx + 2) % avatarColors.length]} flex items-center justify-center flex-shrink-0`}>
                            <span className="text-white text-[10px] font-bold">{dept.headAvatar}</span>
                          </div>
                          <span className="text-sm text-gray-700 font-medium">{isAr ? dept.headAr : dept.headEn}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center bg-sky-50 text-sky-600 text-sm font-bold rounded-lg w-10 h-8">{dept.doctorCount}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm text-gray-500">{isAr ? dept.locationAr : dept.locationEn}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${dept.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-500 border border-red-200'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${dept.status === 'active' ? 'bg-emerald-500' : 'bg-red-400'}`} />
                          {dept.status === 'active' ? tx.active : tx.inactive}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1 relative">
                          <button className="w-8 h-8 rounded-lg hover:bg-sky-50 text-gray-400 hover:text-sky-500 flex items-center justify-center transition-colors cursor-pointer" title={tx.view}><Eye size={16} /></button>
                          <button className="w-8 h-8 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 flex items-center justify-center transition-colors cursor-pointer" title={tx.edit}><Edit3 size={16} /></button>
                          <button className="w-8 h-8 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors cursor-pointer" title={tx.disable}><Ban size={16} /></button>
                          <div className="relative">
                            <button className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex items-center justify-center transition-colors cursor-pointer" onClick={() => setActionMenuId(actionMenuId === dept.id ? null : dept.id)}>
                              <MoreVertical size={16} />
                            </button>
                            {actionMenuId === dept.id && (
                              <div className={`absolute top-full ${isAr ? 'left-0' : 'right-0'} mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20`}>
                                <button className={`w-full ${textAlign} px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer`} onClick={() => setActionMenuId(null)}>{tx.viewDetails}</button>
                                <button className={`w-full ${textAlign} px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer`} onClick={() => setActionMenuId(null)}>{tx.transferDoctors}</button>
                                <button className={`w-full ${textAlign} px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer`} onClick={() => setActionMenuId(null)}>{tx.deleteDept}</button>
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
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 flex-wrap gap-3">
              <p className="text-sm text-gray-400">
                {tx.showing} <span className="font-semibold text-gray-600">{showingFrom}</span> - <span className="font-semibold text-gray-600">{showingTo}</span> {tx.of} <span className="font-semibold text-gray-600">{filteredDepts.length}</span> {tx.item}
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">{tx.prev}</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} onClick={() => setCurrentPage(page)} className={`w-9 h-9 text-sm font-semibold rounded-xl transition-colors cursor-pointer ${currentPage === page ? 'bg-primary-500 text-white shadow-md shadow-primary-200' : 'text-gray-500 hover:bg-gray-100'}`}>{page}</button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">{tx.next}</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
