var uName = document.getElementById("uName");
var uEmail = document.getElementById("uEmail");
var uPassword = document.getElementById("uPassword");
var signUpBtn = document.getElementById("signup-btn");
signUpBtn?.addEventListener("click", signUp);
var currentUser = null;
if (localStorage.getItem("newUser") !== null) {
  newUsersList = JSON.parse(localStorage.getItem("newUser"));
} else {
  newUsersList = [];
}

function signUp() {
  var newUser = {
    name: uName.value,
    email: uEmail.value,
    password: uPassword.value,
  };
  if (
    validation("uName", uName.value) &&
    validation("uPassword", uPassword.value) &&
    validation("uEmail", uEmail.value)
  ) {
    var emailExists = false;
    for (var i = 0; i < newUsersList.length; i++) {
      if (newUsersList[i].email === uEmail.value) {
        emailExists = true;
        break;
      }
    }
    if (!emailExists) {
      newUsersList.push(newUser);
      localStorage.setItem("newUser", JSON.stringify(newUsersList));
      window.location.href = "index.html";
    } else {
      console.log("Email already exists!");
      var exist = document.getElementById("exist");
      exist.classList.replace("d-none", "d-block");
    }
  } else {
    console.log("Validation failed");
  }
}

var newUser = JSON.parse(localStorage.getItem("newUser"));

var eEmail = document.getElementById("eEmail");
var ePassword = document.getElementById("ePassword");

var signInBtn = document.getElementById("signInBtn");
signInBtn?.addEventListener("click", login);

function login() {
  var eUser = {
    email: eEmail.value,
    password: ePassword.value,
  };
  var wrongPass = document.getElementById("wrong-pass");
  var wrongEmail = document.getElementById("email-exist");
  var e = false;
  var p = false;
  if (newUser) {
    for (var i = 0; i < newUser.length; i++) {
      if (
        newUser[i].email === eUser.email &&
        newUser[i].password === eUser.password
      ) {
        e = true;
        p = true;
        currentUser = newUser[i].name;
        break;
        // printName(newUser[i].name);
      } else if (newUser[i].email === eUser.email) {
        e = true;
      }
    }
    if (e && p) {
      wrongEmail.classList.replace("d-block", "d-none");
      wrongPass.classList.replace("d-block", "d-none");
      localStorage.setItem("userName", newUser[i].name);
      window.location.href = "home.html";
    } else if (e) {
      wrongPass.classList.replace("d-none", "d-block");
      wrongEmail.classList.replace("d-block", "d-none");
    } else {
      wrongPass.classList.replace("d-block", "d-none");
      wrongEmail.classList.replace("d-none", "d-block");
    }
  } else {
    wrongEmail.classList.replace("d-none", "d-block");
  }
}

var selectedInput = document.querySelectorAll(".selected-input");
for (var i = 0; i < selectedInput.length; i++) {
  selectedInput[i].addEventListener("input", function (e) {
    var inputId = e.target.id;
    var inputValue = e.target.value;
    validation(inputId, inputValue);
  });
}

function validation(id, value) {
  var regex = {
    uName: /^[A-Z][a-z]{2,20} ?([A-Z][a-z]{1,20})?$/,
    uEmail: /^.+@.+\..+$/,
    uPassword: /^.+$/,
  };
  var inputElm = document.getElementById(id);
  if (regex[id].test(value) == true) {
    inputElm.classList.add("is-valid");
    inputElm.classList.remove("is-invalid");
    inputElm.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    inputElm.classList.add("is-invalid");
    inputElm.classList.remove("is-valid");
    inputElm.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
function printName(str, span) {
  span.innerHTML = str;
}
