'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useMemo } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import BootSequence from '@/components/boot/BootSequence';
import StatusBar from '@/components/layout/StatusBar';
import Footer from '@/components/layout/Footer';
import Terminal from '@/components/terminal/Terminal';
import Workspace from '@/components/workspace/Workspace';

// Dynamically import Antigravity to avoid SSR issues with Three.js
const Antigravity = dynamic(() => import('@/components/particles/Antigravity'), {
  ssr: false,
});

const THEME_COLORS: Record<string, string> = {
  cosmic: '#b77fff',
  matrix: '#00ff88',
  cyberpunk: '#ff44aa',
};

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme } = useThemeStore();

  const particleColor = useMemo(() => THEME_COLORS[theme] || THEME_COLORS.cosmic, [theme]);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme class to document
  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.remove('theme-cosmic', 'theme-matrix', 'theme-cyberpunk');
      if (theme !== 'cosmic') {
        document.documentElement.classList.add(`theme-${theme}`);
      }
    }
  }, [theme, mounted]);

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[var(--sys-bg)]" />
    );
  }

  // Boot sequence
  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-[var(--sys-bg)] flex flex-col">
      {/* Antigravity Background */}
      <Antigravity
        className="fixed inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
        count={300}
        magnetRadius={6}
        ringRadius={7}
        waveSpeed={0.4}
        waveAmplitude={1}
        particleSize={1.5}
        lerpSpeed={0.05}
        color={particleColor}
        autoAnimate
        particleVariance={1}
        rotationSpeed={0}
        depthFactor={1}
        pulseSpeed={3}
        particleShape="capsule"
        fieldStrength={10}
      />

      {/* Status Bar */}
      <StatusBar />

      {/* Main Content Area */}
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative z-10 pointer-events-none">
        {/* Terminal Panel */}
        <div className="w-[35%] min-w-[300px] max-w-[450px] border-r border-[var(--sys-border)] flex-shrink-0">
          <Terminal />
        </div>

        {/* Workspace */}
        <div className="flex-1 relative">
          <Workspace />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
