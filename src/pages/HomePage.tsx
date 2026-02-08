import { Box, Image, Link, Text, useMediaQuery } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { routes } from '../routes'
import { SERIES, type SeriesKey } from '../publications/series'

export function HomePage() {
  const [isMobile] = useMediaQuery('(max-width: 966px)')
  const coverHeight = isMobile ? 260 : 420

  return (
    <Box>
      <Text
        fontSize={isMobile ? '15px' : '18px'}
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        marginRight={isMobile ? 'var(--page-padding-mobile)' : 'var(--page-padding-right)'}
        marginTop={isMobile ? 6 : 8}
        marginBottom={isMobile ? 4 : 5}
        lineHeight="1.4"
      >
        PLURIPEN ist ein Online-Open-Access-Verlag in Kooperation mit der Akademie Graz.{' '}
        <Link as={RouterLink} to={routes.publications} color="var(--romani-blue)" _hover={{ textDecoration: 'none' }}>
          Zu den Publikationen
        </Link>
      </Text>

      <Text
        fontSize={isMobile ? 'var(--page-title-size-mobile)' : 'var(--page-title-size)'}
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        marginBottom={isMobile ? 4 : 5}
      >
        PLURIPEN
      </Text>

      {/* Simple vertical series list (natural scroll down) */}
      <Box
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        marginRight={isMobile ? 'var(--page-padding-mobile)' : 'var(--page-padding-right)'}
        pt={2}
        pb={6}
      >
        {(['GLM', 'GPS', 'GPT', 'GRP', 'PLURIPEN'] as SeriesKey[]).map((key) => {
          const series = SERIES[key]
          return (
            <Link
              key={key}
              as={RouterLink}
              to={routes.series(key)}
              _hover={{ textDecoration: 'none' }}
              display="block"
              mb={isMobile ? 8 : 12}
            >
              <Image
                src={series.coverImage}
                alt={`${series.shortName} cover`}
                width="100%"
                height={`${coverHeight}px`}
                objectFit="cover"
                display="block"
              />
              <Text mt={3} mb={0} fontSize={isMobile ? '20px' : '26px'} lineHeight="1.2">
                {series.title} ({series.shortName})
              </Text>
            </Link>
          )
        })}
      </Box>

      <Text
        fontSize={isMobile ? 'var(--font-size)' : 'var(--font-size-page-text)'}
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        maxWidth="900px"
        paddingRight="40px"
        paddingBottom="var(--page-padding-bottom)"
      >
      </Text>
    </Box>
  )
}

