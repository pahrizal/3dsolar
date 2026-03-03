'use client';

import dynamic from 'next/dynamic';

const SolarSystem = dynamic(
  () => import('../components/SolarSystem').then((mod) => mod.SolarSystem),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden">
      <SolarSystem />
    </main>
  );
}
