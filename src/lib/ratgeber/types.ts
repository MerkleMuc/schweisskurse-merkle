export type VizKey = 'mag' | 'wig' | 'e' | 'alu' | 'autogen' | 'loeten' | 'pulse' | 'shield' | 'bottles' | 'joints' | 'torch' | 'positions' | 'matrix' | 'ratio' | 'validity' | 'path';

export interface RatgeberSeite {
  path: string;            // bisherige URL, mit Schrägstrichen
  title: string;           // <title>
  h1: string;
  description: string;
  kicker: string;
  lead: string;
  sections: { h: string; html: string }[];
  viz?: VizKey[];
  video?: string;          // YouTube-ID
  related?: string[];      // Pfade
  kurs?: string;           // passender Kurs-Slug
  facts?: [string, string][];
}
