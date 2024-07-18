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
    if ($key == 'agency') {
      // $arrData['table'] = $data[$key];
      $agency = $data[$key];
    }
    if ($key == 'agentName') {
      // $arrData['function'] = $data[$key];
      $agentName = $data[$key];
    }
    if ($key == 'agentPhone') {
      // $arrData['all'] = $data[$key];
      $agentPhone = $data[$key];
    }
    if ($key == 'clientName') {
      // $arrData['function'] = $data[$key];
      $clientName = $data[$key];
    }
    if ($key == 'clientPhone') {
      // $arrData['all'] = $data[$key];
      $clientPhone = $data[$key];
    }
    if ($key == 'message') {
      // $arrData['id'] = $data[$key];
      $message = $data[$key];
    }
  }
}

// несколько получателей
$to = 'info@sibir.com';

// $to  = 'aidan@example.com' . ', ';  // обратите внимание на запятую
// $to .= 'wez@example.com';

// тема письма
$subject = 'Заявка с моего сайта';

// текст письма
// $message = 'Пользователь' . $_POST['name'] . ' отправил вам письмо:<br />' . $_POST['message'] . '<br />
// Связяться с ним можно по email <a href="mailto:' . $_POST['email'] . '">' . $_POST['email'] . '</a>';
$message = '<h1>Уведомление:</h1><br/>
Агенство: ' . $agency . '.<br />
Имя агента:' . $agentName . '</a>.<br /> 
Телефон агента: <a href="tel:' . $agentPhone . '">' . $agentPhone . '</a>.<br />
Имя клиента:' . $clientName . '</a>.<br /> 
Телефон клиента: <a href="tel:' . $agentPhone . '">' . $agentPhone . '</a>.<br />
Сообщение: ' . $message;






// Для отправки HTML-письма должен быть установлен заголовок Content-type
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Дополнительные заголовки
// $headers .= 'To: Иван <Ivan@example.com>' . "\r\n"; // Свое имя и email
// $headers .= 'From: '  . $_POST['name'] . '<' . $_POST['email'] . '>' . "\r\n";
// $headers .= 'From: '  . $_POST['name'] . '<' . $_POST['name'] . '>' . "\r\n";



// Отправляем
mail($to, $subject, $message, $headers);

// header('Location: ' . index.html);
