'use client';

import { PLANETS, SUN_DATA } from '../data/planets';

interface LegendProps {
  selectedBody: string | null;
  onSelect: (name: string, type: 'sun' | 'planet') => void;
}

export function Legend({ selectedBody, onSelect }: LegendProps) {
  return (
    <div className="fixed right-4 top-4 w-48 glass-panel p-4 animate-fade-in z-50">
      <h3 className="text-sm font-medium text-text-secondary mb-3">Celestial Bodies</h3>
      
      <div className="space-y-1">
        <button
          onClick={() => onSelect('Sun', 'sun')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left ${
            selectedBody === 'Sun' 
              ? 'bg-accent/20 text-accent-light glow-accent' 
              : 'hover:bg-surface-overlay text-text-secondary hover:text-text-primary'
          }`}
        >
          <span 
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ 
              background: 'radial-gradient(circle, #FDB813, #FF6B00)',
              boxShadow: '0 0 8px rgba(253, 184, 19, 0.5)'
            }}
          />
          <span className="text-sm">Sun</span>
        </button>
        
        {PLANETS.map((planet) => (
          <button
            key={planet.name}
            onClick={() => onSelect(planet.name, 'planet')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left ${
              selectedBody === planet.name 
                ? 'bg-accent/20 text-accent-light glow-accent' 
                : 'hover:bg-surface-overlay text-text-secondary hover:text-text-primary'
            }`}
          >
            <span 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ 
                background: `linear-gradient(135deg, ${planet.color}, ${planet.secondaryColor})`
              }}
            />
            <span className="text-sm">{planet.name}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-surface-overlay">
        <h3 className="text-xs font-medium text-text-muted mb-2">Controls</h3>
        <div className="space-y-1.5 text-xs text-text-tertiary">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 9l4 4-4 4"/>
            </svg>
            <span>Drag to rotate</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v8M8 12h8"/>
            </svg>
            <span>Scroll to zoom</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
            </svg>
            <span>Click for details</span>
          </div>
        </div>
      </div>
    </div>
  );
}
