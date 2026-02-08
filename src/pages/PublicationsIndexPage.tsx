import { Box, Flex, Image, Link, Text, useMediaQuery } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { publicationsManifest } from '../publications/manifest'
import { routes } from '../routes'
import { SERIES, type SeriesKey } from '../publications/series'

export function PublicationsIndexPage() {
  const [isMobile] = useMediaQuery('(max-width: 966px)')

  return (
    <Box>
      <Text
        fontSize={isMobile ? '34px' : '42px'}
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        marginTop={isMobile ? 8 : 10}
        marginBottom={isMobile ? 3 : 4}
        lineHeight="1.05"
      >
        Publikationen
      </Text>

      <Text
        fontSize={isMobile ? '14px' : '16px'}
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        maxWidth="900px"
        paddingRight="40px"
        paddingBottom={isMobile ? 4 : 6}
        lineHeight="1.4"
      >
        Wählen Sie eine Reihe, um die verfügbaren Bände mit Cover, Abstract und Download-Links zu sehen.
      </Text>

      <Flex
        direction="column"
        gap={3}
        borderTop="1px solid black"
        borderBottom="1px solid black"
        py={6}
        px={isMobile ? 'var(--page-padding-mobile)' : 'var(--page-padding-left)'}
      >
        {Object.keys(SERIES).map((key) => {
          const series = SERIES[key as SeriesKey]
          const count =
            key === 'PLURIPEN' ? 0 : publicationsManifest.volumes.filter((v) => v.series === key).length
          return (
            <Link
              key={key}
              as={RouterLink}
              to={routes.series(key)}
              color="black"
              _hover={{ textDecoration: 'none' }}
            >
              <Flex
                direction="row"
                align="center"
                gap={4}
                py={2}
                px={2}
                borderRadius="6px"
                _hover={{ background: 'rgba(0, 0, 0, 0.04)' }}
              >
                <Box flex="0 0 auto">
                  <Image
                    src={series.coverImage}
                    alt={`${series.shortName} cover`}
                    width={isMobile ? '110px' : '140px'}
                    height={isMobile ? '70px' : '88px'}
                    objectFit="cover"
                    display="block"
                  />
                </Box>
                <Box minW={0}>
                  <Text fontSize={isMobile ? '18px' : '22px'} m={0} lineHeight="1.15">
                    {series.title}
                  </Text>
                  <Text fontSize="var(--font-size)" color="blackAlpha.700" m={0} mt={1}>
                    {series.shortName} · {count} {count === 1 ? 'Band' : 'Bände'}
                  </Text>
                </Box>
              </Flex>
            </Link>
          )
        })}
      </Flex>
    </Box>
  )
}

