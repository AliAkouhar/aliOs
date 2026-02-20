import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Scene1Boot } from './scenes/Scene1Boot';
import { Scene2Desktop } from './scenes/Scene2Desktop';
import { Scene3Projects } from './scenes/Scene3Projects';
import { Scene4Closing } from './scenes/Scene4Closing';

export const DemoComposition: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#0d0711' }}>
            <TransitionSeries>
                {/* Scene 1: Boot Sequence — 5s */}
                <TransitionSeries.Sequence durationInFrames={150}>
                    <Scene1Boot />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 15 })}
                />

                {/* Scene 2: Desktop Overview — 8s */}
                <TransitionSeries.Sequence durationInFrames={240}>
                    <Scene2Desktop />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 15 })}
                />

                {/* Scene 3: Projects Showcase — 12s (4 projects × 2.5s + buffer) */}
                <TransitionSeries.Sequence durationInFrames={330}>
                    <Scene3Projects />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 15 })}
                />

                {/* Scene 4: Closing — 6s */}
                <TransitionSeries.Sequence durationInFrames={180}>
                    <Scene4Closing />
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
