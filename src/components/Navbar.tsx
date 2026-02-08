import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import { routes } from '../routes'
import { SERIES, type SeriesKey } from '../publications/series'

export function Navbar() {
  const linkStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    fontSize: '18px',
    paddingLeft: '20px',
    borderBottom: '1px solid black',
    transition: 'background 0.3s ease',
    height: '56px',
    minHeight: '56px',
    width: '100%',
  } as const

  const NavItem = ({
    to,
    seriesKey,
  }: {
    to: string
    seriesKey: SeriesKey
  }) => {
    const series = SERIES[seriesKey]
    return (
      <Link as={NavLink} to={to} end sx={linkStyles} _activeLink={{ fontWeight: 'bold' }}>
        <Flex direction="column" lineHeight="1.15">
          <Text m={0}>{series.shortName}</Text>
          <Text m={0} fontSize="12px" color="blackAlpha.700">
            {series.title}
          </Text>
        </Flex>
      </Link>
    )
  }

  return (
    <Box as="nav" height="100%">
      <Link
        as={NavLink}
        to={routes.publications}
        end
        sx={{
          ...linkStyles,
          fontSize: '46px',
          height: '120px',
          minHeight: '120px',
          alignItems: 'flex-end',
          paddingBottom: '14px',
        }}
      >
        Publikationen
      </Link>
      {(['GLM', 'GPS', 'GPT', 'GRP', 'PLURIPEN'] as SeriesKey[]).map((key) => (
        <NavItem key={key} to={routes.series(key)} seriesKey={key} />
      ))}
    </Box>
  )
}

