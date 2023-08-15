<?php
require 'config.php';

Predis\Autoloader::register();

$redis = new Predis\Client();

?>