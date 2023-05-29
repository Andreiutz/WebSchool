<?php

    $con = new mysqli("localhost", "root", "", "instagram");

    if ($con->connect_error) {
        die("Connection failed: ". $con->connect_error);
    }
    
?>