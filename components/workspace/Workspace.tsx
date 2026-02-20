'use client';

import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
import Window from './Window';

export default function Workspace() {
    const { windows } = useWindowStore();

    return (
        <div className="relative w-full h-full overflow-hidden pointer-events-none">
            <AnimatePresence>
                {windows.map((window) => (
                    <Window key={window.id} window={window} />
                ))}
            </AnimatePresence>
        </div>
    );
}
