import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { Box, Container, Flex } from '@chakra-ui/react'
import { useMediaQuery } from 'react-responsive'

import { AnnouncementModal } from './components/AnnouncementModal'
import { Header } from './components/Header'
import { MobileHeader } from './components/MobileHeader'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { routes } from './routes'

import { HomePage } from './pages/HomePage'
import { PublicationsIndexPage } from './pages/PublicationsIndexPage'
import { SeriesPage } from './pages/SeriesPage'
import { VolumePage } from './pages/VolumePage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { DonationPage } from './pages/DonationPage'
import { ImpressumPage } from './pages/ImpressumPage'

function AppLayout() {
  const isMobileDevice = useMediaQuery({ query: '(max-width: 768px)' })
  const location = useLocation()
  const isPublicationsRoute =
    location.pathname === routes.publications || location.pathname.startsWith(`${routes.publications}/`)
  const showSidebarNavbar = isPublicationsRoute && !isMobileDevice
  const showMobileNavbar = isPublicationsRoute && isMobileDevice

  return (
    <Container maxW="100%" p={0} h="100vh" display="flex" flexDirection="column">
      <AnnouncementModal />
      {isMobileDevice ? <MobileHeader /> : <Header />}
      <Flex overflow="hidden" flex="1" minH={0}>
        {showSidebarNavbar && (
          <Box as="aside" flex="0 0 320px" borderRight="1px solid black" minH="100%">
            <Navbar />
          </Box>
        )}
        <Box flex="1" minH={0} overflow="auto">
          <Flex direction="column" minH="100%">
            {showMobileNavbar && <Navbar />}
            <Box flex="1">
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="publikationen" element={<PublicationsIndexPage />} />
                <Route path="publikationen/:series" element={<SeriesPage />} />
                <Route path="publikationen/:series/:volumeId" element={<VolumePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="kontakt" element={<ContactPage />} />
                <Route path="donation" element={<DonationPage />} />
                <Route path="impressum" element={<ImpressumPage />} />
              </Routes>
            </Box>
            <Footer />
          </Flex>
        </Box>
      </Flex>
    </Container>
  )
}

export default function AppWrapper() {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

