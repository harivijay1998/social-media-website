let form = document.getElementById("form");
let firstname = document.getElementById("firstName");
let lastname = document.getElementById("lastName");
let addname = document.getElementById("addName");
let username = document.getElementById("username");
let birthday = document.getElementById("birthDay");
let mob_no = document.getElementById("phone_no");
let mail = document.getElementById("mailid");
let content = document.getElementById("overview");

form.addEventListener("submit", (e) => {
  e.preventDefault();
   firstname = document.getElementById("firstName").value;
   lastname = document.getElementById("lastName").value;
   addname = document.getElementById("addName").value;
   username = document.getElementById("username").value;
   birthday = document.getElementById("birthDay").value;
   mob_no = document.getElementById("phone_no").value;
   mail = document.getElementById("mailid").value;
   content = document.getElementById("overview").value;

   const accountDetails={
    firstName:firstname,
    lastName:lastname,
    addName:addname,
    userName:username,
    birthday:birthday,
    mob_no:phone_no,
    mail:mail,
    descrption:content
   }

   const storeddetails = JSON.parse(localStorage.getItem("details"));
   if(!Array.isArray(storeddetails)){
    storeddetails=[];
   }

   localStorage.setItem("details",JSON.stringify(accountDetails))

   

});
