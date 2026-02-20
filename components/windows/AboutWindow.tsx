'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { USER_DATA } from '@/lib/constants';

export default function AboutWindow() {
    return (
        <div className="space-y-5 text-sm">
            {/* Profile Header with Image */}
            <section className="flex items-center gap-4">
                {/* Animated Profile Image with Cosmic Ring */}
                <motion.div
                    className="relative shrink-0"
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 15 }}
                >
                    {/* Outer glow ring */}
                    <motion.div
                        className="absolute -inset-1 rounded-full"
                        style={{
                            background: 'linear-gradient(135deg, #7b3fff 0%, #b77fff 50%, #d4a5ff 100%)',
                            filter: 'blur(4px)',
                        }}
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />

                    {/* Inner border */}
                    <div
                        className="relative w-20 h-20 rounded-full overflow-hidden"
                        style={{
                            border: '2px solid rgba(183, 127, 255, 0.6)',
                            boxShadow: `
                0 0 20px rgba(183, 127, 255, 0.5),
                0 0 40px rgba(183, 127, 255, 0.3),
                inset 0 0 20px rgba(183, 127, 255, 0.2)
              `,
                        }}
                    >
                        <Image
                            src="/profile.jpeg"
                            alt="Ali Akouhar"
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>

                    {/* Status indicator */}
                    <motion.div
                        className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-400"
                        style={{
                            boxShadow: '0 0 8px #00ff88',
                            border: '2px solid var(--sys-surface)',
                        }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>

                {/* Name and Title */}
                <div>
                    <motion.h2
                        className="text-lg font-bold text-[var(--sys-text)] glow-text"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {USER_DATA.name}
                    </motion.h2>
                    <motion.p
                        className="text-[var(--sys-accent)] text-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {USER_DATA.role}
                    </motion.p>
                    <motion.p
                        className="text-[var(--sys-text-dim)] text-xs mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        📍 {USER_DATA.location}
                    </motion.p>
                </div>
            </section>

            {/* Bio */}
            <section>
                <h3 className="text-[var(--sys-accent)] font-semibold mb-2 glow-text">// BIO</h3>
                <motion.p
                    className="text-[var(--sys-text)] leading-relaxed text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    {USER_DATA.bio}
                </motion.p>
            </section>

            {/* Education */}
            <section>
                <h3 className="text-[var(--sys-accent)] font-semibold mb-2 glow-text">// EDUCATION</h3>
                <div className="relative pl-4 border-l-2 border-[var(--sys-accent)]/30">
                    <motion.div
                        className="mb-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-[var(--sys-accent)] glow-box" />
                        <div className="ml-4">
                            <p className="text-[var(--sys-text)] font-medium text-xs">1337 | 42 Network</p>
                            <p className="text-[var(--sys-text-dim)] text-xs">Benguerir, Morocco</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Languages */}
            <section>
                <h3 className="text-[var(--sys-accent)] font-semibold mb-2 glow-text">// LANGUAGES</h3>
                <div className="flex gap-2">
                    {USER_DATA.languages.map((lang, i) => (
                        <motion.div
                            key={lang.name}
                            className="px-2 py-1 rounded-md text-xs"
                            style={{
                                background: 'rgba(183, 127, 255, 0.15)',
                                border: '1px solid rgba(183, 127, 255, 0.3)',
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + i * 0.1 }}
                        >
                            <span className="text-[var(--sys-text)]">{lang.name}</span>
                            <span className="text-[var(--sys-text-dim)] ml-1">({lang.level})</span>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
