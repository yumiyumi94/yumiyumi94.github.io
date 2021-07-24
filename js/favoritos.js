import * as nocturno from "./nocturno.js";
const seccFav = document.querySelector(".mis_Favoritos");
const btnVer = document.querySelector(".btnVer");
let gifFavorito = JSON.parse(localStorage.getItem("array Fav"));
function pintarGifs(){
    gifFavorito.forEach(gifFav => {
        seccFav.innerHTML += `<img src="${gifFav} alt="gif favorito" class="numFav">`
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
