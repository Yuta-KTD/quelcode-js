<?php
//文字出力コード、内部文字コードを宣言
mb_http_output('UTF-8');
mb_internal_encoding('UTF-8');
//応答のコンテンツタイプを宣言
header('Content-Type:application/json;charset=UTF-8');

//APIへの問合せURL作成
$appId = '4b5774e9f3d2a07b84f0f2f88e486224';
$url = 'http://api.openweathermap.org/data/2.5/weather?id=' . $_GET['capital_id'] . '&appid=' . $appId;

//結果を出力
print(file_get_contents($url, false, stream_context_create(['http' => ['header' => 'User-Agent:MySample']])));
