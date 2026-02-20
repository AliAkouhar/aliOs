'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OutputLine {
    id: number;
    type: 'input' | 'output' | 'error';
    content: string;
}

const FILESYSTEM: Record<string, string[]> = {
    '/home/akouhar/minishell': ['Makefile', 'main.c', 'parser.c', 'executor.c', 'builtins.c', 'libft/'],
    '/home/akouhar/minishell/libft': ['libft.a', 'ft_strlen.c', 'ft_strdup.c'],
    '/home/akouhar': ['minishell/', 'Documents/', '.bashrc'],
    '/': ['home/', 'bin/', 'usr/', 'tmp/', 'etc/'],
};

const FILE_CONTENTS: Record<string, string> = {
    'Makefile': 'NAME = minishell\nCC = cc\nCFLAGS = -Wall -Wextra -Werror\n\nall: $(NAME)\n\n$(NAME):\n\t$(CC) $(CFLAGS) -o $(NAME) *.c -lreadline',
    '.bashrc': 'export PATH="/usr/local/bin:$PATH"\nexport USER=akouhar\nexport HOME=/home/akouhar',
    'main.c': '#include "minishell.h"\n\nint main(int argc, char **argv, char **envp)\n{\n\tft_minishell(envp);\n\treturn (0);\n}',
};

export default function MinishellDemo() {
    const [input, setInput] = useState('');
    const [cwd, setCwd] = useState('/home/akouhar/minishell');
    const [envVars, setEnvVars] = useState<Record<string, string>>({
        USER: 'akouhar',
        HOME: '/home/akouhar',
        PATH: '/usr/local/bin:/usr/bin:/bin',
        SHELL: '/bin/minishell',
        PWD: '/home/akouhar/minishell',
        OLDPWD: '/home/akouhar',
        LANG: 'en_US.UTF-8',
        TERM: 'xterm-256color',
        SHLVL: '1',
    });
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [output, setOutput] = useState<OutputLine[]>([
        { id: 0, type: 'output', content: 'minishell$ Welcome to minishell demo' },
        { id: 1, type: 'output', content: 'Try: ls, echo, pwd, cd, env, export, unset, cat, exit' },
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [output]);

    const resolvePath = (path: string): string => {
        if (path.startsWith('/')) return path;
        if (path === '~') return envVars.HOME;
        if (path.startsWith('~/')) return envVars.HOME + path.slice(1);
        if (path === '..') {
            const parts = cwd.split('/').filter(Boolean);
            parts.pop();
            return '/' + parts.join('/');
        }
        if (path === '.') return cwd;
        return cwd === '/' ? `/${path}` : `${cwd}/${path}`;
    };

    const expandVariables = (str: string): string => {
        return str.replace(/\$(\w+)/g, (_, name) => envVars[name] || '');
    };

    const executeCommand = (cmd: string) => {
        const expandedCmd = expandVariables(cmd);
        const newOutput: OutputLine[] = [
            ...output,
            { id: Date.now(), type: 'input', content: `minishell$ ${cmd}` },
        ];

        if (cmd.trim()) {
            setCmdHistory(prev => [...prev, cmd]);
            setHistoryIndex(-1);
        }

        const parts = expandedCmd.trim().split('|').map((p) => p.trim());
        const tokens = parts[0].split(/\s+/);
        const baseCmd = tokens[0];
        const args = tokens.slice(1).join(' ');

        let result = '';
        let isError = false;

        switch (baseCmd) {
            case 'ls': {
                const target = args ? resolvePath(args) : cwd;
                const files = FILESYSTEM[target];
                if (files) {
                    result = files.join('  ');
                } else {
                    result = `ls: cannot access '${args || target}': No such file or directory`;
                    isError = true;
                }
                break;
            }
            case 'echo': {
                const echoArgs = tokens.slice(1);
                if (echoArgs[0] === '-n') {
                    result = echoArgs.slice(1).join(' ');
                } else {
                    result = echoArgs.join(' ');
                }
                break;
            }
            case 'pwd':
                result = cwd;
                break;
            case 'cd': {
                const target = args || envVars.HOME;
                const resolved = resolvePath(target);
                if (FILESYSTEM[resolved] || resolved === '/home/akouhar') {
                    const oldPwd = cwd;
                    setCwd(resolved);
                    setEnvVars(prev => ({ ...prev, PWD: resolved, OLDPWD: oldPwd }));
                } else if (target === '-') {
                    const oldPwd = cwd;
                    const prev = envVars.OLDPWD;
                    setCwd(prev);
                    setEnvVars(p => ({ ...p, PWD: prev, OLDPWD: oldPwd }));
                    result = prev;
                } else {
                    result = `cd: ${target}: No such file or directory`;
                    isError = true;
                }
                break;
            }
            case 'env':
                result = Object.entries(envVars).map(([k, v]) => `${k}=${v}`).join('\n');
                break;
            case 'export': {
                if (!args) {
                    result = Object.entries(envVars)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([k, v]) => `declare -x ${k}="${v}"`)
                        .join('\n');
                } else {
                    const assignments = tokens.slice(1);
                    assignments.forEach(a => {
                        const eqIdx = a.indexOf('=');
                        if (eqIdx > 0) {
                            const key = a.slice(0, eqIdx);
                            const val = a.slice(eqIdx + 1).replace(/^["']|["']$/g, '');
                            setEnvVars(prev => ({ ...prev, [key]: val }));
                        }
                    });
                    break;
                }
                break;
            }
            case 'unset': {
                if (!args) {
                    break;
                }
                const keysToRemove = tokens.slice(1);
                setEnvVars(prev => {
                    const next = { ...prev };
                    keysToRemove.forEach(k => delete next[k]);
                    return next;
                });
                break;
            }
            case 'cat': {
                if (parts.length > 1) {
                    result = '(piped input)';
                } else if (args) {
                    const content = FILE_CONTENTS[args];
                    if (content) {
                        result = content;
                    } else {
                        result = `cat: ${args}: No such file or directory`;
                        isError = true;
                    }
                } else {
                    result = 'usage: cat [file]';
                }
                break;
            }
            case 'whoami':
                result = envVars.USER || 'akouhar';
                break;
            case 'exit':
                setOutput([
                    { id: Date.now(), type: 'output', content: 'exit' },
                    { id: Date.now() + 1, type: 'output', content: 'minishell$ Welcome to minishell demo' },
                    { id: Date.now() + 2, type: 'output', content: 'Try: ls, echo, pwd, cd, env, export, unset, cat, exit' },
                ]);
                setCwd('/home/akouhar/minishell');
                setInput('');
                return;
            case 'clear':
                setOutput([]);
                setInput('');
                return;
            default:
                if (expandedCmd.trim()) {
                    result = `minishell: command not found: ${baseCmd}`;
                    isError = true;
                }
        }

        if (result) {
            const lines = result.split('\n');
            lines.forEach((line, i) => {
                newOutput.push({
                    id: Date.now() + 1 + i,
                    type: isError ? 'error' : 'output',
                    content: line,
                });
            });
        }

        setOutput(newOutput);
        setInput('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeCommand(input);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (cmdHistory.length > 0) {
                const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(cmdHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= cmdHistory.length) {
                    setHistoryIndex(-1);
                    setInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setInput(cmdHistory[newIndex]);
                }
            }
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="mb-2 text-xs text-[var(--sys-text-dim)]">
                Interactive Shell Demo
            </div>

            {/* Mini terminal */}
            <div
                ref={scrollRef}
                className="flex-1 rounded-lg p-3 font-mono text-xs overflow-auto"
                style={{ background: 'rgba(13, 7, 17, 0.9)' }}
            >
                {output.map((line) => (
                    <motion.div
                        key={line.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={
                            line.type === 'input'
                                ? 'text-[var(--sys-accent)]'
                                : line.type === 'error'
                                    ? 'text-[var(--sys-warning)]'
                                    : 'text-[var(--sys-text)]'
                        }
                    >
                        {line.content}
                    </motion.div>
                ))}

                <div className="flex items-center mt-1">
                    <span className="text-[var(--sys-accent)]">minishell$ </span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-[var(--sys-text)] ml-1"
                        placeholder="type a command..."
                        autoFocus
                    />
                </div>
            </div>

            {/* Pipeline visualization */}
            {input.includes('|') && (
                <motion.div
                    className="mt-2 flex items-center justify-center gap-2 text-xs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {input.split('|').map((part, i, arr) => (
                        <div key={i} className="flex items-center gap-2">
                            <span
                                className="px-2 py-1 rounded"
                                style={{ background: 'rgba(183, 127, 255, 0.2)' }}
                            >
                                {part.trim().split(' ')[0] || '?'}
                            </span>
                            {i < arr.length - 1 && (
                                <motion.span
                                    className="text-[var(--sys-accent)]"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            )}
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
