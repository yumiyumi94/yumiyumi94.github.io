const apiKey = "xG8nagUIVFogPgw2nuvPUk503UMh6eDx";
const seccPalabras = document.querySelector(".palabrasTrending");
const limit = 12;
const seccResult = document.querySelector(".result_p_trend");
const tituloSecc = document.querySelector("#titulo_p_trend");
const btnVerMas = document.querySelector(".ver_mas");
let numC = 0;

async function palabrasTrending (){
    const fetchPalabras = await fetch(`https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`)
    const dataFetchaPalabra = await fetchPalabras.json();
    const palabrasTrend = dataFetchaPalabra.data;
    for (let index = 0; index < 4; index++) {
        let palabra = palabrasTrend[index];
        seccPalabras.innerHTML += `<a class="palabraTrendi">${palabra}</a>, `;
    }
    let aPalabras = document.querySelectorAll(".palabraTrendi");
    for (const aPalabra of aPalabras) {
        aPalabra.addEventListener("click", (e)=>{
            fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${aPalabra.textContent}&limit=${limit}`)
    .then((response)=>{
        return response.json();
    }).then((respuesta)=>{
        const dataResp = respuesta.data;
        tituloSecc.innerHTML = `${aPalabra.textContent}`
        dataResp.forEach(dato => {
            seccResult.innerHTML += `<div class="box2">
            <img src="${dato.images.downsized_medium.url}" atl="gif resultado" class="gif_trend">
            <div class="icon_img">
            <button class="boton_card favorito2" id="favorito">
            <input type="hidden"value="${dato.images.downsized_medium.url}">
            <img src="./assets/icon-fav.svg" alt="corazon">
            </button>
            <button class="boton_card descargar2" id="descargar">
            <input type="hidden"value="${dato.images.downsized_medium.url}">
            <img src="./assets/icon-download.svg" alt="descargar">
            </button>
            <button class="boton_card max2" id="max_${dato.id}">
            <img src="./assets/icon-max-normal.svg" alt="max">
            </button>
        <div class="texto">
        <p>${dato}</p>
        <h5>${dato.title}</h5>
        </div>
        </div>
            </div>`
        });
        btnVerMas.classList.toggle("visible");
        btnVerMas.addEventListener("click", (e)=>{
            numC += 1;
            let thisOffset = numC*12;
            fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${aPalabra.textContent}&limit=${limit}&offset=${thisOffset}`)
    .then((response)=>{
        return response.json();
    })
    .then((result)=>{
        const dataResp = respuesta.data;
        tituloSecc.innerHTML = `${aPalabra.textContent}`
        dataResp.forEach(dato=>{
            seccResult.innerHTML += `<div class="box2">
            <img src="${dato.images.downsized_medium.url}" atl="gif resultado" class="gif_trend">
            <div class="icon_img">
            <button class="boton_card favorito2" id="favorito">
            <input type="hidden"value="${dato.images.downsized_medium.url}">
            <img src="./assets/icon-fav.svg" alt="corazon">
            </button>
            <button class="boton_card descargar2" id="descargar">
            <input type="hidden"value="${dato.images.downsized_medium.url}">
            <img src="./assets/icon-download.svg" alt="descargar">
            </button>
            <button class="boton_card max2" id="max_${dato.id}">
            <img src="./assets/icon-max-normal.svg" alt="max">
            </button>
        <div class="texto">
        <p>${dato}</p>
        <h5>${dato.title}</h5>
        </div>
        </div>
            </div>`
        })
    })
        })
    })
})
}
}
palabrasTrending();

export default {}