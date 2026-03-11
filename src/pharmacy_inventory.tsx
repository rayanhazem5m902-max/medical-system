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
  Package,
  ShoppingCart,
  Download,
  AlertCircle,
  Edit2,
  Trash2,
  Filter,
  MoreVertical
} from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

type Lang = 'ar' | 'en';

const translations = {
  ar: {
    inventoryTitle: 'إدارة الصيدلية والمخزون',
    inventorySlogan: 'مراقبة مستويات المخزون في الوقت الفعلي وتوريد الأدوية',
    addMed: 'إضافة دواء جديد',
    export: 'تصدير البيانات',
    search: 'بحث في المخزون الدوائي...',
    totalMeds: 'إجمالي الأدوية',
    lowStock: 'انخفاض المخزون',
    expiringSoon: 'قرب الانتهاء',
    dailyOrders: 'طلبات اليوم',
    medName: 'اسم الدواء',
    category: 'التصنيف',
    stock: 'المخزون',
    expiry: 'تاريخ الانتهاء',
    price: 'السعر',
    actions: 'الإجراءات',
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
    activePharmacists: 'على رأس العمل',
    pharmacyTitle: 'الصيدلية'
  },
  en: {
    inventoryTitle: 'Pharmacy & Inventory',
    inventorySlogan: 'Real-time stock level monitoring and supply management',
    addMed: 'Add New Medication',
    export: 'Export Data',
    search: 'Search drug inventory...',
    totalMeds: 'Total Medications',
    lowStock: 'Low Stock',
    expiringSoon: 'Expiring Soon',
    dailyOrders: 'Daily Orders',
    medName: 'Medication Name',
    category: 'Category',
    stock: 'Stock',
    expiry: 'Expiry Date',
    price: 'Price',
    actions: 'Actions',
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
    activePharmacists: 'Active Pharmacists',
    pharmacyTitle: 'Pharmacy'
  }
};

const INITIAL_MEDICATIONS = [
  { id: 'MED-001', name: 'Panadol Advance', category: 'Analgesics', stock: 450, maxStock: 1000, expiry: '2025-12-01', price: 15.00, status: 'Active' },
  { id: 'MED-002', name: 'Amoxicillin 500mg', category: 'Antibiotics', stock: 85, maxStock: 500, expiry: '2024-08-15', price: 45.50, status: 'Low Stock' },
  { id: 'MED-003', name: 'Metformin 850mg', category: 'Diabetes', stock: 210, maxStock: 400, expiry: '2026-01-10', price: 32.00, status: 'Active' },
  { id: 'MED-004', name: 'Lisinopril 10mg', category: 'Hypertension', stock: 15, maxStock: 300, expiry: '2024-05-20', price: 28.75, status: 'Critical' },
  { id: 'MED-005', name: 'Lipitor 20mg', category: 'Cholesterol', stock: 120, maxStock: 400, expiry: '2025-03-30', price: 85.00, status: 'Active' },
];

export default function PharmacyInventory() {
  const [lang, setLang] = useState<Lang>('ar');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const isRTL = lang === 'ar';
  const t = translations[lang];

  const mainMenuItems = [
    { id: 'dash', label: t.dashboard, icon: LayoutDashboard, path: '/dashboard' },
    { id: 'patients', label: t.patients, icon: FileText, path: '/patients' },
    { id: 'appts', label: t.appointments, icon: Calendar, path: '/appointment' },
    { id: 'reception', label: t.reception, icon: ClipboardList, path: '/reception' },
    { id: 'doctors', label: t.doctors, icon: Activity, path: '/doctors' },
    { id: 'pharmacy', label: t.pharmacy, icon: Pill, path: '/pharmacy' },
    { id: 'laboratory', label: t.laboratory, icon: Microscope, path: '/laboratory' },
  ];

  const managementItems = [
    { id: 'doc-mgmt', label: t.doctorManagement, icon: UsersRound, path: '/doctor-management' },
    { id: 'emp-mgmt', label: t.employeeManagement, icon: Contact2, path: '/employee' },
    { id: 'serv-mgmt', label: t.servicesManagement, icon: Briefcase, path: '/services' },
    { id: 'pharma-mgmt', label: t.pharmacyWarehouse, icon: Warehouse, path: '/pharmacy-inventory', active: true },
    { id: 'dept-mgmt', label: t.deptManagement, icon: Layers, path: '/department' },
    { id: 'fin-mgmt', label: t.financialManagement, icon: Wallet, path: '/payroll' },
    { id: 'payroll-mgmt', label: t.payrollManagement, icon: Coins, path: '/salary-management' },
  ];

  const stats = [
    { label: t.totalMeds, value: '1,250', icon: Package, color: 'blue' },
    { label: t.lowStock, value: '14', icon: AlertCircle, color: 'red' },
    { label: t.expiringSoon, value: '28', icon: Calendar, color: 'amber' },
    { label: t.dailyOrders, value: '45', icon: ShoppingCart, color: 'emerald' },
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
                item.active ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", item.active ? "text-white" : "text-slate-400 group-hover:text-blue-600")} />
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Inventory Page Content */}
        <main className="flex-1 p-8 overflow-y-auto space-y-8 bg-[#F8FAFC]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-blue-600">
                <div className="p-2.5 bg-blue-100 rounded-xl">
                  <Warehouse className="w-6 h-6" />
                </div>
                <span className="text-sm font-black uppercase tracking-widest">{t.pharmacyWarehouse}</span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{t.inventoryTitle}</h1>
              <p className="text-slate-500 font-medium">{t.inventorySlogan}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-xl font-bold border border-slate-200 shadow-sm hover:bg-slate-50 transition-all">
                <Download className="w-5 h-5" />
                <span>{t.export}</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95">
                <Plus className="w-5 h-5" />
                <span>{t.addMed}</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group overflow-hidden relative">
                <div className="flex items-center justify-between relative z-10">
                  <div className={cn(
                    "p-3 rounded-xl",
                    stat.color === 'blue' ? "bg-blue-50 text-blue-600" :
                    stat.color === 'red' ? "bg-red-50 text-red-600" :
                    stat.color === 'amber' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                  )}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-6 relative z-10">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <stat.icon className="w-24 h-24" />
                </div>
              </div>
            ))}
          </div>

          {/* Medication Table */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-2xl">
                  <Filter className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-black text-slate-900">{isRTL ? 'قائمة الأصناف' : 'Inventory List'}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  {INITIAL_MEDICATIONS.length} {isRTL ? 'صنف' : 'Items'}
                </span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-start">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-8 py-5 text-start">{t.medName}</th>
                    <th className="px-6 py-5 text-start">{t.category}</th>
                    <th className="px-6 py-5 text-start">{t.stock}</th>
                    <th className="px-6 py-5 text-start">{t.expiry}</th>
                    <th className="px-6 py-5 text-start">{t.price}</th>
                    <th className="px-8 py-5 text-center">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {INITIAL_MEDICATIONS.map((med) => (
                    <tr key={med.id} className="group hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <Pill className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{med.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{med.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                          {med.category}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 min-w-[100px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                med.status === 'Critical' ? "bg-red-500" : med.status === 'Low Stock' ? "bg-amber-500" : "bg-emerald-500"
                              )}
                              style={{ width: `${(med.stock / med.maxStock) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-black text-slate-900">{med.stock}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-xs font-bold text-slate-500">{med.expiry}</td>
                      <td className="px-6 py-6 text-sm font-black text-slate-900">{med.price} SAR</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
              <button className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                {isRTL ? 'تحميل السجل الكامل للمخزون' : 'Load full inventory log'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
