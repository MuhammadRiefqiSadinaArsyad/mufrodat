'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppProvider';
import BottomNavigation from './BottomNavigation';
import Navbar from './Navbar';
import Splash from './Splash';

export default function AppShell({ children }) {
  const { ready, session } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => setBooting(false), 650);
    return () => clearTimeout(timer);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    if (!session && pathname !== '/login') router.replace('/login');
    if (session && pathname === '/login') router.replace('/');
  }, [ready, session, pathname, router]);

  const isLogin = pathname === '/login';

  if (!ready || booting) return <Splash />;

  if (isLogin) return <>{children}</>;

  if (!session) return <Splash />;

  return (
    <>
      <Navbar />
      <main className="container app-main">{children}</main>
      <BottomNavigation />
    </>
  );
}
