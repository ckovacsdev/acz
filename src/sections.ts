/** Page sections in scroll order. Drives the nav and the active-section highlight. */
export const SECTIONS = [
  { id: 'about', label: 'About', hint: 'the short version' },
  { id: 'work', label: 'Campaigns', hint: 'releases I’ve worked on' },
  { id: 'experience', label: 'Experience', hint: 'where I’ve worked' },
  { id: 'contact', label: 'Contact', hint: 'say hello' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']
