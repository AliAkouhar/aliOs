import React from 'react';
import {
    AbsoluteFill,
    spring,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    Sequence,
} from 'remotion';

// Demo pages to showcase
const DEMO_PAGES = [
    {
        name: 'Boot Sequence',
        content: (
            <div style={{ padding: '40px', fontFamily: "'JetBrains Mono', monospace" }}>
                <p style={{ color: '#b77fff', marginBottom: '8px' }}>&gt; SYSTEM BOOT SEQUENCE INITIATED</p>
                <p style={{ color: '#ffffff', marginBottom: '8px' }}>&gt; Loading kernel modules...</p>
                <p style={{ color: '#ffffff', marginBottom: '8px' }}>&gt; Initializing frontend engine...</p>
                <p style={{ color: '#ffffff', marginBottom: '8px' }}>&gt; Mounting project filesystem...</p>
                <p style={{ color: '#b77fff', marginBottom: '8px' }}>&gt; Welcome to AliOS v1.0</p>
                <p style={{ color: '#28c840' }}>✓ System ready</p>
            </div>
        ),
    },
    {
        name: 'Terminal Commands',
        content: (
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ width: '35%', background: 'rgba(26, 15, 36, 0.9)', padding: '20px', borderRight: '1px solid rgba(183, 127, 255, 0.2)' }}>
                    <div style={{ color: '#b77fff', fontSize: '14px', marginBottom: '16px' }}>TERMINAL</div>
                    <p style={{ color: '#b77fff', margin: '0 0 8px' }}>&gt; whoami</p>
                    <p style={{ color: '#fff', margin: '0 0 16px' }}>Ali Akouhar - Software Engineer</p>
                    <p style={{ color: '#b77fff', margin: '0 0 8px' }}>&gt; skills</p>
                    <p style={{ color: '#b8a9cc', margin: '0 0 4px', fontSize: '12px' }}>Frontend: HTML5, CSS3, TypeScript</p>
                    <p style={{ color: '#b8a9cc', margin: '0 0 4px', fontSize: '12px' }}>Systems: C, C++, Linux</p>
                    <p style={{ color: '#b8a9cc', margin: '0', fontSize: '12px' }}>DevOps: Docker, Git, Node.js</p>
                </div>
                <div style={{ flex: 1, padding: '20px', position: 'relative' }}>
                    <WindowMockup title="ABOUT" x={20} y={20}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #7b3fff, #b77fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👨‍💻</div>
                            <div>
                                <p style={{ color: '#fff', margin: 0, fontWeight: 700 }}>Ali Akouhar</p>
                                <p style={{ color: '#b77fff', margin: '4px 0 0', fontSize: '12px' }}>Software Engineer</p>
                            </div>
                        </div>
                    </WindowMockup>
                </div>
            </div>
        ),
    },
    {
        name: 'Projects Window',
        content: (
            <div style={{ padding: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <ProjectCard name="Cub3D" desc="3D Raycasting Engine" tech={['C', 'Graphics']} />
                <ProjectCard name="Minishell" desc="UNIX Shell Implementation" tech={['C', 'System Calls']} />
                <ProjectCard name="ft_transcendence" desc="Full-Stack Ping Pong SPA" tech={['TypeScript', 'WebSockets']} />
                <ProjectCard name="Inception" desc="Docker Service Orchestration" tech={['Docker', 'Linux']} />
            </div>
        ),
    },
    {
        name: 'Skills Overview',
        content: (
            <div style={{ padding: '30px', display: 'flex', gap: '24px', justifyContent: 'center' }}>
                <SkillCard title="Frontend" skills={['HTML5', 'CSS3', 'TypeScript', 'TailwindCSS']} />
                <SkillCard title="Systems" skills={['C', 'C++', 'Linux', 'Memory Mgmt']} />
                <SkillCard title="DevOps" skills={['Docker', 'Git', 'Node.js', 'CI/CD']} />
            </div>
        ),
    },
];

const WindowMockup: React.FC<{ title: string; x: number; y: number; children: React.ReactNode }> = ({ title, x, y, children }) => (
    <div style={{ position: 'absolute', left: x, top: y, width: '300px', background: 'rgba(26, 15, 36, 0.95)', border: '1px solid rgba(183, 127, 255, 0.3)', borderRadius: '12px', boxShadow: '0 0 30px rgba(183, 127, 255, 0.15)' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(183, 127, 255, 0.2)', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
            </div>
            <span style={{ color: '#b77fff', fontSize: '11px' }}>{title}</span>
        </div>
        <div style={{ padding: '16px' }}>{children}</div>
    </div>
);

const ProjectCard: React.FC<{ name: string; desc: string; tech: string[] }> = ({ name, desc, tech }) => (
    <div style={{ width: '280px', background: 'rgba(26, 15, 36, 0.95)', border: '1px solid rgba(183, 127, 255, 0.3)', borderRadius: '12px', padding: '20px', boxShadow: '0 0 20px rgba(183, 127, 255, 0.1)' }}>
        <h3 style={{ color: '#b77fff', margin: '0 0 8px', fontSize: '18px' }}>{name}</h3>
        <p style={{ color: '#b8a9cc', margin: '0 0 12px', fontSize: '13px' }}>{desc}</p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {tech.map((t) => (
                <span key={t} style={{ background: 'rgba(183, 127, 255, 0.2)', color: '#d4a5ff', padding: '4px 8px', borderRadius: '4px', fontSize: '10px' }}>{t}</span>
            ))}
        </div>
    </div>
);

const SkillCard: React.FC<{ title: string; skills: string[] }> = ({ title, skills }) => (
    <div style={{ width: '260px', background: 'rgba(26, 15, 36, 0.95)', border: '1px solid rgba(183, 127, 255, 0.3)', borderRadius: '16px', padding: '24px', boxShadow: '0 0 30px rgba(183, 127, 255, 0.15)' }}>
        <h3 style={{ color: '#b77fff', margin: '0 0 16px', fontSize: '20px', textShadow: '0 0 10px #b77fff' }}>// {title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {skills.map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#b77fff' }} />
                    <span style={{ color: '#ffffff', fontSize: '14px' }}>{s}</span>
                </div>
            ))}
        </div>
    </div>
);

export const Scene4Showcase: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: '#0d0711' }}>
            {/* Demo page 1: Boot Sequence (0-180 frames) */}
            <Sequence from={0} durationInFrames={180}>
                <DemoPage page={DEMO_PAGES[0]} index={0} />
            </Sequence>

            {/* Demo page 2: Terminal + Windows (180-360 frames) */}
            <Sequence from={180} durationInFrames={180}>
                <DemoPage page={DEMO_PAGES[1]} index={1} />
            </Sequence>

            {/* Demo page 3: Projects (360-540 frames) */}
            <Sequence from={360} durationInFrames={180}>
                <DemoPage page={DEMO_PAGES[2]} index={2} />
            </Sequence>

            {/* Demo page 4: Skills (540-720 frames) */}
            <Sequence from={540} durationInFrames={180}>
                <DemoPage page={DEMO_PAGES[3]} index={3} />
            </Sequence>

            {/* Page indicator */}
            <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px' }}>
                {DEMO_PAGES.map((_, i) => {
                    const isActive = frame >= i * 180 && frame < (i + 1) * 180;
                    return (
                        <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: isActive ? '#b77fff' : 'rgba(183, 127, 255, 0.3)', boxShadow: isActive ? '0 0 10px #b77fff' : 'none', transition: 'all 0.3s' }} />
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

const DemoPage: React.FC<{ page: typeof DEMO_PAGES[0]; index: number }> = ({ page, index }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
    const slideUp = spring({ frame, fps, from: 30, to: 0, durationInFrames: 30 });
    const scaleIn = spring({ frame, fps, from: 0.95, to: 1, durationInFrames: 40 });

    return (
        <AbsoluteFill style={{ opacity: fadeIn }}>
            {/* Page title */}
            <div style={{ position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)' }}>
                <h2 style={{ color: '#fff', fontSize: '28px', margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
                    <span style={{ color: '#b77fff' }}>//</span> {page.name}
                </h2>
            </div>

            {/* Browser frame */}
            <div style={{ position: 'absolute', top: '100px', left: '50%', transform: `translateX(-50%) translateY(${slideUp}px) scale(${scaleIn})`, width: '1400px' }}>
                <div style={{ background: 'rgba(26, 15, 36, 0.95)', border: '2px solid rgba(183, 127, 255, 0.3)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 0 60px rgba(183, 127, 255, 0.2)' }}>
                    {/* Browser chrome */}
                    <div style={{ padding: '12px 16px', background: 'rgba(13, 7, 17, 0.9)', borderBottom: '1px solid rgba(183, 127, 255, 0.2)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
                        </div>
                        <div style={{ flex: 1, background: 'rgba(45, 27, 61, 0.6)', borderRadius: '6px', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#28c840', fontSize: '10px' }}>🔒</span>
                            <span style={{ color: '#b8a9cc', fontSize: '12px', fontFamily: "'JetBrains Mono', monospace" }}>ali-akouhar.dev</span>
                        </div>
                    </div>

                    {/* Page content */}
                    <div style={{ height: '550px', background: '#0d0711', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}>
                        {page.content}
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
