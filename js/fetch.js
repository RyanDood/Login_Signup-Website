// Fetching the user data via AJAX to the PHP server connecting MongoDB

// Using Ajax for handling server side communication
$.ajax({ 
    type: 'GET',
    url: '/php/fetch.php', // Connecting to php
    success: function(data){                              // Successfully connected with php
    var fetchedData = JSON.parse(data);                   // Displaying results based on fetched data
        if(fetchedData.status == "fetched"){
            $("#user_name").val(fetchedData.f_name)
            $("#user_age").val(fetchedData.f_age)
            $("#user_dob").val(fetchedData.f_dob)
            $("#user_phoneNo").val(fetchedData.f_phoneNo)
        }
        else if(fetchedData.status == "not_fetched"){

        }
    },
    error: function(){ // Connection not successful with php
        serverIssue()
    }
});

function serverIssue(){ // Server Issue Message
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