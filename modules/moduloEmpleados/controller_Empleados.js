let indexEmpleadoSeleccionado;
let empleados = [];

function loadTabla() {
    let contenido = "";
    empleados.forEach(function (empleado) {
        let registro =
                '<tr onclick="selectEmpleado(' + empleados.indexOf(empleado) + ');">' +
                    '<td>' + empleado.NUE + '</td>' +
                    '<td>' + empleado.Nombre + '</td>' +
                    '<td>' + empleado.ApellidoPat + '</td>' +
                    '<td>' + empleado.ApellidoMat + '</td>' +
                    '<td>' + empleado.Genero + '</td>' +
                    '<td>' + empleado.RFC + '</td>' +
                    '<td>' + empleado.NumeroMovil + '</td>' +
                    '<td>' + empleado.NumeroCasa + '</td>' +
                    '<td>' + empleado.CorreoElectronico + '</td>' +
                    '<td>' + empleado.Usuario + '</td>' +
                    '<td>' + empleado.Contraseña + '</td>' +
                    '<td>' + empleado.Estatus + '</td></tr>';
            contenido += registro;
    });
    document.getElementById("tblEmpleados").innerHTML = contenido;
}

fetch ("data_Empleados.json")
        .then(response => {
            return response.json();
})
        .then(function(jsondata) {
            empleados = jsondata;
            loadTabla();
});

function selectEmpleado(index) {
    document.getElementById("txtNUE").value = empleados[index].NUE;
    document.getElementById("txtNombre").value = empleados[index].Nombre;
    document.getElementById("txtApellidoPat").value = empleados[index].ApellidoPat;
    document.getElementById("txtApellidoMat").value = empleados[index].ApellidoMat;
    document.getElementById("txtGenero").value = empleados[index].Genero;
    document.getElementById("txtRFC").value = empleados[index].RFC;
    document.getElementById("txtTelefonoMov").value = empleados[index].NumeroMovil;
    document.getElementById("txtTelefonoCasa").value = empleados[index].NumeroCasa;
    document.getElementById("txtCorreo").value = empleados[index].CorreoElectronico;
    document.getElementById("txtUsuario").value = empleados[index].Usuario;
    document.getElementById("txtContrasennia").value = empleados[index].Contraseña;
    document.getElementById("txtEstatus").value = empleados[index].Estatus;
    document.getElementById("btnAdd").classList.add("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnUpdate").classList.remove("disabled");
    indexEmpleadoSeleccionado = index;
}

function cleanEmpleado() {
    document.getElementById("txtNUE").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellidoPat").value = "";
    document.getElementById("txtApellidoMat").value = "";
    document.getElementById("txtGenero").value = "";
    document.getElementById("txtRFC").value = "";
    document.getElementById("txtTelefonoMov").value = "";
    document.getElementById("txtTelefonoCasa").value = "";
    document.getElementById("txtCorreo").value = "";
    document.getElementById("txtUsuario").value = "";
    document.getElementById("txtContrasennia").value = "";
    document.getElementById("txtEstatus").value = "";
    document.getElementById("btnAdd").classList.remove("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnUpdate").classList.add("disabled");

}

function addEmpleado() {
    const send = submitEmpleado();

    if (send) {
        let nCont, apCont, amCont, NUE, nombre, apellidoPat, apellidoMat, genero, RFC, telefonoMov, telefonoCasa, correo, usuario, contrasennia, estatus, subApMat;
        let lengthName, lengthAPM;
        nombre = document.getElementById("txtNombre").value;
        apellidoPat = document.getElementById("txtApellidoPat").value;
        apellidoMat = document.getElementById("txtApellidoMat").value;
        genero = document.getElementById("txtGenero").value;
        RFC = document.getElementById("txtRFC").value;
        telefonoMov = document.getElementById("txtTelefonoMov").value;
        telefonoCasa = document.getElementById("txtTelefonoCasa").value;
        correo = document.getElementById("txtCorreo").value;
        estatus = "Activo";
        
        lengthName = nombre.length;
        lengthAPM = apellidoMat.length;

        if (apellidoMat === "") {
            subApMat = "X";
            amCont = "X"
        } else {
            subApMat =  apellidoMat.substring(0,1);
            amCont =  apellidoMat.substring((lengthAPM - 2), lengthAPM);
        }

        NUE = apellidoPat.substring(0,2).toUpperCase() + subApMat.toUpperCase() + Math.floor(Math.random() * 200);

        nCont = nombre.substring((lengthName - 2), lengthName);
        apCont = apellidoPat.substring(0,2);

        usuario = nombre + " " + apellidoPat;
        contrasennia = nCont.toUpperCase() + apCont.toUpperCase() + amCont.toUpperCase() + Math.floor(Math.random() * 99);

        var empleado = {
            "NUE": NUE,
            "Nombre": nombre,
            "ApellidoPat": apellidoPat,
            "ApellidoMat": apellidoMat,
            "Genero": genero,
            "RFC": RFC,
            "NumeroMovil": telefonoMov,
            "NumeroCasa": telefonoCasa,
            "CorreoElectronico": correo,
            "Usuario": usuario,
            "Contraseña": contrasennia,
            "Estatus": estatus
        };
        
        empleados.push(empleado);
        cleanEmpleado();
        loadTabla();
    }
}

document.getElementById("confirmarDelete").addEventListener("click", deleteEmpleado);

function deleteEmpleado() {
    if (indexEmpleadoSeleccionado != null) {
        empleados[indexEmpleadoSeleccionado].Estatus = "Inactivo";
        document.getElementById("btnUpdate").classList.add("disabled");
        document.getElementById("btnDelete").classList.add("disabled");
        loadTabla();
        cleanEmpleado();
    }
}

function updateEmpleado() {
    const send = submitEmpleado();

    if (send) {
        let NUE, nombre, apellidoPat, apellidoMat, genero, RFC, telefonoMov, telefonoCasa, correo, usuario, contrasennia, estatus;
    
        NUE = document.getElementById("txtNUE").value;
        nombre = document.getElementById("txtNombre").value;
        apellidoPat = document.getElementById("txtApellidoPat").value;
        apellidoMat = document.getElementById("txtApellidoMat").value;
        genero = document.getElementById("txtGenero").value;
        RFC = document.getElementById("txtRFC").value;
        telefonoMov = document.getElementById("txtTelefonoMov").value;
        telefonoCasa = document.getElementById("txtTelefonoCasa").value;
        correo = document.getElementById("txtCorreo").value;
        usuario = document.getElementById("txtUsuario").value;
        contrasennia = document.getElementById("txtContrasennia").value;
        estatus = "Activo";
    
        var empleado = {
            "NUE": NUE,
            "Nombre": nombre,
            "ApellidoPat": apellidoPat,
            "ApellidoMat": apellidoMat,
            "Genero": genero,
            "RFC": RFC,
            "NumeroMovil": telefonoMov,
            "NumeroCasa": telefonoCasa,
            "CorreoElectronico": correo,
            "Usuario": usuario,
            "Contraseña": contrasennia,
            "Estatus": estatus
        };
        
        empleados[indexEmpleadoSeleccionado] = empleado;
        loadTabla();
        cleanEmpleado();
    }

}function submitEmpleado() {
    let nombre = document.getElementById("txtNombre");
    let apellidoPat = document.getElementById("txtApellidoPat");
    let genero = document.getElementById("txtGenero");
    let RFC = document.getElementById("txtRFC");
    let telefonoMov = document.getElementById("txtTelefonoMov");
    let correo = document.getElementById("txtCorreo");

    let regexEmail = /\S+@\S+\.\S+/

    var enviar = true;
 
    /* nombre */
    if (nombre.value == "" || nombre.value == null) {
        alert("Introducir un nombre");
        enviar = false;
    }

    /* apellido paterno */
    if (apellidoPat.value == "" || apellidoPat.value == null) {
        alert("Introducir apellido paterno. OBLIGATORIO");
        enviar = false;
    }

    /* genero */
    if (genero.value == "" || genero.value == null || genero.value == "Escoge una opción") {
        alert("Selecciona un genero de la lista");
        enviar = false;
    }

    /* rfc */
    if (RFC.value == "" || RFC.value == null) {
        alert("Ingresar el RFC");
        enviar = false;
    }

    /* telefono movil */
    if (telefonoMov.value == "" || telefonoMov.value == null) {
        alert("Ingresar un número de telefono movil");
        enviar = false;
    }

    /* correo */
    if (correo.value == "" || correo.value == null) {
        alert("Ingresar un correo eletronico");
        enviar = false;
    } else if (!regexEmail.test(correo.value)) {
        alert("Ingresar un correo electonico valido");
        enviar = false;
    }

    if (enviar) { 
        alert ("Los datos fueron añadidos correctamente");
    }
    return enviar;
}