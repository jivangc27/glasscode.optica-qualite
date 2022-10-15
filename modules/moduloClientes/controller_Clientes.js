let indexClienteSeleccionado;
let clientes = [];

function loadTabla() {
    let contenido = "";
    clientes.forEach(function (cliente) {
        let registro = 
            '<tr onclick="selectCliente(' + clientes.indexOf(cliente) + ');">' +            
                '<td>' + cliente.NUC + '</td>' + 
                '<td>' + cliente.Nombre + '</td>' +
                '<td>' + cliente.ApellidoPat + '</td>' +
                '<td>' + cliente.ApellidoMat + '</td>' +
                '<td>' + cliente.Genero + '</td>' +
                '<td>' + cliente.RFC + '</td>' +
                '<td>' + cliente.NumeroMovil + '</td>' +
                '<td>' + cliente.NumeroCasa + '</td>' +
                '<td>' + cliente.CorreoElectronico + '</td>' +
                '<td>' + cliente.estatus + '</td></tr>';
        contenido += registro;        
    });
    document.getElementById("tblClientes").innerHTML = contenido;

}

fetch ("data_Clientes.json")
    .then(response => {
        return response.json();
})
    .then(function(jsondata) {
        clientes = jsondata;
        loadTabla();
});

function selectCliente(index) {
    document.getElementById("txtNUC").value = clientes[index].NUC;
    document.getElementById("txtNombre").value = clientes[index].Nombre;
    document.getElementById("txtApellidoPat").value = clientes[index].ApellidoPat;
    document.getElementById("txtApellidoMat").value = clientes[index].ApellidoMat;
    document.getElementById("txtGenero").value = clientes[index].Genero;
    document.getElementById("txtRFC").value = clientes[index].RFC;
    document.getElementById("txtTelefonoMov").value = clientes[index].NumeroMovil;
    document.getElementById("txtTelefonoCasa").value = clientes[index].NumeroCasa;
    document.getElementById("txtCorreo").value = clientes[index].CorreoElectronico;
    document.getElementById("btnAdd").classList.add("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnUpdate").classList.remove("disabled");
    indexClienteSeleccionado = index;
}

function cleanCliente() {
    document.getElementById("txtNUC").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellidoPat").value = "";
    document.getElementById("txtApellidoMat").value = "";
    document.getElementById("txtGenero").value = "";
    document.getElementById("txtRFC").value = "";
    document.getElementById("txtTelefonoMov").value = "";
    document.getElementById("txtTelefonoCasa").value = "";
    document.getElementById("txtCorreo").value =  "";
    document.getElementById("txtEstatus").value = "";
    document.getElementById("btnAdd").classList.remove("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnUpdate").classList.add("disabled");
}

function addCliente() {
    const send = submitCliente();

    if (send) {
        let NUC, nombre, apellidoPat, apellidoMat, genero, RFC, numeroMovil, numeroCasa, correoElectronico, estatus, subApMat;
    
        nombre = document.getElementById("txtNombre").value;
        apellidoPat = document.getElementById("txtApellidoPat").value;
        apellidoMat = document.getElementById("txtApellidoMat").value;
        genero = document.getElementById("txtGenero").value;
        RFC = document.getElementById("txtRFC").value;
        numeroMovil = document.getElementById("txtTelefonoMov").value;
        numeroCasa = document.getElementById("txtTelefonoCasa").value;
        correoElectronico = document.getElementById("txtCorreo").value;
        estatus = "Activo";
        
        if (apellidoMat === "") {
            subApMat = "X";
        } else {
            subApMat =  apellidoMat.substring(0,1);
        }
        
        NUC = apellidoPat.substring(0,2).toUpperCase() + subApMat.toUpperCase() + Math.floor(Math.random() * 200);
        
        var cliente = {
            "NUC": NUC,
            "Nombre": nombre,
            "ApellidoPat": apellidoPat,
            "ApellidoMat": apellidoMat,
            "Genero": genero,
            "RFC": RFC,
            "NumeroMovil": numeroMovil,
            "NumeroCasa": numeroCasa,
            "CorreoElectronico": correoElectronico,
            "estatus": estatus
        };
        
        clientes.push(cliente);
        cleanCliente();
        loadTabla();
    }
}

document.getElementById("confirmarDelete").addEventListener("click", deleteCliente);

function deleteCliente() {
    if (indexClienteSeleccionado != null) {
        clientes[indexClienteSeleccionado].estatus = "Inactivo";
        document.getElementById("btnUpdate").classList.add("disabled");
        document.getElementById("btnDelete").classList.add("disabled");
        loadTabla();
        cleanCliente();
    }
}

function updateCliente() {
    const send = submitCliente();

    if (send) {
    let NUC, nombre, apellidoPat, apellidoMat, genero, RFC, numeroMovil, numeroCasa, correoElectronico, estatus, subApMat;
    
    NUC = document.getElementById("txtNUC").value;
    nombre = document.getElementById("txtNombre").value;
    apellidoPat = document.getElementById("txtApellidoPat").value;
    apellidoMat = document.getElementById("txtApellidoMat").value;
    genero = document.getElementById("txtGenero").value;
    RFC = document.getElementById("txtRFC").value;
    numeroMovil = document.getElementById("txtTelefonoMov").value;
    numeroCasa = document.getElementById("txtTelefonoCasa").value;
    correoElectronico = document.getElementById("txtCorreo").value;
    estatus = "Activo";

    var cliente = {
        "NUC": NUC,
        "Nombre": nombre,
        "ApellidoPat": apellidoPat,
        "ApellidoMat": apellidoMat,
        "Genero": genero,
        "RFC": RFC,
        "NumeroMovil": numeroMovil,
        "NumeroCasa": numeroCasa,
        "CorreoElectronico": correoElectronico,
        "estatus": estatus
    };
    
    clientes[indexClienteSeleccionado] = cliente;
    loadTabla();
    cleanCliente();
    }
}

function submitCliente() {
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