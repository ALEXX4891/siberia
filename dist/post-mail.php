<?php
// несколько получателей
$to = 'alexx4891@mail.ru';

// $to  = 'aidan@example.com' . ', ';  // обратите внимание на запятую
// $to .= 'wez@example.com';

// тема письма
$subject = 'Письмо с моего сайта';

// текст письма
// $message = 'Пользователь' . $_POST['name'] . ' отправил вам письмо:<br />' . $_POST['message'] . '<br />
// Связяться с ним можно по email <a href="mailto:' . $_POST['email'] . '">' . $_POST['email'] . '</a>';
$message = 'Пользователь ' . $_POST['name'] . ' заказал звонок на номер:<br />' . $_POST['phone'] . '.<br />
Связяться с ним можно по email <a href="mailto:' . $_POST['email'] . '">' . $_POST['email'] . '</a>.';

// Для отправки HTML-письма должен быть установлен заголовок Content-type
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 

// Дополнительные заголовки
$headers .= 'To: Иван <Ivan@example.com>' . "\r\n"; // Свое имя и email
// $headers .= 'From: '  . $_POST['name'] . '<' . $_POST['email'] . '>' . "\r\n";
$headers .= 'From: '  . $_POST['name'] . '<' . $_POST['name'] . '>' . "\r\n";



// Отправляем
mail($to, $subject, $message, $headers);

// header('Location: ' . index.html);



