"use strict";

//初期値としてロンドンの都市IDを定義
const capital_id_London = 2643743;
//問合せURLの定数準備
const base_url =
  "http://api.openweathermap.org/data/2.5/weather?callback=show&id=";
const appid = "4b5774e9f3d2a07b84f0f2f88e486224";
//script要素を作成するcreateURL関数を作成
const createScript = () => {
  //show関数を呼び出すためのcallback=showをつける
  //初期値かselectで取得した値をcapital_idとする
  const capital_id =
    encodeURIComponent(document.getElementById("capital_id").value) ??
    capital_id_London;
  //問合せURL
  const url = `${base_url}${capital_id}&appid=${appid}`;
  //scriptタグとその要素を作成
  const new_weather_script = document.createElement("script");
  new_weather_script.src = url;
  new_weather_script.id = "weather_script";
  //scriptの置き換え
  //既存の問合せ用scriptを検索
  if (document.getElementById("weather_script") !== null) {
    //すでに要素が存在する場合はscriptタグを書き換え
    const old_weather_script = document.getElementById("weather_script");
    document
      .getElementsByTagName("body")
      .item(0)
      .replaceChild(new_weather_script, old_weather_script);
  } else {
    //最初のロード時はscriptタグの新規作成のみ
    document
      .getElementsByTagName("body")
      .item(0)
      .appendChild(new_weather_script);
  }
};

//HTMLロード完了時
document.addEventListener("DOMContentLoaded", createScript, false);

//国選択時
document
  .getElementById("capital_id")
  .addEventListener("change", createScript, false);

//受け取ったweather_dataを引数にコールバック関数showを実行
const show = (weather_data) => {
  if (!weather_data) {
    return (result_main.textContent =
      "選択範囲外の都市データを入力していませんか？");
  }
  //天気情報
  capital.textContent = `${weather_data.name} の現在の天気`;
  result_main.textContent = weather_data.weather[0].main;
  //HTMLに用意した<img>タグを取得し、要素をいれる
  const icon = document.getElementById("icon");
  const weather_icon_img = weather_data.weather[0].icon;
  icon.src = `http://openweathermap.org/img/w/${weather_icon_img}.png`;
  icon.alt = weather_data.name;
  //気温を摂氏にて小数点第一位まで四捨五入で表示
  temperature.textContent =
    Math.round((weather_data.main.temp - 273.15) * 10) / 10;
  //湿度
  humidity.textContent = weather_data.main.humidity;
};
