import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users, UserCog, Calendar, LayoutDashboard, Microscope, Pill,
    ClipboardList, UsersRound, Contact2, Briefcase, Warehouse,
    Layers, Wallet, FileText, Coins, Settings, Search,
    Menu, Plus, Check, ChevronRight, Globe,
    Image as ImageIcon, Shield, AlertTriangle, Wand2,
    Trash2, Edit2, MoreVertical, Phone, Mail, Award, Clock
} from 'lucide-react';
import { cn } from './utils/cn';

type Lang = 'ar' | 'en';

const translations = {
    ar: {
        hospitalName: 'مستشفى الشفاء',
        doctorManagement: 'إدارة الأطباء',
        dashboard: 'لوحة القيادة',
        patients: 'سجلات المرضى',
        appointments: 'المواعيد',
        reception: 'الاستقبال والتسجيل',
        doctors: 'الأطباء',
        pharmacy: 'الصيدلي',
        laboratory: 'المعامل',
        management: 'الإدارة',
        employeeManagement: 'إدارة الموظفين',
        servicesManagement: 'إدارة الخدمات',
        pharmacyWarehouse: 'إدارة الصيدلية والمخزون',
        deptManagement: 'إدارة الأقسام',
        financialManagement: 'الإدارة المالية',
        financialReports: 'التقارير المالية',
        payrollManagement: 'إدارة الرواتب',
        settings: 'الإعدادات',
        addDoctor: 'إضافة طبيب جديد',
        editDoctor: 'تعديل بيانات طبيب',
        searchPlaceholder: 'بحث باسم الطبيب أو التخصص...',
        personalInfo: 'المعلومات الشخصية',
        professionalData: 'البيانات المهنية',
        weeklySchedule: 'الجدول الزمني الأسبوعي',
        doctorName: 'اسم الطبيب الكامل',
        specialty: 'التخصص الطبي',
        department: 'القسم',
        phone: 'رقم الجوال',
        email: 'البريد الإلكتروني',
        licenseNumber: 'رقم ترخيص المزاولة',
        status: 'الحالة',
        active: 'نشط',
        inactive: 'غير نشط',
        uploadPhoto: 'رفع صورة الطبيب',
        dragDrop: 'اسحب وأفلت الصورة هنا أو انقر للاختيار',
        save: 'حفظ البيانات',
        cancel: 'إلغاء',
        conflictWarning: 'تنبيه: يوجد تضارب في المواعيد مع د. ليلى حسن',
        solveConflict: 'حل التضارب تلقائياً',
        back: 'رجوع',
        actions: 'الإجراءات',
        licensePlaceholder: 'MOH-XXXXX-X',
        phonePlaceholder: '05XXXXXXXX'
    },
    en: {
        hospitalName: 'Al-Shifa Hospital',
        doctorManagement: 'Doctor Management',
        dashboard: 'Dashboard',
        patients: 'Patient Records',
        appointments: 'Appointments',
        reception: 'Reception & Registration',
        doctors: 'Doctors',
        pharmacy: 'Pharmacist',
        laboratory: 'Laboratory',
        management: 'Management',
        employeeManagement: 'Employee Management',
        servicesManagement: 'Services Management',
        pharmacyWarehouse: 'Pharmacy & Warehouse',
        deptManagement: 'Departments Management',
        financialManagement: 'Financial Management',
        financialReports: 'Financial Reports',
        payrollManagement: 'Payroll Management',
        settings: 'Settings',
        addDoctor: 'Add New Doctor',
        editDoctor: 'Edit Doctor Details',
        searchPlaceholder: 'Search by name or specialty...',
        personalInfo: 'Personal Information',
        professionalData: 'Professional Data',
        weeklySchedule: 'Weekly Schedule',
        doctorName: 'Full Doctor Name',
        specialty: 'Medical Specialty',
        department: 'Department',
        phone: 'Phone Number',
        email: 'Email Address',
        licenseNumber: 'Medical License Number',
        status: 'Status',
        active: 'Active',
        inactive: 'Inactive',
        uploadPhoto: 'Upload Profile Photo',
        dragDrop: 'Drag and drop or click to upload',
        save: 'Save Changes',
        cancel: 'Cancel',
        conflictWarning: 'Warning: Schedule conflict with Dr. Laila Hassan',
        solveConflict: 'Solve Conflicts Automatically',
        back: 'Back',
        actions: 'Actions',
        licensePlaceholder: 'MOH-XXXXX-X',
        phonePlaceholder: '05XXXXXXXX'
    }
};

interface Doctor {
    id: number;
    name: string;
    specialty: string;
    department: string;
    license: string;
    status: 'active' | 'inactive';
    avatar?: string;
}

const DASHBOARD_DOCTORS: Doctor[] = [
    { id: 1, name: 'د. خالد العتيبي', specialty: 'استشاري جراحة العظام', department: 'قسم العظام', license: 'MOH-12345-A', status: 'active' },
    { id: 2, name: 'د. سارة الأحمد', specialty: 'استشارية طب الأطفال', department: 'قسم الأطفال', license: 'MOH-67890-B', status: 'active' },
    { id: 3, name: 'د. ليلى حسن', specialty: 'استشارية أمراض القلب', department: 'قسم القلب', license: 'MOH-11223-C', status: 'active' },
];

export default function DoctorManagement() {
    const [lang, setLang] = useState<Lang>('ar');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [view, setView] = useState<'list' | 'form'>('list');
    const [doctors, setDoctors] = useState<Doctor[]>(DASHBOARD_DOCTORS);
    const [hasConflict, setHasConflict] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        department: '',
        phone: '',
        email: '',
        license: '',
        status: 'active' as 'active' | 'inactive',
        photo: null as string | null
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const isRTL = lang === 'ar';
    const t = translations[lang];

    const mainMenuItems = [
        { id: 'dash', label: t.dashboard, icon: LayoutDashboard },
        { id: 'patients', label: t.patients, icon: Users },
        { id: 'appts', label: t.appointments, icon: Calendar },
        { id: 'reception', label: t.reception, icon: ClipboardList },
        { id: 'doctors', label: t.doctors, icon: UserCog },
        { id: 'pharmacy', label: t.pharmacy, icon: Pill },
        { id: 'laboratory', label: t.laboratory, icon: Microscope },
    ];

    const managementItems = [
        { id: 'doc-mgmt', label: t.doctorManagement, icon: UsersRound, active: true },
        { id: 'emp-mgmt', label: t.employeeManagement, icon: Contact2 },
        { id: 'serv-mgmt', label: t.servicesManagement, icon: Briefcase },
        { id: 'pharma-mgmt', label: t.pharmacyWarehouse, icon: Warehouse },
        { id: 'dept-mgmt', label: t.deptManagement, icon: Layers },
        { id: 'fin-mgmt', label: t.financialManagement, icon: Wallet },
        { id: 'fin-reports', label: t.financialReports, icon: FileText },
        { id: 'payroll-mgmt', label: t.payrollManagement, icon: Coins },
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, photo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const newDoctor: Doctor = {
            id: Date.now(),
            name: formData.name,
            specialty: formData.specialty,
            department: formData.department,
            license: formData.license,
            status: formData.status,
            avatar: formData.photo || undefined
        };
        setDoctors([...doctors, newDoctor]);
        setView('list');
        // Reset form
        setFormData({ name: '', specialty: '', department: '', phone: '', email: '', license: '', status: 'active', photo: null });
    };

    const toggleConflict = () => setHasConflict(!hasConflict);

    const solveConflict = () => {
        setHasConflict(false);
        // UX logic: would typically find next slot
    };

    return (
        <div className={cn("min-h-screen bg-[#f0f4f8] flex", isRTL ? "flex-row-reverse" : "flex-row")} dir={isRTL ? 'rtl' : 'ltr'}>

            {/* Sidebar */}
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
                                    if (item.id === 'pharmacy') navigate('/dispense');
                                    if (item.id === 'laboratory') navigate('/laboratory');
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group text-gray-400 hover:bg-gray-50 hover:text-blue-600"
                                )}
                            >
                                <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
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
                                    if (item.id === 'doc-mgmt') setView('list');
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                                    item.active ? "bg-blue-600/10 text-blue-600" : "text-gray-400 hover:bg-gray-50 hover:text-blue-600"
                                )}
                            >
                                <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                                <span className="font-medium text-sm">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-100">
                    <button onClick={() => navigate('/setting')} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-blue-600">
                        <Settings className="w-5 h-5" />
                        <span className="font-medium text-sm">{t.settings}</span>
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50/50 overflow-y-auto">

                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
                            <Menu className="w-6 h-6 text-slate-600" />
                        </button>
                        <div className="relative max-w-sm w-full group">
                            <Search className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 focus:text-blue-600", isRTL ? "right-4" : "left-4")} />
                            <input
                                type="text"
                                placeholder={t.searchPlaceholder}
                                className={cn("w-full py-2.5 bg-slate-50 border-transparent rounded-2xl text-sm font-medium outline-none focus:bg-white focus:ring-4 focus:ring-blue-50/50", isRTL ? "pr-12 pl-4" : "pl-12 pr-4")}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                            className="p-3 bg-slate-50 text-slate-500 hover:text-blue-600 rounded-2xl transition-all border border-slate-100 flex items-center gap-2 group active:scale-95"
                        >
                            <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span className="text-xs font-black uppercase tracking-widest">{lang === 'ar' ? 'English' : 'العربية'}</span>
                        </button>
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold border border-blue-200 shadow-sm">AD</div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                    {view === 'list' ? (
                        <>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.doctorManagement}</h1>
                                    <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest leading-none">Management Center</p>
                                </div>
                                <button
                                    onClick={() => setView('form')}
                                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>{t.addDoctor}</span>
                                </button>
                            </div>

                            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                                <table className="w-full text-right" dir={isRTL ? 'rtl' : 'ltr'}>
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100">
                                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-16">ID</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.doctorName}</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.specialty}</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.status}</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.licenseNumber}</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.actions}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {doctors.map((doc, idx) => (
                                            <tr key={doc.id} className="group hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-5 text-sm font-bold text-slate-400">#{1001 + idx}</td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                                                            {doc.avatar ? <img src={doc.avatar} className="w-full h-full rounded-xl object-cover" /> : <UserCog className="w-5 h-5" />}
                                                        </div>
                                                        <span className="font-black text-slate-900 line-tight">{doc.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-bold text-slate-700">{doc.specialty}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{doc.department}</p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className={cn(
                                                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                                                        doc.status === 'active' ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
                                                    )}>
                                                        {doc.status === 'active' ? t.active : t.inactive}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-xs font-bold text-slate-500 font-mono tracking-tight">{doc.license}</td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit2 className="w-4 h-4" /></button>
                                                        <button className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        /* Form View (Add/Edit) */
                        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                            {/* Registration Header */}
                            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setView('list')} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all flex items-center gap-2 group">
                                        <ChevronRight className={cn("w-5 h-5", !isRTL && "rotate-180")} />
                                        <span className="text-sm font-bold">{t.back}</span>
                                    </button>
                                    <div>
                                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.addDoctor}</h1>
                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Medical Staff Registration</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setView('list')} className="px-6 py-3 text-slate-500 font-bold hover:text-slate-700">{t.cancel}</button>
                                    <button onClick={handleSave} className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2">
                                        <Check className="w-5 h-5" />
                                        <span>{t.save}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Main Form Content */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                                {/* Card 1: Personal Information */}
                                <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm space-y-6">
                                    <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                                        <div className="p-2 bg-blue-50 rounded-xl"><Users className="w-5 h-5 text-blue-600" /></div>
                                        <h2 className="text-lg font-black text-slate-900">{t.personalInfo}</h2>
                                    </div>

                                    {/* Photo Upload Area */}
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="group relative h-48 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-blue-50/50 hover:border-blue-200 transition-all overflow-hidden"
                                    >
                                        <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                                        {formData.photo ? (
                                            <img src={formData.photo} className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <div className="p-4 bg-white rounded-full shadow-sm text-slate-400 group-hover:text-blue-500 transition-colors">
                                                    <ImageIcon className="w-8 h-8" />
                                                </div>
                                                <p className="text-xs font-bold text-slate-500 text-center px-6 leading-relaxed">
                                                    {t.dragDrop}
                                                </p>
                                            </>
                                        )}
                                        {formData.photo && (
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <p className="text-white text-xs font-bold">تغيير الصورة</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4 pt-2">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t.doctorName}</label>
                                            <div className="relative">
                                                <UserCog className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 text-slate-300" />
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 pr-12 pl-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t.specialty}</label>
                                                <input
                                                    value={formData.specialty}
                                                    onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                                                    type="text" className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t.department}</label>
                                                <input
                                                    value={formData.department}
                                                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                                                    type="text" className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all" />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t.phone}</label>
                                            <div className="relative">
                                                <Phone className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 text-slate-300" />
                                                <input
                                                    type="text"
                                                    placeholder={t.phonePlaceholder}
                                                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 pr-12 pl-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t.email}</label>
                                            <div className="relative">
                                                <Mail className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 text-slate-300" />
                                                <input type="email" className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 pr-12 pl-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Professional Data & Schedule */}
                                <div className="space-y-8">
                                    {/* Card 2: Professional Data */}
                                    <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm space-y-6">
                                        <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                                            <div className="p-2 bg-indigo-50 rounded-xl"><Shield className="w-5 h-5 text-indigo-600" /></div>
                                            <h2 className="text-lg font-black text-slate-900">{t.professionalData}</h2>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t.licenseNumber}</label>
                                            <div className="relative">
                                                <Award className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 text-slate-300" />
                                                <input
                                                    type="text"
                                                    placeholder={t.licensePlaceholder}
                                                    value={formData.license}
                                                    onChange={e => setFormData({ ...formData, license: e.target.value })}
                                                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 pr-12 pl-4 text-sm font-bold font-mono focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t.status}</label>
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => setFormData({ ...formData, status: 'active' })}
                                                    className={cn(
                                                        "flex-1 py-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all",
                                                        formData.status === 'active' ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100" : "bg-white border-slate-100 text-slate-400 hover:border-emerald-200"
                                                    )}
                                                >
                                                    {t.active}
                                                </button>
                                                <button
                                                    onClick={() => setFormData({ ...formData, status: 'inactive' })}
                                                    className={cn(
                                                        "flex-1 py-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all",
                                                        formData.status === 'inactive' ? "bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-100" : "bg-white border-slate-100 text-slate-400 hover:border-rose-200"
                                                    )}
                                                >
                                                    {t.inactive}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 3: Weekly Schedule */}
                                    <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm space-y-6">
                                        <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                                            <div className="p-2 bg-amber-50 rounded-xl"><Calendar className="w-5 h-5 text-amber-600" /></div>
                                            <h2 className="text-lg font-black text-slate-900">{t.weeklySchedule}</h2>
                                        </div>

                                        <div className="space-y-4">
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                                                <div key={day} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                                    <span className="text-xs font-black uppercase text-slate-600 w-12">{day}</span>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                                                            <Clock className="w-3.5 h-3.5 text-slate-300" />
                                                            <span className="text-xs font-bold text-slate-700">08:00 AM</span>
                                                        </div>
                                                        <span className="text-slate-300">→</span>
                                                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                                                            <Clock className="w-3.5 h-3.5 text-slate-300" />
                                                            <span className="text-xs font-bold text-slate-700">04:00 PM</span>
                                                        </div>
                                                    </div>
                                                    <button onClick={toggleConflict} className="p-2 hover:bg-slate-200 rounded-lg transition-colors"><MoreVertical className="w-4 h-4 text-slate-400" /></button>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Weekly Conflict Alert */}
                                        {hasConflict && (
                                            <div className="p-6 bg-rose-600 rounded-[32px] text-white space-y-4 shadow-xl shadow-rose-200 animate-in zoom-in duration-300">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white/20 rounded-2xl"><AlertTriangle className="w-6 h-6" /></div>
                                                    <div>
                                                        <p className="text-sm font-black tracking-tight">{t.conflictWarning}</p>
                                                        <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest">Double booking at 10:00 AM Room 4</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={solveConflict}
                                                    className="w-full bg-white text-rose-600 py-3 rounded-2xl text-xs font-black hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <Wand2 className="w-4 h-4" />
                                                    <span>{t.solveConflict}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
