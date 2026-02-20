'use client';

import { motion } from 'framer-motion';
import { SKILLS } from '@/lib/constants';

export default function SkillsWindow() {
    const skillCategories = Object.values(SKILLS);

    return (
        <div className="space-y-4 text-sm">
            <p className="text-[var(--sys-text-dim)] text-xs mb-4">
                Active processes: {skillCategories.length} | Status: running
            </p>

            {skillCategories.map((category, catIndex) => (
                <motion.div
                    key={category.process}
                    className="rounded-lg p-4"
                    style={{
                        background: 'rgba(183, 127, 255, 0.08)',
                        border: '1px solid rgba(183, 127, 255, 0.2)',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: catIndex * 0.15 }}
                >
                    {/* Process header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[var(--sys-accent)] font-semibold">{category.name}</span>
                        </div>
                        <span className="text-[var(--sys-text-dim)] text-xs font-mono">
                            PID: {category.process}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-[var(--sys-text-dim)] text-xs mb-3">{category.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                            <motion.span
                                key={skill}
                                className="px-2 py-1 text-xs rounded"
                                style={{
                                    background: 'rgba(183, 127, 255, 0.2)',
                                    border: '1px solid rgba(183, 127, 255, 0.3)',
                                    color: 'var(--sys-text)',
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: catIndex * 0.15 + skillIndex * 0.05 }}
                                whileHover={{
                                    background: 'rgba(183, 127, 255, 0.4)',
                                    scale: 1.05,
                                }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            ))}

            {/* Memory visualization */}
            <div className="mt-4 pt-4 border-t border-[var(--sys-border)]">
                <div className="flex items-center justify-between text-xs text-[var(--sys-text-dim)]">
                    <span>Total Skills Loaded:</span>
                    <span className="text-[var(--sys-accent)]">
                        {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} modules
                    </span>
                </div>
                <div className="mt-2 h-2 rounded-full overflow-hidden bg-[var(--sys-surface)]">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'var(--gradient-purple)' }}
                        initial={{ width: 0 }}
                        animate={{ width: '78%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </div>
            </div>
        </div>
    );
}
