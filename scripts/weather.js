//初期値（ロンドン）の設定
document.addEventListener(
  "DOMContentLoaded",
  function () {
    //問合せURLを作成
    //show関数を呼び出すためのcallback=showをつけたURLを作成
    $appId = "4b5774e9f3d2a07b84f0f2f88e486224";
    var url =
      "http://api.openweathermap.org/data/2.5/weather?callback=show&id=2643743" +
      "&appid=" +
      $appId;
    //script要素の作成
    var script = document.createElement("script");
    script.src = url;
    document.getElementsByTagName("body").item(0).appendChild(script);
  },
  false
);

//「送信」ボタンクリック時
document.getElementById("btn").addEventListener(
  "click",
  function () {
    $appId = "4b5774e9f3d2a07b84f0f2f88e486224";
    //問合せURLを作成
    //show関数を呼び出すためのcallback=showをつけた
    var url =
      "http://api.openweathermap.org/data/2.5/weather?callback=show&id=" +
      encodeURIComponent(document.getElementById("capital_id").value) +
      "&appid=" +
      $appId;
    //script要素の作成
    var script = document.createElement("script");
    script.src = url;
    document.getElementsByTagName("body").item(0).appendChild(script);
  },
  false
);

//受け取ったweather_dataを引数にコールバック関数showを実行
function show(weather_data) {
  if (weather_data === null) {
    result_main.textContent = "データの取得に失敗しました。";
  } else {
    //天気情報
    capital.textContent = weather_data.name + "の現在の天気";
    result_main.textContent = weather_data.weather[0].main;
    //現在の天気の画像を取得し<img>要素に出力
    var img = document.createElement("img");
    var weather_icon_img = weather_data.weather[0].icon;
    img.src = "http://openweathermap.org/img/w/" + weather_icon_img + ".png";
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
}
