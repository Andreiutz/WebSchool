<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Working out</title>
</head>
<body>
    <header>
        <h1>Bench Press</h1>
    </header>
    <div class="container">
        <img src="bench-press.jpg">
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia repellendus atque, velit voluptates dicta nisi porro omnis possimus delectus, facilis asperiores reiciendis cum repellat nemo optio dolore esse corrupti veniam?
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium accusamus adipisci eveniet debitis doloremque necessitatibus ex? Officia dolorem temporibus fuga iste aperiam perspiciatis? Pariatur a perspiciatis consequuntur sed. Culpa, eius.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, commodi ducimus. Libero sed incidunt alias, deleniti id numquam explicabo non quia fugiat modi a quo corporis iusto laborum, autem provident!
        </p>
    </div>
    <div class="comment_section">
        <h3>Comment section</h3>
        <?php

            include('dbcon.php');

            $result = $con->query("select * from comments where status=1");
            while ($row = $result->fetch_assoc()) {
                ?>
                <p><?= $row['name']?>: <?= $row['comment']?></p>
                <?php
            }



            $con->close();

        ?>
        <?php

            if (isset($_SESSION['status'])) {
                ?>
                <div class="alert">
                    <h5><?= $_SESSION['status']?></h5>
                </div>
                <?php
                unset($_SESSION['status']);
            }

        ?>
        <form action="code.php" method="POST">
            <input type="text" name="name" placeholder="enter your name">
            <br>
<textarea name="comment" placeholder="type your comment..." rows="4" cols="50"></textarea>
            <br>
            <button type="submit" name="post_button">Post comment</button>
        </form>
    </div>
    <footer>

    </footer>
</body>
</html>