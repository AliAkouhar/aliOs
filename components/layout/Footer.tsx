'use client';

import { useUptime } from '@/hooks/useUptime';

interface FooterProps {
    className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
    const uptime = useUptime();

    return (
        <footer
            className={`h-8 flex items-center justify-between px-4 glass-heavy border-t border-[var(--sys-border)] text-xs pointer-events-auto ${className}`}
        >
            {/* Left: User info */}
            <div className="flex items-center gap-4">
                <span>
                    <span className="text-[var(--sys-text-dim)]">USER:</span>{' '}
                    <span className="text-[var(--sys-accent)]">akouhar_ali</span>
                </span>
                <span className="text-[var(--sys-text-dim)]">|</span>
                <span>
                    <span className="text-[var(--sys-text-dim)]">MODE:</span>{' '}
                    <span className="text-[var(--sys-text)]">interactive</span>
                </span>
            </div>

            {/* Right: Uptime */}
            <div className="flex items-center gap-2">
                <span className="text-[var(--sys-text-dim)]">UPTIME:</span>
                <span className="text-[var(--sys-accent)] font-mono">{uptime}</span>
            </div>
        </footer>
    );
}
