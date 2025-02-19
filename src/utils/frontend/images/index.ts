export function getPublicId(url: string): string {
    const urlParts = url.split('/')
    const urlPartsPublicId = urlParts[urlParts.length - 1]
    const publicId = urlPartsPublicId.split('.')[0]
    return `bienesRaices/${publicId}`
}