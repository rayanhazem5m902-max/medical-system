import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar, LayoutDashboard, Microscope, Pill,
    ClipboardList, UsersRound, Contact2, Briefcase, Warehouse,
    Layers, Wallet, FileText, Coins, Settings, Search,
    Menu, Globe, Shield,
    Activity, Bell, LogOut, X, UserPlus, User, Phone, Wand2
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
        phonePlaceholder: '05XXXXXXXX',
        todaySchedule: 'جدول مواعيد اليوم',
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
        close: 'إغلاق'
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
        actions: 'Actions',
        licensePlaceholder: 'MOH-XXXXX-X',
        phonePlaceholder: '05XXXXXXXX',
        todaySchedule: "Today's Schedule",
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
        close: 'Close'
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

export default function DoctorManagement() {
    const [lang, setLang] = useState<Lang>('ar');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);
    const [selectedPatientId] = useState<number | null>(1);
    const [patientStatus, setPatientStatus] = useState('');
    const [prescription, setPrescription] = useState('');
    const [showAddDoctor, setShowAddDoctor] = useState(false);
    const [doctors] = useState([
        { id: 1, name: 'د. خالد العتيبي', code: 'DOC-101', specialty: 'جراحة القلب', dept: 'قسم القلب', status: 'active', patientsToday: 4 },
        { id: 2, name: 'د. ليلى حسن', code: 'DOC-102', specialty: 'طب الأطفال', dept: 'قسم الأطفال', status: 'active', patientsToday: 6 },
        { id: 3, name: 'د. محمد الراشد', code: 'DOC-103', specialty: 'جراحة العظام', dept: 'قسم العظام', status: 'vacation', patientsToday: 0 },
        { id: 4, name: 'د. سارة المنصور', code: 'DOC-104', specialty: 'طب الطوارئ', dept: 'قسم الطوارئ', status: 'active', patientsToday: 12 },
    ]);

    const navigate = useNavigate();
    const isRTL = lang === 'ar';
    const t = translations[lang];

    const patientAppointments = [
        { id: 1, name: 'أحمد علي منصور', time: '09:00 AM', type: t.newExam, age: '45', gender: isRTL ? 'ذكر' : 'Male', blood: 'A+', history: isRTL ? 'يعاني من ضغط دم مرتفع منذ 3 سنوات. حساسية من البنسلين.' : 'High blood pressure for 3 years. Penicillin allergy.' },
        { id: 2, name: 'سارة محمد حسن', time: '09:30 AM', type: t.followUp, age: '28', gender: isRTL ? 'أنثى' : 'Female', blood: 'O-', history: isRTL ? 'متابعة بعد عملية الزائدة الدودية. تقدم ملحوظ.' : 'Post-appendectomy follow-up. Significant progress.' },
        { id: 3, name: 'ياسين فهد', time: '10:15 AM', type: t.consultation, age: '34', gender: isRTL ? 'ذكر' : 'Male', blood: 'B+', history: isRTL ? 'آلام في المفاصل والظهر.' : 'Joint and back pain.' },
        { id: 4, name: 'نورة السعدون', time: '11:00 AM', type: t.emergency, age: '52', gender: isRTL ? 'أنثى' : 'Female', blood: 'AB+', history: isRTL ? 'سكري من النوع الثاني. فحص دوري طارئ.' : 'Type 2 diabetes. Emergency routine check.' },
    ];

    const [doctors1, setDoctors1] = useState([
        { id: 1, name: 'د. خالد العتيبي', code: 'DOC-101', specialty: 'جراحة القلب', dept: 'قسم القلب', status: 'active', patientsToday: 4 },
        { id: 2, name: 'د. ليلى حسن', code: 'DOC-102', specialty: 'طب الأطفال', dept: 'قسم الأطفال', status: 'active', patientsToday: 6 },
        { id: 3, name: 'د. محمد الراشد', code: 'DOC-103', specialty: 'جراحة العظام', dept: 'قسم العظام', status: 'vacation', patientsToday: 0 },
        { id: 4, name: 'د. سارة المنصور', code: 'DOC-104', specialty: 'طب الطوارئ', dept: 'قسم الطوارئ', status: 'active', patientsToday: 12 },
    ]);

    const selectedPatient = patientAppointments.find(p => p.id === selectedPatientId);

    const mainMenuItems: { id: string, label: string, icon: any, active?: boolean }[] = [
        { id: 'dash', label: t.dashboard, icon: LayoutDashboard },
        { id: 'patients', label: t.patients, icon: FileText },
        { id: 'appts', label: t.appointments, icon: Calendar },
        { id: 'reception', label: t.reception, icon: ClipboardList },
        { id: 'doctors', label: t.doctors, icon: Activity },
        { id: 'pharmacy', label: t.pharmacy, icon: Pill },
        { id: 'laboratory', label: t.laboratory, icon: Microscope },
    ];

    const managementItems: { id: string, label: string, icon: any, active?: boolean }[] = [
        { id: 'doc-mgmt', label: t.doctorManagement, icon: UsersRound, active: true },
        { id: 'emp-mgmt', label: t.employeeManagement, icon: Contact2 },
        { id: 'serv-mgmt', label: t.servicesManagement, icon: Briefcase },
        { id: 'pharma-mgmt', label: t.pharmacyWarehouse, icon: Warehouse },
        { id: 'dept-mgmt', label: t.deptManagement, icon: Layers },
        { id: 'fin-mgmt', label: t.financialManagement, icon: Wallet },
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
                        <div className="w-12 h-12 bg-[#1a4fa0] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-black tracking-tight text-slate-900">{isRTL ? 'مستشفى الشفاء' : 'Al-Shifa'}</h1>
                            <p className="text-[10px] text-[#1a4fa0] font-bold uppercase tracking-widest leading-none mt-1">Medical Center</p>
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
                                item.active ? "bg-[#1a4fa0] text-white shadow-xl shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0]"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", item.active ? "text-white" : "text-slate-400 group-hover:text-[#1a4fa0]")} />
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

                <div className="p-4 border-t border-slate-100 mx-2 mb-2">
                    <button
                        onClick={() => navigate('/setting')}
                        className="w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0] text-right justify-start"
                    >
                        <Settings className="w-5 h-5 text-slate-400 group-hover:text-[#1a4fa0]" />
                        <span className="text-sm font-bold">{t.settings}</span>
                    </button>
                </div>

                <div className="p-4 border-t border-slate-100 mx-2 pb-8 bg-slate-50/50 rounded-b-[40px]">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white font-black text-xs">
                            AD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-slate-900 truncate">{isRTL ? 'المدير النظام' : 'System Admin'}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase">{isRTL ? 'إدارة الأطباء' : 'Doctor Mgmt'}</p>
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
                            onClick={() => setShowAddDoctor(true)}
                            className="p-3 bg-[#1a4fa0] text-white hover:bg-blue-700 rounded-2xl transition-all border border-blue-100 flex items-center gap-2 group active:scale-95 shadow-lg shadow-blue-200"
                        >
                            <UsersRound className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-widest">{t.addDoctor}</span>
                        </button>
                        <button
                            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                            className="p-3 bg-slate-50 text-slate-500 hover:text-blue-600 rounded-2xl transition-all border border-slate-100 flex items-center gap-2 group active:scale-95"
                        >
                            <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span className="text-xs font-black uppercase tracking-widest">{lang === 'ar' ? 'English' : 'العربية'}</span>
                        </button>
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold border border-blue-200 shadow-sm">AD</div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar no-scrollbar">
                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4 leading-none">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black">
                                    {doctors.length}
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isRTL ? 'إجمالي الأطباء' : 'Total Doctors'}</p>
                                    <p className="text-lg font-black text-slate-900">{isRTL ? 'طبيباً' : 'Doctors'} {doctors.length}</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4 leading-none">
                                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black">
                                    {doctors.filter(d => d.status === 'active').length}
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isRTL ? 'في الخدمة' : 'On Duty'}</p>
                                    <p className="text-lg font-black text-slate-900">{doctors.filter(d => d.status === 'active').length}</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4 leading-none">
                                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-black">
                                    {doctors.filter(d => d.status === 'vacation').length}
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isRTL ? 'في إجازة' : 'On Vacation'}</p>
                                    <p className="text-lg font-black text-slate-900">{doctors.filter(d => d.status === 'vacation').length}</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4 leading-none">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black">
                                    {doctors.reduce((acc, d) => acc + d.patientsToday, 0)}
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isRTL ? 'مواعيد اليوم' : 'Total Patients'}</p>
                                    <p className="text-lg font-black text-slate-900">{doctors.reduce((acc, d) => acc + d.patientsToday, 0)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {doctors.map(doc => (
                                <div key={doc.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-[60px] -mr-8 -mt-8 group-hover:bg-blue-600/10 transition-colors" />
                                    <div className="flex items-center gap-4 mb-6 relative">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-600 font-black text-xl shadow-inner group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white transition-all duration-500">
                                            {doc.name[doc.name.indexOf('.') + 2]}
                                        </div>
                                        <div className="text-right">
                                            <h3 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">{doc.name}</h3>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.specialty}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3 relative">
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors">
                                            <span className="text-[10px] font-black text-slate-400 uppercase">{isRTL ? 'كود الموظف' : 'Staff ID'}</span>
                                            <span className="text-xs font-bold text-slate-700">{doc.code}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors">
                                            <span className="text-[10px] font-black text-slate-400 uppercase">{isRTL ? 'الحالة' : 'Status'}</span>
                                            <span className={cn(
                                                "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                                                doc.status === 'active' ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                                            )}>
                                                {doc.status === 'active' ? (isRTL ? 'في الخدمة' : 'Active') : (isRTL ? 'في إجازة' : 'On Leave')}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/doctors')}
                                        className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
                                    >
                                        {isRTL ? 'عرض الجدول والمواعيد' : 'View Schedule & Patients'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
            {/* Add Doctor Modal */}
            {showAddDoctor && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 bg-blue-600 text-white flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                    <UserPlus className="w-6 h-6" />
                                </div>
                                <div className="text-right">
                                    <h3 className="text-xl font-black">{t.addDoctor}</h3>
                                    <p className="text-xs text-blue-100 font-bold uppercase tracking-widest opacity-80">{isRTL ? 'إضافة كادر طبي جديد للنظام' : 'Add new medical staff to systems'}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowAddDoctor(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-10 grid grid-cols-2 gap-8 bg-slate-50/50">
                            <div className="space-y-6">
                                <div className="space-y-2 text-right">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">{t.doctorName}</label>
                                    <div className="relative group">
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                            <User size={18} />
                                        </div>
                                        <input type="text" className="w-full pr-12 pl-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2 text-right">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">{t.specialty}</label>
                                    <div className="relative group">
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                            <Briefcase size={18} />
                                        </div>
                                        <input type="text" className="w-full pr-12 pl-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2 text-right">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">{t.licenseNumber}</label>
                                    <div className="relative group">
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                            <Shield size={18} />
                                        </div>
                                        <input type="text" placeholder={t.licensePlaceholder} className="w-full pr-12 pl-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2 text-right">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">{isRTL ? 'رقم الموظف' : 'Employee ID'}</label>
                                    <div className="relative group">
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                            <Coins size={18} />
                                        </div>
                                        <input type="text" className="w-full pr-12 pl-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2 text-right">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">{t.phone}</label>
                                    <div className="relative group">
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                            <Phone size={18} />
                                        </div>
                                        <input type="text" placeholder={t.phonePlaceholder} className="w-full pr-12 pl-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2 text-right">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">{isRTL ? 'القسم والعيادة' : 'Dept & Clinic'}</label>
                                    <div className="relative group">
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                            <Layers size={18} />
                                        </div>
                                        <select className="w-full pr-12 pl-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all appearance-none cursor-pointer">
                                            <option>{isRTL ? 'قسم القلب' : 'Cardiology'}</option>
                                            <option>{isRTL ? 'قسم الأطفال' : 'Pediatrics'}</option>
                                            <option>{isRTL ? 'قسم الطوارئ' : 'Emergency'}</option>
                                            <option>{isRTL ? 'قسم العظام' : 'Orthopedics'}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 border-t border-slate-100 bg-white flex items-center justify-end gap-4">
                            <button onClick={() => setShowAddDoctor(false)} className="px-8 py-3.5 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">{t.cancel}</button>
                            <button onClick={() => setShowAddDoctor(false)} className="px-10 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95">{t.save}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
