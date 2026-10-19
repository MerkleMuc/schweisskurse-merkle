'use client';

import { useState } from 'react';
import { Icon } from './Icon';

/* Google Maps erst nach Einwilligung laden. */
export function MapConsent({ query, title }: { query: string; title: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="map-card">
      {on ? (
        <iframe title={title} src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="map-consent on-dark" style={{ background: 'var(--mesh-dark), var(--dark)' }}>
          <div>
            <Icon name="pin" className="icon" />
            <p style={{ margin: '12px 0 16px' }}>Karte von Google Maps anzeigen? Dabei werden Daten an Google übertragen.</p>
            <button className="btn btn--light btn--sm" type="button" onClick={() => setOn(true)}>Karte laden</button>
          </div>
        </div>
      )}
    </div>
  );
}
