<?php
// Add Thumbnails on posts and pages.
add_theme_support( 'post-thumbnails' );

// use default tag for <title> meta
add_theme_support( 'title-tag' );

// Register Menu navigation for Header and footer
register_nav_menus(
    array(
        'primary' => esc_html__( 'Primary menu', 'tickt' ),
        'footer'  => __( 'Secondary menu', 'tickt' ),
    )
);


// Enqueue Js files in Footer
function my_enqueue_stuff_js() {
   
    wp_enqueue_script('jquery-2-4', get_stylesheet_directory_uri().'/assets/js/jquery-2.2.4.min.js', true );
    
    wp_enqueue_script('owl-carousel', get_stylesheet_directory_uri().'/assets/js/owl.carousel.min.js', true );

    wp_enqueue_script('bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js', true );

    //wp_enqueue_script('custom', get_stylesheet_directory_uri().'/assets/js/custom.js', true );
   
}
add_action( 'wp_footer', 'my_enqueue_stuff_js' );


// Enqueue Js files in head
function my_enqueue_stuff_css() {
    
    wp_enqueue_style("bootstrap", 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css', 4.0 );
    wp_enqueue_style('main-style', get_stylesheet_directory_uri().'/assets/css/style.css', false, 1.0 );    
    wp_enqueue_style('media', get_stylesheet_directory_uri().'/assets/css/media.css', false, 1.0 );
    wp_enqueue_style('owl-carousel', get_stylesheet_directory_uri().'/assets/css/owl.carousel.min.css', false, 1.0 );
    
    //wp_script_add_data( 'bootstrap', array( 'integrity', 'crossorigin' ) , array( 'sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm', 'anonymous' ) );

}
add_action( 'wp_enqueue_scripts', 'my_enqueue_stuff_css' );



function submitSignupForm(){
    global $wpdb;
    $name = (isset($_POST['name'])) ? trim($_POST['name']) : '';
    $email = (isset($_POST['email'])) ? trim($_POST['email']) : '';
    $password = (isset($_POST['password'])) ? trim($_POST['password']) : '';
    $mobile = (isset($_POST['mobile'])) ? trim($_POST['mobile']) : '';
    $password = wp_hash_password($password);

    $curl = curl_init();

    curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://ticktdevapi.appskeeper.in/v1/auth/signup',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS =>'{
    "deviceType": "web",
    "firstName": "'.$name.'",
    "mobileNumber": "'.$mobile.'",
    "email": "'.$email.'",
    "password": "'.$password.'",
    "deviceToken": "abcdefghijklmnopqrstuvwxyz1234567890",
    "abn": "12345678901",
    "company_name": "abc",
    "position": "CEO",
    "user_type": 1,
    "location": {
        "type": "Point",
        "coordinates": [
        72.831062,
        21.17021
        ]
    },
    "trade": [
        "60486a001abc8a08073cf0e1",
        "60486a3d1abc8a08073cf0e2"
    ],
    "specialization": [
        "6049c78102f48e868d8dfdbd",
        "6049c85e02f48e868d8e0a40"
    ]
    }',
    CURLOPT_HTTPHEADER => array(
        'Authorization: Basic dGlja3RfYXBwOnRpY2t0X2FwcF8xMjNzYWRlZnNz',
        'timezone: Asia/Kolkata',
        'Content-Type: application/json'
    ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    //echo $response;
    //echo $response;
    //header('Content-Type: application/json');
    $result = json_encode($response);
    $var = json_decode($response);
    $res = $var->result;
    $status_code = $var->status_code;
    $status = $var->status;
    $message = $var->message;
    //preg_replace("/[^a-zA-Z,\"{}:]/", "", $id);
    //print_r($status);
    // Error in validation
    
    if($status == '' && $status_code == 422)
    {
        echo 'Error : ' . $message;
    }
    // Validation success but with error
    else if($status == 1 && $status_code == 200)
    {

        if(isset($res->firstName)) {
            $userdata = array(
                'user_login'    =>  $email,
                'user_email'    =>  $email,
                'user_pass'     =>  $password,
                'user_nicename' =>  $name,
                'display_name'  =>  $name,
                'role' => get_option('default_role')
            );
            
            $user_id = wp_insert_user( $userdata );
            if ( is_wp_error( $user_id ) ) {
                $error_code = array_key_first( $user->errors );
                print_r($user_id);
                if($error_code == 'existing_user_login'){
                    echo $user_id->errors['existing_user_login'][0];
                } else {
                    echo 'Error in registration';
                }
                
                //echo 'Error of '.$user.' : '. $message;
            } else {
                echo $message;
                add_user_meta( $user_id , 'mobile' , $mobile , false );
            }
        }
        else {
            echo $message;
        }
    } else if($status == '' && $status_code == 200)
    {
        echo $message;
    }
    else {
        echo 'Error : '.$message;
    }
    die;
}
add_action('wp_ajax_submit_signup', 'submitSignupForm');
add_action('wp_ajax_nopriv_submit_signup', 'submitSignupForm');



// Login Custom Action
add_action( 'wp_ajax_tickt_login_action', 'tickt_login_action' );
add_action( 'wp_ajax_nopriv_tickt_login_action', 'tickt_login_action' );

function tickt_login_action() {
    $response = array(
    	'status' => true,
    	'status_code' => 200,
    );

    if (trim($_POST['email']) == '') {
    	$response['status'] = false;
    	$response['status_code'] = 410;
    	$response['message'] = 'Email is required.';
    	exit(json_encode($response));
    } else if (!preg_match("/@.+\./", $_POST['email'])) {
        $response['status'] = false;
    	$response['status_code'] = 410;
    	$response['message'] = 'Email is Invalid!';
    	exit(json_encode($response));
    } else if (trim($_POST['password']) == '') {
    	$response['status'] = false;
    	$response['status_code'] = 410;
    	$response['message'] = 'Password is required.';
    	exit(json_encode($response));
    } else {

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://ticktdevapi.appskeeper.in/v1/auth/login',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'deviceType=web&deviceToken=abcdefghijklmnopqrstuvwxyz1234567890&email='.$_POST['email'].'&password='.$_POST['password'],
        CURLOPT_HTTPHEADER => array(
            'Authorization: Basic dGlja3RfYXBwOnRpY2t0X2FwcF8xMjNzYWRlZnNz',
            'Content-Type: application/x-www-form-urlencoded'
        ),
        ));

        $res = curl_exec($curl);

        curl_close($curl);
        //echo $response;

        //$result = json_encode($response);
        $var = json_decode($res);
        $res = $var->result;
        $status_code = $var->status_code;
        $status = $var->status;
        $message = $var->message;
        if($status_code = 200 && $status == true) {
            $user_email = $_POST['email'];
            $user = get_user_by( 'email', $user_email ); 
            if( $user ) {
                wp_set_current_user( $user->ID, $user->user_login );
                wp_set_auth_cookie( $user->ID );
                do_action( 'wp_login', $user->user_login );
                
                $response['status'] = $status;
                $response['status_code'] = $status_code;
                $response['message'] = $var;
                exit(json_encode($response));
            } else {
                $response['status'] = false;
                $response['status_code'] = 401;
                $response['message'] = 'Something went wrong!';
                exit(json_encode($response));
            }
        } else {
            $response['status'] = $status;
            $response['status_code'] = $status_code;
            $response['message'] = $message;
            exit(json_encode($response));
        }
        
    }

    exit(json_encode($response));
}


// Login Custom Action
add_action( 'wp_ajax_forget_pwd_action', 'forget_pwd_action' );
add_action( 'wp_ajax_nopriv_forget_pwd_action', 'forget_pwd_action' );

function forget_pwd_action() {
    $response = array(
    	'status' => true,
    	'status_code' => 200,
    );
    echo 'hello'; die;
    if (trim($_POST['email']) == '') {
    	$response['status'] = false;
    	$response['status_code'] = 410;
    	$response['message'] = 'Email is required.';
    	exit(json_encode($response));
    } else {

        
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://ticktdevapi.appskeeper.in/v1/auth/forgot_password',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'PUT',
        CURLOPT_POSTFIELDS => 'user_type=1&email='.$_POST['email'],
        CURLOPT_HTTPHEADER => array(
            'Authorization: Basic dGlja3RfYXBwOnRpY2t0X2FwcF8xMjNzYWRlZnNz',
            'Content-Type: application/x-www-form-urlencoded'
        ),
        ));

        $res = curl_exec($curl);
        curl_close($curl);
        //echo $response;

        //$result = json_encode($response);
        $var = json_decode($res);
        $res = $var->result;
        $status_code = $var->status_code;
        $status = $var->status;
        $message = $var->message;
        
        $response['status'] = $status;
        $response['status_code'] = $status_code;
        $response['message'] = $message;
        exit(json_encode($response));        
    }

    exit(json_encode($response));
}




add_action('init','redirect_login_homepage');
function redirect_login_homepage(){
 global $pagenow;
 if( 'wp-login.php' == $pagenow ) {
  wp_redirect(home_url());
  exit();
 }
}


function logoutUser(){
    if ( $_GET["wpsessionexpired"] == 'true' ){
        $nonce = $_REQUEST['_wpnonce'];
        if ( ! wp_verify_nonce( $nonce, 'logout-wp' ) ) {
            die( 'Security verification is Failed!' ); 
       } else {
        wp_logout();
        wp_redirect(home_url());
        exit();
       }
        
    }
}
add_action('init', 'logoutUser');