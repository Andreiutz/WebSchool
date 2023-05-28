<?php header('Access-Control-Allow-Origin: *'); ?>
<?php

    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "web_ajax";

    if (isset($_GET['dim']) && isset($_GET['page'])) {
        $html_table = "<table id=tabelOameni><tr><th>Prenume</th><th>Nume</th><th>Telefon</th><th>Email</th></tr>";

        $page = $_REQUEST["page"];
        $dim = $_REQUEST["dim"];
    
        $index_start = ($page - 1) * $dim;
    
        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
    
        $sql = "select * from oameni limit {$index_start},{$dim}";
        $result = $conn->query($sql);
    
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $html_table .= "<tr>";
                $html_table .= "<td>{$row["nume"]}</td><td>{$row["prenume"]}</td><td>{$row["telefon"]}</td><td>{$row["email"]}</td>";
                $html_table .= "</tr>"; 
            }
        }
    
        $html_table .= "</table>";
        $conn->close();
        echo $html_table;
    } else {
        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
    
        $sql = "select count(*) as 'nr' from oameni";
        $result = $conn->query($sql);
    
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo $row["nr"];
        }
    
        $conn->close();
    }

?>