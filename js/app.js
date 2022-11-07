//variables

const nombrePerson = document.querySelector("#nombre");
const apellidoPerson = document.querySelector("#apellido");
const emailPerson = document.querySelector("#email");
const contraPerson = document.querySelector("#contraseña");
const formulario = document.querySelector("#form");

//eventos
nombrePerson.addEventListener("blur", validar);
apellidoPerson.addEventListener("blur", validar);
emailPerson.addEventListener("blur", validar);
contraPerson.addEventListener("blur", validar);
formulario.addEventListener("submit", enviarFormulario);



//validar campos
function validar(e){
    //validando campo
    if(e.target.value.trim() === ""){
        alertaError(`El campo: ${e.target.id} es obligatorio`, e.target.parentElement);
        return
    }

    if(e.target.id ===  'email' && !validarEmail(e.target.value)){
        alertaError("Parece que esto no es un correo electrónico name@host.tld.", e.target.parentElement)
        return;
    }

    LimpiarAlert(e.target.parentElement)
}

//validar email con expresion regular
function validarEmail(email){
    const mail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    const resultado = mail.test(email)
    return resultado
}

//mostrar alerta cuando no existen registros
function alertaError(mensaje, agregar){
    LimpiarAlert(agregar);
    const elemento = document.createElement("P");
    elemento.textContent = mensaje;
    elemento.classList.add('error');
    agregar.appendChild(elemento)   
}

function LimpiarAlert(limpiar){
    const alerta = limpiar.querySelector(".error");
    if(alerta){
        alerta.remove();
    }
}


//enviar form
function enviarFormulario(e){
    e.preventDefault();

    if(nombrePerson.value !== "" && apellidoPerson.value !== "" && emailPerson
    .value !== "" && contraPerson.value !== ""){
    //antes de actualizaar lo leo las personas anteriores
    let personas = JSON.parse(localStorage.getItem('personas')) || [];

    let nuevaPersona = [{
        nombre: e.target.nombre.value,
        apellido: e.target.apellido.value,
        email: e.target.email.value,
        contrasena: e.target.contrasena.value
    }]
    personas.push(nuevaPersona);
    formulario.reset();

    localStorage.setItem('personas', JSON.stringify(personas))
    console.log(localStorage);
    }else if(nombrePerson.value === "" || apellidoPerson.value === "" || emailPerson.value === "" || contraPerson.value === ""){
        alertaGlobal("Todos los campos son obligatorios")
    }
}

//si campos vacíos
function alertaGlobal(mensajeAlerta){
    const mensajeA = document.createElement("P")
    mensajeA.classList.add("camposObligatorios")
    mensajeA.textContent = mensajeAlerta
    formulario.appendChild(mensajeA)

    setTimeout(() => {
        mensajeA.remove();
    }, 2000);
}   


