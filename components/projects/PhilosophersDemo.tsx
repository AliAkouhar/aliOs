'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type PhilosopherState = 'thinking' | 'hungry' | 'eating';

interface Philosopher {
    id: number;
    state: PhilosopherState;
    angle: number;
}

interface Fork {
    id: number;
    inUse: boolean;
    angle: number;
}

const stateColors: Record<PhilosopherState, string> = {
    thinking: '#44aaff',
    hungry: '#ffaa00',
    eating: '#00ff88',
};

const stateEmoji: Record<PhilosopherState, string> = {
    thinking: '💭',
    hungry: '😋',
    eating: '🍝',
};

export default function PhilosophersDemo() {
    const numPhilosophers = 5;
    const centerX = 100;
    const centerY = 90;
    const radius = 55;

    const [philosophers, setPhilosophers] = useState<Philosopher[]>(
        Array.from({ length: numPhilosophers }, (_, i) => ({
            id: i,
            state: 'thinking' as PhilosopherState,
            angle: (i * 2 * Math.PI) / numPhilosophers - Math.PI / 2,
        }))
    );

    const [forks, setForks] = useState<Fork[]>(
        Array.from({ length: numPhilosophers }, (_, i) => ({
            id: i,
            inUse: false,
            angle: ((i + 0.5) * 2 * Math.PI) / numPhilosophers - Math.PI / 2,
        }))
    );

    // Simulation loop
    useEffect(() => {
        const interval = setInterval(() => {
            setPhilosophers((prev) => {
                const newPhilosophers = [...prev];
                const newForks = [...forks];

                // Pick a random philosopher to change state
                const idx = Math.floor(Math.random() * numPhilosophers);
                const phil = newPhilosophers[idx];
                const leftFork = idx;
                const rightFork = (idx + 1) % numPhilosophers;

                if (phil.state === 'thinking') {
                    // Try to become hungry
                    newPhilosophers[idx] = { ...phil, state: 'hungry' };
                } else if (phil.state === 'hungry') {
                    // Try to eat if both forks available
                    if (!newForks[leftFork].inUse && !newForks[rightFork].inUse) {
                        newForks[leftFork].inUse = true;
                        newForks[rightFork].inUse = true;
                        newPhilosophers[idx] = { ...phil, state: 'eating' };
                        setForks(newForks);
                    }
                } else if (phil.state === 'eating') {
                    // Done eating, release forks
                    newForks[leftFork].inUse = false;
                    newForks[rightFork].inUse = false;
                    newPhilosophers[idx] = { ...phil, state: 'thinking' };
                    setForks(newForks);
                }

                return newPhilosophers;
            });
        }, 600);

        return () => clearInterval(interval);
    }, [forks]);

    return (
        <div className="h-full flex flex-col">
            <div className="mb-2 text-xs text-[var(--sys-text-dim)]">
                Dining Philosophers Problem
            </div>

            <div
                className="flex-1 relative rounded-lg overflow-hidden flex items-center justify-center"
                style={{ background: 'rgba(13, 7, 17, 0.8)' }}
            >
                <div className="relative w-[200px] h-[180px]">
                    {/* Table */}
                    <div
                        className="absolute rounded-full border-2 border-[var(--sys-border)]"
                        style={{
                            left: centerX - 35,
                            top: centerY - 35,
                            width: 70,
                            height: 70,
                        }}
                    />

                    {/* Forks */}
                    {forks.map((fork) => {
                        const forkRadius = radius * 0.5;
                        const x = centerX + Math.cos(fork.angle) * forkRadius;
                        const y = centerY + Math.sin(fork.angle) * forkRadius;

                        return (
                            <motion.div
                                key={`fork-${fork.id}`}
                                className="absolute text-sm"
                                style={{
                                    left: x - 8,
                                    top: y - 8,
                                }}
                                animate={{
                                    opacity: fork.inUse ? 0.3 : 1,
                                    scale: fork.inUse ? 0.7 : 1,
                                }}
                            >
                                🍴
                            </motion.div>
                        );
                    })}

                    {/* Philosophers */}
                    {philosophers.map((phil) => {
                        const x = centerX + Math.cos(phil.angle) * radius;
                        const y = centerY + Math.sin(phil.angle) * radius;

                        return (
                            <motion.div
                                key={`phil-${phil.id}`}
                                className="absolute flex flex-col items-center"
                                style={{
                                    left: x - 20,
                                    top: y - 20,
                                }}
                                animate={{
                                    scale: phil.state === 'eating' ? 1.1 : 1,
                                }}
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                                    style={{
                                        background: `${stateColors[phil.state]}30`,
                                        border: `2px solid ${stateColors[phil.state]}`,
                                        boxShadow: `0 0 10px ${stateColors[phil.state]}50`,
                                    }}
                                >
                                    {stateEmoji[phil.state]}
                                </div>
                                <span className="text-[8px] text-[var(--sys-text-dim)] mt-1">
                                    P{phil.id}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-2 flex justify-center gap-3 text-[10px]">
                {Object.entries(stateColors).map(([state, color]) => (
                    <div key={state} className="flex items-center gap-1">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: color }}
                        />
                        <span className="text-[var(--sys-text-dim)]">{state}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
