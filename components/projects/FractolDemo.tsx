'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function FractolDemo() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: -0.5, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const width = 200;
    const height = 200;

    const renderFractal = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        // Mandelbrot parameters
        const maxIter = 50;
        const scale = 3.0 / zoom;

        // Center calculation
        const centerX = width / 2;
        const centerY = height / 2;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                // Map screen coordinates to complex plane
                const a = (x - centerX) * scale / width + offset.x;
                const b = (y - centerY) * scale / height + offset.y;

                const ca = a;
                const cb = b;
                let za = 0; // z = 0 initially
                let zb = 0;
                let n = 0;

                // Mandelbrot iteration: z = z^2 + c
                // (a+bi)^2 = a^2 - b^2 + 2abi
                while (n < maxIter) {
                    const aa = za * za - zb * zb;
                    const bb = 2 * za * zb;
                    za = aa + ca;
                    zb = bb + cb;

                    if (za * za + zb * zb > 4) break;
                    n++;
                }

                const pix = (x + y * width) * 4;
                if (n === maxIter) {
                    data[pix] = 0;     // R
                    data[pix + 1] = 0; // G
                    data[pix + 2] = 0; // B
                    data[pix + 3] = 255; // Alpha
                } else {
                    // Smooth coloring based on time and iterations
                    const hue = (n * 10 + time * 50) % 360;
                    const s = 0.7;
                    const l = 0.5;

                    // Simple HSL to RGB conversion inline for performance
                    const c = (1 - Math.abs(2 * l - 1)) * s;
                    const xVal = c * (1 - Math.abs((hue / 60) % 2 - 1));
                    const m = l - c / 2;

                    let r = 0, g = 0, b = 0;
                    if (0 <= hue && hue < 60) { r = c; g = xVal; b = 0; }
                    else if (60 <= hue && hue < 120) { r = xVal; g = c; b = 0; }
                    else if (120 <= hue && hue < 180) { r = 0; g = c; b = xVal; }
                    else if (180 <= hue && hue < 240) { r = 0; g = xVal; b = c; }
                    else if (240 <= hue && hue < 300) { r = xVal; g = 0; b = c; }
                    else if (300 <= hue && hue < 360) { r = c; g = 0; b = xVal; }

                    data[pix] = Math.floor((r + m) * 255);
                    data[pix + 1] = Math.floor((g + m) * 255);
                    data[pix + 2] = Math.floor((b + m) * 255);
                    data[pix + 3] = 255;
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }, [zoom, offset, width, height]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        const startTime = Date.now();

        const animate = () => {
            const time = (Date.now() - startTime) / 1000;
            renderFractal(ctx, time);
            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, [renderFractal]);

    const handleWheel = (e: React.WheelEvent) => {
        // e.preventDefault(); // React synthetic events can't be prevented this way usually, need passive: false
        const zoomFactor = 1.1;
        if (e.deltaY < 0) {
            setZoom(z => Math.min(z * zoomFactor, 100000));
        } else {
            setZoom(z => Math.max(z / zoomFactor, 0.5));
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;

        lastMousePos.current = { x: e.clientX, y: e.clientY };

        // Adjust offset based on zoom level to keep panning natural
        // Screen pixels delta -> Complex plane delta
        const scale = 3.0 / zoom;
        const complexDx = -(dx * scale) / width;
        const complexDy = -(dy * scale) / height;

        setOffset(prev => ({
            x: prev.x + complexDx,
            y: prev.y + complexDy
        }));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="mb-2 text-xs text-[var(--sys-text-dim)]">
                Mandelbrot Explorer
            </div>
            <div className="flex-1 flex items-center justify-center rounded-lg overflow-hidden bg-black relative"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
            >
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    className="rounded cursor-move pixelated"
                    style={{ imageRendering: 'pixelated', width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </div>
            <motion.div
                className="mt-2 text-xs text-center text-[var(--sys-accent)]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Scroll to Zoom • Drag to Pan
            </motion.div>
        </div>
    );
}
