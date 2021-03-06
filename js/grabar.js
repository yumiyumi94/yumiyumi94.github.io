//prenter camara para grabar 
const botonComenzar = document.querySelector("#comenzar");
const botonGrabar = document.querySelector("#grabar");
const botonFinalizar = document.querySelector("#finalizar");
const botonSubir = document.querySelector("#subir");
const videoElement = document.querySelector("#video");
const botonGeneral = document.querySelector(".botonGeneral");
const cuadroGrabar = document.querySelector(".cuadro_grabar");
const boton1 = document.querySelector(".n1");
const boton2 = document.querySelector(".n2");
const boton3 = document.querySelector(".n3");
const seccCronometro = document.querySelector("#cronometro");
const cuadroVideo = document.querySelector("#cuadro_video");
let blob;

botonComenzar.addEventListener("click",function(){
   cuadroGrabar.innerHTML =`
      <video src="" id="video">
      <h2>¿Nos das acceso a tu cámara?</h2>
      <p>El acceso a tu cámara será válido sólo por el tiempo en el que estés creando el GIFO</p>
      </video>
   `
   boton1.style.background = "#572EE5";
   boton1.style.color = "white";
   botonComenzar.style.visibility ="hidden";
   botonGrabar.style.visibility="visible";
   permisoCamara();

})

   botonGrabar.addEventListener("click", function(){
      boton1.style.background = "white";
      boton1.style.color = "#572EE5";
      boton2.style.background = "#572EE5";
      boton2.style.color = "white";
      botonGrabar.style.visibility="hidden";
      botonFinalizar.style.visibility="visible";
      seccCronometro.style.visibility="visible";
      cargar();
      grabar();
   })


   botonFinalizar.addEventListener("click", function(){
      seccCronometro.innerHTML = `<a class="repetirCaptura" id="repetir">REPETIR CAPTURA<a>`
      botonFinalizar.style.visibility="hidden";
      botonSubir.style.visibility="visible";
      finalizar();
      detenerse();

      const btnRepetir = document.querySelector("#repetir");
      btnRepetir.addEventListener("click", function(){
      seccCronometro.innerHTML =`<span class="cronometro" id="min">0</span>:<span class="cronometro" id="seg">0</span>`;
      boton1.style.background = "white";
      boton1.style.color = "#572EE5";
      boton2.style.background = "#572EE5";
      boton2.style.color = "white";
      botonGrabar.style.visibility="hidden";
      botonSubir.style.visibility="hidden";
      botonFinalizar.style.visibility="visible";
      seccCronometro.style.visibility="visible";
      cargar();
      grabar();
      })
   })

botonSubir.addEventListener("click", async function(){
   botonSubir.style.visibility="hidden";
   boton2.style.background = "white";
   boton2.style.color = "#572EE5";
   boton3.style.background = "#572EE5";
   boton3.style.color = "white";
   addElement();
   seccCronometro.innerHTML=" ";
   const form = new FormData();
   form.append("file", blob, "gifoNuevo.gif")
   const respuestaFetch = await fetch("https://upload.giphy.com/v1/gifs?api_key=xG8nagUIVFogPgw2nuvPUk503UMh6eDx&username=yumiyumi94", {method:"POST", body:form});
   const datos = await respuestaFetch.json();
   console.log(datos);
   const fetchURlGifo = await fetch(`https://api.giphy.com/v1/gifs/${datos.data.id}?api_key=xG8nagUIVFogPgw2nuvPUk503UMh6eDx`)
   const miGifUrl = await fetchURlGifo.json();
   const miGif = miGifUrl.data.images.downsized_medium.url;
   console.log(miGif);
   let arrayLocalStorageMisGifs = localStorage.getItem("array misGifos");
   let misGifosGuardados = [];
      if(arrayLocalStorageMisGifs){
            misGifosGuardados = JSON.parse(arrayLocalStorageMisGifs);
            }
      misGifosGuardados.push(miGif);
      localStorage.setItem("array misGifos", JSON.stringify(misGifosGuardados));

   setTimeout(()=>{
      cuadroGrabar.innerHTML=`
      <video src="" id="video"></video>
      <h2>¡Tu GIFO ha sido guadrado en misGifos!</h2>`
   },2000)
})

function addElement(){
   const newDiv = document.createElement("div");
   newDiv.classList.add("cuadro_video");
   newDiv.innerHTML = `
      <div class="texto_cargando">
         <img src="./assets/loader.svg" alt="imagen cargando">
         <h5>Estamos subiendo tu GIFO</h5>
      </div>`
   cuadroGrabar.appendChild(newDiv);
}

let stream = await navigator.mediaDevices.getUserMedia({video: {
   height: { max: 480 }
}, audio: false});

async function permisoCamara(){
   video.srcObject = stream;
    video.play()
}
let recorder = new RecordRTCPromisesHandler(stream, {
   type: 'gif',video: videoElement
});
async function grabar(){
  recorder.startRecording();
}

async function finalizar(){
   await recorder.stopRecording();
   blob = await recorder.getBlob();
   console.log(blob);
}

let cronometro; 
function cargar(){
   let contador_s=0;
   let contador_m=0;
   let s=document.querySelector("#seg");
   let m=document.querySelector("#min");

   cronometro = setInterval(
      function(){
         if(contador_s==60){
            contador_s=0;
            contador_m++;
            m.innerHTML=`${contador_m}`;

            if(contador_m==0){
               contador_m=0;
            }
         }
         s.innerHTML = contador_s;
         contador_s++;
      }, 1000
   );
}

function detenerse(){
   clearInterval(cronometro);
}

/*Ricardo: Una vez crean el form es tan facil como escribir asi el fetch:

fetch(url del endpoint con el api key, {method: POST, body: form})

Listo, deberian obtener el id del gif como respuesta
Post es un string por cierto */





