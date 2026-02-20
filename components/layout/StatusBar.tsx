'use client';

import Image from 'next/image';
import { useTerminalStore } from '@/stores/terminalStore';

interface StatusBarProps {
    className?: string;
}

export default function StatusBar({ className = '' }: StatusBarProps) {
    const { currentProcess } = useTerminalStore();

    return (
        <header
            className={`h-10 flex items-center justify-between px-4 glass-heavy border-b border-[var(--sys-border)] pointer-events-auto ${className}`}
        >
            {/* Left: Logo and Avatar */}
            <div className="flex items-center gap-3 text-sm">
                {/* Mini Profile Avatar */}
                <div
                    className="w-6 h-6 rounded-full overflow-hidden shrink-0"
                    style={{
                        border: '1.5px solid var(--sys-accent)',
                        boxShadow: '0 0 8px rgba(183, 127, 255, 0.5)',
                    }}
                >
                    <Image
                        src="/profile.jpeg"
                        alt="Ali Akouhar"
                        width={24}
                        height={24}
                        className="object-cover w-full h-full"
                    />
                </div>

                <span className="text-[var(--sys-accent)] font-semibold glow-text">AliOS</span>
                <span className="text-[var(--sys-text-dim)]">|</span>
                <span className="text-[var(--sys-text)]">
                    <span className="text-[var(--sys-text-dim)]">proc:</span> {currentProcess}
                </span>
                <span className="text-[var(--sys-text-dim)]">|</span>
                <span className="text-[var(--sys-text)]">
                    <span className="text-[var(--sys-text-dim)]">mode:</span> interactive
                </span>
            </div>

            {/* Right: Window controls (decorative) */}
            <div className="flex items-center gap-2">
                <button className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors" />
                <button className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors" />
                <button className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors" />
            </div>
        </header>
    );
}
