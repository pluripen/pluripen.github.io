import data from '../content/publications.generated.json'

export type PublicationVolume = {
  id: string
  series: 'GLM' | 'GPS' | 'GPT' | 'GRP'
  volume: string
  title: string
  authors?: string
  year?: number
  coverPdf: string
  abstractDocx: string
  textPdf?: string
}

export type PublicationsManifest = {
  generatedAt: string
  volumes: PublicationVolume[]
}

export const publicationsManifest = data as PublicationsManifest

