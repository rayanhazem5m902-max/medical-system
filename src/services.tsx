import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard, Microscope, Pill,
    ClipboardList, UsersRound, Contact2, Briefcase, Warehouse,
    Layers, Wallet, FileText, Coins, Activity,
    Settings, Search, Menu, Globe, Bell, LogOut, ChevronLeft,
    Plus, Filter, Check, Trash2, Edit2, DollarSign, Tag, ChevronDown, Calendar, X
} from 'lucide-react';
import { cn } from './utils/cn';

// ─── Data ───────────────────────────────────────────────────────────────────

const INITIAL_SERVICES = [
    { id: 1, name: "General Consultation", category: "General", basePrice: 150, discount: 10, isActive: true },
    { id: 2, name: "Blood Test (CBC)", category: "Laboratory", basePrice: 80, discount: 0, isActive: true },
    { id: 3, name: "Chest X-Ray", category: "Radiology", basePrice: 200, discount: 5, isActive: true },
    { id: 4, name: "Dental cleaning", category: "Dentistry", basePrice: 120, discount: 15, isActive: false },
    { id: 5, name: "Heart MRI", category: "Radiology", basePrice: 850, discount: 50, isActive: true },
];

export default function Services() {
    const [services, setServices] = useState(INITIAL_SERVICES);
    const [lang, setLang] = useState<'ar' | 'en'>('ar');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState({ id: 0, name: "", category: "General", basePrice: 0, discount: 0, isActive: true });
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");

    const navigate = useNavigate();
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
            hospitalName: 'مستشفى الشفاء',
            notifications: 'التنبيهات',
            searchPlaceholder: 'بحث المساعدات والخدمات...',
            addService: 'إضافة خدمة جديدة',
            editService: 'تعديل الخدمة',
            serviceName: 'اسم الخدمة',
            category: 'التصنيف',
            basePrice: 'السعر الأساسي',
            discount: 'نسبة الخصم (%)',
            finalPrice: 'السعر النهائي المتوقع',
            status: 'الحالة',
            active: 'نشط',
            inactive: 'غير نشط',
            save: 'حفظ الخدمة',
            cancel: 'إلغاء',
            actions: 'الإجراءات',
            serviceActiveLabel: 'الخدمة نشطة ومتاحة للحجز',
            allCategories: 'جميع التصنيفات',
            totalServices: 'إجمالي الخدمات',
            activeServices: 'الخدمات المفعلة',
            currency: 'ج.م'
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
            hospitalName: 'Al-Shifa Hospital',
            notifications: 'Notifications',
            searchPlaceholder: 'Search help & services...',
            addService: 'Add New Service',
            editService: 'Edit Service',
            serviceName: 'Service Name',
            category: 'Category',
            basePrice: 'Base Price',
            discount: 'Discount (%)',
            finalPrice: 'Final Expected Price',
            status: 'Status',
            active: 'Active',
            inactive: 'Inactive',
            save: 'Save Service',
            cancel: 'Cancel',
            actions: 'Actions',
            serviceActiveLabel: 'Service is active and available',
            allCategories: 'All Categories',
            totalServices: 'Total Services',
            activeServices: 'Active Services',
            currency: 'EGP'
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
        { id: 'serv-mgmt', label: t.servicesManagement, icon: Briefcase, active: true },
        { id: 'pharma-mgmt', label: t.pharmacyWarehouse, icon: Warehouse },
        { id: 'dept-mgmt', label: t.deptManagement, icon: Layers },
        { id: 'fin-mgmt', label: t.financialManagement, icon: Wallet },
        { id: 'payroll-mgmt', label: t.payrollManagement, icon: Coins },
    ];

    const categories = ["General", "Laboratory", "Radiology", "Dentistry", "Pharmacy", "Surgery"];

    // Calculate Final Price automatically
    const finalPrice = Math.max(0, currentService.basePrice * (1 - currentService.discount / 100)).toFixed(2);

    const handleOpenAdd = () => {
        setCurrentService({ id: 0, name: "", category: "General", basePrice: 0, discount: 0, isActive: true });
        setIsEditing(false);
        setShowDrawer(true);
    };

    const handleOpenEdit = (svc: typeof INITIAL_SERVICES[0]) => {
        setCurrentService(svc);
        setIsEditing(true);
        setShowDrawer(true);
    };

    const handleSave = () => {
        if (isEditing) {
            setServices(services.map(s => s.id === currentService.id ? currentService : s));
        } else {
            setServices([...services, { ...currentService, id: Date.now() }]);
        }
        setShowDrawer(false);
    };

    const handleDelete = (id: number) => {
        setServices(services.filter(s => s.id !== id));
    };

    const filteredServices = services.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === "All" || s.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

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
                                <span className="text-blue-600 font-medium">{t.servicesManagement}</span>
                                <ChevronLeft className="w-4 h-4 text-gray-300" />
                                <span className="text-gray-400">{t.totalServices}</span>
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

                <div className="p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto overflow-y-auto no-scrollbar">
                    {/* Upper Section: Stats and Action */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
                        <div className="flex gap-10 text-right">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{t.servicesManagement}</h1>
                                <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest">{t.hospitalName} PRO</p>
                            </div>
                            <div className="flex items-center gap-8 px-10 border-x border-slate-200">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60 mb-1">{t.totalServices}</p>
                                    <p className="text-2xl font-black text-slate-900">{services.length}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60 mb-1">{t.activeServices}</p>
                                    <p className="text-2xl font-black text-emerald-600">{services.filter(s => s.isActive).length}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleOpenAdd}
                            className="flex items-center justify-center gap-2.5 bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3.5 rounded-2xl text-sm font-bold shadow-xl shadow-blue-500/20 transition-all active:scale-95 group"
                        >
                            <div className="bg-white/20 p-1 rounded-lg group-hover:rotate-90 transition-transform">
                                <Plus size={18} />
                            </div>
                            <span>{t.addService}</span>
                        </button>
                    </div>

                    {/* Filters & Grid */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-4 flex-wrap gap-4">
                            <div className="flex gap-2">
                                {["All", ...categories].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilterCategory(cat)}
                                        className={cn(
                                            "px-5 py-2 text-xs font-bold rounded-xl transition-all border shadow-sm capitalize",
                                            filterCategory === cat
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                                        )}
                                    >
                                        {cat === "All" ? t.allCategories : cat}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-slate-400" />
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.actions}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredServices.map(svc => (
                                <div
                                    key={svc.id}
                                    className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -mr-10 -mt-10 group-hover:bg-blue-100 transition-colors" />

                                    <div className="relative space-y-4 text-right">
                                        <div className="flex justify-between items-start">
                                            <div className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                                                svc.isActive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-100 text-slate-400"
                                            )}>
                                                {svc.isActive ? t.active : t.inactive}
                                            </div>
                                            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-50">
                                                <Briefcase className="w-5 h-5 text-blue-600" />
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-black text-slate-800 text-lg line-clamp-1">{svc.name}</h3>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">{svc.category}</p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-50 flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.finalPrice}</p>
                                                <p className="text-2xl font-black text-slate-900">
                                                    {(svc.basePrice * (1 - svc.discount / 100)).toFixed(0)} <span className="text-xs text-slate-400">{t.currency}</span>
                                                </p>
                                            </div>
                                            {svc.discount > 0 && (
                                                <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-xl text-[10px] font-black border border-orange-100">
                                                    -{svc.discount}%
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleOpenEdit(svc)}
                                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-2xl text-xs font-bold transition-all text-slate-500 border border-slate-100"
                                            >
                                                <Edit2 size={14} />
                                                <span>{t.editService}</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(svc.id)}
                                                className="p-2.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all border border-red-100"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Side Drawer for Add/Edit */}
            {showDrawer && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowDrawer(false)} />
                    <div className={cn(
                        "relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col p-8 transition-transform duration-500 transform",
                        isRTL ? "translate-x-0" : "translate-x-0"
                    )}>
                        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6 text-right">
                            <button onClick={() => setShowDrawer(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
                                <X size={24} />
                            </button>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                                {isEditing ? t.editService : t.addService}
                            </h2>
                        </div>

                        <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar pr-2 text-right">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.serviceName}</label>
                                <input
                                    type="text"
                                    value={currentService.name}
                                    onChange={e => setCurrentService({ ...currentService, name: e.target.value })}
                                    className="w-full p-4 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-blue-500/5 rounded-2xl text-sm font-bold outline-none transition-all placeholder:text-slate-300 text-right"
                                    placeholder="e.g. Brain MRI Scan"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.category}</label>
                                    <div className="relative">
                                        <select
                                            value={currentService.category}
                                            onChange={e => setCurrentService({ ...currentService, category: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border-transparent appearance-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 rounded-2xl text-sm font-bold outline-none transition-all cursor-pointer text-right"
                                        >
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.status}</label>
                                    <button
                                        onClick={() => setCurrentService({ ...currentService, isActive: !currentService.isActive })}
                                        className={cn(
                                            "w-full p-4 flex items-center justify-between rounded-2xl border-2 transition-all",
                                            currentService.isActive ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-slate-50 border-slate-100 text-slate-400"
                                        )}
                                    >
                                        <Check className={cn("w-5 h-5", currentService.isActive ? "opacity-100" : "opacity-0")} />
                                        <span className="text-sm font-bold">{currentService.isActive ? t.active : t.inactive}</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.basePrice} ({t.currency})</label>
                                    <div className="relative">
                                        <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="number"
                                            value={currentService.basePrice}
                                            onChange={e => setCurrentService({ ...currentService, basePrice: Number(e.target.value) })}
                                            className="w-full p-4 pr-10 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-blue-500/5 rounded-2xl text-sm font-bold outline-none transition-all text-right"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.discount} %</label>
                                    <div className="relative">
                                        <Tag className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={currentService.discount}
                                            onChange={e => setCurrentService({ ...currentService, discount: Number(e.target.value) })}
                                            className="w-full mt-4 accent-blue-600"
                                        />
                                        <p className="text-right text-xs font-black text-blue-600 mt-2">{currentService.discount}%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100px] -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                                <div className="relative flex justify-between items-center">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">{t.finalPrice}</p>
                                        <p className="text-4xl font-black">{finalPrice} <span className="text-sm border-l border-blue-400 pl-4 ml-4 font-bold">{t.currency}</span></p>
                                    </div>
                                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                                        <Activity size={32} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex gap-4 mt-auto">
                            <button
                                onClick={handleSave}
                                className="flex-1 bg-slate-900 hover:bg-black text-white py-4 rounded-2xl text-sm font-bold shadow-xl shadow-slate-200 transition-all active:scale-95"
                            >
                                {t.save}
                            </button>
                            <button
                                onClick={() => setShowDrawer(false)}
                                className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 py-4 rounded-2xl text-sm font-bold transition-all"
                            >
                                {t.cancel}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
