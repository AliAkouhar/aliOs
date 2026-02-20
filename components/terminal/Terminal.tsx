'use client';

import { useRef, useEffect, useState, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { useTerminalStore } from '@/stores/terminalStore';
import { executeCommand, getAutoComplete } from '@/lib/commands';

export default function Terminal() {
    const { history } = useTerminalStore();
    const [input, setInput] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const historyEndRef = useRef<HTMLDivElement>(null);

    // Focus input on mount and clicks
    useEffect(() => {
        inputRef.current?.focus();

        // Show help command on first load if history is empty
        // Use getState() to access current state directly, avoiding stale closures in StrictMode
        if (useTerminalStore.getState().history.length === 0) {
            executeCommand('help');
        }
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Cursor blink
    useEffect(() => {
        const interval = setInterval(() => setShowCursor((v) => !v), 530);
        return () => clearInterval(interval);
    }, []);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeCommand(input);
            setInput('');
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const completed = getAutoComplete(input);
            if (completed) setInput(completed);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = useTerminalStore.getState().navigateHistory('up');
            if (prev) setInput(prev);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = useTerminalStore.getState().navigateHistory('down');
            setInput(next);
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            useTerminalStore.getState().clearHistory();
        }
    };

    const handleClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div
            className="h-full flex flex-col overflow-hidden font-mono text-sm cursor-text pointer-events-auto"
            onClick={handleClick}
            style={{
                background: 'rgba(26, 15, 36, 0.85)',
                backdropFilter: 'blur(10px)',
            }}
        >
            {/* Terminal header */}
            <div className="px-4 py-2 border-b border-[var(--sys-border)] flex items-center gap-2">
                <span className="text-[var(--sys-accent)] glow-text text-xs">TERMINAL</span>
                <span className="text-[var(--sys-text-dim)] text-xs">– bash</span>
            </div>

            {/* History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {history.map((entry) => (
                    <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.1 }}
                        className={`whitespace-pre-wrap break-all ${entry.type === 'input'
                            ? 'text-[var(--sys-accent)]'
                            : entry.type === 'error'
                                ? 'text-[var(--sys-warning)]'
                                : entry.type === 'system'
                                    ? 'text-[var(--sys-accent)] opacity-80'
                                    : 'text-[var(--sys-text)]'
                            }`}
                    >
                        {entry.content}
                    </motion.div>
                ))}
                <div ref={historyEndRef} />
            </div>

            {/* Input line */}
            <div className="px-4 py-3 border-t border-[var(--sys-border)] flex items-center gap-2">
                <span className="text-[var(--sys-accent)] pulse-glow">&gt;</span>
                <div className="flex-1 relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent border-none outline-none text-[var(--sys-text)] caret-transparent"
                        spellCheck={false}
                        autoComplete="off"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    {/* Custom cursor */}
                    <span
                        className="absolute top-0 pointer-events-none text-[var(--sys-text)]"
                        style={{ left: `${input.length * 0.6}em` }}
                    >
                        {isFocused && showCursor && (
                            <span
                                className="inline-block w-2 h-4 align-middle"
                                style={{ backgroundColor: 'var(--sys-accent)' }}
                            />
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}
