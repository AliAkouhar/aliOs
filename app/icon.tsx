import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: '#0d0711',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#7b3fff',
                    borderRadius: '5px',
                    fontFamily: 'monospace',
                    fontWeight: 800,
                }}
            >
                A
            </div>
        ),
        { ...size }
    );
}
