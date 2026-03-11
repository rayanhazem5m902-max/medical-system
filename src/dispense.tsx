import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Circle, FileText, Pill, DollarSign, Clock,
  LogOut, Package, AlertCircle, Bell, LayoutDashboard, Users,
  Calendar, ClipboardList, UserCog, Microscope, UsersRound,
  Contact2, Briefcase, Warehouse, Layers, Wallet, Coins,
  Settings, Activity, Globe, Menu
} from 'lucide-react';
import { cn } from './utils/cn';

type Lang = 'ar' | 'en';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  quantity: string;
  price: number;
  status: string;
  selected: boolean;
}

interface Prescription {
  id: number;
  patientName: string;
  status: 'In Progress' | 'New';
  timeAgo: string;
  fileNumber: string;
}

const translations = {
  ar: {
    hospitalName: 'مستشفى الشفاء',
    pharmacistPortal: 'بوابة الصيدلي',
    dispenseTitle: 'صرف الوصفات الطبية',
    patientInfo: 'معلومات المريض',
    patientName: 'اسم المريض',
    fileNumber: 'رقم الملف',
    ageGender: 'العمر / الجنس',
    treatingDoctor: 'الطبيب المعالج',
    prescribedMeds: 'الأدوية الموصوفة',
    medication: 'الدواء',
    dosage: 'الجرعة والتعليمات',
    quantity: 'الكمية',
    price: 'السعر',
    status: 'الحالة',
    available: 'متوفر',
    notAvailable: 'غير متوفر',
    financialSummary: 'الملخص المالي',
    totalBill: 'إجمالي الفاتورة المتوقع',
    vatIncluded: 'شامل ضريبة القيمة المضافة',
    issueInvoice: 'إصدار الفاتورة',
    dispensePrescription: 'صرف الوصفة',
    medsSelected: 'أدوية محددة للصرف',
    inProgress: 'قيد التجهيز',
    new: 'جديد',
    minsAgo: 'دقائق مضت',
    dashboard: 'لوحة القيادة',
    patients: 'سجلات المرضى',
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
    payrollManagement: 'إدارة الرواتب',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    notifications: 'التنبيهات',
    incomingPrescriptions: 'الوصفات الواردة',
    prescriptionsWaiting: 'وصفة في الانتظار',
    viewAllPrescriptions: 'عرض جميع الوصفات',
    pharmacistOnDuty: 'صيدلي مناوب',
    searchPlaceholder: 'بحث...',
    sar: 'ريال'
  },
  en: {
    hospitalName: 'Al-Shifa Hospital',
    pharmacistPortal: 'Pharmacist Portal',
    dispenseTitle: 'Dispense Prescriptions',
    patientInfo: 'Patient Information',
    patientName: 'Patient Name',
    fileNumber: 'File Number',
    ageGender: 'Age / Gender',
    treatingDoctor: 'Treating Doctor',
    prescribedMeds: 'Prescribed Medications',
    medication: 'Medication',
    dosage: 'Dosage & Instructions',
    quantity: 'Quantity',
    price: 'Price',
    status: 'Status',
    available: 'Available',
    notAvailable: 'Not Available',
    financialSummary: 'Financial Summary',
    totalBill: 'Expected Total Bill',
    vatIncluded: 'VAT Inclusive',
    issueInvoice: 'Issue Invoice',
    dispensePrescription: 'Dispense Prescription',
    medsSelected: 'medications selected',
    inProgress: 'In Progress',
    new: 'New',
    minsAgo: 'mins ago',
    dashboard: 'Dashboard',
    patients: 'Patient Records',
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
    deptManagement: 'Dept Management',
    financialManagement: 'Financial Management',
    payrollManagement: 'Payroll Management',
    settings: 'Settings',
    logout: 'Logout',
    notifications: 'Notifications',
    incomingPrescriptions: 'Incoming Prescriptions',
    prescriptionsWaiting: 'prescriptions waiting',
    viewAllPrescriptions: 'View All Prescriptions',
    pharmacistOnDuty: 'Pharmacist on Duty',
    searchPlaceholder: 'Search...',
    sar: 'SAR'
  }
};

export default function Dispense() {
  const [lang, setLang] = useState<Lang>('ar');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: 'Pantoprazole 40 mg', dosage: 'One tablet daily 30 minutes before breakfast.', quantity: '30 Capsules', price: 45.00, status: 'Available', selected: true },
    { id: 2, name: 'Augmentin 1 g', dosage: 'One tablet every 12 hours for 7 days.', quantity: '14 Tablets', price: 120.50, status: 'Available', selected: true },
    { id: 3, name: 'Panadol Extra', dosage: 'As needed every 6 hours (Max 8 tablets).', quantity: '24 Tablets', price: 15.25, status: 'Available', selected: false },
  ]);

  const [prescriptions] = useState<Prescription[]>([
    { id: 1, patientName: 'Ahmed Mohammed Abdullah', status: 'In Progress', timeAgo: '10', fileNumber: '#445821' },
    { id: 2, patientName: 'Sarah Ali Salem', status: 'New', timeAgo: '32', fileNumber: '#445822' },
    { id: 3, patientName: 'Mahmoud Hassan Omar', status: 'New', timeAgo: '45', fileNumber: '#445823' },
  ]);

  const t = translations[lang];
  const isRTL = lang === 'ar';
  const navigate = useNavigate();

  const toggleMedication = (id: number) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === id ? { ...med, selected: !med.selected } : med
      )
    );
  };

  const selectedCount = medications.filter(m => m.selected).length;
  const totalPrice = medications.reduce((sum, med) => med.selected ? sum + med.price : sum, 0);

  const mainMenuItems = [
    { id: 'dash', label: t.dashboard, icon: LayoutDashboard },
    { id: 'patients', label: t.patients, icon: Users },
    { id: 'appts', label: t.appointments, icon: Calendar },
    { id: 'reception', label: t.reception, icon: ClipboardList },
    { id: 'doctors', label: t.doctors, icon: UserCog },
    { id: 'pharmacy', label: t.pharmacy, icon: Pill, active: true },
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

  return (
    <div className={cn("min-h-screen bg-slate-50 flex font-['Cairo']", isRTL ? "rtl" : "ltr")} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 z-[70] w-72 bg-white flex flex-col shadow-2xl transition-all duration-300 transform lg:relative lg:translate-x-0 border-l border-slate-100",
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
                if (item.id === 'patients') navigate('/patients');
                if (item.id === 'dash') navigate('/dashboard');
                if (item.id === 'reception') navigate('/reception');
                if (item.id === 'pharmacy') navigate('/dispense');
                if (item.id === 'laboratory') navigate('/laboratory');
                if (item.id === 'appts') navigate('/appointment');
                if (item.id === 'doctors') navigate('/doctors');
              }}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group",
                item.active ? "bg-[#1a4fa0] text-white shadow-xl shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0]"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", item.active ? "text-white" : "text-slate-400 group-hover:text-[#1a4fa0]")} />
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-4 pb-2 px-6">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.management}</h4>
          </div>

          {managementItems.map(item => (
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
                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group",
                "text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0]"
              )}
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110 text-slate-400 group-hover:text-[#1a4fa0]" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 mx-2 mb-2">
          <button
            onClick={() => navigate('/setting')}
            className="w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0]"
          >
            <Settings className="w-5 h-5 text-slate-400 group-hover:text-[#1a4fa0]" />
            <span className="text-sm font-bold">{t.settings}</span>
          </button>
        </div>

        <div className="p-4 border-t border-slate-100 mx-2 pb-8 bg-slate-50/50 rounded-b-[40px]">
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a4fa0] to-blue-800 flex items-center justify-center text-white font-black text-xs">
              PH
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 truncate">{isRTL ? 'فهد العتيبي' : 'Fahd Otaibi'}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase">{t.pharmacistOnDuty}</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-[#1a4fa0] p-2 rounded-xl shadow-lg shadow-blue-500/20">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-black text-slate-900">{t.pharmacistPortal}</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-3 bg-slate-50 text-slate-500 hover:text-[#1a4fa0] rounded-2xl border border-slate-100 transition-all active:scale-95 group"
              >
                <Bell className="w-5 h-5 group-hover:shake" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>

              {/* Notifications Popover */}
              {showNotifications && (
                <div className={cn("absolute top-full mt-4 w-80 bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300", isRTL ? "left-0" : "right-0")}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-black text-slate-900">{t.incomingPrescriptions}</h4>
                    <span className="text-[10px] font-bold text-[#1a4fa0] bg-blue-50 px-2.5 py-1 rounded-lg">12 {t.prescriptionsWaiting}</span>
                  </div>
                  <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                    {prescriptions.map((p) => (
                      <div key={p.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#1a4fa0] transition-colors cursor-pointer group">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-black text-slate-900 group-hover:text-[#1a4fa0] transition-colors">{p.patientName}</p>
                          <span className="text-[9px] font-bold text-slate-400" dir="ltr">{p.fileNumber}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                            <Clock className="w-3 h-3 text-[#1a4fa0]" />
                            {p.timeAgo} {t.minsAgo}
                          </div>
                          <span className={cn(
                            "text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md",
                            p.status === 'New' ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                          )}>{p.status === 'New' ? t.new : t.inProgress}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                    <button className="text-[10px] font-black text-[#1a4fa0] uppercase tracking-widest hover:underline">{t.viewAllPrescriptions}</button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="p-3 bg-slate-50 text-slate-500 hover:text-[#1a4fa0] rounded-2xl border border-slate-100 transition-all flex items-center gap-2 active:scale-95 group"
            >
              <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            <div className="w-10 h-10 bg-[#1a4fa0] rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 border border-white/20">PH</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar">
          {/* Page Title & Context */}
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.dispenseTitle}</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Prescription #445821 — From Dr. Ahmed Otaibi</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* Left Side: Prescription Details */}
            <div className="xl:col-span-8 space-y-8">
              {/* Patient Info Card */}
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden animate-in zoom-in duration-500">
                <div className="p-8 bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[22px] bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl font-black">A</div>
                    <div>
                      <h3 className="text-xl font-black tracking-tight">Ahmed Mohammed Abdullah</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-[10px] font-bold px-2 py-1 bg-white/10 rounded-lg">#445821</span>
                        <span className="text-[10px] font-bold px-2 py-1 bg-[#1a4fa0] rounded-lg">34 Years / Male</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.treatingDoctor}</p>
                    <p className="text-sm font-bold text-blue-400">Dr. Youssef Al-Ahmad</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase">Consultant Internal Med</p>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#1a4fa0]">
                        <Pill className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">{t.prescribedMeds}</h4>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{medications.length} items</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <th className="px-4 py-4 text-center w-12">#</th>
                          <th className="px-4 py-4 text-right">{t.medication}</th>
                          <th className="px-4 py-4 text-right">{t.dosage}</th>
                          <th className="px-4 py-4 text-right">{t.quantity}</th>
                          <th className="px-4 py-4 text-right">{t.price}</th>
                          <th className="px-4 py-4 text-center">{t.status}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {medications.map((med) => (
                          <tr
                            key={med.id}
                            className={cn(
                              "group hover:bg-slate-50 transition-all cursor-pointer",
                              med.selected ? "bg-blue-50/40" : ""
                            )}
                            onClick={() => toggleMedication(med.id)}
                          >
                            <td className="px-4 py-6 text-center">
                              <div className="flex items-center justify-center">
                                {med.selected ? (
                                  <CheckCircle2 className="w-6 h-6 text-[#1a4fa0]" />
                                ) : (
                                  <Circle className="w-6 h-6 text-slate-200 group-hover:text-blue-300" />
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-6">
                              <p className="text-sm font-black text-slate-900 underline-offset-4 decoration-blue-600/30 group-hover:underline" dir="ltr">{med.name}</p>
                            </td>
                            <td className="px-4 py-6">
                              <p className="text-xs font-bold text-slate-500 max-w-xs">{med.dosage}</p>
                            </td>
                            <td className="px-4 py-6">
                              <p className="text-xs font-black text-slate-700" dir="ltr">{med.quantity}</p>
                            </td>
                            <td className="px-4 py-6">
                              <p className="text-sm font-black text-[#1a4fa0]">{med.price.toFixed(2)} {t.sar}</p>
                            </td>
                            <td className="px-4 py-6 text-center">
                              <span className={cn(
                                "text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md",
                                med.status === 'Available' ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                              )}>{med.status === 'Available' ? t.available : t.notAvailable}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <p className="text-xs font-bold text-amber-900">
                      {isRTL
                        ? `لديك ${selectedCount} من أصل ${medications.length} أدوية جاهزة للصرف.`
                        : `You have ${selectedCount} of ${medications.length} items ready to dispense.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Financial Summary */}
            <div className="xl:col-span-4 space-y-8">
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 p-10 animate-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1a4fa0]">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">{t.financialSummary}</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-bold uppercase tracking-widest">{isRTL ? 'المجموع الفرعي' : 'Subtotal'}</span>
                    <span className="text-sm font-black text-slate-900">{(totalPrice / 1.15).toFixed(2)} {t.sar}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-bold uppercase tracking-widest">{isRTL ? 'الضريبة (15%)' : 'Tax (15%)'}</span>
                    <span className="text-sm font-black text-slate-900">{(totalPrice * 0.15 / 1.15).toFixed(2)} {t.sar}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black text-[#1a4fa0] uppercase tracking-widest mb-1">{t.totalBill}</p>
                        <p className="text-3xl font-black text-slate-900">{totalPrice.toFixed(2)} <span className="text-sm">{t.sar}</span></p>
                      </div>
                      <div className="w-px h-12 bg-slate-100" />
                      <div className="text-left font-black text-[8px] text-slate-400 uppercase leading-tight">
                        {t.vatIncluded}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 space-y-4">
                  <button className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]">
                    <FileText className="w-4 h-4 text-white transition-transform group-hover:rotate-12" />
                    {t.issueInvoice}
                  </button>
                  <button className="w-full py-5 bg-[#1a4fa0] text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3 group active:scale-[0.98]">
                    <Package className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
                    {t.dispensePrescription} ({selectedCount})
                  </button>
                </div>
              </div>

              {/* Additional Actions */}
              <div className="bg-gradient-to-br from-[#1a4fa0] to-blue-900 rounded-[40px] p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10">
                  <h4 className="text-xs font-black uppercase tracking-widest opacity-80 mb-4">{isRTL ? 'سجل الأدوية السابقة' : 'Past Medication Records'}</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-black">1</div>
                      <div>
                        <p className="text-[11px] font-bold">Vitamin D3 1000 IU</p>
                        <p className="text-[9px] opacity-60 uppercase">Dispensed 3 months ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-blue-300 hover:text-white transition-colors cursor-pointer group">
                      <span className="text-[10px] font-black uppercase tracking-widest group-hover:mr-2 transition-all">{isRTL ? 'عرض الملف الطبي الكامل' : 'View Full Medical Record'}</span>
                      <Activity className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
