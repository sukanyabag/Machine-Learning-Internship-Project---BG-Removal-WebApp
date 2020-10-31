import 'babel-polyfill';

var model;

window.onload = loadPage;

const loadPage = async () => {
  model = await bodyPix.load();
  console.log('model loaded successfully.');
  removeBackGround();
};

const removeBackGround = async () => {
  const img = document.getElementById('image');
  const segmentation = await model.segmentPerson(img);

  const coloredPartImage = bodyPix.toMask(segmentation);
  const opacity = 1;
  const flipHorizontal = false;
  const maskBlurAmount = 10;
  const canvas = document.getElementById('canvas1');
  // Draw the mask image on top of the original image onto a canvas.
  // The colored part image will be drawn semi-transparent, with an opacity of
  // 0.7, allowing for the original image to be visible under.
  bodyPix.drawMask(canvas, img, coloredPartImage, opacity, maskBlurAmount, flipHorizontal);
  makeBlur(segmentation);
};
const makeBlur = async segmentation => {
  const img = document.getElementById('image');
  const backgroundBlurAmount = 30;
  const edgeBlurAmount = 2;
  const flipHorizontal = false;

  const canvas = document.getElementById('canvas2');
  // Draw the image with the background blurred onto the canvas. The edge between
  // the person and blurred background is blurred by 3 pixels.
  bodyPix.drawBokehEffect(canvas, img, segmentation, backgroundBlurAmount, edgeBlurAmount, flipHorizontal);
};

loadPage();