import { Box, Flex, Text, useMediaQuery } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { PublicationVolumeAccordion } from '../components/PublicationVolumeAccordion'
import { publicationsManifest, type PublicationVolume } from '../publications/manifest'
import { SERIES, type SeriesKey } from '../publications/series'

function volumeSortKey(v: PublicationVolume): number {
  const raw = v.volume || ''
  const m = raw.match(/\d+/)
  return m ? Number(m[0]) : Number.POSITIVE_INFINITY
}

export function SeriesPage() {
  const [isMobile] = useMediaQuery('(max-width: 966px)')
  const params = useParams()
  const seriesKey = (params.series || '').toUpperCase() as SeriesKey
  const series = SERIES[seriesKey]

  if (!series) {
    return (
      <Box px={isMobile ? 'var(--page-padding-mobile)' : 'var(--page-padding-left)'} py={10}>
        <Text>Unbekannte Reihe.</Text>
      </Box>
    )
  }

  const volumes: PublicationVolume[] =
    seriesKey === 'PLURIPEN' ? [] : publicationsManifest.volumes.filter((v) => v.series === seriesKey).slice()
  volumes.sort((a, b) => {
    const n = volumeSortKey(a) - volumeSortKey(b)
    return n !== 0 ? n : a.id.localeCompare(b.id)
  })

  return (
    <Box>
      <Flex
        direction={isMobile ? 'column' : 'row'}
        align={isMobile ? 'flex-start' : 'baseline'}
        justify="space-between"
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        marginRight={isMobile ? 'var(--page-padding-mobile)' : 'var(--page-padding-right)'}
        marginTop={isMobile ? 8 : 10}
        marginBottom={isMobile ? 3 : 4}
        gap={isMobile ? 1 : 6}
      >
        <Text fontSize={isMobile ? '34px' : '42px'} color="black" lineHeight="1.05" m={0}>
          {series.title}
        </Text>
        <Text
          fontSize={isMobile ? '34px' : '42px'}
          lineHeight="1.05"
          m={0}
          alignSelf={isMobile ? 'flex-end' : 'auto'}
        >
          {series.shortName}
        </Text>
      </Flex>

      <Text
        fontSize={isMobile ? '14px' : '16px'}
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        maxWidth="900px"
        paddingRight="40px"
        paddingBottom={isMobile ? 4 : 6}
        lineHeight="1.4"
      >
        {series.description}
      </Text>

      <Box borderBottom="1px solid black" py={6}>
        <PublicationVolumeAccordion volumes={volumes} />
      </Box>
    </Box>
  )
}

