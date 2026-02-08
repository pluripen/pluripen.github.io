import { Flex, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { routes } from '../routes'

export function MobileHeader() {
  return (
    <Flex as="header" direction="column" borderBottom="1px solid black" px="var(--page-padding-mobile)" py={4}>
      <Link as={RouterLink} to={routes.home}>
        <Text fontFamily="Mediamoure, BDOGrotesk, Arial, sans-serif" fontSize="26px" m={0}>
          PLURIPEN
        </Text>
      </Link>
      <Text fontSize="var(--font-size)" color="blackAlpha.700" mt={1}>
        Online Open-Access-Verlag
      </Text>
    </Flex>
  )
}

