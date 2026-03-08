import { useState } from 'react';
import {
    Users,
    Calendar,
    ClipboardList,
    FileText,
    Search,
    Fingerprint,
    Plus,
    History,
    LayoutDashboard,
    UserCog,
    Wallet,
    Globe,
    Bell,
    Menu,
    Printer,
    CreditCard,
    Banknote,
    CheckCircle2,
    AlertCircle,
    Clock,
    ChevronRight,
    ChevronLeft,
    Activity,
    Check,
    Pill,
    Microscope,
    UsersRound,
    Contact2,
    Briefcase,
    Warehouse,
    Layers,
    Coins,
    Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

type Lang = 'ar' | 'en';

const translations = {
    ar: {
        hospitalName: 'مستشفى الأمل',
        reception: 'الاستقبال والتسجيل',
        patients: 'سجلات المرضى',
        appointments: 'المواعيد',
        invoices: 'الفواتير',
        reports: 'التقارير',
        newPatient: 'مريض جديد',
        previousRecords: 'السجلات السابقة',
        searchPlaceholder: 'البحث برقم الهوية أو الإقامة...',
        registerNew: 'تسجيل مريض جديد',
        bookAppointment: 'حجز / تعديل موعد',
        queueList: 'قائمة الانتظار',
        consultations: 'الاستشارات طارئة',
        doctorSelection: 'اختيار الطبيب',
        onLeave: 'في إجازة رسمية',
        availableTimes: 'المواعيد المتاحة لليوم',
        quickPayment: 'الدفع السريع',
        examinationFee: 'رسوم الكشف',
        paymentMethod: 'طريقة الدفع',
        cash: 'نقدي',
        card: 'بطاقة',
        confirmBooking: 'تأكيد الحجز والدفع',
        queueManagement: 'إدارة الطابور',
        waitingCount: 'في الانتظار',
        printCenter: 'مركز الطباعة السريع',
        printTicket: 'طباعة تذكرة موعد (A5)',
        printReceipt: 'طباعة إيصال مالي',
        drAhmed: 'د. أحمد سالم (استشاري)',
        drLaila: 'د. ليلى محمود',
        sarahAhmed: 'سارة أحمد',
        abdulrahman: 'عبدالرحمن محمد',
        receptionistName: 'محمد علي',
        management: 'الإدارة',
        doctorManagement: 'إدارة الأطباء',
        statusWaiting: 'انتظار',
        statusInProgress: 'قيد الكشف',
        statusCompleted: 'مكتمل',
        availableNow: 'متاح الآن',
        liveSystem: 'نظام حي',
        statNote: 'تم تسجيل 45 حالة جديدة اليوم بنسبة زيادة 12% عن الأسبوع الماضي.',
        emergencyContact: 'اتصال طارئ',
        quickAction: 'الإجراء السريع',
        dashboard: 'لوحة القيادة',
        doctors: 'الأطباء',
        pharmacy: 'الصيدلي',
        laboratory: 'المعامل',
        employeeManagement: 'إدارة الموظفين',
        servicesManagement: 'إدارة الخدمات',
        pharmacyWarehouse: 'إدارة الصيدلية والمخزون',
        deptManagement: 'إدارة الأقسام',
        financialManagement: 'الإدارة المالية',
        financialReports: 'التقارير المالية',
        payrollManagement: 'إدارة الرواتب',
        settings: 'الإعدادات',
        nationality: 'الجنسية',
        address: 'العنوان',
        visitType: 'نوع الزيارة',
        checkup: 'كشف',
        followUp: 'متابعة',
        emergency: 'طوارئ',
        idPassport: 'رقم الهوية / الجواز',
        savePatient: 'حفظ بيانات المريض'
    },
    en: {
        hospitalName: 'Al-Amal Hospital',
        reception: 'Reception & Registration',
        patients: 'Patient Records',
        appointments: 'Appointments',
        invoices: 'Invoices',
        reports: 'Reports',
        newPatient: 'New Patient',
        previousRecords: 'Previous Records',
        searchPlaceholder: 'Search by ID or Residency (Iqama)...',
        registerNew: 'Register New Patient',
        bookAppointment: 'Book/Edit Appointment',
        queueList: 'Queue List',
        consultations: 'Consultations',
        doctorSelection: 'Doctor Selection',
        onLeave: 'On Official Leave',
        availableTimes: 'Available Times Today',
        quickPayment: 'Quick Payment',
        examinationFee: 'Examination Fee',
        paymentMethod: 'Payment Method',
        cash: 'Cash',
        card: 'Card',
        confirmBooking: 'Confirm Booking and Payment',
        queueManagement: 'Queue Management',
        waitingCount: 'In Waiting',
        printCenter: 'Quick Print Center',
        printTicket: 'Print Appointment Ticket (A5)',
        printReceipt: 'Print Financial Receipt',
        drAhmed: 'Dr. Ahmed Salem (Consultant)',
        drLaila: 'Dr. Laila Mahmoud',
        sarahAhmed: 'Sarah Ahmed',
        abdulrahman: 'Abdulrahman Mohamed',
        receptionistName: 'Mohamed Ali',
        management: 'Management',
        doctorManagement: 'Doctor Management',
        statusWaiting: 'Waiting',
        statusInProgress: 'In Progress',
        statusCompleted: 'Completed',
        availableNow: 'Available Now',
        liveSystem: 'Live System',
        statNote: '45 new cases registered today, a 12% increase compared to last week.',
        emergencyContact: 'Emergency Contact',
        quickAction: 'Quick Action',
        dashboard: 'Dashboard',
        doctors: 'Doctors',
        pharmacy: 'Pharmacist',
        laboratory: 'Laboratory',
        employeeManagement: 'Employee Management',
        servicesManagement: 'Services Management',
        pharmacyWarehouse: 'Pharmacy & Warehouse',
        deptManagement: 'Departments Management',
        financialManagement: 'Financial Management',
        financialReports: 'Financial Reports',
        payrollManagement: 'Payroll Management',
        settings: 'Settings',
        nationality: 'Nationality',
        address: 'Address',
        visitType: 'Visit Type',
        checkup: 'Checkup',
        followUp: 'Follow-up',
        emergency: 'Emergency',
        idPassport: 'ID / Passport Number',
        savePatient: 'Save Patient Data'
    }
};

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export default function ReceptionPage() {
    const [lang, setLang] = useState<Lang>('ar');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeMainTab, setActiveMainTab] = useState('book');
    const [selectedTime, setSelectedTime] = useState('11:15');
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('card');
    const [searchQuery, setSearchQuery] = useState('');
    const [serviceSearch, setServiceSearch] = useState('');
    const [docView, setDocView] = useState<'today' | 'week'>('today');
    const [selectedVisitType, setSelectedVisitType] = useState<'checkup' | 'followup' | 'emergency'>('checkup');
    const [selectedDoctorId, setSelectedDoctorId] = useState<number>(1);
    const [showReceipt, setShowReceipt] = useState(false);
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const navigate = useNavigate();
    const isRTL = lang === 'ar';
    const t = translations[lang] as typeof translations.ar;

    const mainMenuItems = [
        { id: 'dash', label: t.dashboard, icon: LayoutDashboard, active: window.location.pathname === '/dashboard' },
        { id: 'patients', label: t.patients, icon: Users, active: window.location.pathname === '/patients' },
        { id: 'appts', label: t.appointments, icon: Calendar, active: window.location.pathname === '/appointment' },
        { id: 'reception', label: t.reception, icon: ClipboardList, active: true },
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

    const timeSlots = [
        '09:00', '09:15', '09:30', '09:45', '10:00', '10:15',
        '10:30', '10:45', '11:00', '11:15', '11:30', '11:45',
        '12:00', '12:15', '12:30', '12:45',
    ];

    const queueMembers = [
        { id: '01', name: t.sarahAhmed, status: 'waiting', time: '10:30', dr: t.drAhmed },
        { id: '02', name: t.abdulrahman, status: 'in-progress', time: '10:45', dr: t.drAhmed },
        { id: '03', name: isRTL ? 'فاطمة الزهراء' : 'Fatima Al-Zahra', status: 'waiting', time: '11:00', dr: t.drAhmed },
        { id: '04', name: isRTL ? 'يوسف إبراهيم' : 'Yousef Ibrahim', status: 'waiting', time: '11:15', dr: t.drAhmed },
    ];

    const consultations = [
        { id: 'E-001', patient: isRTL ? 'فهد منصور' : 'Fahad Mansour', type: isRTL ? 'طوارئ حادة' : 'Acute Emergency', priority: 'high', category: 'emergency' },
        { id: 'E-002', patient: isRTL ? 'نورة عبدالله' : 'Noura Abdullah', type: isRTL ? 'أزمة صدرية' : 'Chest Crisis', priority: 'high', category: 'emergency' },
        { id: 'C-1002', patient: isRTL ? 'خالد منصور' : 'Khalid Mansour', type: isRTL ? 'متابعة' : 'Follow-up', priority: 'medium', category: 'standard' },
        { id: 'C-1003', patient: isRTL ? 'ليلى حسن' : 'Laila Hassan', type: isRTL ? 'استشارة جديدة' : 'New Consultation', priority: 'low', category: 'standard' },
    ];

    const weeklyDoctors = [
        { id: 1, name: isRTL ? 'د. أحمد سالم' : 'Dr. Ahmed Salem', specialty: isRTL ? 'باطنية' : 'Internal', days: isRTL ? 'الأحد - الخميس' : 'Sun - Thu', status: 'available', workingToday: true, apptsToday: 12, weeklyAppts: 45, slots: 5 },
        { id: 2, name: isRTL ? 'د. ليلى خليل' : 'Dr. Laila Khalil', specialty: isRTL ? 'أطفال' : 'Pediatrics', days: isRTL ? 'الاثنين - الأربعاء' : 'Mon - Wed', status: 'available', workingToday: true, apptsToday: 8, weeklyAppts: 32, slots: 3 },
        { id: 3, name: isRTL ? 'د. فيصل الزامل' : 'Dr. Faisal Zamil', specialty: isRTL ? 'عظام' : 'Orthopedics', days: isRTL ? 'يومياً' : 'Daily', status: 'away', workingToday: false, apptsToday: 0, weeklyAppts: 28, slots: 0 },
        { id: 4, name: isRTL ? 'د. منيرة سعود' : 'Dr. Munira Saud', specialty: isRTL ? 'جلدية' : 'Dermatology', days: isRTL ? 'السبت - الأحد' : 'Sat - Sun', status: 'available', workingToday: false, apptsToday: 0, weeklyAppts: 15, slots: 10 },
    ];

    const servicesPrices = [
        { name: isRTL ? 'كشف عام' : 'General Checkup', price: '100', category: isRTL ? 'العيادات' : 'Clinics' },
        { name: isRTL ? 'كشف استشاري' : 'Consultant Checkup', price: '250', category: isRTL ? 'العيادات' : 'Clinics' },
        { name: isRTL ? 'صورة دم CBC' : 'CBC Test', price: '80', category: isRTL ? 'المختبر' : 'Lab' },
        { name: isRTL ? 'تنظيف أسنان' : 'Teeth Cleaning', price: '200', category: isRTL ? 'الأسنان' : 'Dental' },
        { name: isRTL ? 'أشعة إكس' : 'X-Ray', price: '150', category: isRTL ? 'الأشعة' : 'Radiology' },
    ].filter(s => s.name.toLowerCase().includes(serviceSearch.toLowerCase()) || s.category.toLowerCase().includes(serviceSearch.toLowerCase()));

    const feeMap = { checkup: 100, followup: 50, emergency: 400 };

    return (
        <div className={cn(
            "min-h-screen bg-[#f1f5f9] flex font-['Cairo'] text-slate-900 overflow-hidden",
            isRTL ? "flex-row" : "flex-row-reverse"
        )} dir={isRTL ? 'rtl' : 'ltr'}>

            {/* Sidebar */}
            <aside className={`fixed lg:relative z-40 h-full w-64 bg-white text-gray-500 transition-all duration-300 transform ${sidebarOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')} lg:translate-x-0 shadow-xl overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-200`}>
                <div className="p-6 pb-2 flex items-center gap-3">
                    <span className="text-xl font-bold tracking-tight uppercase text-gray-900">{isRTL ? 'مستشفى الشفاء' : 'Al-Shifa'}</span>
                </div>

                <nav className="mt-6 px-4 space-y-1">
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
                                if (item.id === 'doctors') navigate('/dashboard');
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${item.active ? 'bg-blue-600/10 text-blue-600 shadow-sm' : 'text-gray-400 hover:bg-gray-50 hover:text-blue-600'}`}
                        >
                            <item.icon className={`w-5 h-5 ${item.active ? '' : 'transition-transform group-hover:scale-110'}`} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </button>
                    ))}

                    {/* Management Section */}
                    <div className="pt-4 pb-2 px-4">
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t.management}</h4>
                    </div>

                    {managementItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === 'serv-mgmt') navigate('/services');
                                if (item.id === 'doc-mgmt') navigate('/doctor-management');
                                setSidebarOpen(window.innerWidth >= 1024);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group text-gray-400 hover:bg-gray-50 hover:text-blue-600"
                        >
                            <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                            <span className="font-medium text-sm">{item.label}</span>
                        </button>
                    ))}

                    {/* System Settings */}
                    <button
                        onClick={() => navigate('/setting')}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-gray-400 hover:bg-gray-50 hover:text-blue-600 mt-4 border-t border-gray-100 pt-4 mb-6"
                    >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium text-sm">{t.settings}</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <header className="h-20 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                            <Menu className="w-6 h-6 text-gray-600" />
                        </button>
                        <div className="hidden sm:flex items-center gap-2">
                            <button onClick={() => setActiveMainTab('register')} className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-100">
                                <Plus className="w-4 h-4" />
                                <span>{t.newPatient}</span>
                            </button>
                            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-100">
                                <History className="w-4 h-4" />
                                <span>{t.previousRecords}</span>
                            </button>
                        </div>
                        <div className="relative max-w-sm w-full group ml-auto lg:ml-0">
                            <Search className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors", isRTL ? "right-4" : "left-4")} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t.searchPlaceholder}
                                className={cn("w-full py-2.5 bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-blue-500/5 rounded-xl text-sm font-medium outline-none transition-all placeholder:text-slate-400", isRTL ? "pr-12 pl-4" : "pl-12 pr-4")}
                            />
                            <button className={cn("absolute top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-blue-600 transition-colors", isRTL ? "left-3" : "right-3")}><Fingerprint className="w-4 h-4" /></button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
                            className="p-3 bg-slate-50 text-slate-500 hover:text-blue-600 rounded-2xl transition-all border border-slate-100 flex items-center gap-2 group active:scale-95"
                        >
                            <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span className="text-xs font-black uppercase tracking-widest">{lang === 'ar' ? 'English' : 'العربية'}</span>
                        </button>
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold border border-blue-200 shadow-sm">AD</div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className="text-xs font-bold text-gray-900 leading-none">{t.receptionistName}</p>
                                <p className="text-[10px] text-green-500 font-medium mt-1 inline-flex items-center gap-1">
                                    <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                                    {isRTL ? 'موظف استقبال' : 'Receptionist'}
                                </p>
                            </div>
                            <button className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold border-2 border-blue-100 hover:scale-105 transition-transform shadow-sm">
                                {lang === 'ar' ? 'م' : 'MA'}
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-hidden flex flex-col md:flex-row">
                    <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6 space-y-4">
                        <div className="flex overflow-x-auto no-scrollbar pb-1">
                            <div className="bg-white p-0.5 rounded-xl shadow-sm border border-slate-200 inline-flex flex-nowrap shrink-0">
                                {[
                                    { id: 'register', label: t.registerNew },
                                    { id: 'book', label: t.bookAppointment },
                                    { id: 'queue', label: t.queueList },
                                    { id: 'cons', label: t.consultations }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveMainTab(tab.id)}
                                        className={cn(
                                            "px-4 py-1.5 text-[10px] font-black rounded-lg transition-all whitespace-nowrap",
                                            activeMainTab === tab.id
                                                ? "bg-blue-600 text-white shadow-sm"
                                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                                        )}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-[24px] border border-slate-200 shadow-md overflow-hidden relative min-h-[500px]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                            <div className="p-5 md:p-8 relative">
                                {activeMainTab === 'register' && (
                                    <div className="space-y-6 max-w-3xl animate-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                                            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">{t.registerNew}</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                                            {/* Full Name */}
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'الاسم الكامل' : 'Full Name'}</label>
                                                <input type="text" className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 rounded-xl text-[11px] font-bold p-2.5 outline-none transition-all" />
                                            </div>

                                            {/* ID / Passport */}
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.idPassport}</label>
                                                <div className="relative">
                                                    <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold p-2.5 outline-none" />
                                                    <Fingerprint className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300", isRTL ? "left-3" : "right-3")} />
                                                </div>
                                            </div>

                                            {/* DOB & Gender */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}</label>
                                                    <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold p-2 outline-none" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'الجنس' : 'Gender'}</label>
                                                    <select className="w-full bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold p-2 outline-none">
                                                        <option value="male">{isRTL ? 'ذكر' : 'Male'}</option>
                                                        <option value="female">{isRTL ? 'أنثى' : 'Female'}</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Nationality & Phone */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.nationality}</label>
                                                    <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold p-2.5 outline-none" placeholder={isRTL ? 'سعودي...' : 'Saudi...'} />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'رقم الجوال' : 'Phone Number'}</label>
                                                    <input type="tel" className="w-full bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold p-2.5 outline-none text-left" dir="ltr" placeholder="+966" />
                                                </div>
                                            </div>

                                            {/* Address */}
                                            <div className="md:col-span-2 space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.address}</label>
                                                <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold p-2.5 outline-none" placeholder={isRTL ? 'الحي، الشارع، المدينة...' : 'District, Street, City...'} />
                                            </div>

                                            {/* Visit Type */}
                                            <div className="md:col-span-2 space-y-3 pt-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.visitType}</label>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {[
                                                        { id: 'checkup', label: t.checkup, color: 'blue' },
                                                        { id: 'followup', label: t.followUp, color: 'emerald' },
                                                        { id: 'emergency', label: t.emergency, color: 'red' }
                                                    ].map((vt) => (
                                                        <button
                                                            key={vt.id}
                                                            onClick={() => setSelectedVisitType(vt.id as any)}
                                                            className={cn(
                                                                "py-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1",
                                                                "hover:border-slate-300 bg-slate-50/50",
                                                                selectedVisitType === vt.id ? "border-blue-500 text-blue-600 bg-blue-50/10 shadow-sm" : "border-slate-100 text-slate-500"
                                                            )}>
                                                            <span className="text-[11px] font-black">{vt.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <button className="md:col-span-2 py-4 bg-blue-600 text-white rounded-xl font-black text-[12px] shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 uppercase tracking-widest mt-4">
                                                <Check className="w-5 h-5" />
                                                <span>{t.savePatient}</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeMainTab === 'book' && (
                                    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex-1 space-y-6">
                                            <section>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-1 h-3 bg-blue-600 rounded-full" />
                                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.doctorSelection}</h3>
                                                </div>
                                                <div className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm">
                                                    <table className="w-full text-right">
                                                        <thead>
                                                            <tr className="bg-slate-50 border-b border-slate-200">
                                                                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">{isRTL ? 'الطبيب' : 'Doctor'}</th>
                                                                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">{isRTL ? 'التخصص' : 'Specialty'}</th>
                                                                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">{isRTL ? 'الحالة' : 'Status'}</th>
                                                                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-slate-100">
                                                            {weeklyDoctors.filter(d => d.workingToday).map(doc => (
                                                                <tr key={doc.id} className={cn("hover:bg-blue-50/30 transition-colors", selectedDoctorId === doc.id && "bg-blue-50/50")}>
                                                                    <td className="px-4 py-3">
                                                                        <p className="text-xs font-black text-slate-800">{doc.name}</p>
                                                                    </td>
                                                                    <td className="px-4 py-3 text-[10px] font-bold text-slate-500">{doc.specialty}</td>
                                                                    <td className="px-4 py-3">
                                                                        <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase", doc.status === 'available' ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400")}>
                                                                            <span className={cn("w-1 h-1 rounded-full", doc.status === 'available' ? "bg-emerald-500" : "bg-slate-400")} />
                                                                            {doc.status === 'available' ? t.availableNow : t.onLeave}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-4 py-3 text-left">
                                                                        <button
                                                                            onClick={() => setSelectedDoctorId(doc.id)}
                                                                            className={cn("px-3 py-1.5 rounded-lg text-[9px] font-black transition-all", selectedDoctorId === doc.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-blue-100")}
                                                                        >
                                                                            {isRTL ? 'اختيار' : 'Select'}
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </section>

                                            {/* Visit Type in Book Tab */}
                                            <section>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-1 h-3 bg-blue-600 rounded-full" />
                                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.visitType}</h3>
                                                </div>
                                                <div className="flex gap-2">
                                                    {[
                                                        { id: 'checkup', label: t.checkup },
                                                        { id: 'followup', label: t.followUp },
                                                        { id: 'emergency', label: t.emergency }
                                                    ].map((vt) => (
                                                        <button
                                                            key={vt.id}
                                                            onClick={() => setSelectedVisitType(vt.id as any)}
                                                            className={cn(
                                                                "flex-1 py-2.5 rounded-xl border-2 font-black text-[10px] transition-all",
                                                                selectedVisitType === vt.id ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white border-slate-100 text-slate-400 hover:border-blue-200"
                                                            )}
                                                        >
                                                            {vt.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </section>
                                            <section>
                                                <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><div className="w-1 h-3 bg-blue-600 rounded-full" /><h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.availableTimes}</h3></div><div className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-[9px] font-black">05 MAR 2024</div></div>
                                                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2">
                                                    {timeSlots.map(time => (
                                                        <button key={time} onClick={() => setSelectedTime(time)} className={cn("py-2 px-1 text-[11px] font-black rounded-lg border transition-all", selectedTime === time ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200" : "bg-white border-slate-100 text-slate-500 hover:border-blue-200")}>{time}</button>
                                                    ))}
                                                </div>
                                            </section>
                                        </div>
                                        <div className="w-full lg:w-[320px] space-y-4">
                                            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-xl shadow-slate-200/50 space-y-8 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-3xl -mr-12 -mt-12" />

                                                <div>
                                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{t.quickPayment}</h3>
                                                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-center justify-between">
                                                        <div>
                                                            <p className="text-[9px] font-black text-slate-400 uppercase">{t.examinationFee}</p>
                                                            <p className="text-3xl font-black text-slate-900 mt-1">{feeMap[selectedVisitType]}</p>
                                                        </div>
                                                        <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg font-black text-[12px] shadow-lg shadow-blue-100">SAR</div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{t.paymentMethod}</h3>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {['card', 'cash'].map(m => (
                                                            <button
                                                                key={m}
                                                                onClick={() => setPaymentMethod(m as any)}
                                                                className={cn(
                                                                    "p-5 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all",
                                                                    paymentMethod === m ? "bg-blue-50 border-blue-600 text-blue-600 shadow-sm" : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
                                                                )}
                                                            >
                                                                {m === 'card' ? <CreditCard className="w-5 h-5" /> : <Banknote className="w-5 h-5" />}
                                                                <span className="text-[10px] font-black uppercase">{t[m as 'card' | 'cash']}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="pt-2">
                                                    {!showReceipt ? (
                                                        <button
                                                            onClick={() => setShowReceipt(true)}
                                                            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[12px] shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                                                        >
                                                            <CheckCircle2 className="w-5 h-5" />
                                                            <span>{t.confirmBooking}</span>
                                                        </button>
                                                    ) : (
                                                        <div className="space-y-4 animate-in zoom-in-95 duration-300">
                                                            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white"><Check className="w-5 h-5" /></div>
                                                                <div>
                                                                    <p className="text-[11px] font-black text-emerald-800">{isRTL ? 'نم الحجز بنجاح' : 'Booked Successfully'}</p>
                                                                    <p className="text-[9px] font-bold text-emerald-600">{isRTL ? 'إيصال رقم #8892' : 'Receipt #8892'}</p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => setShowReceiptModal(true)}
                                                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[12px] shadow-xl shadow-slate-200 hover:bg-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                                                            >
                                                                <Printer className="w-5 h-5" />
                                                                <span>{isRTL ? 'طباعة الإيصال المالي' : 'Print Financial Receipt'}</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeMainTab === 'queue' && (
                                    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                                                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">{t.queueList}</h3>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black border border-emerald-100">8 {isRTL ? 'مكتمل' : 'Completed'}</div>
                                                <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black border border-blue-100">4 {isRTL ? 'في الانتظار' : 'Waiting'}</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3">
                                            {queueMembers.map(item => (
                                                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 group hover:bg-white hover:shadow-lg transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-xs font-black text-slate-400 group-hover:text-blue-600 group-hover:border-blue-200 shadow-sm">#{item.id}</div>
                                                        <div>
                                                            <p className="text-sm font-black text-slate-900">{item.name}</p>
                                                            <div className="flex items-center gap-3 mt-1">
                                                                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {item.time}</span>
                                                                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><UserCog className="w-3 h-3" /> {item.dr}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className={cn(
                                                            "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider",
                                                            item.status === 'in-progress' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                                                        )}>
                                                            {item.status === 'in-progress' ? t.statusInProgress : t.statusWaiting}
                                                        </span>
                                                        <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600"><Printer className="w-4 h-4" /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeMainTab === 'cons' && (
                                    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
                                        {/* Emergency Section */}
                                        <section>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-4 bg-red-600 rounded-full" />
                                                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">{isRTL ? 'استشارات الطوارئ' : 'Emergency Consultations'}</h3>
                                                </div>
                                                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black rounded-full animate-pulse">{isRTL ? 'حالة حرجة' : 'CRITICAL'}</span>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {consultations.filter(c => c.category === 'emergency').map(c => (
                                                    <div key={c.id} className="p-5 bg-white border border-red-100 rounded-3xl shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                                                        <div className="absolute top-0 right-0 w-1.5 h-full bg-red-500" />
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform"><AlertCircle className="w-5 h-5" /></div>
                                                                <div>
                                                                    <p className="text-[9px] font-black text-slate-400 uppercase">{c.id}</p>
                                                                    <p className="text-sm font-black text-slate-900">{c.patient}</p>
                                                                </div>
                                                            </div>
                                                            <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-red-600 text-white">{isRTL ? 'طوارئ' : 'EMERGENCY'}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                                            <div className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-red-500" /><span className="text-[10px] font-bold text-slate-600 font-black">{c.type}</span></div>
                                                            <button className="px-4 py-1.5 bg-red-600 text-white rounded-xl text-[10px] font-black hover:bg-red-700 transition-all">{isRTL ? 'دخول فوراً' : 'Enter Now'}</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        {/* Doctors Schedule */}
                                        <section>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                                                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">{isRTL ? 'جدول الأطباء المناوبين' : 'Doctors Schedule'}</h3>
                                                </div>
                                                <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                                                    <button
                                                        onClick={() => setDocView('today')}
                                                        className={cn("px-4 py-1.5 text-[10px] font-black rounded-lg transition-all", docView === 'today' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400")}
                                                    >
                                                        {isRTL ? 'اليوم' : 'Today'}
                                                    </button>
                                                    <button
                                                        onClick={() => setDocView('week')}
                                                        className={cn("px-4 py-1.5 text-[10px] font-black rounded-lg transition-all", docView === 'week' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400")}
                                                    >
                                                        {isRTL ? 'الأسبوع' : 'Week'}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {weeklyDoctors
                                                    .filter(doc => docView === 'today' ? doc.workingToday : true)
                                                    .map((doc) => (
                                                        <div key={doc.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col gap-3 transition-all hover:bg-white hover:shadow-md group">
                                                            <div className="flex items-center gap-4">
                                                                <div className="relative">
                                                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:rotate-6 transition-transform"><UserCog className="w-6 h-6" /></div>
                                                                    <div className={cn("absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-50", doc.status === 'available' ? 'bg-emerald-500' : 'bg-slate-300')} />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-xs font-black text-slate-900 truncate">{doc.name}</p>
                                                                    <p className="text-[9px] font-bold text-slate-500">{doc.specialty}</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                                                <div className="flex flex-col">
                                                                    <p className="text-[8px] font-black text-blue-600 uppercase tracking-tighter">{doc.days}</p>
                                                                    <p className="text-[8px] font-bold text-slate-400">{isRTL ? 'نظام النوبات' : 'Shift System'}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-xs font-black text-slate-900">{docView === 'today' ? doc.apptsToday : doc.weeklyAppts}</p>
                                                                    <p className="text-[8px] font-bold text-slate-400 uppercase leading-none">{isRTL ? 'موعد' : 'Appts'}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </section>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel Widgets */}
                    <div className="w-full md:w-[300px] bg-white border-l border-slate-100 p-6 space-y-8 overflow-y-auto hidden lg:block">
                        {activeMainTab === 'cons' && (
                            <section>
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">{isRTL ? 'أسعار الخدمات' : 'Service Prices'}</h3>
                                    <div className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black rounded-full">{servicesPrices.length} {isRTL ? 'خدمة مفعّلة' : 'Active'}</div>
                                </div>

                                {/* Service Search */}
                                <div className="relative mb-5 group">
                                    <Search className={cn("absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors", isRTL ? "right-3" : "left-3")} />
                                    <input
                                        type="text"
                                        placeholder={isRTL ? 'بحث عن خدمة...' : 'Search service...'}
                                        value={serviceSearch}
                                        onChange={(e) => setServiceSearch(e.target.value)}
                                        className={cn("w-full py-2 bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-blue-500/5 rounded-xl text-[10px] font-black outline-none transition-all", isRTL ? "pr-9 pl-3" : "pl-9 pr-3")}
                                    />
                                </div>

                                <div className="space-y-2.5 max-h-[400px] overflow-y-auto no-scrollbar pr-1">
                                    {servicesPrices.map((service, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white transition-all group shadow-sm hover:border-blue-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-[10px] font-black text-blue-600 group-hover:scale-110 transition-transform"><Pill className="w-4 h-4" /></div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-700">{service.name}</p>
                                                    <p className="text-[8px] font-bold text-slate-400 uppercase">{service.category}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[11px] font-black text-slate-900">{service.price}</p>
                                                <p className="text-[7px] font-bold text-slate-400 uppercase">SAR</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className="pt-6 border-t border-slate-50">
                            <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-5">{t.printCenter}</h3>
                            <div className="space-y-2">
                                {[
                                    { id: 'ticket', label: t.printTicket, icon: Printer },
                                    { id: 'receipt', label: t.printReceipt, icon: FileText }
                                ].map(item => (
                                    <button key={item.id} className="w-full flex items-center justify-between p-3 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-slate-50 transition-all group">
                                        <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all"><item.icon className="w-4 h-4" /></div><span className="text-[10px] font-black text-slate-600 group-hover:text-slate-900">{item.label}</span></div>
                                        {isRTL ? <ChevronLeft className="w-3 h-3 text-slate-300 group-hover:text-blue-500" /> : <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-blue-500" />}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <div className="p-5 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[28px] text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-8 -mt-8" />
                            <div className="flex items-center gap-2 mb-3"><div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse"><Check className="w-2.5 h-2.5 text-white" /></div><span className="text-[9px] font-black uppercase tracking-widest">{t.availableNow}</span></div>
                            <p className="text-[11px] font-black leading-relaxed">{t.statNote}</p>
                            <div className="mt-4 flex gap-2">
                                <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-blue-400 w-3/4" /></div>
                                <span className="text-[10px] font-black">75%</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Receipt Modal */}
            {showReceiptModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
                        {/* Header Decoration */}
                        <div className="h-32 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white relative">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                            <div className="flex justify-between items-start relative z-10">
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-tighter">{t.hospitalName}</h2>
                                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">{isRTL ? 'إيصال مالي ضريبي' : 'Tax Financial Receipt'}</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                                    <Printer className="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        {/* Receipt Content */}
                        <div className="p-8 pb-10 space-y-8">
                            <div className="flex justify-between items-center pb-6 border-b border-slate-100 border-dashed">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">{isRTL ? 'رقم الإيصال' : 'Receipt No'}</p>
                                    <p className="text-sm font-black text-slate-900 mt-0.5">#8892-001</p>
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-slate-400 uppercase">{isRTL ? 'التاريخ' : 'Date'}</p>
                                    <p className="text-sm font-black text-slate-900 mt-0.5" dir="ltr">08 MAR 2024</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center group">
                                    <span className="text-[11px] font-bold text-slate-500">{isRTL ? 'اسم المريض' : 'Patient Name'}</span>
                                    <span className="text-sm font-black text-slate-900 uppercase underline decoration-blue-200 underline-offset-4">{isRTL ? 'فهد منصور' : 'Fahad Mansour'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-bold text-slate-500">{isRTL ? 'الطبيب' : 'Doctor'}</span>
                                    <span className="text-sm font-black text-slate-900">{weeklyDoctors.find(d => d.id === selectedDoctorId)?.name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-bold text-slate-500">{isRTL ? 'نوع الخدمة' : 'Service Type'}</span>
                                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase text-slate-700">{selectedVisitType}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-bold text-slate-500">{isRTL ? 'طريقة الدفع' : 'Payment'}</span>
                                    <span className="text-sm font-black text-blue-600 uppercase flex items-center gap-1.5">
                                        {paymentMethod === 'card' ? <CreditCard className="w-4 h-4" /> : <Banknote className="w-4 h-4" />}
                                        {t[paymentMethod as 'card' | 'cash']}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black text-slate-400 uppercase">{isRTL ? 'إجمالي المبلغ' : 'Total Amount'}</span>
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 justify-end">
                                            <span className="text-3xl font-black text-slate-900">{feeMap[selectedVisitType]}</span>
                                            <span className="text-xs font-black text-blue-600">SAR</span>
                                        </div>
                                        <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase italic">{isRTL ? 'شامل ضريبة القيمة المضافة 15%' : 'Incl. 15% VAT'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowReceiptModal(false)}
                                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-slate-200 transition-all"
                                >
                                    {isRTL ? 'إغلاق' : 'Close'}
                                </button>
                                <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                                    <Printer className="w-4 h-4" />
                                    <span>{isRTL ? 'طباعة' : 'Print'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Bottom Decoration */}
                        <div className="p-4 bg-slate-50 text-center">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{isRTL ? 'شكراً لزيارتكم مستشفى الشفاء' : 'Thank you for visiting Al-Shifa Hospital'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}
