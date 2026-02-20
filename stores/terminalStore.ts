import { create } from 'zustand';

export interface TerminalEntry {
    id: string;
    type: 'input' | 'output' | 'error' | 'system';
    content: string;
}

interface TerminalStore {
    history: TerminalEntry[];
    commandHistory: string[];
    historyIndex: number;
    currentProcess: string;
    addEntry: (type: TerminalEntry['type'], content: string) => void;
    addMultipleEntries: (entries: Array<{ type: TerminalEntry['type']; content: string }>) => void;
    clearHistory: () => void;
    addToCommandHistory: (command: string) => void;
    navigateHistory: (direction: 'up' | 'down') => string;
    resetHistoryIndex: () => void;
    setCurrentProcess: (process: string) => void;
}

export const useTerminalStore = create<TerminalStore>((set, get) => ({
    history: [],
    commandHistory: [],
    historyIndex: -1,
    currentProcess: 'shell',

    addEntry: (type, content) => {
        const id = `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        set((state) => ({
            history: [...state.history, { id, type, content }],
        }));
    },

    addMultipleEntries: (entries) => {
        const newEntries = entries.map((e) => ({
            id: `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            ...e,
        }));
        set((state) => ({
            history: [...state.history, ...newEntries],
        }));
    },

    clearHistory: () => {
        set({ history: [] });
    },

    addToCommandHistory: (command) => {
        set((state) => ({
            commandHistory: [...state.commandHistory, command],
            historyIndex: -1,
        }));
    },

    navigateHistory: (direction) => {
        const { commandHistory, historyIndex } = get();
        if (commandHistory.length === 0) return '';

        let newIndex = historyIndex;
        if (direction === 'up') {
            newIndex = historyIndex === -1
                ? commandHistory.length - 1
                : Math.max(0, historyIndex - 1);
        } else {
            newIndex = historyIndex === -1
                ? -1
                : Math.min(commandHistory.length - 1, historyIndex + 1);
        }

        set({ historyIndex: newIndex });
        return newIndex >= 0 ? commandHistory[newIndex] : '';
    },

    resetHistoryIndex: () => {
        set({ historyIndex: -1 });
    },

    setCurrentProcess: (process) => {
        set({ currentProcess: process });
    },
}));
