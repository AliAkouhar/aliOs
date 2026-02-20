import React from 'react';
import {
    AbsoluteFill,
    spring,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
} from 'remotion';
import { Particles } from '../components/Particles';

interface Scene1Props {
    name: string;
    role: string;
    tagline: string;
}

export const Scene1Opening: React.FC<Scene1Props> = ({ name, role, tagline }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Initial fade from black
    const fadeIn = interpolate(frame, [0, 60], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // Logo/name animation
    const nameOpacity = spring({
        frame: frame - 30,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 60,
    });

    const nameScale = spring({
        frame: frame - 30,
        fps,
        from: 0.5,
        to: 1,
        durationInFrames: 60,
    });

    // Role text animation
    const roleOpacity = spring({
        frame: frame - 90,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 40,
    });

    const roleY = spring({
        frame: frame - 90,
        fps,
        from: 30,
        to: 0,
        durationInFrames: 40,
    });

    // Tagline animation
    const taglineOpacity = spring({
        frame: frame - 160,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 40,
    });

    // Glitch effect for name
    const glitchOffset = frame > 40 && frame < 60 ? Math.sin(frame * 0.5) * 3 : 0;

    return (
        <AbsoluteFill
            style={{
                opacity: fadeIn,
                background: 'linear-gradient(180deg, #0d0711 0%, #1a0f24 100%)',
            }}
        >
            {/* Particle background */}
            <Particles count={120} />

            {/* Center content container */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                {/* Logo/Name with glow effect */}
                <div
                    style={{
                        opacity: nameOpacity,
                        transform: `scale(${nameScale}) translateX(${glitchOffset}px)`,
                    }}
                >
                    <h1
                        style={{
                            fontSize: '140px',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #7b3fff 0%, #b77fff 50%, #d4a5ff 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            margin: 0,
                            textShadow: `
                0 0 30px rgba(183, 127, 255, 0.5),
                0 0 60px rgba(183, 127, 255, 0.3),
                0 0 90px rgba(183, 127, 255, 0.2)
              `,
                            fontFamily: "'JetBrains Mono', monospace",
                            letterSpacing: '-4px',
                        }}
                    >
                        {name}
                    </h1>
                </div>

                {/* Role subtitle */}
                <div
                    style={{
                        opacity: roleOpacity,
                        transform: `translateY(${roleY}px)`,
                        marginTop: '20px',
                    }}
                >
                    <p
                        style={{
                            fontSize: '36px',
                            color: '#b8a9cc',
                            margin: 0,
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 400,
                            letterSpacing: '2px',
                        }}
                    >
                        {role}
                    </p>
                </div>

                {/* Tagline with accent color */}
                <div
                    style={{
                        opacity: taglineOpacity,
                        marginTop: '60px',
                    }}
                >
                    <div
                        style={{
                            padding: '16px 40px',
                            background: 'rgba(183, 127, 255, 0.1)',
                            border: '1px solid rgba(183, 127, 255, 0.3)',
                            borderRadius: '12px',
                            boxShadow: `
                0 0 20px rgba(183, 127, 255, 0.2),
                inset 0 0 20px rgba(183, 127, 255, 0.05)
              `,
                        }}
                    >
                        <p
                            style={{
                                fontSize: '28px',
                                color: '#b77fff',
                                margin: 0,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            {tagline}
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative corner elements */}
            <div
                style={{
                    position: 'absolute',
                    top: '60px',
                    left: '60px',
                    width: '100px',
                    height: '100px',
                    borderTop: '3px solid #b77fff',
                    borderLeft: '3px solid #b77fff',
                    opacity: fadeIn * 0.6,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '60px',
                    right: '60px',
                    width: '100px',
                    height: '100px',
                    borderBottom: '3px solid #b77fff',
                    borderRight: '3px solid #b77fff',
                    opacity: fadeIn * 0.6,
                }}
            />
        </AbsoluteFill>
    );
};
