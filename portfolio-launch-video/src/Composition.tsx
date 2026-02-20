import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { Scene1Opening } from './scenes/Scene1Opening';
import { Scene2Build } from './scenes/Scene2Build';
import { Scene3Features } from './scenes/Scene3Features';
import { Scene4Showcase } from './scenes/Scene4Showcase';
import { Scene5CTA } from './scenes/Scene5CTA';

interface CompositionProps {
    portfolioName: string;
    role: string;
    tagline: string;
    url: string;
}

export const MainComposition: React.FC<CompositionProps> = ({
    portfolioName,
    role,
    tagline,
    url,
}) => {
    return (
        <AbsoluteFill
            style={{
                background: '#0d0711',
                fontFamily: "'JetBrains Mono', monospace",
            }}
        >
            {/* Scene 1: Opening Reveal (0-8 seconds) - 480 frames */}
            <Sequence from={0} durationInFrames={480}>
                <Scene1Opening name={portfolioName} role={role} tagline={tagline} />
            </Sequence>

            {/* Scene 2: The Build Process (8-18 seconds) - 600 frames */}
            <Sequence from={480} durationInFrames={600}>
                <Scene2Build />
            </Sequence>

            {/* Scene 3: Feature Highlights (18-38 seconds) - 1200 frames */}
            <Sequence from={1080} durationInFrames={1200}>
                <Scene3Features />
            </Sequence>

            {/* Scene 4: Portfolio Showcase (38-50 seconds) - 720 frames */}
            <Sequence from={2280} durationInFrames={720}>
                <Scene4Showcase />
            </Sequence>

            {/* Scene 5: Call to Action (50-60 seconds) - 600 frames */}
            <Sequence from={3000} durationInFrames={600}>
                <Scene5CTA name={portfolioName} url={url} />
            </Sequence>
        </AbsoluteFill>
    );
};
