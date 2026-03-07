import { useState, useEffect } from 'react';
import { Settings, FileText, Download, Trash2, HelpCircle, Terminal as TerminalIcon, Moon, Sun, X } from 'lucide-react';
import { BrutalWindow } from './components/BrutalWindow';
import { SettingsContent } from './components/SettingsContent';
import { CheatsheetContent } from './components/CheatsheetContent';
import { Terminal } from './components/Terminal';
import { useFileSystem } from './hooks/useFileSystem';
import { useEditorSettings } from './hooks/useEditorSettings';
import { useMarkdown } from './hooks/useMarkdown';
import './App.css';

type ViewMode = 'write' | 'split' | 'preview';

function App() {
  const { 
    files, 
    setFiles, 
    activeFile, 
    text, 
    setText, 
    openFile, 
    closeFile 
  } = useFileSystem();

  const {
    fontSize,
    setFontSize,
    accentColor,
    setAccentColor,
    fontFamily,
    setFontFamily,
    theme,
    setTheme
  } = useEditorSettings();

  const htmlContent = useMarkdown(text);

  const [mode, setMode] = useState<ViewMode>('split');
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [windows, setWindows] = useState<{
    settings: boolean;
    cheatsheet: boolean;
  }>({
    settings: false,
    cheatsheet: false,
  });

  // Global Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (activeFile) handleDownload('md');
        }
        
        if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
            e.preventDefault();
            if (activeFile) closeFile();
        }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activeFile, text, closeFile]); 

  // Handlers
  const handleOpenFile = (filename: string) => {
    openFile(filename);
    setMode('split');
  };

  const toggleWindow = (id: 'settings' | 'cheatsheet') => {
    setWindows(prev => {
        const isOpen = !prev[id];
        if (isOpen) setActiveWindow(id);
        return { ...prev, [id]: isOpen };
    });
  };

  const handleClear = () => {
    if (confirm('NUKE CURRENT BUFFER?')) {
      setText('');
    }
  };

  const handleDownload = (type: 'md' | 'html') => {
    if (!activeFile) return;
    const element = document.createElement('a');
    const content = type === 'md' ? text : htmlContent;
    const mime = type === 'md' ? 'text/markdown' : 'text/html';
    const file = new Blob([content], { type: mime });
    element.href = URL.createObjectURL(file);
    const baseName = activeFile.replace(/\.[^/.]+$/, "");
    element.download = type === 'md' ? activeFile : `${baseName}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={`app-container theme-${theme} mode-${mode}`}>
      {/* NAVIGATION */}
      <nav className="brutal-nav">
        <div className="nav-brand">
            {activeFile ? <FileText size={24} /> : <TerminalIcon size={24} />}
            <span className="brand-text">{activeFile ? activeFile : 'BRUTAL_OS'}</span>
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
                    <button className="action-btn desktop-only" onClick={handleClear} title="CLEAR BUFFER">
                        <Trash2 size={20} />
                    </button>
                    <button className="action-btn" onClick={() => handleDownload('md')} title="SAVE / EXPORT">
                        <Download size={20} />
                    </button>
                    <button className="action-btn desktop-only" onClick={() => toggleWindow('cheatsheet')} title="HELP">
                        <HelpCircle size={20} />
                    </button>
                    <button className="action-btn" onClick={() => toggleWindow('settings')} title="SETTINGS">
                        <Settings size={20} />
                    </button>
                    <div className="separator desktop-only" style={{ width: 1, height: 20, background: 'var(--border-color)'}}></div>
                    <button className="action-btn" onClick={closeFile} title="CLOSE FILE (Ctrl+W)">
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
                    onChange={(e) => setText(e.target.value)}
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
                <div className="stat-item desktop-only">MODE: {mode.toUpperCase()}</div>
                <div className="stat-item">LEN: {text.length}</div>
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
