<?php 
header('Access-Control-Allow-Origin: *');

// Connecting SQL database 
require 'sql_connect.php';  

// Prepared Statement to insert data
$insert_data = $connect->prepare("INSERT INTO login(emails, passwords) VALUES (?, ?)");
$insert_data->bind_param("ss", $email, $password);

// Prepared Statement to fetch data
$sql = $connect->prepare("SELECT * FROM login WHERE emails=?");
$sql->bind_param("s",$email);	

// Data from user through ajax
$email = mysqli_real_escape_string($connect, $_POST["email_u"]);
$password = mysqli_real_escape_string($connect, $_POST["password_u"]);

// Executing Prepared statement with the data from ajax
$sql->execute();
$result = $sql->get_result();

// Checking if the user details is present or not
if($result->num_rows > 0){
    $data['status'] = "false";
}

// Inserting Data
else if($email != "" && $password != ""){
    $insert_data->execute();
    $data['status'] = "true";
    
}

echo json_encode($data);

// Closing SQL connection
$sql->close();
$insert_data->close();
$connect->close();
?>