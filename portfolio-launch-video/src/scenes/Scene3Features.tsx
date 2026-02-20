import React from 'react';
import {
    AbsoluteFill,
    spring,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    Sequence,
} from 'remotion';
import { FeatureCard } from '../components/FeatureCard';
import { DeviceFrame } from '../components/DeviceFrame';

const FEATURES = [
    {
        title: 'Interactive Terminal',
        description: 'Real command-line interface with autocomplete and history',
        icon: '⌨️',
    },
    {
        title: 'Multiple Themes',
        description: 'Cosmic, Matrix, and Cyberpunk color schemes',
        icon: '🎨',
    },
    {
        title: 'Floating Windows',
        description: 'Draggable, resizable OS-style window system',
        icon: '🪟',
    },
    {
        title: 'Particle Effects',
        description: 'Beautiful animated background with reactive particles',
        icon: '✨',
    },
];

export const Scene3Features: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill
            style={{
                background: 'linear-gradient(180deg, #0d0711 0%, #1a0f24 100%)',
            }}
        >
            {/* Background glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '800px',
                    height: '800px',
                    background: 'radial-gradient(circle, rgba(183, 127, 255, 0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            {/* Title */}
            <div
                style={{
                    position: 'absolute',
                    top: '80px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
                }}
            >
                <h2
                    style={{
                        fontSize: '64px',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: "'JetBrains Mono', monospace",
                        textAlign: 'center',
                    }}
                >
                    <span style={{ color: '#b77fff' }}>//</span> FEATURES
                </h2>
            </div>

            {/* Feature 1: Terminal (0-300 frames) */}
            <Sequence from={0} durationInFrames={300}>
                <FeatureSectionTerminal />
            </Sequence>

            {/* Feature 2: Themes (300-600 frames) */}
            <Sequence from={300} durationInFrames={300}>
                <FeatureSectionThemes />
            </Sequence>

            {/* Feature 3: Windows (600-900 frames) */}
            <Sequence from={600} durationInFrames={300}>
                <FeatureSectionWindows />
            </Sequence>

            {/* Feature 4: Particles (900-1200 frames) */}
            <Sequence from={900} durationInFrames={300}>
                <FeatureSectionParticles />
            </Sequence>
        </AbsoluteFill>
    );
};

const FeatureSectionTerminal: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const cardOpacity = spring({
        frame: frame - 20,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 40,
    });

    const cardY = spring({
        frame: frame - 20,
        fps,
        from: 50,
        to: 0,
        durationInFrames: 40,
    });

    return (
        <AbsoluteFill>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: '200px 80px 80px',
                    gap: '80px',
                }}
            >
                {/* Terminal mockup */}
                <div
                    style={{
                        opacity: cardOpacity,
                        transform: `translateY(${cardY}px)`,
                        flex: '1',
                    }}
                >
                    <div
                        style={{
                            background: 'rgba(26, 15, 36, 0.9)',
                            border: '1px solid rgba(183, 127, 255, 0.3)',
                            borderRadius: '16px',
                            padding: '32px',
                            boxShadow: `
                0 0 40px rgba(183, 127, 255, 0.2),
                0 20px 60px rgba(0, 0, 0, 0.5)
              `,
                        }}
                    >
                        <div style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            <p style={{ color: '#b77fff', margin: '0 0 8px', fontSize: '18px' }}>
                                {'>'} help
                            </p>
                            <p style={{ color: '#b8a9cc', margin: '0 0 4px', fontSize: '16px' }}>
                                Available commands:
                            </p>
                            <p style={{ color: '#ffffff', margin: '0 0 4px', fontSize: '16px' }}>
                                whoami, about, skills, projects, contact, clear
                            </p>
                            <p style={{ color: '#b77fff', margin: '8px 0 0', fontSize: '18px' }}>
                                {'>'} skills
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '10px',
                                        height: '20px',
                                        background: '#b77fff',
                                        marginLeft: '4px',
                                        animation: 'blink 1s step-end infinite',
                                    }}
                                />
                            </p>
                        </div>
                    </div>
                </div>

                {/* Feature info */}
                <FeatureCard
                    title="Interactive Terminal"
                    description="Real command-line interface with autocomplete and command history navigation"
                    icon="⌨️"
                    delay={60}
                />
            </div>
        </AbsoluteFill>
    );
};

const FeatureSectionThemes: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: '200px 80px 80px',
                    gap: '80px',
                }}
            >
                {/* Feature info */}
                <FeatureCard
                    title="Multiple Themes"
                    description="Switch between Cosmic Purple, Matrix Green, and Cyberpunk Pink themes"
                    icon="🎨"
                    delay={20}
                />

                {/* Theme swatches */}
                <div
                    style={{
                        display: 'flex',
                        gap: '24px',
                        opacity: spring({ frame: frame - 60, fps, from: 0, to: 1, durationInFrames: 40 }),
                    }}
                >
                    {/* Cosmic */}
                    <div
                        style={{
                            width: '180px',
                            height: '240px',
                            background: 'linear-gradient(180deg, #0d0711 0%, #1a0f24 100%)',
                            borderRadius: '12px',
                            border: '2px solid #b77fff',
                            boxShadow: '0 0 30px rgba(183, 127, 255, 0.4)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: '16px',
                        }}
                    >
                        <p style={{ color: '#b77fff', margin: 0, fontSize: '16px', fontWeight: 600 }}>Cosmic</p>
                    </div>
                    {/* Matrix */}
                    <div
                        style={{
                            width: '180px',
                            height: '240px',
                            background: 'linear-gradient(180deg, #0a1a0a 0%, #102010 100%)',
                            borderRadius: '12px',
                            border: '2px solid #00ff88',
                            boxShadow: '0 0 30px rgba(0, 255, 136, 0.4)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: '16px',
                        }}
                    >
                        <p style={{ color: '#00ff88', margin: 0, fontSize: '16px', fontWeight: 600 }}>Matrix</p>
                    </div>
                    {/* Cyberpunk */}
                    <div
                        style={{
                            width: '180px',
                            height: '240px',
                            background: 'linear-gradient(180deg, #1a0a14 0%, #2d1020 100%)',
                            borderRadius: '12px',
                            border: '2px solid #ff44aa',
                            boxShadow: '0 0 30px rgba(255, 68, 170, 0.4)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: '16px',
                        }}
                    >
                        <p style={{ color: '#ff44aa', margin: 0, fontSize: '16px', fontWeight: 600 }}>Cyberpunk</p>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};

const FeatureSectionWindows: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const window1Opacity = spring({ frame: frame - 20, fps, from: 0, to: 1, durationInFrames: 30 });
    const window2Opacity = spring({ frame: frame - 60, fps, from: 0, to: 1, durationInFrames: 30 });
    const window3Opacity = spring({ frame: frame - 100, fps, from: 0, to: 1, durationInFrames: 30 });

    return (
        <AbsoluteFill>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: '200px 80px 80px',
                    gap: '80px',
                }}
            >
                {/* Stacked windows mockup */}
                <div style={{ position: 'relative', width: '500px', height: '400px' }}>
                    {/* Window 3 (back) */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '400px',
                            height: '300px',
                            background: 'rgba(26, 15, 36, 0.95)',
                            border: '1px solid rgba(183, 127, 255, 0.3)',
                            borderRadius: '12px',
                            opacity: window3Opacity,
                            transform: 'rotate(-5deg)',
                        }}
                    >
                        <div
                            style={{
                                padding: '12px 16px',
                                borderBottom: '1px solid rgba(183, 127, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <div
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#ff5f57',
                                }}
                            />
                            <span style={{ color: '#b77fff', fontSize: '12px' }}>SKILLS</span>
                        </div>
                    </div>
                    {/* Window 2 (middle) */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '50px',
                            left: '50px',
                            width: '400px',
                            height: '300px',
                            background: 'rgba(26, 15, 36, 0.95)',
                            border: '1px solid rgba(183, 127, 255, 0.3)',
                            borderRadius: '12px',
                            opacity: window2Opacity,
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <div
                            style={{
                                padding: '12px 16px',
                                borderBottom: '1px solid rgba(183, 127, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <div
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#ff5f57',
                                }}
                            />
                            <span style={{ color: '#b77fff', fontSize: '12px' }}>PROJECTS</span>
                        </div>
                    </div>
                    {/* Window 1 (front) */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '100px',
                            left: '100px',
                            width: '400px',
                            height: '300px',
                            background: 'rgba(26, 15, 36, 0.95)',
                            border: '1px solid rgba(183, 127, 255, 0.4)',
                            borderRadius: '12px',
                            opacity: window1Opacity,
                            boxShadow: `
                0 0 40px rgba(183, 127, 255, 0.2),
                0 20px 60px rgba(0, 0, 0, 0.5)
              `,
                            transform: 'rotate(3deg)',
                        }}
                    >
                        <div
                            style={{
                                padding: '12px 16px',
                                borderBottom: '1px solid rgba(183, 127, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <div
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#ff5f57',
                                }}
                            />
                            <span style={{ color: '#b77fff', fontSize: '12px' }}>ABOUT</span>
                        </div>
                    </div>
                </div>

                {/* Feature info */}
                <FeatureCard
                    title="Floating Windows"
                    description="Draggable & resizable OS-style window system for exploring content"
                    icon="🪟"
                    delay={40}
                />
            </div>
        </AbsoluteFill>
    );
};

const FeatureSectionParticles: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill>
            {/* Animated particles background for this section */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    overflow: 'hidden',
                }}
            >
                {Array.from({ length: 50 }).map((_, i) => {
                    const x = Math.sin(i * 0.5 + frame * 0.02) * 400 + 960;
                    const y = Math.cos(i * 0.7 + frame * 0.015) * 300 + 540;
                    const size = 2 + Math.sin(i + frame * 0.05) * 2;
                    const opacity = 0.3 + Math.sin(i * 2 + frame * 0.03) * 0.3;

                    return (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                left: x,
                                top: y,
                                width: size,
                                height: size,
                                borderRadius: '50%',
                                background: '#b77fff',
                                opacity,
                                boxShadow: '0 0 10px #b77fff',
                            }}
                        />
                    );
                })}
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: '200px 80px 80px',
                    gap: '80px',
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                {/* Feature info */}
                <FeatureCard
                    title="Particle Effects"
                    description="Beautiful animated background with interactive, reactive particles"
                    icon="✨"
                    delay={20}
                />

                {/* Sparkle visualization */}
                <div
                    style={{
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(183, 127, 255, 0.2) 0%, transparent 70%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: spring({ frame: frame - 60, fps, from: 0, to: 1, durationInFrames: 40 }),
                    }}
                >
                    <span style={{ fontSize: '120px' }}>✨</span>
                </div>
            </div>
        </AbsoluteFill>
    );
};
