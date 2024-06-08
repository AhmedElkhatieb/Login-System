document.addEventListener("DOMContentLoaded", function() {
    var userName = localStorage.getItem("userName");
    if (userName) {
      printName(userName + "!");
    }
  });

  function printName(str) {
    var printedName = document.getElementById("str");
    if (printedName) {
      printedName.innerHTML = str;
    }
  }