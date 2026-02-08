import { Box, Link, Text, useMediaQuery } from '@chakra-ui/react'

export function ImpressumPage() {
  const [isMobile] = useMediaQuery('(max-width: 966px)')

  return (
    <Box>
      <Text
        fontSize={isMobile ? 'var(--page-title-size-mobile)' : 'var(--page-title-size)'}
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        marginY={isMobile ? 10 : 40}
      >
        Impressum
      </Text>
      <Box
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        marginRight={isMobile ? 'var(--page-padding-mobile)' : 'var(--page-padding-right)'}
        maxWidth="900px"
        paddingBottom="var(--page-padding-bottom)"
      >
        <Text fontSize={isMobile ? '14px' : '16px'} color="blackAlpha.700" mb={6}>
          © {new Date().getFullYear()} PLURIPEN
        </Text>

        <Text fontSize={isMobile ? '14px' : '16px'} mb={2}>
          In Kooperation mit{' '}
          <Link href="https://akademie-graz.at/" isExternal color="var(--romani-blue)">
            Akademie Graz
          </Link>
          .
        </Text>

        <Text fontSize={isMobile ? '14px' : '16px'} mb={6}>
          Kontakt:{' '}
          Dieter Halwachs ·{' '}
          <Link href="mailto:dieter.halwachs@icloud.com" color="var(--romani-blue)">
            dieter.halwachs@icloud.com
          </Link>
        </Text>

        <Text fontSize={isMobile ? '14px' : '16px'} mb={2}>
          Technische Umsetzung:{' '}
          <Link
            href="https://scholar.google.com/citations?user=oOr7JCgAAAAJ&hl=en"
            isExternal
            color="var(--romani-blue)"
          >
            Valentin Edelsbrunner
          </Link>
          {' · '}
          <Link href="mailto:v.edelsbrunner@protonmail.com" color="var(--romani-blue)">
            v.edelsbrunner@protonmail.com
          </Link>
        </Text>
        <Text fontSize={isMobile ? '14px' : '16px'}>
          Design: Linda Schneider
        </Text>
      </Box>
    </Box>
  )
}

