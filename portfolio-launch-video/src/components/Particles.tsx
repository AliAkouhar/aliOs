import React from 'react';
import { useCurrentFrame } from 'remotion';

interface ParticlesProps {
    count?: number;
}

export const Particles: React.FC<ParticlesProps> = ({ count = 100 }) => {
    const frame = useCurrentFrame();

    const particles = React.useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 1 + Math.random() * 3,
            speed: 0.2 + Math.random() * 0.5,
            opacity: 0.2 + Math.random() * 0.5,
        }));
    }, [count]);

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
            }}
        >
            {particles.map((particle) => {
                const y = (particle.y + frame * particle.speed * 0.1) % 100;
                const floatX = Math.sin((frame + particle.id * 100) * 0.02) * 2;
                const pulseOpacity = particle.opacity + Math.sin((frame + particle.id * 50) * 0.05) * 0.1;

                return (
                    <div
                        key={particle.id}
                        style={{
                            position: 'absolute',
                            left: `calc(${particle.x}% + ${floatX}px)`,
                            top: `${y}%`,
                            width: particle.size,
                            height: particle.size,
                            borderRadius: '50%',
                            background: '#b77fff',
                            opacity: pulseOpacity,
                            boxShadow: `0 0 ${particle.size * 3}px rgba(183, 127, 255, 0.5)`,
                        }}
                    />
                );
            })}
        </div>
    );
};
