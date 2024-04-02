<?php
include_once(__DIR__.'/../config/config.php');
include_once(__DIR__.'/../config/conexion.php');

class ProductoDAO {
    private $nombre;
    private $descripcion;
    private $conn;

    public function __construct($nom='',$desc=''){
        $this->nombre=$nom;
        $this->descripcion=$desc;
        $this->conn = new Conexion(DB_USER, DB_PASS, DB_HOST, DB_NAME);
    }

    public function traerDatosProducto(){
        $db = $this->conn->Conectarse();
        $query="SELECT * FROM producto";
        $consulta = $db->prepare($query);
        $consulta->execute();
        $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
        return $resultados;
        
    }

    public function addProducto() {
        try {
            $db = $this->conn->Conectarse();
            $query="INSERT INTO producto(nombre, descripcion) VALUES ('$this->nombre','$this->descripcion')";
            // Preparar la consulta para insertar el nuevo producto
            $consulta = $db->prepare($query);
            // Ejecutar la consulta
            $resultado = $consulta->execute();
            // Cerrar la conexión
            $this->conn->desconectar();
        } catch (PDOException $e) {
            // Manejar errores de la base de datos
            echo "Error al guardar el producto: " . $e->getMessage();
            return false;
        }
    }

    
    
}
?>



