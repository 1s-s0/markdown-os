import React, { useState, useEffect, useRef } from 'react';
import { X, Square } from 'lucide-react';

interface BrutalWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
  isActive: boolean;
  onFocus: () => void;
}

export const BrutalWindow: React.FC<BrutalWindowProps> = ({
  title,
  children,
  onClose,
  initialPosition = { x: 50, y: 50 },
  isActive,
  onFocus
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    // Only drag if clicking the header
    const target = e.target as HTMLElement;
    if (target.closest('.window-header') && !target.closest('.window-controls')) {
        setIsDragging(true);
        setDragOffset({
          x: e.clientX - position.x,
          y: e.clientY - position.y
        });
    }
  };

  return (
    <div
      ref={windowRef}
      className={`brutal-window ${isActive ? 'active' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        zIndex: isActive ? 100 : 50
      }}
      onMouseDown={onFocus}
    >
      <div className="window-header" onMouseDown={handleMouseDown}>
        <div className="window-title">
          <Square size={14} fill="currentColor" />
          <span>{title}</span>
        </div>
        <div className="window-controls">
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Close">
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};
