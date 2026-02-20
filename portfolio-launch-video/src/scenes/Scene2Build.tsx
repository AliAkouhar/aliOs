import React from 'react';
import {
    AbsoluteFill,
    spring,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
} from 'remotion';
import { TypedText } from '../components/TypedText';
import { CodeWindow } from '../components/CodeWindow';

const TERMINAL_LINES = [
    '> SYSTEM BOOT SEQUENCE INITIATED',
    '> Loading kernel modules...',
    '> Initializing Google Agent...',
    '> Generating portfolio structure...',
    '> Designing components...',
    '> Optimizing performance...',
    '✓ Portfolio ready!',
];

export const Scene2Build: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Panel slide in
    const panelSlide = spring({
        frame: frame - 10,
        fps,
        from: -100,
        to: 0,
        durationInFrames: 30,
    });

    const panelOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                background: 'linear-gradient(135deg, #0d0711 0%, #1a0f24 100%)',
            }}
        >
            {/* Background grid effect */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
            linear-gradient(rgba(183, 127, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(183, 127, 255, 0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />

            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    padding: '80px',
                    gap: '60px',
                }}
            >
                {/* Terminal Panel */}
                <div
                    style={{
                        flex: 1,
                        opacity: panelOpacity,
                        transform: `translateX(${panelSlide}px)`,
                    }}
                >
                    <div
                        style={{
                            background: 'rgba(26, 15, 36, 0.9)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(183, 127, 255, 0.2)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            height: '100%',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        {/* Terminal header */}
                        <div
                            style={{
                                padding: '16px 24px',
                                borderBottom: '1px solid rgba(183, 127, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                            }}
                        >
                            {/* Window buttons */}
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: '#ff5f57',
                                    }}
                                />
                                <div
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: '#febc2e',
                                    }}
                                />
                                <div
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: '#28c840',
                                    }}
                                />
                            </div>
                            <span
                                style={{
                                    color: '#b77fff',
                                    fontSize: '14px',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    textShadow: '0 0 10px #b77fff',
                                }}
                            >
                                TERMINAL
                            </span>
                            <span
                                style={{
                                    color: '#b8a9cc',
                                    fontSize: '14px',
                                    fontFamily: "'JetBrains Mono', monospace",
                                }}
                            >
                                – bash
                            </span>
                        </div>

                        {/* Terminal content */}
                        <div
                            style={{
                                padding: '24px',
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            {TERMINAL_LINES.map((line, index) => (
                                <TypedText
                                    key={index}
                                    text={line}
                                    startFrame={index * 70}
                                    isSuccess={line.startsWith('✓')}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Code Editor Panel */}
                <div
                    style={{
                        flex: 1,
                        opacity: panelOpacity,
                        transform: `translateX(${-panelSlide}px)`,
                    }}
                >
                    <CodeWindow startFrame={120} />
                </div>
            </div>

            {/* "Built with Anthropic's Google Agent" overlay */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '60px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: interpolate(frame, [400, 450], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    }),
                }}
            >
                <div
                    style={{
                        padding: '12px 32px',
                        background: 'linear-gradient(135deg, rgba(123, 63, 255, 0.2), rgba(183, 127, 255, 0.1))',
                        border: '1px solid rgba(183, 127, 255, 0.4)',
                        borderRadius: '8px',
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            color: '#d4a5ff',
                            fontSize: '18px',
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                    >
                        Built with Anthropic's Google Agent
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
