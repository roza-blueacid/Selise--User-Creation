<?php

if ( isset ($_POST ['firstname']) ){

    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $gender = $_POST['gender'];
    $dob = $_POST['birthday'];
    $city = $_POST['city'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];   

    $conx = mysqli_connect("localhost", "root", "", "database" );

    $sql = "";
}


?>