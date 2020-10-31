import * as bodyPix from '@tensorflow-models/body-pix'; 

async function loadAndUseBodyPix() {
   const net = await bodyPix.load();
   // BodyPix model loaded
}