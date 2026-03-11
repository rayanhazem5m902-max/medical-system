import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, LayoutDashboard, Microscope, Pill,
  ClipboardList, UsersRound, Contact2, Briefcase, Warehouse,
  Layers, Wallet, FileText, Coins, Activity,
  Settings, Search, Menu, Globe, Bell, LogOut, ChevronLeft,
  Download, Plus, MoreVertical, Eye, CheckCircle2
} from 'lucide-react';
import { cn } from './utils/cn';

/* ───────── Types ───────── */
type PaymentStatus = 'paid' | 'pending';

interface EmployeeSalary {
  id: string;
  name: string;
  code: string;
  role: string;
  department: string;
  basicSalary: number;
  commissions: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: PaymentStatus;
}

export default function Payroll() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [searchQuery, setSearchQuery] = useState('');
  const currentPage = 1;

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
      payrollTitle: 'إدارة الرواتب والأجور',
      payrollSubtitle: 'متابعة مسيرات الرواتب والمستحقات المالية للموظفين',
      totalStaff: 'إجمالي الكادر',
      financialProcessed: 'المعالج مالياً',
      monthlyBudget: 'ميزانية الشهر',
      searchPlaceholder: 'بحث باسم الموظف أو الكود...',
      exportBtn: 'تصدير التقارير',
      addPayroll: 'إضافة مسير رواتب',
      staffName: 'اسم الموظف',
      role: 'المسمى الوظيفي',
      basicSalary: 'الراتب الأساسي',
      commissions: 'العمولات',
      deductions: 'الخصومات',
      netSalary: 'صافي الراتب',
      status: 'الحالة',
      paid: 'مدفوع',
      pending: 'معلق',
      viewDetails: 'عرض التفاصيل',
      processPayment: 'معالجة الصرف',
      printSlip: 'طباعة القسيمة',
      currency: 'ر.س',
      of: 'من',
      items: 'موظفين',
      showing: 'عرض',
      prev: 'السابق',
      next: 'التالي',
      actions: 'الإجراءات'
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
      payrollTitle: 'Payroll Management',
      payrollSubtitle: 'Monitor staff salaries and financial entitlements',
      totalStaff: 'Total Staff',
      financialProcessed: 'Processed',
      monthlyBudget: 'Monthly Budget',
      searchPlaceholder: 'Search by employee name or code...',
      exportBtn: 'Export Reports',
      addPayroll: 'Add Payroll Run',
      staffName: 'Employee Name',
      role: 'Job Role',
      basicSalary: 'Basic Salary',
      commissions: 'Commissions',
      deductions: 'Deductions',
      netSalary: 'Net Salary',
      status: 'Status',
      paid: 'Paid',
      pending: 'Pending',
      viewDetails: 'View Details',
      processPayment: 'Process Payment',
      printSlip: 'Print Pay Slip',
      currency: 'SAR',
      of: 'of',
      items: 'staff',
      showing: 'Showing',
      prev: 'Prev',
      next: 'Next',
      actions: 'Actions'
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
    { id: 'fin-mgmt', label: t.financialManagement, icon: Wallet, active: true },
    { id: 'payroll-mgmt', label: t.payrollManagement, icon: Coins },
  ];

  const salaries: EmployeeSalary[] = [
    {
      id: '1',
      name: 'محمد سالم',
      code: 'EMP-202301',
      role: 'طبيب استشاري',
      department: 'قسم الجراحة',
      basicSalary: 25000,
      commissions: 5000,
      allowances: 3000,
      deductions: 1500,
      netSalary: 31500,
      status: 'paid'
    },
    {
      id: '2',
      name: 'سارة مروان',
      code: 'EMP-202305',
      role: 'ممرض/ة',
      department: 'قسم التمريض',
      basicSalary: 12000,
      commissions: 0,
      allowances: 2000,
      deductions: 500,
      netSalary: 13500,
      status: 'pending'
    },
    {
      id: '3',
      name: 'أحمد محمود',
      code: 'EMP-202308',
      role: 'فني أشعة',
      department: 'قسم الأشعة',
      basicSalary: 15000,
      commissions: 1000,
      allowances: 1500,
      deductions: 750,
      netSalary: 16750,
      status: 'paid'
    },
    {
      id: '4',
      name: 'ليلى حسن',
      code: 'EMP-202312',
      role: 'طبيب أخصائي',
      department: 'قسم القلب',
      basicSalary: 20000,
      commissions: 3500,
      allowances: 2500,
      deductions: 1200,
      netSalary: 24800,
      status: 'pending'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-US', { style: 'currency', currency: 'SAR', currencyDisplay: 'code' }).format(amount).replace('SAR', t.currency).replace('ر.س', t.currency);
  };

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
                "w-full flex items-center gap-4 px-6 py-2 rounded-xl transition-all duration-300 text-sm font-bold group text-right justify-start",
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
                "w-full flex items-center gap-4 px-6 py-2 rounded-xl transition-all duration-300 text-sm font-bold group text-right justify-start",
                item.active ? "bg-[#1a4fa0] text-white shadow-xl shadow-[#1a4fa0]/20" : "text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0]"
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
            className="w-full flex items-center gap-4 px-6 py-2 rounded-xl transition-all duration-300 text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0] text-right justify-start group"
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

      {/* Main Content Area */}
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
                <span className="text-blue-600 font-medium tracking-tight font-black">{t.financialManagement}</span>
                <ChevronLeft className="w-4 h-4 text-gray-300" />
                <span className="text-gray-400">{t.payrollTitle}</span>
              </div>
            </div>

            {/* Search & Notifications */}
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={isRTL ? 'بحث...' : 'Search...'}
                  className="w-64 pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:border-blue-300 shadow-sm"
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

        <div className="p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto text-right">
          {/* Upper Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 pb-4 border-b border-slate-100">
            <div className="text-right">
              <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">{t.payrollTitle}</h1>
              <p className="text-slate-500 text-[11px] font-bold mt-1">{t.payrollSubtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-xs rounded-xl px-4 py-2 hover:bg-slate-50 shadow-sm transition-all cursor-pointer font-bold">
                <Download size={16} />
                <span>{t.exportBtn}</span>
              </button>
              <button className="flex items-center gap-2 bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 group">
                <Plus size={16} />
                <span>{t.addPayroll}</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: t.totalStaff, count: salaries.length, color: 'blue', icon: UsersRound },
              { label: t.financialProcessed, count: '118', color: 'green', icon: CheckCircle2 },
              { label: t.monthlyBudget, count: '452,500 ' + t.currency, color: 'emerald', icon: Wallet },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-xl font-black text-slate-800">{stat.count}</h3>
                </div>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                  stat.color === 'blue' ? "bg-blue-50 text-blue-600" :
                    stat.color === 'green' ? "bg-emerald-50 text-emerald-600" : "bg-emerald-50 text-emerald-600"
                )}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden text-right">
            <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30 flex-wrap gap-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pr-11 pl-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none transition-all shadow-sm text-right"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.staffName}</th>
                    <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.role}</th>
                    <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.basicSalary}</th>
                    <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.commissions}</th>
                    <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.deductions}</th>
                    <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.netSalary}</th>
                    <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.status}</th>
                    <th className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {salaries.map((emp) => (
                    <tr key={emp.id} className="hover:bg-blue-50/20 transition-colors group">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-black text-slate-500 text-xs">
                            {emp.name[0]}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm mb-0.5">{emp.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{emp.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-bold text-slate-600">{emp.role}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{emp.department}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-center text-xs font-bold text-slate-600">{formatCurrency(emp.basicSalary)}</td>
                      <td className="px-5 py-3.5 text-center text-xs font-bold text-emerald-600">+{formatCurrency(emp.commissions + emp.allowances)}</td>
                      <td className="px-5 py-3.5 text-center text-xs font-bold text-rose-500">-{formatCurrency(emp.deductions)}</td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-black border border-blue-100">
                          {formatCurrency(emp.netSalary)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={cn(
                          "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider shadow-xs",
                          emp.status === 'paid' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                        )}>
                          {emp.status === 'paid' ? t.paid : t.pending}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-blue-600 transition-all cursor-pointer" title={t.viewDetails}>
                            <Eye size={16} />
                          </button>
                          <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-emerald-600 transition-all cursor-pointer" title={t.processPayment}>
                            <CheckCircle2 size={16} />
                          </button>
                          <div className="relative">
                            <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-gray-600 transition-all cursor-pointer">
                              <MoreVertical size={16} />
                            </button>
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
                {t.showing} <span className="text-slate-800">1</span> - <span className="text-slate-800">{salaries.length}</span> {t.of} <span className="text-slate-800">{salaries.length}</span> {t.items}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
                >
                  {t.prev}
                </button>
                <button className="w-9 h-9 text-xs font-black rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                  1
                </button>
                <button
                  disabled={true}
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
