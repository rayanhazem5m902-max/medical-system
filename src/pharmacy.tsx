import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Globe,
  Search,
  Bell,
  Menu,
  Pill,
  Warehouse,
  LogOut,
  Settings,
  LayoutDashboard,
  FileText,
  Calendar,
  ClipboardList,
  Microscope,
  UsersRound,
  Contact2,
  Briefcase,
  Layers,
  Wallet,
  Coins,
  Plus,
  ArrowRight,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Receipt,
  History
} from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

type Lang = 'ar' | 'en';

const translations = {
  ar: {
    pharmacyTitle: 'إدارة الصيدلية',
    pharmacySlogan: 'التحكم الشامل في صرف الأدوية والمخزون الدوائي',
    dispenseMed: 'صرف دواء',
    inventory: 'المخزون',
    medications: 'الأدوية',
    dailySales: 'مبيعات اليوم',
    pendingPrescriptions: 'وصفات قيد الانتظار',
    lowStockAlerts: 'تنبيهات انخفاض المخزون',
    totalMeds: 'إجمالي الأصناف',
    activePharmacists: 'الصيادلة المناوبون',
    recentTransactions: 'آخر العمليات',
    search: 'بحث عن دواء أو وصفة...',
    dashboard: 'لوحة القيادة',
    patients: 'سجلات المرضى',
    appointments: 'المواعيد',
    reception: 'الاستقبال',
    doctors: 'الأطباء',
    pharmacy: 'الصيدلية',
    management: 'الإدارة',
    doctorManagement: 'إدارة الأطباء',
    servicesManagement: 'إدارة الخدمات',
    pharmacyWarehouse: 'إدارة الصيدلية والمخزون',
    financialManagement: 'الإدارة المالية',
    payrollManagement: 'إدارة الرواتب',
    deptManagement: 'إدارة الأقسام',
    employeeManagement: 'إدارة الموظفين',
    settings: 'الإعدادات',
    userName: 'د. سارة خليل',
    userStatus: 'متاح حالياً',
    language: 'English',
    laboratory: 'المعامل',
    viewAll: 'عرض الكل',
    newOrder: 'طلب شراء جديد',
    reports: 'التقارير'
  },
  en: {
    pharmacyTitle: 'Pharmacy Management',
    pharmacySlogan: 'Complete control over drug dispensing and inventory',
    dispenseMed: 'Dispense Medicine',
    inventory: 'Inventory',
    medications: 'Medications',
    dailySales: 'Daily Sales',
    pendingPrescriptions: 'Pending Prescriptions',
    lowStockAlerts: 'Low Stock Alerts',
    totalMeds: 'Total Items',
    activePharmacists: 'Active Pharmacists',
    recentTransactions: 'Recent Transactions',
    search: 'Search for medicine or prescription...',
    dashboard: 'Dashboard',
    patients: 'Patient Records',
    appointments: 'Appointments',
    reception: 'Reception',
    doctors: 'Doctors',
    pharmacy: 'Pharmacy',
    management: 'Management',
    doctorManagement: 'Doctor Management',
    servicesManagement: 'Services Management',
    pharmacyWarehouse: 'Pharmacy & Warehouse',
    financialManagement: 'Financial Management',
    payrollManagement: 'Payroll Management',
    deptManagement: 'Departments Management',
    employeeManagement: 'Employee Management',
    settings: 'Settings',
    userName: 'Dr. Sara Khalil',
    userStatus: 'Active Now',
    language: 'العربية',
    laboratory: 'Laboratory',
    viewAll: 'View All',
    newOrder: 'New Purchase Order',
    reports: 'Reports'
  }
};

export default function Pharmacy() {
  const [lang, setLang] = useState<Lang>('ar');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const isRTL = lang === 'ar';
  const t = translations[lang];

  const mainMenuItems = [
    { id: 'dash', label: t.dashboard, icon: LayoutDashboard, path: '/dashboard' },
    { id: 'patients', label: t.patients, icon: FileText, path: '/patients' },
    { id: 'appts', label: t.appointments, icon: Calendar, path: '/appointment' },
    { id: 'reception', label: t.reception, icon: ClipboardList, path: '/reception' },
    { id: 'doctors', label: t.doctors, icon: Activity, path: '/doctors' },
    { id: 'pharmacy', label: t.pharmacy, icon: Pill, path: '/pharmacy', active: true },
    { id: 'laboratory', label: t.laboratory, icon: Microscope, path: '/laboratory' },
  ];

  const managementItems = [
    { id: 'doc-mgmt', label: t.doctorManagement, icon: UsersRound, path: '/doctor-management' },
    { id: 'emp-mgmt', label: t.employeeManagement, icon: Contact2, path: '/employee' },
    { id: 'serv-mgmt', label: t.servicesManagement, icon: Briefcase, path: '/services' },
    { id: 'pharma-mgmt', label: t.pharmacyWarehouse, icon: Warehouse, path: '/pharmacy-inventory' },
    { id: 'dept-mgmt', label: t.deptManagement, icon: Layers, path: '/department' },
    { id: 'fin-mgmt', label: t.financialManagement, icon: Wallet, path: '/payroll' },
    { id: 'payroll-mgmt', label: t.payrollManagement, icon: Coins, path: '/salary-management' },
  ];

  const stats = [
    { label: t.dailySales, value: 'SAR 12,450', icon: TrendingUp, color: 'success', trend: '+12%' },
    { label: t.pendingPrescriptions, value: '28', icon: Receipt, color: 'primary', trend: '-5%' },
    { label: t.lowStockAlerts, value: '14', icon: AlertTriangle, color: 'danger', trend: 'High Priority' },
    { label: t.totalMeds, value: '1,840', icon: Package, color: 'info', trend: 'In Stock' },
  ];

  const quickActions = [
    { title: t.dispenseMed, desc: isRTL ? 'معالجة الوصفات الطبية للمرضى' : 'Process patient prescriptions', icon: Pill, path: '/dispense', color: 'blue' },
    { title: t.inventory, desc: isRTL ? 'متابعة وتحديث المخزون الدوائي' : 'Track and update drug stock', icon: Warehouse, path: '/pharmacy-inventory', color: 'emerald' },
    { title: t.newOrder, desc: isRTL ? 'طلب أدوية جديدة للمستودع' : 'Order new medicine for warehouse', icon: ShoppingCart, path: '#', color: 'amber' },
    { title: t.reports, desc: isRTL ? 'تقارير المبيعات والمخزون' : 'Sales and inventory reports', icon: History, path: '#', color: 'purple' },
  ];

  const recentTransactions = [
    { id: 'TX-8821', patient: isRTL ? 'أحمد محمد' : 'Ahmed Mohamed', med: 'Augmentin 1g', date: '2024-03-10 14:20', status: 'Completed', amount: '120 SAR' },
    { id: 'TX-8822', patient: isRTL ? 'سارة علي' : 'Sara Ali', med: 'Panadol Extra', date: '2024-03-10 14:15', status: 'Pending', amount: '45 SAR' },
    { id: 'TX-8823', patient: isRTL ? 'خالد عبدالله' : 'Khalid Abdullah', med: 'Nexium 40mg', date: '2024-03-10 14:05', status: 'Completed', amount: '210 SAR' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Cairo']" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 z-50 w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 transform lg:relative lg:translate-x-0 border-l border-slate-100",
        sidebarOpen ? "translate-x-0" : (isRTL ? "translate-x-full" : "-translate-x-full")
      )}>
        <div className="p-8 pb-4">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-slate-900">{isRTL ? 'مستشفى الشفاء' : 'Al-Shifa'}</h1>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest leading-none mt-1">Medical Center</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto no-scrollbar">
          <p className="px-5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 mt-4">{isRTL ? 'القائمة الرئيسية' : 'Main Menu'}</p>
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group",
                item.active ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", item.active ? "text-white" : "text-slate-400 group-hover:text-blue-600")} />
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-4 pb-2 px-6">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.management}</h4>
          </div>

          {managementItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group",
                "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
              )}
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110 text-slate-400 group-hover:text-blue-600" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 mx-2 mb-2">
          <button onClick={() => navigate('/setting')} className="w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-slate-500 hover:bg-slate-50 hover:text-blue-600">
            <Settings className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
            <span className="text-sm font-bold">{t.settings}</span>
          </button>
        </div>

        <div className="p-4 border-t border-slate-100 mx-2 pb-8 bg-slate-50/50 rounded-b-[40px]">
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white font-black text-xs">AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 truncate">{t.userName}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase">{t.userStatus}</p>
            </div>
            <button onClick={() => navigate('/')} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="relative max-w-md w-full group">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-blue-600 ${isRTL ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                placeholder={t.search}
                className={`w-full ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-2.5 bg-gray-50 border-transparent focus:bg-white focus:border-blue-600/30 focus:ring-4 focus:ring-blue-600/5 rounded-xl outline-none transition-all text-sm`}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')} className="p-3 bg-slate-50 text-slate-500 hover:text-blue-600 rounded-2xl transition-all border border-slate-100 flex items-center gap-2 group active:scale-95">
              <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            <button onClick={() => setShowNotifications(!showNotifications)} className="p-3 bg-slate-50 text-slate-500 hover:text-blue-600 rounded-2xl transition-all border border-slate-100 relative group active:scale-95">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            <div className="h-10 w-px bg-gray-100 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{t.userName}</p>
                <p className="text-xs text-green-500 font-medium">{t.userStatus}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white shadow-lg overflow-hidden border-2 border-white">
                <img src={`https://ui-avatars.com/api/?name=Sara+Khalail&background=1a4fa0&color=fff`} alt="User avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Pharmacy Dashboard Page Content */}
        <main className="flex-1 p-8 overflow-y-auto space-y-8 bg-[#F8FAFC]">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-blue-600">
                <div className="p-2.5 bg-blue-100 rounded-xl">
                  <Pill className="w-6 h-6" />
                </div>
                <span className="text-sm font-black uppercase tracking-widest">{t.pharmacy}</span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{t.pharmacyTitle}</h1>
              <p className="text-slate-500 font-medium">{t.pharmacySlogan}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/dispense')}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95"
              >
                <Plus className="w-5 h-5" />
                <span>{t.dispenseMed}</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group overflow-hidden relative">
                <div className="flex items-center justify-between relative z-10">
                  <div className={`p-3 rounded-xl bg-${stat.color === 'primary' ? 'blue' : stat.color === 'success' ? 'green' : stat.color === 'danger' ? 'red' : 'sky'}-50 text-${stat.color === 'primary' ? 'blue' : stat.color === 'success' ? 'green' : stat.color === 'danger' ? 'red' : 'sky'}-600`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className={cn(
                    "text-[11px] font-bold px-2 py-1 rounded-lg bg-slate-50 text-slate-500",
                    stat.color === 'danger' && "text-red-600 bg-red-50"
                  )}>
                    {stat.trend}
                  </span>
                </div>
                <div className="mt-4 relative z-10">
                  <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <stat.icon className="w-24 h-24" />
                </div>
              </div>
            ))}
          </div>

          {/* Action Hub & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800">{isRTL ? 'إجراءات سريعة' : 'Quick Actions'}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => action.path !== '#' && navigate(action.path)}
                    className="flex flex-col text-start p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                      `bg-${action.color}-50 text-${action.color}-600`
                    )}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{action.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{action.desc}</p>
                    <div className={cn(
                      "absolute top-6 transition-all opacity-0 group-hover:opacity-100",
                      isRTL ? "left-6 group-hover:left-8" : "right-6 group-hover:right-8"
                    )}>
                      <ArrowRight className={cn("w-5 h-5 text-slate-300", isRTL && "rotate-180")} />
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-600/20">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{isRTL ? 'نظرة عامة على المبيعات' : 'Sales Overview'}</h3>
                    <p className="text-blue-100 text-sm font-medium max-w-sm">
                      {isRTL 
                        ? 'معدل صرف الأدوية في تزايد مستمر بنسبة 15% مقارنة بالأسبوع الماضي. يرجى التأكد من توفر المخزون الكافي.' 
                        : 'Medication dispensing rates are up 15% compared to last week. Please ensure adequate stock is available.'}
                    </p>
                    <button className="mt-8 px-6 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl font-bold text-sm transition-all">
                      {isRTL ? 'عرض تقارير الأسبوع' : 'View Weekly Reports'}
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-6 bg-white/10 backdrop-blur-lg rounded-[2rem] border border-white/10 flex flex-col items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">{isRTL ? 'القمة' : 'Peak'}</span>
                      <span className="text-3xl font-black">1.4k</span>
                      <span className="text-[10px] text-blue-100 font-medium mt-1">{isRTL ? 'وصفة' : 'Prescr.'}</span>
                    </div>
                    <div className="p-6 bg-blue-500/30 backdrop-blur-lg rounded-[2rem] border border-white/10 flex flex-col items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">{isRTL ? 'النمو' : 'Growth'}</span>
                      <span className="text-3xl font-black">+18%</span>
                      <span className="text-[10px] text-blue-100 font-medium mt-1">{isRTL ? 'شهرياً' : 'Monthly'}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800">{t.recentTransactions}</h3>
                <button className="text-sm font-bold text-blue-600 hover:underline">{t.viewAll}</button>
              </div>
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-slate-50">
                  {recentTransactions.map((tx, idx) => (
                    <div key={idx} className="p-5 hover:bg-slate-50 transition-colors group cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                            <Receipt className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{tx.patient}</p>
                            <p className="text-[11px] text-slate-400 font-medium">{tx.med}</p>
                          </div>
                        </div>
                        <span className="text-sm font-black text-slate-700">{tx.amount}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-slate-400 uppercase tracking-wider">{tx.date}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-md",
                          tx.status === 'Completed' ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                        )}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-slate-50/50 text-center">
                  <button className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                    {isRTL ? 'تصدير السجل اليومي' : 'Export Daily Log'}
                  </button>
                </div>
              </div>

              <div className="p-6 bg-red-50 rounded-3xl border border-red-100 space-y-4">
                <div className="flex items-center gap-3 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  <h4 className="font-bold">{isRTL ? 'تنبيهات حرجة' : 'Critical Alerts'}</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">Insulin Stock</span>
                    <span className="text-xs font-black text-red-600">5 units left</span>
                  </div>
                  <div className="w-full h-1.5 bg-red-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 w-[15%]"></div>
                  </div>
                  <button className="w-full py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all">
                    {isRTL ? 'إصدار طلب توريد عاجل' : 'Issue Urgent Supply Order'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
