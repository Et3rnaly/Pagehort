export function isRemoteImageSource(src: string) {
  return /^https?:\/\//i.test(src)
}
