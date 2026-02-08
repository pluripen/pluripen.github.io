import { Box, Link, Text } from '@chakra-ui/react'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useState } from 'react'
import mammoth from 'mammoth'

type Props = {
  docxUrl: string
  downloadLabel?: string
  showDownloadLink?: boolean
}

export function DocxViewer({
  docxUrl,
  downloadLabel = 'Abstract (DOCX) herunterladen',
  showDownloadLink = true,
}: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [html, setHtml] = useState<string>('')

  const safeHtml = useMemo(() => DOMPurify.sanitize(html), [html])

  useEffect(() => {
    let cancelled = false

    async function run() {
      try {
        setIsLoading(true)
        setError(null)

        const res = await fetch(docxUrl)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const arrayBuffer = await res.arrayBuffer()

        const result = await mammoth.convertToHtml({ arrayBuffer })
        if (!cancelled) setHtml(result.value || '')
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [docxUrl])

  return (
    <Box>
      {showDownloadLink ? (
        <Box mb={3}>
          <Link href={docxUrl} isExternal color="var(--romani-blue)">
            {downloadLabel}
          </Link>
        </Box>
      ) : null}
      {isLoading ? (
        <Text color="blackAlpha.700">Abstract wird geladen…</Text>
      ) : error ? (
        <Text color="red.600">Abstract konnte nicht geladen werden: {error}</Text>
      ) : html ? (
        <Box
          fontSize="var(--font-size)"
          sx={{
            p: { marginBottom: '0.75rem' },
            ul: { paddingLeft: '1.25rem' },
            ol: { paddingLeft: '1.25rem' },
          }}
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      ) : (
        <Text color="blackAlpha.700">Kein Abstract-Inhalt gefunden.</Text>
      )}
    </Box>
  )
}

