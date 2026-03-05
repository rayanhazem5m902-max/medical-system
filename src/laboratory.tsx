import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, ClipboardList, UserCog, Pill, Search, Menu, Globe, Bell, Settings, Microscope, UsersRound, Contact2, Briefcase, Warehouse, Layers, Wallet, FileText, Coins } from 'lucide-react';

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
    { id: 'laboratory', label: 'المختبر', icon: Microscope, active: true },
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
      <aside className={`fixed lg:relative z-40 h-full w-56 bg-white text-gray-500 transition-all duration-300 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 shadow-xl overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-200`}>
        <div className="p-4 pb-2 flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight uppercase text-gray-900">Al-Shifa</span>
        </div>

        <nav className="mt-6 px-4 space-y-1">
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'patients') navigate('/patient');
                if (item.id === 'dash') navigate('/dashboard');
                if (item.id === 'reception') navigate('/reception');
                if (item.id === 'pharmacy') navigate('/dispense');
                if (item.id === 'laboratory') navigate('/laboratory');
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 group ${item.active ? 'bg-[#eef5ff] text-[#2b7de9] shadow-sm' : 'text-gray-400 hover:bg-gray-50 hover:text-[#2b7de9]'}`}
            >
              <item.icon className={`w-4 h-4 ${item.active ? '' : 'transition-transform group-hover:scale-110'}`} />
              <span className="font-medium text-xs">{item.label}</span>
            </button>
          ))}

          {/* Management Section */}
          <div className="pt-4 pb-2 px-4">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">الإدارة</h4>
          </div>

          {managementItems.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 group text-gray-400 hover:bg-gray-50 hover:text-[#2b7de9]"
            >
              <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="font-medium text-xs">{item.label}</span>
            </button>
          ))}

          {/* System Settings */}
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 text-gray-400 hover:bg-gray-50 hover:text-[#2b7de9] mt-2 border-t border-gray-100 pt-2 mb-4">
            <Settings className="w-4 h-4" />
            <span className="font-medium text-xs">الإعدادات</span>
          </button>
        </nav>
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

            <button className="relative p-1.5 hover:bg-gray-100 rounded-xl transition-colors text-gray-500">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

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

                <button className="w-full mt-3 py-2 text-sm bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5">
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
