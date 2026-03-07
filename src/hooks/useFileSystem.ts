import { useState, useEffect, useCallback } from 'react';

export type FileSystem = Record<string, string>;

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

export function useFileSystem() {
  const [files, setFiles] = useState<FileSystem>(() => {
    try {
        const savedFiles = localStorage.getItem('brutal-files');
        if (savedFiles) {
            return JSON.parse(savedFiles);
        }
    } catch (e) {
        console.error("Failed to parse files", e);
    }
    const oldContent = localStorage.getItem('markdown-content');
    return {
        'README.md': oldContent || DEFAULT_MARKDOWN
    };
  });

  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [text, setText] = useState<string>('');

  // Persist files
  useEffect(() => {
    localStorage.setItem('brutal-files', JSON.stringify(files));
  }, [files]);

  // Sync when active file changes
  useEffect(() => {
    if (activeFile) {
        setText(files[activeFile] ?? '');
    } else {
        setText('');
    }
  }, [activeFile]); // Intentionally omitting 'files' to avoid loops

  const updateFileContent = useCallback((newText: string) => {
    setText(newText);
    if (activeFile) {
        setFiles(prev => ({
            ...prev,
            [activeFile]: newText
        }));
    }
  }, [activeFile]);

  const openFile = useCallback((filename: string) => {
     if (!files[filename]) {
        setFiles(prev => ({ ...prev, [filename]: '' }));
    }
    setActiveFile(filename);
  }, [files]);

  const closeFile = useCallback(() => {
    setActiveFile(null);
    setText('');
  }, []);

  const deleteFile = useCallback((filename: string) => {
    if (confirm(`DELETE ${filename}?`)) {
        setFiles(prev => {
            const next = { ...prev };
            delete next[filename];
            return next;
        });
        if (activeFile === filename) {
            closeFile();
        }
    }
  }, [activeFile, closeFile]);

  return {
    files,
    setFiles,
    activeFile,
    text,
    setText: updateFileContent,
    openFile,
    closeFile,
    deleteFile
  };
}
