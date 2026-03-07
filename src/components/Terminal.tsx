import React, { useState, useEffect, useRef } from 'react';

interface TerminalProps {
  files: Record<string, string>;
  setFiles: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  openFile: (filename: string) => void;
  theme: 'dark' | 'light';
}

export const Terminal: React.FC<TerminalProps> = ({ files, setFiles, openFile, theme }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to <span class="t-bold t-accent">BRUTAL_SHELL v2.0.0</span>',
    'Type "<span class="t-cyan">help</span>" for available commands.',
    '<span class="t-white">---------------------------------</span>'
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (cmd: string) => {
    const args = cmd.trim().split(/\s+/);
    const command = args[0].toLowerCase();
    const arg = args[1];

    let output = '';

    switch (command) {
      case 'neofetch':
        const uptimeSeconds = Math.floor(window.performance.now() / 1000);
        const hours = Math.floor(uptimeSeconds / 3600);
        const mins = Math.floor((uptimeSeconds % 3600) / 60);
        const res = `${window.screen.width}x${window.screen.height}`;
        const themeLabel = theme === 'dark' ? 'Kali-Dark' : 'Kali-Light';
        const userAgent = navigator.userAgent;
        const engine = userAgent.includes('Chrome') ? 'V8' : userAgent.includes('Firefox') ? 'Gecko' : 'WebKit';
        
        output = `
<span class="t-blue">  ⠀⠀⠀⠀⠠⠤⠤⠤⠤⠤⣤⣤⣤⣄⣀⣀⠀⠀⠀⠀                           <span class="t-bold t-blue">user@kali</span></span>
<span class="t-blue">  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠛⠿⢶⣤⣄⡀                         <span class="t-white">---------</span></span>
<span class="t-blue">  ⠀⠀⢀⣀⣀⣠⣤⣤⣴⠶⠶⠶⠶⠶⠶⠶⠶⠶⠿⠿⢿⡇                         <span class="t-blue t-bold">OS:</span> Kali GNU/Linux Rolling</span>
<span class="t-blue">  ⠚⠛⠉⠉⠉⠀⠀⠀⠀⠀⠀⢀⣀⣀⣤⡴⠶⠶⠿⠿⠿⣧⡀⠀⠀⠀⠤⢄⣀                <span class="t-blue t-bold">Kernel:</span> 6.6.9-amd64</span>
<span class="t-blue">  ⠀⠀⠀⠀⠀⠀⠀⢀⣠⡴⠞⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⢸⣿⣷⣶⣦⣤⣄⣈⡑⢦⣀⠀⠀⠀         <span class="t-blue t-bold">Uptime:</span> ${hours > 0 ? hours + 'h ' : ''}${mins} mins</span>
<span class="t-blue">  ⠀⠀⠀⠀⣠⠔⠚⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⡿⠟⠉⠉⠉⠉⠙⠛⠿⣿⣮⣷⣤⠀⠀⠀⠀⠀    <span class="t-blue t-bold">Shell:</span> zsh 5.9</span>
<span class="t-blue">  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢻⣯⣧⡀⠀⠀    ⠀<span class="t-blue t-bold">Resolution:</span> ${res}</span>
<span class="t-blue">  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀      ⢸⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⢷⡤⠀     <span class="t-blue t-bold">DE:</span> Xfce 4.18</span>
<span class="t-blue">  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⡀⠀                       <span class="t-blue t-bold">WM:</span> Xfwm4</span>
<span class="t-blue">  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣦                      <span class="t-blue t-bold">Theme:</span> ${themeLabel}</span>
<span class="t-blue">  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀      ⠀⠀⠈⠻⣿⣦⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   <span class="t-blue t-bold">CPU:</span> ${engine}_ENGINE</span>
<span class="t-blue">  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠛⠛⠻⠿⠿⣿⣶⣶⣦⣄⣀⠀    <span class="t-blue t-bold">Memory:</span> 2048MiB / 8192MiB</span>
<span class="t-blue">  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣿⣯⡛⠻⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀</span>
<span class="t-blue">  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀             ⠀⠈⠙⢿⣆⠀⠙⢆⠀<span class="t-red">██</span><span class="t-green">██</span><span class="t-yellow">██</span><span class="t-blue">██</span><span class="t-magenta">██</span><span class="t-cyan">██</span><span class="t-white">██</span></span>
`;
        break;
      case 'help':
        output = `
<span class="t-bold t-white">AVAILABLE COMMANDS:</span>
  <span class="t-cyan">ls</span>              List files
  <span class="t-cyan">touch</span> &lt;file&gt;    Create new file
  <span class="t-cyan">vim</span> &lt;file&gt;      Open/Edit file
  <span class="t-cyan">rm</span> &lt;file&gt;       Delete file
  <span class="t-cyan">neofetch</span>        System info
  <span class="t-cyan">clear</span>           Clear terminal
  <span class="t-cyan">whoami</span>          User info
  <span class="t-cyan">exit</span>            Close terminal (noop)
`;
        break;
      case 'ls':
        const fileList = Object.keys(files);
        output = fileList.length > 0 ? `<span class="t-blue">${fileList.join('  ')}</span>` : '(empty)';
        break;
      case 'touch':
        if (!arg) {
          output = '<span class="t-red">Usage: touch &lt;filename&gt;</span>';
        } else if (files[arg]) {
          output = `<span class="t-red">Error: File "${arg}" already exists.</span>`;
        } else {
          setFiles(prev => ({ ...prev, [arg]: '' }));
          output = `Created "<span class="t-cyan">${arg}</span>"`;
        }
        break;
      case 'vim':
      case 'nano':
      case 'code':
        if (!arg) {
          output = '<span class="t-red">Usage: vim &lt;filename&gt;</span>';
        } else {
            if (!files[arg]) {
                setFiles(prev => ({ ...prev, [arg]: '' }));
                output = `New file "<span class="t-cyan">${arg}</span>"`;
            }
            openFile(arg);
            return;
        }
        break;
      case 'rm':
        if (!arg) {
          output = '<span class="t-red">Usage: rm &lt;filename&gt;</span>';
        } else if (!files[arg]) {
          output = `<span class="t-red">Error: File "${arg}" not found.</span>`;
        } else {
          const newFiles = { ...files };
          delete newFiles[arg];
          setFiles(newFiles);
          output = `Removed "<span class="t-cyan">${arg}</span>"`;
        }
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'whoami':
        output = '<span class="t-green t-bold">user@kali</span>';
        break;
      case '':
        break;
      default:
        output = `<span class="t-red">Command not found: ${command}</span>`;
    }

    const escapeHtml = (unsafe: string) => {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }

    const promptLine = `&gt; <span class="t-white">${escapeHtml(cmd)}</span>`;
    if (cmd.trim()) {
        setHistory(prev => [...prev, promptLine, output].filter(Boolean));
    } else {
        setHistory(prev => [...prev, promptLine]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className={`terminal-container ${theme}`} onClick={() => inputRef.current?.focus()}>
      <div className="terminal-output">
        {history.map((line, i) => (
          <div key={i} className="terminal-line" dangerouslySetInnerHTML={{ __html: line }}></div>
        ))}
      </div>
      <div className="terminal-input-line">
        <span className="prompt" dangerouslySetInnerHTML={{ __html: `<span class="t-bold t-cyan">user@kali</span>:<span class="t-blue">~</span>$ ` }}></span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};
