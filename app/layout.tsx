import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Prudentia Security', description: 'Prudentia Security by Nessalk Industries' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang='en'><body>{children}</body></html>;
}
