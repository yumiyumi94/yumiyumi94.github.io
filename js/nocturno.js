const modoNocturno = document.querySelector("#nocturno");

const lupa = document.querySelector("#lupa");
const burger = document.querySelector("#burger");
const cierre = document.querySelector(".cierre");
const crearGIFOS = document.querySelector(".crearGIFOS");
const flechaIzq = document.querySelector(".flechaIzq");
const flechaDer = document.querySelector(".flechaDer");

modoNocturno.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
    modoNocturno.classList.toggle("active");

//Guardar modo nocturno en localstorage
    if(document.body.classList.contains("dark")){
        localStorage.setItem("dark-mode", "true");
        modoNocturno.innerHTML = "Modo Diurno";
        document.querySelector(".logo_nocturno").innerHTML = `<img src="./assets/logo-mobile-modo-noct.svg" alt="logo gifos" class="logo">`;
        lupa.src = `./assets/icon-search-modo-noct.svg`;
        burger.src = "./assets/burger-modo-noct.svg";
        cierre.src = "./assets/close-modo-noct.svg";
        crearGIFOS.src ="./assets/CTA-crar-gifo-modo-noc.svg";
        flechaIzq.src = "./assets/button-slider-left-md-noct.svg";
        flechaDer.src = "./assets/Button-Slider-right-md-noct.svg";
    }else{
        localStorage.setItem("dark-mode", "false");
        modoNocturno.innerHTML = "Modo Nocturno";
        document.querySelector(".logo_nocturno").innerHTML = `<img src="./assets/logo-mobile.svg" alt="logo gifos" class="logo">`;
        lupa.src = `./assets/icon-search.svg`;
        burger.src = "./assets/burger.svg";
        cierre.src = "./assets/close.svg";
        crearGIFOS.src ="./assets/button-crear-gifo.svg";
        flechaIzq.src = "./assets/button-slider-left.svg";
        flechaDer.src = "./assets/Button-Slider-right.svg";
    }
})

//obtener el modo actual
if(localStorage.getItem("dark-mode")=== "true"){
    document.body.classList.add("dark");
}else{
    document.body.classList.remove("dark");
}

export default {}