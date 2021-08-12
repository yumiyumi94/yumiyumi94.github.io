import * as nocturno from "./nocturno.js";
const seccMisGifos = document.querySelector(".mis_GIFOS");
let miGIFO = JSON.parse(localStorage.getItem("array misGifos"));
function pintarMisGifs(){
    miGIFO.forEach(miGif => {
        seccMisGifos.innerHTML += `
        <div class="box2">
        <img src="${miGif} alt="mi Gif" class="numGif">
        <div class="icon_img">
        <button class="boton_card favorito" id="favorito">
        <img src="./assets/icon-trash-normal.svg" alt="corazon">
        </button>
        <button class="boton_card descargar" id="decargar"> 
        <img src="./assets/icon-download.svg" alt="descargar">
        </button>
        <button class="boton_card max">
            <img src="./assets/icon-max-normal.svg" alt="max">
        </button>
        <div class="texto_card">
        <p>yumiyumi94</p>
        <h5>Título GIFO</h5>
        </div>
        </div>
        </div>`
    });
}
console.log(seccMisGifos);

if(miGIFO){
    pintarMisGifs();
}else{
    seccMisGifos.innerHTML=`
    <img src="./assets/icon-mis-gifos-sin-contenido.svg" atl="icon sin mis gifos">
    <h6>¡Anímate a crear tu primer GIFO!</h6>`
}

