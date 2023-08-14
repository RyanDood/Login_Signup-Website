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
if($fetch_document != null){
    $json = MongoDB\BSON\toJSON(MongoDB\BSON\fromPHP($fetch_document));
    $fetched_data = json_decode($json);

    $f_name = $fetched_data->name;
    $f_age = $fetched_data->age;
    $f_dob = $fetched_data->dob;
    $f_phoneNo = $fetched_data->phoneNo;

    if($f_name != "" && $f_age != "" && $f_dob != "" && $f_phoneNo != ""){
        $data['f_name'] = $f_name;
        $data['f_age'] = $f_age;
        $data['f_dob'] = $f_dob;
        $data['f_phoneNo'] = $f_phoneNo;
        $data['status'] = "fetched";
    }
}

else{
    $data['status'] = "not_fetched";
}

echo json_encode($data);
?>