import * as nocturno from "./nocturno.js";
const seccFav = document.querySelector(".mis_Favoritos");
const btnVer = document.querySelector(".btnVer");
let gifFavorito = JSON.parse(localStorage.getItem("array Fav"));
function pintarGifs(){
    gifFavorito.forEach(gifFav => {
        seccFav.innerHTML += `
        <div class="box2">
        <img src="${gifFav} alt="gif favorito" class="numFav">
        <div class="icon_img">
            <button class="boton_card favorito" id="favorito">
                <img src="./assets/icon-fav.svg" alt="corazon">
            </button>
            <button class="boton_card descargar" id="decargar"> 
                <img src="./assets/icon-download.svg" alt="descargar">
            </button>
            <button class="boton_card max">
                <img src="./assets/icon-max-normal.svg" alt="max">
            </button>
            <div class="texto_card">
                <p>user</p>
                <h5>Título GIFO</h5>
            </div>
        </div>
        </div>`
    });
    /*let numFav = document.querySelectorAll(".numFav");
    if(numFav.length>12){
        btnVer.innerHTML = `<button class="ver">VER MÁS</button>`
    }*/
}

if(gifFavorito){
    pintarGifs();
}else{
    seccFav.innerHTML = `
    <img src="./assets/icon-fav-sin-contenido.svg" atl="icon sin favoritos">
    <h6>¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!</h6>`
}
