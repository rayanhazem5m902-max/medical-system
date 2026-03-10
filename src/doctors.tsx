import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar, LayoutDashboard, Microscope, Pill,
    ClipboardList, UsersRound, Contact2, Briefcase, Warehouse,
    Layers, Wallet, FileText, Coins, Settings, Search,
    Menu, Globe, Shield, AlertTriangle, Wand2,
    Activity, Bell, LogOut, Users, Printer, Save, X
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
        todaySchedule: 'جدول مواعيد اليوم (العيادات اليومية)',
        emergency: 'حالة طارئة',
        followUp: 'مراجعة',
        consultation: 'استشارة',
        newExam: 'كشف جديد',
        patientDetails: 'تفاصيل المريض والسجل الطبي',
        medicalHistory: 'التاريخ الطبي والتشخيص',
        currentStatus: 'الحالة الصحية الحالية',
        prescribeMedicine: 'وصف الدواء والجرعات',
        prescribe: 'إضافة وصفة',
        vacationRequest: 'طلب إجازة',
        cancelAppointment: 'إلغاء موعد',
        notesPlaceholder: 'اكتب ملاحظات الحالة هنا...',
        medicationPlaceholder: 'اسم الدواء، الجرعة، التكرار...',
        savePrescription: 'حفظ وإرسال للصيدلية',
        notifications: 'التنبيهات',
        patientNameCol: 'المريض',
        timeCol: 'الوقت',
        typeCol: 'نوع الكشف',
        history: 'السجل',
        statusUpdate: 'تحديث الحالة',
        sendRequest: 'إرسال الطلب',
        printReport: 'طباعة التقرير',
        saveReport: 'حفظ التقرير',
        medicalRecord: 'السجل الطبي',
        close: 'إغلاق',
        searchPlaceholder: 'بحث عن مريض في الجدول...',
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
        todaySchedule: "Today's Clinic Schedule",
        patientDetails: 'Patient Details & Medical Record',
        medicalHistory: 'Medical History & Diagnosis',
        currentStatus: 'Current Health Status',
        prescribeMedicine: 'Prescribe Medicine & Dosage',
        prescribe: 'Add Prescription',
        vacationRequest: 'Vacation Request',
        cancelAppointment: 'Cancel Appointment',
        notesPlaceholder: 'Write status notes here...',
        medicationPlaceholder: 'Medication name, dose, frequency...',
        savePrescription: 'Save & Send to Pharmacy',
        notifications: 'Notifications',
        patientNameCol: 'Patient',
        timeCol: 'Time',
        typeCol: 'Checkup Type',
        history: 'History',
        viewDetails: 'View Details',
        emergency: 'Emergency',
        followUp: 'Follow-up',
        consultation: 'Consultation',
        newExam: 'New Exam',
        statusUpdate: 'Status Update',
        sendRequest: 'Send Request',
        printReport: 'Print Report',
        saveReport: 'Save Report',
        medicalRecord: 'Medical Record',
        close: 'Close',
        searchPlaceholder: 'Search patients in schedule...',
    }
};

const PRINT_STYLES = `
@media print {
    .no-print { display: none !important; }
    aside { display: none !important; }
    header { display: none !important; }
    main { padding: 0 !important; margin: 0 !important; }
    .xl\\:col-span-4 { display: none !important; }
    .xl\\:col-span-8 { width: 100% !important; border: none !important; box-shadow: none !important; }
    .bg-gradient-to-br { color: black !important; background: none !important; border-bottom: 2px solid #ddd; }
}
`;

export default function Doctors() {
    const [lang, setLang] = useState<Lang>('ar');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(1);
    const [patientStatus, setPatientStatus] = useState('');
    const [prescription, setPrescription] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showHistoryDialog, setShowHistoryDialog] = useState(false);
    const [historyPatientId, setHistoryPatientId] = useState<number | null>(null);

    const navigate = useNavigate();
    const isRTL = lang === 'ar';
    const t = translations[lang];

    const patientAppointments = [
        { id: 1, name: 'أحمد علي منصور', time: '09:00 AM', type: t.newExam, age: '45', gender: isRTL ? 'ذكر' : 'Male', blood: 'A+', history: isRTL ? 'يعاني من ضغط دم مرتفع منذ 3 سنوات. حساسية من البنسلين.' : 'High blood pressure for 3 years. Penicillin allergy.' },
        { id: 2, name: 'سارة محمد حسن', time: '09:30 AM', type: t.followUp, age: '28', gender: isRTL ? 'أنثى' : 'Female', blood: 'O-', history: isRTL ? 'متابعة بعد عملية الزائدة الدودية. تقدم ملحوظ.' : 'Post-appendectomy follow-up. Significant progress.' },
        { id: 3, name: 'ياسين فهد', time: '10:15 AM', type: t.consultation, age: '34', gender: isRTL ? 'ذكر' : 'Male', blood: 'B+', history: isRTL ? 'آلام في المفاصل والظهر.' : 'Joint and back pain.' },
        { id: 4, name: 'نورة السعدون', time: '11:00 AM', type: t.emergency, age: '52', gender: isRTL ? 'أنثى' : 'Female', blood: 'AB+', history: isRTL ? 'سكري من النوع الثاني. فحص دوري طارئ.' : 'Type 2 diabetes. Emergency routine check.' },
    ];

    const selectedPatient = patientAppointments.find(p => p.id === selectedPatientId);

    const mainMenuItems = [
        { id: 'dash', label: t.dashboard, icon: LayoutDashboard },
        { id: 'patients', label: t.patients, icon: FileText },
        { id: 'appts', label: t.appointments, icon: Calendar },
        { id: 'reception', label: t.reception, icon: ClipboardList },
        { id: 'doctors', label: t.doctors, icon: Activity, active: true },
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
        { id: 'fin-reports', label: t.financialReports, icon: FileText },
        { id: 'payroll-mgmt', label: t.payrollManagement, icon: Coins },
    ];

    const handleSaveAll = () => {
        if (!patientStatus && !prescription) {
            alert(isRTL ? 'يرجى كتابة الملاحظات أو الوصفة أولاً' : 'Please enter status or prescription first');
            return;
        }
        alert(isRTL ? 'تم حفظ التقرير والوصفة الطبية بنجاح' : 'Report and prescription saved successfully');
        setPatientStatus('');
        setPrescription('');
    };

    return (
        <div className={cn("min-h-screen bg-[#f0f4f8] flex")} dir={isRTL ? 'rtl' : 'ltr'}>
            <style>{PRINT_STYLES}</style>
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
                                item.active ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", item.active ? "text-white" : "text-slate-400 group-hover:text-blue-600")} />
                            <span>{item.label}</span>
                        </button>
                    ))}

                    <div className="pt-4 pb-2 px-6">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">{t.management}</h4>
                    </div>

                    {managementItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === 'doc-mgmt') navigate('/doctor-management');
                                if (item.id === 'serv-mgmt') navigate('/services');
                                if (item.id === 'emp-mgmt') navigate('/employee');
                                if (item.id === 'dept-mgmt') navigate('/department');
                                if (item.id === 'pharma-mgmt') navigate('/dispense');
                                if (item.id === 'fin-mgmt') navigate('/payroll');
                                if (item.id === 'fin-reports') navigate('/reports');
                                if (item.id === 'payroll-mgmt') navigate('/salary-management');
                            }}
                            className={cn(
                                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group text-right justify-start",
                                item.active ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", item.active ? "text-white" : "text-slate-400 group-hover:text-blue-600")} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 mx-2 mb-2">
                    <button
                        onClick={() => navigate('/setting')}
                        className="w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-slate-500 hover:bg-slate-50 hover:text-blue-600 text-right justify-start"
                    >
                        <Settings className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                        <span className="text-sm font-bold">{t.settings}</span>
                    </button>
                </div>

                <div className="p-4 border-t border-slate-100 mx-2 pb-8 bg-slate-50/50 rounded-b-[40px]">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-700 flex items-center justify-center text-white font-black text-xs">
                            DR
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-slate-900 truncate">{isRTL ? 'د. خالد العتيبي' : 'Dr. Khaled Otaibi'}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase">{isRTL ? 'العيادات اليومية' : 'Clinic Daily'}</p>
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

            <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50/50">
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
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-3 bg-slate-50 text-slate-500 hover:text-blue-600 rounded-2xl border border-slate-100 transition-all active:scale-95 group"
                        >
                            <Bell className="w-5 h-5 group-hover:shake" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                            {showNotifications && (
                                <div className={cn("absolute top-full mt-4 w-80 bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 z-50 text-right animate-in fade-in slide-in-from-top-4 duration-300", isRTL ? "left-0" : "right-0")}>
                                    <h4 className="text-sm font-black text-slate-900 mb-4">{t.notifications}</h4>
                                    <div className="space-y-4">
                                        <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                                            <p className="text-xs font-bold text-slate-800">طلب استشارة جديد من قسم الطوارئ</p>
                                            <p className="text-[10px] text-slate-400 mt-1 uppercase">منذ 5 دقائق</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                            <p className="text-xs font-bold text-slate-800">تم تحديث نتائج المختبر للمريض أحمد منصور</p>
                                            <p className="text-[10px] text-slate-400 mt-1 uppercase">منذ 15 دقيقة</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </button>
                        <button
                            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                            className="p-3 bg-slate-50 text-slate-500 hover:text-blue-600 rounded-2xl transition-all border border-slate-100 flex items-center gap-2 group active:scale-95"
                        >
                            <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span className="text-xs font-black uppercase tracking-widest">{lang === 'ar' ? 'English' : 'العربية'}</span>
                        </button>
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold border border-blue-200 shadow-sm">K.O</div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar no-scrollbar text-right">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">
                        <div className="xl:col-span-4 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-black text-slate-900 tracking-tight">{t.todaySchedule}</h2>
                                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{patientAppointments.length} مرضى</span>
                            </div>
                            <div className="space-y-4">
                                {patientAppointments.map((appt) => (
                                    <button
                                        key={appt.id}
                                        onClick={() => setSelectedPatientId(appt.id)}
                                        className={cn(
                                            "w-full text-right p-5 rounded-[28px] border transition-all duration-300 group",
                                            selectedPatientId === appt.id
                                                ? "bg-white border-blue-600 shadow-xl shadow-blue-100 ring-4 ring-blue-50"
                                                : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-lg shadow-sm"
                                        )}
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={cn(
                                                        "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-colors shadow-sm",
                                                        selectedPatientId === appt.id ? "bg-blue-600 text-white shadow-blue-200" : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                                                    )}>
                                                        {appt.name[0]}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-black text-slate-900 text-base leading-none mb-1">{appt.name}</p>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{appt.type}</p>
                                                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setHistoryPatientId(appt.id);
                                                                    setShowHistoryDialog(true);
                                                                }}
                                                                className="text-[10px] font-black text-blue-600 hover:text-blue-800 underline decoration-blue-600/30 underline-offset-4 transition-colors"
                                                            >
                                                                {t.medicalRecord}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-[10px] font-black text-blue-600 bg-blue-50/80 px-2.5 py-1 rounded-lg uppercase border border-blue-100/50 shadow-sm">{appt.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-4">
                                <button className="flex flex-col items-center justify-center p-4 bg-emerald-50 border border-emerald-100 rounded-3xl group hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300 active:scale-95">
                                    <Calendar className="w-6 h-6 text-emerald-600 mb-2 group-hover:text-white transition-colors" />
                                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest group-hover:text-white transition-colors">{t.vacationRequest}</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-4 bg-rose-50 border border-rose-100 rounded-3xl group hover:bg-rose-600 hover:border-rose-600 transition-all duration-300 active:scale-95">
                                    <AlertTriangle className="w-6 h-6 text-rose-600 mb-2 group-hover:text-white transition-colors" />
                                    <span className="text-[10px] font-black text-rose-700 uppercase tracking-widest group-hover:text-white transition-colors">{t.cancelAppointment}</span>
                                </button>
                            </div>
                        </div>

                        <div className="xl:col-span-8 flex flex-col gap-8">
                            {selectedPatient ? (
                                <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden flex flex-col h-full animate-in zoom-in duration-500">
                                    <div className="p-8 bg-gradient-to-br from-slate-900 to-blue-900 text-white flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 rounded-[28px] bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl font-black">
                                                {selectedPatient.name[0]}
                                            </div>
                                            <div className="text-right">
                                                <h2 className="text-2xl font-black tracking-tight">{selectedPatient.name}</h2>
                                                <div className="flex items-center gap-4 mt-2 opacity-80 justify-end">
                                                    <span className="text-xs font-bold px-2 py-1 bg-white/10 rounded-lg">{isRTL ? 'العمر' : 'Age'}: {selectedPatient.age}</span>
                                                    <span className="text-xs font-bold px-2 py-1 bg-white/10 rounded-lg">{isRTL ? 'الجنس' : 'Sex'}: {selectedPatient.gender}</span>
                                                    <span className="text-xs font-bold px-2 py-1 bg-white/10 rounded-lg text-rose-300">{isRTL ? 'فصيلة' : 'Blood'}: {selectedPatient.blood}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 no-print">
                                            <button
                                                onClick={handleSaveAll}
                                                className="p-4 bg-white/10 hover:bg-emerald-500/40 rounded-2xl transition-all group flex items-center gap-2"
                                                title={t.saveReport}
                                            >
                                                <Save className="w-5 h-5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">{t.saveReport}</span>
                                            </button>
                                            <button
                                                onClick={() => window.print()}
                                                className="p-4 bg-white/10 hover:bg-blue-500/40 rounded-2xl transition-all group flex items-center gap-2"
                                                title={t.printReport}
                                            >
                                                <Printer className="w-5 h-5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">{t.printReport}</span>
                                            </button>
                                            <button className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
                                                <FileText className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-slate-900 justify-start">
                                                    <Shield className="w-4 h-4 text-blue-600" />
                                                    <h3 className="text-xs font-black uppercase tracking-widest">{t.medicalHistory}</h3>
                                                </div>
                                                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 text-sm font-bold text-slate-600 leading-relaxed italic text-right">
                                                    "{selectedPatient.history}"
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-slate-900 justify-start">
                                                    <Activity className="w-4 h-4 text-emerald-600" />
                                                    <h3 className="text-xs font-black uppercase tracking-widest">{t.currentStatus}</h3>
                                                </div>
                                                <textarea
                                                    value={patientStatus}
                                                    onChange={(e) => setPatientStatus(e.target.value)}
                                                    placeholder={t.notesPlaceholder}
                                                    className="w-full h-32 p-5 bg-slate-50 border border-slate-200 rounded-[32px] text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none text-right"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-6 flex flex-col text-right">
                                            <div className="space-y-3 flex-1">
                                                <div className="flex items-center gap-2 text-slate-900 justify-start">
                                                    <Pill className="w-4 h-4 text-indigo-600" />
                                                    <h3 className="text-xs font-black uppercase tracking-widest">{t.prescribeMedicine}</h3>
                                                </div>
                                                <textarea
                                                    value={prescription}
                                                    onChange={(e) => setPrescription(e.target.value)}
                                                    placeholder={t.medicationPlaceholder}
                                                    className="w-full h-full min-h-[150px] p-5 bg-indigo-50/30 border border-indigo-100 rounded-[32px] text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none text-right"
                                                />
                                            </div>
                                            <button
                                                onClick={handleSaveAll}
                                                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95 no-print"
                                            >
                                                <Wand2 className="w-5 h-5" />
                                                <span>{t.savePrescription}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 bg-white rounded-[40px] border border-slate-100 flex flex-col items-center justify-center text-slate-300">
                                    <Users className="w-16 h-16 mb-4" />
                                    <p className="font-black uppercase tracking-widest">{t.searchPlaceholder}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            {/* History Dialog */}
            {showHistoryDialog && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 bg-blue-600 text-white flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black">{t.medicalRecord}</h3>
                                    <p className="text-xs text-blue-100 font-bold uppercase tracking-widest opacity-80">
                                        {patientAppointments.find(p => p.id === historyPatientId)?.name}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowHistoryDialog(false)}
                                className="p-3 hover:bg-white/10 rounded-2xl transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-10 space-y-8">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isRTL ? 'العمر' : 'Age'}</p>
                                    <p className="text-lg font-black text-slate-900">{patientAppointments.find(p => p.id === historyPatientId)?.age}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isRTL ? 'فصيلة الدم' : 'Blood'}</p>
                                    <p className="text-lg font-black text-rose-600">{patientAppointments.find(p => p.id === historyPatientId)?.blood}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isRTL ? 'الجنس' : 'Gender'}</p>
                                    <p className="text-lg font-black text-slate-900">{patientAppointments.find(p => p.id === historyPatientId)?.gender}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-blue-600" />
                                    {t.medicalHistory}
                                </h4>
                                <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-[32px] text-sm font-bold text-slate-700 leading-relaxed italic text-right">
                                    "{patientAppointments.find(p => p.id === historyPatientId)?.history}"
                                </div>
                            </div>
                            <button
                                onClick={() => setShowHistoryDialog(false)}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all"
                            >
                                {t.close}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
