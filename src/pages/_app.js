import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AuthLayout from '../components/layouts/AuthLayout';
import AdminLayout from '../components/layouts/admin/AdminLayout';
import { IntlProvider } from 'next-intl';
import '@/assets/css/globals.css';
import { fetchLocalStorage } from '../utils/helper';
import { LanguageProvider } from '../context/LanguageContext';
import { SearchContextProvider } from '../context/SearchContext';
import { authRoutes, adminRoutes } from '@/config/route.js';

function App({ Component, pageProps }) {
  const router = useRouter();
  const [locale, setLocale] = useState('en');
  const [messages, setMessages] = useState({});

  const getLayout = () => {
    if (authRoutes.includes(router.pathname)) return AuthLayout;
    if (adminRoutes.includes(router.pathname)) return AdminLayout;
    const DefaultLayout = ({ children }) => <>{children}</>;
    DefaultLayout.displayName = "DefaultLayout";
    return DefaultLayout;
  };

  useEffect(() => {
    // Fetch messages for current locale
    const loadMessages = async () => {
      try {
        const data = await import(`@/locales/${locale}/common.json`);
        setMessages(data.default);
      } catch (error) {
        console.error("Error loading messages:", error);
        setMessages({}); // Fallback to an empty message set
      }
    };
    loadMessages();
  }, [locale]);

  useEffect(() => {
    // Initialize locale
    const savedLocale = localStorage.getItem('locale');
    setLocale(savedLocale || router.locale || 'en');
  }, [router.locale]);

  useEffect(() => {
    // Handle authentication redirection
    const accessToken = fetchLocalStorage('access');
    if (authRoutes.includes(router.pathname) && accessToken) {
      router.replace('/admin/dashboard');
    } else if (adminRoutes.includes(router.pathname) && !accessToken) {
      router.replace('/auth/login');
    }
  }, [router.pathname]);

  const Layout = getLayout();

  return (
    <LanguageProvider>
      <SearchContextProvider>
        <IntlProvider locale={locale} messages={messages}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </IntlProvider>
      </SearchContextProvider>
    </LanguageProvider>
  );
}

export default App;
