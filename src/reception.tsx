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
    User,
    ChevronLeft,
    Stethoscope,
    Activity,
    Check
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
        quickAction: 'إجراء سريع'
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
        quickAction: 'Quick Action'
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
    const navigate = useNavigate();
    const isRTL = lang === 'ar';
    const t = translations[lang] as typeof translations.ar;

    const mainMenuItems = [
        { id: 'reception', label: t.reception, icon: ClipboardList, active: true },
        { id: 'patients', label: t.patients, icon: Users },
        { id: 'appts', label: t.appointments, icon: Calendar },
        { id: 'invoices', label: t.invoices, icon: Wallet },
        { id: 'reports', label: t.reports, icon: FileText },
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
        { id: 'C-1002', patient: isRTL ? 'خالد منصور' : 'Khalid Mansour', type: isRTL ? 'متابعة' : 'Follow-up', priority: 'high', status: 'waiting' },
        { id: 'C-1003', patient: isRTL ? 'نورة عبدالله' : 'Noura Abdullah', type: isRTL ? 'استشارة جدية' : 'New Consultation', priority: 'medium', status: 'waiting' },
    ];

    return (
        <div className={cn(
            "min-h-screen bg-[#f1f5f9] flex font-['Cairo'] text-slate-900 overflow-hidden",
            isRTL ? "flex-row" : "flex-row-reverse"
        )} dir={isRTL ? 'rtl' : 'ltr'}>

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:relative z-50 h-full w-[220px] bg-white border-x border-slate-200 transition-all duration-300",
                sidebarOpen ? "translate-x-0" : (isRTL ? "translate-x-full" : "-translate-x-full"),
                "lg:translate-x-0 shadow-sm overflow-y-auto"
            )}>
                <div className="h-14 flex items-center px-4 gap-3 border-b border-slate-100">
                    <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-200">
                        <LayoutDashboard className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-black tracking-tight text-slate-800">{t.hospitalName}</span>
                </div>

                <nav className="mt-4 px-2 space-y-0.5">
                    {mainMenuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === 'reception') navigate('/reception');
                                if (item.id === 'patients') navigate('/patient');
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-xs font-bold",
                                item.active
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                    <div className="pt-4 pb-1 px-3">
                        <h4 className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{t.management}</h4>
                    </div>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all text-xs font-bold">
                        <UserCog className="w-4 h-4" />
                        <span>{t.doctorManagement}</span>
                    </button>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t border-slate-100">
                    <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] font-black text-slate-800 truncate">{t.receptionistName}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase">{isRTL ? 'موظف استقبال' : 'Receptionist'}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <header className="h-14 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur-md">
                    <div className="flex items-center gap-4 flex-1">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg">
                            <Menu className="w-5 h-5 text-slate-600" />
                        </button>
                        <div className="hidden sm:flex items-center gap-2">
                            <button onClick={() => setActiveMainTab('register')} className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-black text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm">
                                <Plus className="w-3.5 h-3.5" />
                                <span>{t.newPatient}</span>
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-black text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all">
                                <History className="w-3.5 h-3.5" />
                                <span>{t.previousRecords}</span>
                            </button>
                        </div>
                        <div className="relative max-w-sm w-full group ml-auto lg:ml-0">
                            <Search className={cn("absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-600", isRTL ? "right-3" : "left-3")} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t.searchPlaceholder}
                                className={cn("w-full py-1.5 bg-slate-100 border-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 rounded-lg text-[11px] font-bold outline-none transition-all placeholder:text-slate-400", isRTL ? "pr-9 pl-10" : "pl-9 pr-10")}
                            />
                            <button className={cn("absolute top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-blue-600 transition-colors", isRTL ? "left-2" : "right-2")}><Fingerprint className="w-4 h-4" /></button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <button onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-lg transition-all"><Globe className="w-4 h-4 text-blue-600" /></button>
                        <button className="relative w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-lg transition-all"><Bell className="w-4 h-4" /><span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white"></span></button>
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
                                    <div className="space-y-6 max-w-2xl animate-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                                            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">{t.registerNew}</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'الاسم الكامل' : 'Full Name'}</label>
                                                <input type="text" className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 rounded-xl text-[11px] font-bold p-2.5 outline-none transition-all" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}</label>
                                                    <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold p-2 outline-none" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'الجنس' : 'Gender'}</label>
                                                    <select className="w-full bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold p-2 outline-none">
                                                        <option>{isRTL ? 'ذكر' : 'Male'}</option>
                                                        <option>{isRTL ? 'أنثى' : 'Female'}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'رقم الهوية / الإقامة' : 'ID / Residency Number'}</label>
                                                <div className="relative"><input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold p-2.5 outline-none" /><Fingerprint className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300", isRTL ? "left-3" : "right-3")} /></div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'رقم الجوال' : 'Phone Number'}</label>
                                                <input type="tel" className="w-full bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold p-2.5 outline-none text-left" dir="ltr" placeholder="+966" />
                                            </div>
                                            <button className="md:col-span-2 py-3.5 bg-blue-600 text-white rounded-xl font-black text-[11px] shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 uppercase tracking-wide mt-2">
                                                <Plus className="w-4 h-4" />
                                                <span>{isRTL ? 'إنشاء ملف مريض جديد' : 'Create New Patient File'}</span>
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
                                                <div className="group relative">
                                                    <div className="relative flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-200 transition-all">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white"><UserCog className="w-5 h-5" /></div>
                                                            <div>
                                                                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{t.drAhmed}</p>
                                                                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /><span className="text-[10px] font-bold text-emerald-600">{t.availableNow}</span></div>
                                                            </div>
                                                        </div>
                                                        <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-blue-50 rounded-lg">{isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</button>
                                                    </div>
                                                </div>
                                                <div className="mt-2 flex items-center gap-1.5 px-3 bg-amber-50 py-2 rounded-lg border border-amber-100">
                                                    <AlertCircle className="w-4 h-4 text-amber-500" />
                                                    <p className="text-[10px] font-bold text-amber-700"><span className="font-black underline">{t.drLaila}</span> {t.onLeave}</p>
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
                                        <div className="w-full lg:w-[280px] space-y-4">
                                            <div className="bg-slate-100/50 rounded-[24px] p-6 border border-slate-200/50 space-y-7">
                                                <div><h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{t.quickPayment}</h3><div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between"><div><p className="text-[9px] font-black text-slate-400">{t.examinationFee}</p><p className="text-2xl font-black text-slate-900 mt-1">250</p></div><div className="bg-blue-600/5 px-2 py-1 rounded text-blue-600 font-black text-[12px]">SAR</div></div></div>
                                                <div><h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{t.paymentMethod}</h3><div className="grid grid-cols-2 gap-2">
                                                    {['card', 'cash'].map(m => (
                                                        <button key={m} onClick={() => setPaymentMethod(m as any)} className={cn("p-4 rounded-xl border flex flex-col items-center gap-2 transition-all", paymentMethod === m ? "bg-white border-blue-500 text-blue-600 shadow-sm" : "bg-white/50 border-transparent text-slate-400")}>{m === 'card' ? <CreditCard className="w-4 h-4" /> : <Banknote className="w-4 h-4" />}<span className="text-[9px] font-black uppercase">{t[m as 'card' | 'cash']}</span></button>
                                                    ))}
                                                </div></div>
                                                <button className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-black text-[11px] shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"><CheckCircle2 className="w-4 h-4" /><span>{t.confirmBooking}</span></button>
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
                                    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-1.5 h-4 bg-red-600 rounded-full" />
                                            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">{t.consultations}</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {consultations.map(c => (
                                                <div key={c.id} className="p-5 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                                                    <div className={cn("absolute top-0 right-0 w-1.5 h-full", c.priority === 'high' ? "bg-red-500" : "bg-amber-500")} />
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600"><Stethoscope className="w-5 h-5" /></div>
                                                            <div>
                                                                <p className="text-[9px] font-black text-slate-400 uppercase">{c.id}</p>
                                                                <p className="text-sm font-black text-slate-900">{c.patient}</p>
                                                            </div>
                                                        </div>
                                                        <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider", c.priority === 'high' ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600")}>{c.priority}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                                        <div className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-blue-500" /><span className="text-[10px] font-bold text-slate-500">{c.type}</span></div>
                                                        <button className="px-4 py-1.5 bg-blue-600 text-white rounded-xl text-[10px] font-black hover:bg-blue-700 transition-all">{isRTL ? 'تحويل للطبيب' : 'Transfer to Doctor'}</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel Widgets */}
                    <div className="w-full md:w-[260px] bg-white border-l border-slate-100 p-6 space-y-8 overflow-y-auto hidden lg:block">
                        <section>
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">{t.queueManagement}</h3>
                                <div className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black rounded-full animate-pulse">12 {t.waitingCount}</div>
                            </div>
                            <div className="space-y-3">
                                {queueMembers.slice(0, 2).map(person => (
                                    <div key={person.id} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white transition-all group shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:text-blue-600">#{person.id}</div>
                                            <div>
                                                <p className="text-[11px] font-black text-slate-700">{person.name}</p>
                                                <p className="text-[8px] font-bold text-slate-400 uppercase">{t.statusWaiting}</p>
                                            </div>
                                        </div>
                                        <Clock className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-400" />
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">{isRTL ? 'عرض الكل' : 'View All'}</button>
                        </section>

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
        </div>
    );
}
