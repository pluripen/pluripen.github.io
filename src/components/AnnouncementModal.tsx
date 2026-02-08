import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useState } from 'react'

import { announcement } from '../content/announcement'

const storageKey = (id: string) => `pluripen:announcementSeen:${id}`

type Props = {
  onClose?: () => void
}

export function AnnouncementModal({ onClose }: Props) {
  const isActive = announcement.active

  const safeHtml = useMemo(() => DOMPurify.sanitize(announcement.bodyHtml), [])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isActive) return
    try {
      const seen = localStorage.getItem(storageKey(announcement.id))
      if (!seen) setIsOpen(true)
    } catch {
      setIsOpen(true)
    }
  }, [isActive, setIsOpen])

  if (!isActive) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        try {
          localStorage.setItem(storageKey(announcement.id), '1')
        } catch {
          // ignore
        }
        setIsOpen(false)
        onClose?.()
      }}
      size="lg"
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius="0">
        <ModalHeader>{announcement.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
          <Button
            mt={6}
            onClick={() => {
              try {
                localStorage.setItem(storageKey(announcement.id), '1')
              } catch {
                // ignore
              }
              setIsOpen(false)
              onClose?.()
            }}
          >
            Schließen
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

