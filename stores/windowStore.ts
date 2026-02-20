import { create } from 'zustand';

export interface Window {
    id: string;
    title: string;
    type: 'about' | 'skills' | 'project' | 'contact';
    projectName?: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
}

interface WindowStore {
    windows: Window[];
    maxZIndex: number;
    openWindow: (window: Omit<Window, 'id' | 'zIndex'>) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    updatePosition: (id: string, position: { x: number; y: number }) => void;
    closeAllWindows: () => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
    windows: [],
    maxZIndex: 1,

    openWindow: (windowData) => {
        const id = `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newZIndex = get().maxZIndex + 1;

        set((state) => ({
            windows: [...state.windows, { ...windowData, id, zIndex: newZIndex }],
            maxZIndex: newZIndex,
        }));
    },

    closeWindow: (id) => {
        set((state) => ({
            windows: state.windows.filter((w) => w.id !== id),
        }));
    },

    focusWindow: (id) => {
        const newZIndex = get().maxZIndex + 1;
        set((state) => ({
            windows: state.windows.map((w) =>
                w.id === id ? { ...w, zIndex: newZIndex } : w
            ),
            maxZIndex: newZIndex,
        }));
    },

    updatePosition: (id, position) => {
        set((state) => ({
            windows: state.windows.map((w) =>
                w.id === id ? { ...w, position } : w
            ),
        }));
    },

    closeAllWindows: () => {
        set({ windows: [], maxZIndex: 1 });
    },
}));
