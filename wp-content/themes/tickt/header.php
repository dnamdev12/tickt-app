<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="google-signin-client_id" content="851150341637-9eaf8kkqhlq75gd30ck7ouhqjtn8j4cq.apps.googleusercontent.com" >

    <title>Tickt Landing page</title>
  
    <!-- <link rel="stylesheet" href="./assets/css/owl.theme.default.min.css"> -->
    <?php wp_head(); ?>

</head>

<body>
    <div class="app_wrapper">
        <header id="header">
            <div class="custom_container">
                <div class="flex_headrow">
                    <div class="brand_wrap">
                        <figure>
                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo.svg" alt="logo" />
                        </figure>
                    </div>
                   
                    <ul class="side_nav">
                        <li>
                            <a href="#about" class="link">About us</a>
                        </li>
                        <li>
                            <a href="#product" class="link">Product</a>
                        </li>
                        <li>
                            <a href="#contact" class="link">Contacts</a>
                        </li>
                    </ul>
                    
                    <ul class="auth_btn">
                        
                        <li>
                            <a href="https://ticktreactqa.appskeeper.in/signup" class="fill_btn btn-effect"><!-- <a href="" class="fill_btn btn-effect" data-toggle="modal" data-target="#SignupModal"> -->Sign-up for free</a>
                        </li>
                        <li>
                            <a href="https://ticktreactqa.appskeeper.in/login" class="fill_grey_btn btn-effect"><!-- <a href="" class="fill_grey_btn btn-effect" data-toggle="modal" data-target="#OnboardModal"> -->Log In</a>
                        </li>
                                            
                    <?php
                    /* $items = '';
                    if (is_user_logged_in()) {
                        $nonce= wp_create_nonce('logout-wp');
                        $items = '
                        <li>
                        <a class="fill_grey_btn btn-effect" href="?wpsessionexpired=true&_wpnonce='.$nonce.'">'. __("Log Out") .'</a></li>';
                    } else {
                        $items = '
                        <li>
                            <a class="fill_btn btn-effect" data-toggle="modal"
                                data-target="#SignupModal">Sign-up for free</a>
                        </li>
                        <li>
                        <a class="fill_grey_btn btn-effect" data-toggle="modal"
                                data-target="#OnboardModal">'. __("Log In") .'</a></li>';
                    }
                    echo $items; */
                    ?>
                        <li>
                            <figure class="mob_menu_btn">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/menu.svg"  />
                            </figure>
                        </li>
                    </ul>
                </div>
            </div>
        </header>