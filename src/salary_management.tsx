import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar, LayoutDashboard, Microscope, Pill,
    ClipboardList, UsersRound, Contact2, Briefcase, Warehouse,
    Layers, Wallet, FileText, Coins, Activity,
    Settings, Search, Menu, Globe, Bell, LogOut, ChevronLeft,
    Download, MoreVertical, Save
} from 'lucide-react';
import { cn } from './utils/cn';

/* ───────── Types ───────── */
interface SalaryEntry {
    id: string;
    name: string;
    role: string;
    code: string;
    avatar: string;
    basic: number;
    allowances: number;
    deductions: number;
    commission: number;
}

export default function SalaryManagement() {
    const navigate = useNavigate();
    const [lang, setLang] = useState<'ar' | 'en'>('ar');
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isRTL = lang === 'ar';

    // Data State
    const [employees, setEmployees] = useState<SalaryEntry[]>([
        {
            id: '1',
            name: 'محمد سالم',
            role: 'أخصائي جراحة قلب',
            code: 'EMP-001',
            avatar: 'م',
            basic: 18500,
            allowances: 3200,
            deductions: 450,
            commission: 15
        },
        {
            id: '2',
            name: 'سارة مروان',
            role: 'ممرضة أولى',
            code: 'EMP-042',
            avatar: 'س',
            basic: 12400,
            allowances: 1800,
            deductions: 200,
            commission: 5
        },
        {
            id: '3',
            name: 'فهد الأحمد',
            role: 'رئيس قسم الأشعة',
            code: 'EMP-015',
            avatar: 'ف',
            basic: 16000,
            allowances: 2500,
            deductions: 300,
            commission: 10
        },
        {
            id: '4',
            name: 'ليلى العبدالله',
            role: 'طبيب عام',
            code: 'EMP-088',
            avatar: 'ل',
            basic: 14500,
            allowances: 2000,
            deductions: 250,
            commission: 8
        }
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
            settings: 'الإعدادات',
            pageTitle: 'هيكلة الرواتب والمستحقات',
            pageSubtitle: 'إدارة البدلات والعمولات والخصومات الشهرية',
            searchPlaceholder: 'بحث باسم الموظف...',
            exportBtn: 'تصدير البيانات',
            saveAll: 'حفظ جميع التغييرات',
            staffName: 'الموظف',
            basicSalary: 'الراتب الأساسي',
            allowances: 'البدلات',
            deductions: 'الخصومات',
            commission: 'العمولة (%)',
            netSalary: 'صافي المستحق',
            updateSuccess: 'تم تحديث البيانات بنجاح',
            currency: 'ر.س',
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
            pageTitle: 'Salary Structure & Entitlements',
            pageSubtitle: 'Manage monthly allowances, commissions, and deductions',
            searchPlaceholder: 'Search employee name...',
            exportBtn: 'Export Data',
            saveAll: 'Save All Changes',
            staffName: 'Employee',
            basicSalary: 'Basic Salary',
            allowances: 'Allowances',
            deductions: 'Deductions',
            commission: 'Commission (%)',
            netSalary: 'Net Payable',
            updateSuccess: 'Data updated successfully',
            currency: 'SAR',
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
        { id: 'payroll-mgmt', label: t.payrollManagement, icon: Coins, active: true },
    ];

    const handleUpdate = (id: string, field: keyof SalaryEntry, value: string | number) => {
        setEmployees(prev => prev.map(emp => {
            if (emp.id === id) {
                return { ...emp, [field]: typeof value === 'string' ? parseFloat(value) || 0 : value };
            }
            return emp;
        }));
    };

    const calculateNet = (emp: SalaryEntry) => {
        return emp.basic + emp.allowances - emp.deductions + (emp.basic * (emp.commission / 100));
    };

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
                            <p className="text-xs font-black text-slate-900 truncate">{isRTL ? 'د. أحمد العلي' : 'Dr. Ahmed Al-Ali'}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase">{isRTL ? 'المدير العام' : 'General Manager'}</p>
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
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="px-8 h-20 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-40 gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-500">
                            <Menu size={24} />
                        </button>
                        <div className="hidden sm:flex items-center gap-2 text-sm justify-start">
                            <span className="text-blue-600 font-bold">{t.payrollManagement}</span>
                            <ChevronLeft className="w-4 h-4 text-gray-300" />
                            <span className="text-gray-400 font-medium">{t.pageTitle}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder={t.searchPlaceholder}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-64 pr-11 pl-4 py-2.5 bg-slate-50 border border-slate-100 focus:border-blue-500 rounded-2xl text-sm outline-none transition-all text-right"
                            />
                        </div>
                        <button onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')} className="p-2.5 hover:bg-slate-100 rounded-2xl text-slate-500 transition-all font-bold text-xs flex items-center gap-2">
                            <Globe size={20} />
                        </button>
                        <button className="relative p-2.5 hover:bg-slate-100 rounded-2xl text-slate-500 transition-all group">
                            <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                            <span className="absolute top-2.5 left-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-200">
                            AD
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-6 overflow-y-auto no-scrollbar space-y-6 max-w-[1400px] mx-auto text-right w-full">
                    {/* Page Intro */}
                    <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                        <div className="text-right">
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">{t.pageTitle}</h2>
                            <p className="text-[11px] text-slate-500 font-bold mt-1">{t.pageSubtitle}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
                                <Download size={16} />
                                <span>{t.exportBtn}</span>
                            </button>
                            <button
                                onClick={() => alert(t.updateSuccess)}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
                            >
                                <Save size={16} />
                                <span>{t.saveAll}</span>
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden text-right">
                        <table className="w-full text-right">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.staffName}</th>
                                    <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.basicSalary}</th>
                                    <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.allowances}</th>
                                    <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.commission}</th>
                                    <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.deductions}</th>
                                    <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.netSalary}</th>
                                    <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {employees.map(emp => (
                                    <tr key={emp.id} className="group hover:bg-slate-50/30 transition-all">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-black relative overflow-hidden group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                                    {emp.avatar}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 tracking-tight">{emp.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{emp.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <input
                                                type="number"
                                                value={emp.basic}
                                                onChange={e => handleUpdate(emp.id, 'basic', e.target.value)}
                                                className="w-24 py-1.5 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-blue-500/5 rounded-lg text-center text-sm font-black outline-none transition-all mx-auto"
                                            />
                                        </td>
                                        <td className="px-5 py-3 text-center text-emerald-600">
                                            <input
                                                type="number"
                                                value={emp.allowances}
                                                onChange={e => handleUpdate(emp.id, 'allowances', e.target.value)}
                                                className="w-20 py-1.5 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-blue-500/5 rounded-lg text-center text-xs font-bold outline-none transition-all mx-auto text-emerald-600"
                                            />
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <span className="text-[9px] font-black text-slate-400 uppercase">%</span>
                                                <input
                                                    type="number"
                                                    value={emp.commission}
                                                    onChange={e => handleUpdate(emp.id, 'commission', e.target.value)}
                                                    className="w-14 py-1.5 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-blue-500/5 rounded-lg text-center text-xs font-black outline-none transition-all"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <input
                                                type="number"
                                                value={emp.deductions}
                                                onChange={e => handleUpdate(emp.id, 'deductions', e.target.value)}
                                                className="w-20 py-1.5 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-blue-500/5 rounded-lg text-center text-xs font-bold outline-none transition-all mx-auto text-red-500"
                                            />
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-xl border border-blue-100">
                                                <span className="text-xs font-black text-blue-700">{formatCurrency(calculateNet(emp))}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <button className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors">
                                                <MoreVertical size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="h-8" />
                </div>
            </main>
        </div>
    );
}
