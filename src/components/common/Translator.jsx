import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Translator = ({ setLocale, locale }) => {
  const router = useRouter();

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'np' : 'en';
    setLocale(newLocale);
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  useEffect(() => {
    const handleRouteChange = (url, { locale }) => {
      setLocale(locale);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, setLocale]);

  return (
    <button onClick={switchLanguage}>
      {locale === 'en' ? 'NEP' : 'ENG'}
    </button>
  );
};

export default Translator;
