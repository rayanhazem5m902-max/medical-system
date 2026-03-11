import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Activity,
  AlertCircle,
  Calendar,
  LayoutDashboard,
  Settings,
  Globe,
  Search,
  Bell,
  Menu,
  ClipboardList,
  UserCog,
  Pill,
  Briefcase,
  Warehouse,
  Wallet,
  UsersRound,
  Layers,
  FileText,
  Coins,
  Contact2,
  Clock,
  LogOut,
  Microscope,
  CheckCircle,
  ShoppingCart
} from 'lucide-react';
import './dashboard.css';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

type Lang = 'ar' | 'en';

const translations = {
  ar: {
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
    financialReports: 'التقارير المالية',
    payrollManagement: 'إدارة الرواتب',
    deptManagement: 'إدارة الأقسام',
    employeeManagement: 'إدارة الموظفين',
    settings: 'الإعدادات',
    search: 'بحث...',
    dailyRevenue: 'إيرادات اليوم',
    totalPatients: 'إجمالي المرضى',
    waitingPatients: 'مرضى في الانتظار',
    completedVisits: 'زيارات مكتملة',
    expiredMeds: 'أدوية منتهية',
    oosMeds: 'أصناف نفذت',
    totalInventory: 'إجمالي أصناف المخزن',
    pendingPurchases: 'طلبات شراء معلقة',
    statusActive: 'نشط',
    statusUrgent: 'عاجل',
    statusWarning: 'تنبيه',
    statusInProgress: 'قيد التوريد',
    patientStatus: 'تتبع حالة المرضى (النوبات)',
    inventoryAlerts: 'صندوق تنبيهات المستودع والصيدلية',
    doctorMonitoring: 'رقابة حضور الأطباء',
    regToday: 'مسجل اليوم',
    opRoom: 'في العمليات',
    inClinic: 'في العيادة',
    lateDoctors: 'أطباء متأخرين',
    absentDoctors: 'الأطباء الغائبون',
    hospitalOverview: 'نظرة عامة على المستشفى',
    hospitalSlogan: 'نظام إدارة مستشفى الشفاء المتكامل في الوقت الفعلي',
    userName: 'د. سارة خليل',
    userStatus: 'متاح حالياً',
    addPatient: 'إضافة مريض',
    language: 'English',
    laboratory: 'المعامل'
  },
  en: {
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
    search: 'Search...',
    dailyRevenue: 'Daily Revenue',
    totalPatients: 'Total Patients',
    waitingPatients: 'Waiting Patients',
    completedVisits: 'Completed Visits',
    expiredMeds: 'Expired Meds',
    oosMeds: 'Out of Stock',
    totalInventory: 'Total Inventory Items',
    pendingPurchases: 'Pending Purchases',
    statusActive: 'Active',
    statusUrgent: 'Urgent',
    statusWarning: 'Warning',
    statusInProgress: 'In Progress',
    patientStatus: 'Patient Status Tracking',
    inventoryAlerts: 'Warehouse & Pharmacy Alarm Box',
    doctorMonitoring: 'Doctor Attendance Monitoring',
    regToday: 'Reg. Today',
    opRoom: 'In OP Room',
    inClinic: 'In Clinic',
    lateDoctors: 'Late Doctors',
    absentDoctors: 'Absent Doctors',
    hospitalOverview: 'Hospital Overiew',
    hospitalSlogan: 'Integrated Al-Shifa Hospital Management System',
    userName: 'Dr. Sara Khalil',
    userStatus: 'Active Now',
    addPatient: 'Add Patient',
    language: 'العربية',
    laboratory: 'Laboratory'
  }
};

export default function Dashboard() {
  const [lang, setLang] = useState<Lang>('ar');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const isRTL = lang === 'ar';
  const t = translations[lang];

  const mainMenuItems = [
    { id: 'dash', label: t.dashboard, icon: LayoutDashboard, active: window.location.pathname === '/dashboard' },
    { id: 'patients', label: t.patients, icon: FileText, active: window.location.pathname === '/patients' },
    { id: 'appts', label: t.appointments, icon: Calendar, active: window.location.pathname === '/appointment' },
    { id: 'reception', label: t.reception, icon: ClipboardList, active: window.location.pathname === '/reception' },
    { id: 'doctors', label: t.doctors, icon: Activity, active: window.location.pathname === '/doctor-management' },
    { id: 'pharmacy', label: t.pharmacy, icon: Pill, active: window.location.pathname === '/pharmacy' },
    { id: 'laboratory', label: t.laboratory, icon: Microscope, active: window.location.pathname === '/laboratory' },
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

  const patientStats = [
    { id: 'patients', label: t.totalPatients, value: '2,845', icon: Users, color: 'primary' },
    { id: 'appts', label: t.waitingPatients, value: '42', icon: Clock, color: 'warning' },
    { id: 'visits', label: t.completedVisits, value: '156', icon: CheckCircle, color: 'success' },
  ];

  const inventoryStats = [
    { label: t.totalInventory, value: '1,240', icon: Warehouse, color: 'info', status: t.statusActive },
    { label: t.oosMeds, value: '7', icon: AlertCircle, color: 'warning', status: t.statusUrgent },
    { label: t.expiredMeds, value: '18', icon: AlertCircle, color: 'danger', status: t.statusWarning },
    { label: t.pendingPurchases, value: '3', icon: ShoppingCart, color: 'primary', status: t.statusInProgress },
  ];

  const notifications = [
    { id: 1, type: 'medicine', title: isRTL ? 'إشعار دواء' : 'Medicine Alert', message: isRTL ? 'كميّة الإنسولين قاربت على الانتهاء' : 'Insulin stock is running low', time: '5m' },
    { id: 2, type: 'medicine', title: isRTL ? 'تنبيه انتهاء' : 'Expiry Warning', message: isRTL ? 'دواء "بانادول" تنتهي صلاحيته قريباً' : 'Panadol expires soon (Batch #44)', time: '15m' },
    { id: 3, type: 'doctor', title: isRTL ? 'تأخر حضور' : 'Attendance Delay', message: isRTL ? 'د. حاتم متأخر عن موعده' : 'Dr. Hatem is delayed by 15 mins', time: '10m' },
  ];

  return (
    <div className="min-h-screen bg-bg flex font-['Cairo']" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

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
          {/* Main Menu */}
          <p className="px-5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 mt-4">{isRTL ? 'القائمة الرئيسية' : 'Main Menu'}</p>
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'patients') navigate('/patients');
                if (item.id === 'dash') navigate('/dashboard');
                if (item.id === 'reception') navigate('/reception');
                if (item.id === 'pharmacy') navigate('/pharmacy');
                if (item.id === 'laboratory') navigate('/laboratory');
                if (item.id === 'appts') navigate('/appointment');
                if (item.id === 'doctors') navigate('/doctors');
              }}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group",
                item.id === 'dash' ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", item.id === 'dash' ? "text-white" : "text-slate-400 group-hover:text-blue-600")} />
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-4 pb-2 px-6">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.management}</h4>
          </div>

          {managementItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'serv-mgmt') navigate('/services');
                if (item.id === 'doc-mgmt') navigate('/doctor-management');
                if (item.id === 'emp-mgmt') navigate('/employee');
                if (item.id === 'dept-mgmt') navigate('/department');
                if (item.id === 'pharma-mgmt') navigate('/pharmacy-inventory');
                if (item.id === 'fin-mgmt') navigate('/payroll');
                if (item.id === 'payroll-mgmt') navigate('/salary-management');
              }}
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
          <button
            onClick={() => navigate('/setting')}
            className="w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-slate-500 hover:bg-slate-50 hover:text-blue-600"
          >
            <Settings className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
            <span className="text-sm font-bold">{t.settings}</span>
          </button>
        </div>

        <div className="p-4 border-t border-slate-100 mx-2 pb-8 bg-slate-50/50 rounded-b-[40px]">
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white font-black text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 truncate">{t.userName}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase">{t.userStatus}</p>
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
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="relative max-w-md w-full group">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-primary ${isRTL ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                placeholder={t.search}
                className={`w-full ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-2.5 bg-gray-50 border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-xl outline-none transition-all text-sm`}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Toggle - Globe Icon */}
            <button
              onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
              className="p-3 bg-slate-50 text-slate-500 hover:text-primary rounded-2xl transition-all border border-slate-100 flex items-center gap-2 group active:scale-95"
              title={t.language}
            >
              <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-3 bg-slate-50 text-slate-500 hover:text-primary rounded-2xl transition-all border border-slate-100 relative group active:scale-95"
            >
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className={`absolute top-16 ${isRTL ? 'left-0' : 'right-0'} w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-4 duration-200`}>
                <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                  <h4 className="font-bold text-gray-900">{isRTL ? 'التنبيهات والتحذيرات' : 'Alerts & Notifications'}</h4>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">3 {isRTL ? 'جديد' : 'New'}</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${notif.type === 'medicine' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'}`}>
                          {notif.type === 'medicine' ? <Pill className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h5 className="text-sm font-bold text-gray-900 mb-0.5">{notif.title}</h5>
                            <span className="text-[10px] text-gray-400 font-medium">{notif.time}</span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed font-medium">{notif.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-50">
                  <button className="text-xs font-bold text-primary hover:text-blue-700 transition-colors">
                    {isRTL ? 'عرض كافة التنبيهات' : 'View all alerts'}
                  </button>
                </div>
              </div>
            )}

            <div className={`h-10 w-px bg-gray-100 mx-2`}></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{t.userName}</p>
                <p className="text-xs text-success font-medium">{t.userStatus}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-blue-800 rounded-xl flex items-center justify-center text-white shadow-lg overflow-hidden border-2 border-white">
                <img src={`https://ui-avatars.com/api/?name=Sara+Khalail&background=1a4fa0&color=fff`} alt="User avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <main className="flex-1 p-6 overflow-y-auto space-y-8">
          {/* Hospital Overview Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t.hospitalOverview}</h2>
              <p className="text-gray-500 text-sm mt-1">{t.hospitalSlogan}</p>
            </div>
          </div>

          {/* Patients Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {patientStats.map((stat, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (stat.id === 'patients') navigate('/patients');
                  if (stat.id === 'appts') navigate('/appointment');
                }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                  </div>
                  <div className={`p-4 rounded-2xl bg-${stat.color}-light text-${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Inventory & Pharmacy Management Header */}
          <div className="pt-4">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{t.inventoryAlerts}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {inventoryStats.map((stat, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-${stat.color}-light text-${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full border ${stat.color === 'success' ? 'bg-success-light text-success border-success/20' :
                      stat.color === 'warning' ? 'bg-warning-light text-warning border-warning/20' :
                        stat.color === 'danger' ? 'bg-danger-light text-danger border-danger/20' :
                          'bg-primary-light text-primary border-primary/20'
                      }`}>
                      {stat.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs font-semibold">{stat.label}</p>
                  <h4 className="text-xl font-bold text-gray-900 mt-1">{stat.value}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Inventory Alerts Box */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between bg-primary group cursor-pointer">
                <div className="flex items-center gap-3 text-white">
                  <Warehouse className="w-5 h-5" />
                  <h3 className="font-bold text-lg">{t.inventoryAlerts}</h3>
                </div>
                <div className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold text-white animate-pulse">
                  {t.statusUrgent}
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: isRTL ? 'إنسولين 100 وحدة' : 'Insulin 100U', status: isRTL ? 'منتهي الصلاحية' : 'Expired', count: '12', color: 'danger', percent: 100 },
                    { name: isRTL ? 'كمامات جراحية' : 'Surgical Masks', status: isRTL ? 'نفدت الكمية' : 'Out of Stock', count: '0', color: 'warning', percent: 95 },
                    { name: isRTL ? 'شاش معقم' : 'Sterile Gauze', status: isRTL ? 'مستوى منخفض' : 'Low Level', count: '50', color: 'info', percent: 15 },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-gray-800">{item.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold bg-${item.color}-light text-${item.color}`}>{item.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full bg-${item.color}`} style={{ width: `${item.percent}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500">{item.count} unit</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Doctor Attendance Monitoring - At the Bottom */}
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-sidebar to-blue-900 px-8 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                    <UserCog className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{t.doctorMonitoring}</h3>
                    <p className="text-blue-100 text-xs mt-0.5">{isRTL ? 'تتبع فوري لحضور وانصراف الطاقم الطبي' : 'Real-time tracking of medical staff attendance'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl backdrop-blur-md">
                  <Users className="w-4 h-4 text-white/70" />
                  <span className="text-white font-bold text-sm">12 {isRTL ? 'طبيب مناوب' : 'On-duty'}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Absent Doctors */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-danger rounded-full"></div>
                        <h4 className="font-bold text-gray-800">{t.absentDoctors}</h4>
                      </div>
                      <span className="px-3 py-1 bg-danger-light text-danger rounded-full text-xs font-extrabold shadow-sm">2 {isRTL ? 'غائب' : 'Absent'}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { name: isRTL ? 'د. فيصل الزامل' : 'Dr. Faisal', specialty: isRTL ? 'استشاري عظام' : 'Ortho Consultant', img: 'https://ui-avatars.com/api/?name=Faisal&background=fee2e2&color=ef4444' },
                        { name: isRTL ? 'د. منيرة سعود' : 'Dr. Munira', specialty: isRTL ? 'أخصائي أطفال' : 'Pediatrician', img: 'https://ui-avatars.com/api/?name=Munira&background=fee2e2&color=ef4444' },
                      ].map((doc, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-danger/30 hover:shadow-lg hover:shadow-danger/5 transition-all group">
                          <img src={doc.img} alt={doc.name} className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">{doc.name}</p>
                            <p className="text-[11px] text-gray-500 font-medium">{doc.specialty}</p>
                            <span className="inline-block mt-1 text-[9px] font-bold text-danger bg-danger/5 px-2 py-0.5 rounded uppercase">{isRTL ? 'غير متصل' : 'Offline'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Late Doctors */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-warning rounded-full"></div>
                        <h4 className="font-bold text-gray-800">{t.lateDoctors}</h4>
                      </div>
                      <span className="px-3 py-1 bg-warning-light text-warning rounded-full text-xs font-extrabold shadow-sm">1 {isRTL ? 'متأخر' : 'Late'}</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100 flex items-center gap-5 hover:shadow-lg hover:shadow-orange-200/20 transition-all group">
                      <div className="relative">
                        <img src="https://ui-avatars.com/api/?name=Khalid&background=f59e0b&color=fff" alt="Khalid" className="w-16 h-16 rounded-2xl shadow-md border-2 border-white group-hover:rotate-3 transition-transform" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-warning text-white rounded-lg flex items-center justify-center shadow-lg">
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-base font-bold text-gray-900">{isRTL ? 'د. خالد الحربي' : 'Dr. Khalid'}</p>
                            <p className="text-xs text-gray-500 font-medium">{isRTL ? 'قلب وأوعية دموية' : 'Cardiovascular'}</p>
                          </div>
                          <span className="px-3 py-1 bg-warning text-white rounded-lg text-xs font-bold animate-pulse">
                            +25 min
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-700 bg-orange-100 px-2.5 py-1 rounded-md">
                            <Calendar className="w-3 h-3" />
                            {isRTL ? 'نوبة صباحية' : 'Morning Shift'}
                          </div>
                          <button className="ms-auto text-[11px] font-extrabold text-primary hover:underline underline-offset-4 decoration-2">
                            {isRTL ? 'إرسال تنبيه' : 'Send Alert'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Unified Alert Center - Full Page Width */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-red-900/5 border border-red-100 overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">{isRTL ? 'مركز التنبيهات الشامل' : 'System Alert Center'}</h3>
                    <p className="text-red-100 text-[11px] mt-0.5">{isRTL ? 'تحذيرات فورية للأدوية والحضور' : 'Live critical warnings for inventory and attendance'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
                  <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                  <span className="text-white font-bold text-[10px]">4 {isRTL ? 'تنبيهات نشطة' : 'ACTIVE ALERTS'}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Medicine Shortage Alert */}
                  <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100 hover:shadow-xl hover:shadow-orange-900/5 transition-all group group relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-orange-500 text-white rounded-lg shadow-lg shadow-orange-500/20">
                        <Pill className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-orange-900 text-sm">{isRTL ? 'نقص أدوية' : 'Medicine Shortage'}</h4>
                    </div>
                    <p className="text-xs text-orange-800 font-bold mb-1">{isRTL ? 'إنسولين 100 وحدة' : 'Insulin 100U'}</p>
                    <p className="text-[10px] text-orange-600 font-medium">{isRTL ? 'الكمية المتبقية: 5 قطع فقط' : 'Stock remaining: 5 units only'}</p>
                    <div className="mt-4 h-1.5 w-full bg-orange-200 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-600 w-[15%] rounded-full shadow-[0_0_8px_rgba(234,88,12,0.5)]"></div>
                    </div>
                  </div>

                  {/* Expiry Alert */}
                  <div className="p-5 rounded-2xl bg-red-50/50 border border-red-100 hover:shadow-xl hover:shadow-red-900/5 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-red-500 text-white rounded-lg shadow-lg shadow-red-500/20">
                        <Activity className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-red-900 text-sm">{isRTL ? 'صلاحية منتهية' : 'Expiry Warning'}</h4>
                    </div>
                    <p className="text-xs text-red-800 font-bold mb-1">{isRTL ? 'بانادول (دفعة 44)' : 'Panadol (Batch 44)'}</p>
                    <p className="text-[10px] text-red-600 font-medium">{isRTL ? 'تنتهي خلال 48 ساعة' : 'Expires in 48 hours'}</p>
                    <div className="mt-4 flex justify-end">
                      <button className="text-[10px] font-extrabold text-red-700 bg-red-100 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors uppercase tracking-wider">{isRTL ? 'إتلاف فوري' : 'Action Required'}</button>
                    </div>
                  </div>

                  {/* Doctor Late Alert */}
                  <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 hover:shadow-xl hover:shadow-amber-900/5 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-amber-500 text-white rounded-lg shadow-lg shadow-amber-500/20">
                        <Clock className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-amber-900 text-sm">{isRTL ? 'تأخر حضور' : 'Attendance Delay'}</h4>
                    </div>
                    <p className="text-xs text-amber-800 font-bold mb-1">{isRTL ? 'د. حاتم (باطنية)' : 'Dr. Hatem (Internal)'}</p>
                    <p className="text-[10px] text-amber-600 font-medium">{isRTL ? 'متأخر 15 دقيقة عن عيادته' : 'Delayed 15 mins for clinic'}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">Urgent</span>
                      <button className="text-[10px] font-extrabold text-amber-800 hover:underline">{isRTL ? 'اتصل الآن' : 'Call'}</button>
                    </div>
                  </div>

                  {/* Staff Absence Alert */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-xl hover:shadow-slate-900/5 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-slate-700 text-white rounded-lg shadow-lg shadow-slate-700/20">
                        <Users className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{isRTL ? 'غياب بدون عذر' : 'No Arrival Alert'}</h4>
                    </div>
                    <p className="text-xs text-slate-800 font-bold mb-1">{isRTL ? 'د. فيصل (عظام)' : 'Dr. Faisal (Ortho)'}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{isRTL ? 'لم يسجل دخول للنوبة' : 'Missing from morning shift'}</p>
                    <div className="mt-4 flex items-center gap-1.5 opacity-50">
                      <div className="flex-1 bg-slate-200 h-1 rounded-full"></div>
                      <span className="text-[8px] font-bold text-slate-400">Offline</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
