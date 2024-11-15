const signup = document.getElementById("singup");
const validmsg = document.getElementById("msg4");
signup.addEventListener("click", () => {
  const newmail = document.getElementById("signup-mail").value;
  console.log("mail", newmail);
  const newpass = document.getElementById("new-pass").value;
  const confirm = document.getElementById("con-pass").value;

  const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const users = {
    email: newmail,
    password: newpass,
  };

  localStorage.setItem("userprofile", JSON.stringify(users));

  const userdetail = JSON.parse(localStorage.getItem("userprofile"));
  if (
    emailPattern.test(newmail) &&
    newpass === confirm &&
    passwordPattern.test(confirm)
  ) {
    window.location.href = "index.html";
  } else {
    validmsg.innerHTML = "enter valid details";
    newmail.style.border = "1px solid red";
    newpass.style.border = "1px solid red";
    confirm.style.border = "1px solid red";
  }
});
