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

});


