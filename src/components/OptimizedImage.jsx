import { motion } from 'framer-motion'

const imageDimensions = {
  '/images/Amenagement_maroc_about.png': [834, 554],
  '/images/Amenagement_maroc_accompagner.png': [1920, 1106],
  '/images/Amenagement_maroc_hero.png': [1600, 1062],
  '/images/Amenagement_maroc_savoir_faire.jpg': [1920, 1280],
}

function replaceExtension(src, extension) {
  return src.replace(/\.[^./]+$/, extension)
}

export default function OptimizedImage({
  src,
  alt,
  priority = false,
  className = '',
  pictureClassName = 'contents',
  sizes = '(max-width: 768px) 100vw, 50vw',
  width,
  height,
  ...props
}) {
  const isLocalRaster = typeof src === 'string' && src.startsWith('/images/') && /\.(png|jpe?g)$/i.test(src)
  const dimensions = imageDimensions[src] || (isLocalRaster ? [1920, 1080] : [])
  const image = (
    <motion.img
      src={src}
      alt={alt}
      width={width || dimensions[0]}
      height={height || dimensions[1]}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      {...props}
    />
  )

  if (!isLocalRaster) return image

  const srcBase = replaceExtension(src, '')
  const avifSrcSet = [480, 768, 1280].map((w) => `${replaceExtension(src, `-${w}.avif`)} ${w}w`).join(', ')
    + `, ${replaceExtension(src, '.avif')} 1920w`
  const webpSrcSet = [480, 768, 1280].map((w) => `${replaceExtension(src, `-${w}.webp`)} ${w}w`).join(', ')
    + `, ${replaceExtension(src, '.webp')} 1920w`

  return (
    <picture className={pictureClassName}>
      <source srcSet={avifSrcSet} sizes={sizes} type="image/avif" />
      <source srcSet={webpSrcSet} sizes={sizes} type="image/webp" />
      {image}
    </picture>
  )
}
