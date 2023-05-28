<?php
    session_start();
    include('dbcon.php');

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    require 'vendor/autoload.php';

    function send_email_verification($name, $email, $verify_token) {
        $mail = new PHPMailer(true);
        try {
            //jxadfkbavmqgdzah
            $mail->isSMTP();
            $mail->SMTPAuth = true;
            $mail->SMTPDebug = 0;

            $mail->Host = "smtp.gmail.com";
            $mail->Username = "checkcheck8891@gmail.com";
            $mail->Password = "jxadfkbavmqgdzah";
    
            $mail->SMTPSecure = "ssl";
            $mail->Port = 465;
    
            $mail->setFrom("checkcheck8891@gmail.com", "Confirmation");
            $mail->addAddress($email);
    
            $mail->isHTML(true);
            $mail->Subject = "Email verification for Hello App";
    
            $email_template = "
                <h2>$name, you have registered with Hello App!</h2>
                <h5>Verify your email address by clicking the link below</h5>
                <br><br>
                <a href='http://localhost:3000/verify-email.php?token=$verify_token'>Click me</a>
            ";
    
            $mail->Body = $email_template;
            $mail->send();
            echo "Message has been sent!";
        }  catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }

    if (isset($_POST['register_btn'])) {
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $verify_token = md5(rand());

        if (empty(trim($name)) || empty(trim($phone)) || empty(trim($email) || empty(trim($password)))) {
            $_SESSION['status'] = "Fields should not be empty";
            header("Location: register.php");
            $con->close();
            exit(0);
        }

        //Check if email exists or not
        $statement = $con->prepare("select email from users where email=? limit 1");
        $statement->bind_param("s", $email);
        $statement->execute();
        $result = $statement->get_result();
        if (mysqli_num_rows($result) > 0) {
            $_SESSION['status'] = "Email Id already exists";
            header("Location: register.php");
        } else {
            // Insert user
            $add_statement = $con->prepare("insert into users (name, phone, email, password, verify_token) values (?,?,?,?,?)");
            $add_statement->bind_param("sssss", $name, $phone, $email, $password, $verify_token);
            

            if ($add_statement->execute()) {

                send_email_verification($name, $email, $verify_token);

                $_SESSION['status'] = "Registration successful! Please verify Email Address";
                header("Location: register.php");
            } else {
                $_SESSION['status'] = "Registration failed";
                header("Location: register.php");
            }

        }
    }

    $con->close();

?>