const alert = document.getElementById("alert-msg");
const email= document.getElementById("inputEmail");
const pass= document.getElementById("inputPassword");
const sesion=localStorage.getItem("sesion")
let pAlert= document.getElementById("text-alert");
var usuarios =[
    {
        username:'mario.parra@gmail.com',
        pass:'parraM67',
        name:' Mario Parra',
        saldo: '300'
    },
    {
        username:'eve123@yahoo.com',
        pass:'eveLop45',
        name:'Eve Zazueta',
        saldo: '100'
    },
    {
        username:'pinedo32@hotmail.com',
        pass:'Pinedo54',
        name:'Ernesto Pinedo',
        saldo: '180'
    }
]
if(sesion=="activa"){
    window.location.assign("sesion.html")
}else{
    function activarAlert(message){
        alert.style.display= "block";
        pAlert.innerHTML= message;
        setTimeout(function(){
            alert.style.display= "none";
        }, 3000); 
    }
    function validarCampos(){
        if(email.value == ''){
        activarAlert("Por favor ingrese un correo electr&oacute;nico")
        }else if(!/^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(email.value)){
            activarAlert("Por favor ingrese un correo electr&oacute;nico v&aacute;lido")
        }else if(pass.value == ''){
            activarAlert("Por favor ingrese una contraseña")
        }else if(pass.value.length < 8){
            activarAlert("La contraseña debe ser mayor a 8 d&iacute;gitos")
        }else{
            alert.style.display= "none"; 
            inicioSesion();
        }
    }
    function inicioSesion(){
        console.log("validando informaci&oacute;n");
        for(var i="0"; i < usuarios.length; i++){
            if (usuarios[i].username == email.value){
                if(usuarios[i].pass == pass.value){
                    localStorage.setItem("sesion","activa")
                    localStorage.setItem("name",usuarios[i].name)
                    localStorage.setItem("monto",usuarios[i].saldo)
                    window.location.assign("sesion.html") 
                }
            }
        }
        if((localStorage.getItem("sesion")) == 'activa'){
            console.log("iniciando sesion")
        }else {
            activarAlert("La contraseña o el correo son incorrectos")
        }
    }
}