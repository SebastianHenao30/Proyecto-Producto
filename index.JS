function abrirModalEliminar(id) {
    console.log(id);

    document.getElementById('idProductoEliminar').value = id;

    // Abrir el modal de actualización
    var modalEliminar = new bootstrap.Modal(document.getElementById('eliminarProductoModal'));
    modalEliminar.show();


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
                        <button class="btn btn-primary" onclick="abrirModalEliminar(${row.Id})">Eliminar</button>
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

    function eliminarProducto(id) {
        fetch('controller/eliminarProductoController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'idProductoEliminar=' + id
        })
        .then(response => response.text())
        .then(data => {
            cargarDatos(); // Recargar los datos después de la eliminación
            alert(data); // Mostrar mensaje de éxito o error
        })
        .catch(error => {
            console.error('Error al enviar la solicitud de eliminación:', error);
        });
    }

    document.getElementById('confirmarEliminar').addEventListener('click', function() {
        var idProductoEliminar = document.getElementById('idProductoEliminar').value;
        console.log(idProductoEliminar);
        eliminarProducto(idProductoEliminar)

        var modalEliminar = new bootstrap.Modal(document.getElementById('eliminarProductoModal'));
        
    });

});


