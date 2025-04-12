import Box from '@mui/material/Box'

interface IImagesRounded {
  url: {
    src: string
  }
  borderRadius?: string
}
export default function ImagesRounded({ url, borderRadius }: IImagesRounded) {
  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        backgroundImage: `url(${url.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: borderRadius ?? '32px',
      }}
    />
  )
}
