const usuario = document.getElementById("usuario")
const contraseña = document.getElementById("contraseña");
const form = document.getElementById("form");
const advertencia = document.getElementById("advertencias");
let usuarios;


form.addEventListener("submit", e => {
    e.preventDefault();

    let advertencias = "";
    let ingresar = false;   

    advertencia.innerHTML = "";

    if(usuario.value.length < 1) {
        advertencias += `Ingresa un nombre de usuario <br>`;
        ingresar = true;
    }

    if (contraseña.value == "root") {
        stop;
    } else {
        if(contraseña.value.length < 8) {
            advertencias += `Ingresa una contraseña valida <br>`;
            ingresar = true;
        }
    }

    if(ingresar) {
        advertencia.innerHTML = advertencias;
    }
})

fetch ("usuarios.json").then(response => {
    return response.json();
}).then (function (jsondata) {
    usuarios = jsondata;
})

function validarInicio() {
    let validado = false;
    
    for (let i = 0; i < usuarios.length; i++) {
        
        if (document.getElementById("usuario").value == usuarios[i].usuario && document.getElementById("contraseña").value == usuarios[i].contraseña) {
            validado = true;
            window.location = "../home/home.html";
        }
    }
    if (validado == false){
        var mensajeError = document.createElement("h1");
        mensajeError.className = "bad";
        var contenido = document.createTextNode("La cuenta especificada no existe");
        mensajeError.appendChild(contenido);

        var contenedor = document.getElementById("container");

        document.body.insertBefore(mensajeError, contenedor);

        document.getElementById("usuario").value = "";
        document.getElementById("contraseña").value = "";
    }
        
}

