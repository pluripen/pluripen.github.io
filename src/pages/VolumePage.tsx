import { Box, Flex, Link, Text, useMediaQuery } from '@chakra-ui/react'
import { Link as RouterLink, useParams } from 'react-router-dom'

import { DocxViewer } from '../components/DocxViewer'
import { publicationsManifest } from '../publications/manifest'
import { SERIES, type SeriesKey } from '../publications/series'
import { routes } from '../routes'

export function VolumePage() {
  const [isMobile] = useMediaQuery('(max-width: 966px)')
  const params = useParams()
  const seriesKey = (params.series || '').toUpperCase() as SeriesKey
  const volumeId = params.volumeId || ''

  const series = SERIES[seriesKey]
  const volume = publicationsManifest.volumes.find((v) => v.id.toLowerCase() === volumeId.toLowerCase())

  if (!series || !volume || volume.series !== seriesKey) {
    return (
      <Box px={isMobile ? 'var(--page-padding-mobile)' : 'var(--page-padding-left)'} py={10}>
        <Text color="blackAlpha.700">Band nicht gefunden.</Text>
        <Box mt={4}>
          <Link as={RouterLink} to={routes.publications} color="var(--romani-blue)" _hover={{ textDecoration: 'none' }}>
            Zurück zu Publikationen
          </Link>
        </Box>
      </Box>
    )
  }

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
        <Box>
          <Text fontSize={isMobile ? '22px' : '28px'} lineHeight="1.15" m={0}>
            {volume.title}
          </Text>
          {(volume.authors || typeof volume.year === 'number') && (
            <Text fontSize="var(--font-size)" color="blackAlpha.700" mt={1} mb={0}>
              {volume.authors ? `${volume.authors} · ` : ''}
              {typeof volume.year === 'number' ? `${volume.year}` : ''}
            </Text>
          )}
        </Box>
        {!isMobile ? (
          <Text fontSize="28px" lineHeight="1.15" m={0} color="blackAlpha.700">
            {series.shortName} · Band {volume.volume}
          </Text>
        ) : null}
      </Flex>

      <Box
        borderBottom="1px solid black"
        py={6}
        px={isMobile ? 'var(--page-padding-mobile)' : 'var(--page-padding-left)'}
      >
        <Flex direction={isMobile ? 'column' : 'row'} gap={10} align="flex-start">
          <Box flex="1" minW={0} order={isMobile ? 1 : 0}>
            <Text fontWeight="bold" mb={2}>
              Abstract
            </Text>
            <Box mt={2}>
              <DocxViewer docxUrl={volume.abstractDocx} showDownloadLink={false} />
            </Box>
          </Box>

          <Box flex="0 0 520px" maxW="100%" order={isMobile ? 0 : 1}>
            <Flex align="baseline" justify="space-between" mb={2}>
              <Text fontWeight="bold" m={0}>
                Cover
              </Text>
              <Link href={volume.coverPdf} isExternal color="var(--romani-blue)" fontSize="var(--font-size)">
                PDF öffnen
              </Link>
            </Flex>
            <Box width="100%" height={isMobile ? '520px' : '680px'}>
              <iframe
                title={`Cover ${volume.id}`}
                src={`${volume.coverPdf}#view=FitH`}
                style={{ border: '0', width: '100%', height: '100%' }}
              />
            </Box>
            <Box mt={6}>
              <Text fontWeight="bold" mb={2}>
                Download
              </Text>
              {volume.textPdf ? (
                <Link href={volume.textPdf} isExternal color="var(--romani-blue)">
                  Text (PDF) herunterladen
                </Link>
              ) : (
                <Text color="blackAlpha.700">Kein Download verfügbar.</Text>
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

