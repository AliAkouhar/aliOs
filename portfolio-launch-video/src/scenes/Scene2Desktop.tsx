import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { loadFont } from '@remotion/google-fonts/JetBrainsMono';

const { fontFamily } = loadFont('normal', {
    weights: ['400', '700'],
    subsets: ['latin'],
});

const TERMINAL_LINES = [
    { prompt: '$ ', command: 'whoami', delay: 0 },
    { output: 'Ali Akouhar — Software Engineer', delay: 15 },
    { prompt: '$ ', command: 'cat skills.txt', delay: 35 },
    { output: 'C • C++ • TypeScript • Docker • React • Next.js', delay: 50 },
    { prompt: '$ ', command: 'ls projects/', delay: 75 },
    { output: 'cub3d/  minishell/  ft_transcendence/  irc/  fractol/', delay: 90 },
];

const SKILL_TAGS = [
    { name: 'C', color: '#4fc3f7' },
    { name: 'C++', color: '#f06292' },
    { name: 'TypeScript', color: '#64b5f6' },
    { name: 'Docker', color: '#4dd0e1' },
    { name: 'React', color: '#81c784' },
    { name: 'Next.js', color: '#b39ddb' },
    { name: 'Linux', color: '#ffb74d' },
    { name: 'Git', color: '#ef5350' },
];

export const Scene2Desktop: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Status bar slides down
    const statusBarY = interpolate(
        spring({ frame, fps, config: { damping: 200 } }),
        [0, 1],
        [-40, 0]
    );

    // Main content fades in
    const contentOpacity = interpolate(frame, [0.3 * fps, 0.8 * fps], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Terminal panel slides from left
    const terminalX = interpolate(
        spring({ frame: frame - Math.floor(0.2 * fps), fps, config: { damping: 200 } }),
        [0, 1],
        [-300, 0]
    );

    // Workspace panel slides from right
    const workspaceX = interpolate(
        spring({ frame: frame - Math.floor(0.4 * fps), fps, config: { damping: 200 } }),
        [0, 1],
        [300, 0]
    );

    return (
        <AbsoluteFill style={{ backgroundColor: '#0d0711', fontFamily }}>
            {/* Subtle background gradient */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 70% 30%, rgba(183, 127, 255, 0.04) 0%, transparent 50%)',
                }}
            />

            {/* Status Bar */}
            <div
                style={{
                    height: 36,
                    backgroundColor: 'rgba(183, 127, 255, 0.1)',
                    borderBottom: '1px solid rgba(183, 127, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 20px',
                    fontSize: 13,
                    transform: `translateY(${statusBarY}px)`,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#b77fff',
                            boxShadow: '0 0 6px #b77fff',
                        }}
                    />
                    <span style={{ color: '#b77fff', fontWeight: 700 }}>AliOS</span>
                    <span style={{ color: '#666' }}>v1.0</span>
                </div>
                <div style={{ display: 'flex', gap: 16, color: '#888' }}>
                    <span>📍 Agadir, Morocco</span>
                    <span>⚡ System Ready</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    opacity: contentOpacity,
                    overflow: 'hidden',
                }}
            >
                {/* Terminal Panel */}
                <div
                    style={{
                        width: '42%',
                        borderRight: '1px solid rgba(183, 127, 255, 0.15)',
                        padding: '20px 24px',
                        transform: `translateX(${terminalX}px)`,
                    }}
                >
                    <div
                        style={{
                            fontSize: 11,
                            color: '#666',
                            marginBottom: 12,
                            borderBottom: '1px solid rgba(183, 127, 255, 0.1)',
                            paddingBottom: 8,
                        }}
                    >
                        TERMINAL — zsh
                    </div>

                    {TERMINAL_LINES.map((line, i) => {
                        const lineFrame = frame - line.delay * (fps / 30);
                        if (lineFrame < 0) return null;

                        const lineOpacity = interpolate(lineFrame, [0, 5], [0, 1], {
                            extrapolateRight: 'clamp',
                        });

                        if ('command' in line) {
                            // Typing effect for commands
                            const cmdLength = line.command.length;
                            const charsToShow = Math.floor(
                                interpolate(lineFrame, [0, cmdLength * 1.5], [0, cmdLength], {
                                    extrapolateRight: 'clamp',
                                })
                            );

                            return (
                                <div key={i} style={{ fontSize: 16, lineHeight: '2', opacity: lineOpacity }}>
                                    <span style={{ color: '#b77fff' }}>{line.prompt}</span>
                                    <span style={{ color: '#e0e0e0' }}>
                                        {line.command.substring(0, charsToShow)}
                                    </span>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={i}
                                style={{
                                    fontSize: 14,
                                    lineHeight: '1.8',
                                    color: '#aaa',
                                    opacity: lineOpacity,
                                    paddingLeft: 16,
                                }}
                            >
                                {line.output}
                            </div>
                        );
                    })}
                </div>

                {/* Workspace Panel */}
                <div
                    style={{
                        flex: 1,
                        padding: '30px 40px',
                        transform: `translateX(${workspaceX}px)`,
                    }}
                >
                    {/* Window Title */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            marginBottom: 24,
                        }}
                    >
                        <div style={{ display: 'flex', gap: 6 }}>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
                            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#febc2e' }} />
                            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28c840' }} />
                        </div>
                        <span style={{ color: '#888', fontSize: 13, marginLeft: 8 }}>
                            skills.process — AliOS
                        </span>
                    </div>

                    {/* Skills Grid */}
                    <div style={{ marginBottom: 32 }}>
                        <div style={{ color: '#b77fff', fontSize: 14, fontWeight: 700, marginBottom: 16 }}>
                            // ACTIVE SKILLS
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                            {SKILL_TAGS.map((skill, i) => {
                                const tagDelay = Math.floor(1.5 * fps) + i * 4;
                                const tagProgress = spring({
                                    frame: frame - tagDelay,
                                    fps,
                                    config: { damping: 15, stiffness: 200 },
                                });
                                const tagScale = interpolate(tagProgress, [0, 1], [0.5, 1]);
                                const tagOpacity = interpolate(tagProgress, [0, 1], [0, 1]);

                                return (
                                    <div
                                        key={skill.name}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: 8,
                                            color: skill.color,
                                            fontSize: 14,
                                            fontWeight: 700,
                                            backgroundColor: `${skill.color}15`,
                                            border: `1px solid ${skill.color}40`,
                                            transform: `scale(${tagScale})`,
                                            opacity: tagOpacity,
                                        }}
                                    >
                                        {skill.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Education bar */}
                    {(() => {
                        const eduDelay = Math.floor(2.5 * fps);
                        const eduOpacity = interpolate(frame - eduDelay, [0, 15], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        return (
                            <div style={{ opacity: eduOpacity }}>
                                <div style={{ color: '#b77fff', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
                                    // EDUCATION
                                </div>
                                <div
                                    style={{
                                        padding: '16px 20px',
                                        borderRadius: 8,
                                        backgroundColor: 'rgba(183, 127, 255, 0.08)',
                                        border: '1px solid rgba(183, 127, 255, 0.2)',
                                    }}
                                >
                                    <div style={{ color: '#e0e0e0', fontSize: 16, fontWeight: 700 }}>
                                        1337 | 42 Network
                                    </div>
                                    <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>
                                        Benguerir, Morocco — Peer-to-peer learning
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>

            {/* Footer bar */}
            <div
                style={{
                    height: 28,
                    backgroundColor: 'rgba(183, 127, 255, 0.08)',
                    borderTop: '1px solid rgba(183, 127, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 20px',
                    fontSize: 11,
                    color: '#666',
                    gap: 16,
                }}
            >
                <span>🟢 7 projects loaded</span>
                <span>•</span>
                <span>Next.js + Three.js + TypeScript</span>
            </div>
        </AbsoluteFill>
    );
};
