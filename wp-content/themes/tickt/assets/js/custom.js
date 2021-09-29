$( document ).ready(function() {
	$('#tickt_login').on('submit', function(e) {
		e.preventDefault();
        //console.log("Form submitted");
		var $form = $(this);
        $('.ajax-loader').css('visibility', 'visible');
		$.post($form.attr('action'), $form.serialize(), function(data) {
            //alert('This is data returned from the server ' + data);
            
            //console.log(data);
            if((data.status == true && data.status_code == 200) || (data.status == true && data.status_code == true)) {
                $('.ajax-loader').css('visibility', 'hidden');
                window.location.href = window.location;
            } else {
                $('#login_action_msg').text(data.message);
                $('.ajax-loader').css('visibility', 'hidden');
            }
            //$('#login_action_msg').text(data.message + ' Status is '+ data.status + ' -- code is -- '+ data.status_code);
            
		}, 'json');
	});


    // Forget Password Ajax Call
    $('#forget_pwd').on('submit', function(e) {
		e.preventDefault();
        //console.log("Form submitted");
		var $form = $(this);
        console.log($form);
		$.post($form.attr('action'), $form.serialize(), function(data) {
            //alert('This is data returned from the server ' + data);
            
            console.log(data);
            if((data.status == true && data.status_code == 200) || (data.status == true && data.status_code == true)) {
                //var email_val = $('#email_otp').val();
                //localStorage.setItem('email_val', email_val);
                
                //window.location.href = "http://localhost/tickt/";
                $('#forget_pwd_msg').text(data.message);
                $('#enter_otp').css('display', 'block');
                $('#email_section').css('display', 'none');
                $('#submit_forget_pwd').css('display', 'none');
                $('#submit_otp_button').css('display', 'block');
            } else {
                $('#forget_pwd_msg').text(data.message);
            }
            //$('#login_action_msg').text(data.message + ' Status is '+ data.status + ' -- code is -- '+ data.status_code);
            
		}, 'json');
    });
    

    $("#send_otp_again").click(function(e){
        e.preventDefault();
        $.ajax({type: "POST",
            action:'send_otp_action',
            url: "/wp-admin/admin-ajax.php",
            data: { id: $("#Shareitem").val(), access_token: $("#access_token").val() },
            success:function(result){
            $("#sharelink").html(result);
        }});
    });
    
});
