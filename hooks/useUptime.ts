'use client';

import { useEffect, useState } from 'react';

export function useUptime() {
    const [uptime, setUptime] = useState('00:00:00');

    useEffect(() => {
        const startTime = Date.now();

        const updateUptime = () => {
            const elapsed = Date.now() - startTime;
            const hours = Math.floor(elapsed / 3600000);
            const minutes = Math.floor((elapsed % 3600000) / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);

            setUptime(
                `${hours.toString().padStart(2, '0')}:${minutes
                    .toString()
                    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
        };

        const interval = setInterval(updateUptime, 1000);
        updateUptime();

        return () => clearInterval(interval);
    }, []);

    return uptime;
}
