import React, { useState, useRef, useEffect, useCallback } from 'react';

function ResizablePanel({ 
  children, 
  defaultWidth = 256, 
  minWidth = 200, 
  maxWidth = 500,
  isCollapsed = false,
  onWidthChange,
  className = ""
}) {
  const [width, setWidth] = useState(() => {
    const saved = localStorage.getItem('sidebarWidth');
    return saved ? parseInt(saved, 10) : defaultWidth;
  });
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  // Handle mouse down on resize handle
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [width]);

  // Handle mouse move during resize
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      const diff = e.clientX - startXRef.current;
      const newWidth = Math.min(maxWidth, Math.max(minWidth, startWidthRef.current + diff));
      
      setWidth(newWidth);
      if (onWidthChange) {
        onWidthChange(newWidth);
      }
    };

    const handleMouseUp = () => {
      if (!isResizing) return;
      
      setIsResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // Save to localStorage
      localStorage.setItem('sidebarWidth', width.toString());
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, width, minWidth, maxWidth, onWidthChange]);

  // Handle touch events for mobile
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    startXRef.current = touch.clientX;
    startWidthRef.current = width;
    setIsResizing(true);
  }, [width]);

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (!isResizing) return;
      
      const touch = e.touches[0];
      const diff = touch.clientX - startXRef.current;
      const newWidth = Math.min(maxWidth, Math.max(minWidth, startWidthRef.current + diff));
      
      setWidth(newWidth);
      if (onWidthChange) {
        onWidthChange(newWidth);
      }
    };

    const handleTouchEnd = () => {
      if (!isResizing) return;
      
      setIsResizing(false);
      localStorage.setItem('sidebarWidth', width.toString());
    };

    if (isResizing) {
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isResizing, width, minWidth, maxWidth, onWidthChange]);

  if (isCollapsed) {
    return null;
  }

  return (
    <div 
      ref={panelRef}
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: `${width}px` }}
    >
      {children}
      
      {/* Resize Handle */}
      <div
        className={`absolute top-0 right-0 w-1 h-full cursor-col-resize group hover:bg-blue-500/20 transition-colors ${
          isResizing ? 'bg-blue-500/20' : ''
        }`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-500/10" />
      </div>
    </div>
  );
}

export default ResizablePanel;