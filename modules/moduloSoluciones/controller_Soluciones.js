let indexSolucionSeleccionada;
let soluciones = [];

function loadTabla() {
    let contenido = "";
    soluciones.forEach(function (solucion) {
       let registro = 
               '<tr onclick = "selectSolucion(' + soluciones.indexOf(solucion) + ')";>' +
                    '<td>' + solucion.id + '</td>' +
                    '<td>' + solucion.nombre + '</td>' +
                    '<td>' + solucion.marca + '</td>' +
                    '<td>' + solucion.descripcion + '</td>' +
                    '<td>' + solucion.precioCompra + '</td>' +
                    '<td>' + solucion.precioVenta + '</td>' +
                    '<td>' + solucion.existencias + '</td>' +
                    '<td>' + solucion.estatus + '</td></tr>';
            contenido += registro;
    });
    document.getElementById("tblSoluciones").innerHTML = contenido;
}

fetch("data_Soluciones.json").then(response => {
   return response.json(); 
}).then(function (jsondata) {
   soluciones = jsondata;
   loadTabla();
});

function selectSolucion(index) {
    document.getElementById("txtId").value = soluciones[index].id;
    document.getElementById("txtNombre").value = soluciones[index].nombre;
    document.getElementById("txtMarca").value = soluciones[index].marca;
    document.getElementById("txtDescripcion").value = soluciones[index].descripcion;
    document.getElementById("txtPrecioCom").value = soluciones[index].precioCompra;
    document.getElementById("txtPrecioVen").value = soluciones[index].precioVenta;
    document.getElementById("txtExistencias").value = soluciones[index].existencias;
    document.getElementById("btnAdd").classList.add("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnUpdate").classList.remove("disabled");
    indexSolucionSeleccionada = index;
}

function cleanSolucion() {
    document.getElementById("txtId").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtPrecioCom").value = "";
    document.getElementById("txtPrecioVen").value = "";
    document.getElementById("txtExistencias").value = "";
    document.getElementById("btnAdd").classList.remove("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnUpdate").classList.add("disabled");
}

let id = 5;

function addSolucion() {
    const send = submitSoluciones();

    if (send) {
        let nombre, marca, descripcion, precioCom, precioVen, existencias, estatus;
    
        nombre = document.getElementById("txtNombre").value;
        marca = document.getElementById("txtMarca").value;
        descripcion = document.getElementById("txtDescripcion").value;
        precioCom = document.getElementById("txtPrecioCom").value;
        precioVen = document.getElementById("txtPrecioVen").value;
        existencias = document.getElementById("txtExistencias").value;
        estatus = "Activo";
        
        id++;
        id =  "OQ-" + id;
        var solucion = {
            "id" : id,
            "nombre" : nombre,
            "marca" : marca,
            "descripcion" : descripcion,
            "precioCompra" : precioCom,
            "precioVenta" : precioVen,
            "existencias" : existencias,
            "estatus" : estatus
        };
        
        soluciones.push(solucion);
        cleanSolucion();
        loadTabla();
    }
}

document.getElementById("confirmarDelete").addEventListener("click", deleteSolucion);

function deleteSolucion() {
    if (indexSolucionSeleccionada != null) {
        soluciones[indexSolucionSeleccionada].estatus = "Inactivo";
        document.getElementById("btnUpdate").classList.add("disabled");
        document.getElementById("btnDelete").classList.add("disabled");
        loadTabla();
        cleanSolucion();
    }
}

function updateSolucion() {
    const send = submitSoluciones() 
    
    if (send) {
        let id, nombre, marca, descripcion, precioCom, precioVen, existencias, estatus;
        
        id = document.getElementById("txtId").value;
        nombre = document.getElementById("txtNombre").value;
        marca = document.getElementById("txtMarca").value;
        descripcion = document.getElementById("txtDescripcion").value;
        precioCom = document.getElementById("txtPrecioCom").value;
        precioVen = document.getElementById("txtPrecioVen").value;
        existencias = document.getElementById("txtExistencias").value;
        estatus = "Activo";
        
        var solucion = {
            "id" : id,
            "nombre" : nombre,
            "marca" : marca,
            "descripcion" : descripcion,
            "precioCompra" : precioCom,
            "precioVenta" : precioVen,
            "existencias" : existencias,
            "estatus" : estatus
        };
        
        soluciones[indexSolucionSeleccionada] = solucion;
        loadTabla();
        cleanSolucion();
        }
}

function submitSoluciones() {
    let nombre = document.getElementById("txtNombre");
    let marca = document.getElementById("txtMarca");
    let descripcion = document.getElementById("txtDescripcion");
    let precioCompra = document.getElementById("txtPrecioCom");
    let precioVenta = document.getElementById("txtPrecioVen");
    let existencia = document.getElementById("txtExistencias");

    var enviar = true;

    /* Nombre */
    if (nombre.value == "" || nombre.value == null) {
        alert("Introducir el nombre del producto");
        enviar = false;
    }

    /* Marca */
    if (marca.value == "" || marca.value == null) {
        alert("Introducir la marca del producto");
        enviar = false;
    }
    
    /* Descripcion */
    if (descripcion.value == "" || descripcion.value == null) {
        alert("Introducir una descripcion acerca del producto");
        enviar = false;
    }

    /* Precio compra */
    if (precioCompra.value == "" || precioCompra.value == null) {
        alert("Introducir el precio de compra");
        enviar = false;
    }

    /* Precio venta */
    if (precioVenta.value == "" || precioVenta.value == null) {
        alert("Introducir el precio de venta")
        enviar = false;
    }

    /* Existencias */
    if (existencia.value == "" || existencia.value == null) {
        alert("Introducir existencia del producto");
        enviar = false;
    }

    if (enviar) {
        alert("Los datos fueron añadidos correctamente");
    }

    return enviar;
}