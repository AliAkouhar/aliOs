'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    blur: number;
    layer: 'background' | 'middle' | 'foreground';
}

const PARTICLE_CONFIG = {
    background: { count: 5, sizeMin: 200, sizeMax: 400, blur: 40, opacityMin: 0.08, opacityMax: 0.12, speed: 0.15 },
    middle: { count: 20, sizeMin: 30, sizeMax: 80, blur: 12, opacityMin: 0.12, opacityMax: 0.22, speed: 0.4 },
    foreground: { count: 15, sizeMin: 10, sizeMax: 30, blur: 3, opacityMin: 0.18, opacityMax: 0.32, speed: 0.8 },
};

const PHYSICS = {
    gravity: -0.02,
    friction: 0.995,
    repulsionRadius: 150,
    repulsionStrength: 0.8,
    bounceRestitution: 0.4,
};

export default function ParticleField() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number | undefined>(undefined);

    // Initialize particles
    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setDimensions({ width, height });

        const createParticles = (layer: 'background' | 'middle' | 'foreground'): Particle[] => {
            const config = PARTICLE_CONFIG[layer];
            return Array.from({ length: config.count }, (_, i) => ({
                id: i + (layer === 'middle' ? 100 : layer === 'foreground' ? 200 : 0),
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * config.speed,
                vy: (Math.random() - 0.5) * config.speed,
                size: config.sizeMin + Math.random() * (config.sizeMax - config.sizeMin),
                opacity: config.opacityMin + Math.random() * (config.opacityMax - config.opacityMin),
                blur: config.blur,
                layer,
            }));
        };

        setParticles([
            ...createParticles('background'),
            ...createParticles('middle'),
            ...createParticles('foreground'),
        ]);

        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Track mouse
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Physics animation loop
    const updatePhysics = useCallback(() => {
        setParticles((prev) =>
            prev.map((p) => {
                let { x, y, vx, vy } = p;
                const config = PARTICLE_CONFIG[p.layer];

                // Apply upward gravity (antigravity effect)
                vy += PHYSICS.gravity;

                // Apply friction
                vx *= PHYSICS.friction;
                vy *= PHYSICS.friction;

                // Mouse repulsion
                const dx = x - mouseRef.current.x;
                const dy = y - mouseRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < PHYSICS.repulsionRadius && dist > 0) {
                    const force = (1 - dist / PHYSICS.repulsionRadius) * PHYSICS.repulsionStrength;
                    vx += (dx / dist) * force;
                    vy += (dy / dist) * force;
                }

                // Update position
                x += vx;
                y += vy;

                // Bounce off edges
                if (x < -p.size / 2) {
                    x = -p.size / 2;
                    vx = Math.abs(vx) * PHYSICS.bounceRestitution;
                }
                if (x > dimensions.width + p.size / 2) {
                    x = dimensions.width + p.size / 2;
                    vx = -Math.abs(vx) * PHYSICS.bounceRestitution;
                }
                if (y < -p.size / 2) {
                    y = -p.size / 2;
                    vy = Math.abs(vy) * PHYSICS.bounceRestitution;
                }
                if (y > dimensions.height + p.size / 2) {
                    y = dimensions.height + p.size / 2;
                    vy = -Math.abs(vy) * PHYSICS.bounceRestitution;
                }

                // Add small random movement to keep things alive
                vx += (Math.random() - 0.5) * config.speed * 0.05;
                vy += (Math.random() - 0.5) * config.speed * 0.05;

                return { ...p, x, y, vx, vy };
            })
        );

        animationRef.current = requestAnimationFrame(updatePhysics);
    }, [dimensions]);

    useEffect(() => {
        animationRef.current = requestAnimationFrame(updatePhysics);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [updatePhysics]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: p.x - p.size / 2,
                        top: p.y - p.size / 2,
                        opacity: p.opacity,
                        filter: `blur(${p.blur}px)`,
                        background: 'radial-gradient(circle, #b77fff 0%, #7b3fff 100%)',
                        boxShadow: `
              0 0 ${p.size * 0.3}px rgba(183, 127, 255, 0.6),
              0 0 ${p.size * 0.6}px rgba(183, 127, 255, 0.4),
              0 0 ${p.size * 0.9}px rgba(183, 127, 255, 0.2)
            `,
                        mixBlendMode: 'screen',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: p.opacity }}
                    transition={{ duration: 0.5, delay: p.id * 0.01 }}
                />
            ))}
        </div>
    );
}
