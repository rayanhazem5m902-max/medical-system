import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  FileText,
  HeartPulse,
  Pill,
  Clipboard,
  AlertCircle,
  Activity,
  Calendar,
  Droplets,
  Phone,
  Home,
  Globe,
  ArrowLeft
} from 'lucide-react';

type Lang = 'ar' | 'en';

const translations = {
  ar: {
    medicalRecord: 'السجل الطبي',
    summary: 'ملخص الرعاية الصحية الشامل للمريض',
    mrn: 'رقم السجل الطبي',
    patientInfo: 'بيانات المريض',
    clinicalStatus: 'الحالة السريرية',
    medicalHistory: 'التاريخ الطبي',
    treatmentPlan: 'خطة العلاج',
    adminInfo: 'المعلومات الإدارية والشخصية',
    fullName: 'الاسم الكامل',
    patientName: 'سالم علي الشهري',
    ageDob: 'العمر وتاريخ الميلاد',
    ageValue: '34 عاماً (05/05/1990)',
    bloodType: 'فصيلة الدم',
    attendingPhysician: 'الطبيب المعالج',
    doctorName: 'د. خالد العتيبي',
    doctorTitle: 'استشاري جراحة العظام',
    vitalSigns: 'العلامات الحيوية',
    bp: 'ضغط الدم',
    pulse: 'النبض',
    complaint: 'الشكوى الرئيسية',
    complaintText: 'ألم حاد في مفصل الورك الأيمن بعد السقوط قبل أسبوعين. يزداد الألم مع الحركة والمشي لفترات طويلة، مع وجود تورم خفيف وتيبس صباحي.',
    diagnoses: 'التشخيصات',
    primaryDiagnosis: 'التشخيص الأساسي',
    primaryDiagnosisText: 'كسر في عنق مفصل الفخذ',
    secondaryDiagnosis: 'التشخصيات الثانوية',
    secondaryDiagnosisText: 'خشونة المفاصل الثنائية الأولية',
    chronicConditions: 'الأمراض المزمنة',
    monitored: 'مراقب',
    stable: 'مستقر',
    inactive: 'غير نشط',
    diabetes: 'السكري - النوع الثاني',
    hypertension: 'ارتفاع ضغط الدم',
    asthma: 'الربو',
    surgicalHistory: 'السجل الجراحي',
    surgery1: 'تثبيت داخلي لعنق الفخذ',
    surgery1Sub: 'تحت التخدير العام - ناجحة',
    surgery2: 'استئصال الزائدة الدودية',
    surgery2Sub: 'مستشفى الملك فيصل',
    medications: 'الأدوية الموصوفة',
    med1: 'سولبادين فوار',
    med1Sub: 'حبتان كل 8 ساعات',
    med2: 'أوجمنتين (1 جرام)',
    med2Sub: 'مرتين يومياً لمدة أسبوع',
    med3: 'أدول (500 ملجم)',
    med3Sub: 'مسكن الألم عند الحاجة',
    instructions: 'التعليمات الطبية',
    instruction1: 'ينصح بالراحة التامة وتجنب تحميل الوزن على الساق اليمنى.',
    instruction2: 'بدء تمارين العلاج الطبيعي الخفيفة بعد 48 ساعة.',
    emergencyNav: 'مراجعة قسم الطوارئ في حال زيادة التورم.',
    quickSummary: 'ملخص سريع',
    status: 'الحالة',
    underTreatment: 'تحت العلاج',
    followUp: 'المتابعة',
    pt: 'العلاج الطبيعي',
    after48: 'بعد 48 ساعة',
    emergency: 'الطوارئ',
    emergencyText: 'في حال زيادة التورم أو الألم الشديد',
    emergencyService: 'خدمات الطوارئ',
    footer: '© 2024 المركز الطبي - نظام إدارة المرضى',
    lastUpdated: 'آخر تحديث: يناير 2024',
    back: 'رجوع'
  },
  en: {
    medicalRecord: 'Medical Record',
    summary: 'Comprehensive Patient Healthcare Summary',
    mrn: 'MRN',
    patientInfo: 'Patient Info',
    clinicalStatus: 'Clinical Status',
    medicalHistory: 'Medical History',
    treatmentPlan: 'Treatment Plan',
    adminInfo: 'Patient & Administrative Information',
    fullName: 'Full Name',
    patientName: 'Salem Ali Al-Shehri',
    ageDob: 'Age & DOB',
    ageValue: '34 Years (05/05/1990)',
    bloodType: 'Blood Type',
    attendingPhysician: 'Attending Physician',
    doctorName: 'Dr. Khalid Al-Otaibi',
    doctorTitle: 'Consultant Orthopedic Surgeon',
    vitalSigns: 'Vital Signs',
    bp: 'Blood Pressure',
    pulse: 'Pulse (bpm)',
    complaint: 'Chief Complaint',
    complaintText: 'Acute pain in the right hip joint following a fall two weeks ago. Pain increases with movement and walking for long periods, with mild swelling and morning stiffness.',
    diagnoses: 'Diagnoses',
    primaryDiagnosis: 'Primary Diagnosis',
    primaryDiagnosisText: 'Fracture of the neck of the femur',
    secondaryDiagnosis: 'Secondary Diagnosis',
    secondaryDiagnosisText: 'Other primary bilateral osteoarthritis',
    chronicConditions: 'Chronic Conditions',
    monitored: 'Monitored',
    stable: 'Stable',
    inactive: 'Inactive',
    diabetes: 'Type 2 Diabetes',
    hypertension: 'Hypertension',
    asthma: 'Asthma',
    surgicalHistory: 'Surgical History',
    surgery1: 'Internal fixation of the femoral neck',
    surgery1Sub: 'Under general anesthesia - Successful',
    surgery2: 'Appendectomy',
    surgery2Sub: 'King Faisal Hospital',
    medications: 'Prescribed Medications',
    med1: 'Solpadeine Effervescent',
    med1Sub: 'Two tablets every 8 hours',
    med2: 'Augmentin (1g)',
    med2Sub: 'Twice daily for one week',
    med3: 'Adol (500mg)',
    med3Sub: 'Pain reliever as needed',
    instructions: 'Medical Instructions',
    instruction1: 'Complete rest and avoidance of weight-bearing on the right leg are advised.',
    instruction2: 'Start light physical therapy exercises after 48 hours.',
    emergencyNav: 'Review with emergency services if swelling increases.',
    quickSummary: 'Quick Summary',
    status: 'Status',
    underTreatment: 'Under Treatment',
    followUp: 'Follow-Up',
    pt: 'Physical Therapy',
    after48: 'After 48 hours',
    emergency: 'Emergency',
    emergencyText: 'If swelling increases or severe pain',
    emergencyService: 'Emergency Services',
    footer: '© 2024 Medical Center - Patient Management System',
    lastUpdated: 'Last Updated: January 2024',
    back: 'Back'
  }
};

const Patient: React.FC = () => {
  const [lang, setLang] = useState<Lang>('ar');
  const [activeTab, setActiveTab] = useState<string>('patient');
  const navigate = useNavigate();
  const isRTL = lang === 'ar';
  const t = translations[lang];

  const tabs = [
    { id: 'patient', label: t.patientInfo, icon: User },
    { id: 'clinical', label: t.clinicalStatus, icon: Activity },
    { id: 'history', label: t.medicalHistory, icon: FileText },
    { id: 'treatment', label: t.treatmentPlan, icon: Pill },
  ];

  return (
    <div className={`min-h-screen bg-slate-50 font-['Cairo']`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-6 px-6 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-all"
              >
                <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{t.medicalRecord}</h1>
                <p className="text-blue-100 text-sm">{t.summary}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                <Globe className="w-5 h-5" />
                <span className="text-xs font-bold uppercase">{lang === 'ar' ? 'English' : 'العربية'}</span>
              </button>
              <div className="text-right bg-white/10 px-6 py-2 rounded-xl backdrop-blur-md border border-white/20">
                <p className="text-[10px] text-blue-100 font-bold uppercase tracking-wider">{t.mrn}</p>
                <p className="font-mono font-bold text-lg">MRN-2024-001</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex gap-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-500 hover:bg-slate-50'
                  }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Patient Information Card */}
            {activeTab === 'patient' && (
              <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-5">
                  <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <User className="w-6 h-6" />
                    {t.adminInfo}
                  </h2>
                </div>
                <div className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-inner border border-blue-50">
                      <User className="w-16 h-16 text-blue-600" />
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                        <p className="text-xs text-slate-500 font-bold uppercase mb-1">{t.fullName}</p>
                        <p className="text-lg font-bold text-slate-900">{t.patientName}</p>
                      </div>
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                        <p className="text-xs text-slate-500 font-bold uppercase mb-1">{t.ageDob}</p>
                        <p className="text-lg font-bold text-slate-900">{t.ageValue}</p>
                      </div>
                      <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100">
                        <p className="text-xs text-red-500 font-bold uppercase mb-1">{t.bloodType}</p>
                        <p className="text-2xl font-black text-red-600">O+</p>
                      </div>
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                        <p className="text-xs text-slate-500 font-bold uppercase mb-1">{t.attendingPhysician}</p>
                        <p className="text-lg font-bold text-slate-900">{t.doctorName}</p>
                        <p className="text-xs text-blue-600 font-bold mt-1">{t.doctorTitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Clinical Status Card */}
            {activeTab === 'clinical' && (
              <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-5">
                  <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <Activity className="w-6 h-6" />
                    {t.clinicalStatus}
                  </h2>
                </div>
                <div className="p-8 space-y-8">
                  {/* Vital Signs */}
                  <div>
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-3">
                      <HeartPulse className="w-6 h-6 text-emerald-600" />
                      {t.vitalSigns}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-slate-50 p-5 rounded-2xl text-center border border-slate-100 shadow-sm">
                        <p className="text-2xl font-black text-slate-900">120/80</p>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">{t.bp}</p>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-2xl text-center border border-slate-100 shadow-sm">
                        <p className="text-2xl font-black text-slate-900">78</p>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">{t.pulse}</p>
                      </div>
                    </div>
                  </div>

                  {/* Chief Complaint */}
                  <div className={`border-l-4 ${isRTL ? 'border-r-4 border-l-0' : 'border-l-4'} border-amber-500 bg-amber-50/50 p-6 rounded-2xl`}>
                    <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      {t.complaint}
                    </h3>
                    <p className="text-amber-800 leading-relaxed font-medium">
                      {t.complaintText}
                    </p>
                  </div>

                  {/* Diagnoses */}
                  <div>
                    <h3 className="font-bold text-slate-800 mb-5">{t.diagnoses}</h3>
                    <div className="space-y-4">
                      <div className="bg-red-50/50 border border-red-100 p-6 rounded-2xl flex items-start gap-5">
                        <div className="bg-red-500 text-white p-3 rounded-2xl shadow-lg shadow-red-500/20">
                          <AlertCircle className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className="text-[10px] font-black bg-red-600 text-white px-3 py-1 rounded-full">S72.0</span>
                            <span className="font-black text-red-900 uppercase text-xs tracking-wider">{t.primaryDiagnosis}</span>
                          </div>
                          <p className="text-red-800 font-bold text-lg">{t.primaryDiagnosisText}</p>
                        </div>
                      </div>
                      <div className="bg-orange-50/50 border border-orange-100 p-6 rounded-2xl flex items-start gap-5">
                        <div className="bg-orange-500 text-white p-3 rounded-2xl shadow-lg shadow-orange-500/20">
                          <AlertCircle className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className="text-[10px] font-black bg-orange-600 text-white px-3 py-1 rounded-full">M16.1</span>
                            <span className="font-black text-orange-900 uppercase text-xs tracking-wider">{t.secondaryDiagnosis}</span>
                          </div>
                          <p className="text-orange-800 font-bold text-lg">{t.secondaryDiagnosisText}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Medical History Card */}
            {activeTab === 'history' && (
              <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-gradient-to-r from-violet-600 to-violet-700 px-8 py-5">
                  <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <FileText className="w-6 h-6" />
                    {t.medicalHistory}
                  </h2>
                </div>
                <div className="p-8 space-y-8">
                  {/* Chronic Diseases */}
                  <div>
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-3">
                      <Activity className="w-6 h-6 text-violet-600" />
                      {t.chronicConditions}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-blue-900">{t.diabetes}</span>
                          <span className="text-[9px] font-black bg-green-500 text-white px-2 py-1 rounded-full uppercase tracking-tighter">{t.monitored}</span>
                        </div>
                        <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-3/4 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                        </div>
                      </div>
                      <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-emerald-900">{t.hypertension}</span>
                          <span className="text-[9px] font-black bg-emerald-500 text-white px-2 py-1 rounded-full uppercase tracking-tighter">{t.stable}</span>
                        </div>
                        <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[85%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                        </div>
                      </div>
                      <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-slate-600">{t.asthma}</span>
                          <span className="text-[9px] font-black bg-slate-400 text-white px-2 py-1 rounded-full uppercase tracking-tighter">{t.inactive}</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-400 w-1/5 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Surgical History */}
                  <div>
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-3">
                      <Clipboard className="w-6 h-6 text-violet-600" />
                      {t.surgicalHistory}
                    </h3>
                    <div className="space-y-4">
                      <div className={`border-l-4 ${isRTL ? 'border-r-4 border-l-0' : 'border-l-4'} border-violet-600 bg-violet-50/50 p-6 rounded-2xl`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <p className="font-bold text-violet-900 text-lg">{t.surgery1}</p>
                            <p className="text-sm text-violet-600 font-medium">{t.surgery1Sub}</p>
                          </div>
                          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-violet-100 self-start md:self-center">
                            <Calendar className="w-4 h-4 text-violet-600" />
                            <span className="text-sm font-bold text-slate-700">14 يناير 2024</span>
                          </div>
                        </div>
                      </div>
                      <div className={`border-l-4 ${isRTL ? 'border-r-4 border-l-0' : 'border-l-4'} border-slate-400 bg-slate-50 p-6 rounded-2xl`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <p className="font-bold text-slate-800 text-lg">{t.surgery2}</p>
                            <p className="text-sm text-slate-600 font-medium">{t.surgery2Sub}</p>
                          </div>
                          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 self-start md:self-center">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <span className="text-sm font-bold text-slate-700">مارس 2018</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Treatment Plan Card */}
            {activeTab === 'treatment' && (
              <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-5">
                  <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <Pill className="w-6 h-6" />
                    {t.treatmentPlan}
                  </h2>
                </div>
                <div className="p-8 space-y-8">
                  {/* Medications */}
                  <div>
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-3">
                      <Pill className="w-6 h-6 text-teal-600" />
                      {t.medications}
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-teal-50 to-white p-6 rounded-2xl border border-teal-100 flex items-center gap-6 hover:shadow-lg hover:shadow-teal-900/5 transition-all group">
                        <div className="bg-teal-500 text-white p-4 rounded-2xl shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                          <Droplets className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-slate-900 text-xl mb-1">{t.med1}</p>
                          <p className="text-teal-700 font-bold text-sm tracking-tight">{t.med1Sub}</p>
                        </div>
                        <div className="bg-teal-600 text-white px-5 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-md">
                          PRN
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-2xl border border-blue-100 flex items-center gap-6 hover:shadow-lg hover:shadow-blue-900/5 transition-all group">
                        <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                          <Pill className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-slate-900 text-xl mb-1">{t.med2}</p>
                          <p className="text-blue-700 font-bold text-sm tracking-tight">{t.med2Sub}</p>
                        </div>
                        <div className="bg-blue-700 text-white px-5 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-md">
                          7 DAYS
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-2xl border border-amber-100 flex items-center gap-6 hover:shadow-lg hover:shadow-amber-900/5 transition-all group">
                        <div className="bg-amber-500 text-white p-4 rounded-2xl shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                          <Pill className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-slate-900 text-xl mb-1">{t.med3}</p>
                          <p className="text-amber-700 font-bold text-sm tracking-tight">{t.med3Sub}</p>
                        </div>
                        <div className="bg-amber-600 text-white px-5 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-md">
                          PRN
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Medical Instructions */}
                  <div className="bg-slate-900 p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <h3 className="font-bold text-white mb-6 flex items-center gap-3">
                      <AlertCircle className="w-6 h-6 text-yellow-400" />
                      {t.instructions}
                    </h3>
                    <ul className="space-y-5">
                      <li className="flex items-start gap-4 text-slate-300">
                        <div className="bg-yellow-400 text-slate-900 w-7 h-7 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5">1</div>
                        <span className="font-medium text-lg leading-snug">{t.instruction1}</span>
                      </li>
                      <li className="flex items-start gap-4 text-slate-300">
                        <div className="bg-yellow-400 text-slate-900 w-7 h-7 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5">2</div>
                        <span className="font-medium text-lg leading-snug">{t.instruction2}</span>
                      </li>
                      <li className="flex items-start gap-4 text-red-400 mt-4 pt-4 border-t border-white/5">
                        <div className="bg-red-500 text-white w-7 h-7 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 flex-shrink-0 mt-0.5">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                        <span className="font-black text-lg leading-snug uppercase tracking-tight">{t.emergencyNav}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Quick Info Panel */}
          <div className="space-y-8">
            {/* Quick Patient Summary */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100">
              <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                <h3 className="font-black text-white text-[10px] uppercase tracking-[0.2em]">{t.quickSummary}</h3>
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
              <div className="p-8 space-y-6">
                <div className="text-center pb-6 border-b border-slate-50">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-600/20 transform -rotate-3">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
                  </div>
                  <h4 className="font-black text-slate-900 text-xl leading-tight">{t.patientName}</h4>
                  <p className="text-sm text-slate-500 font-bold mt-1">34 {lang === 'ar' ? 'عام' : 'Years'} • {lang === 'ar' ? 'ذكر' : 'Male'}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                    <span className="text-xs text-slate-500 font-bold uppercase">{t.bloodType}</span>
                    <span className="font-black text-red-600 bg-white px-3 py-1 rounded-xl shadow-sm">O+</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                    <span className="text-xs text-slate-500 font-bold uppercase">{t.mrn}</span>
                    <span className="font-mono font-black text-slate-900">MRN-2024</span>
                  </div>
                  <div className="flex justify-between items-center bg-amber-50 p-4 rounded-2xl border border-amber-100">
                    <span className="text-xs text-amber-600 font-bold uppercase">{t.status}</span>
                    <span className="text-[10px] bg-amber-500 text-white px-3 py-1.5 rounded-full font-black uppercase tracking-wider">{t.underTreatment}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Diagnosis Badge */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl shadow-xl shadow-red-600/20 p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-black text-[10px] uppercase tracking-widest">{t.primaryDiagnosis}</h3>
              </div>
              <p className="text-[10px] font-black text-red-200 mb-2 opacity-80">ICD-10: S72.0</p>
              <p className="font-black text-2xl leading-tight">{t.primaryDiagnosisText}</p>
            </div>

            {/* Active Medications Count */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-slate-900 uppercase text-[10px] tracking-widest">{t.medications}</h3>
                <span className="bg-blue-600 text-white text-xl font-black w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">3</span>
              </div>
              <div className="space-y-4">
                {[t.med1, t.med2, t.med3].map((med, idx) => (
                  <div key={idx} className="flex items-center gap-4 group p-1">
                    <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-teal-500' : idx === 1 ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                    <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{med}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Appointment */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100">
              <h3 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                {t.followUp}
              </h3>
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <p className="text-xs text-blue-600 font-black uppercase tracking-widest mb-1">{t.pt}</p>
                <p className="font-black text-blue-900 text-lg leading-tight">{t.after48}</p>
                <button className="mt-4 w-full bg-white text-blue-600 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm hover:shadow-md transition-all">التفاصيل</button>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-slate-900 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600/10 rounded-full -ml-16 -mb-16 blur-2xl group-hover:scale-110 transition-transform"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/20 rounded-xl">
                  <Phone className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-black text-[10px] uppercase tracking-widest">{t.emergency}</h3>
              </div>
              <p className="text-slate-400 font-bold text-sm mb-4 leading-relaxed">{t.emergencyText}</p>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-all cursor-pointer">
                <Home className="w-8 h-8 text-red-500" />
                <div>
                  <span className="font-black text-lg block">{t.emergencyService}</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">997</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-slate-200 py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 font-bold">{t.footer}</p>
          <div className="flex items-center gap-6">
            <p className="text-sm text-slate-400 font-bold">{t.lastUpdated}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
