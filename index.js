const signbtn = document.getElementById("signin-btn");
signbtn.addEventListener("click", () => {
  signbtn.style.backgroundColor = "white";
  signbtn.style.color = "black";
  console.log("button clicked");

  const mailInput = document.getElementById("mail_id");
  const passwordInput = document.getElementById("pass_id");

  const mail = mailInput.value;
  const password = passwordInput.value;

  console.log("mail id", mail);
  console.log("pass", password);

  const redmsg = document.querySelector(".msg");
  const redmsg1 = document.querySelector(".msg1");

  const userdetail = JSON.parse(localStorage.getItem("userprofile"));
  console.log("userdetail", userdetail);

  if (mail === "" || password === "") {
    redmsg.innerHTML = "Please enter details in the field";

    mailInput.style.border = "1px solid red";
    passwordInput.style.border = "1px solid red";

    return;
  } else {
    mailInput.style.border = "1px solid #ccc";
    passwordInput.style.border = "1px solid #ccc";
  }

  if (mail === userdetail.email && password === userdetail.password) {
    window.location.href = "home.html";
  } else {
    redmsg.innerHTML = "Invalid password or user email";
  }
});
