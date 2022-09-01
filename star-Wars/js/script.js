class newCharacter {
    constructor() {
        this.nuevoPersonaje=[];
        this.personajesAceptados=[];
    }
    agregarAlistaDeEspera(name, gender,height,eye_color,img){
        this.name=name;
        this.gender=gender;
        this.height=height;
        this.eye_color=eye_color;
        this.img=img;
        this.nuevoPersonaje.push({'name':this.name,'gender':this.gender,'height':this.height,'eye_color':this.eye_color,'img':this.img});
    }
    aceptarPersonaje(){
        if(localStorage.getItem("perAceptados")){
            this.personajesAceptados=JSON.parse(localStorage.getItem("perAceptados"));
        }
        this.personajesAceptados.push(agregarPersonaje.nuevoPersonaje[0]);
        localStorage.setItem('perAceptados',JSON. stringify(this.personajesAceptados));
        this.nuevoPersonaje.shift();
        container.innerHTML = '';
    }
    rechazarPersonaje(){
        this.nuevoPersonaje.shift();
        container.innerHTML = `
        <div class="card" style="width: 18rem;margin:auto;">
            <div class="card-body">
                <p>
                      <span style="color: red">Personaje rechazado</span><br /><br />
                </p>
                <p id="add"></p>
            </div>
        </div>
        `
    }
}
let agregarPersonaje = new newCharacter;
let characters = JSON.parse(file).results
let input_character_name = document.getElementById("input_character_name")
let container = document.getElementById("divContainerCard")


function search_character_button_click() { //muestra la info de cada peronsaje
    let character_details = search_character(input_character_name.value)
    if(input_character_name.value!=''){
        if(character_details){
            container.innerHTML = `
            <div class="card" style="width: 18rem;margin:auto;">
                <img class="card-img-top" src="${character_details.img}" alt="Card image cap">
                <div class="card-body">
                    <p>
                        <span style="color: red">Nombre: ${character_details.name}</span><br />
                        <span>Género: ${character_details.gender}</span><br />
                        <span>Altura: ${character_details.height}</span><br />
                        <span>Color de ojos: ${character_details.eye_color}</span>
                    </p>
                </div>
            </div>
            `
        }else {
            let personaje = () => {
                let Aceptados= JSON.parse(localStorage.getItem("perAceptados"))
                if(Aceptados){
                    for(let i = 0; i<Aceptados.length;i++) {
                        if(Aceptados[i].name == input_character_name.value) {
                            container.innerHTML = `
                            <div class="card" style="width: 18rem;margin:auto;">
                                <img class="card-img-top" src="${Aceptados[i].img}" alt="Card image cap">
                                <div class="card-body">
                                    <p>
                                        <span style="color: red">Nombre: ${Aceptados[i].name}</span><br />
                                        <span>Género: ${Aceptados[i].gender}</span><br />
                                        <span>Altura: ${Aceptados[i].height}</span><br />
                                        <span>Color de ojos: ${Aceptados[i].eye_color}</span>
                                    </p>
                                </div>
                            </div>
                            `
                            return Aceptados[i]
                        }
                    }
                }else{
                    container.innerHTML = `
                    <div class="card" style="width: 18rem;margin:auto;">
                    <div class="card-body">
                        <p id="errormsg">
                            <span style="color: red">Lo sentimos, personaje no encontrado</span><br /><br />
                            <button type="button" class="btn btn-outline-info" onclick="infoCharacter()">Agregar nuevo personaje</button><br />
                        </p>
                        <p id="add"></p>
                    </div>
                </div>
                    `
                }

            }
            let nuevaLista=personaje()
            if(nuevaLista){
                console.log('nuevo personaje')
            }else{
                container.innerHTML = `
                <div class="card" style="width: 18rem;margin:auto;">
                <div class="card-body">
                    <p id="errormsg">
                        <span style="color: red">Lo sentimos, personaje no encontrado</span><br /><br />
                        <button type="button" class="btn btn-outline-info" onclick="infoCharacter()">Agregar nuevo personaje</button><br />
                    </p>
                    <p id="add"></p>
                </div>
            </div>
            `
            }
        }      
    }
}
function search_character(character_name) {//Valida si existen los perosnajes
    for(let i = 0; i<characters.length;i++) {
        if(characters[i].name == character_name) {
             return characters[i]
        }
    }
}

function infoCharacter(){// Formulario para nuevos personajes
    document.getElementById("errormsg").style.display='none';
    let buttonAdd = document.getElementById("add")
    buttonAdd.innerHTML = `
        <form>
            <span style="color:blue;font-weight: bold;">Agrega a tu personaje Favorito ;)</span><br/><br/>
            <span>Nombre:<input type="text" required id="nombre" class="form-control" placeholder="nombre" aria-label="Username" aria-describedby="basic-addon1"> </span><br/>
            <span>Sexo:</span>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked value="Masculino">
                <label class="form-check-label" for="flexRadioDefault1">Masculino</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Fememino" >
                <label class="form-check-label" for="flexRadioDefault2">Fememino</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="N/A">
                <label class="form-check-label" for="flexRadioDefault2" > N/A</label>
            </div>
            <span>Altura:<input id="altura"  required type="text" class="form-control" placeholder="altura"></span><br />
            <span>Color de ojos:<input type="text" required id="colorOjos" class="form-control" placeholder="Color de ojos" aria-label="Color de ojos" aria-describedby="basic-addon1"></span><br/>
            <span>url imagen:<input id="urlImg" type="text" class="form-control" placeholder="url de la imagen"></span><br />
            <button type="button" class="btn btn-outline-info" onclick="addNewCharacter()">Agregar</button><br />
        </form>
    `
}

function addNewCharacter(){ //Agrega nuevos personajes a la lista de espera
    let nombre=document.getElementById("nombre").value;
    let genero = document.querySelector('input[name=flexRadioDefault]:checked').value;
    let altura=document.getElementById("altura").value;
    let colorOjos=document.getElementById("colorOjos").value;
    let urlImg=document.getElementById("urlImg").value;
    if(nombre == '' || altura ==''){
        alert('Completa el formulario');
    }else{
        agregarPersonaje.agregarAlistaDeEspera(nombre,altura,genero,colorOjos,urlImg); 
        container.innerHTML = `
        <div class="card" style="width: 18rem;margin:auto;">
            <div class="card-body">
                <p id="errormsg">
                    <span style="color:#0dcaf0">Personaje en revisión, recuerda que el periodo de aceptación es de 2 días</span><br /><br />
                    <button type="button" class="btn btn-outline-info" onclick="infoCharacter()">Agregar nuevo personaje</button><br />
                </p>
                <p id="add"></p>
            </div>
        </div>
        `
    }
}
function validarPersonajes(){ // valida personajes es espera de ser aceptados
    if(agregarPersonaje.nuevoPersonaje.length!=0){
        container.innerHTML = `
        <div class="card" style="width: 18rem;margin:auto;">
            <img class="card-img-top" src="${agregarPersonaje.nuevoPersonaje[0].img}" alt="Card image cap">
            <div class="card-body">
                <p>
                    <span">Nombre: ${agregarPersonaje.nuevoPersonaje[0].name}</span><br />
                    <span>Género: ${agregarPersonaje.nuevoPersonaje[0].gender}</span><br />
                    <span>Altura: ${agregarPersonaje.nuevoPersonaje[0].height}</span><br />
                    <span>Color de ojos: ${agregarPersonaje.nuevoPersonaje[0].eye_color}</span>
                    <button type="button" class="btn btn-outline-info" onclick="agregarPersonaje.aceptarPersonaje()">Aceptar personaje</button><br />
                    <button type="button" class="btn btn-outline-info" onclick="agregarPersonaje.rechazarPersonaje()">Rechazar personaje</button><br />
                </p>
            </div>
        </div>
        `
    }else{
        container.innerHTML = `
        <div class="card" style="width: 18rem;margin:auto;">
            <div class="card-body">
                <p>
                    <span" style="color:red;">No hay personajes por validar</span><br />
                </p>
            </div>
        </div>
        `
    }
}