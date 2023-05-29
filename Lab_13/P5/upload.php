<?php

    include('dbcon.php');
    include('authentication.php');

    function add_picture_to_db($filepath, $username, $con) {
            $statement = $con->prepare("insert into pictures(path, username) values (?,?)");
            $statement->bind_param("ss", $filepath, $username);
            if ($statement->execute()) {
                $_SESSION['status'] = "Picture uploaded!";
                header("Location: index.php");
                $con->close();
                exit(0);
            } else {
                $_SESSION['status'] = "Picture could not be saved!";
                header("Location: index.php");
                $con->close();
                exit(0);
            }
    }

    if (isset($_POST['submit_button']) && isset($_FILES['image'])) {
        echo "<pre>";
        print_r($_FILES['image']);
        echo "</pre>";

        
        $img_name = $_FILES['image']['name'];
        $img_size = $_FILES['image']['size'];
        $tmp_name = $_FILES['image']['tmp_name'];
        $error = $_FILES['image']['error'];

        if ($error === 0) {
            $img_ex = pathinfo($img_name, PATHINFO_EXTENSION);
            $img_ex_lc = strtolower($img_ex);

            $allowed_extensions = array("jpg", "jpeg", "png");
            if (in_array($img_ex_lc, $allowed_extensions)) {
                $new_image_name = uniqid("IMG-", true).'.'.$img_ex_lc;
                $img_upload_path = 'uploads/'.$new_image_name;
                move_uploaded_file($tmp_name, $img_upload_path);

                add_picture_to_db($img_upload_path, $_SESSION['logged_user'], $con);

            } else {
                $_SESSION['status'] = "Invalid type of file";
                header("Location: index.php");
                $con->close();
                exit(0);
            }
        } else {
            $_SESSION['status'] = "Some error occured!";
            header("Location: index.php");
            $con->close();
            exit(0);
        }


    } else {
        $_SESSION['status'] = "You have to choose a picture!";
        header("Location: index.php");
        $con->close();
        exit(0);
    }

    $con->close();

?>