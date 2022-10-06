const uri='https://fedeperin-harry-potter-api.herokuapp.com/'
const urlCasas="https://hp-api.herokuapp.com/api/characters"

//obtiene todos los personajes de la api
let getPersonajesPrincipales=(tipo)=>{
    fetch(`${uri}${tipo}`)
   .then((res) => res.json())
   .then((data) => {
        data.forEach(index =>{
            let template = document.querySelector("#personajes-template").content;
            let clone = template.cloneNode(true);
            let contenedor = document.querySelector("#personajes");
            clone.querySelector(".img-fluid").setAttribute("src", index.imagen);
            clone.querySelector(".dot").innerText = index.personaje;
            contenedor.appendChild(clone);
            clickHechizos();
        });
    })
    .catch((e) => console.log(e))
}

//funcion obtiene todos los hechizos de la api
let getHechizos=(tipo)=>{
    fetch(`${uri}${tipo}`)
    .then((res) => res.json())
    .then((data) => {
        data.forEach(index =>{
            let template = document.querySelector("#hechizos-template").content;
            let clone = template.cloneNode(true);
            let contenedor = document.querySelector("#hechizos");
            clone.querySelector(".click").setAttribute("id", index.hechizo);
            clone.querySelector(".icon").setAttribute("id", index.hechizo);
            clone.querySelector(".bi-brush").setAttribute("id", index.hechizo);
            clone.querySelector(".p-name").innerText = index.hechizo;
            clone.querySelector(".uso").setAttribute("id", `uso${index.hechizo}`);
            contenedor.appendChild(clone);
        });
        clickHechizos();
    })
    .catch((e) => console.log(e))
}
//activa evento listenner para cuando se le de click a un hechizo
let clickHechizos=()=>{
    document.querySelectorAll(".click").forEach(el => {
        el.addEventListener("click", e => {
            const id = e.target.getAttribute("id");
            mostrarUso(id,"hechizos")
        });
    });
}
//muestra el uso que tiene cada hechizo al darl click sobre el
let mostrarUso=(nombreHechizo, tipo)=>{
    fetch(`${uri}${tipo}`)
    .then((res) => res.json())
    .then((data) => {
        data.forEach(index =>{
            if(index.hechizo == nombreHechizo){
                document.getElementById(`uso${index.hechizo}`).innerHTML= index.uso
            }
        });
    })
    .catch((e) => console.log(e))
}


//funcion obtiene todos los libros de la api
let getLibros=(tipo)=>{
    fetch(`${uri}${tipo}`)
    .then((res) => res.json())
    .then((data) => {
        data.forEach(index =>{
            let template = document.querySelector("#libros-template").content;
            let clone = template.cloneNode(true);
            let contenedor = document.querySelector("#row-libros");
            clone.querySelector(".librosimg").setAttribute("src", `assets/img/librosPortada/libro${index.id}.jpg`);
            clone.querySelector(".libroNombre").innerText = index.libro;
            clone.querySelector(".autora").innerText = `${index.autora} - ${index.fecha_de_lanzamiento}`;
            clone.querySelector(".descripcion").innerText = index.descripcion;
            contenedor.appendChild(clone);
        });
        clickHechizos();
    })
    .catch((e) => console.log(e))
}


//obtiene información de la api de acuerdo al input del buscador
let getCasaPersonaje=()=>{
    let getPersonaje=document.getElementById("search").value;
    fetch(urlCasas)
    .then((res) => res.json())
    .then((data) => {
        let search=toUppercase(getPersonaje.toLowerCase())
        let casas= document.getElementsByClassName("divs-casas");
        var bandera = 0;
        casas ? [].forEach.call(document.querySelectorAll(".divs-casas"), function(regla){regla.parentNode.removeChild(regla);}) : console.log("no existe")
        for (var i=0; i < data.length; i++){
            if ((data[i].name).includes(search.join(" "))) { 
                let template = document.querySelector("#casas-template").content;
                let clone = template.cloneNode(true);
                let contenedor = document.querySelector("#casasAlumnos");
                clone.querySelector(".casas-personajes").setAttribute("class", "col-lg-3 col-md-6 d-flex align-items-stretch casas-personajes divs-casas");
                clone.querySelector(".img-fluid").setAttribute("src", data[i].image);
                data[i].house != ""? clone.querySelector(".dot").innerText = data[i].house  : clone.querySelector(".dot").innerText = "Desconocido";
                clone.querySelector(".s-casa").innerText =data[i].name;
                data[i].dateOfBirth != "" ? clone.querySelector(".birthday").innerText = `fecha de nacimiento: ${data[i].dateOfBirth}`: clone.querySelector(".birthday").innerText = `fecha de nacimiento: desconocido`;
                data[i].patronus !="" ? clone.querySelector(".patronus").innerText = `patronus: ${data[i].patronus}`:clone.querySelector(".patronus").innerText = `patronus: desconocido`;
                data[i].alive ? clone.querySelector(".alive").innerText = "Viv@" : clone.querySelector(".alive").innerText ="Murió";
                data[i].ancestry != "" ? clone.querySelector(".ancestry").innerText = `Ancestros: ${data[i].ancestry}` : clone.querySelector(".ancestry").innerText ="Ancestros: desconocidos";
                contenedor.appendChild(clone);
                bandera =1;
            }
        }
        if(bandera==0){
            let template = document.querySelector("#casas-template").content;
            let clone = template.cloneNode(true);
            let contenedor = document.querySelector("#casasAlumnos");
            clone.querySelector(".casas-personajes").setAttribute("class", "col-lg-3 col-md-6 d-flex align-items-stretch casas-personajes divs-casas");
            clone.querySelector(".dot").innerText = "Personaje no encontrado :(";
            contenedor.appendChild(clone);
        }
    })
}
//convierte la primera letra de cada palabra en mayuscula
let toUppercase=(getPersonaje)=>{
    const palabras = getPersonaje.split(" ");
    for (let i = 0; i < palabras.length; i++) {
        palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substr(1);
    }
    return palabras;
}

//llamado de las funciones de las apis
getPersonajesPrincipales("personajes");
getHechizos("hechizos");
getLibros("libros");