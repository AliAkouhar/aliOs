'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useWindowStore, Window as WindowType } from '@/stores/windowStore';

// Window content components
import AboutWindow from '@/components/windows/AboutWindow';
import SkillsWindow from '@/components/windows/SkillsWindow';
import ContactWindow from '@/components/windows/ContactWindow';
import ProjectWindow from '@/components/windows/ProjectWindow';

interface WindowProps {
    window: WindowType;
}

export default function Window({ window: w }: WindowProps) {
    const { closeWindow, focusWindow, updatePosition } = useWindowStore();
    const [isDragging, setIsDragging] = useState(false);
    const constraintsRef = useRef<HTMLDivElement>(null);

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeWindow(w.id);
    };

    const renderContent = () => {
        switch (w.type) {
            case 'about':
                return <AboutWindow />;
            case 'skills':
                return <SkillsWindow />;
            case 'contact':
                return <ContactWindow />;
            case 'project':
                return <ProjectWindow projectName={w.projectName || ''} />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            className="absolute pointer-events-auto"
            style={{
                zIndex: w.zIndex,
                width: w.size.width,
                height: w.size.height,
            }}
            initial={{ opacity: 0, scale: 0.9, x: w.position.x, y: w.position.y }}
            animate={{
                opacity: 1,
                scale: 1,
                x: w.position.x,
                y: w.position.y,
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            drag
            dragMomentum={false}
            dragElastic={0.1}
            onDragStart={() => {
                setIsDragging(true);
                focusWindow(w.id);
            }}
            onDragEnd={(_, info) => {
                setIsDragging(false);
                updatePosition(w.id, {
                    x: w.position.x + info.offset.x,
                    y: w.position.y + info.offset.y,
                });
            }}
            onMouseDown={() => focusWindow(w.id)}
        >
            <div
                className={`w-full h-full rounded-lg overflow-hidden flex flex-col glow-border transition-shadow duration-200 ${isDragging ? 'shadow-2xl' : ''
                    }`}
                style={{
                    background: 'rgba(26, 15, 36, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(183, 127, 255, 0.3)',
                }}
            >
                {/* Title bar */}
                <div
                    className="h-10 flex items-center justify-between px-3 cursor-grab active:cursor-grabbing"
                    style={{
                        background: 'linear-gradient(135deg, rgba(123, 63, 255, 0.3) 0%, rgba(183, 127, 255, 0.2) 100%)',
                        borderBottom: '1px solid rgba(183, 127, 255, 0.2)',
                    }}
                >
                    <span className="text-sm font-medium text-[var(--sys-text)] truncate flex-1">
                        {w.title}
                    </span>
                    <button
                        onClick={handleClose}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs
                       bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white
                       transition-all duration-200"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4">
                    {renderContent()}
                </div>
            </div>
        </motion.div>
    );
}
