/*
 * Bewertungen. Ausschließlich belegte Stimmen, wörtlich übernommen.
 * Google: nur Rezensionen aus dem Unternehmensprofil von Merkle
 * Schweißtechnik München, die sich auf die Schweißkurse beziehen.
 * Weitere Stimmen aus /referenzen/ der Altseite ergänzt `npm run import:wp`.
 */
export interface Review { text: string; author: string; meta?: string; when?: string; source: 'google' | 'website' }

export const REVIEWS: Review[] = [
  {
    source: 'google',
    author: 'Steffen Now',
    meta: 'Local Guide',
    when: 'Google-Rezension',
    text: 'Die Schweißkurse - auch für Anfänger - sind echt empfehlenswert. Rund um die Schweißtechnik bekommt man hier gute Beratung und einen sehr guten Service.'
  }
];
