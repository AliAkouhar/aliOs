import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: string;
    delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
    title,
    description,
    icon,
    delay = 0,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideIn = spring({
        frame: frame - delay,
        fps,
        from: 60,
        to: 0,
        durationInFrames: 40,
    });

    const fadeIn = spring({
        frame: frame - delay,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 30,
    });

    return (
        <div
            style={{
                background: 'rgba(26, 15, 36, 0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '40px',
                border: '1px solid rgba(183, 127, 255, 0.3)',
                maxWidth: '500px',
                boxShadow: `
          0 0 40px rgba(183, 127, 255, 0.15),
          0 20px 60px rgba(0, 0, 0, 0.4),
          inset 0 0 30px rgba(183, 127, 255, 0.05)
        `,
                opacity: fadeIn,
                transform: `translateY(${slideIn}px)`,
            }}
        >
            {/* Icon */}
            <div
                style={{
                    fontSize: '64px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, rgba(123, 63, 255, 0.2), rgba(183, 127, 255, 0.1))',
                    borderRadius: '20px',
                    border: '1px solid rgba(183, 127, 255, 0.3)',
                }}
            >
                {icon}
            </div>

            {/* Title */}
            <h3
                style={{
                    fontSize: '36px',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: '0 0 16px',
                    fontFamily: "'JetBrains Mono', monospace",
                    textShadow: '0 0 20px rgba(183, 127, 255, 0.3)',
                }}
            >
                {title}
            </h3>

            {/* Description */}
            <p
                style={{
                    fontSize: '20px',
                    color: '#b8a9cc',
                    margin: 0,
                    lineHeight: 1.6,
                    fontFamily: "'JetBrains Mono', monospace",
                }}
            >
                {description}
            </p>
        </div>
    );
};
