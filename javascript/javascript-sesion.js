const descripcion = document.getElementById("descripcion");
const operaciones = document.getElementById("operaciones");
const monto =document.getElementById("monto");
let input = document.getElementById("operaciones-cliente")
let aceptar = document.getElementById("operacion-a-realizar");
let alertError = document.getElementById("alert-msg");
let alertSuccess = document.getElementById("alert-sucess");
let movimientos=[
  {
    fecha:'fecha',
    operacion:'movimiento',
    monto: 'monto',
    saldoAnterior: 'saldo anterior',
    nuevoSaldo: 'Nuevo saldo'
  }
];
function valideKey(evt){
    if((input.value[0]==0)){
      input.value="";
    }    
}
function bienvenida(){
    document.getElementById("bienvenido").innerHTML=localStorage.getItem("name")
    setTimeout(function(){
        document.getElementById("recordatorio").style.display= "none";
    }, 1500);
}
function consultarSaldo(){
    if(aceptar.style.display =="block"){
        aceptar.style.display ="none";
        input.style.display="none";
        monto.style.display="block";
    }
    message("su saldo es:");
    monto.style.display="block"
    monto.innerHTML= `${"$"}`+localStorage.getItem('monto');
    operaciones.style.border ="3px dashed #fff";
}
function ingresarMonto(){
    activarOperaciones();
    message("Digite el monto a <strong>ingresar</strong> a su cuenta")
    localStorage.setItem('operacion','I')
}
function retirarMonto(){
    activarOperaciones();
    message("digite el monto a <strong>retirar</strong> de su cuenta")
    localStorage.setItem('operacion','R')
}
function message(detalle){
    descripcion.innerHTML = detalle;
}
function activarOperaciones(){
    monto.style.display ="none";
    descripcion.innerHTML = ""
    input.style.display ="block";
    aceptar.style.display="block";
    operaciones.style.border ="3px dashed #fff";
}
function realizarOperacion(){
    if((input.value.length) >= 1){
      let operacion = localStorage.getItem('operacion');
      let nuevoMonto;
      let montoStorage = Number(localStorage.getItem('monto'));
      let valor = Number(input.value);
      var today = new Date();
      switch(operacion){
        case "I":
          if((montoStorage+valor) > 990){
            alertError.style.display="flex";
            mostrarAlertError("Operaci&oacute;n rechazada, el monto m&aacute;ximo es de $990");
          }else{
            nuevoMonto=montoStorage+valor;
            movimientos.push({
              fecha:today.toLocaleString(),
              operacion:'Ingreso',
              monto: `$`+valor,
              saldoAnterior:`$`+montoStorage,
              nuevoSaldo: `$`+nuevoMonto
            })
            localStorage.setItem('monto',nuevoMonto);
            alertSuccess.style.display="flex";
            document.getElementById("text-alert-sucees").innerHTML="Operaci&oacute;n exitosa";
            aceptar.style.display="none";       
          }
        break;
        case "R":
          if(montoStorage < valor){
            mostrarAlertError("Lo sentimos, no cuentas con los fondos suficientes");
          }else if((montoStorage-valor) < 10 ){
            mostrarAlertError("Operaci&oacute;n rechazada, el monto m&iacute;nimo  es de $10");
          }else{
            nuevoMonto=montoStorage-valor;
            movimientos.push({
              fecha:today.toLocaleString(),
              operacion:'Retiro',
              monto: `$`+valor,
              saldoAnterior:`$`+montoStorage,
              nuevoSaldo: `$`+nuevoMonto
            })
            localStorage.setItem('monto',nuevoMonto);
            alertSuccess.style.display="flex";
            document.getElementById("text-alert-sucees").innerHTML="Operaci&oacute;n exitosa"; 
            aceptar.style.display="none";
          }
        break;
      }
    }else{
      mostrarAlertError("EL campo no puede estar vac&iacute;o")  
    }
    timeout = setTimeout(alertMensaje, 2500);
  }
  function mostrarAlertError(text){
      alertError.style.display="flex";
      document.getElementById("text-alert").innerHTML= text;
  }
  function alertMensaje() {
    if(alertSuccess.style.display=="flex"){
      alertSuccess.style.display="none";
      input.style.display="none";
      input.value="";
      consultarSaldo()
    }else if(alertError.style.display=="flex"){
      alertError.style.display="none";
    }
    input.value="";
}
function cerrarSesion(){
    document.getElementById("row-operaciones").style.display="none";
    document.getElementById("bienvenido").style.display="none";
    document.getElementById("text-landing").innerText=localStorage.getItem("name")+" recuerda que el mejor momento del día es el ahora ";
    setTimeout(function(){
      localStorage.clear();
      window.location.assign("index.html")
    }, 3000);
}
function consultarMovimientos(){
  document.getElementById("consultarsaldo").style.display="flex"
  document.getElementById("btnconsultarsaldo").style.display="flex"
  document.getElementById("buttons").style.display="none"
  document.getElementById("operaciones").style.display="none"
  document.querySelectorAll(".p-movimientos").forEach(el => el.remove());
    movimientos.forEach((index) => {
      let fechamov=document.getElementById("fechamov")
      let tipomov=document.getElementById("tipomov")
      let monto=document.getElementById("montoinput")
      let saldoanterior=document.getElementById("saldoanterior")
      let nuevosaldo=document.getElementById("nuevosaldo")

      const fecha = document.createElement("p");
      const operacionRealizada = document.createElement("p");
      const montoOperacion = document.createElement("p");
      const nvSaldo = document.createElement("p");
      const saldoAnterior = document.createElement("p");

      fecha.innerText = index.fecha;
      fecha.className = "p-movimientos";
      operacionRealizada.innerText = index.operacion;
      operacionRealizada.className = "p-movimientos";
      montoOperacion.innerText = index.monto;
      montoOperacion.className = "p-movimientos";
      nvSaldo.innerText = index.nuevoSaldo;
      nvSaldo.className = "p-movimientos";
      saldoAnterior.innerText = index.saldoAnterior;
      saldoAnterior.className = "p-movimientos";

      fechamov.appendChild(fecha);
      tipomov.appendChild(operacionRealizada);
      monto.appendChild(montoOperacion);
      nuevosaldo.appendChild(saldoAnterior);
      saldoanterior.appendChild(nvSaldo);
    })
}

function regresar(){
  document.getElementById("consultarsaldo").style.display="none"
  document.getElementById("btnconsultarsaldo").style.display="none"
  document.getElementById("buttons").style.display="block"
  document.getElementById("operaciones").style.display="block"
}
  