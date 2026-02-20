import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { loadFont } from '@remotion/google-fonts/JetBrainsMono';

const { fontFamily } = loadFont('normal', {
    weights: ['400', '700'],
    subsets: ['latin'],
});

const BOOT_LINES = [
    '> SYSTEM BOOT SEQUENCE INITIATED',
    '> Loading kernel modules...',
    '> Initializing frontend engine...',
    '> Mounting project filesystem...',
    '> Loading skill libraries...',
    '>',
    '> Welcome to AliOS v1.0',
    "> Type 'help' to see available commands",
];

export const Scene1Boot: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Each line takes about 0.5s to type, with 0.15s gap between lines
    const CHARS_PER_SECOND = 40;
    const LINE_GAP_FRAMES = Math.floor(0.12 * fps);

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0d0711',
                fontFamily,
                padding: '80px 120px',
                justifyContent: 'center',
            }}
        >
            {/* Subtle gradient overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 30% 50%, rgba(183, 127, 255, 0.06) 0%, transparent 60%)',
                }}
            />

            {/* Terminal content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {BOOT_LINES.map((line, lineIndex) => {
                    // Calculate when this line starts typing
                    let startFrame = 0;
                    for (let i = 0; i < lineIndex; i++) {
                        const prevLineLength = BOOT_LINES[i].length;
                        const prevLineDuration = Math.ceil((prevLineLength / CHARS_PER_SECOND) * fps);
                        startFrame += prevLineDuration + LINE_GAP_FRAMES;
                    }

                    const lineLength = line.length;
                    const typingDuration = Math.ceil((lineLength / CHARS_PER_SECOND) * fps);
                    const localFrame = frame - startFrame;

                    if (localFrame < 0) return null;

                    const charsToShow = Math.floor(
                        interpolate(
                            localFrame,
                            [0, typingDuration],
                            [0, lineLength],
                            { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
                        )
                    );

                    const displayText = line.substring(0, charsToShow);
                    const isWelcomeLine = line.includes('Welcome');
                    const isComplete = charsToShow >= lineLength;

                    // Cursor blink (only on the active line)
                    const isActiveLine = !isComplete || lineIndex === BOOT_LINES.length - 1;
                    const cursorOpacity = isActiveLine
                        ? (Math.floor(localFrame / (fps * 0.4)) % 2 === 0 ? 1 : 0)
                        : 0;

                    return (
                        <div
                            key={lineIndex}
                            style={{
                                fontSize: 22,
                                lineHeight: '1.8',
                                color: isWelcomeLine ? '#b77fff' : '#e0e0e0',
                                textShadow: isWelcomeLine ? '0 0 12px rgba(183, 127, 255, 0.5)' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <span>{displayText}</span>
                            {isActiveLine && (
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: 10,
                                        height: 20,
                                        backgroundColor: '#b77fff',
                                        marginLeft: 2,
                                        opacity: cursorOpacity,
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Subtle scan line effect */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
                    pointerEvents: 'none',
                }}
            />
        </AbsoluteFill>
    );
};
