import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'cosmic' | 'matrix' | 'cyberpunk';

interface ThemeStore {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: 'cosmic',
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'alios-theme',
        }
    )
);
