document.addEventListener(
  "DOMContentLoaded",
  function () {
    //選択された都市を取得
    document.getElementById("btn").addEventListener(
      "click",
      function () {
        //<div>の各id要素を取得
        var result_main = document.getElementById("result_main");
        var icon = document.getElementById("icon");
        var temperature = document.getElementById("temperature");
        var humidity = document.getElementById("humidity");
        var xhr = new XMLHttpRequest();

        xhr.addEventListener(
          "loadstart",
          function () {
            result_main.textContent = "通信中...";
          },
          false
        );

        xhr.addEventListener(
          "load",
          function () {
            //JSONデータ取得
            var weather_data = JSON.parse(xhr.responseText);
            //あとで消す
            console.log(weather_data);
            if (weather_data === null) {
              result_main.textContent = "存在しない地域を選択しています。";
            } else {
              //天気情報
              //https://openweathermap.org/weather-conditions#How-to-get-icon-URLを参考に700番台以外は日本語で天気表示
              result_main.textContent = weather_data.weather[0].main;
              //現在の天気の画像を取得し<img>要素に出力
              var img = document.createElement("img");
              var weather_icon_img = weather_data.weather[0].icon;
              img.src =
                "http://openweathermap.org/img/w/" + weather_icon_img + ".png";
              img.alt = weather_data.name;
              img.height = 100;
              img.width = 100;
              //
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
          },
          false
        );

        xhr.addEventListener("error", function () {
          result_main.textContent = "サーバーエラーが発生しました。";
        });

        xhr.open(
          "GET",
          "php/weather.php?capital_id=" +
            encodeURIComponent(document.getElementById("capital_id").value),
          true
        );
        xhr.send(null);
      },
      false
    );
    //初期値の設定
    //setListValue("capital_id", "2643743");
  },
  false
);
