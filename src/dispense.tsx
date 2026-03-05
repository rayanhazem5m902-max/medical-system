import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, User, FileText, Pill, DollarSign, Clock, ChevronRight, LogOut, Package, AlertCircle, Bell, LayoutDashboard, Users, Calendar, ClipboardList, UserCog } from 'lucide-react';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  quantity: string;
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

export default function App() {
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: 'Pantoprazole 40 mg', dosage: 'One tablet daily 30 minutes before breakfast.', quantity: '30 Capsules', status: 'Available', selected: true },
    { id: 2, name: 'Augmentin 1 g', dosage: 'One tablet every 12 hours for 7 days.', quantity: '14 Tablets', status: 'Available', selected: true },
    { id: 3, name: 'Panadol Extra', dosage: 'As needed every 6 hours (Max 8 tablets).', quantity: '24 Tablets', status: 'Available', selected: false },
  ]);

  const [prescriptions] = useState<Prescription[]>([
    { id: 1, patientName: 'Ahmed Mohammed Abdullah', status: 'In Progress', timeAgo: '10 mins ago', fileNumber: '#445821' },
    { id: 2, patientName: 'Sarah Ali Salem', status: 'New', timeAgo: '32 mins ago', fileNumber: '#445822' },
    { id: 3, patientName: 'Mahmoud Hassan Omar', status: 'New', timeAgo: '45 mins ago', fileNumber: '#445823' },
  ]);

  const toggleMedication = (id: number) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === id ? { ...med, selected: !med.selected } : med
      )
    );
  };

  const selectedCount = medications.filter(m => m.selected).length;

  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'dash', label: 'لوحة القيادة', icon: LayoutDashboard },
    { id: 'patients', label: 'سجلات المرضى', icon: Users },
    { id: 'appts', label: 'المواعيد', icon: Calendar },
    { id: 'reception', label: 'الاستقبال', icon: ClipboardList },
    { id: 'doctors', label: 'الأطباء', icon: UserCog },
    { id: 'pharmacy', label: 'الصيدلية', icon: Pill, active: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-['Cairo']" dir="rtl">
      {/* Primary Sidebar - Main Navigation */}
      <aside className={`fixed lg:relative z-40 h-full w-64 bg-white text-gray-500 transition-all duration-300 transform shadow-xl overflow-y-auto overflow-x-hidden border-l border-slate-200`}>
        <div className="p-4 flex items-center gap-3 border-b border-slate-100">
          <span className="text-lg font-black tracking-tight uppercase text-gray-900">Al-Shifa</span>
        </div>

        <nav className="mt-4 px-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'patients') navigate('/patient');
                if (item.id === 'dash') navigate('/dashboard');
                if (item.id === 'reception') navigate('/reception');
                if (item.id === 'pharmacy') navigate('/dispense');
                if (item.id === 'laboratory') navigate('/laboratory');
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 group ${item.active ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'}`}
            >
              <item.icon className={`w-4 h-4 ${item.active ? '' : 'transition-transform group-hover:scale-110'}`} />
              <span className="font-bold text-xs">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Secondary Sidebar - Incoming Prescriptions */}
      <div className="w-72 bg-white border-l border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            الوصفات الواردة
          </h2>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><span className="font-bold text-blue-600">12</span> وصفة في قائمة الانتظار</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {prescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className={`p-4 border-b border-slate-100 cursor-pointer transition-all hover:bg-slate-50 ${prescription.status === 'In Progress' ? 'bg-blue-50/50 border-r-4 border-r-blue-600' : ''
                }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-slate-800 text-sm">{prescription.patientName}</p>
                  <p className="text-xs text-slate-500 mt-0.5" dir="ltr">{prescription.fileNumber}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 transform rotate-180" />
              </div>
              <div className="flex items-center justify-between mt-3">
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${prescription.status === 'In Progress'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
                    }`}
                >
                  {prescription.status === 'In Progress' ? 'قيد التجهيز' : 'جديد'}
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {prescription.timeAgo.replace('mins ago', 'دقائق مضت')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm z-10 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg shadow-md shadow-blue-600/20">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 leading-none mb-1">صرف الوصفات الطبية</h1>
                <p className="text-xs font-semibold text-slate-500 tracking-wide">وصفة #445821 - من: د. أحمد محمد عبده</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-600 hidden sm:block">الأربعاء، 24 مايو</span>
              <div className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 cursor-pointer">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-lg transition-colors cursor-pointer">
                <div>
                  <p className="text-sm font-bold text-slate-800 leading-none mb-1 text-left">د. فهد العتيبي</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider text-left">صيدلي مناوب</p>
                </div>
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                  ف
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
          {/* Patient Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              معلومات المريض
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-slate-500">اسم المريض</p>
                <p className="font-semibold text-slate-800">أحمد محمد عبدالله</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">رقم الملف</p>
                <p className="font-semibold text-slate-800">#445821</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">العمر / الجنس</p>
                <p className="font-semibold text-slate-800">34 سنة / ذكر</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">الطبيب المعالج</p>
                <p className="font-semibold text-slate-800">د. يوسف الأحمد</p>
                <p className="text-xs text-slate-500">استشاري باطنية</p>
              </div>
            </div>
          </div>

          {/* Medications Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-blue-600" />
                  الأدوية الموصوفة
                </h2>
                <span className="text-sm text-slate-500">3 أصناف</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full" dir="rtl">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      تحديد
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      الدواء
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      الجرعة والتعليمات
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      الكمية
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      الحالة
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medications.map((medication) => (
                    <tr
                      key={medication.id}
                      className={`hover:bg-slate-50 transition-colors cursor-pointer ${medication.selected ? 'bg-blue-50' : ''
                        }`}
                      onClick={() => toggleMedication(medication.id)}
                    >
                      <td className="px-6 py-4">
                        {medication.selected ? (
                          <CheckCircle2 className="w-6 h-6 text-blue-600" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-300" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800 text-right" dir="ltr">{medication.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">
                          {medication.dosage.replace('One tablet daily 30 minutes before breakfast.', 'قرص واحد يومياً قبل الإفطار بـ 30 دقيقة.')
                            .replace('One tablet every 12 hours for 7 days.', 'قرص واحد كل 12 ساعة لمدة 7 أيام.')
                            .replace('As needed every 6 hours (Max 8 tablets).', 'عند الحاجة كل 6 ساعات (بحد أقصى 8 أقراص).')}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600 text-right" dir="ltr">
                          {medication.quantity.replace('Capsules', 'كبسولة')
                            .replace('Tablets', 'قرص')}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${medication.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {medication.status === 'Available' ? 'متوفر' : 'غير متوفر'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-sm text-slate-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>
                  <strong className="text-slate-800">{selectedCount}</strong> من أصل {medications.length} أدوية محددة للصرف
                </span>
              </p>
            </div>
          </div>

          {/* Financial Summary & Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  الملخص المالي
                </h2>
                <div className="flex items-baseline gap-2 flex-row-reverse justify-end">
                  <span className="text-sm text-slate-500">:إجمالي الفاتورة المتوقع</span>
                  <span className="text-3xl font-bold text-blue-600">285.50 ريال</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">شامل ضريبة القيمة المضافة</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" />
                  إصدار الفاتورة
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30">
                  <Package className="w-5 h-5" />
                  صرف الوصفة ({selectedCount})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center gap-4">
              <span>تم تسجيل الدخول بواسطة: <strong className="text-slate-700">د. فهد العتيبي</strong> (صيدلي مناوب)</span>
            </div>
            <div className="flex items-center gap-4">
              <span>التاريخ: <strong className="text-slate-700">الأربعاء، 24 مايو</strong></span>
              <button className="flex items-center gap-1 text-slate-500 hover:text-red-600 transition-colors">
                <LogOut className="w-4 h-4" />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
