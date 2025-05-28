<html>
    <body>
    <center>
        <img src="https://www.uncuyo.edu.ar/assets/imgs/logo_uncu23.png" alt="Universidad Nacional de Cuyo" title="volver al inicio" style="width: 350px; height: auto;">
        <h3>¿Cuál es tu brawler favorito?</h3>
        <form name="formulario1" id= "formulario1_id" action="verificar.php" method="POST"
            onsubmit="return validar();">
            <label for=”nombre">Ingrese su email: </label>
            <input type="text" name="email" id="email"><br><br>
            <label><input type="radio" name="brawler" value="Pam"> Pam
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSdIS-jrgwsVjgNoDhnaBlkdCqRfXQw5XBfw&s" alt="Pam" width="50"></label><br>
            <label><input type="radio" name="brawler" value="El primo"> El primo
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUwzmnRG_F4-OAvpZErYKrdQjuEjk7qBALsQ&s" alt="El primo" width="50"></label><br>
            <label><input type="radio" name="brawler" value="Mandy"> Mandy
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-OSTqkKEfrRhj4EJg-f2wzQZOVRb5JIG_RQ&s" alt="Mandy" width="50"></label><br>
            <label><input type="radio" name="brawler" value="Dynamike"> Dynamike
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJRgOFSbf-4z5vo8yHxj8gWFSxImTydqD_6Q&s" alt="Dynamike" width="50"></label><br>
            <label><input type="radio" name="brawler" value="Spike"> Spike
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gJL0m5P_2BAKmx-v9F57Nzl4AKPnc-1SIA&s" alt="Spike" width="50"></label>
            <p><input type="submit"></p>
        </form>
    </center>
    <script>
        function validar() {
            const email = document.getElementById("email").value;
            if (validarEmail(email)) {
                return true
            } else {
            alert("Correo inválido, ingreselo nuevamente");
            return false
            }
        }

        function validarEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
    </script>
    </body>
</html>