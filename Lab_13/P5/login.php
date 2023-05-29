<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/login_style.css">
    <title>Instagram</title>
</head>
<body>
        <header>
            <h1>Instagram</h1>
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

        <div class="container">
            <h3>Login</h3>
            <form action="logincode.php" method="POST">
                <label>Username:</label>
                <input type="text" name="username">
                <label>Password:</label>
                <input type="password" name="password">
                <button type="submit" name="login_button">login</button>
            </form>
        </div>
</body>
</html>