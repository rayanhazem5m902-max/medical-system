import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  X,
  Filter,
  CheckCircle2,
  MoreVertical,
  Clock,
  Printer,
  Pill,
  Microscope,
  UsersRound,
  Contact2,
  Warehouse,
  Layers,
  Wallet,
  Coins,
  ClipboardList,
  UserCog,
  Briefcase,
  Activity,
  Settings,
  LogOut,
  Menu,
  Search,
  Globe,
  MessageSquare,
  Bell
} from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// ─── Data ───────────────────────────────────────────────────────────────────

const DAYS = [
  { label: "Sun", date: "May 12", dayIndex: 0 },
  { label: "Mon", date: "May 13", dayIndex: 1 },
  { label: "Tue", date: "May 14", dayIndex: 2 },
  { label: "Wed", date: "May 15", dayIndex: 3 },
  { label: "Thu", date: "May 16", dayIndex: 4 },
  { label: "Fri", date: "May 17", dayIndex: 5 },
  { label: "Sat", date: "May 18", dayIndex: 6 },
];

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const formatHour = (h: number) => {
  const suffix = h < 12 ? "AM" : "PM";
  const display = h > 12 ? h - 12 : h;
  return `${String(display).padStart(2, "0")}:00 ${suffix} `;
};

const APPOINTMENTS = [
  {
    id: 1,
    patient: "Ahmed Hassan",
    type: "General Review",
    dayIndex: 1,
    startHour: 9,
    duration: 1,
    color: "bg-blue-500",
    status: "confirmed",
    doctor: "Dr. Mohamed Ali",
  },
  {
    id: 2,
    patient: "Sara Khaled",
    type: "Heart Follow-up",
    dayIndex: 1,
    startHour: 10,
    duration: 2,
    color: "bg-red-400",
    status: "in-progress",
    doctor: "Dr. Mohamed Ali",
  },
  {
    id: 3,
    patient: "Omar Youssef",
    type: "General Review",
    dayIndex: 1,
    startHour: 11,
    duration: 1,
    color: "bg-blue-500",
    status: "confirmed",
    doctor: "Dr. Mohamed Ali",
  },
  {
    id: 4,
    patient: "Nadia Farouk",
    type: "Orthopedic Check",
    dayIndex: 2,
    startHour: 9,
    duration: 1,
    color: "bg-green-500",
    status: "confirmed",
    doctor: "Dr. Layla Ahmed",
  },
  {
    id: 5,
    patient: "Karim Mansour",
    type: "Neurology Consult",
    dayIndex: 3,
    startHour: 10,
    duration: 2,
    color: "bg-purple-500",
    status: "confirmed",
    doctor: "Dr. Hana Ibrahim",
  },
  {
    id: 6,
    patient: "Mona Tarek",
    type: "General Review",
    dayIndex: 4,
    startHour: 8,
    duration: 1,
    color: "bg-blue-500",
    status: "confirmed",
    doctor: "Dr. Layla Ahmed",
  },
  {
    id: 7,
    patient: "Youssef Adel",
    type: "Heart Follow-up",
    dayIndex: 0,
    startHour: 13,
    duration: 1,
    color: "bg-red-400",
    status: "confirmed",
    doctor: "Dr. Hana Ibrahim",
  },
  {
    id: 8,
    patient: "Heba Samy",
    type: "Orthopedic Check",
    dayIndex: 5,
    startHour: 11,
    duration: 1,
    color: "bg-green-500",
    status: "confirmed",
    doctor: "Dr. Mohamed Ali",
  },
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
    payrollManagement: 'إدارة الرواتب',
    settings: 'الإعدادات',
    notifications: 'التنبيهات',
    cancelRequest: 'طلب إلغاء موعد',
    doctorPatients: 'مرضى الطبيب لليوم',
    sendSms: 'إرسال رسالة للمرضى',
    approve: 'موافقة',
    reject: 'رفض',
    searchPlaceholder: 'بحث...',
    today: 'اليوم',
    cancelled: 'ملغي',
    confirmed: 'مؤكد',
    inProgress: 'قيد التنفيذ',
    messageAll: 'إرسال رسالة لكل المرضى',
    notifyCancellation: 'إبلاغ بإلغاء المواعيد',
    cancellationSms: "نأسف لإبلاغكم بإلغاء موعدكم اليوم مع {doctor}. نرجو منكم مراجعة الاستقبال لإعادة الجدولة.",
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
    payrollManagement: 'Payroll Management',
    settings: 'Settings',
    notifications: 'Notifications',
    cancelRequest: 'Cancellation Request',
    doctorPatients: "Doctor's Patients Today",
    sendSms: 'Send SMS to Patients',
    approve: 'Approve',
    reject: 'Reject',
    searchPlaceholder: 'Search...',
    today: 'Today',
    cancelled: 'Cancelled',
    confirmed: 'Confirmed',
    inProgress: 'In Progress',
    messageAll: 'Message All Patients',
    notifyCancellation: 'Notify of Cancellation',
    cancellationSms: "We regret to inform you that your appointment with {doctor} today has been cancelled. Please contact reception to reschedule.",
  }
};

// ─── App ────────────────────────────────────────────────────────────────────

export default function AppointmentPage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cancellationStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [selectedDoctorModal, setSelectedDoctorModal] = useState<string | null>(null);
  const [smsSending, setSmsSending] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [toast, setToast] = useState<{ msg: string; color: string } | null>(null);
  const [filterSpecialty, setFilterSpecialty] = useState("All");
  const [filterDoctor, setFilterDoctor] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const isRTL = lang === 'ar';
  const t = translations[lang];

  const mainMenuItems = [
    { id: 'dash', label: t.dashboard, icon: LayoutDashboard },
    { id: 'patients', label: t.patients, icon: Users },
    { id: 'appts', label: t.appointments, icon: Calendar, active: true },
    { id: 'reception', label: t.reception, icon: ClipboardList },
    { id: 'doctors', label: t.doctors, icon: UserCog },
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
    { id: 'settings', label: t.settings, icon: Settings },
  ];

  const [dayOffRequests, setDayOffRequests] = useState([
    { id: 1, doctor: isRTL ? 'د. محمد علي' : 'Dr. Mohamed Ali', date: '2024-03-11', status: 'pending' },
    { id: 2, doctor: isRTL ? 'د. ليلى أحمد' : 'Dr. Layla Ahmed', date: '2024-03-12', status: 'pending' },
  ]);
  const [showDayOffPanel, setShowDayOffPanel] = useState(false);

  const [smsMessage, setSmsMessage] = useState(
    isRTL
      ? "عزيزي المريض، نأسف لإبلاغكم بإلغاء موعدكم يوم الاثنين 13 مايو مع د. محمد علي. يرجى الاتصال بنا لإعادة الجدولة."
      : "Dear patient, we regret to inform you that your appointment on Monday, May 13 with Dr. Mohamed Ali has been cancelled. Please call us to reschedule."
  );

  const CURRENT_TIME_MINUTES = 9 * 60 + 45; // 09:45 AM
  const HOUR_HEIGHT = 80; // px per hour
  const GRID_START = 8; // 8 AM

  const timeTopPx = ((CURRENT_TIME_MINUTES / 60) - GRID_START) * HOUR_HEIGHT;

  const showToast = (msg: string, color: string) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSendSms = () => {
    setSmsSending(true);
    setTimeout(() => {
      setSmsSending(false);
      setSmsSent(true);
      setTimeout(() => {
        setShowSmsModal(false);
        setSmsSent(false);
        showToast(isRTL ? "📱 تم إرسال الرسالة لجميع المرضى بنجاح" : "📱 SMS sent successfully to all patients.", "bg-blue-600");
      }, 1500);
    }, 2000);
  };

  const handleNotifyDoctorPatients = (doctor: string) => {
    const msg = t.cancellationSms.replace('{doctor}', doctor);
    setSmsMessage(msg);
    setShowDoctorModal(false);
    setShowSmsModal(true);
  };

  const isMonCancelled = cancellationStatus === "approved";

  const filteredAppointments = APPOINTMENTS.filter((a) => {
    if (filterDoctor !== "All" && a.doctor !== filterDoctor) return false;
    if (filterSpecialty !== "All") {
      if (filterSpecialty === "Cardiology" && !a.type.includes("Heart")) return false;
      if (filterSpecialty === "Orthopedics" && !a.type.includes("Orthopedic")) return false;
      if (filterSpecialty === "Neurology" && !a.type.includes("Neurology")) return false;
      if (filterSpecialty === "General" && !a.type.includes("General")) return false;
    }
    if (filterStatus !== "All" && a.status !== filterStatus) return false;
    if (searchQuery && !a.patient.toLowerCase().includes(searchQuery.toLowerCase()) && !a.doctor.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className={cn("flex h-screen bg-slate-50 font-sans overflow-hidden", isRTL ? "flex-row" : "flex-row-reverse")} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Toast ── */}
      {toast && (
        <div className={cn("fixed top-5 z-[100] text-white px-6 py-3 rounded-2xl shadow-2xl text-sm font-black animate-in fade-in slide-in-from-top-4 duration-300", toast.color, isRTL ? 'left-5' : 'right-5')}>
          {toast.msg}
        </div>
      )}

      {/* ── Sidebar ── */}
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
          {/* Main Menu */}
          <p className="px-5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 mt-4">{isRTL ? 'القائمة الرئيسية' : 'Main Menu'}</p>
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'reception') navigate('/reception');
                if (item.id === 'dash') navigate('/dashboard');
                if (item.id === 'patients') navigate('/patients');
                if (item.id === 'pharmacy') navigate('/pharmacy');
                if (item.id === 'laboratory') navigate('/laboratory');
                if (item.id === 'doctors') navigate('/doctors');
                if (item.id === 'appts') navigate('/appointment');
              }}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group relative",
                item.id === 'appts' ? "bg-[#1a4fa0] text-white shadow-xl shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0]"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", item.id === 'appts' ? "text-white" : "text-slate-400 group-hover:text-[#1a4fa0]")} />
              <span className="font-bold text-sm">{item.label}</span>
              {item.id === 'appts' && <span className="absolute right-4 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />}
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
                if (item.id === 'pharma-mgmt') navigate('/pharmacy-inventory');
                if (item.id === 'fin-mgmt') navigate('/payroll');
                if (item.id === 'payroll-mgmt') navigate('/salary-management');
                if (item.id === 'settings') navigate('/setting');
              }}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group",
                "text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0]"
              )}
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110 text-slate-400 group-hover:text-[#1a4fa0]" />
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 mx-2 pb-8 bg-slate-50/50 rounded-b-[40px]">
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white font-black text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 truncate">Dr. Ahmed Khaled</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Administrator</p>
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
            <div className="relative">
              <button
                onClick={() => setShowDayOffPanel(!showDayOffPanel)}
                className="p-3 bg-slate-50 text-slate-500 hover:text-blue-600 rounded-2xl border border-slate-100 transition-all active:scale-95 group relative"
              >
                <Bell className="w-5 h-5 group-hover:shake" />
                {dayOffRequests.length > 0 && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />}
              </button>

              {showDayOffPanel && (
                <div className={cn("absolute top-full mt-4 w-80 bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300", isRTL ? "right-0" : "left-0")}>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-50">
                    <h4 className="text-sm font-black text-slate-900">{isRTL ? 'طلبات الإجازة' : 'Day Off Requests'}</h4>
                    <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{dayOffRequests.length}</span>
                  </div>
                  <div className="space-y-4 max-h-64 overflow-y-auto no-scrollbar">
                    {dayOffRequests.map(req => (
                      <div key={req.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 group transition-all hover:bg-white hover:shadow-md">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0"><UserCog className="w-4 h-4" /></div>
                          <div>
                            <p className="text-xs font-black text-slate-800">{req.doctor}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase">{req.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setDayOffRequests(prev => prev.filter(r => r.id !== req.id));
                              showToast(isRTL ? "تمت الموافقة على الطلب" : "Request Approved", "bg-emerald-600");
                            }}
                            className="flex-1 py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black hover:bg-emerald-600 transition-colors"
                          >
                            {t.approve}
                          </button>
                          <button
                            onClick={() => {
                              setDayOffRequests(prev => prev.filter(r => r.id !== req.id));
                              showToast(isRTL ? "تم رفض الطلب" : "Request Rejected", "bg-red-600");
                            }}
                            className="flex-1 py-2 bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black hover:bg-slate-300 transition-colors"
                          >
                            {t.reject}
                          </button>
                        </div>
                      </div>
                    ))}
                    {dayOffRequests.length === 0 && (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3"><Bell className="w-6 h-6 text-slate-300" /></div>
                        <p className="text-xs font-bold text-slate-400">{isRTL ? 'لا توجد طلبات معلقة' : 'No pending requests'}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">Dr. Ahmed Khaled</p>
                <p className="text-[9px] font-bold text-blue-600">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-200">
                AK
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden flex">
          {/* Calendar Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Day Headers */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
              <div className="flex">
                <div className="w-20 border-r border-slate-100" />
                {DAYS.map((day) => {
                  const isCancelled = isMonCancelled && day.dayIndex === 1;
                  return (
                    <div key={day.label} className={cn(
                      "flex-1 py-4 text-center border-r border-slate-100 transition-colors",
                      isCancelled ? "bg-red-50/50" : "bg-white"
                    )}>
                      <p className={cn("text-[10px] font-black uppercase tracking-widest", isCancelled ? "text-red-400" : "text-slate-400")}>
                        {isRTL ? (day.dayIndex === 0 ? 'الأحد' : day.dayIndex === 1 ? 'الاثنين' : day.dayIndex === 2 ? 'الثلاثاء' : day.dayIndex === 3 ? 'الأربعاء' : day.dayIndex === 4 ? 'الخميس' : day.dayIndex === 5 ? 'الجمعة' : 'السبت') : day.label}
                      </p>
                      <p className={cn("text-xl font-black mt-1", isCancelled ? "text-red-600 line-through" : "text-slate-900")}>{day.date.split(" ")[1]}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative">
              {HOURS.map((hour) => (
                <div key={hour} className="flex border-b border-slate-100" style={{ height: HOUR_HEIGHT }}>
                  <div className="w-20 flex-shrink-0 flex items-start justify-center pt-2 border-r border-slate-100 bg-slate-50/50">
                    <span className="text-[10px] font-black text-slate-400">{formatHour(hour)}</span>
                  </div>
                  {DAYS.map((day) => (
                    <div
                      key={day.label}
                      className={cn(
                        "flex-1 border-r border-slate-100 relative group",
                        isMonCancelled && day.dayIndex === 1 ? "bg-red-50/20" : "hover:bg-blue-50/30 transition-colors"
                      )}
                    />
                  ))}
                </div>
              ))}

              {/* Current Time Indicator */}
              <div className="absolute left-0 right-0 z-10 pointer-events-none" style={{ top: timeTopPx }}>
                <div className="flex items-center">
                  <div className="w-20 flex justify-center -translate-y-1/2">
                    <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg">09:45</span>
                  </div>
                  <div className="flex-1 border-t-2 border-red-500 relative">
                    <div className="absolute left-0 -top-[5px] w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg border-2 border-white" />
                  </div>
                </div>
              </div>

              {/* Appointments */}
              {filteredAppointments.map((appt) => {
                if (isMonCancelled && appt.dayIndex === 1) return null;
                const top = (appt.startHour - GRID_START) * HOUR_HEIGHT + 2;
                const height = appt.duration * HOUR_HEIGHT - 6;
                return (
                  <div
                    key={appt.id}
                    onClick={() => {
                      setSelectedDoctorModal(appt.doctor);
                      setShowDoctorModal(true);
                    }}
                    className={cn(
                      "absolute z-10 mx-2 p-3 rounded-2xl shadow-lg cursor-pointer hover:scale-[1.02] transition-all group overflow-hidden border border-white/20",
                      appt.color
                    )}
                    style={{
                      top,
                      height,
                      left: `calc(80px + ${appt.dayIndex * (100 / 7)}%)`,
                      width: `calc(${(100 / 7)}% - 16px)`
                    }}
                  >
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-[11px] font-black text-white leading-tight">{appt.patient}</p>
                        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="w-3 h-3 text-white" /></div>
                      </div>
                      <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest truncate">{appt.type}</p>
                      <div className="mt-auto pt-2 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-white/60" /><span className="text-[9px] font-black text-white/90">{appt.startHour}:00</span></div>
                        <span className="px-2 py-0.5 bg-white/20 rounded text-[8px] font-black text-white uppercase tracking-tighter">
                          {appt.status === 'confirmed' ? t.confirmed : t.inProgress}
                        </span>
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Info Panel */}
          <aside className="w-80 bg-white border-l border-slate-200 flex flex-col overflow-y-auto no-scrollbar">
            <div className="p-6 space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-blue-50 rounded-3xl border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => {
                  setSelectedDoctorModal(null);
                  setSmsMessage(isRTL ? "تنبيه هام من مستشفى الشفاء: نرجو من مراجعينا الكرام..." : "Important alert from Al-Shifa Hospital: We kindly ask our patients...");
                  setShowSmsModal(true);
                }}>
                  <MessageSquare className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-xs font-black text-blue-900">{isRTL ? 'إرسال SMS' : 'Send SMS'}</p>
                  <p className="text-[9px] font-bold text-blue-500 mt-1 uppercase tracking-widest">{isRTL ? 'تنبيه سريع' : 'Quick Alert'}</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-3xl border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
                  <p className="text-xs font-black text-emerald-900">42</p>
                  <p className="text-[9px] font-bold text-emerald-500 mt-1 uppercase tracking-widest">{t.confirmed}</p>
                </div>
              </div>

              {/* Action List (Filters) */}
              <div className="space-y-6">
                {/* Specialty Filter */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'التخصص' : 'SPECIALTY'}</h3>
                  <div className="space-y-2">
                    {['All', 'Cardiology', 'Orthopedics', 'Neurology'].map(s => (
                      <button
                        key={s}
                        onClick={() => setFilterSpecialty(s)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-2xl border transition-all group",
                          filterSpecialty === s ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white border-slate-100 text-slate-600 hover:border-blue-200"
                        )}
                      >
                        <span className="text-xs font-black uppercase tracking-tight">{s}</span>
                        <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center transition-colors", filterSpecialty === s ? "bg-white/20" : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600")}>
                          <Filter className="w-3 h-3" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'الحالة' : 'STATUS'}</h3>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'confirmed', 'in-progress'].map(s => (
                      <button
                        key={s}
                        onClick={() => setFilterStatus(s)}
                        className={cn(
                          "px-4 py-2 rounded-xl border text-[10px] font-black uppercase transition-all",
                          filterStatus === s ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-200" : "bg-white border-slate-100 text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        {s === 'confirmed' ? t.confirmed : s === 'in-progress' ? t.inProgress : 'ALL'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Doctor Filter */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'تصفية حسب الطبيب' : 'BY DOCTOR'}</h3>
                  <div className="space-y-1.5">
                    {['All', 'Dr. Mohamed Ali', 'Dr. Layla Ahmed', 'Dr. Hana Ibrahim'].map(d => (
                      <button
                        key={d}
                        onClick={() => setFilterDoctor(d)}
                        className={cn(
                          "w-full text-left px-4 py-2 rounded-xl text-[10px] font-black transition-all border",
                          filterDoctor === d ? "bg-slate-800 border-slate-800 text-white" : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"
                        )}
                      >
                        {d === 'All' ? 'ALL DOCTORS' : d.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Today's Working Doctors List */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'أطباء اليوم' : "Today's Doctors"}</h3>
                <div className="space-y-3">
                  {['Dr. Mohamed Ali', 'Dr. Layla Ahmed', 'Dr. Hana Ibrahim'].map(doc => (
                    <button
                      key={doc}
                      onClick={() => {
                        setSelectedDoctorModal(doc);
                        setShowDoctorModal(true);
                      }}
                      className="w-full flex items-center gap-3 p-3 bg-slate-50 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-200 rounded-2xl transition-all text-right group"
                    >
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 border border-slate-200 group-hover:scale-110 transition-transform shadow-sm"><UserCog className="w-5 h-5" /></div>
                      <div className="flex-1 text-left">
                        <p className="text-[11px] font-black text-slate-900 whitespace-nowrap">{doc}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Available</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div >

      {/* ── Modals ── */}

      {
        showSmsModal && (
          <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 bg-blue-600 text-white relative">
                <button onClick={() => setShowSmsModal(false)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-xl transition-colors"><X className="w-5 h-5" /></button>
                <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-md"><MessageSquare className="w-8 h-8 text-white" /></div>
                <h2 className="text-2xl font-black">{t.sendSms}</h2>
                <p className="text-blue-100 text-sm mt-2 font-medium">Inform patients about schedule changes instantly.</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'المستلمون' : 'Recipients'}</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoctorModal ? (
                      <span className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl text-[10px] font-black text-blue-700">
                        {isRTL ? `مرضى ${selectedDoctorModal}` : `${selectedDoctorModal}'s Patients`}
                      </span>
                    ) : (
                      ["All", "Monday Patients", "Today's Clinic"].map(r => (
                        <span key={r} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-600">{r}</span>
                      ))
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRTL ? 'الرسالة' : 'Message'}</label>
                  <textarea
                    rows={4}
                    value={smsMessage}
                    onChange={(e) => setSmsMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                  />
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{smsMessage.length} / 320</span>
                    {smsSent && <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">SENT SUCCESSFULLY ✓</span>}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    disabled={smsSending}
                    onClick={handleSendSms}
                    className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group"
                  >
                    {smsSending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                    <span>{smsSending ? 'SENDING...' : 'CONFIRM & SEND'}</span>
                  </button>
                  <button onClick={() => setShowSmsModal(false)} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl text-xs font-black hover:bg-slate-200">CANCEL</button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {
        showDoctorModal && (
          <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 shrink-0"><UserCog className="w-7 h-7" /></div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{selectedDoctorModal}</h3>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{t.doctorPatients} - {t.today}</p>
                  </div>
                </div>
                <button onClick={() => setShowDoctorModal(false)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all"><X className="w-6 h-6 text-slate-400" /></button>
              </div>
              <div className="p-8 max-h-[60vh] overflow-y-auto no-scrollbar">
                <div className="space-y-3">
                  {APPOINTMENTS.filter(a => a.doctor === selectedDoctorModal).map((a, i) => (
                    <div key={a.id} className="p-4 bg-slate-50 border border-slate-200 rounded-3xl flex items-center justify-between group hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-xs font-black text-slate-400 group-hover:text-blue-600 group-hover:border-blue-200 shadow-sm transition-colors">#{100 + i}</div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{a.patient}</p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 bg-slate-100/50 px-2 py-0.5 rounded-lg group-hover:bg-blue-50 transition-colors"><Clock className="w-3 h-3" /> {a.startHour}:00</span>
                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 bg-slate-100/50 px-2 py-0.5 rounded-lg group-hover:bg-blue-50 transition-colors"><Activity className="w-3 h-3 text-blue-500" /> {a.type}</span>
                          </div>
                        </div>
                      </div>
                      <button className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all opacity-0 group-hover:opacity-100"><Printer className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-2">
                  <button onClick={() => setShowDoctorModal(false)} className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black hover:bg-slate-50 transition-all uppercase">{isRTL ? 'إغلاق' : 'CLOSE'}</button>
                  <button className="px-6 py-3 bg-white border border-slate-200 text-blue-600 rounded-xl text-xs font-black hover:bg-slate-50 transition-all flex items-center gap-2 uppercase">
                    <Printer className="w-4 h-4" />
                    {isRTL ? 'طباعة القائمة' : 'PRINT LIST'}
                  </button>
                </div>
                <button 
                  onClick={() => selectedDoctorModal && handleNotifyDoctorPatients(selectedDoctorModal)}
                  className="px-8 py-3 bg-red-600 text-white rounded-xl text-xs font-black shadow-lg shadow-red-100 hover:bg-red-700 transition-all flex items-center gap-2 uppercase"
                >
                  <MessageSquare className="w-4 h-4" />
                  {t.notifyCancellation}
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}
