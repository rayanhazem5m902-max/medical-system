import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from './utils/cn';
import {
    FileText,
    User,
    Globe,
    LayoutDashboard,
    Menu,
    Microscope,
    Calendar,
    ClipboardList,
    UserCog,
    Pill,
    UsersRound,
    Contact2,
    Briefcase,
    Warehouse,
    Layers,
    Wallet,
    Coins,
    Settings,
    Users,
    Plus,
    Search,
    Filter,
    MoreVertical,
    ChevronRight,
    ChevronLeft,
    LogOut,
    Activity
} from 'lucide-react';

type Lang = 'ar' | 'en';

const translations = {
    ar: {
        patientsList: 'سجلات المرضى',
        allPatients: 'جميع المرضى المسجلين',
        searchPlaceholder: 'بحث باسم المريض، رقم السجل (MRN)، أو رقم الهوية...',
        addPatient: 'إضافة مريض جديد',
        mrn: 'رقم السجل',
        patientName: 'اسم المريض',
        age: 'العمر',
        gender: 'الجنس',
        lastVisit: 'آخر زيارة',
        status: 'الحالة',
        actions: 'إجراءات',
        viewRecord: 'عرض السجل',
        edit: 'تعديل',
        delete: 'حذف',
        male: 'ذكر',
        female: 'أنثى',
        underTreatment: 'تحت العلاج',
        completed: 'مكتمل',
        waiting: 'في الانتظار',
        dashboard: 'لوحة القيادة',
        appointments: 'المواعيد',
        reception: 'الاستقبال',
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
        language: 'English',
        userName: 'د. سارة خليل',
        userStatus: 'متاح حالياً'
    },
    en: {
        patientsList: 'Patient Records',
        allPatients: 'All Registered Medical Records',
        searchPlaceholder: 'Search by name, MRN, or ID...',
        addPatient: 'Add New Patient',
        mrn: 'MRN',
        patientName: 'Patient Name',
        age: 'Age',
        gender: 'Gender',
        lastVisit: 'Last Visit',
        status: 'Status',
        actions: 'Actions',
        viewRecord: 'View Record',
        edit: 'Edit',
        delete: 'Delete',
        male: 'Male',
        female: 'Female',
        underTreatment: 'Under Treatment',
        completed: 'Completed',
        waiting: 'Waiting',
        dashboard: 'Dashboard',
        appointments: 'Appointments',
        reception: 'Reception',
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
        language: 'العربية',
        userName: 'Dr. Sara Khalil',
        userStatus: 'Active Now'
    }
};

const patientsData = [
    { id: 1, mrn: 'MRN-2024-001', name: 'سالم علي الشهري', nameEn: 'Salem Ali Al-Shehri', age: 34, gender: 'male', lastVisit: '2024-03-01', status: 'underTreatment' },
    { id: 2, mrn: 'MRN-2024-002', name: 'سارة محمد العتيبي', nameEn: 'Sara Mohammed Al-Otaibi', age: 28, gender: 'female', lastVisit: '2024-03-05', status: 'completed' },
    { id: 3, mrn: 'MRN-2024-003', name: 'فهد عبدالله الدوسري', nameEn: 'Fahad Abdullah Al-Dossari', age: 45, gender: 'male', lastVisit: '2024-02-28', status: 'waiting' },
    { id: 4, mrn: 'MRN-2024-004', name: 'نورة سعد القحطاني', nameEn: 'Noura Saad Al-Qahtani', age: 31, gender: 'female', lastVisit: '2024-03-04', status: 'underTreatment' },
    { id: 5, mrn: 'MRN-2024-005', name: 'أحمد منصور الزهراني', nameEn: 'Ahmed Mansour Al-Zahrani', age: 52, gender: 'male', lastVisit: '2024-03-02', status: 'completed' },
    { id: 6, mrn: 'MRN-2024-006', name: 'ليلى حسن البارقي', nameEn: 'Layla Hassan Al-Barqi', age: 24, gender: 'female', lastVisit: '2024-03-06', status: 'waiting' },
];

export default function Patients() {
    const [lang, setLang] = useState<Lang>('ar');
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const isRTL = lang === 'ar';
    const t = translations[lang];

    const mainMenuItems = [
        { id: 'dash', label: t.dashboard, icon: LayoutDashboard, active: window.location.pathname === '/dashboard' },
        { id: 'patients', label: t.patientsList, icon: Users, active: window.location.pathname === '/patients' || window.location.pathname === '/patient' },
        { id: 'appts', label: t.appointments, icon: Calendar, active: window.location.pathname === '/appointment' },
        { id: 'reception', label: t.reception, icon: ClipboardList, active: window.location.pathname === '/reception' },
        { id: 'doctors', label: t.doctors, icon: UserCog, active: window.location.pathname === '/doctor' },
        { id: 'pharmacy', label: t.pharmacy, icon: Pill, active: window.location.pathname === '/dispense' },
        { id: 'laboratory', label: t.laboratory, icon: Microscope, active: window.location.pathname === '/laboratory' },
    ];

    const managementItems = [
        { id: 'doc-mgmt', label: t.doctorManagement, icon: UsersRound },
        { id: 'emp-mgmt', label: t.employeeManagement, icon: Contact2 },
        { id: 'serv-mgmt', label: t.servicesManagement, icon: Briefcase },
        { id: 'pharma-mgmt', label: t.pharmacyWarehouse, icon: Warehouse },
        { id: 'dept-mgmt', label: t.deptManagement, icon: Layers },
        { id: 'fin-mgmt', label: t.financialManagement, icon: Wallet },
        { id: 'fin-reports', label: t.financialReports, icon: FileText },
        { id: 'payroll-mgmt', label: t.payrollManagement, icon: Coins },
    ];

    const filteredPatients = patientsData.filter(p =>
        p.name.includes(searchQuery) ||
        p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.mrn.includes(searchQuery)
    );

    return (
        <div className={cn(
            "min-h-screen bg-[#f0f4f8] flex font-['Cairo'] text-slate-900 overflow-hidden",
            isRTL ? "flex-row" : "flex-row-reverse"
        )} dir={isRTL ? 'rtl' : 'ltr'}>
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
                                if (item.id === 'pharmacy') navigate('/dispense');
                                if (item.id === 'laboratory') navigate('/laboratory');
                                if (item.id === 'appts') navigate('/appointment');
                                if (item.id === 'doctors') navigate('/doctor-management');
                            }}
                            className={cn(
                                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group",
                                item.id === 'patients' ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", item.id === 'patients' ? "text-white" : "text-slate-400 group-hover:text-blue-600")} />
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
                                if (item.id === 'pharma-mgmt') navigate('/dispense');
                                if (item.id === 'fin-mgmt') navigate('/payroll');
                                if (item.id === 'fin-reports') navigate('/reports');
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

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500">
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-gray-900">{t.patientsList}</h1>
                            <p className="text-xs text-gray-500 font-medium">{t.allPatients}</p>
                        </div>
                        <div className="relative max-w-md w-full group ml-4">
                            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-primary ${isRTL ? 'right-4' : 'left-4'}`} />
                            <input
                                type="text"
                                placeholder={isRTL ? 'بحث في قائمة المرضى...' : 'Search patients list...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-2.5 bg-gray-50 border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-xl outline-none transition-all text-sm font-medium`}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
                            className="p-3 bg-slate-50 text-slate-500 hover:text-primary rounded-2xl transition-all border border-slate-100 flex items-center gap-2 group active:scale-95"
                            title={t.language}
                        >
                            <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span className="text-xs font-black uppercase tracking-widest">{lang === 'ar' ? 'English' : 'العربية'}</span>
                        </button>
                        <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all outline-none border-none">
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">{t.addPatient}</span>
                        </button>

                        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                            <div className="text-right hidden md:block">
                                <p className="text-xs font-bold text-gray-900 leading-none">{t.userName}</p>
                                <p className="text-[10px] text-green-500 font-medium mt-1 inline-flex items-center gap-1">
                                    <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                                    {t.userStatus}
                                </p>
                            </div>
                            <button className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold border-2 border-primary/20 hover:scale-105 transition-transform shadow-sm">
                                {lang === 'ar' ? 'س' : 'SK'}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-6 bg-slate-50/50 overflow-y-auto no-scrollbar">
                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1 group">
                            <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors ${isRTL ? 'right-4' : 'left-4'}`} />
                            <input
                                type="text"
                                placeholder={t.searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full ${isRTL ? 'pr-12' : 'pl-12'} py-3.5 bg-white border border-transparent focus:border-primary/20 rounded-2xl shadow-sm outline-none transition-all text-sm font-medium focus:ring-4 focus:ring-primary/5`}
                            />
                        </div>
                        <button className="bg-white px-6 py-3.5 rounded-2xl border border-gray-100 text-gray-600 font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50 transition-all">
                            <Filter className="w-5 h-5" />
                            تصفية
                        </button>
                    </div>

                    {/* Patients Table */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-right" dir={isRTL ? 'rtl' : 'ltr'}>
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className={`px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>{t.mrn}</th>
                                        <th className={`px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>{t.patientName}</th>
                                        <th className={`px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>{t.age}</th>
                                        <th className={`px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>{t.gender}</th>
                                        <th className={`px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>{t.lastVisit}</th>
                                        <th className={`px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>{t.status}</th>
                                        <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-wider text-center">{t.actions}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredPatients.map((patient) => (
                                        <tr
                                            key={patient.id}
                                            className="hover:bg-primary/5 transition-colors cursor-pointer group"
                                            onClick={() => navigate('/patient')}
                                        >
                                            <td className="px-6 py-5">
                                                <span className="font-mono font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg text-sm">{patient.mrn}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 group-hover:bg-primary group-hover:text-white transition-all">
                                                        <User className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-sm">{lang === 'ar' ? patient.name : patient.nameEn}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">ID: #{2024000 + patient.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 font-bold text-gray-600 text-sm">{patient.age}</td>
                                            <td className="px-6 py-5 font-bold text-gray-600 text-sm">
                                                {patient.gender === 'male' ? t.male : t.female}
                                            </td>
                                            <td className="px-6 py-5 font-bold text-gray-500 text-sm">{patient.lastVisit}</td>
                                            <td className="px-6 py-5">
                                                <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${patient.status === 'underTreatment' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                    patient.status === 'completed' ? 'bg-green-50 text-green-600 border-green-100' :
                                                        'bg-blue-50 text-blue-600 border-blue-100'
                                                    }`}>
                                                    {patient.status === 'underTreatment' ? t.underTreatment :
                                                        patient.status === 'completed' ? t.completed : t.waiting}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); navigate('/patient'); }}
                                                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                        title={t.viewRecord}
                                                    >
                                                        <FileText className="w-5 h-5" />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                                        <MoreVertical className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                عرض {filteredPatients.length} من أصل {patientsData.length} سجلات
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-gray-400 hover:text-primary disabled:opacity-30" disabled>
                                    {isRTL ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
                                </button>
                                {[1, 2, 3].map((page) => (
                                    <button
                                        key={page}
                                        className={`w-9 h-9 rounded-xl font-bold text-xs transition-all ${page === 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-white'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button className="p-2 text-gray-400 hover:text-primary">
                                    {isRTL ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
