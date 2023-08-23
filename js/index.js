$("#indexLoginButton").on('click',function(){
    if(localStorage.getItem("loginEmail") != null){      // Navigating directly to profile if session present
        navigateToProfile()
    }
    else{
        navigateToLogin()                               // Navigating directly to login if session absent
    }
})

function navigateToLogin(){
    location.href = "login.html";
}

function navigateToProfile(){
    location.href = "profile.html";
}