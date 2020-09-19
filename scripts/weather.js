document.addEventListener(
  "DOMContentLoaded",
  function () {
    //選択された都市を取得
    document.getElementById("btn").addEventListener(
      "click",
      function () {
        var capital = document.getElementById("capital");
        console.log(capital.value);
      },
      false
    );
  },
  false
);
