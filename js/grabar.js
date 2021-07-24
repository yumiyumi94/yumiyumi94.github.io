//prenter camara para grabar 
const botonComenzar = document.querySelector(".comenzar");
const videoElement = document.querySelector("#video");
const botonGeneral = document.querySelector(".botonGeneral");
const cuadroGrabar = document.querySelector(".cuadro_grabar");
const boton1 = document.querySelector(".n1");

function getStreamAndRecord () { 
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
       height: { max: 480 }
    }
 })
 .then(function(stream) {
   video.srcObject = stream;
   video.play()
 })
}

botonGeneral.addEventListener("click",function(){
   cuadroGrabar.innerHTML =`
   <video src="" id="video">
   <h2>¿Nos das acceso a tu cámara?</h2>
   <p>El acceso a tu cámara será válido sólo por el tiempo en el que estés creando el GIFO</p>
   </video>
   `
   botonGeneral.textContent = "GRABAR";
   grabar();
})


//Grabar

async function grabar(){
   let stream = await navigator.mediaDevices.getUserMedia({video: {
      height: { max: 480 }
   }, audio: false});
   video.srcObject = stream;
    video.play()
   let recorder = new RecordRTCPromisesHandler(stream, {
    type: 'gif',video: videoElement
});
recorder.startRecording();

const sleep = m => new Promise(r => setTimeout(r, m));
await sleep(3000);

await recorder.stopRecording();
let blob = await recorder.getBlob();
invokeSaveAsDialog(blob);

let form = new FormData();
  form.append('file', recorder.getBlob(), 'myGif.gif');
}






