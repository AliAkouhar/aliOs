import React from 'react';

export const DeviceFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div
            style={{
                background: '#1a0f24',
                borderRadius: '16px',
                padding: '8px',
                boxShadow: `
          0 0 0 1px rgba(183, 127, 255, 0.2),
          0 20px 60px rgba(0, 0, 0, 0.5),
          0 0 40px rgba(183, 127, 255, 0.1)
        `,
            }}
        >
            {/* Device notch/camera */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '8px 0',
                }}
            >
                <div
                    style={{
                        width: '60px',
                        height: '6px',
                        borderRadius: '3px',
                        background: 'rgba(183, 127, 255, 0.3)',
                    }}
                />
            </div>

            {/* Screen content */}
            <div
                style={{
                    background: '#0d0711',
                    borderRadius: '8px',
                    overflow: 'hidden',
                }}
            >
                {children}
            </div>
        </div>
    );
};
