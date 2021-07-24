//traer y pintar los trending gifs
const API_KEY = "xG8nagUIVFogPgw2nuvPUk503UMh6eDx";
const LIMIT = 9;

const fetchTrending = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${LIMIT}`); 
const dataFetchTrending = await fetchTrending.json();
const trendingG= dataFetchTrending.data;

function crearTrending(trendingData){
    const seccTrending = document.querySelector("#trendingGifs");
    console.log(trendingG);

    for (const gifData of trendingData) {
        seccTrending.innerHTML += `
        <div class="box2">
        <img src="${gifData.images.fixed_height.url}" alt="gif trending" class="gif_trend">
        <div class="icon_img">
        <button class="boton_card favorito" id="favorito">
        <input type="hidden"value="${gifData.images.original.url}"> 
        <img src="./assets/icon-fav.svg" alt="corazon">
        </button>
        <button class="boton_card descargar" id="decargar"> 
        <input type="hidden"value="${gifData.images.original.url}"> 
        <img src="./assets/icon-download.svg" alt="descargar">
        </button>
        <button class="boton_card max" id="max_${gifData.id}">
            <input type="hidden"value="${gifData.images.original.url}"> 
            <img src="./assets/icon-max-normal.svg" alt="max">
        </button>
        <div class="texto_card">
        <p>${gifData.username}</p>
        <h5>${gifData.title}</h5>
        </div>
        </div>
        </div>
    `
    }
    const box2 = document.querySelector(".box2");
    const max = document.querySelectorAll(`.max`);
    const seccTrend = document.querySelector(".sec_trending");
    const seccMax = document.querySelector(".max_gif");
        max.forEach((elemento)=>{
            elemento.addEventListener("click", (e)=>{
                let eventoBtn = e.currentTarget;
                let elemntoInput = eventoBtn.querySelector("input").value;
                console.log(elemento);
                seccMax.innerHTML = `
                
                    <img src="${elemntoInput}" alt="gif max" id="gif_max">
                    <img src="./assets/close.svg" alt="cerrar" id="cerrar">
                    <div class="info_gif">
                    <button class="boton_card favorito" id="favorito">
                    <input type="hidden"value="${elemntoInput}"> 
                    <img src="./assets/icon-fav.svg" alt="corazon">
                    </button>
                    <button class="boton_card descargar" id="decargar"> 
                    <input type="hidden"value="${elemntoInput}"> 
                    <img src="./assets/icon-download.svg" alt="descargar">
                    </button>
                </div>
                </div>
            `
            const main = document.querySelector("main");
            const cerrar = document.querySelector("#cerrar");
            cerrar.addEventListener("click", (e)=>{
                let throwawayNode = main.removeChild(seccMax);
                location.reload();
            })
            })
        })
        
    const descargar = document.querySelectorAll(`.descargar`);
    descargar.forEach((ele)=>{
        ele.addEventListener("click",(e)=>{
            let btnEvento = e.currentTarget;
            let inputElemento = btnEvento.querySelector("input").value;
            getImage(inputElemento);
        } )
    })
    const corazon = document.querySelectorAll(`.favorito`);

    corazon.forEach((element)=>{
        element.addEventListener("click",(e)=>{
            let btnelement = e.currentTarget;
            let elementInput = btnelement.querySelector("input").value;
            let arrayLocalStorage = localStorage.getItem("array Fav");
            let gifosGuardados = [];
            if(arrayLocalStorage){
                gifosGuardados = JSON.parse(arrayLocalStorage);
            }
            gifosGuardados.push(elementInput);
            localStorage.setItem("array Fav", JSON.stringify(gifosGuardados));
        })
    })
}

crearTrending(trendingG);

async function getImage(url) {

    const imageFetch = await fetch(url);
    const file = await imageFetch.blob();
    const urlBlob = URL.createObjectURL(file);

    const a = document.createElement("a");
    a.download = "myImage";
    a.href = urlBlob;
    a.textContent = "Download"

    a.click();
}

//Slider
const slider = document.querySelector("#trendingGifs");
let seccSlider = document.querySelectorAll(".box2");
let ultimoSlider = seccSlider[seccSlider.length -1];

const bntIzq = document.querySelector("#flecha_izq");
const btnDer = document.querySelector("#flecha_der");

slider.insertAdjacentElement("afterbegin", ultimoSlider);

function moverDerecha(){
    let primerSlider = document.querySelectorAll(".box2")[0];
    slider.style.marginLeft = "-50%";
    slider.style.transition ="0.3s ease";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement("beforeend", primerSlider);
        slider.style.marginLeft = "-50%";
    }, 300);
}

btnDer.addEventListener("mousedown", function(){
        btnDer.innerHTML = `<img src="./assets/Button-Slider-right-hover.svg"
        alt="flecha derecha" class="flechaDer">`
    moverDerecha();
})
btnDer.addEventListener("mouseup", function(){
    btnDer.innerHTML = `<img src="./assets/Button-Slider-right.svg"
    alt="flecha derecha" class="flechaDer">`
    if(document.body.classList.contains("dark")){
        btnDer.innerHTML = `<img src="./assets/button-slider-right-md-noct.svg" alt="flecha izquierda" class="flechaIzq">`
    }else{
        btnDer.innerHTML = `<img src="./assets/button-slider-right.svg" alt="flecha izquierda" class="flechaIzq">`
    }
})

function moverIzquierda(){
    let seccSlider = document.querySelectorAll(".box2");
    let ultimoSlider = seccSlider[seccSlider.length -1];
    slider.style.marginLeft = "-30%";
    slider.style.transition ="0.3s ease";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement("afterbegin", ultimoSlider);
        slider.style.marginLeft = "-30%";
    }, 300);
}

bntIzq.addEventListener("mousedown", function(){
        bntIzq.innerHTML = `<img src="./assets/button-slider-left-hover.svg" alt="flecha izquierda" class="flechaIzq">`
    moverIzquierda();
})
bntIzq.addEventListener("mouseup", function(){
    bntIzq.innerHTML = `<img src="./assets/button-slider-left.svg" alt="flecha izquierda" class="flechaIzq">`
    if(document.body.classList.contains("dark")){
        bntIzq.innerHTML = `<img src="./assets/button-slider-left-md-noct.svg" alt="flecha izquierda" class="flechaIzq">`
    }else{
        bntIzq.innerHTML = `<img src="./assets/button-slider-left.svg" alt="flecha izquierda" class="flechaIzq">`
    }
})

//botones favorito, descarga, ampliar
const corazon = document.querySelector("#favorito");
const descarga = document.querySelector("#decargar");

export default {}