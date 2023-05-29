<?php
    session_start();
    unset($_SESSION['logged_user']);
    $_SESSION['status'] = "You logged out successfully";
    header("Location: login.php");
?>