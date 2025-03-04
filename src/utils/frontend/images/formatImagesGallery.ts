export const formatImagesGallery = (images : (string | File)[]) => {
  const currentURLSGallery = images.filter(image => typeof image === 'string')
  const newImagesGallery = images.filter(image => typeof image !== 'string')
  return [
      currentURLSGallery,
      newImagesGallery
  ]
}