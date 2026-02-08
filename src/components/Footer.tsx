import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { routes } from '../routes'

export function Footer() {
  return (
    <Box as="footer" borderTop="1px solid black" py={6} px="var(--page-padding-left)" mt="auto">
      <Flex justifyContent="space-between" alignItems="center" gap={4} flexWrap="wrap">
        <Text fontSize="var(--font-size)" color="blackAlpha.700">
          © {new Date().getFullYear()} PLURIPEN
        </Text>
        <Flex gap={4} fontSize="var(--font-size)">
          <Link as={RouterLink} to={routes.about}>
            About
          </Link>
          <Link as={RouterLink} to={routes.impressum}>
            Impressum
          </Link>
          <Link as={RouterLink} to={routes.contact}>
            Kontakt
          </Link>
          <Link as={RouterLink} to={routes.donation}>
            Donation
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

