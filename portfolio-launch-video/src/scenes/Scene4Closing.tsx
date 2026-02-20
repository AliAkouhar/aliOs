import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { loadFont } from '@remotion/google-fonts/JetBrainsMono';

const { fontFamily } = loadFont('normal', {
    weights: ['400', '700'],
    subsets: ['latin'],
});

export const Scene4Closing: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Name entrance
    const nameProgress = spring({
        frame,
        fps,
        config: { damping: 200 },
        durationInFrames: 20,
    });

    // Role entrance (delayed)
    const roleProgress = spring({
        frame: frame - 10,
        fps,
        config: { damping: 200 },
    });

    // Education entrance
    const eduProgress = spring({
        frame: frame - 18,
        fps,
        config: { damping: 200 },
    });

    // Divider grows
    const dividerWidth = interpolate(
        spring({ frame: frame - 25, fps, config: { damping: 200 } }),
        [0, 1],
        [0, 200]
    );

    // "Let's connect" entrance
    const connectProgress = spring({
        frame: frame - 35,
        fps,
        config: { damping: 15, stiffness: 100 },
    });

    // Built with line
    const builtWithOpacity = interpolate(frame - 50, [0, 15], [0, 0.6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Glow pulse on the profile picture ring
    const glowPulse = interpolate(
        frame % (2 * fps),
        [0, fps, 2 * fps],
        [0.3, 0.7, 0.3]
    );

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0d0711',
                fontFamily,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Background gradient */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `
                        radial-gradient(ellipse at 50% 40%, rgba(183, 127, 255, 0.08) 0%, transparent 50%),
                        radial-gradient(ellipse at 30% 70%, rgba(123, 63, 255, 0.04) 0%, transparent 40%)
                    `,
                }}
            />

            {/* Profile picture placeholder (cosmic ring) */}
            <div
                style={{
                    position: 'relative',
                    marginBottom: 32,
                    opacity: interpolate(nameProgress, [0, 1], [0, 1]),
                    transform: `scale(${interpolate(nameProgress, [0, 1], [0.8, 1])})`,
                }}
            >
                <div
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #7b3fff, #b77fff, #d4a5ff)',
                        padding: 3,
                        boxShadow: `0 0 ${20 + glowPulse * 20}px rgba(183, 127, 255, ${glowPulse})`,
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            backgroundColor: '#1a1025',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 40,
                        }}
                    >
                        👨‍💻
                    </div>
                </div>

                {/* Online indicator */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 4,
                        right: 4,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: '#00ff88',
                        border: '3px solid #0d0711',
                        boxShadow: '0 0 8px #00ff88',
                    }}
                />
            </div>

            {/* Name */}
            <div
                style={{
                    fontSize: 48,
                    fontWeight: 700,
                    color: '#e0e0e0',
                    marginBottom: 8,
                    opacity: interpolate(nameProgress, [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(nameProgress, [0, 1], [20, 0])}px)`,
                }}
            >
                Ali Akouhar
            </div>

            {/* Role */}
            <div
                style={{
                    fontSize: 20,
                    color: '#b77fff',
                    marginBottom: 8,
                    opacity: interpolate(roleProgress, [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(roleProgress, [0, 1], [15, 0])}px)`,
                }}
            >
                Software Engineer
            </div>

            {/* Education */}
            <div
                style={{
                    fontSize: 15,
                    color: '#888',
                    marginBottom: 32,
                    opacity: interpolate(eduProgress, [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(eduProgress, [0, 1], [10, 0])}px)`,
                }}
            >
                1337 | 42 Network — Benguerir, Morocco
            </div>

            {/* Divider */}
            <div
                style={{
                    width: dividerWidth,
                    height: 2,
                    backgroundColor: '#b77fff',
                    borderRadius: 1,
                    marginBottom: 32,
                    boxShadow: '0 0 10px rgba(183, 127, 255, 0.4)',
                }}
            />

            {/* Let's connect */}
            <div
                style={{
                    fontSize: 24,
                    color: '#e0e0e0',
                    marginBottom: 12,
                    opacity: interpolate(connectProgress, [0, 1], [0, 1]),
                    transform: `scale(${interpolate(connectProgress, [0, 1], [0.9, 1])})`,
                }}
            >
                Let&apos;s connect 👋
            </div>

            {/* Built with */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 40,
                    fontSize: 13,
                    color: '#666',
                    opacity: builtWithOpacity,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                }}
            >
                <span>Built with Next.js, Three.js & ❤️</span>
            </div>
        </AbsoluteFill>
    );
};
