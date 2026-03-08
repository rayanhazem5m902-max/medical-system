import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Calendar,
    ClipboardList,
    UserCog,
    Pill,
    Microscope,
    UsersRound,
    Contact2,
    Briefcase,
    Warehouse,
    Layers,
    Wallet,
    FileText,
    Coins,
    Settings,
    Bell,
    Search,
    Menu,
    Plus,
    Filter,
    Activity,
    X,
    Check,
    Trash2,
    Edit2,
    ChevronLeft,
    DollarSign,
    Tag,
    CircleSlash
} from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// ─── Data ───────────────────────────────────────────────────────────────────

const INITIAL_SERVICES = [
    { id: 1, name: "General Consultation", category: "General", basePrice: 150, discount: 10, isActive: true },
    { id: 2, name: "Blood Test (CBC)", category: "Laboratory", basePrice: 80, discount: 0, isActive: true },
    { id: 3, name: "Chest X-Ray", category: "Radiology", basePrice: 200, discount: 5, isActive: true },
    { id: 4, name: "Dental cleaning", category: "Dentistry", basePrice: 120, discount: 15, isActive: false },
    { id: 5, name: "Heart MRI", category: "Radiology", basePrice: 850, discount: 50, isActive: true },
];

const translations = {
    ar: {
        hospitalName: 'مستشفى الشفاء',
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
        hospitalName: 'Al-Shifa Hospital',
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
        notifications: 'Notifications',
        searchPlaceholder: 'Search services and treatments...',
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
        serviceActiveLabel: 'Service is active and available for booking',
        allCategories: 'All Categories',
        totalServices: 'Total Services',
        activeServices: 'Active Services',
        currency: 'USD'
    }
};

// ─── App ────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
    const [lang, setLang] = useState<'ar' | 'en'>('ar');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [services, setServices] = useState(INITIAL_SERVICES);
    const [showDrawer, setShowDrawer] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState({
        id: 0,
        name: "",
        category: "General",
        basePrice: 0,
        discount: 0,
        isActive: true
    });

    const navigate = useNavigate();
    const isRTL = lang === 'ar';
    const t = translations[lang];

    const categories = ["General", "Laboratory", "Radiology", "Dentistry", "Pharmacy", "Surgery"];

    const mainMenuItems = [
        { id: 'dash', label: t.dashboard, icon: LayoutDashboard, active: false },
        { id: 'patients', label: t.patients, icon: Users, active: false },
        { id: 'appts', label: t.appointments, icon: Calendar, active: false },
        { id: 'reception', label: t.reception, icon: ClipboardList, active: false },
        { id: 'doctors', label: t.doctors, icon: UserCog, active: false },
        { id: 'pharmacy', label: t.pharmacy, icon: Pill, active: false },
        { id: 'laboratory', label: t.laboratory, icon: Microscope, active: false },
    ];

    const managementItems = [
        { id: 'doc-mgmt', label: t.doctorManagement, icon: UsersRound },
        { id: 'emp-mgmt', label: t.employeeManagement, icon: Contact2 },
        { id: 'serv-mgmt', label: t.servicesManagement, icon: Briefcase, active: true },
        { id: 'pharma-mgmt', label: t.pharmacyWarehouse, icon: Warehouse },
        { id: 'dept-mgmt', label: t.deptManagement, icon: Layers },
        { id: 'fin-mgmt', label: t.financialManagement, icon: Wallet },
        { id: 'fin-reports', label: t.financialReports, icon: FileText },
        { id: 'payroll-mgmt', label: t.payrollManagement, icon: Coins },
    ];

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
        <div className={cn("flex h-screen bg-slate-50 font-sans overflow-hidden", isRTL ? "flex-row" : "flex-row-reverse")} dir={isRTL ? 'rtl' : 'ltr'}>

            {/* ── Sidebar ── */}
            <aside className={cn(
                "fixed inset-y-0 z-50 w-64 bg-white transition-all duration-300 transform lg:relative lg:translate-x-0 shadow-xl flex flex-col overflow-y-auto no-scrollbar",
                sidebarOpen ? "translate-x-0" : (isRTL ? "translate-x-full" : "-translate-x-full")
            )}>
                <div className="p-6 pb-2 flex items-center gap-3">
                    <span className="text-xl font-bold tracking-tight uppercase text-gray-900">{isRTL ? 'مستشفى الشفاء' : 'Al-Shifa'}</span>
                </div>

                <div className="mt-6 px-4 space-y-1 flex-1">
                    <nav className="space-y-1">
                        <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">{isRTL ? 'القائمة الرئيسية' : 'Main Menu'}</p>
                        {mainMenuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    if (item.id === 'reception') navigate('/reception');
                                    if (item.id === 'appts') navigate('/appointment');
                                    if (item.id === 'dash') navigate('/dashboard');
                                    if (item.id === 'patients') navigate('/patients');
                                    if (item.id === 'doctors') navigate('/dashboard');
                                    if (item.id === 'pharmacy') navigate('/dispense');
                                    if (item.id === 'laboratory') navigate('/laboratory');
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative",
                                    item.active
                                        ? "bg-blue-600/10 text-blue-600 shadow-sm"
                                        : "text-gray-400 hover:bg-gray-50 hover:text-blue-600"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", item.active ? "text-blue-600" : "transition-transform group-hover:scale-110")} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    <nav className="space-y-1 pt-4">
                        <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">{t.management}</p>
                        {managementItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    if (item.id === 'serv-mgmt') navigate('/services');
                                    if (item.id === 'doc-mgmt') navigate('/doctor-management');
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative",
                                    item.active
                                        ? "bg-blue-600/10 text-blue-600 shadow-sm"
                                        : "text-gray-400 hover:bg-gray-50 hover:text-blue-600"
                                )}
                            >
                                <item.icon className={cn("w-4 h-4", item.active ? "text-blue-600" : "transition-transform group-hover:scale-110")} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={() => navigate('/setting')}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-gray-400 hover:bg-gray-50 hover:text-blue-600"
                    >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium text-sm">{t.settings}</span>
                    </button>
                </div>
            </aside>

            {/* ── Main Content Area ── */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">

                {/* ── Header ── */}
                <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
                            <Menu className="w-6 h-6 text-slate-600" />
                        </button>
                        <div className="relative max-w-sm w-full group">
                            <Search className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors", isRTL ? "right-4" : "left-4")} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t.searchPlaceholder}
                                className={cn("w-full py-2.5 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-blue-500/5 rounded-2xl text-sm font-medium outline-none transition-all", isRTL ? "pr-12 pl-4" : "pl-12 pr-4")}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                            <button onClick={() => setLang('ar')} className={cn("px-4 py-1.5 text-[10px] font-black rounded-xl transition-all", lang === 'ar' ? "bg-white text-blue-600 shadow-md" : "text-slate-400")}>العربية</button>
                            <button onClick={() => setLang('en')} className={cn("px-4 py-1.5 text-[10px] font-black rounded-xl transition-all", lang === 'en' ? "bg-white text-blue-600 shadow-md" : "text-slate-400")}>English</button>
                        </div>

                        <button
                            className="relative p-3 hover:bg-slate-100 rounded-2xl transition-all text-slate-500 group"
                        >
                            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-bounce" />
                        </button>

                        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-200">
                                AK
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar">
                    {/* Upper Section: Stats and Action */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex gap-8">
                            <div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.servicesManagement}</h1>
                                <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest">{t.hospitalName} PRO</p>
                            </div>
                            <div className="flex items-center gap-6 px-8 border-x border-slate-200">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">{t.totalServices}</p>
                                    <p className="text-xl font-black text-slate-900">{services.length}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">{t.activeServices}</p>
                                    <p className="text-xl font-black text-emerald-600">{services.filter(s => s.isActive).length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm relative group">
                                <Filter className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="bg-transparent text-xs font-black text-slate-700 outline-none cursor-pointer appearance-none pr-6"
                                >
                                    <option value="All">{t.allCategories}</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <ChevronLeft className={cn("w-3 h-3 text-slate-400 absolute pointer-events-none transition-transform", isRTL ? "left-3" : "right-3 rotate-180")} />
                            </div>

                            <button
                                onClick={handleOpenAdd}
                                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-black shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                <span>{t.addService}</span>
                            </button>
                        </div>
                    </div>

                    {/* Services Table */}
                    <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                        <table className="w-full text-right" dir={isRTL ? 'rtl' : 'ltr'}>
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 uppercase tracking-widest text-[10px] font-black text-slate-400">
                                    <th className="px-6 py-5 text-center w-16">ID</th>
                                    <th className="px-6 py-5">{t.serviceName}</th>
                                    <th className="px-6 py-5">{t.category}</th>
                                    <th className="px-6 py-5">{t.basePrice}</th>
                                    <th className="px-6 py-5">{t.finalPrice}</th>
                                    <th className="px-6 py-5">{t.status}</th>
                                    <th className="px-6 py-5 text-center">{t.actions}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredServices.map((svc, idx) => (
                                    <tr key={svc.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                                        <td className="px-6 py-6 text-center">
                                            <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-600 transition-colors">#{100 + idx}</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="text-sm font-black text-slate-900 leading-tight">{svc.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 mt-0.5">Code: SV-{svc.id}</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-tight">
                                                {svc.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 font-black text-slate-600 text-xs">
                                            {svc.basePrice} {t.currency}
                                            {svc.discount > 0 && <span className="mr-2 text-rose-500 line-through opacity-40">-{svc.discount}%</span>}
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="text-sm font-black text-blue-600">
                                                {(svc.basePrice * (1 - svc.discount / 100)).toFixed(2)} {t.currency}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={cn("w-2 h-2 rounded-full", svc.isActive ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-300")} />
                                                <span className={cn("text-[10px] font-black uppercase tracking-widest", svc.isActive ? "text-emerald-600" : "text-slate-400")}>
                                                    {svc.isActive ? t.active : t.inactive}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleOpenEdit(svc)} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300"><Edit2 className="w-4 h-4" /></button>
                                                <button onClick={() => handleDelete(svc.id)} className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all duration-300"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredServices.length === 0 && (
                            <div className="p-20 flex flex-col items-center justify-center text-slate-400">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-slate-100">
                                    <CircleSlash className="w-8 h-8 opacity-20" />
                                </div>
                                <p className="text-sm font-black uppercase tracking-widest">No Services Found</p>
                            </div>
                        )}
                    </div>
                </main>

                {/* ── Side Drawer / Modal ── */}
                {showDrawer && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-end">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowDrawer(false)} />
                        <div className={cn(
                            "relative w-full max-w-lg h-screen bg-white shadow-2xl flex flex-col animate-in duration-500 ease-out",
                            isRTL ? "slide-in-from-left" : "slide-in-from-right"
                        )}>
                            {/* Header */}
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">{isEditing ? t.editService : t.addService}</h2>
                                    <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">{t.hospitalName} Inventory</p>
                                </div>
                                <button onClick={() => setShowDrawer(false)} className="p-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-2xl text-slate-400 transition-all"><X className="w-6 h-6" /></button>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-1 overflow-y-auto no-scrollbar space-y-8">
                                {/* Basic Info */}
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t.serviceName}</label>
                                        <div className="relative group">
                                            <Activity className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            <input
                                                type="text"
                                                value={currentService.name}
                                                onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                                                placeholder="e.g., Blood Pressure Analysis"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t.category}</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {categories.map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() => setCurrentService({ ...currentService, category: c })}
                                                    className={cn(
                                                        "p-4 rounded-2xl border text-[11px] font-black uppercase tracking-tight transition-all",
                                                        currentService.category === c ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white border-slate-100 text-slate-500 hover:border-blue-200"
                                                    )}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="space-y-5 pt-8 border-t border-slate-100">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t.basePrice}</label>
                                            <div className="relative group">
                                                <DollarSign className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                                <input
                                                    type="number"
                                                    value={currentService.basePrice}
                                                    onChange={(e) => setCurrentService({ ...currentService, basePrice: Number(e.target.value) })}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-black text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t.discount}</label>
                                            <div className="relative group">
                                                <Tag className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                                <input
                                                    type="number"
                                                    value={currentService.discount}
                                                    onChange={(e) => setCurrentService({ ...currentService, discount: Number(e.target.value) })}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-black text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[32px] border border-blue-100">
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest text-center">{t.finalPrice}</p>
                                        <p className="text-3xl font-black text-blue-900 text-center mt-2">{finalPrice} <span className="text-lg opacity-50">{t.currency}</span></p>
                                    </div>
                                </div>

                                {/* Status Toggle */}
                                <div className="pt-8 border-t border-slate-100">
                                    <label className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px] cursor-pointer group hover:bg-slate-100 transition-all">
                                        <div>
                                            <p className="text-xs font-black text-slate-900 tracking-tight">{t.serviceActiveLabel}</p>
                                            <p className="text-[10px] font-bold text-slate-400 mt-1">{currentService.isActive ? 'VISIBLE IN BOOKING SYSTEM' : 'HIDDEN FROM PATIENTS'}</p>
                                        </div>
                                        <div
                                            onClick={() => setCurrentService({ ...currentService, isActive: !currentService.isActive })}
                                            className={cn(
                                                "w-12 h-6 rounded-full relative transition-all duration-300",
                                                currentService.isActive ? "bg-blue-600 shadow-lg shadow-blue-200" : "bg-slate-300"
                                            )}
                                        >
                                            <div className={cn(
                                                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                                                currentService.isActive ? "translate-x-7" : "translate-x-1"
                                            )} />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-8 border-t border-slate-100 flex gap-4">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 bg-blue-600 text-white py-4 rounded-2xl text-xs font-black shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    <Check className="w-5 h-5" />
                                    <span>{t.save}</span>
                                </button>
                                <button
                                    onClick={() => setShowDrawer(false)}
                                    className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl text-xs font-black hover:bg-slate-200 transition-all uppercase"
                                >
                                    {t.cancel}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
