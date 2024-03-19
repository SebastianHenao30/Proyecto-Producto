<?php
include_once('../models/productoDAO.php');
$pr = new ProductoDAO($_POST['nombreProducto'],$_POST['descripcionProducto']);
$rta=$pr->addProducto();
echo('El registro fue agregado correctamente');

?>
