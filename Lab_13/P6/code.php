<?php

    session_start();
    include('dbcon.php');

    if (isset($_POST['post_button'])) {

        if (!empty(trim($_POST['comment'])) && !empty(trim($_POST['name']))) {

            //Validate comment
            $name = $_POST['name'];
            $comment = $_POST['comment'];
            
            if (preg_match("/^[A-Za-z0-9 ]+$/", $name) && preg_match("/^[A-Za-z0-9.,! ]+$/", $comment)) {
                $statement = $con->prepare("insert into comments (name, comment) values (?,?)");
                $statement->bind_param("ss", $name, $comment);
    
                if ($statement->execute()) {
                    //s-a adaugat in db
                    $_SESSION['status'] = "Comment posted successfully! Waiting for approval.";
                    header("Location: index.php");
                } else {
                    //eroare
                    $_SESSION['status'] = "Comment could not be posted";
                    header("Location: index.php");
                }
            } else {
                $_SESSION['status'] = "Special characters are not allowed!";
                header("Location: index.php");
            }

        } else {
            //eroare
            $_SESSION['status'] = "Emtpy fields are not allowed!";
            header("Location: index.php");
        }

    }

    $con->close();

?>