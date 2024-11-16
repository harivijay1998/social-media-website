const resetBtn = document.getElementById("for-passBtn")
const sucess = document.querySelector(".msg6")
const invalidmail = document.querySelector(".msg5")
const showpassword = document.getElementById("eye_slash")
const forpass =document.getElementById("for-pass")

resetBtn.addEventListener("click",()=>{
    console.log("button clicked")
    resetBtn.style.backgroundColor="white"
    resetBtn.style.color="black "

    const formail = document.getElementById("for-mail").value
     forpass = document.getElementById("for-pass").value
    const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const userdetail = JSON.parse(localStorage.getItem("userprofile"));

    if(formail === userdetail.email){
        console.log("successfull checked")
        if(passwordPattern.test(forpass)){
            sucess.innerHTML="password reset successfully"
            userdetail.password= forpass;
            localStorage.setItem("userprofile",JSON.stringify(userdetail))
            console.log("updated password:",userdetail.password)
            window.location.href="index.html"
        }
        else{
            sucess.innerHTML="enter valid password"
            forpass.style.border="1px solid red"
        }
    }
    else{
        invalidmail.innerHTML="entered mail id is not matching , please register"
        formail.style.border="1px solid red"
    }

})

showpassword.addEventListener("click",()=>{
    if(forpass.type === "password"){
        console.log("button-clicked")
        forpass.type="text"
        showpassword.classList.remove("fa-eye-slash"); // Assuming using FontAwesome or similar
    showpassword.classList.add("fa-eye");
    }
    else{
        forpass.type="password"
        showpassword.classList.remove("fa-eye"); // Assuming using FontAwesome or similar
    showpassword.classList.add("fa-eye-slash");
    }

})