<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2017/5/27
 * Time: 18:10
 */
require 'vendor/autoload.php';

use Michelf\Markdown;
$my_text="<p>23424324</p>";
$my_html = Markdown::defaultTransform($my_text);

var_dump($my_html);