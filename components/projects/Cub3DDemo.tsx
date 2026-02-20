'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cub3DDemo() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [playerPos, setPlayerPos] = useState({ x: 100, y: 100 });
    const [playerAngle, setPlayerAngle] = useState(0);

    // Simple raycasting visualization
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const map = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];

        const cellSize = 20;
        const numRays = 30;
        const fov = Math.PI / 3;

        let angle = 0;
        let animationId: number;

        const draw = () => {
            ctx.fillStyle = '#0d0711';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw map
            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[y].length; x++) {
                    if (map[y][x] === 1) {
                        ctx.fillStyle = 'rgba(183, 127, 255, 0.3)';
                        ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
                    }
                }
            }

            // Update player position in circular motion
            const centerX = 80;
            const centerY = 80;
            const radius = 30;
            angle += 0.02;

            const px = centerX + Math.cos(angle) * radius;
            const py = centerY + Math.sin(angle) * radius;
            const pAngle = angle + Math.PI / 2;

            setPlayerPos({ x: px, y: py });
            setPlayerAngle(pAngle);

            // Cast rays
            for (let i = 0; i < numRays; i++) {
                const rayAngle = pAngle - fov / 2 + (i / numRays) * fov;
                const rayDirX = Math.cos(rayAngle);
                const rayDirY = Math.sin(rayAngle);

                // Simple DDA raycasting
                let rayX = px;
                let rayY = py;
                let hit = false;
                let dist = 0;

                while (!hit && dist < 200) {
                    rayX += rayDirX * 2;
                    rayY += rayDirY * 2;
                    dist += 2;

                    const mapX = Math.floor(rayX / cellSize);
                    const mapY = Math.floor(rayY / cellSize);

                    if (mapX >= 0 && mapX < 8 && mapY >= 0 && mapY < 8) {
                        if (map[mapY][mapX] === 1) {
                            hit = true;
                        }
                    }
                }

                // Draw ray with gradient
                const gradient = ctx.createLinearGradient(px, py, rayX, rayY);
                gradient.addColorStop(0, 'rgba(183, 127, 255, 0.8)');
                gradient.addColorStop(1, 'rgba(183, 127, 255, 0.1)');

                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(rayX, rayY);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Draw player
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#b77fff';
            ctx.shadowColor = '#b77fff';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div className="h-full flex flex-col">
            <div className="mb-2 text-xs text-[var(--sys-text-dim)]">
                Raycasting Engine Demo
            </div>
            <div className="flex-1 flex items-center justify-center rounded-lg overflow-hidden"
                style={{ background: 'rgba(13, 7, 17, 0.8)' }}>
                <canvas
                    ref={canvasRef}
                    width={160}
                    height={160}
                    className="rounded"
                />
            </div>
            <motion.div
                className="mt-2 text-xs text-center text-[var(--sys-accent)]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Player moving • Rays casting
            </motion.div>
        </div>
    );
}
