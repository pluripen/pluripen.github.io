export type Announcement = {
  id: string
  active: boolean
  title: string
  bodyHtml: string
}

export const announcement: Announcement = {
  id: '2026-02-initial',
  active: false,
  title: 'Neuerscheinungen',
  bodyHtml:
    '<p>Hier kann eine kurze Ankündigung für Neuerscheinungen stehen.</p><p>Diese Meldung erscheint pro Browser nur einmal, solange die ID gleich bleibt.</p>',
}

