<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tickt</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./css/styles.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
    <?php echo wp_head(); ?>
</head>

<body>
    <div class="page_wrapper">

        <!-- Skip to main content -->
        <a href="#homepage_banner" class="skip-nav screenreader">Skip to main content</a>

        <!-- Header -->
        <header role="banner" class="header" aria-label="Tickt header">
            <div class="header_inner">
                <div class="container_inner flex-center">
                    <div class="logo_wrapper">
                        <a href="javascript:void();" class="logo">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo.png" alt="Tickt home page">
                        </a>
                    </div>
                    <div class="navigation_wrapper">
                        <nav class="main_menu" role="navigation" aria-label="main menu">
                            <ul id="menu-header-menu" class="nav-menu">
                                <li class="nav-menu-item">
                                    <a href="http://tickt.com.au">
                                        <span>Find tradespeople</span>
                                    </a>
                                </li>
                                <li class="nav-menu-item">
                                    <a href="http://tickt.com.au">
                                        <span>Find jobs</span>
                                    </a>
                                </li>
                                <li class="nav-menu-item">
                                    <a class="menu-btn" href="javascript:void();">
                                        <span>Log in</span>
                                    </a>
                                </li>
                                <li class="nav-menu-item">
                                    <a class="menu-btn secondary" href="javascript:void();">
                                        <span>Sign up</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
