<?php
//// include composer autoload
//require 'vendor/autoload.php';
//
//// import the Intervention Image Manager Class
//use Intervention\Image\ImageManager;
//
//// create an image manager instance with favored driver
//$manager = new ImageManager(array('driver' => 'GD'));
//
//// to finally create image instances
//$image = $manager->make('public/foo.jpg')->resize(300, 200)->save('public/1.jpg');

// include composer autoload
require 'vendor/autoload.php';

// import the Intervention Image Manager Class
use Intervention\Image\ImageManagerStatic as Image;

// configure with favored image driver (gd by default)
//Image::configure(array('driver' => 'GD'));

// and you are ready to go ...
//$image = Image::make('public/foo.jpg')->resize(300, 200)->save('public/3.jpg');
//
//$img = Image::canvas(800, 600, '#ddd');
//
//// draw a filled blue ellipse
//$img->ellipse(25, 30, 50, 50, function ($draw) {
//    $draw->background('#0000ff');
//});
//
//// draw a filled blue ellipse with red border
//$img->ellipse(60, 120, 100, 100, function ($draw) {
//    $draw->background('#0000ff');
//    $draw->border(1, '#ff0000');
//});
//
//// draw an empty ellipse with a 5px border
//$img->ellipse(150, 200, 300, 200, function ($draw) {
//    $draw->border(5, 'fff');
//})->save('public/1.png');
//编辑图片不需要填写图片名
$aa = Image::make('public/foo.jpg')->resize(660, 240)->insert('public/2.jpg')->save();
//var_dump($aa,$aa->save());