'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppProvider';
import Icon from './Icon';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/materi', label: 'Mufradat' },
  { href: '/latihan', label: 'Latihan' },
  { href: '/panduan', label: 'Panduan' }
];

export default function Navbar() {
  const { session, logout } = useApp();
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/login') return null;

  const doLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <header className="top">
      <div className="top-inner container">
        <Link href="/" className="brand" aria-label="Al-Mufradat, beranda">
          <span className="brand-mark">
            <span />
            <span />
          </span>
          <span className="brand-text">
            <strong>Al-Mufradat</strong>
            <small>Kosakata Arab untuk pemula</small>
          </span>
        </Link>

        <nav className="desk-nav" aria-label="Navigasi utama">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`desk-link ${
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href) ? 'active' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="top-actions">
          <ThemeToggle />
          {session ? (
            <div className="user-chip">
              <span className="user-avatar">{session.username.charAt(0).toUpperCase()}</span>
              <span className="user-name">{session.username}</span>
              <button type="button" className="logout-btn" onClick={doLogout} title="Keluar" aria-label="Keluar">
                <Icon name="logout" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
