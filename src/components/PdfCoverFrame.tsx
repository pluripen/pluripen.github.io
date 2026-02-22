import { AspectRatio, Box } from '@chakra-ui/react'

type Props = {
  pdfUrl: string
  title: string
  /**
   * Approximate page ratio for a portrait cover preview.
   * A4 is ~0.707 (210 / 297). You can override per series if needed.
   */
  ratio?: number
  pointerEvents?: 'auto' | 'none'
}

export function PdfCoverFrame({ pdfUrl, title, ratio = 210 / 297, pointerEvents = 'none' }: Props) {
  // Use "page-fit" so the full cover page is visible without scrolling.
  // The extra params are ignored by viewers that don't support them.
  const src = `${pdfUrl}#page=1&zoom=page-fit&toolbar=0&navpanes=0&scrollbar=0`

  return (
    <Box
      border="1px solid"
      borderColor="blackAlpha.200"
      borderRadius="10px"
      overflow="hidden"
      background="white"
      boxShadow="0 6px 18px rgba(0,0,0,0.08)"
    >
      <AspectRatio ratio={ratio} width="100%">
        <iframe
          title={title}
          src={src}
          loading="lazy"
          style={{ border: 0, width: '100%', height: '100%', display: 'block', pointerEvents }}
        />
      </AspectRatio>
    </Box>
  )
}

