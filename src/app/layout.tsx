import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '3D Solar System Explorer',
  description: 'Interactive 3D visualization of our solar system with realistic orbital mechanics and planetary data',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
