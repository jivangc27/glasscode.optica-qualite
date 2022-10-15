let indexAccesorioSeleccionado;
let accesorios = [];

function loadTabla() {
    let contenido = "";
    accesorios.forEach(function (accesorio) {
       let registro =
           '<tr onclick="selectAccesorio(' + accesorios.indexOf(accesorio) + ');">' +
                '<td>' + accesorio.id + '</td>' +
                '<td>' + accesorio.nombre + '</td>' +
                '<td>' + accesorio.marca + '</td>' +
                '<td>' + accesorio.precioCom + '</td>' +
                '<td>' + accesorio.precioVen + '</td>' +
                '<td>' + accesorio.existencias + '</td>' +
                '<td>' + accesorio.estatus + '</td></tr>';
        contenido += registro;
    });
    document.getElementById("tblAccesorios").innerHTML = contenido;
}

fetch("data_Accesorios.json").then(response => {
    return response.json();
}).then(function(jsondata) {
    accesorios = jsondata;
    loadTabla();
});

function selectAccesorio(index) {
    document.getElementById("txtId").value = accesorios[index].id;
    document.getElementById("txtNombre").value = accesorios[index].nombre;
    document.getElementById("txtMarca").value = accesorios[index].marca;
    document.getElementById("txtPrecioCom").value = accesorios[index].precioCom;
    document.getElementById("txtPrecioVen").value = accesorios[index].precioVen;
    document.getElementById("txtExistencias").value = accesorios[index].existencias;
    document.getElementById("btnAdd").classList.add("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnUpdate").classList.remove("disabled");
    indexAccesorioSeleccionado = index;
}

function cleanAccesorio() {
    document.getElementById("txtId").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtPrecioCom").value = "";
    document.getElementById("txtPrecioVen").value = "";
    document.getElementById("txtExistencias").value = "";
    document.getElementById("btnAdd").classList.remove("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnUpdate").classList.add("disabled");
}

let id = 5;

function addAccesorio() {
    const send = submitAccesorio();

    if (send) {
        let nombre, marca, precioCom, precioVen, existencias, estatus;

        nombre = document.getElementById("txtNombre").value;
        marca = document.getElementById("txtMarca").value;
        precioCom = document.getElementById("txtPrecioCom").value;
        precioVen = document.getElementById("txtPrecioVen").value;
        existencias = document.getElementById("txtExistencias").value;
        estatus = "Activo";
        
        id++;
        id =  "OQ-" + id;
        
        var accesorio = {
            "id" : id,
            "nombre" : nombre,
            "marca" : marca,
            "precioCom" : precioCom,
            "precioVen" : precioVen,
            "existencias" : existencias,
            "estatus" : estatus
        };
        
        accesorios.push(accesorio);
        cleanAccesorio();
        loadTabla();
    }
}

document.getElementById("confirmarDelete").addEventListener("click", deleteAccesorio);

function deleteAccesorio() {
    if (indexAccesorioSeleccionado != null) {
        accesorios[indexAccesorioSeleccionado].estatus = "Inactivo";
        document.getElementById("btnUpdate").classList.add("disabled");
        document.getElementById("btnDelete").classList.add("disabled");
        loadTabla();
        cleanAccesorio();
    }
}

function updateAccesorio() {
    const send = submitAccesorio();

    if(send) {
        let id, nombre, marca, precioCom, precioVen, existencias, estatus;
    
        id = document.getElementById("txtId").value;
        nombre = document.getElementById("txtNombre").value;
        marca = document.getElementById("txtMarca").value;
        precioCom = document.getElementById("txtPrecioCom").value;
        precioVen = document.getElementById("txtPrecioVen").value;
        existencias = document.getElementById("txtExistencias").value;
        estatus = "Activo";
        
        var accesorio = {
            "id" : id,
            "nombre" : nombre,
            "marca" : marca,
            "precioCom" : precioCom,
            "precioVen" : precioVen,
            "existencias" : existencias,
            "estatus" : estatus
        };
        
        accesorios[indexAccesorioSeleccionado] = accesorio;
        loadTabla();
        cleanAccesorio();
    }
}

function submitAccesorio() {
    let nombre = document.getElementById("txtNombre");
    let marca = document.getElementById("txtMarca");
    let precioCompra = document.getElementById("txtPrecioCom");
    let precioVenta = document.getElementById("txtPrecioVen");
    let existencias = document.getElementById("txtExistencias");

    var enviar = true;

    /* Nombre */
    if (nombre.value == ""  || nombre.value == null) {
        alert("Introducir el nombre del producto");
        enviar = false;
    }

    /* Marca */
    if (marca.value == "" || marca.value == null) {
        alert("Introducir la marca del producto");
        enviar = false;
    }

    /* Precio compra */
    if (precioCompra.value == "" || precioCompra.value == null) {
        alert("Introducir el precio de compra");
        enviar = false;
    }

    /* Precio venta */
    if (precioVenta.value == "" || precioVenta.value == null) {
        alert("Introducir el precio de venta");
        enviar = false;
    }
    /* Existencias */
    if (existencias.value == "" || existencias.value == null) {
        alert("Introducir las existencias del producto");
        enviar = false;
    }

    if (enviar) {
        alert("Los datos fueron añadidos correctamente");
    }

    return enviar
}