let indexLenteContactoSeleccionado;
let lentesContacto = [];
const id_imagen = document.getElementById("docFotografia");

function loadTabla() {
    let contenido = "";
    lentesContacto.forEach(function (lenteContacto) {
        let registro =
                '<tr onclick = "selectLenteContacto(' + lentesContacto.indexOf(lenteContacto) + ')";>' +
                    '<td>' + lenteContacto.id + '</td>' +
                    '<td><img src = "' + lenteContacto.imagen + '" alt="" height="80px"></td>' +
                    '<td>' + lenteContacto.nombre + '</td>' +
                    '<td>' + lenteContacto.marca + '</td>' +
                    '<td>' + lenteContacto.color + '</td>' +
                    '<td>' + lenteContacto.queratometria + '</td>' +
                    '<td>' + lenteContacto.tipo + '</td>' +
                    '<td>' + lenteContacto.precioCom + '</td>' +
                    '<td>' + lenteContacto.precioVen + '</td>' +
                    '<td>' + lenteContacto.existencias + '</td>' +
                    '<td>' + lenteContacto.estatus + '</td></tr>';
            contenido += registro;
    });
    document.getElementById("tblLenteContacto").innerHTML = contenido;
}

fetch("data_LentesContacto.json").then(response => {
    return response.json();
}).then(function (jsondata) {
    lentesContacto = jsondata;
    loadTabla();
});

function selectLenteContacto(index) {
    document.getElementById("txtId").value = lentesContacto[index].id;
    document.getElementById("txtNombre").value = lentesContacto[index].nombre;
    document.getElementById("txtImagen").value = lentesContacto[index].imagen;
    id_imagen.setAttribute('src', lentesContacto[index].imagen);
    document.getElementById("txtMarca").value = lentesContacto[index].marca;
    document.getElementById("txtColor").value = lentesContacto[index].color;
    document.getElementById("txtQueratometria").value = lentesContacto[index].queratometria;
    document.getElementById("txtTipo").value = lentesContacto[index].tipo;
    document.getElementById("txtPrecioCom").value = lentesContacto[index].precioCom;
    document.getElementById("txtPrecioVen").value = lentesContacto[index].precioVen;
    document.getElementById("txtExistencias").value = lentesContacto[index].existencias;
    document.getElementById("btnAdd").classList.add("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnUpdate").classList.remove("disabled");
    indexLenteContactoSeleccionado = index;
}

function cleanLenteContacto() {
    document.getElementById("txtId").value = "";
    document.getElementById("txtImagen").value = "";
    id_imagen.setAttribute('src', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwcHBwcHBwgHBwcHBwoHBwcHBw8ICQcKFREWFhUREx8YHSggGBoxJxMTITEhJSkrLi4uFx8zODM4NygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDB//EABkQAQEBAQEBAAAAAAAAAAAAAAARAVECEv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD10AAAAAAAAFBFFBBQAUgIRYQEFhAZFARGkBFEAAAAAAAAAAAAAAAAAVFAFAFFBFikBFixYDMI1CAzEjcSAzEjcQGUaQERpAZFQAAAFBAAAAAAAAAAUFAUUBTFAixVBIRqEBIRqEBmJGoAxEjcQGUaQGUaZBEVAQVAVAAAAAAAAAAVFwFMMUFxUxcBcXDFwFUxcAWCgkGgGYjQDCa1qaDKa1rOgzqNazoIioCIqAAAAAAAKIAAAqKCqiguLiYuA1i4mLgNYuJig0rKg0JQDU1UBNTRNBNTV1nQTU1WdBNRdQERUAAAABUAAAAABcQBrFxlQaxcZUGsaxhrAaVlaDSs1aDRWaUFEqUFZ0qAJomgmpq6mgiACIuoAAAAAAAAAAAogKrKgqoA2MqDeaM1aDVWsVaDVKzSg1UqUoLUqVKCoVAEEAQQAFBAAAAAAAAAAAAAAVWVBVZUGisqDVKzQGqVmgNUrNAUqVAVBAVBAVABUAAAAAAAAVAAAAAAUEVYTAZVqZxZnAYG5nFnnmAwOk88w+fPMBzHX588w+fPMByo6fPnmE88wHNHWeeYk88wHNHSZxJnAYG5iAyKAgAAAAKAgAAAAAAAKgCqgDSsqCqyoNDK0FpUAUqAAgAggAIAgAAAAAqAAAAAAAAAAAAqAKqAKqFBRAGhkBRAFQAEABAAAAAAAAAAAAAAVAAAAAAAAAFAAAAAAAAEAAAAAAAVAAAAAAAB/9k=');
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtColor").value = "";
    document.getElementById("txtQueratometria").value = "";
    document.getElementById("txtTipo").value = "";
    document.getElementById("txtPrecioCom").value = "";
    document.getElementById("txtPrecioVen").value = "";
    document.getElementById("txtExistencias").value = "";
    document.getElementById("btnAdd").classList.remove("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnUpdate").classList.add("disabled");
}

let id = 5;

function addLenteContacto() {
    const send = submitLenteContacto();

    if (send) {
        let nombre, marca, color, queratometria, tipo, precioCom, precioVen, existencias, estatus;

        imagen = document.getElementById("txtImagen").value;
        nombre = document.getElementById("txtNombre").value;
        marca = document.getElementById("txtMarca").value;
        color = document.getElementById("txtColor").value;
        queratometria = document.getElementById("txtQueratometria").value;
        tipo = document.getElementById("txtTipo").value;
        precioCom = document.getElementById("txtPrecioCom").value;
        precioVen = document.getElementById("txtPrecioVen").value;
        existencias = document.getElementById("txtExistencias").value;
        estatus = "Activo";

        id++;
        id = "OQ-" + id;

        var lenteContacto = {
            "id" : id,
            "imagen" : imagen,
            "nombre" : nombre,
            "marca" : marca,
            "color" : color,
            "queratometria" : queratometria,
            "tipo" : tipo,
            "precioCom" : precioCom,
            "precioVen" : precioVen,
            "existencias" : existencias,
            "estatus" : estatus
        };
        
        lentesContacto.push(lenteContacto);
        cleanLenteContacto();
        loadTabla();
    }
}

document.getElementById("confirmarDelete").addEventListener("click" , deleteLenteContacto);

function deleteLenteContacto() {
    if (indexLenteContactoSeleccionado != null) {
        lentesContacto[indexLenteContactoSeleccionado].estatus = "Inactivo";
        document.getElementById("btnUpdate").classList.add("disabled");
        document.getElementById("btnDelete").classList.add("disabled");
        loadTabla();
        cleanLenteContacto();
    }
}

function updateLenteContacto() {
    const send = submitLenteContacto();

    if (send) {
        let id, nombre, marca, color, queratometria, tipo, precioCom, precioVen, existencias, estatus;
        
        id = document.getElementById("txtId").value;
        imagen = document.getElementById("txtImagen").value;
        nombre = document.getElementById("txtNombre").value;
        marca = document.getElementById("txtMarca").value;
        color = document.getElementById("txtColor").value;
        queratometria = document.getElementById("txtQueratometria").value;
        tipo = document.getElementById("txtTipo").value;
        precioCom = document.getElementById("txtPrecioCom").value;
        precioVen = document.getElementById("txtPrecioVen").value;
        existencias = document.getElementById("txtExistencias").value;
        estatus = "Activo";

        var lenteContacto = {
            "id" : id,
            "imagen" : imagen,
            "nombre" : nombre,
            "marca" : marca,
            "color" : color,
            "queratometria" : queratometria,
            "tipo" : tipo,
            "precioCom" : precioCom,
            "precioVen" : precioVen,
            "existencias" : existencias,
            "estatus" : estatus
        };
        
        lentesContacto[indexLenteContactoSeleccionado] = lenteContacto;
        loadTabla();
        cleanLenteContacto();
    }
}

function submitLenteContacto() {
    let imagen = document.getElementById("txtImagen");
    let nombre = document.getElementById("txtNombre");
    let marca = document.getElementById("txtMarca");
    let color = document.getElementById("txtColor");
    let queratometria = document.getElementById("txtQueratometria");
    let tipo = document.getElementById("txtTipo");
    let precioCom = document.getElementById("txtPrecioCom");
    let precioVen = document.getElementById("txtPrecioVen");
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

    /* Marca */
    if (marca.value == "" || marca.value == null) {
        alert("Introducir la marca del producto");
        enviar = false;
    }

    /* Color */
    if (color.value == "" || color.value == null) {
        alert("Introducir el color del producto");
        enviar = false;
    }

    /* queratometría */
    if (queratometria.value == "" || queratometria.value == null) {
        alert("Introducir la queratometria del producto");
        enviar = false;
    }

    /* tipo */
    if (tipo.value == "" || tipo.value == null) {
        alert("Introducir el tipo del producto");
        enviar = false;
    }

    /* Precio compra */
    if (precioCom.value == "" || precioCom.value == null) {
        alert("Introducir precio de compra");
        enviar = false;
    }

    /* Precio venta */
    if (precioVen.value == "" || precioVen.value == null) {
        alert("Introducir precio de venta")
        enviar = false;
    }

    /* Existencias */
    if (existencias.value == "" || existencias.value == null) {
        alert("Introducir existencia del producto");
        enviar = false;
    }

    if (enviar) {
        alert("Los datos fueron añadidos correctamente")
    }

    return enviar;
}