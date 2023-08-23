<?php 
header('Access-Control-Allow-Origin: *');

//Connect to redis
require 'redis_connect.php';

// Connecting SQL database 
require 'sql_connect.php'; 

// Prepared Statement to fetch data
$sql = $connect->prepare("SELECT id FROM login WHERE emails=? AND passwords=?");
$sql->bind_param("ss",$email,$password);

// Data from user through ajax
$email = mysqli_real_escape_string($connect, $_POST["email_u"]);
$password = mysqli_real_escape_string($connect, $_POST["password_u"]);

// Executing Prepared statement with the data from ajax
$sql->execute();
$result = $sql->get_result();

// Checking if the user details is present or not
if($result->num_rows > 0){
    if($redis){
        // Storing the session in redis
        $redis->SADD("log_email", $email);
        $data['status'] = "true";
    }
}
else{
    $data['status'] = "false";
}

echo json_encode($data);

// Closing SQL connection
$sql->close();
$connect->close();
?>