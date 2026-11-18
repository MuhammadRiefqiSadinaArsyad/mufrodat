'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

const ITEMS = [
  { href: '/', label: 'Beranda', icon: 'home' },
  { href: '/materi', label: 'Mufradat', icon: 'book' },
  { href: '/latihan', label: 'Latihan', icon: 'cards' },
  { href: '/ulasan', label: 'Ulasan', icon: 'layers' },
  { href: '/panduan', label: 'Panduan', icon: 'info' }
];

export default function BottomNavigation() {
  const pathname = usePathname();
  return (
    <nav className="bn" aria-label="Navigasi bawah">
      {ITEMS.map((item) => {
        const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={`bn-item ${active ? 'active' : ''}`}>
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
