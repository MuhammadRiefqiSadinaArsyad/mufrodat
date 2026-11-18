import './globals.css';
import { AppProvider } from '@/context/AppProvider';
import AppShell from '@/components/AppShell';

export const metadata = {
  title: 'Al-Mufradat — Media Pembelajaran Kosakata Bahasa Arab',
  description:
    'Belajar, menghafal, dan menguji kosakata Bahasa Arab dengan flashcard, kuis, permainan, dan pengulangan berjarak.'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#1F5C47'
};

const themeScript = `(function(){try{var t=localStorage.getItem('almufradat_theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="id" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Scheherazade+New:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
