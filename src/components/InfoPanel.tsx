'use client';

import type { Planet } from '../data/planets';
import { SUN_DATA } from '../data/planets';

interface InfoPanelProps {
  selectedBody: {
    type: 'sun' | 'planet' | 'moon';
    name: string;
    data?: Planet | null;
  } | null;
  onClose: () => void;
}

export function InfoPanel({ selectedBody, onClose }: InfoPanelProps) {
  if (!selectedBody) return null;
  
  const isSun = selectedBody.type === 'sun';
  const isMoon = selectedBody.type === 'moon';
  const planetData = selectedBody.data as Planet | undefined;
  
  const getPlanetTypeLabel = (type: string) => {
    switch (type) {
      case 'terrestrial': return 'Terrestrial Planet';
      case 'gas-giant': return 'Gas Giant';
      case 'ice-giant': return 'Ice Giant';
      default: return 'Unknown';
    }
  };
  
  return (
    <div className="fixed left-4 top-4 w-80 glass-panel p-6 animate-fade-in z-50 max-h-[90vh] overflow-y-auto scrollbar-thin">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-surface-raised hover:bg-surface-overlay transition-colors text-text-secondary hover:text-text-primary"
        aria-label="Close panel"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gradient mb-1">
          {selectedBody.name}
        </h2>
        {!isSun && !isMoon && planetData && (
          <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-accent/20 text-accent-light">
            {getPlanetTypeLabel(planetData.type)}
          </span>
        )}
        {isMoon && (
          <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-surface-overlay text-text-secondary">
            Natural Satellite
          </span>
        )}
      </div>
      
      {isSun ? (
        <div className="space-y-4">
          <div className="text-sm text-text-secondary leading-relaxed">
            {SUN_DATA.description}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-raised rounded-lg p-3">
              <div className="text-xs text-text-muted mb-1">Radius</div>
              <div className="text-sm font-medium">{SUN_DATA.radius.toLocaleString()} km</div>
            </div>
            <div className="bg-surface-raised rounded-lg p-3">
              <div className="text-xs text-text-muted mb-1">Temperature</div>
              <div className="text-sm font-medium">{SUN_DATA.temperature.toLocaleString()}°C</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-2">Key Facts</h3>
            <ul className="space-y-1.5">
              {SUN_DATA.facts.map((fact, i) => (
                <li key={i} className="text-xs text-text-tertiary flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : isMoon ? (
        <div className="space-y-4">
          <div className="text-sm text-text-secondary leading-relaxed">
            A natural satellite orbiting a planet. Moons are diverse in size, composition, and origin.
          </div>
          
          <div className="bg-surface-raised rounded-lg p-3">
            <div className="text-xs text-text-muted mb-1">Type</div>
            <div className="text-sm font-medium">Natural Satellite</div>
          </div>
        </div>
      ) : planetData ? (
        <div className="space-y-4">
          <div className="text-sm text-text-secondary leading-relaxed">
            {planetData.description}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-raised rounded-lg p-3">
              <div className="text-xs text-text-muted mb-1">Radius</div>
              <div className="text-sm font-medium">{planetData.radius.toLocaleString()} km</div>
            </div>
            <div className="bg-surface-raised rounded-lg p-3">
              <div className="text-xs text-text-muted mb-1">Distance from Sun</div>
              <div className="text-sm font-medium">{planetData.distanceFromSun.toLocaleString()} M km</div>
            </div>
            <div className="bg-surface-raised rounded-lg p-3">
              <div className="text-xs text-text-muted mb-1">Orbital Period</div>
              <div className="text-sm font-medium">{planetData.orbitalPeriod.toLocaleString()} days</div>
            </div>
            <div className="bg-surface-raised rounded-lg p-3">
              <div className="text-xs text-text-muted mb-1">Day Length</div>
              <div className="text-sm font-medium">{planetData.rotationPeriod.toLocaleString()} hours</div>
            </div>
          </div>
          
          <div className="bg-surface-raised rounded-lg p-3">
            <div className="text-xs text-text-muted mb-2">Temperature Range</div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">{planetData.temperature.min}°C</span>
              <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500" />
              <span className="text-red-400">{planetData.temperature.max}°C</span>
            </div>
            <div className="text-xs text-text-muted mt-1">Average: {planetData.temperature.avg}°C</div>
          </div>
          
          {planetData.moons.length > 0 && (
            <div className="bg-surface-raised rounded-lg p-3">
              <div className="text-xs text-text-muted mb-2">Moons ({planetData.moons.length})</div>
              <div className="flex flex-wrap gap-1">
                {planetData.moons.map((moon) => (
                  <span key={moon.name} className="px-2 py-0.5 text-xs rounded bg-surface-overlay text-text-secondary">
                    {moon.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {planetData.hasRings && (
            <div className="bg-surface-raised rounded-lg p-3">
              <div className="text-xs text-text-muted mb-1">Ring System</div>
              <div className="text-sm font-medium text-accent">Yes</div>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-2">Key Facts</h3>
            <ul className="space-y-1.5">
              {planetData.facts.map((fact, i) => (
                <li key={i} className="text-xs text-text-tertiary flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
