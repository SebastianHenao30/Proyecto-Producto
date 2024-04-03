function abrirModalActualizar(id, nombre, descripcion) {
    console.log(id);
    console.log(nombre);
    console.log(descripcion);

    // Establecer los valores en los campos del formulario de actualización
    document.getElementById('idProductoActualizar').value = id;
    document.getElementById('nombreProductoActualizar').value = nombre;
    document.getElementById('descripcionProductoActualizar').value = descripcion;

    // Abrir el modal de actualización
    var modalActualizar = new bootstrap.Modal(document.getElementById('actualizarProductoModal'));
    modalActualizar.show();
}


document.addEventListener("DOMContentLoaded", function() {
    cargarDatos();

    function cargarDatos() {
        fetch('controller/traerProductosAllController.php')
            .then(response => response.json())
            .then(data => {
                const tablaDatos = document.getElementById('tablaDatos');
                tablaDatos.innerHTML = '';

                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                    <td>${row.Id}</td>
                    <td>${row.Nombre}</td>
                    <td>${row.Descripcion}</td>
                    <td>
                        <button class="btn btn-primary" onclick="abrirModalActualizar(${row.Id}, '${row.Nombre}', '${row.Descripcion}')">Actualizar</button>
                        <button class="btn btn-primary">Eliminar</button>
                    </td>
                    `;
                    tablaDatos.appendChild(tr);

                    
                });
            })
            .catch(error => {
                console.error('Error al cargar datos:', error);
            });
    }

    function agregarDatos(formData) {
        fetch('controller/agregarProductoController.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            cargarDatos();
            alert(data);
        });
    }

    var form = document.getElementById("formProducto");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        var formData = new FormData(form);
        agregarDatos(formData);
    });

    function actualizarDatos(formData) {
        fetch('controller/actualizarProductoController.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            cargarDatos(); // Recargar los datos después de la actualización
            alert(data); // Mostrar mensaje de éxito o error
        })
        .catch(error => {
            console.error('Error al enviar la solicitud de actualización:', error);
        });
    }

    var formActualizar = document.getElementById("formUpdateProducto");

    formActualizar.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el envío tradicional del formulario

        // Obtener los datos del formulario
        var formData = new FormData(formActualizar);

        // Enviar los datos de actualización utilizando la función actualizarDatos
        actualizarDatos(formData);
    });

});

