'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOOT_MESSAGES, GREETINGS } from '@/lib/constants';
import { useThemeStore } from '@/stores/themeStore';

// Dynamically import Antigravity to avoid SSR issues with Three.js
const Antigravity = dynamic(() => import('@/components/particles/Antigravity'), {
    ssr: false,
});

const THEME_COLORS: Record<string, string> = {
    cosmic: '#7b3fff',
    matrix: '#00aa44',
    cyberpunk: '#ff0088',
};

interface BootSequenceProps {
    onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    const { theme } = useThemeStore();
    const particleColor = useMemo(() => THEME_COLORS[theme] || THEME_COLORS.cosmic, [theme]);

    // Memoize to prevent re-creation on each render
    const allMessages = useMemo(() => {
        const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
        return [...BOOT_MESSAGES, `> ${greeting}`];
    }, []);

    const skip = useCallback(() => {
        if (!isComplete) {
            setIsComplete(true);
            setTimeout(onComplete, 300);
        }
    }, [isComplete, onComplete]);

    // Handle skip on any key or click
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
                skip();
            }
        };
        const handleClick = () => skip();

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleClick);
        };
    }, [skip]);

    // Typing animation
    useEffect(() => {
        if (isComplete) return;

        if (currentLineIndex >= allMessages.length) {
            setTimeout(() => {
                setIsComplete(true);
                setTimeout(onComplete, 500);
            }, 800);
            return;
        }

        const currentLine = allMessages[currentLineIndex];

        if (currentCharIndex < currentLine.length) {
            const timeout = setTimeout(() => {
                setCurrentCharIndex((prev) => prev + 1);
            }, 30 + Math.random() * 20);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setDisplayedLines((prev) => [...prev, currentLine]);
                setCurrentLineIndex((prev) => prev + 1);
                setCurrentCharIndex(0);
            }, 150);
            return () => clearTimeout(timeout);
        }
    }, [currentLineIndex, currentCharIndex, isComplete, allMessages, onComplete]);

    // Cursor blink
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const currentlyTyping = !isComplete && currentLineIndex < allMessages.length
        ? allMessages[currentLineIndex].slice(0, currentCharIndex)
        : '';

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 bg-[#0d0711] z-50 flex flex-col justify-center items-start p-8 md:p-16"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Antigravity Background */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <Antigravity
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
                    </div>

                    <div className="max-w-3xl font-mono text-sm md:text-base relative z-10">
                        {/* Completed lines */}
                        {displayedLines.map((line, i) => (
                            <motion.div
                                key={i}
                                className="text-white mb-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    color: line.includes('Welcome') || line.includes('help')
                                        ? 'var(--sys-accent)'
                                        : 'var(--sys-text)',
                                    textShadow: line.includes('Welcome')
                                        ? '0 0 10px var(--sys-accent)'
                                        : 'none',
                                }}
                            >
                                {line}
                            </motion.div>
                        ))}

                        {/* Currently typing line */}
                        {currentlyTyping && (
                            <div className="text-white mb-1">
                                <span
                                    style={{
                                        color: currentlyTyping.includes('Welcome') || currentlyTyping.includes('help')
                                            ? 'var(--sys-accent)'
                                            : 'var(--sys-text)',
                                    }}
                                >
                                    {currentlyTyping}
                                </span>
                                <span
                                    className="inline-block w-2 h-4 ml-0.5 align-middle"
                                    style={{
                                        backgroundColor: showCursor ? 'var(--sys-accent)' : 'transparent',
                                    }}
                                />
                            </div>
                        )}

                        {/* Static cursor when done typing current line */}
                        {!currentlyTyping && currentLineIndex >= allMessages.length && (
                            <div className="flex items-center text-white">
                                <span className="text-[var(--sys-accent)]">&gt; </span>
                                <span
                                    className="inline-block w-2 h-4 ml-0.5"
                                    style={{
                                        backgroundColor: showCursor ? 'var(--sys-accent)' : 'transparent',
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Skip hint */}
                    <motion.div
                        className="absolute bottom-8 right-8 text-xs text-[var(--sys-text-dim)] z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 1 }}
                    >
                        Press space to skip
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
