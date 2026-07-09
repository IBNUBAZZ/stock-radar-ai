import { useLanguage } from '../hooks/use-language';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ha' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
    >
      {t('toggle.language')}
    </button>
  );
}
