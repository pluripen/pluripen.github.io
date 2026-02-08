import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Image, Link, Text, useMediaQuery } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'

import { routes } from '../routes'
import { SERIES, type SeriesKey } from '../publications/series'

export function HomePage() {
  const [isMobile] = useMediaQuery('(max-width: 966px)')

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartScrollLeftRef = useRef(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const cardWidth = useMemo(() => (isMobile ? 320 : 520), [isMobile])
  const cardHeight = useMemo(() => (isMobile ? 260 : 360), [isMobile])
  const cardGap = useMemo(() => (isMobile ? 14 : 18), [isMobile])

  const updateScrollButtons = () => {
    const el = sliderRef.current
    if (!el) return
    const left = el.scrollLeft
    const maxLeft = el.scrollWidth - el.clientWidth
    setCanScrollLeft(left > 1)
    setCanScrollRight(left < maxLeft - 1)
  }

  const scrollByCards = (direction: -1 | 1) => {
    const el = sliderRef.current
    if (!el) return
    const amount = direction * (cardWidth + cardGap)
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  useEffect(() => {
    updateScrollButtons()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = sliderRef.current
    if (!el) return
    isDraggingRef.current = true
    dragStartXRef.current = e.clientX
    dragStartScrollLeftRef.current = el.scrollLeft
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = sliderRef.current
    if (!el || !isDraggingRef.current) return
    const dx = e.clientX - dragStartXRef.current
    el.scrollLeft = dragStartScrollLeftRef.current - dx
  }

  const onPointerUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    updateScrollButtons()
  }

  return (
    <Box>
      <Text
        fontSize={isMobile ? '14px' : '16px'}
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

      {/* Horizontal series slider (restored) */}
      <Box py={4}>
        <Flex
          align="baseline"
          justify="flex-end"
          marginLeft={isMobile ? 'var(--content-margin-left-mobile)' : 'var(--content-margin-left)'}
          marginRight={isMobile ? 'var(--page-padding-mobile)' : 'var(--page-padding-right)'}
          mb={3}
          gap={3}
        >
          <Flex gap={2}>
            <IconButton
              aria-label="Zurück"
              icon={<ChevronLeftIcon boxSize={5} />}
              variant="ghost"
              isDisabled={!canScrollLeft}
              onClick={() => scrollByCards(-1)}
            />
            <IconButton
              aria-label="Weiter"
              icon={<ChevronRightIcon boxSize={5} />}
              variant="ghost"
              isDisabled={!canScrollRight}
              onClick={() => scrollByCards(1)}
            />
          </Flex>
        </Flex>

        <Box position="relative">
          <Box
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            width={isMobile ? '18px' : '28px'}
            pointerEvents="none"
            bgGradient="linear(to-r, white 0%, rgba(255,255,255,0) 100%)"
            zIndex={1}
          />
          <Box
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            width={isMobile ? '18px' : '28px'}
            pointerEvents="none"
            bgGradient="linear(to-l, white 0%, rgba(255,255,255,0) 100%)"
            zIndex={1}
          />

          <Box
            ref={sliderRef}
            overflowX="auto"
            px={isMobile ? 'var(--page-padding-mobile)' : 'var(--page-padding-left)'}
            pb={2}
            onScroll={updateScrollButtons}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            sx={{
              cursor: 'grab',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              userSelect: 'none',
            }}
          >
            <Flex gap={`${cardGap}px`} width="max-content">
              {(['GLM', 'GPS', 'GPT', 'GRP', 'PLURIPEN'] as SeriesKey[]).map((key) => {
                const series = SERIES[key]
                return (
                  <Link
                    key={key}
                    as={RouterLink}
                    to={routes.series(key)}
                    _hover={{ textDecoration: 'none' }}
                    sx={{ scrollSnapAlign: 'start' }}
                  >
                    <Box width={`${cardWidth}px`}>
                      <Image
                        src={series.coverImage}
                        alt={`${series.shortName} cover`}
                        width="100%"
                        height={`${cardHeight}px`}
                        objectFit="cover"
                        display="block"
                      />
                      <Text mt={3} mb={0} fontSize={isMobile ? '16px' : '18px'} lineHeight="1.2">
                        {series.title}
                      </Text>
                      <Text mt={1} mb={0} fontSize="var(--font-size)" color="blackAlpha.700">
                        {series.shortName}
                      </Text>
                    </Box>
                  </Link>
                )
              })}
            </Flex>
          </Box>
        </Box>
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

