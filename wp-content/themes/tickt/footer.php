    <footer>
        <div class="custom_container">
            <div class="foot_row">
                <div class="logo_col">
                    <figure>
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo.svg" alt="logo" />
                    </figure>
                </div>
                <div class="links_col">
                    <ul>
                        <li><a class="link">About us</a></li>
                        <li><a class="link">Product</a></li>
                        <li><a class="link">Download</a></li>
                    </ul>
                    <ul>
                        <li><a class="link">Privacy Policy</a></li>
                        <li><a class="link">Terms of Use</a></li>
                    </ul>
                </div>
                <div class="social_col">
                    <ul>
                        <li>
                            <a><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/facebook.svg" alt="facebook" /></a>
                        </li>
                        <li>
                            <a><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/linkedin.svg" alt="linkedin" /></a>
                        </li>
                        <li>
                            <a><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/instagram.svg" alt="instagram" /></a>
                        </li>
                    </ul>
                    <button class="fill_btn btn-effect">Sign-up for free</button>
                </div>
            </div>
        </div>
        <div class="copyright">
            <div class="custom_container">
                <p>&copy; 2021 EstimateOne Pty Ltd - All rights reserved</p>
            </div>
        </div>
    </footer>
</div>


<!-- Signup Modal -->
<div class="modal fade" id="SignupModal" role="dialog" aria-labelledby="SignupModalTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/ic-cancel.png" alt="cancel" aria-hidden="true" />
        </button>
        <div class="f_row">
            <div class="right_col">
                <!-- <figure class="mob_logo hide logo_signup">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo.svg" alt="logo" />
                </figure> -->
                <div class="stepwizard" style="display:none;">
                    <div class="stepwizard-row setup-panel">
                        <div class="stepwizard-step col-xs-3"> 
                            <a href="#step-1" type="button" class="btn btn-success btn-circle">1</a>
                            <p><small>1</small></p>
                        </div>
                        <div class="stepwizard-step col-xs-3"> 
                            <a href="#step-2" type="button" class="btn btn-default btn-circle" disabled="disabled">2</a>
                            <p><small>2</small></p>
                        </div>
                    </div>
                </div>

                <form method="POST" autocomplete="off" id="SignupForm">
                <div class="panel panel-primary setup-content tab" id="step-1">
                    <!-- Choose Account type -->
                    <div class="onboarding_head">
                        <h1 class="title">Welcome to Tickt</h1>
                    </div>
                    <div class="form_wrapper user-types">
                        <div class="form_field">
                            <!-- <button class="fill_btn btn-effect">I’m builder</button> -->
                            <input type="radio" value="builder" id="builder" name="user_type" />
                            <label for="builder">I’m builder</label>
                        </div>
                        <div class="form_field text-center">
                            <span class="show_label text-center">or</span>
                        </div>
                        <div class="form_field">
                            <!-- <button class="fill_grey_btn btn-effect">I’m Tradie</button> -->
                            <input type="radio" value="tradie" id="tradie" name="user_type" />
                            <label for="tradie">I’m Tradie</label>
                        </div>
                        <div class="form_field hide text-center">
                            <span class="reg">Have an account?
                                <a class="link">Login</a>
                            </span>
                        </div>
                        <div id="utype_msg" class="error_msg"></div>
                        
                        <div class="form_field">
                            <button class="fill_btn btn-effect nextBtn" type="button">Next</button>
                        </div>
                    </div>
                </div>
                <!-- Choose Account type -->

                <!-- Reset password
                <div class="tab">
                    <div class="onboarding_head">
                        <button class="back_btn"></button>
                        <h1 class="title">Reset Password</h1>
                    </div>
                    <div class="form_wrapper">
                        <div class="form_field">
                            <label class="form_label">Email</label>
                            <div class="text_field">
                                <input type="text" placeholder="Enter Email" name="email">
                            </div>
                        </div>
                        <div class="form_field">
                            <span class="show_label">Enter the email associated with your account and we will send a
                                code to reset your password.</span>
                        </div>
                        <div class="form_field">
                            <button class="fill_btn btn-effect">Next</button>
                        </div>
                    </div>
                </div><!-- Reset password -->


                <!-- Create Account -->
                <div class="panel panel-primary setup-content tab" id="step-2">
                    <div class="onboarding_head">
                        <!-- <button class="back_btn" onclick="nextPrev(-1)"></button> 
                        <button type="button" id="prevBtn" class="back_btn" onclick="nextPrev(-1)"></button>-->
                        
                        <div class="stepwizard-row setup-panel">
                            <div class="stepwizard-step col-xs-3"> 
                                <a href="#step-1" type="button" class="back_btn"></a>
                            </div>
                        </div>
                        <h1 class="title">Create Account</h1>
                    </div>
                    <div class="form_wrapper">
                        <div class="form_field">
                            <label class="form_label">Full Name</label>
                            <div class="text_field">
                                <input type="text" id="full_name" placeholder="Enter Full Name" name="name" autocomplete="off" oninput="this.className = ''">
                            </div>
                            <span id="name_msg" class="error_msg"></span>
                        </div>
                        <div class="form_field">
                            <label class="form_label">Email</label>
                            <div class="text_field">
                                <input type="email" id="email" placeholder="Enter Email Address" name="email" autocomplete="off">
                                <span id="email_msg" class="error_msg" oninput="this.className = ''"></span>
                            </div>
                        </div>
                        <div class="form_field">
                            <label class="form_label">Mobile Number</label>
                            <div class="text_field">
                                <input type="text" id="mobile" placeholder="Enter Mobile Number" name="mobile" autocomplete="off">
                                <span id="mobile_msg" class="error_msg" oninput="this.className = ''"></span>
                            </div>
                        </div>
                        <div class="form_field">
                            <label class="form_label">Password</label>
                            <div class="text_field">
                                <input type="password" class="detect_input user_password" id="user_password" autocomplete="new-password"
                                    placeholder="Enter Password" name="password" oninput="this.className = ''">
                                <span class="detect_icon eye_close">
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-eye-closed.png" alt="icon" />
                                </span>
                                <span class="detect_icon hide eye_open">
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-eye-open.png" alt="icon" />
                                </span>
                                <span id="password_msg" class="error_msg"></span>
                            </div>
                        </div>
                        <div class="form_field">
                            <div class="checkbox_wrap agree_check">
                                <input class="filter-type filled-in" type="checkbox" name="tnc" id="tnc" />
                                <label for="tnc">I agree to </label>
                                <a class="link">Privacy Policy</a>
                                <label class="and">&nbsp;and&nbsp;</label>
                                <a class="link m-l-30">Terms &amp; Conditions</a>
                                <span id="tnc_msg" class="error_msg"></span>
                            </div>
                        </div>
                        
                        <div class="form_field">
                            <span id="submit_msg" class="error_msg"></span>
                            <button class="fill_btn btn-effect" id="finishbtn" type="submit">Finish!</button>
                            <input type="hidden" name="action" value="submit_signup"/>
                            <!-- <button class="fill_btn btn-effect">Signup</button> -->
                        </div>
                        <span class="show_label text-center">or continue with</span>
                        <div class="continue_with">
                            <a class="hvr-ripple-out">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/ic-google.png" alt="google" />
                            </a>
                            <a class="hvr-ripple-out">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/ic-linkedin.png" alt="linkedin" />
                            </a>
                        </div>
                    </div>
                </div>
                <!-- Create Account -->
                <div style="overflow:auto;">
                    <!-- <div>
                    <button type="button" id="prevBtn" class="fill_btn btn-effect" onclick="nextPrev(-1)">Previous</button>
                    <input type="hidden" name="action" value="submit_signup"/>
                    <button type="button" id="nextBtn" class="fill_btn btn-effect" onclick="nextPrev(1)">Next</button>
                    </div>
                    <div id="social_log">
                    <span class="show_label text-center">or continue with</span>
                        <div class="continue_with">
                            <a class="hvr-ripple-out">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/ic-google.png" alt="google" />
                            </a>
                            <a class="hvr-ripple-out">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/ic-linkedin.png" alt="linkedin" />
                            </a>
                        </div>
                    </div> -->
                </div>

            </form>
            </div>
        </div>
    </div>
</div>
</div>
<!-- Modal Signup close-->



    <!-- Modal Login -->
    <div class="modal fade" id="OnboardModal" role="dialog" aria-labelledby="OnboardModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/ic-cancel.png" alt="cancel" aria-hidden="true" />
                </button>
                <div class="f_row">
                    <div class="left_col">
                        <div class="owl-carousel" id="onboard-owl-carousel">
                            <div class="item">
                                <figure class="banner_img">
                                    <figure class="logo">
                                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo.svg" alt="logo" />
                                    </figure>
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/modal-slider-bg-1.png" alt="banner-img" />
                                    <div class="slider_txt">
                                        <span>Find quality work and grow your reputation</span>
                                    </div>
                                    <div class="bottom_txt">
                                        <span class="reg">Don’t have an account?
                                            <a class="link">Sign up</a>
                                        </span>
                                    </div>
                                </figure>
                            </div>
                            <div class="item">
                                <figure class="banner_img">
                                    <figure class="logo">
                                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo.svg" alt="logo" />
                                    </figure>
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/modal-slider-bg-2.png" alt="banner-img" />
                                    <div class="slider_txt">
                                        <span>Make yourself on what you do best</span>
                                    </div>
                                    <div class="bottom_txt">
                                        <span class="reg">Don’t have an account?
                                            <a class="link">Sign up</a>
                                        </span>
                                    </div>
                                </figure>
                            </div>
                            <div class="item">
                                <figure class="banner_img">
                                    <figure class="logo">
                                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo.svg" alt="logo" />
                                    </figure>
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/modal-slider-bg-3.png" alt="banner-img" />
                                    <div class="slider_txt">
                                        <span>Choose work that suits your location, price, schedule</span>
                                    </div>
                                    <div class="bottom_txt">
                                        <span class="reg">Don’t have an account?
                                            <a class="link">Sign up</a>
                                        </span>
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="right_col">
                        <figure class="mob_logo hide">
                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo.svg" alt="logo" />
                        </figure>

                        <!-- Login -->
                        <div class="onboarding_head">
                            <h1 class="title">Log In</h1>
                        </div>
                        <div class="form_wrapper">
                            <form method="post" action="<?php echo admin_url('admin-ajax.php'); ?>" id="tickt_login">
                                <div class="form_field">
                                    <label class="form_label">Email</label>
                                    <div class="text_field">
                                        <input type="text" placeholder="Enter Email" name="email">
                                    </div>
                                </div>
                                <div class="form_field">
                                    <label class="form_label">Password</label>
                                    <div class="text_field">
                                        <input type="password" class="detect_input user_password"
                                            placeholder="Enter Password" name="password">
                                        <span class="detect_icon eye_close">
                                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-eye-closed.png" alt="icon" />
                                        </span>
                                        <span class="detect_icon hide eye_open">
                                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-eye-open.png" alt="icon" />
                                        </span>
                                    </div>
                                </div>
                                <div class="form_field" data-toggle="modal" data-target="#forgetModal">
                                    <div id="login_action_msg" class="error_msg"></div>
                                    <a class="link" data-dismiss="modal" data-toggle="modal" data-target="#ForgetModal">Forgotten your password?</a>
                                </div>
                                <div class="form_field">
                                    <div class="ajax-loader">
                                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/loader.gif">
                                    </div>
                                    <button type="submit" name="tickt_login" class="fill_btn btn-effect">Log in</button>
                                    <?php //wp_nonce_field( 'nonce_action_login', 'login_nonce' ); ?>
                                    <input type="hidden" name="action" value="tickt_login_action">
                                </div>
                            </form>
                            <span class="show_label text-center">or continue with</span>
                            <div class="continue_with">
                                <a class="hvr-ripple-out">
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/ic-google.png" alt="google" />
                                </a>
                                <a class="hvr-ripple-out">
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/ic-linkedin.png" alt="linkedin" />
                                </a>
                            </div>
                        </div>
                        <!-- Login close -->

                        <!-- Choose Account type -->
                        <!-- <div class="onboarding_head">
                            <h1 class="title">Welcome to Tickt</h1>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_field">
                                <button class="fill_btn btn-effect">I’m builder</button>
                            </div>
                            <div class="form_field text-center">
                                <span class="show_label text-center">or</span>
                            </div>
                            <div class="form_field">
                                <button class="fill_grey_btn btn-effect">I’m Tradie</button>
                            </div>
                            <div class="form_field hide text-center">
                                <span class="reg">Have an account?
                                    <a class="link">Login</a>
                                </span>
                            </div>
                        </div> -->
                        <!-- Choose Account type -->

                        <!-- Reset password -->
                        <!-- <div class="onboarding_head">
                            <button class="back_btn"></button>
                            <h1 class="title">Reset Password</h1>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_field">
                                <label class="form_label">Email</label>
                                <div class="text_field">
                                    <input type="text" placeholder="Enter Email" name="email">
                                </div>
                            </div>
                            <div class="form_field">
                                <span class="show_label">Enter the email associated with your account and we will send a
                                    code to reset your password.</span>
                            </div>
                            <div class="form_field">
                                <button class="fill_btn btn-effect">Next</button>
                            </div>
                        </div> -->
                        <!-- Reset password -->

                        <!-- Create Account -->
                        <!-- <div class="onboarding_head">
                            <button class="back_btn"></button>
                            <h1 class="title">Create Account</h1>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_field">
                                <label class="form_label">Full Name</label>
                                <div class="text_field">
                                    <input type="text" placeholder="Enter Full Name" name="name">
                                </div>
                                <span class="error_msg">Full Name is required</span>
                            </div>
                            <div class="form_field">
                                <label class="form_label">Email</label>
                                <div class="text_field">
                                    <input type="text" placeholder="Enter Email Address" name="email">
                                </div>
                            </div>
                            <div class="form_field">
                                <div class="checkbox_wrap agree_check">
                                    <input class="filter-type filled-in" type="checkbox" name="tnc" id="tnc" />
                                    <label for="tnc">I agree to </label>
                                    <a class="link">Privacy Policy</a>
                                    <label class="and">&nbsp;and&nbsp;</label>
                                    <a class="link m-l-30">Terms &amp; Conditions</a>
                                </div>
                            </div>
                            <div class="form_field">
                                <button class="fill_btn btn-effect">Signup</button>
                            </div>
                            <span class="show_label text-center">or continue with</span>
                            <div class="continue_with">
                                <a class="hvr-ripple-out">
                                    <img src="./assets/images/ic-google.png" alt="google" />
                                </a>
                                <a class="hvr-ripple-out">
                                    <img src="./assets/images/ic-linkedin.png" alt="linkedin" />
                                </a>
                            </div>
                        </div> -->
                        <!-- Create Account -->

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal close-->



    <!-- Modal Forget password  -->
    <div class="modal fade" id="ForgetModal" role="dialog" aria-labelledby="OnboardModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/ic-cancel.png" alt="cancel" aria-hidden="true" />
                </button>
                <div class="f_row">
                    <div class="right_col">
                        <figure class="mob_logo hide">
                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo.svg" alt="logo" />
                        </figure>

                        <!-- Reset Password -->
                        
                        <div class="onboarding_head">
                            <button class="back_btn" data-dismiss="modal" data-toggle="modal" data-target="#OnboardModal"></button>
                            <h1 class="title">Reset Password</h1>
                        </div>
                        <div class="form_wrapper">
                            <form method="post" action="<?php echo admin_url('admin-ajax.php'); ?>" id="forget_pwd">
                            <div class="form_field" id="email_section">
                                <label class="form_label">Email</label>
                                <div class="text_field">
                                    <input type="text" placeholder="Enter Email" name="email">
                                </div>
                            </div>
                            <div class="form_field" id="enter_otp">
                                <label class="form_label">OTP</label>
                                <div class="text_field">
                                    <input type="text" placeholder="Enter OTP" name="otp">
                                </div>
                            </div>
                            <div class="form_field">
                                <span class="show_label">Enter the Email associated with your account and we will send a
                                    SMS code to reset your password.</span>
                            </div>
                            <div class="form_field">
                            <div id="forget_pwd_msg" class="error_msg"></div>
                            <button type="submit" name="forget_pwd" class="fill_btn btn-effect">Next</button>
                            <input type="hidden" name="action" value="forget_pwd_action">
                            </div>
                            </form>
                        </div>
                        <!-- Reset Password close -->

                        <!-- Choose Account type -->
                        <!-- <div class="onboarding_head">
                            <h1 class="title">Welcome to Tickt</h1>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_field">
                                <button class="fill_btn btn-effect">I’m builder</button>
                            </div>
                            <div class="form_field text-center">
                                <span class="show_label text-center">or</span>
                            </div>
                            <div class="form_field">
                                <button class="fill_grey_btn btn-effect">I’m Tradie</button>
                            </div>
                            <div class="form_field hide text-center">
                                <span class="reg">Have an account?
                                    <a class="link">Login</a>
                                </span>
                            </div>
                        </div> -->
                        <!-- Choose Account type -->

                        <!-- Reset password -->
                        <!-- <div class="onboarding_head">
                            <button class="back_btn"></button>
                            <h1 class="title">Reset Password</h1>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_field">
                                <label class="form_label">Email</label>
                                <div class="text_field">
                                    <input type="text" placeholder="Enter Email" name="email">
                                </div>
                            </div>
                            <div class="form_field">
                                <span class="show_label">Enter the email associated with your account and we will send a
                                    code to reset your password.</span>
                            </div>
                            <div class="form_field">
                                <button class="fill_btn btn-effect">Next</button>
                            </div>
                        </div> -->
                        <!-- Reset password -->

                        <!-- Create Account -->
                        <!-- <div class="onboarding_head">
                            <button class="back_btn"></button>
                            <h1 class="title">Create Account</h1>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_field">
                                <label class="form_label">Full Name</label>
                                <div class="text_field">
                                    <input type="text" placeholder="Enter Full Name" name="name">
                                </div>
                                <span class="error_msg">Full Name is required</span>
                            </div>
                            <div class="form_field">
                                <label class="form_label">Email</label>
                                <div class="text_field">
                                    <input type="text" placeholder="Enter Email Address" name="email">
                                </div>
                            </div>
                            <div class="form_field">
                                <div class="checkbox_wrap agree_check">
                                    <input class="filter-type filled-in" type="checkbox" name="tnc" id="tnc" />
                                    <label for="tnc">I agree to </label>
                                    <a class="link">Privacy Policy</a>
                                    <label class="and">&nbsp;and&nbsp;</label>
                                    <a class="link m-l-30">Terms &amp; Conditions</a>
                                </div>
                            </div>
                            <div class="form_field">
                                <button class="fill_btn btn-effect">Signup</button>
                            </div>
                            <span class="show_label text-center">or continue with</span>
                            <div class="continue_with">
                                <a class="hvr-ripple-out">
                                    <img src="./assets/images/ic-google.png" alt="google" />
                                </a>
                                <a class="hvr-ripple-out">
                                    <img src="./assets/images/ic-linkedin.png" alt="linkedin" />
                                </a>
                            </div>
                        </div> -->
                        <!-- Create Account -->

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Forget password close-->


    <?php wp_footer(); ?>

    <script>
        $('#sphere-owl-carousel').owlCarousel({
            stagePadding: 90,
            loop: true,
            margin: 10,
            dots: false,
            nav: true,
            responsive: {
                0: {
                    items: 2,
                    stagePadding: 0,
                    margin:0,
         
                },
                768: {
                    items: 3,
                    stagePadding: 0,
                },
                1024: {
                    items: 5
                }
            }
        });

        $('#jobs-owl-carousel').owlCarousel({
            stagePadding:120,
            loop: true,
            margin: 10,
            dots: false,
            nav: true,
            items: 4,
            responsive: {
                0:{
                    items:1,
                    stagePadding:0,
                },
                768: {
                    items: 2,
                    stagePadding:0,
                },
                1024: {
                    items:2,
                    stagePadding:90,

                },
                1366: {
                    items:3,
                    stagePadding:90,
                }
            }
            
        })

        $('#onboard-owl-carousel').owlCarousel({
            loop: true,
            dots: true,
            nav: false,
            items: 1,
            autoplay: true,
        })

        $(".mob_menu_btn").click(function () {
            $(".side_nav").toggleClass("active")
        })

        $('#OnboardModal').on('shown.bs.modal', function () {
            $('#myInput').trigger('focus')
        });

        $(".eye_close").click(function () {
            $(".eye_close").hide();
            $(".eye_open").show();
            $(".user_password").attr("type", "text");
        });

        $(".eye_open").click(function () {
            $(".eye_open").hide();
            $(".eye_close").show();
            $(".user_password").attr("type", "password");
        });


        // Step Wizard for Builder Signup
        $(document).ready(function () {

        var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn');

        allWells.hide();

        navListItems.click(function (e) {
            e.preventDefault();
            var $target = $($(this).attr('href')),
                $item = $(this);

            if (!$item.hasClass('disabled')) {
                navListItems.removeClass('btn-success').addClass('btn-default');
                $item.addClass('btn-success');
                allWells.hide();
                $target.show();
                $target.find('input:eq(0)').focus();
            }
        });

        allNextBtn.click(function () {
            var curStep = $(this).closest(".setup-content"),
                curStepBtn = curStep.attr("id"),
                
                nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                curInputs = curStep.find("input[type='text'],input[type='url']"),
                isValid = true;
                if(curStepBtn == 'step-1') {
                    if ($('input[name="user_type"]:checked').length == 0) {
                    console.log('error');
                    $("#utype_msg").text("Please Select a option");
                    isValid = false;
                    }
                    else {
                        $("#utype_msg").text("");
                    }
                }

            $(".form-group").removeClass("has-error");
            for (var i = 0; i < curInputs.length; i++) {
                if (!curInputs[i].validity.valid) {
                    isValid = false;
                    $(curInputs[i]).closest(".form-group").addClass("has-error");
                }
            }

            if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
        });

        function validateEmail($email) {
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailReg.test( $email );
        }

        $('div.setup-panel div a.btn-success').trigger('click');
        $("#finishbtn").click(function(e){
            //e.preventDefault();
            //jQuery('#SignupForm').submit(ajaxSubmit);
            console.log("hello form");
            var full_name = jQuery('#full_name').val(); 
            var mobile = jQuery('#mobile').val(); 
            var password = jQuery('#user_password').val();
            var email = jQuery('#email').val();
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;  
            //console.log('form clicked');
            

            if(full_name == undefined || jQuery.trim(full_name) == '' || email == undefined || jQuery.trim(email) == '' || password == undefined || jQuery.trim(password) == '' || mobile == undefined || jQuery.trim(mobile) == '' || $("input[type='checkbox'][name='tnc']:checked").length == 0){
                if(full_name == undefined || jQuery.trim(full_name) == ''){
                    $('#name_msg').text('Please Enter the name.');
                }
                if(email == undefined || jQuery.trim(email) == '' || !emailReg.test(email)){
                    $('#email_msg').text('Please Enter a valid email.');
                }
                if(mobile == undefined || jQuery.trim(mobile) == ''){
                    $('#mobile_msg').text('Please Enter the Mobile Number.');
                }
                if(password == undefined || jQuery.trim(password) == ''){
                    $('#password_msg').text('Please Enter the Password');
                }
                if($("input[type='checkbox'][name='tnc']:checked").length == 0) {
                    $('#tnc_msg').text('Please accept Terms and Conditions to continue!');
                }
                
                setTimeout(function(){ 
                    $('.error_msg').text(''); 
                }, 8000);

                return false;
            }else{	
                var signupData = new FormData();
                //console.log('----signupData--- '+signupData);
                
                jQuery.ajax({
                    data: {action: 'submit_signup',name:full_name,email:email, password:password,mobile:mobile},
                    type: 'post',
                    async: false,
                    url: '<?php echo home_url(); ?>/wp-admin/admin-ajax.php',
                    beforeSend: function () {
                        //$("#finishbtn").attr("disabled");
                        $('.ajax-loader').css('visibility', 'visible');
                        //$('#finishbtn').prop('disabled', true);
                    },
                    success: function(data) {
                        //var result = JSON.parse(data);
                        console.log(data);
                        //$('#submit_msg').text(result.message);
                        $('#submit_msg').text(data);
                        $("#finishbtn").removeAttr("disabled");
                        $('#finishbtn').css('background-color', 'var(--yellow)');
                    },
                    complete: function(){
                        $('.ajax-loader').css('visibility', 'hidden');
                    }
                });
                return false;
            }
            });
        });

        /* $(".eye_open").on('click', function() {
            $("#user_password").prop('type', 'password');
        });

        $(".eye_close").on('click', function() {
            $("#user_password").prop('type', 'text');
        }); */


    /* $(document).ready(function(){
        //jQuery('#SignupForm').submit(ajaxSubmit);
    }); */

    function ajaxSubmit(){
        
    }

    </script>
