import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const imageRoot = path.resolve('public/images')
const sourceExtensions = new Set(['.png', '.jpg', '.jpeg'])
const responsiveWidths = [480, 768, 1280]

async function listSourceImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const images = []

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      images.push(...await listSourceImages(fullPath))
    } else if (sourceExtensions.has(path.extname(entry.name).toLowerCase())) {
      images.push(fullPath)
    }
  }

  return images
}

async function isCurrent(source, destination) {
  try {
    const [sourceStat, destinationStat] = await Promise.all([stat(source), stat(destination)])
    return destinationStat.mtimeMs >= sourceStat.mtimeMs
  } catch {
    return false
  }
}

async function optimize(source) {
  const extension = path.extname(source)
  const base = source.slice(0, -extension.length)
  const webp = `${base}.webp`
  const avif = `${base}.avif`
  const pipeline = () => sharp(source).rotate().resize({
    width: 1920,
    height: 1920,
    fit: 'inside',
    withoutEnlargement: true,
  })

  if (!await isCurrent(source, webp)) {
    await pipeline().webp({ quality: 78, effort: 4 }).toFile(webp)
  }
  if (!await isCurrent(source, avif)) {
    await pipeline().avif({ quality: 48, effort: 2 }).toFile(avif)
  }

  for (const width of responsiveWidths) {
    const responsivePipeline = () => sharp(source).rotate().resize({
      width,
      withoutEnlargement: true,
    })
    const responsiveWebp = `${base}-${width}.webp`
    const responsiveAvif = `${base}-${width}.avif`

    if (!await isCurrent(source, responsiveWebp)) {
      await responsivePipeline().webp({ quality: 76, effort: 4 }).toFile(responsiveWebp)
    }
    if (!await isCurrent(source, responsiveAvif)) {
      await responsivePipeline().avif({ quality: 46, effort: 2 }).toFile(responsiveAvif)
    }
  }
}

const sources = await listSourceImages(imageRoot)
for (const [index, source] of sources.entries()) {
  await optimize(source)
  console.log(`[${index + 1}/${sources.length}] ${path.relative(imageRoot, source)}`)
}

const originalBytes = (await Promise.all(sources.map((file) => stat(file)))).reduce((sum, item) => sum + item.size, 0)
const optimizedFiles = sources.flatMap((source) => {
  const extension = path.extname(source)
  const base = source.slice(0, -extension.length)
  return [
    `${base}.webp`,
    `${base}.avif`,
    ...responsiveWidths.flatMap((width) => [`${base}-${width}.webp`, `${base}-${width}.avif`]),
  ]
})
const optimizedBytes = (await Promise.all(optimizedFiles.map((file) => stat(file)))).reduce((sum, item) => sum + item.size, 0)

console.log(`Originaux : ${(originalBytes / 1024 / 1024).toFixed(1)} Mo`)
console.log(`WebP + AVIF : ${(optimizedBytes / 1024 / 1024).toFixed(1)} Mo`)
