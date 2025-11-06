import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AuthLayout from '../components/layouts/AuthLayout';
import AdminLayout from '../components/layouts/admin/AdminLayout';
import '@/assets/css/globals.css';
import { fetchLocalStorage } from '../utils/helper';
import { SearchContextProvider } from '../context/SearchContext';
import { authRoutes, adminRoutes } from '@/config/route.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App({ Component, pageProps }) {
  const router = useRouter();

  const getLayout = () => {
    if (authRoutes.includes(router.pathname)) return AuthLayout;
    if (adminRoutes.includes(router.pathname)) return AdminLayout;
    const DefaultLayout = ({ children }) => <>{children}</>;
    DefaultLayout.displayName = "DefaultLayout";
    return DefaultLayout;
  };

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
    <SearchContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SearchContextProvider>
  );
}

export default App;
