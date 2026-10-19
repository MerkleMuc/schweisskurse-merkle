'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from './Icon';

/* YouTube erst nach Klick laden (youtube-nocookie) – keine Datenübertragung
   an Google beim bloßen Seitenaufruf, schnellere Ladezeit. */
export function VideoFacade({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="video">
      {on ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      ) : (
        <>
          <Image src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={`Vorschaubild: ${title}`} fill sizes="(max-width: 767px) 100vw, 50vw" />
          <button type="button" onClick={() => setOn(true)} aria-label={`Video abspielen: ${title}`}>
            <span className="video__play"><Icon name="play" /></span>
          </button>
          <span className="video__note">Mit Klick wird das Video von YouTube geladen.</span>
        </>
      )}
    </div>
  );
}
