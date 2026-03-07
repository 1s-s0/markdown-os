import { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export function useMarkdown(text: string, delay: number = 300) {
    const [html, setHtml] = useState<string>('');

    useEffect(() => {
        const handler = setTimeout(() => {
            try {
                const rawHtml = marked.parse(text) as string;
                setHtml(DOMPurify.sanitize(rawHtml));
            } catch (err) {
                setHtml('<p style="color: var(--accent);">ERROR_PARSING_MD</p>');
            }
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [text, delay]);

    return html;
}
