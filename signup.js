const signup = document.getElementById("singup");
const validmsg = document.getElementById("msg4");
const showpassword = document.getElementById("eye_slash");
let newpass = document.getElementById("new-pass");
let confirm = document.getElementById("con-pass");


signup.addEventListener("click", () => {
  const newmail = document.getElementById("signup-mail").value;
  newpass = document.getElementById("new-pass").value;
  confirm = document.getElementById("con-pass").value;

  const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const users = {
    email: newmail,
    password: newpass,
  };

  let userdetail = localStorage.getItem("userprofile");
  userdetail = userdetail ? JSON.parse(userdetail) : []; 

  if (!Array.isArray(userdetail)) {
    userdetail = []; 
  }

  if (
    emailPattern.test(newmail) &&
    newpass === confirm &&
    passwordPattern.test(confirm)
  ) {
    userdetail.push(users);

    localStorage.setItem("userprofile", JSON.stringify(userdetail));

    window.location.href = "index.html";
  } else {
    
    document.getElementById("signup-mail").style.border = "1px solid red";
    document.getElementById("new-pass").style.border = "1px solid red";
    document.getElementById("con-pass").style.border = "1px solid red";
  }
});

showpassword.addEventListener("click", () => {
  if (newpass.type === "password") {
    console.log("button-clicked");
    newpass.type = "text";
    confirm.type = "text";
    showpassword.classList.remove("fa-eye-slash");
    showpassword.classList.add("fa-eye");
  } else {
    newpass.type = "password";
    confirm.type = "password";
    showpassword.classList.remove("fa-eye");
    showpassword.classList.add("fa-eye-slash");
  }
});
