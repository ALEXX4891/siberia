<?php

$inputData = file_get_contents('php://input');

if (!$inputData) {
  die('No data');
}

if ($inputData) {
  $data = json_decode($inputData, true);
  $arrKeys = array_keys($data);
  $arrData = [];

  foreach ($arrKeys as $key) {

    if ($key == 'name') {
      // $arrData['function'] = $data[$key];
      $name = $data[$key];
    }
    if ($key == 'phone') {
      // $arrData['all'] = $data[$key];
      $phone = $data[$key];
    }
    if ($key == 'email') {
      // $arrData['table'] = $data[$key];
      $email = $data[$key];
    }
    if ($key == 'message') {
      // $arrData['id'] = $data[$key];
      $message = $data[$key];
    }
    if ($key == 'project') {
      // $arrData['function'] = $data[$key];
      $project = $data[$key];
    }
    if ($key == 'numbers_of_rooms') {
      // $arrData['all'] = $data[$key];
      $numbers_of_rooms = $data[$key];
    }
    if ($key == 'area') {
      // $arrData['area'] = $data[$key];
      $area = $data[$key];
    }
    if ($key == 'balcony') {
      // $arrData['id'] = $data[$key];
      $balcony = $data[$key];
    }
    if ($key == 'dressing_room') {
      // $arrData['dressing_room'] = $data[$key];
      $dressing_room = $data[$key];
    }
    if ($key == 'taxNumber') {
      // $arrData['taxNumber'] = $data[$key];
      $taxNumber = $data[$key];
    }
    if ($key == 'side_2') {
      // $arrData['side_2'] = $data[$key];
      $side_2 = $data[$key];
    }
    if ($key == 'side_3') {
      // $arrData['side_3'] = $data[$key];
      $side_3 = $data[$key];
    }
    if ($key == 'guest_bathroom') {
      // $arrData['guest_bathroom'] = $data[$key];
      $guest_bathroom = $data[$key];
    }
    if ($key == 'kitchen_living_room') {
      // $arrData['kitchen_living_room'] = $data[$key];
      $kitchen_living_room = $data[$key];
    }
  }
}

// несколько получателей
$to = 'alexx4891@mail.ru';

// $to  = 'aidan@example.com' . ', ';  // обратите внимание на запятую
// $to .= 'wez@example.com';

// тема письма
$subject = 'Заявка с моего сайта';

// текст письма
// $message = 'Пользователь' . $_POST['name'] . ' отправил вам письмо:<br />' . $_POST['message'] . '<br />
// Связяться с ним можно по email <a href="mailto:' . $_POST['email'] . '">' . $_POST['email'] . '</a>';
$message = '<h1>Запрос планировок:</h1><br/>
Пользователь ' . $name . '.<br />
Email <a href="mailto:' . $email . '">' . $email . '</a>.<br /> 
Телефон <a href="tel:' . $phone . '">' . $phone . '</a>.<br />
Сообщение от пользователя: ' . $message . '.<br />
Интересует проект: ' . $project . '.<br />
Количество комнат: ' . $numbers_of_rooms . '.<br />
Площадь: ' . $area . '.<br />
Балкон: ' . $balcony . '.<br />
Гардеробная: ' . $dressing_room . '.<br />
Окна на 2 стороны: ' . $side_2 . '.<br />
Окна на 3 стороны: ' . $side_3 . '.<br />
Гостевой санузел: ' . $guest_bathroom . '.<br />
Кухня-гостинная: ' . $kitchen_living_room;






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



