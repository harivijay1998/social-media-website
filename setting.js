let form = document.getElementById("form");
let firstname = document.getElementById("firstName");
let lastname = document.getElementById("lastName");
let addname = document.getElementById("addName");
let username = document.getElementById("username");
let birthday = document.getElementById("birthDay");
let mob_no = document.getElementById("phone_no");
let mail = document.getElementById("mailid");
let content = document.getElementById("overview");

let userdetail = JSON.parse(localStorage.getItem("userprofile")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const accountDetails = {
    firstName: firstname.value,
    lastName: lastname.value,
    addName: addname.value,
    userName: username.value,
    birthday: birthday.value,
    mob_no: mob_no.value,
    mail: mail.value,
    description: content.value,
  };

  let storeddetails = JSON.parse(localStorage.getItem("details")) || [];
  storeddetails.push(accountDetails);
  localStorage.setItem("details", JSON.stringify(storeddetails));
});

const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

let accountbtn = document.querySelector(".btn");
let currentpass = document.getElementById("current-password");
let newpassword = document.getElementById("new-password");
let confirmpass = document.getElementById("confirm-password");

accountbtn.addEventListener("click", () => {
  const currentpassValue = currentpass.value;
  const newpasswordValue = newpassword.value;
  const confirmpassValue = confirmpass.value;

  let userIndex = userdetail.findIndex(user => user.password === currentpassValue);

  if (userIndex !== -1) {
    if (newpasswordValue === confirmpassValue && passwordPattern.test(newpasswordValue)) {
      userdetail[userIndex].password = newpasswordValue;
      localStorage.setItem("userprofile", JSON.stringify(userdetail));
      alert("Password changed successfully!");
    } else {
      alert("New passwords do not match or do not meet the criteria.");
    }
  } else {
    alert("Current password is incorrect.");
  }
});
