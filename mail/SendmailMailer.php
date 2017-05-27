<?php
use Nette\Mail\Message;
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2017/5/27
 * Time: 14:49
 */
class SendmailMailer
{
    public function sendmail()
    {
        $mail = new Message;
        $mail->setFrom('John <john@example.com>')
            ->addTo('peter@example.com')
            ->addTo('jack@example.com')
            ->setSubject('Order Confirmation')
            ->setBody("Hello, Your order has been accepted.");
    }
}