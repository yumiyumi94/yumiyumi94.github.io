//Busqueda
const API_KEY = "xG8nagUIVFogPgw2nuvPUk503UMh6eDx";
const LIMIT = 12;
let sugerencias = [];

let inputSearch = document.querySelector("#busqueda");
let resultadoSearch = document.querySelector("#resultadoGifs");
let tituloSearch = document.querySelector("#titulo_resultados");
//https://api.giphy.com/v1/tags/related/${inputSearch.value}?api_key=${API_KEY}&limit=${LIMIT}`
//https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${inputSearch.value}&limit=${LIMIT}
//busqueda sugerida
const cajaBusqueda = document.querySelector("#busqueda");
let autocompletar = document.querySelector(".autocompletar");
const lupa = document.querySelector("#lupa");

cajaBusqueda.addEventListener("keyup", (e)=>{
    const palabraClave = cajaBusqueda.value;
    autocompletar.innerHTML ="";
    if(e.keyCode ===13){
        console.log(e.keyCode);
        autocompletar.innerHTML =" ";
    }else{
        lupa.classList.toggle("no_lupa");
    }

    const fetchSugerencia = fetch(`https://api.giphy.com/v1/tags/related/${palabraClave}?api_key=xG8nagUIVFogPgw2nuvPUk503UMh6eDx`)
    .then((response)=>{
        return response.json();
    })
    .then((respuesta)=>{
        respuesta.data.forEach((sugerencia)=>{
            let palabra = sugerencia.name; 
            autocompletar.innerHTML += `
            <li class="sugerencias">${palabra}<img src="./assets/icon-search.svg" alt="lupa busqueda"> </li>
            `
           const palabraUsuario = document.querySelectorAll(".sugerencias");
           for (const letra of palabraUsuario) {
               letra.addEventListener("click", (e)=>{
                cajaBusqueda.value = letra.textContent;
                autocompletar.innerHTML =` `;
                fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${cajaBusqueda.value}&limit=${LIMIT}`)
                .then((response)=>{
                return response.json();
                })
                .then((resultado)=>{
                    tituloSearch.textContent = `${cajaBusqueda.value}`;
                    resultado.data.forEach((gif)=>{
                        let urlGif = gif.images.fixed_height.url;
                        resultadoSearch.innerHTML += `
                        <div class="box2">
                        <img src="${urlGif}" atl="gif resultado" class="gif_trend">
                        <div class="icon_img">
                        <button class="boton_card favorito2" id="favorito">
                        <input type="hidden"value="${gif.images.original.url}">
                        <img src="./assets/icon-fav.svg" alt="corazon">
                        </button>
                        <button class="boton_card descargar2" id="descargar">
                        <input type="hidden"value="${gif.images.original.url}">
                        <img src="./assets/icon-download.svg" alt="descargar">
                        </button>
                        <button class="boton_card max2" id="max_${gif.id}">
                        <img src="./assets/icon-max-normal.svg" alt="max">
                        </button>
                    <div class="texto">
                    <p>${gif}</p>
                    <h5>${gif.title}</h5>
                    </div>
                    </div>
                        </div>`;
                    })
                })
                const verMas = document.querySelector(".ver_mas");
                verMas.classList.toggle("visible");
                verMas.addEventListener("click", (e)=>{
                num = num +1;
                let offSet = num*12; 
                fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${cajaBusqueda.value}&limit=${LIMIT}&offset=${offSet}`)
                .then((response)=>{
                    return response.json();
                })
                .then((resultado)=>{
                tituloSearch.textContent = `${cajaBusqueda.value}`;
                resultado.data.forEach((gifo)=>{
                let urlGifo = gifo.images.fixed_height.url;
                resultadoSearch.innerHTML += `
                    <div class="box2">
                        <img src="${urlGifo}" atl="gif resultado" class="gif_trend">
                        <div class="icon_img">
                            <button class="boton_card favorito2">
                            <input type="hidden"value="${urlGifo}"> 
                            <img src="./assets/icon-fav.svg" alt="corazon">
                            </button>
                            <button class="boton_card descargar2">
                            <input type="hidden"value="${urlGifo}"> 
                            <img src="./assets/icon-download.svg" alt="descargar">
                            </button>
                            <button class="boton_card max2" id="max_${gifo.id}">
                            <input type="hidden"value="${gifo.images.original.url}"> 
                            <img src="./assets/icon-max-normal.svg" alt="max">
                            </button>
                            <div class="texto">
                                <p>${gifo.username}</p>
                                <h5>${gifo.title}</h5>
                            </div>
                     </div>
                </div>`;
        })
    })
    }) 
            })
           }
        })
    })
})

let num = 1;
function pintarResultados(){
inputSearch.addEventListener("keyup", (event)=>{
    resultadoSearch.innerHTML = "";
    if(event.keyCode === 13){
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${inputSearch.value}&limit=${LIMIT}`)
    .then((response)=>{
        return response.json();
    })
    .then((resultado)=>{
        tituloSearch.textContent = `${inputSearch.value}`;
        resultado.data.forEach((gif)=>{
            let urlGif = gif.images.fixed_height.url;
            resultadoSearch.innerHTML += `
            <div class="box2">
            <img src="${urlGif}" atl="gif resultado" class="gif_trend">
            <div class="icon_img">
            <button class="boton_card favorito2" id="favorito">
            <input type="hidden"value="${gif.images.original.url}">
            <img src="./assets/icon-fav.svg" alt="corazon">
            </button>
            <button class="boton_card descargar2" id="descargar">
            <input type="hidden"value="${gif.images.original.url}">
            <img src="./assets/icon-download.svg" alt="descargar">
            </button>
            <button class="boton_card max2" id="max_${gif.id}">
            <img src="./assets/icon-max-normal.svg" alt="max">
            </button>
        <div class="texto">
        <p>${gif}</p>
        <h5>${gif.title}</h5>
        </div>
        </div>
            </div>`;
        })
    })
    const verMas = document.querySelector(".ver_mas");
    verMas.classList.toggle("visible");
    verMas.addEventListener("click", (e)=>{
        num = num +1;
        let offSet = num*12; 
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${inputSearch.value}&limit=${LIMIT}&offset=${offSet}`)
    .then((response)=>{
        return response.json();
    })
    .then((resultado)=>{
        tituloSearch.textContent = `${inputSearch.value}`;
        resultado.data.forEach((gifo)=>{
            let urlGifo = gifo.images.fixed_height.url;
            resultadoSearch.innerHTML += `
            <div class="box2">
            <img src="${urlGifo}" atl="gif resultado" class="gif_trend">
            <div class="icon_img">
            <button class="boton_card favorito2">
            <input type="hidden"value="${urlGifo}"> 
            <img src="./assets/icon-fav.svg" alt="corazon">
            </button>
            <button class="boton_card descargar2">
            <input type="hidden"value="${urlGifo}"> 
            <img src="./assets/icon-download.svg" alt="descargar">
            </button>
            <button class="boton_card max2" id="max_${gifo.id}">
            <input type="hidden"value="${gifo.images.original.url}"> 
            <img src="./assets/icon-max-normal.svg" alt="max">
            </button>
        <div class="texto">
        <p>${gifo.username}</p>
        <h5>${gifo.title}</h5>
        </div>
        </div>
            </div>`;
        })
    })
    }) 
    }
    const max2 = document.querySelectorAll(`.max2`);
        max2.forEach((elemento)=>{
            console.log(elemento);
            elemento.addEventListener("click", (e)=>{
                let eventoBtn = e.currentTarget;
                console.log(eventoBtn.querySelector("input").value);
            })
        })
    const descargar2 = document.querySelectorAll(`.descargar2`);
    descargar2.forEach((ele)=>{
        ele.addEventListener("click",(e)=>{
            let btnEvento = e.currentTarget;
            let inputElemento = btnEvento.querySelector("input").value;
            getImage(inputElemento);
        } )
    })
})
} 
pintarResultados();
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
export default {}