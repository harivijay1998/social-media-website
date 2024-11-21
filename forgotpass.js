const resetBtn = document.getElementById("for-passBtn");
const sucess = document.querySelector(".msg6");
const invalidmail = document.querySelector(".msg5");
const showpassword = document.getElementById("eye_slash");
let forpass = document.getElementById("for-pass");

resetBtn.addEventListener("click", () => {
    console.log("button clicked");
    resetBtn.style.backgroundColor = "white";
    resetBtn.style.color = "black ";

    const formail = document.getElementById("for-mail").value;
    forpass = document.getElementById("for-pass").value;
    const passwordPattern =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const userdetails = JSON.parse(localStorage.getItem("userprofile")) || [];

    if (userdetails.length === 0) {
        invalidmail.innerHTML = "No user profiles found, please register.";
        return;
    }

    const userIndex = userdetails.findIndex(user => user.email === formail);

    if (userIndex !== -1) {
        console.log("User found, proceeding with password check...");
        if (passwordPattern.test(forpass)) {
            sucess.innerHTML = "Password reset successfully.";
            userdetails[userIndex].password = forpass;
            localStorage.setItem("userprofile", JSON.stringify(userdetails));
            console.log("Updated password:", userdetails[userIndex].password);
            window.location.href = "index.html";
        } else {
            sucess.innerHTML = "Enter a valid password.";
            document.getElementById("for-pass").style.border = "1px solid red";
        }
    } else {
        invalidmail.innerHTML = "Entered email is not matching, please register.";
    }
});

showpassword.addEventListener("click", () => {
    if (forpass.type === "password") {
        console.log("button-clicked");
        forpass.type = "text";
        showpassword.classList.remove("fa-eye-slash");
        showpassword.classList.add("fa-eye");
    } else {
        forpass.type = "password";
        showpassword.classList.remove("fa-eye");
        showpassword.classList.add("fa-eye-slash");
    }
});
