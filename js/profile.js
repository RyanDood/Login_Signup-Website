// Sending the user data via AJAX to the PHP server connecting MongoDB

$("#logoutButton").on('click',function(){                           
    var logoutRes = confirm("Do you want to logout?")
    if(logoutRes) {
        localStorage.removeItem("loginEmail");                                      // Deleting the Login Session
        location.href = 'login.html';
    }
})

var loginEmail = localStorage.getItem("loginEmail");

$("#update_button").on('click',function(){
    var name = $("#user_name").val();                                               // Fetching the user input data from UI
    var age = $("#user_age").val();
    var dob = $("#user_dob").val();
    var phoneNo = $("#user_phoneNo").val();
    if(name != ""){                                                                 // Checking if user input is not empty
        $("#errorName").css('display','none');  
        if(age != ""){
            $("#errorAge").css('display','none');
            if(dob != ""){
                $("#errorDOB").css('display','none');
                if(phoneNo != ""){
                    if(phoneNo.length == 10){
                        $.ajax({                                                    // Using Ajax for handling server side communication
                            type: 'POST',
                            data: {
                                email_u:  loginEmail,                                              // Sending the user data to php
                                name_u: name,
                                age_u: age,
                                dob_u: dob,
                                phoneNo_u: phoneNo
                            },
                            url: '/php/profile.php', // Connecting to php
                            success: function(data){                                // Successfully connected with php
                            var fetchedData = JSON.parse(data);                     // Displaying results based on fetched data
                                if(fetchedData.status == "true"){
                                    updateSuccess()
                                }
                                else if(fetchedData.status == "expired"){
                                    sessionExpired()
                                }
                            },
                            error: function(){                                      // Connection not successful with php
                                serverIssue()
                            }
                        });
                    }
                    else{
                        $("#errorPhoneNo").css('display','block');
                        $("#errorPhoneNo").text('Invalid Phone Number.')
                        $("#errorPhoneNo").css('color','red');
                    }
                }
                else{
                    $("#errorPhoneNo").css('display','block');
                    $("#errorPhoneNo").text('Enter your Phone No.')
                    $("#errorPhoneNo").css('color','red');
                }
            }
            else{
                $("#errorDOB").css('display','block');
                $("#errorDOB").text('Enter your DOB')
            }
        }
        else{
            $("#errorAge").css('display','block');
            $("#errorAge").text('Enter your age.')
        }
    }
    else{
        $("#errorName").css('display','block');
        $("#errorName").text('Enter your name.')
    }
})

// Success Message
function updateSuccess(){
    $("#displayStatus").css('display','block');
    $("#errorName").css('display','none');
    $("#errorAge").css('display','none');
    $("#errorDOB").css('display','none');
    $("#errorPhoneNo").css('display','block');
    $("#errorPhoneNo").text('Enter 10 digit Phone No')
    $("#errorPhoneNo").css('color','grey');
    $("#update_button").text('Updated')
    $(".loginButton").removeClass("btn btn-outline-dark")
    $(".loginButton").addClass("btn btn-success")
    setTimeout(()=> {
        $("#update_button").text('Update')
        $(".loginButton").removeClass("btn btn-success")
        $(".loginButton").addClass("btn btn-outline-dark")
    }
    ,3000);
}

// Server Issue Message
function serverIssue(){
    $("#errorName").css('display','none');
    $("#errorAge").css('display','none');
    $("#errorDOB").css('display','none');
    $("#errorPhoneNo").text('Server Issue, Try Later')
    $("#errorPhoneNo").css('display','block');
    $("#errorPhoneNo").css('color','white');
    $("#errorPhoneNo").css('text-align','center');
    $("#errorPhoneNo").css('border-radius','0.25rem');
    $("#errorPhoneNo").css('background-color','red');
    $("#errorPhoneNo").css('margin-top','20px');
}

function sessionExpired(){ // Session Expired Message
    $("#errorName").css('display','none');
    $("#errorAge").css('display','none');
    $("#errorDOB").css('display','none');
    $("#errorPhoneNo").text('Session Expired, Please Logout');
    $("#errorPhoneNo").css('display','block');
    $("#errorPhoneNo").css('color','white');
    $("#errorPhoneNo").css('text-align','center');
    $("#errorPhoneNo").css('border-radius','0.25rem');
    $("#errorPhoneNo").css('background-color','red');
    $("#errorPhoneNo").css('margin-top','20px');
}


