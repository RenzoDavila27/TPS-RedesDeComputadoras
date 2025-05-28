<?php
$respuestas = [];

if (file_exists("respuestas.txt")) {
    $lineas = file("respuestas.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lineas as $linea) {
        list($opcion, $cantidad) = explode(":", $linea);
        $respuestas[$opcion] = (int)$cantidad;
    }
}

// Calcular total de votos
$total = array_sum($respuestas);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Resultados del Cuestionario</title>
    <style>
        .barra {
            height: 20px;
            background-color: #4CAF50;
        }
        .contenedor {
            width: 100%;
            background-color: #ddd;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <center>
    <h2>Resultados del cuestionario</h2>

    <?php if ($total === 0): ?>
        <p>Aún no hay votos registrados.</p>
    <?php else: ?>
        <?php foreach ($respuestas as $opcion => $cantidad): 
            $porcentaje = ($cantidad / $total) * 100;
        ?>
            <p><strong><?= htmlspecialchars($opcion) ?>:</strong> <?= $cantidad ?> votos (<?= round($porcentaje, 1) ?>%)</p>
            <div class="contenedor">
                <div class="barra" style="width: <?= $porcentaje ?>%"></div>
            </div>
        <?php endforeach; ?>
        <p><strong>Total de votos:</strong> <?= $total ?></p>
    <?php endif; ?>
    </center>
</body>
</html>
