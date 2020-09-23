"use strict";

//script要素を作成するcreateURL関数を作成
const createScript = () => {
  //天気API問合せURLの作成
  //show関数を呼び出すためのcallback=showをつける
  const base_url =
    "http://api.openweathermap.org/data/2.5/weather?callback=show&id=";
  const appid = "4b5774e9f3d2a07b84f0f2f88e486224";
  //選択した都市のIDを取得
  let capital_id = encodeURIComponent(
    document.getElementById("capital_id").value
  );
  //capital_idが入力されていない場合→ページに最初にアクセスした場合、ロンドンのIDを取得
  if (capital_id === null) {
    capital_id = 2643743;
  }
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
    let old_weather_script = document.getElementById("weather_script");
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
document.addEventListener("DOMContentLoaded", createScript(), false);

//「送信」ボタンクリック時
document.getElementById("btn").addEventListener("click", createScript(), false);

//受け取ったweather_dataを引数にコールバック関数showを実行
const show = (weather_data) => {
  if (weather_data === null) {
    result_main.textContent = "データの取得に失敗しました。";
  } else {
    //天気情報
    capital.textContent = `${weather_data.name} の現在の天気`;
    result_main.textContent = weather_data.weather[0].main;
    //現在の天気の画像を取得し<img>要素に出力
    const icon = document.getElementById("icon");
    const img = document.createElement("img");
    const weather_icon_img = weather_data.weather[0].icon;
    img.src = `http://openweathermap.org/img/w/${weather_icon_img}.png`;
    img.alt = weather_data.name;
    img.height = 60;
    img.width = 60;
    //画像の入れ替え
    if (icon.getElementsByTagName("img").length > 0) {
      icon.replaceChild(img, icon.lastChild);
    } else {
      icon.appendChild(img);
    }
    //気温を摂氏にて小数点第一位まで四捨五入で表示
    temperature.textContent =
      Math.round((weather_data.main.temp - 273.15) * 10) / 10;
    //湿度
    humidity.textContent = weather_data.main.humidity;
  }
};
