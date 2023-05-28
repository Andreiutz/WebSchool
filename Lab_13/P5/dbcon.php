<?php

    $con = new mysqli("localhost", "root", "", "web");

    if ($con->connect_error) {
        die("Connection failed: ". $con->connect_error);
    }
    
?>