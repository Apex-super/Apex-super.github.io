// main.js —— 这个文件只做两件事

// 第一件：统一入口。等页面 HTML 解析完再执行，
// 否则脚本可能在元素还不存在时就去取它，导致 null 报错。
document.addEventListener("DOMContentLoaded", function () {

  // ---- 功能一：深浅主题切换 ----
  // 取到按钮元素。id 和 index.html 里的 id="themeToggle" 必须一致。
  var toggleButton = document.getElementById("themeToggle");

  // 按钮存在才绑定事件，避免在别的页面上用这个脚本时出错。
  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      // classList.toggle 的含义：有这个类就删掉，没有就加上。
      // 切换的其实是 CSS 里 body.dark 那组变量。
      var isDark = document.body.classList.toggle("dark");
      // 按钮文字跟着状态变，让用户知道当前可切到哪个方向。
      toggleButton.textContent = isDark ? "Light mode" : "Dark mode";
      // 记住用户的选择，下次打开还是这个主题。
      // localStorage 是浏览器本地存储，只存在这台机器上。
      try {
        localStorage.setItem("theme", isDark ? "dark" : "light");
      } catch (e) {
        // 隐私模式或存储被禁用时会抛异常，忽略即可，不影响页面功能。
      }
    });

    // 页面加载时读回上次的选择并应用。
    try {
      if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        toggleButton.textContent = "Light mode";
      }
    } catch (e) {
      // 同上，读不到就保持默认亮色。
    }
  }

  // ---- 功能二：页脚显示最后更新日期 ----
  var lastUpdated = document.getElementById("lastUpdated");
  if (lastUpdated) {
    // new Date() 取当前时间，toLocaleDateString 按本地习惯格式化。
    lastUpdated.textContent = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

});
