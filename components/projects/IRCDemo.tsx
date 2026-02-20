'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Client {
    id: number;
    name: string;
    angle: number;
    connected: boolean;
}

interface Message {
    id: number;
    from: number;
    to: number;
    progress: number;
    text: string;
}

const clientNames = ['alice', 'bob', 'charlie', 'dave'];
const sampleMessages = ['Hello!', 'Hi there', 'How are you?', 'Good!', ':)', 'lol'];

export default function IRCDemo() {
    const centerX = 100;
    const centerY = 90;
    const radius = 65;

    const [clients, setClients] = useState<Client[]>(
        clientNames.map((name, i) => ({
            id: i,
            name,
            angle: (i * 2 * Math.PI) / clientNames.length - Math.PI / 2,
            connected: true,
        }))
    );

    const [messages, setMessages] = useState<Message[]>([]);
    const [serverActivity, setServerActivity] = useState(false);

    // Simulate messages
    useEffect(() => {
        const interval = setInterval(() => {
            const connectedClients = clients.filter((c) => c.connected);
            if (connectedClients.length < 2) return;

            const fromIdx = Math.floor(Math.random() * connectedClients.length);
            let toIdx = Math.floor(Math.random() * connectedClients.length);
            while (toIdx === fromIdx) {
                toIdx = Math.floor(Math.random() * connectedClients.length);
            }

            const newMessage: Message = {
                id: Date.now(),
                from: connectedClients[fromIdx].id,
                to: connectedClients[toIdx].id,
                progress: 0,
                text: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
            };

            setMessages((prev) => [...prev, newMessage]);
            setServerActivity(true);
            setTimeout(() => setServerActivity(false), 200);
        }, 1500);

        return () => clearInterval(interval);
    }, [clients]);

    // Animate messages
    useEffect(() => {
        const interval = setInterval(() => {
            setMessages((prev) =>
                prev
                    .map((m) => ({ ...m, progress: m.progress + 0.08 }))
                    .filter((m) => m.progress <= 2)
            );
        }, 50);

        return () => clearInterval(interval);
    }, []);

    // Toggle client connection
    const toggleClient = (id: number) => {
        setClients((prev) =>
            prev.map((c) => (c.id === id ? { ...c, connected: !c.connected } : c))
        );
    };

    return (
        <div className="h-full flex flex-col">
            <div className="mb-2 text-xs text-[var(--sys-text-dim)]">
                IRC Server Visualization
            </div>

            <div
                className="flex-1 relative rounded-lg overflow-hidden flex items-center justify-center"
                style={{ background: 'rgba(13, 7, 17, 0.8)' }}
            >
                <div className="relative w-[200px] h-[180px]">
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full">
                        {clients.map((client) => {
                            if (!client.connected) return null;
                            const x = centerX + Math.cos(client.angle) * radius;
                            const y = centerY + Math.sin(client.angle) * radius;

                            return (
                                <motion.line
                                    key={`line-${client.id}`}
                                    x1={centerX}
                                    y1={centerY}
                                    x2={x}
                                    y2={y}
                                    stroke="rgba(183, 127, 255, 0.3)"
                                    strokeWidth="1"
                                    strokeDasharray="4"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                />
                            );
                        })}
                    </svg>

                    {/* Messages in flight */}
                    {messages.map((msg) => {
                        const fromClient = clients[msg.from];
                        const toClient = clients[msg.to];

                        if (!fromClient || !toClient) return null;

                        const fromX = centerX + Math.cos(fromClient.angle) * radius;
                        const fromY = centerY + Math.sin(fromClient.angle) * radius;
                        const toX = centerX + Math.cos(toClient.angle) * radius;
                        const toY = centerY + Math.sin(toClient.angle) * radius;

                        let x, y;
                        if (msg.progress <= 1) {
                            // Going to server
                            x = fromX + (centerX - fromX) * msg.progress;
                            y = fromY + (centerY - fromY) * msg.progress;
                        } else {
                            // Going to recipient
                            const p = msg.progress - 1;
                            x = centerX + (toX - centerX) * p;
                            y = centerY + (toY - centerY) * p;
                        }

                        return (
                            <motion.div
                                key={msg.id}
                                className="absolute px-1.5 py-0.5 rounded text-[8px] whitespace-nowrap"
                                style={{
                                    left: x - 15,
                                    top: y - 8,
                                    background: 'rgba(183, 127, 255, 0.8)',
                                    color: 'white',
                                    boxShadow: '0 0 8px var(--sys-accent)',
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                {msg.text}
                            </motion.div>
                        );
                    })}

                    {/* Server */}
                    <motion.div
                        className="absolute flex flex-col items-center justify-center rounded-lg"
                        style={{
                            left: centerX - 25,
                            top: centerY - 25,
                            width: 50,
                            height: 50,
                            background: 'rgba(26, 15, 36, 0.9)',
                            border: '2px solid var(--sys-accent)',
                            boxShadow: serverActivity
                                ? '0 0 20px var(--sys-accent)'
                                : '0 0 10px var(--sys-accent)50',
                        }}
                        animate={{
                            scale: serverActivity ? 1.1 : 1,
                        }}
                    >
                        <span className="text-lg">🖥️</span>
                        <span className="text-[8px] text-[var(--sys-text)]">SERVER</span>
                    </motion.div>

                    {/* Clients */}
                    {clients.map((client) => {
                        const x = centerX + Math.cos(client.angle) * radius;
                        const y = centerY + Math.sin(client.angle) * radius;

                        return (
                            <motion.button
                                key={client.id}
                                className="absolute flex flex-col items-center cursor-pointer"
                                style={{
                                    left: x - 20,
                                    top: y - 20,
                                }}
                                onClick={() => toggleClient(client.id)}
                                whileHover={{ scale: 1.1 }}
                            >
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                                    style={{
                                        background: client.connected
                                            ? 'rgba(0, 255, 136, 0.2)'
                                            : 'rgba(255, 68, 102, 0.2)',
                                        border: `2px solid ${client.connected ? '#00ff88' : '#ff4466'}`,
                                    }}
                                >
                                    {client.connected ? '👤' : '💤'}
                                </div>
                                <span className="text-[8px] text-[var(--sys-text-dim)] mt-0.5">
                                    {client.name}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            <p className="text-center text-[10px] text-[var(--sys-text-dim)] mt-2">
                Click clients to toggle connection
            </p>
        </div>
    );
}
