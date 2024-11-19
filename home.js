const viewprofile= document.getElementById("profile-pic")

viewprofile.addEventListener("click",()=>{
    console.log("btn clicked")
    const drop = document.querySelector(".dropdown");
    if(drop.style.display==="block"){
        drop.style.display="none"
    }
    else{
        drop.style.display="block"
    }
    
})