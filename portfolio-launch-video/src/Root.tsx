import { Composition } from 'remotion';
import { DemoComposition } from './DemoComposition';

// Total duration calculation:
// Scene 1: 150f + Scene 2: 240f + Scene 3: 330f + Scene 4: 180f = 900f
// Minus 3 transitions × 15f = 45f
// Total: 900 - 45 = 855 frames ≈ 28.5s at 30fps

export const RemotionRoot: React.FC = () => {
    return (
        <>
            {/* LinkedIn Demo Video */}
            <Composition
                id="PortfolioDemo"
                component={DemoComposition}
                durationInFrames={855}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
