import { readdir, rename, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const imageRoot = path.resolve('public/images')
const sourceExtensions = new Set(['.png', '.jpg', '.jpeg'])

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

const sources = await listSourceImages(imageRoot)
let beforeBytes = 0
let afterBytes = 0

for (const [index, source] of sources.entries()) {
  const extension = path.extname(source).toLowerCase()
  const temporary = `${source}.optimized`
  const backup = `${source}.backup`
  await rm(temporary, { force: true })
  await rm(backup, { force: true })
  const before = (await stat(source)).size
  let pipeline = sharp(source).rotate().resize({
    width: 1920,
    height: 1920,
    fit: 'inside',
    withoutEnlargement: true,
  })

  pipeline = extension === '.png'
    ? pipeline.png({ compressionLevel: 9, palette: true, quality: 85, effort: 8 })
    : pipeline.jpeg({ quality: 82, mozjpeg: true })

  await pipeline.toFile(temporary)
  const optimized = (await stat(temporary)).size

  if (optimized < before) {
    await rename(source, backup)
    try {
      await rename(temporary, source)
      await rm(backup, { force: true })
    } catch (error) {
      await rename(backup, source)
      throw error
    }
    afterBytes += optimized
  } else {
    afterBytes += before
  }
  beforeBytes += before
  await rm(temporary, { force: true })
  console.log(`[${index + 1}/${sources.length}] ${path.relative(imageRoot, source)}`)
}

console.log(`Originaux avant : ${(beforeBytes / 1024 / 1024).toFixed(1)} Mo`)
console.log(`Originaux après : ${(afterBytes / 1024 / 1024).toFixed(1)} Mo`)
