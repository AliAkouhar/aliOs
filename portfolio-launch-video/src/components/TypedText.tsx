import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface TypedTextProps {
    text: string;
    startFrame: number;
    isSuccess?: boolean;
}

export const TypedText: React.FC<TypedTextProps> = ({ text, startFrame, isSuccess = false }) => {
    const frame = useCurrentFrame();

    // Calculate how many characters to show
    const charsToShow = Math.floor(
        interpolate(
            frame - startFrame,
            [0, text.length * 2],
            [0, text.length],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
    );

    // Don't render if we haven't reached the start frame
    if (frame < startFrame) {
        return null;
    }

    const displayText = text.substring(0, charsToShow);
    const showCursor = charsToShow < text.length && Math.floor((frame - startFrame) * 0.1) % 2 === 0;

    return (
        <div
            style={{
                marginBottom: '8px',
                fontSize: '18px',
                fontFamily: "'JetBrains Mono', monospace",
                color: isSuccess ? '#28c840' : text.startsWith('>') ? '#b77fff' : '#ffffff',
                textShadow: isSuccess ? '0 0 10px #28c840' : text.startsWith('>') ? '0 0 5px #b77fff' : 'none',
            }}
        >
            {displayText}
            {showCursor && (
                <span
                    style={{
                        display: 'inline-block',
                        width: '10px',
                        height: '18px',
                        background: '#b77fff',
                        marginLeft: '2px',
                        verticalAlign: 'middle',
                    }}
                />
            )}
        </div>
    );
};
