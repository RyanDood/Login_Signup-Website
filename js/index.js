$("#indexLoginButton").on('click',function(){
    if(localStorage.getItem("loginEmail") != null){
        navigateToProfile()
    }
    else{
        navigateToLogin()
    }
})

function navigateToLogin(){
    location.href = "login.html";
}

function navigateToProfile(){
    location.href = "profile.html";
}