<?php header('Access-Control-Allow-Origin: *'); ?>
<?php

    $requestUri = $_SERVER['REQUEST_URI'];

    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "web_ajax";


    if (strpos($requestUri, "/ids")) {
        $html_select = "<select id=selectIds size=20>";
        
        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
    
        $sql = "select id from oameni order by id asc";
        $result = $conn->query($sql);
    
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $html_select .= "<option>{$row["id"]}</option>";
            }
        }
        
        $html_select .= "</select>";
        echo $html_select;
        $conn->close();

    } else if (isset($_GET["id"]) && !isset($_GET["lastname"])) {
        $id = $_REQUEST["id"];
        
        $entity = "";

        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "select * from oameni where id={$id}";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $entity .= "{$row["nume"]},{$row["prenume"]},{$row["telefon"]},{$row["email"]}";
        }

        echo $entity;
        $conn->close();
    } else if (isset($_GET["id"]) && isset($_GET["lastname"]) && isset($_GET["firstname"]) && isset($_GET["phone"]) && isset($_GET["email"])) {
        $id = $_REQUEST["id"];
        $lastname = $_REQUEST["lastname"];
        $firstname = $_REQUEST["firstname"];
        $phone = $_REQUEST["phone"];
        $email = $_REQUEST["email"];

        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "update oameni set nume = '" . $lastname . "', prenume = '" . $firstname . "', telefon = '" . $phone . "', email = '" . $email . "' where id = " . $id;
        $conn->execute_query($sql);

        $conn->close();
    }

?>