export const getProductImage = (image?: string) => {
  switch (image) {
    case 'sunflower.png':
      return require('../assets/images/sunflower.png');

    case 'groundnut.png':
      return require('../assets/images/groundnut.png');

    case 'coconut.png':
      return require('../assets/images/coconut.png');

    case 'sesame.png':
      return require('../assets/images/sesame.png');

    default:
      return require('../assets/images/sunflower.png');
  }
};