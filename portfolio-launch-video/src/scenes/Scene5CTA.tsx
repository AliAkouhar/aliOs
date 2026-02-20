import React from 'react';
import {
    AbsoluteFill,
    spring,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
} from 'remotion';
import { Particles } from '../components/Particles';

interface Scene5Props {
    name: string;
    url: string;
}

export const Scene5CTA: React.FC<Scene5Props> = ({ name, url }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fade in from previous scene
    const fadeIn = interpolate(frame, [0, 40], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // URL animation
    const urlOpacity = spring({
        frame: frame - 30,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 40,
    });

    const urlScale = spring({
        frame: frame - 30,
        fps,
        from: 0.8,
        to: 1,
        durationInFrames: 50,
    });

    // CTA button pulse
    const buttonPulse = 1 + Math.sin(frame * 0.1) * 0.03;

    // Social links animation
    const socialOpacity = spring({
        frame: frame - 180,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 40,
    });

    // Confetti particles appear
    const confettiOpacity = interpolate(frame, [120, 180], [0, 1], {
        extrapolateRight: 'clamp',
    });



    return (
        <AbsoluteFill
            style={{
                background: 'linear-gradient(180deg, #0d0711 0%, #1a0f24 100%)',
                opacity: fadeIn,
            }}
        >
            {/* Particle background */}
            <Particles count={80} />

            {/* Confetti-like particles */}
            <div style={{ opacity: confettiOpacity }}>
                {Array.from({ length: 30 }).map((_, i) => {
                    const x = ((i * 73) % 100) + '%';
                    const delay = i * 0.15;
                    const fallProgress = Math.max(0, (frame - 120 - delay * 60) / 300);
                    const y = -50 + fallProgress * 1200;
                    const rotation = frame * (i % 2 === 0 ? 2 : -2);
                    const colors = ['#b77fff', '#d4a5ff', '#ff44aa', '#00ff88', '#febc2e'];
                    const color = colors[i % colors.length];

                    return (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                left: x,
                                top: y,
                                width: '12px',
                                height: '12px',
                                borderRadius: i % 3 === 0 ? '50%' : '2px',
                                background: color,
                                transform: `rotate(${rotation}deg)`,
                                opacity: fallProgress < 1 ? 0.8 : 0,
                            }}
                        />
                    );
                })}
            </div>

            {/* Main content */}
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
                {/* "View Live" heading */}
                <div
                    style={{
                        opacity: spring({ frame: frame - 60, fps, from: 0, to: 1, durationInFrames: 30 }),
                        marginBottom: '40px',
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            color: '#b8a9cc',
                            fontSize: '24px',
                            fontFamily: "'JetBrains Mono', monospace",
                            letterSpacing: '4px',
                            textTransform: 'uppercase',
                        }}
                    >
                        See What's Possible
                    </p>
                </div>

                {/* Big URL display */}
                <div
                    style={{
                        opacity: urlOpacity,
                        transform: `scale(${urlScale})`,
                    }}
                >
                    <div
                        style={{
                            padding: '32px 80px',
                            background: 'linear-gradient(135deg, rgba(123, 63, 255, 0.2), rgba(183, 127, 255, 0.1))',
                            border: '2px solid rgba(183, 127, 255, 0.5)',
                            borderRadius: '20px',
                            boxShadow: `
                0 0 60px rgba(183, 127, 255, 0.4),
                0 0 120px rgba(183, 127, 255, 0.2),
                inset 0 0 40px rgba(183, 127, 255, 0.1)
              `,
                        }}
                    >
                        <h1
                            style={{
                                margin: 0,
                                fontSize: '72px',
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #7b3fff 0%, #b77fff 50%, #d4a5ff 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                fontFamily: "'JetBrains Mono', monospace",
                                textShadow: `
                  0 0 40px rgba(183, 127, 255, 0.6),
                  0 0 80px rgba(183, 127, 255, 0.4)
                `,
                            }}
                        >
                            {url}
                        </h1>
                    </div>
                </div>

                {/* CTA Button */}
                <div
                    style={{
                        marginTop: '60px',
                        opacity: spring({ frame: frame - 120, fps, from: 0, to: 1, durationInFrames: 40 }),
                        transform: `scale(${buttonPulse})`,
                    }}
                >
                    <div
                        style={{
                            padding: '20px 60px',
                            background: 'linear-gradient(135deg, #7b3fff 0%, #b77fff 100%)',
                            borderRadius: '12px',
                            boxShadow: `
                0 0 30px rgba(183, 127, 255, 0.6),
                0 10px 40px rgba(123, 63, 255, 0.4)
              `,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                        }}
                    >
                        <span
                            style={{
                                color: '#ffffff',
                                fontSize: '24px',
                                fontWeight: 600,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            Visit Live Site
                        </span>
                        <span style={{ fontSize: '24px' }}>→</span>
                    </div>
                </div>

                {/* Social links */}
                <div
                    style={{
                        marginTop: '80px',
                        display: 'flex',
                        gap: '40px',
                        opacity: socialOpacity,
                    }}
                >
                    {/* GitHub */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 24px',
                            background: 'rgba(183, 127, 255, 0.1)',
                            border: '1px solid rgba(183, 127, 255, 0.3)',
                            borderRadius: '8px',
                        }}
                    >
                        <span style={{ fontSize: '24px' }}>🔗</span>
                        <span
                            style={{
                                color: '#b8a9cc',
                                fontSize: '16px',
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            GitHub
                        </span>
                    </div>

                    {/* LinkedIn */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 24px',
                            background: 'rgba(183, 127, 255, 0.1)',
                            border: '1px solid rgba(183, 127, 255, 0.3)',
                            borderRadius: '8px',
                        }}
                    >
                        <span style={{ fontSize: '24px' }}>💼</span>
                        <span
                            style={{
                                color: '#b8a9cc',
                                fontSize: '16px',
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            LinkedIn
                        </span>
                    </div>

                    {/* Email */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 24px',
                            background: 'rgba(183, 127, 255, 0.1)',
                            border: '1px solid rgba(183, 127, 255, 0.3)',
                            borderRadius: '8px',
                        }}
                    >
                        <span style={{ fontSize: '24px' }}>✉️</span>
                        <span
                            style={{
                                color: '#b8a9cc',
                                fontSize: '16px',
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            Contact
                        </span>
                    </div>
                </div>
            </div>


            {/* Corner decorations */}
            <div
                style={{
                    position: 'absolute',
                    top: '40px',
                    left: '40px',
                    width: '60px',
                    height: '60px',
                    borderTop: '2px solid #b77fff',
                    borderLeft: '2px solid #b77fff',
                    opacity: 0.5,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    right: '40px',
                    width: '60px',
                    height: '60px',
                    borderBottom: '2px solid #b77fff',
                    borderRight: '2px solid #b77fff',
                    opacity: 0.5,
                }}
            />
        </AbsoluteFill>
    );
};
