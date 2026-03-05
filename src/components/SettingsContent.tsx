
interface SettingsContentProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
}

const ACCENTS = [
  { color: '#ff0055', name: 'NEON PINK' },
  { color: '#00ff00', name: 'NEON GREEN' },
  { color: '#00ffff', name: 'CYAN' },
  { color: '#ffffff', name: 'WHITE' },
  { color: '#000000', name: 'BLACK' },
];

export const SettingsContent: React.FC<SettingsContentProps> = ({
  fontSize,
  setFontSize,
  accentColor,
  setAccentColor,
  fontFamily,
  setFontFamily
}) => {
  return (
    <div className="settings-panel">
      <div className="settings-group">
        <label className="settings-label">FONT SIZE: {fontSize}px</label>
        <input
          type="range"
          min="12"
          max="24"
          step="1"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="brutal-range"
        />
      </div>

      <div className="settings-group">
        <label className="settings-label">ACCENT COLOR</label>
        <div className="color-palette">
          {ACCENTS.map((accent) => (
            <div
              key={accent.color}
              className={`color-swatch ${accentColor === accent.color ? 'active' : ''}`}
              style={{ backgroundColor: accent.color }}
              onClick={() => setAccentColor(accent.color)}
              title={accent.name}
            />
          ))}
        </div>
      </div>

       <div className="settings-group">
        <label className="settings-label">FONT FAMILY</label>
        <select 
            value={fontFamily} 
            onChange={(e) => setFontFamily(e.target.value)}
            className="brutal-input"
        >
            <option value="'Space Mono', monospace">SPACE MONO</option>
            <option value="'Fira Code', monospace">FIRA CODE</option>
            <option value="'Roboto Mono', monospace">ROBOTO MONO</option>
        </select>
      </div>
    </div>
  );
};
