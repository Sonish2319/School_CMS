import { useCompanyInfo } from '@/hooks/useCompanyInfo';

export default function Footer() {
  const { companyName } = useCompanyInfo();

  return (
    <footer className="bg-gray-200 py-4 text-center shadow-inner">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} {companyName}. All rights reserved.
      </p>
    </footer>
  );
}
