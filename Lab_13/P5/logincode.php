<?php
    session_start();
    include('dbcon.php');

    if (isset($_POST['login_button'])) {
        if (!empty(trim($_POST['username'])) && !empty(trim($_POST['password']))) {

            $username = mysqli_real_escape_string($con, $_POST['username']);
            $password = mysqli_real_escape_string($con, $_POST['password']);

            $statement = $con->prepare("select * from users where username=? and password=?");
            $statement->bind_param("ss", $username, $password);
            $statement->execute();
            $result = $statement->get_result();

            if (mysqli_num_rows($result) > 0) {
                $_SESSION['logged_user'] = $username;
                $_SESSION['status'] = "Login successful";
                header("Location: index.php");
            } else {
                $_SESSION['status'] = "Invalid username or password";
                header("Location: login.php");
            }
        } else {
            $_SESSION['status'] = "All fields are mandatory!";
            header("Location: login.php");
        }
    }

    $con->close();

?>