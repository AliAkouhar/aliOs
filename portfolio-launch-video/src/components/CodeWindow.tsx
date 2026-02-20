import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface CodeWindowProps {
    startFrame: number;
}

const CODE_LINES = [
    '// Portfolio Components',
    "import { BootSequence } from './components/boot';",
    "import { Terminal } from './components/terminal';",
    "import { Workspace } from './components/workspace';",
    '',
    'export default function Home() {',
    '  const [booted, setBooted] = useState(false);',
    '',
    '  return (',
    '    <main className="h-screen bg-cosmic">',
    '      <ParticleField />',
    '      <StatusBar />',
    '      <Terminal />',
    '      <Workspace />',
    '    </main>',
    '  );',
    '}',
];

export const CodeWindow: React.FC<CodeWindowProps> = ({ startFrame }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const windowOpacity = spring({
        frame: frame - startFrame,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 30,
    });

    return (
        <div
            style={{
                background: 'rgba(26, 15, 36, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(183, 127, 255, 0.2)',
                borderRadius: '16px',
                overflow: 'hidden',
                height: '100%',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                opacity: windowOpacity,
            }}
        >
            {/* Code editor header */}
            <div
                style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid rgba(183, 127, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
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
                        color: '#b8a9cc',
                        fontSize: '14px',
                        fontFamily: "'JetBrains Mono', monospace",
                    }}
                >
                    page.tsx
                </span>
            </div>

            {/* Code content */}
            <div
                style={{
                    padding: '20px 24px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '14px',
                    lineHeight: '24px',
                }}
            >
                {CODE_LINES.map((line, index) => {
                    const lineStartFrame = startFrame + index * 15;
                    const lineOpacity = interpolate(
                        frame - lineStartFrame,
                        [0, 10],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    );

                    // Syntax highlighting
                    let content: React.ReactNode = line;
                    if (line.startsWith('//')) {
                        content = <span style={{ color: '#6a5a7d' }}>{line}</span>;
                    } else if (line.includes('import') || line.includes('export') || line.includes('return') || line.includes('const')) {
                        content = highlightCode(line);
                    } else {
                        content = <span style={{ color: '#ffffff' }}>{line}</span>;
                    }

                    return (
                        <div
                            key={index}
                            style={{
                                opacity: lineOpacity,
                                display: 'flex',
                                gap: '24px',
                            }}
                        >
                            <span style={{ color: '#4a3a5d', minWidth: '24px', textAlign: 'right' }}>
                                {index + 1}
                            </span>
                            <span>{content}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

function highlightCode(line: string): React.ReactNode {
    // Simple syntax highlighting
    const keywords = ['import', 'export', 'default', 'function', 'const', 'return'];
    const components = ['BootSequence', 'Terminal', 'Workspace', 'ParticleField', 'StatusBar', 'Home'];

    let result = line;

    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        result = result.replace(regex, `<keyword>${keyword}</keyword>`);
    });

    components.forEach(component => {
        const regex = new RegExp(`\\b${component}\\b`, 'g');
        result = result.replace(regex, `<component>${component}</component>`);
    });

    // Parse the result
    const parts = result.split(/(<keyword>|<\/keyword>|<component>|<\/component>)/);
    let inKeyword = false;
    let inComponent = false;

    return (
        <>
            {parts.map((part, i) => {
                if (part === '<keyword>') {
                    inKeyword = true;
                    return null;
                }
                if (part === '</keyword>') {
                    inKeyword = false;
                    return null;
                }
                if (part === '<component>') {
                    inComponent = true;
                    return null;
                }
                if (part === '</component>') {
                    inComponent = false;
                    return null;
                }

                if (inKeyword) {
                    return <span key={i} style={{ color: '#ff79c6' }}>{part}</span>;
                }
                if (inComponent) {
                    return <span key={i} style={{ color: '#8be9fd' }}>{part}</span>;
                }

                // Handle strings
                if (part.includes("'") || part.includes('"')) {
                    return <span key={i} style={{ color: '#f1fa8c' }}>{part}</span>;
                }

                return <span key={i} style={{ color: '#ffffff' }}>{part}</span>;
            })}
        </>
    );
}
