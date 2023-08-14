<?php header('Access-Control-Allow-Origin: *');

// Connecting Redis 
$redis = new Redis();
$redis->connect('redis_server',12345);
$redis->auth('redis_password');

// Connecting with the MongoDB database
require_once __DIR__ . '/vendor/autoload.php';
$client = new MongoDB\Client('mongodb_server');
$profileDB = $client->profile_guvi->profile;

// Fetching the session data from redis
$email = $redis->get('email');

// Fetching user document
$fetch_document = $profileDB->findOne(['email' => $email]);

// Inserting user document
if($fetch_document == null){
    $name = $_POST["name_u"];
    $age = $_POST["age_u"];
    $dob = $_POST["dob_u"];
    $phoneNo = $_POST["phoneNo_u"];
    if($name != "" && $age != "" && $dob != "" && $phoneNo != ""){
        $data['status'] = "true";
        $profileDB->insertOne([
            'email' => $email,
            'name' => $name,
            'age' => $age,
            'dob' => $dob,
            'phoneNo' => $phoneNo
        ]);
    }

    else{
        $data['status'] = "false";
    }

    echo json_encode($data);
}

// Updating User document
else{
    $json = MongoDB\BSON\toJSON(MongoDB\BSON\fromPHP($fetch_document));
    $fetched_data = json_decode($json);

    $f_name = $fetched_data->name;
    $f_age = $fetched_data->age;
    $f_dob = $fetched_data->dob;
    $f_phoneNo = $fetched_data->phoneNo;

    $name = $_POST["name_u"];
    $age = $_POST["age_u"];
    $dob = $_POST["dob_u"];
    $phoneNo = $_POST["phoneNo_u"];

    if($name != "" && $age != "" && $dob != "" && $phoneNo != ""){
        if($name != $f_name || $age != $f_age || $dob != $f_dob || $phoneNo != $f_phoneNo){
            $profileDB->updateOne([ 'email' => $email],[ '$set' => [ 'name' => $name, 'age' => $age, 'dob' => $dob, 'phoneNo' => $phoneNo]]);
            $data['status'] = "true";
        }
        else{
            $data['status'] = "false";
        }
    }
    echo json_encode($data);
}

?>