import { type ReactNode, useEffect, useMemo, useReducer, useState } from "react";

type Locale = "en" | "ar";
type Department = "Finance" | "Operations" | "HR" | "Sales" | "Logistics";
type DepartmentFilter = Department | "Show All";
type AvatarTone = "blue" | "green" | "amber" | "violet" | "rose" | "cyan";
type NumericField = "basicSalary" | "allowances" | "deductions" | "commission";
type NavKey = "home" | "payroll" | "employeeManagement" | "financialReports";

type Employee = {
  id: number;
  name: string;
  role: string;
  roleAr: string;
  department: Department;
  basicSalary: number;
  allowances: number;
  deductions: number;
  commission: number;
  status: "Processed" | "Pending Review";
  avatarTone: AvatarTone;
};

type PayrollAction = {
  type: "update";
  employeeId: number;
  field: NumericField;
  value: number;
};

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Lina Omar",
    role: "Senior Accountant",
    roleAr: "محاسبة أولى",
    department: "Finance",
    basicSalary: 18500,
    allowances: 2400,
    deductions: 600,
    commission: 4,
    status: "Processed",
    avatarTone: "blue",
  },
  {
    id: 2,
    name: "Yousef Rahman",
    role: "Payroll Specialist",
    roleAr: "أخصائي رواتب",
    department: "HR",
    basicSalary: 14200,
    allowances: 1600,
    deductions: 450,
    commission: 2,
    status: "Processed",
    avatarTone: "green",
  },
  {
    id: 3,
    name: "Maya Haddad",
    role: "Regional Sales Lead",
    roleAr: "قائدة مبيعات إقليمية",
    department: "Sales",
    basicSalary: 16800,
    allowances: 3200,
    deductions: 920,
    commission: 7.5,
    status: "Pending Review",
    avatarTone: "amber",
  },
  {
    id: 4,
    name: "Khaled Noor",
    role: "Operations Supervisor",
    roleAr: "مشرف عمليات",
    department: "Operations",
    basicSalary: 15400,
    allowances: 2100,
    deductions: 540,
    commission: 3,
    status: "Processed",
    avatarTone: "violet",
  },
  {
    id: 5,
    name: "Sara Malik",
    role: "People Operations",
    roleAr: "عمليات الموارد البشرية",
    department: "HR",
    basicSalary: 13100,
    allowances: 1800,
    deductions: 300,
    commission: 1.5,
    status: "Processed",
    avatarTone: "rose",
  },
  {
    id: 6,
    name: "Adel Faris",
    role: "Fleet Coordinator",
    roleAr: "منسق الأسطول",
    department: "Logistics",
    basicSalary: 12600,
    allowances: 1450,
    deductions: 410,
    commission: 2.5,
    status: "Pending Review",
    avatarTone: "cyan",
  },
];

const navItems: Array<{ key: NavKey; icon: ({ className }: { className?: string }) => ReactNode; active: boolean }> = [
  { key: "home", icon: HomeIcon, active: false },
  { key: "payroll", icon: WalletIcon, active: true },
  { key: "employeeManagement", icon: TeamIcon, active: false },
  { key: "financialReports", icon: ChartIcon, active: false },
];

const budgetTrend = [426000, 433500, 441000, 437800, 446200, 452500, 459300];
const localeStorageKey = "nexapay-locale";

const avatarToneClasses: Record<AvatarTone, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  amber: "bg-amber-100 text-amber-700",
  violet: "bg-violet-100 text-violet-700",
  rose: "bg-rose-100 text-rose-700",
  cyan: "bg-cyan-100 text-cyan-700",
};

const dashboardCopy = {
  en: {
    brandTag: "NexaPay",
    brandTitle: "Payroll Hub",
    brandDescription: "Unified payroll controls for approvals, adjustments, and monthly budget tracking.",
    nav: {
      home: "Home",
      payroll: "Payroll",
      employeeManagement: "Employee Management",
      financialReports: "Financial Reports",
    },
    profileRole: "Head of Payroll Operations",
    cycleLabel: "Cycle",
    cycleValue: "May 2026",
    searchPlaceholder: "Search for employee...",
    notificationsLabel: "Notifications",
    activityLabel: "Activity",
    languageLabel: "Switch language",
    languageToggle: "العربية",
    totalStaff: "Total Staff",
    totalStaffDescription: "Active employees across 5 departments this cycle.",
    processedPayroll: "Processed Payroll",
    processedPayrollDescription: "95% of payroll runs have already been approved.",
    monthlyBudget: "Monthly Budget",
    livePreview: "Live table preview:",
    budgetTrendLabel: "Up 3.8% MoM",
    workspaceTitle: "Monthly Payroll Workspace",
    workspaceDescription: "Review allowances, deductions, and commission updates before locking the cycle.",
    showAll: "Show All",
    export: "Export to Excel",
    save: "Save Changes",
    showing: "Showing",
    employeesLabel: "employees",
    unsavedEdits: "Unsaved edits detected. Save the latest salary updates.",
    savedAt: "Changes saved at",
    noPendingEdits: "No pending edits for this cycle.",
    employee: "Employee",
    department: "Department",
    basicSalary: "Basic Salary",
    allowances: "Allowances",
    deductions: "Deductions",
    commission: "Commission %",
    netSalary: "Net Salary",
    status: "Status",
    noMatches: "No employees match the current search or department filter.",
    currencyLabel: "SAR",
    processedStatus: "Processed",
    pendingStatus: "Pending Review",
    exportFileName: "payroll-export-en.csv",
  },
  ar: {
    brandTag: "NexaPay",
    brandTitle: "مركز الرواتب",
    brandDescription: "لوحة موحدة لاعتماد الرواتب والتعديلات ومتابعة الميزانية الشهرية.",
    nav: {
      home: "الرئيسية",
      payroll: "الرواتب",
      employeeManagement: "إدارة الموظفين",
      financialReports: "التقارير المالية",
    },
    profileRole: "رئيسة عمليات الرواتب",
    cycleLabel: "الدورة",
    cycleValue: "مايو 2026",
    searchPlaceholder: "ابحث عن موظف...",
    notificationsLabel: "الإشعارات",
    activityLabel: "النشاط",
    languageLabel: "تغيير اللغة",
    languageToggle: "English",
    totalStaff: "إجمالي الموظفين",
    totalStaffDescription: "الموظفون النشطون عبر 5 أقسام خلال هذه الدورة.",
    processedPayroll: "الرواتب المعالجة",
    processedPayrollDescription: "تم اعتماد 95% من عمليات الرواتب بالفعل.",
    monthlyBudget: "الميزانية الشهرية",
    livePreview: "إجمالي المعاينة المباشرة:",
    budgetTrendLabel: "ارتفاع 3.8% شهريًا",
    workspaceTitle: "مساحة عمل الرواتب الشهرية",
    workspaceDescription: "راجع البدلات والاستقطاعات وتحديثات العمولة قبل اعتماد الدورة.",
    showAll: "عرض الكل",
    export: "تصدير إلى Excel",
    save: "حفظ التغييرات",
    showing: "عرض",
    employeesLabel: "موظف",
    unsavedEdits: "تم رصد تعديلات غير محفوظة. احفظ أحدث تحديثات الرواتب.",
    savedAt: "تم الحفظ في",
    noPendingEdits: "لا توجد تعديلات معلقة في هذه الدورة.",
    employee: "الموظف",
    department: "القسم",
    basicSalary: "الراتب الأساسي",
    allowances: "البدلات",
    deductions: "الاستقطاعات",
    commission: "العمولة %",
    netSalary: "صافي الراتب",
    status: "الحالة",
    noMatches: "لا يوجد موظفون يطابقون البحث أو القسم الحالي.",
    currencyLabel: "ر.س",
    processedStatus: "تمت المعالجة",
    pendingStatus: "قيد المراجعة",
    exportFileName: "payroll-export-ar.csv",
  },
} as const;

const departmentLabels: Record<Locale, Record<Department, string>> = {
  en: {
    Finance: "Finance",
    Operations: "Operations",
    HR: "HR",
    Sales: "Sales",
    Logistics: "Logistics",
  },
  ar: {
    Finance: "المالية",
    Operations: "العمليات",
    HR: "الموارد البشرية",
    Sales: "المبيعات",
    Logistics: "الخدمات اللوجستية",
  },
};

function payrollReducer(state: Employee[], action: PayrollAction) {
  switch (action.type) {
    case "update":
      return state.map((employee) =>
        employee.id === action.employeeId
          ? { ...employee, [action.field]: action.value }
          : employee
      );
    default:
      return state;
  }
}

function computeNetSalary(employee: Employee) {
  return employee.basicSalary + employee.allowances - employee.deductions + employee.basicSalary * (employee.commission / 100);
}

function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatCurrency(value: number, locale: Locale) {
  return `${formatNumber(value, locale)} ${dashboardCopy[locale].currencyLabel}`;
}

function formatTime(value: number, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}

function sanitizeNumber(value: string) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return Math.max(0, parsed);
}

function buildSparklinePoints(values: number[]) {
  const width = 180;
  const height = 64;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
}

function getDepartmentLabel(department: Department, locale: Locale) {
  return departmentLabels[locale][department];
}

function getStatusLabel(status: Employee["status"], locale: Locale) {
  return status === "Processed" ? dashboardCopy[locale].processedStatus : dashboardCopy[locale].pendingStatus;
}

export function App() {
  const [employees, dispatch] = useReducer(payrollReducer, initialEmployees);
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "ar";
    }

    const storedLocale = window.localStorage.getItem(localeStorageKey);
    return storedLocale === "en" || storedLocale === "ar" ? storedLocale : "ar";
  });
  const [departmentFilter, setDepartmentFilter] = useState<DepartmentFilter>("Show All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedSnapshot, setSavedSnapshot] = useState(initialEmployees);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  const isArabic = locale === "ar";
  const copy = dashboardCopy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    window.localStorage.setItem(localeStorageKey, locale);
  }, [isArabic, locale]);

  const departments = useMemo<DepartmentFilter[]>(
    () => ["Show All", ...new Set(initialEmployees.map((employee) => employee.department))],
    []
  );

  const visibleEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesDepartment = departmentFilter === "Show All" || employee.department === departmentFilter;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        employee.name.toLowerCase().includes(query) ||
        employee.role.toLowerCase().includes(query) ||
        employee.roleAr.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query) ||
        getDepartmentLabel(employee.department, "ar").toLowerCase().includes(query);

      return matchesDepartment && matchesSearch;
    });
  }, [departmentFilter, employees, searchQuery]);

  const totalPreviewPayroll = useMemo(
    () => employees.reduce((sum, employee) => sum + computeNetSalary(employee), 0),
    [employees]
  );

  const hasUnsavedChanges = useMemo(
    () =>
      employees.some((employee, index) => {
        const savedEmployee = savedSnapshot[index];
        return (
          employee.basicSalary !== savedEmployee.basicSalary ||
          employee.allowances !== savedEmployee.allowances ||
          employee.deductions !== savedEmployee.deductions ||
          employee.commission !== savedEmployee.commission
        );
      }),
    [employees, savedSnapshot]
  );

  const sparklinePoints = useMemo(() => buildSparklinePoints(budgetTrend), []);

  function handleNumberChange(employeeId: number, field: NumericField, nextValue: string) {
    dispatch({
      type: "update",
      employeeId,
      field,
      value: sanitizeNumber(nextValue),
    });
  }

  function handleExport() {
    const headers = [
      "Employee",
      "Department",
      "Role",
      "Basic Salary",
      "Allowances",
      "Deductions",
      "Commission %",
      "Net Salary",
      "Status",
    ];

    const rows = visibleEmployees.map((employee) => [
      employee.name,
      employee.department,
      employee.role,
      employee.basicSalary,
      employee.allowances,
      employee.deductions,
      employee.commission,
      Math.round(computeNetSalary(employee)),
      employee.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).split('"').join('""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = copy.exportFileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleSave() {
    setSavedSnapshot(employees);
    setLastSavedAt(Date.now());
  }

  function handleLocaleToggle() {
    setLocale((currentLocale) => (currentLocale === "ar" ? "en" : "ar"));
  }

  return (
    <div lang={locale} dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-slate-50 text-slate-900">
      <aside className={`bg-[#005a8d] text-white lg:fixed lg:inset-y-0 lg:w-72 ${isArabic ? "lg:right-0" : "lg:left-0"}`}>
        <div className="flex h-full flex-col px-6 py-8">
          <div className="animate-[fade-up_700ms_ease-out]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/10">
                <LogoIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-sky-100/70">{copy.brandTag}</p>
                <h1 className="text-xl font-semibold tracking-tight">{copy.brandTitle}</h1>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-6 text-sky-100/80">
              {copy.brandDescription}
            </p>
          </div>

          <nav className="mt-10 space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  className={`flex w-full animate-[fade-up_700ms_ease-out] items-center gap-3 rounded-2xl px-4 py-3 ${isArabic ? "text-right" : "text-left"} text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:bg-white/12 ${
                    item.active ? "bg-white/14 text-white shadow-sm" : "text-sky-100/80"
                  }`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>{copy.nav[item.key]}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto animate-[fade-up_850ms_ease-out] rounded-3xl border border-white/10 bg-white/10 p-4 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-sm font-semibold">RA</div>
              <div>
                <p className="font-medium">Rania Alotaibi</p>
                <p className="text-sm text-sky-100/70">{copy.profileRole}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-sky-100/80">
              <span>{copy.cycleLabel}</span>
              <span className="font-medium text-white">{copy.cycleValue}</span>
            </div>
          </div>
        </div>
      </aside>

      <div className={isArabic ? "lg:pr-72" : "lg:pl-72"}>
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur-lg">
          <div className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <label className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm transition duration-300 focus-within:border-sky-400 focus-within:bg-white focus-within:shadow-md">
              <SearchIcon className="h-5 w-5 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={copy.searchPlaceholder}
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </label>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleLocaleToggle}
                className="flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:text-sky-600"
                aria-label={copy.languageLabel}
              >
                <GlobeIcon className="h-5 w-5" />
                <span className="text-sm font-semibold">{copy.languageToggle}</span>
              </button>
              <button
                type="button"
                className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:text-sky-600"
                aria-label={copy.notificationsLabel}
              >
                <BellIcon className="h-5 w-5" />
                <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-sky-500 ring-2 ring-white" />
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:text-sky-600"
                aria-label={copy.activityLabel}
              >
                <SparkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="space-y-8 px-6 py-6 lg:px-8 lg:py-8">
          <section className="grid gap-4 xl:grid-cols-[1fr_1fr_1.3fr]">
            <div className="animate-[fade-up_700ms_ease-out] rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{copy.totalStaff}</p>
                  <p className="mt-3 font-numeric text-4xl font-semibold tracking-tight text-slate-900">{formatNumber(124, locale)}</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <TeamIcon className="h-7 w-7" />
                </div>
              </div>
              <p className="mt-5 text-sm text-slate-500">{copy.totalStaffDescription}</p>
            </div>

            <div className="animate-[fade-up_780ms_ease-out] rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{copy.processedPayroll}</p>
                  <p className="mt-3 font-numeric text-4xl font-semibold tracking-tight text-slate-900">{formatNumber(118, locale)}</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <CheckIcon className="h-7 w-7" />
                </div>
              </div>
              <p className="mt-5 text-sm text-slate-500">{copy.processedPayrollDescription}</p>
            </div>

            <div className="animate-[fade-up_860ms_ease-out] rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm text-slate-500">{copy.monthlyBudget}</p>
                  <p className="mt-3 font-numeric text-4xl font-semibold tracking-tight text-slate-900">{formatCurrency(452500, locale)}</p>
                  <p className="mt-4 text-sm text-slate-500">
                    {copy.livePreview} <span className="font-numeric font-medium text-slate-900">{formatCurrency(totalPreviewPayroll, locale)}</span>
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <svg viewBox="0 0 180 64" className="h-20 w-48 overflow-visible">
                    <defs>
                      <linearGradient id="budget-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                    </defs>
                    <polyline
                      fill="none"
                      stroke="url(#budget-gradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={sparklinePoints}
                    />
                    <circle cx="180" cy="4" r="4" fill="#14b8a6" />
                  </svg>
                  <p className={`mt-2 text-xs font-medium ${isArabic ? "text-left" : "text-right"} tracking-[0.2em] text-emerald-600`}>
                    {copy.budgetTrendLabel}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="animate-[fade-up_940ms_ease-out] overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-slate-200">
            <div className="border-b border-slate-200 px-6 py-5 lg:px-8">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{copy.workspaceTitle}</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {copy.workspaceDescription}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:items-center xl:justify-end">
                  <select
                    value={departmentFilter}
                    onChange={(event) => setDepartmentFilter(event.target.value as DepartmentFilter)}
                    className={`rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition duration-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 ${isArabic ? "text-right" : "text-left"}`}
                  >
                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department === "Show All" ? copy.showAll : getDepartmentLabel(department, locale)}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleExport}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                  >
                    {copy.export}
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-xl bg-[#00a3da] px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#0094c5] disabled:cursor-not-allowed disabled:bg-sky-300"
                    disabled={!hasUnsavedChanges}
                  >
                    {copy.save}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="text-slate-500">
                  {copy.showing} <span className="font-numeric font-semibold text-slate-900">{formatNumber(visibleEmployees.length, locale)}</span> {copy.employeesLabel}
                </p>
                <p className={`${hasUnsavedChanges ? "text-amber-600" : "text-emerald-600"}`}>
                  {hasUnsavedChanges
                    ? copy.unsavedEdits
                    : lastSavedAt
                      ? `${copy.savedAt} ${formatTime(lastSavedAt, locale)}`
                      : copy.noPendingEdits}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className={`min-w-[1080px] w-full border-separate border-spacing-0 ${isArabic ? "text-right" : "text-left"}`}>
                <thead>
                  <tr className="bg-slate-50 text-xs uppercase tracking-[0.22em] text-slate-500">
                    <th className="px-6 py-4 font-medium lg:px-8">{copy.employee}</th>
                    <th className="px-4 py-4 font-medium">{copy.department}</th>
                    <th className="px-4 py-4 font-medium">{copy.basicSalary}</th>
                    <th className="px-4 py-4 font-medium">{copy.allowances}</th>
                    <th className="px-4 py-4 font-medium">{copy.deductions}</th>
                    <th className="px-4 py-4 font-medium">{copy.commission}</th>
                    <th className="px-4 py-4 font-medium">{copy.netSalary}</th>
                    <th className="px-6 py-4 font-medium lg:px-8">{copy.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleEmployees.length > 0 ? (
                    visibleEmployees.map((employee) => (
                      <tr
                        key={employee.id}
                        className="group border-t border-slate-200 transition duration-300 hover:bg-slate-50/70"
                      >
                        <td className="border-t border-slate-200 px-6 py-4 lg:px-8">
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${avatarToneClasses[employee.avatarTone]}`}
                            >
                              {employee.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{employee.name}</p>
                              <p className="text-sm text-slate-500">{locale === "ar" ? employee.roleAr : employee.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="border-t border-slate-200 px-4 py-4 text-sm text-slate-600">{getDepartmentLabel(employee.department, locale)}</td>
                        <td className="border-t border-slate-200 px-4 py-4">
                          <SalaryInput
                            locale={locale}
                            currencyLabel={copy.currencyLabel}
                            value={employee.basicSalary}
                            onChange={(value) => handleNumberChange(employee.id, "basicSalary", value)}
                          />
                        </td>
                        <td className="border-t border-slate-200 px-4 py-4">
                          <SalaryInput
                            locale={locale}
                            currencyLabel={copy.currencyLabel}
                            value={employee.allowances}
                            onChange={(value) => handleNumberChange(employee.id, "allowances", value)}
                          />
                        </td>
                        <td className="border-t border-slate-200 px-4 py-4">
                          <SalaryInput
                            locale={locale}
                            currencyLabel={copy.currencyLabel}
                            value={employee.deductions}
                            onChange={(value) => handleNumberChange(employee.id, "deductions", value)}
                          />
                        </td>
                        <td className="border-t border-slate-200 px-4 py-4">
                          <CommissionInput
                            locale={locale}
                            value={employee.commission}
                            onChange={(value) => handleNumberChange(employee.id, "commission", value)}
                          />
                        </td>
                        <td className="border-t border-slate-200 px-4 py-4">
                          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                            <p className="font-numeric text-sm font-semibold text-slate-900">
                              {formatCurrency(computeNetSalary(employee), locale)}
                            </p>
                          </div>
                        </td>
                        <td className="border-t border-slate-200 px-6 py-4 lg:px-8">
                          <span
                            className={`text-sm font-medium ${
                              employee.status === "Processed" ? "text-emerald-600" : "text-amber-600"
                            }`}
                          >
                            {getStatusLabel(employee.status, locale)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-14 text-center text-sm text-slate-500 lg:px-8">
                        {copy.noMatches}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SalaryInput({
  locale,
  currencyLabel,
  value,
  onChange,
}: {
  locale: Locale;
  currencyLabel: string;
  value: number;
  onChange: (value: string) => void;
}) {
  const isArabic = locale === "ar";

  return (
    <label className="relative block">
      <span className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-xs font-medium tracking-[0.18em] text-slate-400 ${isArabic ? "right-3" : "left-3"}`}>
        {currencyLabel}
      </span>
      <input
        type="number"
        min="0"
        step="100"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`font-numeric w-full rounded-md border border-gray-200 py-2 text-sm text-slate-700 outline-none transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
          isArabic ? "pr-14 pl-3 text-right" : "pl-14 pr-3 text-left"
        }`}
      />
    </label>
  );
}

function CommissionInput({
  locale,
  value,
  onChange,
}: {
  locale: Locale;
  value: number;
  onChange: (value: string) => void;
}) {
  const isArabic = locale === "ar";

  return (
    <label className="relative block">
      <input
        type="number"
        min="0"
        step="0.5"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`font-numeric w-full rounded-md border border-gray-200 py-2 text-sm text-slate-700 outline-none transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
          isArabic ? "pr-3 pl-8 text-right" : "pl-3 pr-8 text-left"
        }`}
      />
      <span className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-sm text-slate-400 ${isArabic ? "left-3" : "right-3"}`}>%</span>
    </label>
  );
}

function IconShell({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 6.5C5 5.11929 6.11929 4 7.5 4H16.5C17.8807 4 19 5.11929 19 6.5V17.5C19 18.8807 17.8807 20 16.5 20H7.5C6.11929 20 5 18.8807 5 17.5V6.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8.5H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 12H13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 15.5H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path d="M3 10.5L12 3L21 10.5" />
      <path d="M6.5 9.5V20H17.5V9.5" />
    </IconShell>
  );
}

function WalletIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path d="M4 7.5C4 6.11929 5.11929 5 6.5 5H18C19.1046 5 20 5.89543 20 7V17C20 18.1046 19.1046 19 18 19H6.5C5.11929 19 4 17.8807 4 16.5V7.5Z" />
      <path d="M4 8H17.5" />
      <path d="M16 13H18.5" />
    </IconShell>
  );
}

function TeamIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path d="M16.5 20V18.5C16.5 16.567 14.933 15 13 15H8C6.067 15 4.5 16.567 4.5 18.5V20" />
      <path d="M10.5 11C12.433 11 14 9.433 14 7.5C14 5.567 12.433 4 10.5 4C8.567 4 7 5.567 7 7.5C7 9.433 8.567 11 10.5 11Z" />
      <path d="M16 8.5C17.6569 8.5 19 9.84315 19 11.5C19 13.1569 17.6569 14.5 16 14.5" />
    </IconShell>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path d="M5 19.5H19" />
      <path d="M7.5 16V10.5" />
      <path d="M12 16V7" />
      <path d="M16.5 16V12.5" />
    </IconShell>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20L15.2 15.2" />
    </IconShell>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12H21" />
      <path d="M12 3C14.5 5.7 16 8.8 16 12C16 15.2 14.5 18.3 12 21" />
      <path d="M12 3C9.5 5.7 8 8.8 8 12C8 15.2 9.5 18.3 12 21" />
    </IconShell>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path d="M6 9.5C6 6.46243 8.46243 4 11.5 4V4C14.5376 4 17 6.46243 17 9.5V12.5C17 13.1144 17.2115 13.7101 17.599 14.1868L19 15.9H4L5.40102 14.1868C5.78845 13.7101 6 13.1144 6 12.5V9.5Z" />
      <path d="M10 19C10.3826 19.6215 10.9907 20 11.6667 20C12.3426 20 12.9508 19.6215 13.3333 19" />
    </IconShell>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path d="M12 3L13.95 8.05L19 10L13.95 11.95L12 17L10.05 11.95L5 10L10.05 8.05L12 3Z" />
    </IconShell>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path d="M5 12.5L9.5 17L19 7.5" />
    </IconShell>
  );
}
