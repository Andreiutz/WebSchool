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

    <h2>Your uploads:</h2>
    <div class="container">
    <?php
        include('dbcon.php');

        $result = $con->query("select path from pictures where username='{$_SESSION['logged_user']}' order by time_posted desc");
        while ($row = $result->fetch_assoc()) {
            ?>
            <div class="card">
                <img src="<?=$row['path']?>">
            </div>
            <?php
        }

        $con->close();
    ?>
    </div>
    <div class="add_picture_form">
        <form action="upload.php" method="POST" enctype="multipart/form-data">
            <input type="file" name="image">
            <button type="submit" name="submit_button">Upload</button>
        </form>
    </div>

</body>
</html>