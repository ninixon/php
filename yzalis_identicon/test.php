<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2017/5/27
 * Time: 17:49
 */
require 'vendor/autoload.php';

$identicon = new \Identicon\Identicon();
$identicon->displayImage('foo99',500);
$imageData = $identicon->getImageData('bar');
$imageDataUri = $identicon->getImageDataUri('bar232','64','fdfsdf');var_dump($imageDataUri);
$imageDataUri = $identicon->getImageDataUri('bar232','64',array(200, 100, 150));

var_dump($imageData);
echo "<img src=".$imageDataUri.">";