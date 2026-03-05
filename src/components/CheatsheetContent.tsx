
const CHEATS = [
  { label: 'Heading 1', code: '# Title' },
  { label: 'Heading 2', code: '## Subtitle' },
  { label: 'Bold', code: '**Bold**' },
  { label: 'Italic', code: '*Italic*' },
  { label: 'Blockquote', code: '> Quote' },
  { label: 'Code Block', code: '```js code```' },
  { label: 'Inline Code', code: '`code`' },
  { label: 'Link', code: '[Text](url)' },
  { label: 'Image', code: '![Alt](url)' },
  { label: 'List', code: '- Item' },
  { label: 'Ordered List', code: '1. Item' },
];

export const CheatsheetContent = () => {
  return (
    <div className="cheatsheet-list">
      {CHEATS.map((item, index) => (
        <div key={index} className="cheatsheet-item">
          <span className="cheatsheet-label">{item.label}</span>
          <span className="cheatsheet-code">{item.code}</span>
        </div>
      ))}
    </div>
  );
};
