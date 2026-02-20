import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { loadFont } from '@remotion/google-fonts/JetBrainsMono';

const { fontFamily } = loadFont('normal', {
    weights: ['400', '700'],
    subsets: ['latin'],
});

type Project = {
    name: string;
    title: string;
    description: string;
    tech: string[];
    icon: string;
};

const PROJECTS: Project[] = [
    {
        name: 'Cub3D',
        title: '3D Raycasting Engine',
        description: 'Wolfenstein-inspired first-person 3D game engine with texture mapping and collision detection',
        tech: ['C', 'Raycasting', 'Graphics', 'MiniLibX'],
        icon: '🎮',
    },
    {
        name: 'ft_transcendence',
        title: 'Full-Stack Ping Pong SPA',
        description: 'Real-time multiplayer Pong game with chat, tournaments, and WebSocket communication',
        tech: ['TypeScript', 'WebSockets', 'TailwindCSS', 'HTML5'],
        icon: '🏓',
    },
    {
        name: 'IRC',
        title: 'Internet Relay Chat Server',
        description: 'Multi-client IRC server with socket programming and real-time message handling',
        tech: ['C++', 'Sockets', 'Networking', 'Concurrency'],
        icon: '💬',
    },
    {
        name: 'Fractol',
        title: 'Fractal Explorer',
        description: 'Real-time interactive fractal viewer — Mandelbrot, Julia, Burning Ship with infinite zoom',
        tech: ['C', 'MiniLibX', 'Algorithms', 'Graphics'],
        icon: '🌀',
    },
];

const CARD_DURATION_FRAMES = 75; // ~2.5s per card at 30fps
const TRANSITION_FRAMES = 20;

const ProjectCard: React.FC<{ project: Project; localFrame: number; fps: number }> = ({
    project,
    localFrame,
    fps,
}) => {
    // Entrance animation
    const enterProgress = spring({
        frame: localFrame,
        fps,
        config: { damping: 200 },
        durationInFrames: 15,
    });

    // Exit animation (start fading out near the end)
    const exitFrame = CARD_DURATION_FRAMES - TRANSITION_FRAMES;
    const exitOpacity = localFrame > exitFrame
        ? interpolate(localFrame, [exitFrame, CARD_DURATION_FRAMES], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        })
        : 1;

    const slideY = interpolate(enterProgress, [0, 1], [60, 0]);
    const cardOpacity = interpolate(enterProgress, [0, 1], [0, 1]) * exitOpacity;

    return (
        <div
            style={{
                transform: `translateY(${slideY}px)`,
                opacity: cardOpacity,
                display: 'flex',
                flexDirection: 'column',
                padding: '48px 60px',
                borderRadius: 16,
                backgroundColor: 'rgba(183, 127, 255, 0.06)',
                border: '1px solid rgba(183, 127, 255, 0.2)',
                maxWidth: 800,
                width: '100%',
            }}
        >
            {/* Project header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <span style={{ fontSize: 48 }}>{project.icon}</span>
                <div>
                    <div style={{ color: '#b77fff', fontSize: 32, fontWeight: 700 }}>
                        {project.name}
                    </div>
                    <div style={{ color: '#bbb', fontSize: 18, marginTop: 4 }}>
                        {project.title}
                    </div>
                </div>
            </div>

            {/* Description */}
            <div
                style={{
                    color: '#999',
                    fontSize: 16,
                    lineHeight: '1.6',
                    marginBottom: 24,
                    opacity: interpolate(
                        spring({ frame: localFrame - 5, fps, config: { damping: 200 } }),
                        [0, 1],
                        [0, 1]
                    ),
                }}
            >
                {project.description}
            </div>

            {/* Tech tags */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {project.tech.map((tech, i) => {
                    const tagProgress = spring({
                        frame: localFrame - 8 - i * 3,
                        fps,
                        config: { damping: 15, stiffness: 200 },
                    });

                    return (
                        <div
                            key={tech}
                            style={{
                                padding: '6px 14px',
                                borderRadius: 6,
                                fontSize: 13,
                                color: '#b77fff',
                                backgroundColor: 'rgba(183, 127, 255, 0.15)',
                                border: '1px solid rgba(183, 127, 255, 0.3)',
                                transform: `scale(${interpolate(tagProgress, [0, 1], [0.7, 1])})`,
                                opacity: interpolate(tagProgress, [0, 1], [0, 1]),
                            }}
                        >
                            {tech}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const Scene3Projects: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Determine which project card is currently showing
    const currentProjectIndex = Math.min(
        Math.floor(frame / CARD_DURATION_FRAMES),
        PROJECTS.length - 1
    );
    const localFrame = frame - currentProjectIndex * CARD_DURATION_FRAMES;

    // Header entrance
    const headerOpacity = interpolate(frame, [0, 10], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // Project counter
    const projectNumber = currentProjectIndex + 1;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0d0711',
                fontFamily,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px',
            }}
        >
            {/* Background accent */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 50% 40%, rgba(183, 127, 255, 0.05) 0%, transparent 60%)',
                }}
            />

            {/* Section header */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    marginBottom: 40,
                    textAlign: 'center',
                    opacity: headerOpacity,
                }}
            >
                <div style={{ color: '#666', fontSize: 14, letterSpacing: 3, marginBottom: 8 }}>
                    PROJECTS — {projectNumber}/{PROJECTS.length}
                </div>
                <div
                    style={{
                        width: 200,
                        height: 2,
                        backgroundColor: 'rgba(183, 127, 255, 0.3)',
                        margin: '0 auto',
                        borderRadius: 1,
                    }}
                >
                    <div
                        style={{
                            width: `${(projectNumber / PROJECTS.length) * 100}%`,
                            height: '100%',
                            backgroundColor: '#b77fff',
                            borderRadius: 1,
                            boxShadow: '0 0 8px rgba(183, 127, 255, 0.5)',
                        }}
                    />
                </div>
            </div>

            {/* Project Card */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <ProjectCard
                    key={currentProjectIndex}
                    project={PROJECTS[currentProjectIndex]}
                    localFrame={localFrame}
                    fps={fps}
                />
            </div>
        </AbsoluteFill>
    );
};
