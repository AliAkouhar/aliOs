'use client';

import { PROJECTS } from '@/lib/constants';

// Import all project demos
import Cub3DDemo from '@/components/projects/Cub3DDemo';
import MinishellDemo from '@/components/projects/MinishellDemo';
import InceptionDemo from '@/components/projects/InceptionDemo';
import PhilosophersDemo from '@/components/projects/PhilosophersDemo';
import TranscendenceDemo from '@/components/projects/TranscendenceDemo';
import IRCDemo from '@/components/projects/IRCDemo';
import FractolDemo from '@/components/projects/FractolDemo';

interface ProjectWindowProps {
    projectName: string;
}

export default function ProjectWindow({ projectName }: ProjectWindowProps) {
    const project = PROJECTS[projectName as keyof typeof PROJECTS];

    if (!project) {
        return (
            <div className="text-[var(--sys-warning)]">
                Project not found: {projectName}
            </div>
        );
    }

    const renderDemo = () => {
        switch (projectName) {
            case 'cub3d':
                return <Cub3DDemo />;
            case 'minishell':
                return <MinishellDemo />;
            case 'inception':
                return <InceptionDemo />;
            case 'philosophers':
                return <PhilosophersDemo />;
            case 'ft_transcendence':
                return <TranscendenceDemo />;
            case 'irc':
                return <IRCDemo />;
            case 'fractol':
                return <FractolDemo />;
            default:
                return null;
        }
    };

    return (
        <div className="h-full flex gap-4">
            {/* Left: Interactive demo */}
            <div className="flex-1 min-w-0">
                {renderDemo()}
            </div>

            {/* Right: Project info */}
            <div className="w-48 shrink-0 space-y-4 text-xs border-l border-[var(--sys-border)] pl-4">
                <div>
                    <h4 className="text-[var(--sys-accent)] font-semibold mb-1">{'// ABOUT'}</h4>
                    <p className="text-[var(--sys-text-dim)]">{project.description}</p>
                </div>

                <div>
                    <h4 className="text-[var(--sys-accent)] font-semibold mb-1">{'// FEATURES'}</h4>
                    <ul className="space-y-1">
                        {project.features.map((feature, i) => (
                            <li key={i} className="text-[var(--sys-text)] flex items-start gap-1">
                                <span className="text-[var(--sys-accent)]">•</span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-[var(--sys-accent)] font-semibold mb-1">{'// TECH'}</h4>
                    <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                className="px-1.5 py-0.5 rounded text-[10px]"
                                style={{
                                    background: 'rgba(183, 127, 255, 0.2)',
                                    border: '1px solid rgba(183, 127, 255, 0.3)',
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {'role' in project && (
                    <div>
                        <h4 className="text-[var(--sys-accent)] font-semibold mb-1">{'// ROLE'}</h4>
                        <p className="text-[var(--sys-text)]">{project.role}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
