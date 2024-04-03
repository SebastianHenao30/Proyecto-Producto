<?php
include_once('../models/productoDAO.php');

if (isset($_POST['idProductoEliminar'])) {
    $id = $_POST['idProductoEliminar'];
    
    $productoDAO = new ProductoDAO();
    

    if ($productoDAO->eliminarProducto($id)) {
        echo 'El producto se eliminó correctamente';
    } else {
        echo 'Error al eliminar el producto';
    }
} else {
    echo 'Se requiere el ID del producto para eliminarlo';
}
?>
