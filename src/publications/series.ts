export type SeriesKey = 'GLM' | 'GPS' | 'GPT' | 'GRP' | 'PLURIPEN'

// Temporary series cover images.
// These will be replaced by the dedicated PLURIPEN series covers once available.
import coverGLM from '../assets/series/GLM.jpg'
import coverGPS from '../assets/series/GPS.jpg'
import coverGPT from '../assets/series/GPT.jpg'
import coverGRP from '../assets/series/GRP.jpg'
import coverPLURIPEN from '../assets/series/PLURIPEN.jpg'

export const SERIES: Record<
  SeriesKey,
  {
    shortName: SeriesKey
    title: string
    description: string
    coverImage: string
  }
> = {
  GLM: {
    shortName: 'GLM',
    title: 'Grazer Linguistische Monografien',
    description:
      'Die Reihe GLM umfasst 34 Bände und 17 Downloads. GLM wird nicht fortgesetzt.',
    coverImage: coverGLM,
  },
  GPS: {
    shortName: 'GPS',
    title: 'Grazer Plurilingualismus Studien',
    description:
      'Die Reihe GPS umfasst 6 Bände mit 6 Downloads. Ein weiterer Band ist in Vorbereitung.',
    coverImage: coverGPS,
  },
  GPT: {
    shortName: 'GPT',
    title: 'Grazer Plurilinguale Texte',
    description:
      'Die Reihe GPT umfasst 3 Bände mit 3 Downloads. Weitere Bände sind in Vorbereitung.',
    coverImage: coverGPT,
  },
  GRP: {
    shortName: 'GRP',
    title: 'Grazer Romani Publikationen',
    description:
      'Die Reihe GRP umfasst 8 Bände mit 8 Downloads. Weitere Bände sind in Vorbereitung.',
    coverImage: coverGRP,
  },
  PLURIPEN: {
    shortName: 'PLURIPEN',
    title: 'Neue Reihe (in Vorbereitung)',
    description: 'Die neue Reihe PLURIPEN befindet sich derzeit in Vorbereitung.',
    coverImage: coverPLURIPEN,
  },
}

