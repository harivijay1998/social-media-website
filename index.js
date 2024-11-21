const signbtn = document.getElementById("signin-btn");
const passwordInput = document.getElementById("pass_id");
const showPasswordIcon = document.getElementById("eye_slash");

signbtn.addEventListener("click", () => {
    signbtn.style.backgroundColor = "white";
    signbtn.style.color = "black";
    console.log("Button clicked");

    const mailInput = document.getElementById("mail_id");
    const password = passwordInput.value; 
    const mail = mailInput.value;

    console.log("Mail ID:", mail);
    console.log("Password:", password);

    const redmsg = document.querySelector(".msg");
    const userdetails = JSON.parse(localStorage.getItem("userprofile")) || [];
    console.log("User details from localStorage:", userdetails);

    if (mail === "" || password === "") {
        redmsg.innerHTML = "Please enter details in the field";
        mailInput.style.border = "1px solid red";
        passwordInput.style.border = "1px solid red";
        return;
    } else {
        mailInput.style.border = "1px solid #ccc";
        passwordInput.style.border = "1px solid #ccc";
    }

    let userFound = false;
    for (let user of userdetails) {
        if (user.email === mail && user.password === password) {
            userFound = true;
            console.log("Login successful");
            window.location.href = "home.html";
            break;
        }
    }

    if (!userFound) {
        console.log("Invalid password or user email");
        redmsg.innerHTML = "Invalid password or user email";
    }
});

showPasswordIcon.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showPasswordIcon.classList.remove("fa-eye-slash");
        showPasswordIcon.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        showPasswordIcon.classList.remove("fa-eye");
        showPasswordIcon.classList.add("fa-eye-slash");
    }
});
