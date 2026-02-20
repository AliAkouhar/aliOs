import { useWindowStore } from '@/stores/windowStore';
import { useTerminalStore } from '@/stores/terminalStore';
import { useThemeStore } from '@/stores/themeStore';
import { USER_DATA, SKILLS, PROJECTS, COMMANDS } from '@/lib/constants';

export function executeCommand(input: string): void {
    const terminalStore = useTerminalStore.getState();
    const windowStore = useWindowStore.getState();
    const themeStore = useThemeStore.getState();

    const trimmed = input.trim().toLowerCase();
    const [command, ...args] = trimmed.split(' ');

    // Add input to history
    terminalStore.addEntry('input', `> ${input}`);
    terminalStore.addToCommandHistory(input);

    switch (command) {
        case 'help':
        case '?':
            terminalStore.addMultipleEntries([
                { type: 'output', content: '' },
                { type: 'output', content: 'Available commands:' },
                { type: 'output', content: '  help          - Show this help message' },
                { type: 'output', content: '  whoami        - Display user information' },
                { type: 'output', content: '  about         - Open about window' },
                { type: 'output', content: '  skills        - Open skills visualization' },
                { type: 'output', content: '  projects      - List all projects' },
                { type: 'output', content: '  run [project] - Run a project demo' },
                { type: 'output', content: '  contact       - Open contact window' },
                { type: 'output', content: '  clear         - Clear terminal' },
                { type: 'output', content: '  exit          - Close all windows' },
                { type: 'output', content: '  theme [name]  - Change theme (cosmic/matrix/cyberpunk)' },
                { type: 'output', content: '' },
            ]);
            break;

        case 'whoami':
            terminalStore.addMultipleEntries([
                { type: 'output', content: '' },
                { type: 'output', content: `USER: ${USER_DATA.name}` },
                { type: 'output', content: `ROLE: ${USER_DATA.role}` },
                { type: 'output', content: `LOCATION: ${USER_DATA.location}` },
                { type: 'output', content: `TRAINING: ${USER_DATA.education}` },
                { type: 'output', content: 'SPECIALIZATION: Low-level programming + Modern web tech' },
                { type: 'output', content: 'MINDSET: Fast learning, problem-solving, systems thinking' },
                { type: 'output', content: '' },
            ]);
            break;

        case 'about':
            terminalStore.addEntry('system', '> Opening about window...');
            terminalStore.setCurrentProcess('about');
            windowStore.openWindow({
                title: 'About – Ali Akouhar',
                type: 'about',
                position: { x: 100, y: 80 },
                size: { width: 500, height: 400 },
            });
            break;

        case 'skills':
            terminalStore.addEntry('system', '> Initializing skill visualization...');
            terminalStore.setCurrentProcess('skills');
            windowStore.openWindow({
                title: 'Skills – Process Monitor',
                type: 'skills',
                position: { x: 120, y: 100 },
                size: { width: 600, height: 450 },
            });
            break;

        case 'projects':
            terminalStore.addMultipleEntries([
                { type: 'output', content: '' },
                { type: 'output', content: 'Available projects:' },
                { type: 'output', content: '  1. cub3d           - 3D Raycasting Engine' },
                { type: 'output', content: '  2. minishell       - UNIX Shell Implementation' },
                { type: 'output', content: '  3. inception       - Docker Service Orchestration' },
                { type: 'output', content: '  4. philosophers    - Multithreading Simulation' },
                { type: 'output', content: '  5. ft_transcendence - Full-Stack Ping Pong SPA' },
                { type: 'output', content: '  6. irc             - Internet Relay Chat Server' },
                { type: 'output', content: '  7. fractol         - Fractal Explorer' },
                { type: 'output', content: '' },
                { type: 'output', content: "Usage: run [project_name]" },
                { type: 'output', content: '' },
            ]);
            break;

        case 'run':
            const projectName = args[0];
            if (!projectName) {
                terminalStore.addEntry('error', 'Error: Please specify a project name');
                terminalStore.addEntry('output', "Usage: run [project_name]");
                break;
            }

            const project = PROJECTS[projectName as keyof typeof PROJECTS];
            if (!project) {
                terminalStore.addEntry('error', `Error: Project '${projectName}' not found`);
                terminalStore.addEntry('output', 'Available: cub3d, minishell, inception, philosophers, ft_transcendence, irc, fractol');
                break;
            }

            terminalStore.addEntry('system', `> Loading ${project.name} demo...`);
            terminalStore.setCurrentProcess(projectName);
            windowStore.openWindow({
                title: `${project.name} – ${project.title}`,
                type: 'project',
                projectName,
                position: { x: 80 + Math.random() * 100, y: 60 + Math.random() * 80 },
                size: { width: 650, height: 480 },
            });
            break;

        case 'contact':
            terminalStore.addEntry('system', '> Opening contact window...');
            terminalStore.setCurrentProcess('contact');
            windowStore.openWindow({
                title: 'Contact – Get in Touch',
                type: 'contact',
                position: { x: 150, y: 120 },
                size: { width: 400, height: 320 },
            });
            break;

        case 'clear':
            terminalStore.clearHistory();
            terminalStore.setCurrentProcess('shell');
            break;

        case 'exit':
            terminalStore.addEntry('system', '> Closing all windows...');
            windowStore.closeAllWindows();
            terminalStore.setCurrentProcess('shell');
            break;

        case 'theme':
            const themeName = args[0];
            if (!themeName || !['cosmic', 'matrix', 'cyberpunk'].includes(themeName)) {
                terminalStore.addEntry('output', 'Available themes: cosmic, matrix, cyberpunk');
                break;
            }
            themeStore.setTheme(themeName as 'cosmic' | 'matrix' | 'cyberpunk');
            terminalStore.addEntry('system', `> Theme changed to ${themeName}`);
            break;

        case 'sudo':
            terminalStore.addEntry('error', 'Permission denied. Nice try though.');
            break;

        default:
            if (trimmed === '') {
                // Empty command, just add a new line
                break;
            }
            terminalStore.addEntry('error', `Command not found: ${command}`);
            terminalStore.addEntry('output', "Type 'help' for available commands");
            break;
    }
}

export function getAutoComplete(partial: string): string | null {
    const trimmed = partial.trim().toLowerCase();
    if (!trimmed) return null;

    // Check for run command auto-complete
    if (trimmed.startsWith('run ')) {
        const projectPartial = trimmed.slice(4);
        const projectNames = Object.keys(PROJECTS);
        const match = projectNames.find((p) => p.startsWith(projectPartial));
        return match ? `run ${match}` : null;
    }

    // Check for theme command auto-complete
    if (trimmed.startsWith('theme ')) {
        const themePartial = trimmed.slice(6);
        const themes = ['cosmic', 'matrix', 'cyberpunk'];
        const match = themes.find((t) => t.startsWith(themePartial));
        return match ? `theme ${match}` : null;
    }

    // Check for regular commands
    const match = COMMANDS.find((cmd) => cmd.startsWith(trimmed));
    return match || null;
}
