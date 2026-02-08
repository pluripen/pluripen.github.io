import { Box, Link, Text, useMediaQuery } from '@chakra-ui/react'

export function ContactPage() {
  const [isMobile] = useMediaQuery('(max-width: 966px)')

  const subject = encodeURIComponent('PLURIPEN – Anfrage / Bestellung Hardcopy')
  const body = encodeURIComponent(
    [
      'Hallo PLURIPEN-Team,',
      '',
      'ich interessiere mich für folgende Publikation (Reihe / Band):',
      '- ',
      '',
      'Falls eine Hardcopy verfügbar ist, möchte ich diese bestellen.',
      '',
      'Lieferadresse:',
      '- Name:',
      '- Straße / Nr.:',
      '- PLZ / Ort:',
      '- Land:',
      '',
      'Vielen Dank!',
    ].join('\n'),
  )

  return (
    <Box>
      <Text
        fontSize={isMobile ? 'var(--page-title-size-mobile)' : 'var(--page-title-size)'}
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        marginY={isMobile ? 10 : 40}
      >
        Kontakt
      </Text>
      <Text
        fontSize={isMobile ? 'var(--font-size)' : 'var(--font-size-page-text)'}
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        maxWidth="900px"
        paddingRight="40px"
        paddingBottom={8}
      >
        Für Fragen oder Bestellungen schreiben Sie uns.
      </Text>
      <Box
        marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
        paddingBottom="var(--page-padding-bottom)"
      >
        <Link
          href={`mailto:info@pluripen.org?subject=${subject}&body=${body}`}
          color="var(--romani-blue)"
        >
          E-Mail an info@pluripen.org
        </Link>
      </Box>
    </Box>
  )
}

