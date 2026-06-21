// Stockage média propre (Vercel Blob) — rend le site indépendant de WordPress.
// Nécessite la variable d'environnement BLOB_READ_WRITE_TOKEN (Vercel → Storage → Blob).
import { put } from '@vercel/blob'

export const isBlobConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN)

const EXT: Record<string, string> = {
  'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png',
  'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg', 'image/avif': 'avif',
}

export async function uploadImage(pathname: string, body: ArrayBuffer | Buffer | Blob, contentType?: string): Promise<string> {
  const ext = contentType ? (EXT[contentType] ?? 'jpg') : 'jpg'
  const key = pathname.includes('.') ? pathname : `${pathname}.${ext}`
  const res = await put(key, body, {
    access: 'public',
    addRandomSuffix: true,
    contentType: contentType || undefined,
  })
  return res.url
}
