// Sending the data which is entered by the user via AJAX to the PHP server connecting SQL

$("#register_button").on('click',function(){
    var email = $("#register_email").val();                 // Fetching the user input data from UI
    var password = $("#register_password").val();
    var confirm_password = $("#confirm_password").val();
    if(email != ""){                                        // Checking if user input is not empty
        if(email.slice(-4) == ".com"){
            $("#errorMail").css('display','none');
            if(password != ""){
                if(password.length > 8){
                    $("#passwordHelpBlock").css('display','none');
                    if(confirm_password != ""){
                        if(password == confirm_password){
                            $.ajax({                        // Using Ajax for handling server side communication
                                type: 'POST',
                                data: {                     // Sending the user data to php
                                    email_u: email,
                                    password_u: password
                                },
                                url: '/php/register.php',  // Connecting to php
                                success: function(data){                                  // Successfully connected with php
                                    var fetchedData = JSON.parse(data);                   // Displaying results based on fetched data
                                    if(fetchedData.status == "true"){
                                        registerSuccess()
                                    }
                                    else{
                                        registerFailed()
                                    }
                                },
                                error: function(){                                         // Connection not successful with php
                                    serverIssue()
                                }
                            });
                        }
                        else{
                            $("#errorPassword").css('display','block');
                            $("#errorPassword").text('Password did not match, Try again.')
                            $("#errorPassword").css('display','block');
                        }
                    }
                    else{
                        $("#errorPassword").css('display','block');
                        $("#errorPassword").text('Enter your Validation Password.')
                    }
                }
                else{
                    $("#passwordHelpBlock").css('display','block');
                    $("#passwordHelpBlock").text('Password must be 8-20 characters.')
                    $("#passwordHelpBlock").css('color','red');
                }
            }
            else{
                $("#passwordHelpBlock").css('display','block');
                $("#passwordHelpBlock").text('Enter your Password')
                $("#passwordHelpBlock").css('color','red');
            }
        }
        else{
            $("#errorMail").css('display','block');
            $("#errorMail").text('Enter valid email Ex:abc@gmail.com')
            $("#errorMail").css('color','red');
        }
    }
    else{
        $("#errorMail").css('display','block');
        $("#errorMail").text('Enter your email.')
        $("#errorMail").css('color','red');
    }
})

// Success Message
function registerSuccess(){
    $("#errorMail").css('display','none');
    $("#passwordHelpBlock").css('display','none');
    $("#errorPassword").text('Account Registered Successfully')
    $("#errorPassword").css('display','block');
    $("#errorPassword").css('color','white');
    $("#errorPassword").css('text-align','center');
    $("#errorPassword").css('border-radius','0.25rem');
    $("#errorPassword").css('background-color','mediumseagreen');
    $("#errorPassword").css('margin-top','20px');
    setTimeout(()=> {
        $("#errorPassword").text('Navigating to Login Page')
    }
    ,3000);
    setTimeout(()=> {
        navigatePage()
    }
    ,6000);
}

// Failure Message
function registerFailed(){
    $("#errorMail").css('display','none');
    $("#passwordHelpBlock").css('display','none');
    $("#errorPassword").text('Account already exists')
    $("#errorPassword").css('display','block');
    $("#errorPassword").css('color','white');
    $("#errorPassword").css('text-align','center');
    $("#errorPassword").css('border-radius','0.25rem');
    $("#errorPassword").css('background-color','red');
    $("#errorPassword").css('margin-top','20px');
}

// Server Issue Message
function serverIssue(){
    $("#errorMail").css('display','none');
    $("#passwordHelpBlock").css('display','none');
    $("#errorPassword").text('Account cannot be registered')
    $("#errorPassword").css('display','block');
    $("#errorPassword").css('color','white');
    $("#errorPassword").css('text-align','center');
    $("#errorPassword").css('border-radius','0.25rem');
    $("#errorPassword").css('background-color','red');
    $("#errorPassword").css('margin-top','20px');
}

// Navigating to other page
function navigatePage(){
    location.href = "login.html";
}
