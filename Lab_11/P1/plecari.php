<?php header('Access-Control-Allow-Origin: *'); ?>
<?php

    $html_select = "<select id=plecari>";


    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "web_ajax";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT id, nume from orase";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $html_select .= "<option>" . $row["nume"] . "</option>";
        }
    }


    $html_select .= "</select>";
    $conn->close();
    echo $html_select
?>