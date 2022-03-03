<footer class="footer" role="contentinfo">
    <div class="footer_top">
        <div class="container_inner">
            <div class="two_columns">
                <div class="column1">
                    <div class="column_left">
                        <figure class="logo_wrapper">
                            <img src="./images/footer-logo.png" alt="" role="presentation">
                        </figure>
                    </div>
                    <div class="column_right">
                        <ul class="footer_list">
                            <li>
                                <a href="javascript:void();">Find tradespeople</a>
                            </li>
                            <li>
                                <a href="javascript:void();">Find jobs</a>
                            </li>
                            <li>
                                <a href="javascript:void();">About us</a>
                            </li>
                            <li>
                                <a href="javascript:void();">Contact us</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="column2">
                    <div class="action_btn_wrapper">
                        <div class="btn_wrap">
                            <button class="btn btn_primary">
                                Log in
                            </button>
                        </div>
                        <div class="btn_wrap">
                            <button class="btn btn_secondary">
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer_bottom">
        <div class="container_inner">
            <p class="copyright"> © 2021 Tickt®</p>
            <ul>
                <li>
                    <a href="javascript:void();">Terms of use</a>
                </li>
                <li class="separator" aria-hidden="true">|</li>
                <li>
                    <a href="javascript:void();">Privacy policy</a>
                </li>
            </ul>
        </div>
    </div>
</footer>
</div>

<script>
$(function () {
    var owl = $(".owl-carousel");
    owl.owlCarousel({
        items: 3,
        margin: 4,
        loop: true,
        nav: true,
        navText: ["<div class='nav-button owl-prev'><img src='<?php echo get_stylesheet_directory_uri(); ?>/images/right_icon.svg'></div>", "<div class='nav-button owl-next'><img src='<?php echo get_stylesheet_directory_uri(); ?>/images/right_icon.svg'></div>"],
        responsive: {
            0: {
                items: 1,
                stagePadding: 0,
            },
            450: {
                items: 1,
                stagePadding: 60,
            },
            600: {
                items: 2,
                stagePadding: 60,
            },
            1200: {
                items: 3,
                stagePadding: 80,
            }
        }
    });
});

</script>

</body>

</html>