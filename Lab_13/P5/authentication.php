<?php
    session_start();

    if (!isset($_SESSION['logged_user'])) {
        $_SESSION['status'] = "Please login to access Instagram";
        header("Location: login.php");
    }
?>