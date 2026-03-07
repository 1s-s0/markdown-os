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

    const handleTouchMove = (e: TouchEvent) => {
        if (isDragging) {
            setPosition({
                x: e.touches[0].clientX - dragOffset.x,
                y: e.touches[0].clientY - dragOffset.y
            });
        }
    }

    const handleStop = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleStop);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleStop);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleStop);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleStop);
    };
  }, [isDragging, dragOffset]);

  const handleStart = (clientX: number, clientY: number) => {
    onFocus();
    setIsDragging(true);
    setDragOffset({
        x: clientX - position.x,
        y: clientY - position.y
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.window-header') && !target.closest('.window-controls')) {
        handleStart(e.clientX, e.clientY);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.window-header') && !target.closest('.window-controls')) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
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
      onTouchStart={onFocus}
    >
      <div 
        className="window-header" 
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
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
