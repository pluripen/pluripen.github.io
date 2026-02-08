import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Link,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import type { PublicationVolume } from '../publications/manifest'
import { routes } from '../routes'
import { DocxViewer } from './DocxViewer'

type Props = {
  volumes: PublicationVolume[]
}

export function PublicationVolumeAccordion({ volumes }: Props) {
  const [isMobile] = useMediaQuery('(max-width: 966px)')

  if (!volumes.length) {
    return (
      <Box px={isMobile ? 'var(--page-padding-mobile)' : 'var(--page-padding-left)'} py={6}>
        <Text color="blackAlpha.700">Derzeit sind keine Bände verfügbar.</Text>
      </Box>
    )
  }

  return (
    <Accordion allowMultiple width="100%">
      {volumes.map((v) => (
        <AccordionItem key={v.id} borderTop="1px solid black" borderBottom="0" borderLeft="0" borderRight="0">
          <AccordionButton
            as={Flex}
            direction="row"
            width="100%"
            py={isMobile ? 3 : 4}
            _hover={{ background: 'rgba(0, 0, 0, 0.04)' }}
          >
            <Box
              flex="1"
              textAlign="left"
              marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
            >
              <Text
                marginY={0}
                fontSize={isMobile ? '20px' : '24px'}
              >
                {v.title}
              </Text>
              <Text color="blackAlpha.700" fontSize="var(--font-size)" mt={1}>
                Band {v.volume}
              </Text>
            </Box>
            <AccordionIcon
              fontSize="var(--accordion-icon-size)"
              marginRight={isMobile ? 'var(--accordion-icon-margin-right-mobile)' : 'var(--accordion-icon-margin-right)'}
            />
          </AccordionButton>

          <AccordionPanel pb={8} borderTop="1px solid #E2E8F0">
            <Flex
              direction={isMobile ? 'column' : 'row'}
              gap={8}
              marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
              marginRight={isMobile ? 'var(--page-padding-mobile)' : 'var(--page-padding-right)'}
            >
              <Box flex="0 0 360px" maxW="100%">
                <Text fontWeight="bold" mb={2}>
                  Cover
                </Text>
                <Box width="100%" height={isMobile ? '320px' : '380px'} position="relative">
                  <iframe
                    title={`Cover ${v.id}`}
                    src={`${v.coverPdf}#view=FitH`}
                    style={{ border: '0', width: '100%', height: '100%', pointerEvents: 'none' }}
                  />
                  <Link
                    as={RouterLink}
                    to={routes.volume(v.series, v.id)}
                    aria-label={`${v.title} öffnen`}
                    position="absolute"
                    inset={0}
                    _hover={{ textDecoration: 'none' }}
                  />
                </Box>
                <Box mt={3}>
                  <Link href={v.coverPdf} isExternal color="var(--romani-blue)">
                    Cover (PDF) öffnen
                  </Link>
                </Box>
              </Box>

              <Box flex="1" minW={0}>
                <Text fontWeight="bold" mb={2}>
                  Abstract
                </Text>
                <DocxViewer docxUrl={v.abstractDocx} />

                <Box mt={8}>
                  <Text fontWeight="bold" mb={2}>
                    Download
                  </Text>
                  {v.textPdf ? (
                    <Link href={v.textPdf} isExternal color="var(--romani-blue)">
                      Text (PDF) herunterladen
                    </Link>
                  ) : (
                    <Text color="blackAlpha.700">Kein Download verfügbar.</Text>
                  )}
                </Box>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      ))}
      <Box borderTop="1px solid black" />
    </Accordion>
  )
}

