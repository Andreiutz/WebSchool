<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
    if (isset($_GET["status"])) {
        $board = $_REQUEST["status"];
        $arr =  explode(',', $board);

        $emptyElems = array();
        $count = 0;
        foreach($arr as $elem) {
            if ($elem === " ") {
                array_push($emptyElems, $count);
            }
            $count += 1;
        }

        $chosenIndex = array_rand($emptyElems, 1);
        echo $emptyElems[$chosenIndex];
    }
?>