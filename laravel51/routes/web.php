<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Barryvdh\Debugbar;
Route::get('/', function () {
//    Barryvdh\Debugbar\Debugbar::info("1");
//    Debugbar::info(11);
//    Debugbar::error('Error!');
//    Debugbar::warning('Watch out…');
//    Debugbar::addMessage('Another message', 'mylabel');
    return view('welcome');
});
