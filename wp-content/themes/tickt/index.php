<?php /* Template Name: Home */ ?>
<?php get_header(); ?>
<!-- Main Content -->
<main role="main">
    <?php 
        $banner_section = get_field('banner_section');
    ?>
    <div class="content_top_margin">
        <div class="banner_wrapper" id="homepage_banner" style='background-image: url("<?php echo $banner_section['banner']; ?>");'>
            <div class="banner_content container_inner">
                <div class="main_heading">
                    <h1 aria-hidden="true"><?php echo $banner_section['banner_heading'];?></h1>
                    <h1 class="visually-hidden"><?php echo $banner_section['banner_heading'];?></h1>
                    <h2 aria-hidden="true"><?php echo $banner_section['banner_subheading'];?></h2>
                    <h2 class="visually-hidden"><?php echo $banner_section['banner_subheading'];?></h2>
                </div>
                <div class="action_btn_wrapper">
                    <div class="btn_wrap">
                        <a href="<?php echo $banner_section['banner_builder_cta_url'];?>" class="btn btn_primary"><?php echo $banner_section['banner_builder_cta_text'];?></a>
                    </div>
                    <div class="btn_wrap">
                        <a href="<?php echo $banner_section['banner_tradie_cta_url'];?>" class="btn btn_secondary"><?php echo $banner_section['banner_tradie_cta_text'];?></a>
                    </div>
                </div>
                <div class="action_btn_wrapper icon_wrapper">
                    <div class="btn_wrap">
                        On all platforms
                    </div>
                    <div class="btn_wrap icon">
                        <i class="fa fa-apple" aria-hidden="true"></i>
                    </div>
                    <div class="btn_wrap icon">
                        <i class="fa fa-android" aria-hidden="true"></i>
                    </div>
                    <div class="btn_wrap icon">
                        <i class="fa fa-desktop" aria-hidden="true"></i>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <section class="for_builders" id="builders">
    <?php $builders_section = get_field('builders_section'); ?>
        <div class="container_inner">
            <div class="table_row">
                <div class="column col_left">
                    <div class="elements_holder">
                        <h3><?php echo $builders_section['top_heading']; ?></h3>
                        <h1><?php echo $builders_section['heading']; ?></h1>
                        <p class="paraText"><?php echo $builders_section['description']; ?>
                        </p>
                        <a href="<?php echo $builders_section['cta_url']; ?>" class="btn btn_primary"><?php echo $builders_section['cta_text']; ?></a>
                    </div>
                </div>
                <div class="column col_right" style='background-image: url("<?php echo $builders_section['image']['url']; ?>");'></div>
            </div>
        </div>
    </section>


    <?php $tradie_section = get_field('tradie_section'); ?>
    <section class="for_tradie" id="tradie" style='background-image: url("<?php echo $tradie_section['image']['url']; ?>");'>
        <div class="container_inner">
            <div class="flex_row">
                <div class="column"></div>
                <div class="column col_right">
                    <div class="elements_holder">
                        <h3><?php echo $tradie_section['top_heading']; ?></h3>
                        <h1><?php echo $tradie_section['heading']; ?></h1>
                        <div class="paraText"><?php echo $tradie_section['description']; ?></div>
                        <a href="<?php echo $tradie_section['cta_url']; ?>" class="btn btn_primary"><?php echo $tradie_section['cta_text']; ?></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php $all_trades_section = get_field('all_trades_section'); ?>
    <section class="trades_banner">
        <div class="container_inner">
            <div class="flex_row">
                <div class="column_left">
                    <div class="full_section_inner">
                        <figure>
                            <img src="<?php echo $all_trades_section['image']['url']; ?>" role="presentation" alt="<?php echo $all_trades_section['image']['alt']; ?>">
                        </figure>
                        <div class="heading_wrapper">
                            <h2><?php echo $all_trades_section['heading']; ?></h2>
                            <a href="<?php echo $all_trades_section['cta_url']; ?>" class="btn btn_primary"><?php echo $all_trades_section['cta_text']; ?></a>
                        </div>
                    </div>
                </div>
                <div class="column_right">
                    <div class="full_section_inner">
                        <div class="all_trades_list">
                            <?php echo $all_trades_section['description']; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php $why_join_tickt_section = get_field('why_join_tickt_section'); ?>
    <section class="why_join_tickt" style='background-image: url("<?php echo $why_join_tickt_section['background_image']['url']; ?>");'>
        <div class="container_inner">
            <div class="flex_row">
                <div class="column_left">
                    <h2><?php echo $why_join_tickt_section['heading']; ?></h2>
                    <dl class="description_list">
                        <?php echo $why_join_tickt_section['description']; ?>
                    </dl>
                    <a href="<?php echo $why_join_tickt_section['cta_url']; ?>" class="btn btn_primary"><?php echo $why_join_tickt_section['cta_text']; ?></a>
                </div>
                <div class="column_right">
                    <figure>
                        <img src="<?php echo $why_join_tickt_section['image']['url']; ?>" alt="">
                    </figure>
                </div>
            </div>
        </div>
    </section>

    <section class="latest_jobs">
        <div class="container_inner">
        <?php

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://ticktdevapi.appskeeper.in/v1/job/getJobList',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_POSTFIELDS => 'page=1',
        CURLOPT_HTTPHEADER => array(
            'Authorization: Basic dGlja3RfYXBwOnRpY2t0X2FwcF8xMjNzYWRlZnNz',
            'timezone: Asia/Kolkata',
            'job_status: 2',
            'Content-Type: application/x-www-form-urlencoded'
        ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        //echo 'Hello <pre>';
        $res = json_decode($response);
        $results = $res->result->resultData;
        ?>
            <div class="heading_wrapper">
                <h2>Latest job posts</h2>
            </div>
            <div class="carousel_wrapper">
                <div class="owl-carousel owl-theme">
                <?php 
                foreach(array_slice($results, 0, 7) as $result) {
                    ?>
                    <div class="item">
                        <div class="job_card">
                            <div class="card_header">
                                <div class="user_wrap">
                                    <figure class="user_img flex-center">
                                        <img src="<?php echo $result->categories[0]->selected_url;?>" alt="<?php echo $result->jobName;?>" />
                                    </figure>
                                    <div class="details">
                                        <span class="name"><?php echo $result->categories[0]->trade_name;?></span>
                                        <span class="date"><?php echo $result->jobName;?></span>
                                    </div>
                                </div>
                                <button class="back_btn" type="button" aria-label="Back">
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/right_icon.svg" alt="" role="presentation">
                                </button>
                            </div>
                            <div class="card_body">
                                <div class="job_info">
                                    <ul>
                                        <li class="icon time"><i class="fa fa-clock-o" aria-hidden="true"></i><?php echo time_elapsed_string(date('Y-m-d H:i:s', strtotime($result->updatedAt)));?></li>
                                        <li class="icon charge"><i class="fa fa-usd" aria-hidden="true"></i>
                                        <?php echo $result->totalAmounts;?> p/h</li>
                                        <li class="icon location"><i class="fa fa-map-marker"
                                                aria-hidden="true"></i><?php echo $result->location_name;?></li>
                                        <li class="icon calendar"><i class="fa fa-calendar-o"
                                                aria-hidden="true"></i>
                                            2 days</li>
                                    </ul>
                                </div>
                                <div class="job_desc"><?php echo $result->job_description;?>
                                </div>
                                <div class="action_btn_wrapper">
                                    <div class="btn_wrap">
                                        <i class="fa fa-eye" aria-hidden="true"></i> <?php echo $result->jobViewCount->views_count;?>
                                    </div>
                                    <div class="btn_wrap">
                                        <i class="fa fa-comment-o" aria-hidden="true"></i> <?php echo $result->jobView->views_count;?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php } ?>
                    
                </div>
            </div>
        </div>
    </section>
</main>
<?php get_footer(); ?>