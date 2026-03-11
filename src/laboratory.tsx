import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, ClipboardList, UserCog, Pill, Search, Menu, Globe, Bell, Settings, Microscope, UsersRound, Contact2, Briefcase, Warehouse, Layers, Wallet, FileText, Coins, LogOut, Activity } from 'lucide-react';
import { cn } from './utils/cn';

interface LabRequest {
  id: string;
  patientName: string;
  labNumber: string;
  test: string;
  status: 'In Progress' | 'Waiting' | 'Completed';
  priority: 'Urgent' | 'Normal';
}

const labRequests: LabRequest[] = [
  { id: '1', patientName: 'أحمد محمود الشريف', labNumber: 'LAB-#9042', test: 'صورة دم كاملة (CBC)', status: 'In Progress', priority: 'Urgent' },
  { id: '2', patientName: 'سارة يوسف كمال', labNumber: 'LAB-#9043', test: 'وظائف كلى وكبد', status: 'Waiting', priority: 'Normal' },
  { id: '3', patientName: 'محمد إبراهيم علي', labNumber: 'LAB-#9044', test: 'متوسط السكر التراكمي (HbA1c)', status: 'Waiting', priority: 'Normal' },
  { id: '4', patientName: 'ليلى حسن خليل', labNumber: 'LAB-#9045', test: 'تحليل الغدة الدرقية', status: 'Waiting', priority: 'Urgent' },
];

function Laboratory() {
  const [selectedRequest, setSelectedRequest] = useState<LabRequest | null>(labRequests[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [labNotifications] = useState([
    { id: 1, doctor: 'د. خالد العتيبي', patient: 'سالم علي الشهري', test: 'صورة دم كاملة (CBC)', time: 'منذ 5 دقائق' },
    { id: 2, doctor: 'د. سارة خليل', patient: 'نورة سعد القحطاني', test: 'وظائف كلى وكبد', time: 'منذ 12 دقيقة' },
    { id: 3, doctor: 'د. يوسف الأحمد', patient: 'أحمد محمد عبدالله', test: 'تحليل الغدة الدرقية', time: 'منذ 25 دقيقة' },
  ]);

  const handleSendResults = () => {
    if (!uploadedFile || !selectedRequest) return;
    alert(`تم إرسال نتائج فحص ${selectedRequest.test} للمريض ${selectedRequest.patientName} إلى الطبيب المعالج وحفظها في السجل الطبي بنجاح.`);
    setUploadedFile(null);
  };

  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Waiting': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'Urgent' ? 'text-red-600' : 'text-gray-600';
  };

  const mainMenuItems = [
    { id: 'dash', label: 'لوحة القيادة', icon: LayoutDashboard },
    { id: 'patients', label: 'سجلات المرضى', icon: Users },
    { id: 'appts', label: 'المواعيد', icon: Calendar },
    { id: 'reception', label: 'الاستقبال', icon: ClipboardList },
    { id: 'doctors', label: 'الأطباء', icon: UserCog },
    { id: 'pharmacy', label: 'الصيدلي', icon: Pill },
    { id: 'laboratory', label: 'المعامل', icon: Microscope, active: true },
  ];

  const managementItems = [

    { id: 'doc-mgmt', label: "إدارة الأطباء", icon: UsersRound },
    { id: 'emp-mgmt', label: "إدارة الموظفين", icon: Contact2 },
    { id: 'serv-mgmt', label: "إدارة الخدمات", icon: Briefcase },
    { id: 'pharma-mgmt', label: "إدارة الصيدلية والمخزون", icon: Warehouse },
    { id: 'dept-mgmt', label: "إدارة الأقسام", icon: Layers },
    { id: 'fin-mgmt', label: "الإدارة المالية", icon: Wallet },
    { id: 'fin-reports', label: "التقارير المالية", icon: FileText },
    { id: 'payroll-mgmt', label: "إدارة الرواتب", icon: Coins }

  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-['Cairo'] flex-row" dir="rtl">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 z-50 w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 transform lg:relative lg:translate-x-0 border-l border-slate-100",
        sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      )}>
        <div className="p-8 pb-4">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-[#1a4fa0] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-slate-900">مستشفى الشفاء</h1>
              <p className="text-[10px] text-[#1a4fa0] font-bold uppercase tracking-widest leading-none mt-1">Medical Center</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto no-scrollbar">
          {/* Main Menu */}
          <p className="px-5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 mt-4">القائمة الرئيسية</p>
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
                if (item.id === 'doctors') navigate('/doctors');
              }}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold group",
                item.id === 'laboratory' ? "bg-[#1a4fa0] text-white shadow-xl shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0]"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", item.id === 'laboratory' ? "text-white" : "text-slate-400 group-hover:text-[#1a4fa0]")} />
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-4 pb-2 px-6">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">الإدارة</h4>
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
            className="w-full flex items-center gap-4 px-6 py-2.5 rounded-xl transition-all duration-300 text-slate-500 hover:bg-slate-50 hover:text-[#1a4fa0]"
          >
            <Settings className="w-5 h-5 text-slate-400 group-hover:text-[#1a4fa0]" />
            <span className="text-sm font-bold">الإعدادات</span>
          </button>
        </div>

        <div className="p-4 border-t border-slate-100 mx-2 pb-8 bg-slate-50/50 rounded-b-[40px]">
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white font-black text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 truncate">د. أحمد العلي</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase">مدير المختبر</p>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-100 px-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3 flex-1">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="relative max-w-md w-full group">
              <Search className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-[#2b7de9] right-4" />
              <input
                type="text"
                placeholder="البحث في المرضى والمختبر..."
                className="w-full pr-10 pl-3 py-1.5 bg-gray-50 border-transparent focus:bg-white focus:border-[#2b7de9]/30 focus:ring-4 focus:ring-[#2b7de9]/5 rounded-xl outline-none transition-all text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 relative">
            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-1 border border-transparent hover:border-gray-200">
              <Globe className="w-4 h-4 text-[#2b7de9]" />
              <span className="text-[10px] font-bold hidden sm:block">AR</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* Notifications Popover */}
              {showNotifications && (
                <div className="absolute left-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      <Microscope className="w-4 h-4 text-blue-600" />
                      طلبات المختبر الواردة
                    </h3>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">{labNotifications.length} طلب جديد</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {labNotifications.map((note) => (
                      <div
                        key={note.id}
                        className="p-4 border-b border-gray-50 cursor-pointer transition-all hover:bg-slate-50"
                        onClick={() => {
                          const newReq = {
                            id: String(Date.now()),
                            patientName: note.patient,
                            labNumber: `LAB-#${Math.floor(1000 + Math.random() * 9000)}`,
                            test: note.test,
                            status: 'Waiting' as const,
                            priority: 'Normal' as const
                          };
                          // In a real app we'd add it to the table
                          setSelectedRequest(newReq);
                          setShowNotifications(false);
                        }}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-[10px] text-gray-400 font-medium">{note.time}</span>
                          <p className="font-bold text-gray-800 text-sm">{note.patient}</p>
                        </div>
                        <p className="text-xs text-gray-600">{note.test}</p>
                        <p className="text-[10px] text-blue-600 mt-1 font-bold">بواسطة: {note.doctor}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-gray-50 text-center">
                    <button className="text-[11px] font-bold text-blue-600 hover:underline">عرض جميع الطلبات</button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />

            <div className="flex items-center gap-2 cursor-pointer group p-1 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex flex-col items-end hidden sm:flex">
                <p className="text-xs font-bold text-gray-700 group-hover:text-[#2b7de9] transition-colors leading-tight">د. أحمد</p>
                <p className="text-[9px] font-medium text-gray-500">طبيب مختبر</p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-[#eef5ff] border border-[#2b7de9]/20 flex items-center justify-center overflow-hidden">
                <Users className="w-4 h-4 text-[#2b7de9]" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="flex gap-4 flex-row-reverse">
            {/* Right Sidebar - Upload Results */}
            <div className="w-72 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-4">
                <h2 className="font-bold text-gray-800 text-base mb-3 text-right">رفع نتائج المختبر</h2>

                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5 text-right">اختر الطلب</label>
                  <select
                    className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b7de9]"
                    value={selectedRequest?.id}
                    onChange={(e) => {
                      const req = labRequests.find(r => r.id === e.target.value);
                      setSelectedRequest(req || null);
                      setUploadedFile(null);
                    }}
                    dir="rtl"
                  >
                    {labRequests.map(req => (
                      <option key={req.id} value={req.id}>
                        {req.patientName} ({req.labNumber})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedRequest && (
                  <div className="mb-3 p-2 bg-blue-50 rounded-lg text-right">
                    <p className="text-xs font-medium text-gray-800">{selectedRequest.patientName}</p>
                    <p className="text-[10px] text-gray-500" dir="ltr">{selectedRequest.labNumber}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{selectedRequest.test}</p>
                  </div>
                )}

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                    }`}
                >
                  <div className="text-3xl mb-1.5">📁</div>
                  <p className="text-xs text-gray-600 mb-1.5">
                    {isDragging ? 'أسقط الملف هنا' : 'اسحب وأفلت الملفات هنا'}
                  </p>
                  <p className="text-[10px] text-gray-400 mb-2">PDF, JPG, PNG (حد أقصى 10 ميجابايت)</p>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                    />
                    <span className="text-[#2b7de9] text-xs font-medium hover:underline">تصفح الملفات</span>
                  </label>
                </div>

                {uploadedFile && (
                  <div className="mt-2 p-1.5 bg-green-50 border border-green-200 rounded-lg flex items-center justify-end gap-1.5 text-right">
                    <span className="text-xs text-green-800 truncate" dir="ltr">{uploadedFile}</span>
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                )}

                <button
                  onClick={handleSendResults}
                  disabled={!uploadedFile}
                  className={`w-full mt-3 py-2 text-sm text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 ${uploadedFile ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                  <span>✓</span> اعتماد ورفع النتائج
                </button>
              </div>
            </div>

            {/* Main Area */}
            <div className="flex-1">
              {/* Statistics Cards */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between flex-row-reverse">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">إجمالي الطلبات</p>
                      <p className="text-xl font-bold text-gray-800">42</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                      📋
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between flex-row-reverse">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">قيد التحليل</p>
                      <p className="text-xl font-bold text-yellow-600">28</p>
                    </div>
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-xl">
                      ⏳
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between flex-row-reverse">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">نتائج مكتملة</p>
                      <p className="text-xl font-bold text-green-600">14</p>
                    </div>
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">
                      ✅
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between flex-row-reverse">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">سعة المختبر</p>
                      <p className="text-xl font-bold text-purple-600">65%</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
                      📊
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab Requests Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200 text-right">
                  <h2 className="font-bold text-gray-800 text-base">إدارة طلبات المختبر</h2>
                  <p className="text-xs text-gray-500">متابعة حالة الفحوصات الطبية وعينات المرضى</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full" dir="rtl">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-600 uppercase tracking-wider">المريض</th>
                        <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-600 uppercase tracking-wider">رقم المختبر</th>
                        <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-600 uppercase tracking-wider">نوع التحليل</th>
                        <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-600 uppercase tracking-wider">الحالة</th>
                        <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-600 uppercase tracking-wider">الأولوية</th>
                        <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-600 uppercase tracking-wider">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-right">
                      {labRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-xs">
                                  {request.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </span>
                              </div>
                              <span className="font-medium text-xs text-gray-800">{request.patientName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-2.5 text-gray-600 font-mono text-xs" dir="ltr">{request.labNumber}</td>
                          <td className="px-4 py-2.5 text-gray-600 text-xs">{request.test}</td>
                          <td className="px-4 py-2.5">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${getStatusColor(request.status)}`}>
                              {request.status === 'In Progress' ? 'قيد التحليل' : request.status === 'Waiting' ? 'في الانتظار' : 'مكتمل'}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className={`text-[10px] font-bold ${getPriorityColor(request.priority)}`}>
                              {request.priority === 'Urgent' && '⚠️ '}
                              {request.priority === 'Urgent' ? 'عاجل' : 'عادي'}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <button className="text-[#2b7de9] hover:text-blue-800 text-[11px] font-bold">
                              عرض التفاصيل
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Laboratory;
