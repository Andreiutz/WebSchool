<?php
    session_start();
    include('dbcon.php');

    if (isset($_POST['login_button'])) {

        if (!empty(trim($_POST['email'])) && !empty(trim($_POST['password']))) {
            
            $email = mysqli_real_escape_string($con, $_POST['email']);
            $password = mysqli_real_escape_string($con, $_POST['password']);

            $statement = $con->prepare("select * from users where email=? and password=?");
            $statement->bind_param("ss", $email, $password);
            $statement->execute();
            $result = $statement->get_result();

            if (mysqli_num_rows($result) > 0) {

                 $row = $result->fetch_assoc();
                 if ($row['verify_status'] == "1") {
                    //Account verified
                    $_SESSION['authenticated'] = true;
                    $_SESSION['auth_user'] = [
                        'username' => $row['name'],
                        'email' => $row['email'],
                        'phone' => $row['phone']
                    ];
                    $_SESSION['status'] = "Login successful";
                    header("Location: dashboard.php");
                    exit(0);
                 } else {
                    //Account not verified
                    $_SESSION['status'] = "Verify your email";
                    header("Location: login.php");
                    exit(0);                    
                 }
            } else {
                $_SESSION['status'] = "Invalid email or password";
                header("Location: login.php");
                exit(0);
            }

        } else {
            $_SESSION['status'] = "All fields are mandatory";
            header("Location: login.php");
            exit(0);
        }

    }

    $con->close();

?>