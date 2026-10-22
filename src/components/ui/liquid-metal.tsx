'use client';

import { useEffect, useState } from 'react';
import { LiquidMetal, liquidMetalPresets } from '@paper-design/shaders-react';

/*
 * Liquid-Metal-Fläche (Paper Shaders, Preset „Backdrop“ = liquidMetalPresets[2])
 * aus der Komponente liquid-metal-hero. Übernommen wird nur das Metallelement –
 * Überschrift, Buttons und Raster bleiben im Merkle-Designsystem.
 *
 * - Rendert per WebGL erst im Browser; bis dahin (und ohne JavaScript/WebGL)
 *   zeigt die Fläche einen statischen Metallverlauf.
 * - Bei „Bewegung reduzieren“ steht das Metall still (speed 0).
 */
export default function LiquidMetalPanel({ label }: { label?: string }) {
  const [ready, setReady] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setStill(mq.matches);
    const on = () => setStill(mq.matches);
    mq.addEventListener('change', on);
    // WebGL verfügbar?
    try {
      const c = document.createElement('canvas');
      if (c.getContext('webgl2') || c.getContext('webgl')) setReady(true);
    } catch { /* Fallback bleibt */ }
    return () => mq.removeEventListener('change', on);
  }, []);

  const preset = liquidMetalPresets[2].params;

  return (
    <div className="liquid-metal" role="img" aria-label={label || 'Flüssiges Metall in Bewegung'}>
      {ready && <LiquidMetal {...preset} speed={still ? 0 : preset.speed} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />}
    </div>
  );
}
