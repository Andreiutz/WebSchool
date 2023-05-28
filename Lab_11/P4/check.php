<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
    if (isset($_GET["status"])) {
        $board = $_REQUEST["status"];
        $arr =  explode(',', $board);

        $emptyElems = array();
        $count = 0;
        foreach($arr as $elem) {
            if ($elem === " ") {
                $count += 1;
            }
        }

        //check if there is a winner
        /*
            0 1 2,
            3 4 5,
            6 7 8,
            0 3 6,
            1 4 7,
            2 5 8,
            0 4 8,
            2 4 6
        */
        if ($arr[0] === $arr[1] && $arr[1] === $arr[2] && $arr[0] != " ") {
            echo $arr[0];
        }
        else if ($arr[3] === $arr[4] && $arr[4] === $arr[5] && $arr[3] != " ") {
            echo $arr[3];
        }
        else if ($arr[6] === $arr[7] && $arr[7] === $arr[8] && $arr[6] != " ") {
            echo $arr[6];
        }
        else if ($arr[0] === $arr[3] && $arr[3] === $arr[6] && $arr[0] != " ") {
            echo $arr[0];
        }
        else if ($arr[1] === $arr[4] && $arr[4] === $arr[7] && $arr[1] != " ") {
            echo $arr[1];
        }
        else if ($arr[2] === $arr[5] && $arr[5] === $arr[8] && $arr[2] != " ") {
            echo $arr[2];
        }
        else if ($arr[0] === $arr[4] && $arr[4] === $arr[8] && $arr[0] != " ") {
            echo $arr[0];
        }
        else if ($arr[2] === $arr[4] && $arr[4] === $arr[6] && $arr[2] != " ") {
            echo $arr[2];

        } else if ($count == 0) {
            echo "E";
        } else {
            echo "C";
        }

    }
?>