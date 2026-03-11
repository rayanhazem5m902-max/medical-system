import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from './utils/cn';
import {
    FileText, User, Globe, LayoutDashboard, Menu, Microscope, Calendar,
    ClipboardList, Pill, UsersRound, Contact2, Briefcase, Warehouse,
    Layers, Wallet, Coins, Settings, Users, Search,
    MoreVertical, LogOut, Activity, X, HeartPulse, Stethoscope, AlertCircle
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
        pharmacy: 'الصيدلية',
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
        language: 'English',
        userName: 'د. سارة خليل',
        userStatus: 'متاح حالياً',
        medicalRecord: 'السجل الطبي المتكامل',
        basicInfo: 'المعلومات الأساسية',
        clinicalInfo: 'المعلومات السريرية',
        diagnosis: 'التشخيص',
        prescriptions: 'الوصفات الطبية',
        chronicDiseases: 'الأمراض المزمنة',
        bloodGroup: 'فصيلة الدم',
        height: 'الطول',
        weight: 'الوزن',
        bmi: 'مؤشر كتلة الجسم',
        pulse: 'النبض',
        bp: 'ضغط الدم',
        medications: 'الأدوية الحالية',
        clinicalExamination: 'الفحص السريري والتاريخ',
        laboratoryTests: 'فحوصات المختبر والمعامل',
        treatmentPlan: 'الخطة العلاجية المقررة',
        followUp: 'متابعة الحالة والزيارات',
        labResults: 'نتائج المختبر',
        planDetails: 'تفاصيل الخطة',
        nextVisit: 'الزيارة القادمة',
        close: 'إغلاق نافذة السجل'
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
        pharmacy: 'Pharmacy',
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
        language: 'العربية',
        userName: 'Dr. Sara Khalil',
        userStatus: 'Active Now',
        medicalRecord: 'Integrated Medical Record',
        basicInfo: 'Basic Information',
        clinicalInfo: 'Clinical Info',
        diagnosis: 'Diagnosis',
        prescriptions: 'Prescriptions',
        chronicDiseases: 'Chronic Diseases',
        bloodGroup: 'Blood Group',
        height: 'Height',
        weight: 'Weight',
        bmi: 'BMI',
        pulse: 'Pulse',
        bp: 'Blood Pressure',
        medications: 'Current Medications',
        clinicalExamination: 'Clinical Exam & History',
        laboratoryTests: 'Laboratory Tests',
        treatmentPlan: 'Treatment Plan',
        followUp: 'Follow-up & Visits',
        labResults: 'Lab Results',
        planDetails: 'Plan Details',
        nextVisit: 'Next Appointment',
        close: 'Close Record'
    }
};

const patientsData = [
    { 
        id: 1, 
        mrn: 'MRN-2024-001', 
        name: 'سالم علي الشهري', 
        nameEn: 'Salem Ali Al-Shehri', 
        age: 34, 
        gender: 'male', 
        lastVisit: '2024-03-01', 
        status: 'underTreatment', 
        blood: 'A+', 
        chronic: ['Diabetes Type 2', 'Hypertension'], 
        meds: ['Metformin 500mg', 'Lisinopril 10mg'],
        clinical: { height: '175 cm', weight: '82 kg', bmi: '26.8', pulse: '78 bpm', bp: '120/80' },
        diagnoses: ['Type 2 Diabetes Mellitus', 'Essential Hypertension'],
        labResults: ['HbA1c: 7.2%', 'Fasting Glucose: 145 mg/dL', 'Creatinine: 0.9 mg/dL'],
        treatmentPlan: ['Start Metformin 500mg BID', 'Low sodium diet', 'Daily walking 30 mins'],
        followUp: 'Next review in 3 months for HbA1c check.',
        prescriptions: [
            { name: 'Metformin', dose: '500mg', frequency: 'Twice daily' },
            { name: 'Lisinopril', dose: '10mg', frequency: 'Once daily' }
        ]
    },
    { 
        id: 2, 
        mrn: 'MRN-2024-002', 
        name: 'سارة محمد العتيبي', 
        nameEn: 'Sara Mohammed Al-Otaibi', 
        age: 28, 
        gender: 'female', 
        lastVisit: '2024-03-05', 
        status: 'completed', 
        blood: 'O-', 
        chronic: ['None'], 
        meds: ['None'],
        clinical: { height: '162 cm', weight: '58 kg', bmi: '22.1', pulse: '72 bpm', bp: '110/70' },
        diagnoses: ['Seasonal Allergy'],
        labResults: ['IgE Total: Elevated', 'CBC: Normal'],
        treatmentPlan: ['Antihistamines as needed', 'Avoid known triggers'],
        followUp: 'PRN (As needed) based on symptoms.',
        prescriptions: []
    },
    { 
        id: 3, 
        mrn: 'MRN-2024-003', 
        name: 'فهد عبدالله الدوسري', 
        nameEn: 'Fahad Abdullah Al-Dossari', 
        age: 45, 
        gender: 'male', 
        lastVisit: '2024-02-28', 
        status: 'waiting', 
        blood: 'B+', 
        chronic: ['Hypertension'], 
        meds: ['Lisinopril 10mg'],
        clinical: { height: '180 cm', weight: '95 kg', bmi: '29.3', pulse: '82 bpm', bp: '145/90' },
        diagnoses: ['Hypertension Stage 2'],
        labResults: ['Lipid Profile: LDL 160 mg/dL', 'EKG: Normal'],
        treatmentPlan: ['DASH diet protocol', 'Increase Lisinopril to 20mg'],
        followUp: 'Re-check BP in 2 weeks.',
        prescriptions: [{ name: 'Lisinopril', dose: '10mg', frequency: 'Once daily' }]
    },
    { 
        id: 4, 
        mrn: 'MRN-2024-004', 
        name: 'نورة سعد القحطاني', 
        nameEn: 'Noura Saad Al-Qahtani', 
        age: 31, 
        gender: 'female', 
        lastVisit: '2024-03-04', 
        status: 'underTreatment', 
        blood: 'AB+', 
        chronic: ['Asthma'], 
        meds: ['Albuterol Inhaler'],
        clinical: { height: '165 cm', weight: '64 kg', bmi: '23.5', pulse: '75 bpm', bp: '118/76' },
        diagnoses: ['Bronchial Asthma'],
        labResults: ['Spirometry: Reversible obstruction', 'CXR: Clear'],
        treatmentPlan: ['Inhaled Corticosteroids', 'Peak flow monitoring'],
        followUp: 'Monthly review until stabilized.',
        prescriptions: [{ name: 'Albuterol', dose: '2 puffs', frequency: 'As needed' }]
    },
];

export default function Patients() {
    const [lang, setLang] = useState<Lang>('ar');
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
    const [activeRecordTab, setActiveRecordTab] = useState('basic');
    const navigate = useNavigate();
    const isRTL = lang === 'ar';
    const t = translations[lang];

    const mainMenuItems = [
        { id: 'dash', label: t.dashboard, icon: LayoutDashboard, active: false },
        { id: 'patients', label: t.patientsList, icon: Users, active: true },
        { id: 'appts', label: t.appointments, icon: Calendar },
        { id: 'reception', label: t.reception, icon: ClipboardList },
        { id: 'doctors', label: t.doctors, icon: Stethoscope },
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

            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/20 z-30 lg:hidden backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 z-50 w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 transform lg:relative lg:translate-x-0 border-l border-slate-100",
                sidebarOpen ? "translate-x-0" : (isRTL ? "translate-x-full" : "-translate-x-full")
            )}>
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-[#1a4fa0] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-black tracking-tight text-slate-900">{isRTL ? 'مستشفى الشفاء' : 'Al-Shifa'}</h1>
                            <p className="text-[10px] text-[#1a4fa0] font-bold uppercase tracking-widest leading-none mt-1">Medical Center</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto no-scrollbar">
                    <p className="px-5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 mt-4 text-right">{isRTL ? 'القائمة الرئيسية' : 'Main Menu'}</p>
                    {mainMenuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === 'patients') navigate('/patients');
                                if (item.id === 'dash') navigate('/dashboard');
                                if (item.id === 'reception') navigate('/reception');
                                if (item.id === 'pharmacy') navigate('/pharmacy');
                                if (item.id === 'laboratory') navigate('/laboratory');
                                if (item.id === 'appts') navigate('/appointment');
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

                    {managementItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === 'serv-mgmt') navigate('/services');
                                if (item.id === 'doc-mgmt') navigate('/doctor-management');
                                if (item.id === 'emp-mgmt') navigate('/employee');
                                if (item.id === 'dept-mgmt') navigate('/department');
                                if (item.id === 'pharma-mgmt') navigate('/pharmacy-inventory');
                                if (item.id === 'fin-mgmt') navigate('/payroll');
                                if (item.id === 'payroll-mgmt') navigate('/salary-management');
                            }}
                            className={cn(
                                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group text-right justify-start",
                                "text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0]"
                            )}
                        >
                            <item.icon className="w-5 h-5 transition-transform group-hover:scale-110 text-slate-400 group-hover:text-[#1a4fa0]" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 mx-2 mb-2 bg-slate-50/50 rounded-b-[40px] pt-6 pb-8">
                    <button onClick={() => navigate('/setting')} className="w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-slate-500 hover:bg-white hover:text-[#1a4fa0] text-right justify-start hover:shadow-sm">
                        <Settings className="w-5 h-5 text-slate-400 shadow-sm" />
                        <span className="text-sm font-bold">{t.settings}</span>
                    </button>
                    <div className="flex items-center gap-3 mt-6 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a4fa0] to-blue-800 flex items-center justify-center text-white font-black text-xs">
                            AD
                        </div>
                        <div className="flex-1 min-w-0 text-right">
                            <p className="text-xs font-black text-slate-900 truncate">{t.userName}</p>
                            <p className="text-[9px] font-bold text-green-500 uppercase">{t.userStatus}</p>
                        </div>
                        <button onClick={() => navigate('/')} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-20 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500">
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="hidden sm:block text-right">
                            <h1 className="text-xl font-bold text-gray-900">{t.patientsList}</h1>
                            <p className="text-xs text-gray-500 font-medium">{t.allPatients}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative max-w-sm hidden md:block">
                            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors ${isRTL ? 'right-4' : 'left-4'}`} />
                            <input
                                type="text"
                                placeholder={t.searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-64 ${isRTL ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'} py-2.5 bg-gray-50 border-transparent focus:bg-white focus:border-[#1a4fa0]/30 focus:ring-4 focus:ring-[#1a4fa0]/5 rounded-xl outline-none transition-all text-xs font-bold`}
                            />
                        </div>
                        <button onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')} className="p-3 bg-slate-50 text-slate-500 hover:text-[#1a4fa0] rounded-2xl transition-all border border-slate-100 flex items-center gap-2 group active:scale-95">
                            <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span className="text-xs font-black uppercase tracking-widest">{lang === 'ar' ? 'English' : 'العربية'}</span>
                        </button>

                    </div>
                </header>

                <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-6 bg-slate-50/50 overflow-y-auto no-scrollbar">
                    <div className="bg-white rounded-[40px] shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-right" dir={isRTL ? 'rtl' : 'ltr'}>
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <th className="px-8 py-6">{t.mrn}</th>
                                        <th className="px-8 py-6">{t.patientName}</th>
                                        <th className="px-8 py-6">{t.age}</th>
                                        <th className="px-8 py-6">{t.gender}</th>
                                        <th className="px-8 py-6">{t.lastVisit}</th>
                                        <th className="px-8 py-6">{t.status}</th>
                                        <th className="px-8 py-6 text-center">{t.actions}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredPatients.map((patient) => (
                                        <tr key={patient.id} className="hover:bg-blue-50/40 transition-colors group">
                                            <td className="px-8 py-6 font-mono font-black text-[#1a4fa0] text-sm">{patient.mrn}</td>
                                            <td className="px-8 py-6">
                                                <button onClick={() => setSelectedPatient(patient)} className="flex items-center gap-4 hover:text-[#1a4fa0] transition-colors focus:outline-none">
                                                    <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-[#1a4fa0] group-hover:text-white group-hover:border-[#1a4fa0] transition-all shadow-sm">
                                                        <User className="w-6 h-6" />
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-black text-slate-800 text-sm">{lang === 'ar' ? patient.name : patient.nameEn}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold tracking-tighter uppercase mt-0.5">National ID: 109***{patient.id}2</p>
                                                    </div>
                                                </button>
                                            </td>
                                            <td className="px-8 py-6 font-black text-slate-600 text-sm">{patient.age}</td>
                                            <td className="px-8 py-6 font-black text-slate-600 text-sm">{patient.gender === 'male' ? t.male : t.female}</td>
                                            <td className="px-8 py-6 font-black text-slate-500 text-sm">{patient.lastVisit}</td>
                                            <td className="px-8 py-6">
                                                <span className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border",
                                                    patient.status === 'underTreatment' ? 'bg-orange-50 text-orange-600 border-orange-100 shadow-sm shadow-orange-100' :
                                                        patient.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-100' :
                                                            'bg-blue-50 text-blue-600 border-blue-100 shadow-sm shadow-blue-100')}>
                                                    {patient.status === 'underTreatment' ? t.underTreatment : patient.status === 'completed' ? t.completed : t.waiting}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button onClick={() => setSelectedPatient(patient)} className="w-10 h-10 flex items-center justify-center text-[#1a4fa0] hover:bg-[#1a4fa0] hover:text-white rounded-xl shadow-sm bg-white border border-slate-100 transition-all active:scale-95"><FileText className="w-5 h-5" /></button>
                                                    <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:bg-slate-50 rounded-xl transition-colors"><MoreVertical className="w-5 h-5" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {/* Medical Record Dialog */}
            {selectedPatient && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-300 text-right">
                        <div className="p-8 bg-gradient-to-r from-[#1a4fa0] to-blue-900 text-white flex items-center justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl opacity-50" />
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-16 h-16 bg-white/10 rounded-[24px] flex items-center justify-center shadow-inner backdrop-blur-sm border border-white/10">
                                    <HeartPulse className="w-8 h-8" />
                                </div>
                                <div className="text-right">
                                    <h3 className="text-2xl font-black tracking-tight">{t.medicalRecord}</h3>
                                    <p className="text-blue-200 font-bold mt-1 text-base">{lang === 'ar' ? selectedPatient.name : selectedPatient.nameEn}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedPatient(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all shadow-sm backdrop-blur-md relative z-10"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="flex border-b border-slate-100 px-8">
                            {[
                                { id: 'basic', label: t.basicInfo, icon: User },
                                { id: 'clinical', label: t.clinicalExamination, icon: Stethoscope },
                                { id: 'labs', label: t.laboratoryTests, icon: Microscope },
                                { id: 'plan', label: t.treatmentPlan, icon: ClipboardList },
                                { id: 'follow', label: t.followUp, icon: Activity }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveRecordTab(tab.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-4 text-[11px] font-black uppercase tracking-wider transition-all relative",
                                        activeRecordTab === tab.id ? "text-[#1a4fa0]" : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                    {activeRecordTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1a4fa0] rounded-t-full shadow-[0_-4px_10px_rgba(26,79,160,0.3)]" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="p-10 max-h-[60vh] overflow-y-auto no-scrollbar">
                            {activeRecordTab === 'basic' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="grid grid-cols-4 gap-4">
                                        <InfoStats label={t.mrn} value={selectedPatient.mrn.split('-').pop() || selectedPatient.mrn} color="blue" />
                                        <InfoStats label={t.age} value={selectedPatient.age.toString()} color="slate" />
                                        <InfoStats label={t.gender} value={selectedPatient.gender === 'male' ? t.male : t.female} color="slate" />
                                        <InfoStats label={t.bloodGroup} value={selectedPatient.blood} color="red" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <CardSection icon={AlertCircle} label={t.chronicDiseases} items={selectedPatient.chronic} color="orange" />
                                        <CardSection icon={Pill} label={t.medications} items={selectedPatient.meds} color="indigo" />
                                    </div>
                                </div>
                            )}

                            {activeRecordTab === 'clinical' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 text-right">
                                    <div className="grid grid-cols-5 gap-3">
                                        <InfoStats label={t.height} value={selectedPatient.clinical.height} color="slate" />
                                        <InfoStats label={t.weight} value={selectedPatient.clinical.weight} color="slate" />
                                        <InfoStats label={t.bmi} value={selectedPatient.clinical.bmi} color="blue" />
                                        <InfoStats label={t.pulse} value={selectedPatient.clinical.pulse} color="red" />
                                        <InfoStats label={t.bp} value={selectedPatient.clinical.bp} color="red" />
                                    </div>
                                    <CardSection icon={Activity} label={t.diagnosis} items={selectedPatient.diagnoses} color="indigo" />
                                </div>
                            )}

                            {activeRecordTab === 'labs' && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <CardSection icon={Microscope} label={t.labResults} items={selectedPatient.labResults || []} color="blue" />
                                </div>
                            )}

                            {activeRecordTab === 'plan' && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <CardSection icon={ClipboardList} label={t.planDetails} items={selectedPatient.treatmentPlan || []} color="indigo" />
                                </div>
                            )}

                            {activeRecordTab === 'follow' && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
                                    <div className="p-8 bg-blue-50 border border-blue-100 rounded-[32px] text-right">
                                        <h4 className="text-xs font-black text-blue-900 mb-4 flex items-center gap-2 justify-end">
                                            {t.nextVisit} <Calendar className="w-4 h-4" />
                                        </h4>
                                        <p className="text-blue-800 font-bold leading-relaxed">{selectedPatient.followUp}</p>
                                    </div>
                                </div>
                            )}

                            <div className="pt-10">
                                <button onClick={() => setSelectedPatient(null)} className="w-full py-4 bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]">
                                    {t.close}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function InfoStats({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="p-4 bg-slate-50/50 rounded-[28px] border border-slate-100 shadow-inner text-right">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">{label}</p>
            <p className={cn("text-lg font-black leading-none", color === 'red' ? 'text-rose-600' : color === 'blue' ? 'text-[#1a4fa0]' : 'text-slate-900')}>{value}</p>
        </div>
    );
}

function CardSection({ icon: Icon, label, items, color }: { icon: any, label: string, items: string[], color: string }) {
    return (
        <div className="space-y-4 text-right">
            <div className="flex items-center gap-3 text-slate-900 justify-end">
                <h4 className="text-[10px] font-black uppercase tracking-widest leading-none">{label}</h4>
                <div className={cn("p-2 rounded-xl shadow-sm", color === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-indigo-50 text-indigo-600')}>
                    <Icon className="w-4 h-4" />
                </div>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-[32px] min-h-[100px] flex flex-wrap gap-2 content-start justify-end">
                {items.map((item, i) => (
                    <span key={i} className={cn("px-4 py-2 rounded-xl text-[9px] font-black border shadow-sm transition-transform hover:scale-105 cursor-default uppercase tracking-wider",
                        color === 'orange' ? 'bg-white text-orange-700 border-orange-100 hover:border-orange-200' : 'bg-white text-indigo-700 border-indigo-100 hover:border-indigo-200')}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
