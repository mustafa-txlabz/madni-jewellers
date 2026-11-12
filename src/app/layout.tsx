import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { ToastContainer } from '@/components/ui/Toast';
import { LoginPromptModal } from '@/components/ui/LoginPromptModal';
import { PrototypeBar } from '@/components/layout/PrototypeBar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Madni Jeweller | Fine Gold & Diamond Jewellery',
  description: 'Handcrafted gold and diamond jewellery for life’s most precious moments. Handcrafted in Pakistan with certified purity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#FAF6EE] text-[#1C1917] antialiased selection:bg-[#B8893B]/20 selection:text-[#0E3B2E]">
        <AppProvider>
          {children}
          <LoginPromptModal />
          <ToastContainer />
          <PrototypeBar />
        </AppProvider>
      </body>
    </html>
  );
}

