import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { routes } from '../routes'

export function Header() {
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid black"
      px="var(--page-padding-left)"
      py={3}
    >
      <Box>
        <Link as={RouterLink} to={routes.home}>
          <Text fontFamily="Mediamoure, BDOGrotesk, Arial, sans-serif" fontSize="24px" m={0}>
            PLURIPEN
          </Text>
        </Link>
        <Text fontSize="12px" color="blackAlpha.700" mt={0}>
          Online Open-Access-Verlag
        </Text>
      </Box>
      <Flex gap={6} fontSize="var(--font-size)">
        <Link as={RouterLink} to={routes.publications}>
          Publikationen
        </Link>
      </Flex>
    </Flex>
  )
}

