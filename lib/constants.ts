// Personal Information
export const USER_DATA = {
    name: 'Ali Akouhar',
    role: 'Software Engineer',
    location: 'Agadir, Morocco',
    education: '1337 | 42 Network – Benguerir',
    email: 'akouhar06ali@gmail.com',
    phone: '+212 655930457',
    linkedin: 'https://linkedin.com/in/ali-akouhar',
    bio: 'Software engineer with strong skills in low-level programming and modern web technologies. Trained at 1337 (42 Network), where I developed fast learning, problem-solving, and teamwork abilities.',
    languages: [
        { name: 'Arabic', level: 'Native' },
        { name: 'English', level: 'Professional' },
    ],
};

// Skills by category
export const SKILLS = {
    frontend: {
        name: 'Frontend Engineering',
        process: 'frontend_stack',
        skills: ['HTML5', 'CSS3', 'TailwindCSS', 'JavaScript', 'TypeScript'],
        description: 'Modern web interfaces with responsive design and smooth animations',
    },
    systems: {
        name: 'Systems & Low-Level',
        process: 'systems_core',
        skills: ['C', 'C++', 'Linux', 'Memory Management', 'System Calls'],
        description: 'Low-level programming, threading, and operating system concepts',
    },
    devops: {
        name: 'DevOps & Tools',
        process: 'toolchain',
        skills: ['Docker', 'Git', 'Node.js'],
        description: 'Containerization, version control, and development workflows',
    },
};

// Project definitions
export const PROJECTS = {
    cub3d: {
        name: 'Cub3D',
        title: '3D Raycasting Engine',
        description: 'A Wolfenstein-inspired 3D game engine using raycasting',
        features: [
            'First-person rendering environment',
            'Texture loading and mapping',
            'Collision detection system',
            'Optimized rendering pipeline',
        ],
        tech: ['C', 'Raycasting', 'Graphics Programming', 'MiniLibX'],
    },
    minishell: {
        name: 'Minishell',
        title: 'UNIX Shell Implementation',
        description: 'A functional UNIX shell with pipelines and redirections',
        features: [
            'Command parsing & execution',
            'Pipelines (|) and redirections (>, <, >>)',
            'Environment variables',
            'Process management (fork, exec, wait)',
        ],
        tech: ['C', 'System Calls', 'Process Control', 'Parsing'],
    },
    inception: {
        name: 'Inception',
        title: 'Docker Service Orchestration',
        description: 'Multi-container Docker infrastructure with WordPress, MariaDB, and Nginx',
        features: [
            'Docker containerization',
            'Service orchestration',
            'Network configuration',
            'Secure system management',
        ],
        tech: ['Docker', 'Docker Compose', 'Linux', 'Networking'],
    },
    philosophers: {
        name: 'Philosophers',
        title: 'Multithreading Simulation',
        description: 'Dining philosophers problem with mutex synchronization',
        features: [
            'Pthread implementation',
            'Mutex synchronization',
            'Deadlock prevention',
            'Precise timing control',
        ],
        tech: ['C', 'Pthreads', 'Mutexes', 'Concurrency'],
    },
    ft_transcendence: {
        name: 'ft_transcendence',
        title: 'Full-Stack Ping Pong SPA',
        description: 'Real-time multiplayer Pong game with chat and tournaments',
        features: [
            'Single Page App architecture',
            'Real-time gameplay',
            'Tournament system',
            'Chat integration',
        ],
        tech: ['HTML', 'TailwindCSS', 'TypeScript', 'WebSockets'],
        role: 'Frontend Lead',
    },
    irc: {
        name: 'IRC',
        title: 'Internet Relay Chat Server',
        description: 'Multi-client IRC server with socket programming',
        features: [
            'Multi-client socket programming',
            'Real-time message handling',
            'Server state management',
            'IRC protocol implementation',
        ],
        tech: ['C++', 'Sockets', 'Networking', 'Concurrency'],
    },
    fractol: {
        name: 'Fractol',
        title: 'Fractal Explorer',
        description: 'Real-time interactive fractal viewer (Mandelbrot, Julia, Burning Ship) using C and MinilibX',
        features: [
            'Real-time mathematical visualization',
            'Complex number algorithms',
            'Infinite smooth zoom & panning',
            ' Optimized rendering (60 FPS)',
        ],
        tech: ['C', 'MiniLibX', 'Graphics Programming', 'Algorithms'],
    },
};

// Available commands
export const COMMANDS = [
    'help',
    'whoami',
    'about',
    'skills',
    'projects',
    'run',
    'contact',
    'clear',
    'exit',
    'theme',
    'sudo',
];

// Boot messages
export const BOOT_MESSAGES = [
    '> SYSTEM BOOT SEQUENCE INITIATED',
    '> Loading kernel modules...',
    '> Initializing frontend engine...',
    '> Mounting project filesystem...',
    '> Loading skill libraries...',
    '> ',
    '> Welcome to AliOS v1.0',
    "> Type 'help' to see available commands",
    '> ',
];

// Random greetings
export const GREETINGS = [
    'Welcome back, developer.',
    'System ready. What would you like to build today?',
    'All systems nominal. Let\'s code.',
    'Kernel loaded. Ready for input.',
];
