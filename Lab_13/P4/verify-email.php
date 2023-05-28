<?php
    session_start();
    include('dbcon.php');
    if (isset($_GET['token'])) {
        $token = $_GET['token'];
        $statement = $con->prepare("select verify_token, verify_status from users where verify_token=? limit 1");
        $statement->bind_param("s", $token);
        $statement->execute();
        $result = $statement->get_result();
        if (mysqli_num_rows($result) > 0) {
            $row = $result->fetch_assoc();
            //echo $row['verify_token'];
            if ($row['verify_status'] == '0') {
                $clicked_token = $row['verify_token'];
                $statement = $con->prepare("update users set verify_status = '1' where verify_token=? limit 1");
                $statement->bind_param("s", $clicked_token);
                
                if ($statement->execute()) {
                    $_SESSION['status'] = "Your account has been verified successfully!";
                    header("Location: login.php");
                    exit(0);
                } else {
                    $_SESSION['status'] = "Verification failed!";
                    header("Location: login.php");
                    exit(0);
                }
            } else {
                $_SESSION['status'] = "Email already verified. Login";
                header("Location: login.php");
                exit(0);
            }
        } else {
            $_SESSION['status'] = "This token is invalid";
            header("Location: login.php");
        }


    } else {
        $_SESSION['status'] = "Not Allowed";
        header("Location: login.php");
    }
    $con->close();

?>