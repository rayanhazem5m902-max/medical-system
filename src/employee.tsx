import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  UserPlus,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronLeft,
  Calendar,
  Save,
  X,
  Info,
  ShieldCheck,
  HelpCircle,
  Heart,
  Menu,
  ChevronDown,
  Building2,
  Briefcase,
  Mail,
  Phone,
  CreditCard,
  User,
} from 'lucide-react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phone: '',
    email: '',
    jobRole: '',
    department: '',
    joiningDate: '',
    status: 'active',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'لوحة التحكم', active: false },
    { icon: Users, label: 'المرضى', active: false },
    { icon: CalendarDays, label: 'المواعيد', active: false },
    { icon: UserPlus, label: 'إدارة الموظفين', active: true },
  ];

  const departments = [
    'قسم الطوارئ',
    'قسم الجراحة',
    'قسم الباطنية',
    'قسم الأطفال',
    'قسم العظام',
    'قسم القلب',
    'قسم الأشعة',
    'قسم المختبرات',
    'الإدارة العامة',
    'قسم التمريض',
  ];

  const jobRoles = [
    'طبيب استشاري',
    'طبيب أخصائي',
    'طبيب مقيم',
    'ممرض/ة',
    'فني مختبر',
    'فني أشعة',
    'صيدلي',
    'إداري',
    'محاسب',
    'موظف استقبال',
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-arabic">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 right-0 z-50 h-screen w-72 bg-white shadow-xl border-l border-gray-100 flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-medical-500 to-medical-700 flex items-center justify-center shadow-lg shadow-medical-500/25">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-800 leading-tight">
                نظام إدارة
              </h1>
              <p className="text-xs text-medical-600 font-semibold">
                المستشفى
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
            القائمة الرئيسية
          </p>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? 'bg-medical-50 text-medical-700 shadow-sm border border-medical-100'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    item.active ? 'text-medical-600' : 'text-gray-400'
                  }`}
                />
                <span>{item.label}</span>
                {item.active && (
                  <div className="mr-auto w-2 h-2 rounded-full bg-medical-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 space-y-1.5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all duration-200">
            <Settings className="w-5 h-5 text-gray-400" />
            <span>الإعدادات</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button + Breadcrumb */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="text-medical-600 font-medium">إدارة الموظفين</span>
                <ChevronLeft className="w-4 h-4 text-gray-300" />
                <span className="text-gray-400">الموظفين</span>
                <ChevronLeft className="w-4 h-4 text-gray-300" />
                <span className="text-gray-400">إضافة موظف جديد</span>
              </div>
            </div>

            {/* Search & Notifications */}
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="بحث..."
                  className="w-64 pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:border-medical-300"
                />
              </div>
              <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 left-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-400 to-medical-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-medical-500/20 cursor-pointer">
                أح
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              إضافة موظف جديد
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              يرجى تعبئة جميع الحقول المطلوبة لإضافة موظف جديد إلى النظام. تأكد من صحة البيانات قبل الحفظ.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-l from-medical-500 to-medical-600 px-6 sm:px-8 py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <UserPlus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">البيانات الشخصية</h3>
                  <p className="text-medical-100 text-xs mt-0.5">معلومات الموظف الأساسية</p>
                </div>
              </div>
            </div>

            {/* Form Body */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    الاسم الكامل <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${focusedField === 'fullName' ? 'text-medical-500' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="أدخل الاسم الكامل"
                      className="w-full pr-11 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-medical-400"
                    />
                  </div>
                </div>

                {/* ID Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    رقم الهوية <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <CreditCard className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${focusedField === 'idNumber' ? 'text-medical-500' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      value={formData.idNumber}
                      onChange={(e) => handleChange('idNumber', e.target.value)}
                      onFocus={() => setFocusedField('idNumber')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="أدخل رقم الهوية"
                      className="w-full pr-11 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-medical-400"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    رقم الجوال <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${focusedField === 'phone' ? 'text-medical-500' : 'text-gray-400'}`} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="05xxxxxxxx"
                      className="w-full pr-11 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-medical-400"
                      dir="ltr"
                      style={{ textAlign: 'right' }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    البريد الإلكتروني <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${focusedField === 'email' ? 'text-medical-500' : 'text-gray-400'}`} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="example@hospital.com"
                      className="w-full pr-11 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-medical-400"
                      dir="ltr"
                      style={{ textAlign: 'right' }}
                    />
                  </div>
                </div>

                {/* Job Role Dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    المسمى الوظيفي <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${focusedField === 'jobRole' ? 'text-medical-500' : 'text-gray-400'}`} />
                    <ChevronDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                      value={formData.jobRole}
                      onChange={(e) => handleChange('jobRole', e.target.value)}
                      onFocus={() => setFocusedField('jobRole')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pr-11 pl-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 appearance-none focus:bg-white focus:border-medical-400 cursor-pointer"
                    >
                      <option value="" disabled>
                        اختر المسمى الوظيفي
                      </option>
                      {jobRoles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Department Dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    القسم <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${focusedField === 'department' ? 'text-medical-500' : 'text-gray-400'}`} />
                    <ChevronDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                      value={formData.department}
                      onChange={(e) => handleChange('department', e.target.value)}
                      onFocus={() => setFocusedField('department')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pr-11 pl-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 appearance-none focus:bg-white focus:border-medical-400 cursor-pointer"
                    >
                      <option value="" disabled>
                        اختر القسم
                      </option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Joining Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    تاريخ الالتحاق <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${focusedField === 'joiningDate' ? 'text-medical-500' : 'text-gray-400'}`} />
                    <input
                      type="date"
                      value={formData.joiningDate}
                      onChange={(e) => handleChange('joiningDate', e.target.value)}
                      onFocus={() => setFocusedField('joiningDate')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pr-11 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:border-medical-400 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Employment Status Radio */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    حالة التوظيف <span className="text-red-400">*</span>
                  </label>
                  <div className="flex items-center gap-3 pt-1">
                    <label
                      className={`flex-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        formData.status === 'active'
                          ? 'border-medical-500 bg-medical-50 text-medical-700'
                          : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={formData.status === 'active'}
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                          formData.status === 'active'
                            ? 'border-medical-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {formData.status === 'active' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-medical-500" />
                        )}
                      </div>
                      <span className="text-sm font-medium">نشط</span>
                    </label>
                    <label
                      className={`flex-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        formData.status === 'leave'
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value="leave"
                        checked={formData.status === 'leave'}
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                          formData.status === 'leave'
                            ? 'border-amber-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {formData.status === 'leave' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        )}
                      </div>
                      <span className="text-sm font-medium">في إجازة</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-8" />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-l from-medical-500 to-medical-600 hover:from-medical-600 hover:to-medical-700 text-white px-10 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-medical-500/25 hover:shadow-xl hover:shadow-medical-500/30 transition-all duration-200 active:scale-[0.98]">
                  <Save className="w-4.5 h-4.5" />
                  <span>حفظ البيانات</span>
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-gray-50 text-gray-600 px-10 py-3.5 rounded-xl text-sm font-bold border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 active:scale-[0.98]">
                  <X className="w-4.5 h-4.5" />
                  <span>إلغاء</span>
                </button>
              </div>
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-8">
            {/* System Notes - Blue */}
            <div className="bg-white rounded-2xl border border-blue-100 p-5 sm:p-6 hover:shadow-md hover:shadow-blue-50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-1.5">ملاحظات النظام</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    سيتم إنشاء حساب دخول تلقائي للموظف الجديد وإرسال بيانات الدخول عبر البريد الإلكتروني المسجل.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Privacy - Yellow */}
            <div className="bg-white rounded-2xl border border-amber-100 p-5 sm:p-6 hover:shadow-md hover:shadow-amber-50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-1.5">خصوصية البيانات</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    جميع البيانات المدخلة محمية وفقاً لسياسة الخصوصية ولا يتم مشاركتها مع أي جهة خارجية.
                  </p>
                </div>
              </div>
            </div>

            {/* Help Support - Grey */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 hover:shadow-md hover:shadow-gray-50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-gray-500/20 group-hover:scale-105 transition-transform">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-1.5">الدعم والمساعدة</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    في حال واجهتك أي مشكلة، يمكنك التواصل مع فريق الدعم الفني على الرقم الداخلي 1234.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer spacer */}
          <div className="h-8" />
        </div>
      </main>
    </div>
  );
}
