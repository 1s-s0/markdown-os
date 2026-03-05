import { useState, useMemo, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Settings, FileText, Download, Trash2, HelpCircle, Terminal as TerminalIcon, Moon, Sun, X } from 'lucide-react';
import { BrutalWindow } from './components/BrutalWindow';
import { SettingsContent } from './components/SettingsContent';
import { CheatsheetContent } from './components/CheatsheetContent';
import { Terminal } from './components/Terminal';
import './App.css';

type ViewMode = 'write' | 'split' | 'preview';
type FileSystem = Record<string, string>;

const DEFAULT_MARKDOWN = `# BRUTALIST MARKDOWN

## THE MANIFESTO
1. **RAW**
2. **BOLD**
3. **FUNCTIONAL**

### CODE IS TRUTH
\`\`\`javascript
const brutal = () => {
  return "NO BORDERS, NO LIMITS";
};
\`\`\`

> "FORM FOLLOWS FUNCTION, BUT FUNCTION IS BEAUTIFUL."

*Write here. See there.*
`;

function App() {
  // --- STATE ---
  
  // File System
  const [files, setFiles] = useState<FileSystem>(() => {
    const savedFiles = localStorage.getItem('brutal-files');
    if (savedFiles) {
        return JSON.parse(savedFiles);
    }
    // Migration from v1
    const oldContent = localStorage.getItem('markdown-content');
    return {
        'README.md': oldContent || DEFAULT_MARKDOWN
    };
  });

  const [activeFile, setActiveFile] = useState<string | null>(null);
  
  // Editor Content (Synced with activeFile)
  const [text, setText] = useState<string>('');

  const [mode, setMode] = useState<ViewMode>('split');
  
  // Settings State
  const [fontSize, setFontSize] = useState<number>(16);
  const [accentColor, setAccentColor] = useState<string>('#ff0055');
  const [fontFamily, setFontFamily] = useState<string>("'Space Mono', monospace");
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Window Management
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [windows, setWindows] = useState<{
    settings: boolean;
    cheatsheet: boolean;
  }>({
    settings: false,
    cheatsheet: false,
  });

  // --- EFFECTS ---

  // Persistence for Files
  useEffect(() => {
    localStorage.setItem('brutal-files', JSON.stringify(files));
  }, [files]);

  // Sync Text on File Open
  useEffect(() => {
    if (activeFile && files[activeFile] !== undefined) {
        setText(files[activeFile]);
    } else if (activeFile && files[activeFile] === undefined) {
        // Fallback for new files created via touch/vim but not yet typed in
        // actually touch creates empty string, so undefined check handles deleted files
        setText('');
    }
  }, [activeFile]); // Intentionally not including files to avoid loop, we push TO files

  // Apply CSS Variables for Settings & Theme
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accentColor);
    document.documentElement.style.setProperty('--font-mono', fontFamily);
    document.documentElement.setAttribute('data-theme', theme);
  }, [accentColor, fontFamily, theme]);

  // Global Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
        // Ctrl+S: Save/Download (In this context, simple save is auto, so we trigger download)
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (activeFile) handleDownload('md');
        }
        
        // Ctrl+W: Close File
        if ((e.ctrlKey || e.metaKey) && e.key === 'w') { // Changed to lowercase 'w'
            e.preventDefault();
            if (activeFile) handleCloseFile();
        }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activeFile, text]); // Dependencies for actions

  // --- LOGIC ---

  const handleTextChange = (newText: string) => {
    setText(newText);
    if (activeFile) {
        setFiles(prev => ({
            ...prev,
            [activeFile]: newText
        }));
    }
  };

  const handleOpenFile = (filename: string) => {
    // Ensure file exists in state if it's new (handled by Terminal mostly, but good safeguard)
    if (!files[filename]) {
        setFiles(prev => ({ ...prev, [filename]: '' }));
    }
    setActiveFile(filename);
    setMode('split'); // Reset mode on open
  };

  const handleCloseFile = () => {
    setActiveFile(null);
    setText('');
  };

  const htmlContent = useMemo(() => {
    try {
      const rawHtml = marked.parse(text) as string;
      return DOMPurify.sanitize(rawHtml);
    } catch (err) {
      return '<p style="color: var(--accent);">ERROR_PARSING_MD</p>';
    }
  }, [text]);

  const toggleWindow = (id: 'settings' | 'cheatsheet') => {
    setWindows(prev => {
        const isOpen = !prev[id];
        if (isOpen) setActiveWindow(id);
        return { ...prev, [id]: isOpen };
    });
  };

  const handleClear = () => {
    if (confirm('NUKE CURRENT BUFFER?')) {
      handleTextChange('');
    }
  };

  const handleDownload = (type: 'md' | 'html') => {
    if (!activeFile) return;
    const element = document.createElement('a');
    const content = type === 'md' ? text : htmlContent;
    const mime = type === 'md' ? 'text/markdown' : 'text/html';
    const file = new Blob([content], { type: mime });
    element.href = URL.createObjectURL(file);
    // Use active filename for download, swap extension if html
    const baseName = activeFile.replace(/\.[^/.]+$/, "");
    element.download = type === 'md' ? activeFile : `${baseName}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // --- RENDER ---

  return (
    <div className={`app-container theme-${theme} mode-${mode}`}>
      {/* NAVIGATION */}
      <nav className="brutal-nav">
        <div className="nav-brand">
            {activeFile ? <FileText size={24} /> : <TerminalIcon size={24} />}
            {activeFile ? activeFile : 'BRUTAL_OS'}
        </div>
        
        {activeFile && (
            <div className="mode-toggles">
            <button 
                className={mode === 'write' ? 'active' : ''} 
                onClick={() => setMode('write')}
            >
                WRITE
            </button>
            <button 
                className={mode === 'split' ? 'active' : ''} 
                onClick={() => setMode('split')}
            >
                SPLIT
            </button>
            <button 
                className={mode === 'preview' ? 'active' : ''} 
                onClick={() => setMode('preview')}
            >
                PREVIEW
            </button>
            </div>
        )}

        <div className="nav-actions">
            <button className="action-btn" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} title="TOGGLE THEME">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {activeFile ? (
                <>
                    <button className="action-btn" onClick={handleClear} title="CLEAR BUFFER">
                        <Trash2 size={20} />
                    </button>
                    <button className="action-btn" onClick={() => handleDownload('md')} title="SAVE / EXPORT">
                        <Download size={20} />
                    </button>
                    <button className="action-btn" onClick={() => toggleWindow('cheatsheet')} title="HELP">
                        <HelpCircle size={20} />
                    </button>
                    <button className="action-btn" onClick={() => toggleWindow('settings')} title="SETTINGS">
                        <Settings size={20} />
                    </button>
                    <div className="separator" style={{ width: 1, height: 20, background: 'var(--border-color)'}}></div>
                    <button className="action-btn" onClick={handleCloseFile} title="CLOSE FILE (Ctrl+W)">
                        <X size={20} />
                    </button>
                </>
            ) : (
                 <button className="action-btn" onClick={() => toggleWindow('settings')} title="SETTINGS">
                    <Settings size={20} />
                </button>
            )}
        </div>
      </nav>

      {/* WINDOWS */}
      {windows.settings && (
        <BrutalWindow 
            id="settings"
            title="SYSTEM_CONFIG"
            onClose={() => setWindows(prev => ({...prev, settings: false}))}
            isActive={activeWindow === 'settings'}
            onFocus={() => setActiveWindow('settings')}
            initialPosition={{ x: 100, y: 100 }}
        >
            <SettingsContent 
                fontSize={fontSize}
                setFontSize={setFontSize}
                accentColor={accentColor}
                setAccentColor={setAccentColor}
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
            />
        </BrutalWindow>
      )}

      {windows.cheatsheet && (
        <BrutalWindow 
            id="cheatsheet"
            title="SYNTAX_MATRIX"
            onClose={() => setWindows(prev => ({...prev, cheatsheet: false}))}
            isActive={activeWindow === 'cheatsheet'}
            onFocus={() => setActiveWindow('cheatsheet')}
            initialPosition={{ x: 500, y: 100 }}
        >
            <CheatsheetContent />
        </BrutalWindow>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="brutal-main">
        {!activeFile ? (
            <Terminal 
                files={files} 
                setFiles={setFiles} 
                openFile={handleOpenFile} 
                theme={theme}
            />
        ) : (
            <>
                {mode !== 'preview' && (
                <section className="pane editor-pane">
                    <textarea
                    className="brutal-textarea"
                    value={text}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder="INPUT_MARKDOWN_HERE..."
                    spellCheck={false}
                    style={{ fontSize: `${fontSize}px` }}
                    autoFocus
                    />
                </section>
                )}

                {mode !== 'write' && (
                <section className="pane preview-pane">
                    <div
                    className="brutal-preview"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </section>
                )}
            </>
        )}
      </main>

      <footer className="brutal-footer">
        <div className="stat-item">STATUS: {activeFile ? 'EDITING' : 'IDLE'}</div>
        {activeFile && (
            <>
                <div className="stat-item">MODE: {mode.toUpperCase()}</div>
                <div className="stat-item">LEN: {text.length}</div>
                <div className="stat-item">WORDS: {text.trim() === '' ? 0 : text.trim().split(/\s+/).length}</div>
            </>
        )}
        <div className="stat-item" style={{ marginLeft: 'auto', color: accentColor }}>
            ● SYSTEM_ONLINE
        </div>
      </footer>
    </div>
  );
}

export default App;
