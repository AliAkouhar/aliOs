'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function TranscendenceDemo() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState({ player: 0, ai: 0 });
    const [fps, setFps] = useState(60);
    const [isPlaying, setIsPlaying] = useState(true);

    const gameRef = useRef({
        paddleY: 70,
        aiPaddleY: 70,
        ballX: 100,
        ballY: 80,
        ballVX: 2,
        ballVY: 1.5,
        lastTime: performance.now(),
        frameCount: 0,
        fpsTime: performance.now(),
    });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const y = e.clientY - rect.top;
        gameRef.current.paddleY = Math.max(15, Math.min(145, y));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.addEventListener('mousemove', handleMouseMove);

        let animationId: number;
        const game = gameRef.current;

        const draw = () => {
            if (!isPlaying) return;

            const now = performance.now();
            game.frameCount++;

            if (now - game.fpsTime >= 1000) {
                setFps(game.frameCount);
                game.frameCount = 0;
                game.fpsTime = now;
            }

            // Clear
            ctx.fillStyle = '#0d0711';
            ctx.fillRect(0, 0, 200, 160);

            // Center line
            ctx.strokeStyle = 'rgba(183, 127, 255, 0.3)';
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(100, 0);
            ctx.lineTo(100, 160);
            ctx.stroke();
            ctx.setLineDash([]);

            // AI logic
            const aiSpeed = 2;
            const aiTarget = game.ballY;
            if (game.aiPaddleY < aiTarget - 5) {
                game.aiPaddleY += aiSpeed;
            } else if (game.aiPaddleY > aiTarget + 5) {
                game.aiPaddleY -= aiSpeed;
            }
            game.aiPaddleY = Math.max(15, Math.min(145, game.aiPaddleY));

            // Ball physics
            game.ballX += game.ballVX;
            game.ballY += game.ballVY;

            // Wall bounce
            if (game.ballY <= 5 || game.ballY >= 155) {
                game.ballVY = -game.ballVY;
            }

            // Paddle collision - Player
            if (
                game.ballX <= 15 &&
                game.ballY >= game.paddleY - 20 &&
                game.ballY <= game.paddleY + 20
            ) {
                game.ballVX = Math.abs(game.ballVX) * 1.05;
                game.ballVY += (game.ballY - game.paddleY) * 0.1;
            }

            // Paddle collision - AI
            if (
                game.ballX >= 185 &&
                game.ballY >= game.aiPaddleY - 20 &&
                game.ballY <= game.aiPaddleY + 20
            ) {
                game.ballVX = -Math.abs(game.ballVX) * 1.05;
                game.ballVY += (game.ballY - game.aiPaddleY) * 0.1;
            }

            // Score
            if (game.ballX < 0) {
                setScore((s) => ({ ...s, ai: s.ai + 1 }));
                game.ballX = 100;
                game.ballY = 80;
                game.ballVX = 2;
                game.ballVY = (Math.random() - 0.5) * 3;
            }
            if (game.ballX > 200) {
                setScore((s) => ({ ...s, player: s.player + 1 }));
                game.ballX = 100;
                game.ballY = 80;
                game.ballVX = -2;
                game.ballVY = (Math.random() - 0.5) * 3;
            }

            // Clamp ball speed
            game.ballVX = Math.max(-5, Math.min(5, game.ballVX));
            game.ballVY = Math.max(-4, Math.min(4, game.ballVY));

            // Draw paddles
            ctx.fillStyle = '#b77fff';
            ctx.shadowColor = '#b77fff';
            ctx.shadowBlur = 10;
            // Player paddle
            ctx.fillRect(5, game.paddleY - 20, 6, 40);
            // AI paddle
            ctx.fillRect(189, game.aiPaddleY - 20, 6, 40);
            ctx.shadowBlur = 0;

            // Draw ball
            ctx.beginPath();
            ctx.arc(game.ballX, game.ballY, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, [isPlaying, handleMouseMove]);

    return (
        <div className="h-full flex flex-col">
            <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-[var(--sys-text-dim)]">Pong Game Demo</span>
                <span className="text-[var(--sys-accent)]">FPS: {fps}</span>
            </div>

            <div
                className="flex-1 flex items-center justify-center rounded-lg overflow-hidden"
                style={{ background: 'rgba(13, 7, 17, 0.9)' }}
            >
                <canvas
                    ref={canvasRef}
                    width={200}
                    height={160}
                    className="cursor-none"
                />
            </div>

            {/* Score */}
            <div className="mt-2 flex justify-center items-center gap-4 text-sm">
                <div className="text-center">
                    <div className="text-[var(--sys-text-dim)] text-xs">YOU</div>
                    <motion.div
                        key={score.player}
                        className="text-[var(--sys-accent)] text-xl font-bold"
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                    >
                        {score.player}
                    </motion.div>
                </div>
                <span className="text-[var(--sys-text-dim)]">vs</span>
                <div className="text-center">
                    <div className="text-[var(--sys-text-dim)] text-xs">AI</div>
                    <motion.div
                        key={score.ai}
                        className="text-[var(--sys-warning)] text-xl font-bold"
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                    >
                        {score.ai}
                    </motion.div>
                </div>
            </div>

            <p className="text-center text-[10px] text-[var(--sys-text-dim)] mt-1">
                Move mouse to control paddle
            </p>
        </div>
    );
}
