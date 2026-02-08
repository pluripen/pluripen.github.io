import { Box, Text, useMediaQuery } from '@chakra-ui/react'

export function DonationPage() {
  const [isMobile] = useMediaQuery('(max-width: 966px)')

  return (
    <Box>
      <Text
        fontSize={isMobile ? 'var(--page-title-size-mobile)' : 'var(--page-title-size)'}
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        marginY={isMobile ? 10 : 40}
      >
        Donation
      </Text>
      <Text
        fontSize={isMobile ? 'var(--font-size)' : 'var(--font-size-page-text)'}
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        maxWidth="900px"
        paddingRight="40px"
        paddingBottom="var(--page-padding-bottom)"
      >
        De man love!
        <br />
        Gib mich Geld!
        <br />
        <br />
        (Zahlungsdetails folgen.)
      </Text>
    </Box>
  )
}

