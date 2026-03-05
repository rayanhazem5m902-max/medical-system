export type Lang = 'ar' | 'en';

export type TranslationKey =
    | 'sidebar_home'
    | 'sidebar_hospital'
    | 'sidebar_users'
    | 'sidebar_settings'
    | 'search_placeholder'
    | 'user_name'
    | 'user_role';

export const translations: Record<Lang, Record<string, string>> = {
    ar: {
        sidebar_home: 'الرئيسية',
        sidebar_hospital: 'المستشفى',
        sidebar_users: 'المستخدمين',
        sidebar_settings: 'الإعدادات',
        search_placeholder: 'بحث سريع...',
        user_name: 'أحمد محمد',
        user_role: 'مدير النظام',
    },
    en: {
        sidebar_home: 'Home',
        sidebar_hospital: 'Hospital',
        sidebar_users: 'Users',
        sidebar_settings: 'Settings',
        search_placeholder: 'Quick search...',
        user_name: 'Ahmed Mohamed',
        user_role: 'System Administrator',
    }
};
