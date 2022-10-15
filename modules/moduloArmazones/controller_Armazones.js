let indexArmazonSeleccionado;
let armazones = [];
const id_imagen = document.getElementById("docFotografia");

function loadTabla() {
    let contenido = "";
    armazones.forEach(function (armazon) {
        let registro = 
            '<tr onclick="selectArmazon(' + armazones.indexOf(armazon) + ');">' +
                '<td>' + armazon.id + '</td>' +
                '<td><img src = "' + armazon.imagen + '"alt="" height="80px"></td>' +
                '<td>' + armazon.nombre + '</td>' +
                '<td>' + armazon.modelo + '</td>' +
                '<td>' + armazon.marca + '</td>' +
                '<td>' + armazon.color + '</td>' +
                '<td>' + armazon.descripcion + '</td>' +
                '<td>' + armazon.dimensiones + '</td>' +
                '<td>' + armazon.precioCompra + '</td>' +
                '<td>' + armazon.precioVenta + '</td>' +
                '<td>' + armazon.existencias + '</td>' +
                '<td>' + armazon.estatus + '</td></tr>';
        contenido += registro;
    });
    document.getElementById("tblArmazones").innerHTML = contenido;
}

fetch("data_Armazones.json").then(response => {
    return response.json();
})
.then(function(jsondata) {
    armazones = jsondata;
    loadTabla();
});

function selectArmazon(index) {
    document.getElementById("txtId").value = armazones[index].id;
    document.getElementById("txtNombre").value = armazones[index].nombre;
    document.getElementById("txtImagen").value = armazones[index].imagen;
    id_imagen.setAttribute('src', armazones[index].imagen);
    document.getElementById("txtModelo").value = armazones[index].modelo;
    document.getElementById("txtMarca").value = armazones[index].marca;
    document.getElementById("txtColor").value = armazones[index].color;
    document.getElementById("txtDescripcion").value = armazones[index].descripcion;
    document.getElementById("txtDimensiones").value = armazones[index].dimensiones;
    document.getElementById("txtPrecioCom").value = armazones[index].precioCompra;
    document.getElementById("txtPrecioVen").value = armazones[index].precioVenta;
    document.getElementById("txtExistencias").value = armazones[index].existencias;
    document.getElementById("btnAdd").classList.add("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnUpdate").classList.remove("disabled");
    indexArmazonSeleccionado = index;
}

function cleanArmazon() {
    document.getElementById("txtId").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtImagen").value = "";
    id_imagen.setAttribute('src', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwcHBwcHBwgHBwcHBwoHBwcHBw8ICQcKFREWFhUREx8YHSggGBoxJxMTITEhJSkrLi4uFx8zODM4NygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDB//EABkQAQEBAQEBAAAAAAAAAAAAAAARAVECEv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD10AAAAAAAAFBFFBBQAUgIRYQEFhAZFARGkBFEAAAAAAAAAAAAAAAAAVFAFAFFBFikBFixYDMI1CAzEjcSAzEjcQGUaQERpAZFQAAAFBAAAAAAAAAAUFAUUBTFAixVBIRqEBIRqEBmJGoAxEjcQGUaQGUaZBEVAQVAVAAAAAAAAAAVFwFMMUFxUxcBcXDFwFUxcAWCgkGgGYjQDCa1qaDKa1rOgzqNazoIioCIqAAAAAAAKIAAAqKCqiguLiYuA1i4mLgNYuJig0rKg0JQDU1UBNTRNBNTV1nQTU1WdBNRdQERUAAAABUAAAAABcQBrFxlQaxcZUGsaxhrAaVlaDSs1aDRWaUFEqUFZ0qAJomgmpq6mgiACIuoAAAAAAAAAAAogKrKgqoA2MqDeaM1aDVWsVaDVKzSg1UqUoLUqVKCoVAEEAQQAFBAAAAAAAAAAAAAAVWVBVZUGisqDVKzQGqVmgNUrNAUqVAVBAVBAVABUAAAAAAAAVAAAAAAUEVYTAZVqZxZnAYG5nFnnmAwOk88w+fPMBzHX588w+fPMByo6fPnmE88wHNHWeeYk88wHNHSZxJnAYG5iAyKAgAAAAKAgAAAAAAAKgCqgDSsqCqyoNDK0FpUAUqAAgAggAIAgAAAAAqAAAAAAAAAAAAqAKqAKqFBRAGhkBRAFQAEABAAAAAAAAAAAAAAVAAAAAAAAAFAAAAAAAAEAAAAAAAVAAAAAAAB/9k=')
    document.getElementById("txtModelo").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtColor").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtDimensiones").value = "";
    document.getElementById("txtPrecioCom").value = "";
    document.getElementById("txtPrecioVen").value = "";
    document.getElementById("txtExistencias").value = "";
    document.getElementById("btnAdd").classList.remove("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnUpdate").classList.add("disabled");
}

let codigo = 5;

function addArmazon() {
   const send = submitArmazon();

   if (send) {
        let nombre, modelo, marca, color, descripcion, dimensiones, precioCompra, precioVenta, existencias, estatus, imagen;
    
        imagen = document.getElementById("txtImagen").value;
        nombre = document.getElementById("txtNombre").value;
        modelo = document.getElementById("txtModelo").value;
        marca = document.getElementById("txtMarca").value;
        color = document.getElementById("txtColor").value;
        descripcion = document.getElementById("txtDescripcion").value;
        dimensiones = document.getElementById("txtDimensiones").value;
        precioCompra = document.getElementById("txtPrecioCom").value;
        precioVenta = document.getElementById("txtPrecioVen").value;
        existencias = document.getElementById("txtExistencias").value;
        estatus = "Activo";

        codigo++;
        
        id =  "OQ-" + codigo;

        var armazon = {
            "id" : id,
            "imagen" : imagen,
            "nombre" : nombre,
            "modelo" : modelo,
            "marca" : marca,
            "color" : color,
            "descripcion" : descripcion,
            "dimensiones" : dimensiones,
            "precioCompra" : precioCompra,
            "precioVenta" : precioVenta,
            "existencias" : existencias,
            "estatus" : estatus
        };
        
        armazones.push(armazon);
        cleanArmazon();
        loadTabla();
   }
}

document.getElementById("confirmarDelete").addEventListener("click", deleteArmazon);

function deleteArmazon() {
    if (indexArmazonSeleccionado != null) {
        armazones[indexArmazonSeleccionado].estatus = "Inactivo";
        document.getElementById("btnUpdate").classList.add("disabled");
        document.getElementById("btnDelete").classList.add("disabled");
        loadTabla();
        cleanArmazon();
    }
}

function updateArmazon() {
    const send = submitArmazon();

    if (send) {
        let  codigo, nombre, modelo, marca, color, descripcion, dimensiones, precioCompra, precioVenta, existencias, estatus, imagen;
   
        codigo = document.getElementById("txtId").value;
        imagen = document.getElementById("txtImagen").value;
        nombre = document.getElementById("txtNombre").value;
        modelo = document.getElementById("txtModelo").value;
        marca = document.getElementById("txtMarca").value;
        color = document.getElementById("txtColor").value;
        descripcion = document.getElementById("txtDescripcion").value;
        dimensiones = document.getElementById("txtDimensiones").value;
        precioCompra = document.getElementById("txtPrecioCom").value;
        precioVenta = document.getElementById("txtPrecioVen").value;
        existencias = document.getElementById("txtExistencias").value;
        estatus = "Activo";
        
        var armazon = {
            "id" : codigo,
            "imagen" : imagen,
            "nombre" : nombre,
            "modelo" : modelo,
            "marca" : marca,
            "color" : color,
            "descripcion" : descripcion,
            "dimensiones" : dimensiones,
            "precioCompra" : precioCompra,
            "precioVenta" : precioVenta,
            "existencias" : existencias,
            "estatus" : estatus
        };
        
        armazones[indexArmazonSeleccionado] = armazon;
        loadTabla();
        cleanArmazon();
    }
}

function submitArmazon() {
    let imagen = document.getElementById("txtImagen");
    let nombre = document.getElementById("txtNombre");
    let modelo = document.getElementById("txtModelo");
    let marca = document.getElementById("txtMarca");
    let color = document.getElementById("txtColor");
    let descripcion = document.getElementById("txtDescripcion");
    let dimensiones = document.getElementById("txtDimensiones");
    let precioCompra = document.getElementById("txtPrecioCom");
    let precioVenta = document.getElementById("txtPrecioVen");
    let existencias = document.getElementById("txtExistencias");

    var enviar = true;

    /* Imagen */
    if (imagen.value == "" || imagen.value == null) {
        alert("Introducir la ruta o enlace de la imagen del armazon");
        enviar = false;
    }

    /* Nombre */
    if (nombre.value == "" || nombre.value == null) {
        alert("Introducir el nombre del producto");
        enviar = false;
    }

    /* Modelo */
    if (modelo.value == "" || modelo.value == null) {
        alert("Introducir la el modelo del producto");
        enviar = false;
    }

    /* Marca */
    if (marca.value == "" || marca.value == null) {
        alert ("Introducir la marca del producto");
        enviar = false;
    }

    /* Color */
    if (color.value == "" || color.value == null) {
        alert("Introducir el color del producto");
        enviar = false;
    }

    /* Descripcion */
    if (descripcion.value == "" ||  descripcion.value == null) {
        alert("Ingresar una pequeña descripcion del producto");
        enviar = false;
    }

    /* Dimensiones */
    if (dimensiones.value == "" || dimensiones.value == null) {
        alert("Ingresa las dimensiones del producto");
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

