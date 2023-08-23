// Sending the data which is entered by the user via AJAX to the PHP server connecting SQL

$("#LoginButton").on('click',function(){
    var user_email = $("#user_email").val();                        // Fetching the user input data from UI
    var user_password = $("#user_password").val();
    if(user_email != ""){                                           // Checking if user input is not empty
        if(user_email.slice(-4) == ".com"){
            $("#errorMail2").css('display','none');
            if(user_password != ""){
                $("#passwordHelpBlock").css('display','none');
                $.ajax({                                            // Using Ajax for handling server side communication
                    type: 'POST',
                    data: {                                         // Sending the user data to php
                        email_u: user_email,
                        password_u: user_password
                    },
                    url: '/php/login.php',   // Connecting to php
                    success: function(data){                                        // Successfully connected with php
                        var fetchedData = JSON.parse(data);                         // Displaying results based on fetched data
                        if(fetchedData.status == "true"){
                            loginSuccess()
                            localStorage.setItem("loginEmail",user_email);          // Storing Login Session in local storage
                        }
                        else{
                            loginFailed()
                        }
                    },
                    error: function(){                                      // Connection not successful with php
                        serverIssue()
                    }
                });

            }
            else{
                $("#errorPassword").css('display','block');
                $("#errorPassword").text('Enter your password.')
            }
        }
        else{
            $("#errorMail2").css('display','block');
            $("#errorMail2").text('Enter valid email Ex:abc@gmail.com')
        }
    }
    else{
        $("#errorMail2").css('display','block');
        $("#errorMail2").text('Enter your email.')
    }
})

// Success Message
function loginSuccess(result){
    $("#errorMail2").css('display','none');
    $("#errorPassword").text('Login Successfull')
    $("#errorPassword").css('display','block');
    $("#errorPassword").css('color','white');
    $("#errorPassword").css('text-align','center');
    $("#errorPassword").css('border-radius','0.25rem');
    $("#errorPassword").css('background-color','mediumseagreen');
    $("#errorPassword").css('margin-top','20px');
    setTimeout(()=> {
        navigatePage()
    }
    ,2000);
}

// Failure Message
function loginFailed(){
    $("#errorMail2").css('display','none');
    $("#errorPassword").text('Invalid Login Credentials')
    $("#errorPassword").css('display','block');
    $("#errorPassword").css('color','white');
    $("#errorPassword").css('text-align','center');
    $("#errorPassword").css('border-radius','0.25rem');
    $("#errorPassword").css('background-color','red');
    $("#errorPassword").css('margin-top','20px');
}

// Server Issue Message
function serverIssue(){
    $("#errorMail2").css('display','none');
    $("#errorPassword").text('Server Issue, Try Again Later');
    $("#errorPassword").css('display','block');
    $("#errorPassword").css('color','white');
    $("#errorPassword").css('text-align','center');
    $("#errorPassword").css('border-radius','0.25rem');
    $("#errorPassword").css('background-color','red');
    $("#errorPassword").css('margin-top','20px');
}

// Navigating to other page
function navigatePage(){
    location.href = "profile.html";
}


   