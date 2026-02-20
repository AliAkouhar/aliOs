'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { USER_DATA } from '@/lib/constants';

export default function ContactWindow() {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = async (text: string, type: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const contacts = [
        {
            type: 'email',
            label: 'Email',
            value: USER_DATA.email,
            href: `mailto:${USER_DATA.email}`,
            icon: '📧',
        },
        {
            type: 'phone',
            label: 'Phone',
            value: USER_DATA.phone,
            href: `tel:${USER_DATA.phone}`,
            icon: '📱',
        },
        {
            type: 'linkedin',
            label: 'LinkedIn',
            value: 'ali-akouhar',
            href: USER_DATA.linkedin,
            icon: '💼',
        },
    ];

    return (
        <div className="space-y-4 text-sm">
            <p className="text-[var(--sys-text-dim)] mb-4">
                Get in touch – I&apos;m always open to new opportunities!
            </p>

            {contacts.map((contact, i) => (
                <motion.div
                    key={contact.type}
                    className="group relative p-4 rounded-lg transition-all duration-200"
                    style={{
                        background: 'rgba(183, 127, 255, 0.08)',
                        border: '1px solid rgba(183, 127, 255, 0.2)',
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{
                        background: 'rgba(183, 127, 255, 0.15)',
                        border: '1px solid rgba(183, 127, 255, 0.4)',
                    }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">{contact.icon}</span>
                            <div>
                                <p className="text-[var(--sys-text-dim)] text-xs">{contact.label}</p>
                                <a
                                    href={contact.href}
                                    target={contact.type === 'linkedin' ? '_blank' : undefined}
                                    rel={contact.type === 'linkedin' ? 'noopener noreferrer' : undefined}
                                    className="text-[var(--sys-text)] hover:text-[var(--sys-accent)] transition-colors"
                                >
                                    {contact.value}
                                </a>
                            </div>
                        </div>

                        <button
                            onClick={() => handleCopy(contact.value, contact.type)}
                            className="px-3 py-1 text-xs rounded transition-all duration-200
                         bg-[var(--sys-surface)] hover:bg-[var(--sys-accent)]
                         text-[var(--sys-text-dim)] hover:text-white"
                        >
                            {copied === contact.type ? '✓ Copied!' : 'Copy'}
                        </button>
                    </div>
                </motion.div>
            ))}

            {/* Location */}
            <motion.div
                className="mt-6 p-4 rounded-lg text-center"
                style={{
                    background: 'rgba(183, 127, 255, 0.05)',
                    border: '1px solid rgba(183, 127, 255, 0.1)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <span className="text-[var(--sys-text-dim)]">📍 Based in </span>
                <span className="text-[var(--sys-accent)]">{USER_DATA.location}</span>
            </motion.div>
        </div>
    );
}
