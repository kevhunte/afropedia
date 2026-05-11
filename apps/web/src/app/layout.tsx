import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Afropedia',
  description: 'The free encyclopedia of the African diaspora',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
