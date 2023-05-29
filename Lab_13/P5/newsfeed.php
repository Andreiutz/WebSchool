<?php
    include('authentication.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/index_style.css">
    <title>Instagram</title>
</head>
<body>
    <header>
        <h1>Instagram</h1>
        <ul>
            <li>
                <a href="newsfeed.php">Other posts</a>
            </li>
            <li>
                <a href="index.php">My Page</a>
            </li>
            <li>
                <a href="logout.php">Logout</a>
            </li>
        </ul>
    </header>

        <?php

        if (isset($_SESSION['status'])) {
            ?>
            <div class="alert">
                <h4><?= $_SESSION['status']?></h4>
            </div>
            <?php
            unset($_SESSION['status']);
        }

    ?>

    <h2>Uploads:</h2>
    <div class="container">
    <?php
        include('dbcon.php');

        $result = $con->query("select path, username from pictures order by time_posted desc");
        while ($row = $result->fetch_assoc()) {
            ?>
            <div class="card">
                <p>Posted by <?= $row['username']?></p>
                <img src="<?=$row['path']?>">
            </div>
            <?php
        }

        $con->close();
    ?>
    </div>
</body>
</html>