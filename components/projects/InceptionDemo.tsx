'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Container {
    name: string;
    color: string;
    status: 'running' | 'starting';
    x: number;
    y: number;
}

interface Packet {
    id: number;
    from: number;
    to: number;
    progress: number;
}

export default function InceptionDemo() {
    const [containers] = useState<Container[]>([
        { name: 'nginx', color: '#00aa44', status: 'running', x: 50, y: 30 },
        { name: 'wordpress', color: '#2196f3', status: 'running', x: 130, y: 100 },
        { name: 'mariadb', color: '#ff9800', status: 'running', x: 50, y: 170 },
    ]);

    const [packets, setPackets] = useState<Packet[]>([]);

    // Animate packets
    useEffect(() => {
        const interval = setInterval(() => {
            setPackets((prev) => {
                // Add new packet
                const connections = [
                    { from: 0, to: 1 },
                    { from: 1, to: 2 },
                    { from: 2, to: 1 },
                    { from: 1, to: 0 },
                ];
                const conn = connections[Math.floor(Math.random() * connections.length)];
                const newPacket = {
                    id: Date.now(),
                    from: conn.from,
                    to: conn.to,
                    progress: 0,
                };

                // Update existing packets
                const updated = prev
                    .map((p) => ({ ...p, progress: p.progress + 0.1 }))
                    .filter((p) => p.progress <= 1);

                return [...updated, newPacket];
            });
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full flex flex-col">
            <div className="mb-2 text-xs text-[var(--sys-text-dim)]">
                Docker Container Orchestration
            </div>

            <div
                className="flex-1 relative rounded-lg overflow-hidden flex items-center justify-center"
                style={{ background: 'rgba(13, 7, 17, 0.8)' }}
            >
                <div className="relative w-[250px] h-[220px]">
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full">
                        {/* nginx -> wordpress */}
                        <line
                            x1="90" y1="55"
                            x2="130" y2="95"
                            stroke="rgba(183, 127, 255, 0.3)"
                            strokeWidth="2"
                            strokeDasharray="4"
                        />
                        {/* wordpress -> mariadb */}
                        <line
                            x1="130" y1="130"
                            x2="90" y2="165"
                            stroke="rgba(183, 127, 255, 0.3)"
                            strokeWidth="2"
                            strokeDasharray="4"
                        />
                    </svg>

                    {/* Packets */}
                    {packets.map((packet) => {
                        const from = containers[packet.from];
                        const to = containers[packet.to];
                        const x = from.x + (to.x - from.x) * packet.progress + 20;
                        const y = from.y + (to.y - from.y) * packet.progress + 15;

                        return (
                            <motion.div
                                key={packet.id}
                                className="absolute w-2 h-2 rounded-full"
                                style={{
                                    left: x,
                                    top: y,
                                    background: 'var(--sys-accent)',
                                    boxShadow: '0 0 8px var(--sys-accent)',
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            />
                        );
                    })}

                    {/* Containers */}
                    {containers.map((container, i) => (
                        <motion.div
                            key={container.name}
                            className="absolute p-3 rounded-lg"
                            style={{
                                left: container.x,
                                top: container.y,
                                background: 'rgba(26, 15, 36, 0.9)',
                                border: `2px solid ${container.color}`,
                                boxShadow: `0 0 15px ${container.color}40`,
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <div className="flex items-center gap-2 text-xs">
                                <motion.span
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: container.color }}
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                                <span className="text-[var(--sys-text)] font-medium">{container.name}</span>
                            </div>
                            <div className="text-[10px] text-[var(--sys-text-dim)] mt-1">
                                {container.status}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-2 flex justify-center gap-4 text-xs">
                {containers.map((c) => (
                    <div key={c.name} className="flex items-center gap-1">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: c.color }}
                        />
                        <span className="text-[var(--sys-text-dim)]">{c.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
