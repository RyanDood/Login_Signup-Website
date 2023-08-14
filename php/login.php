<?php header('Access-Control-Allow-Origin: *');

$host = "host";
$username = "username";
$password_1 = "password";
$database = "database_name";

// Connecting SQL database 
$connect = mysqli_connect($host, $username, $password_1, $database);

// Connecting Redis 
$redis = new Redis();
$redis->connect('redis_server',12345);
$redis->auth('redis_password');

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
        $redis->set('email',$email);
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