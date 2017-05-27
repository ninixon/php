<?php
require 'vendor/autoload.php';
use Nette\Mail\Message;
use Nette\Mail\SendmailMailer;



$mail = new Message;
$mail->setFrom('John <john@example.com>')
    ->addTo('916462392@qq.com')
    ->setSubject('Order Confirmation')
    ->setBody("Hello, Your order has been accepted.");


$mailer = new SendmailMailer;
$mailer->send($mail);