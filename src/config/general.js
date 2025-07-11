import { useTranslations } from 'next-intl';

export function useCompanyInfo() {
  const t = useTranslations('company');

  return {
    companyName: t('name', {
      default: process.env.COMPANY_NAME || 'शिक्षक सेवा आयोग',
    }),
    companyAddress: t('address', {
      default: process.env.COMPANY_ADDRESS || 'सानोठीमी, भक्तपुर, नेपाल',
    }),
  };
}
