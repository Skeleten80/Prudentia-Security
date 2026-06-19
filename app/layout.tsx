import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Prudentia Shield', description: 'Cybersecurity dashboard for Ontario small businesses, by Nessalk Industries' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang='en'><body>{children}</body></html>;
}
