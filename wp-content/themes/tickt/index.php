<?php /* Template Name: Home */ ?>
<?php get_header(); ?>
        <?php 
            $banner_section = get_field('banner_section');
        ?>
        <section class="banner_block">
            <figure class="banner_img">
                <img src="<?php echo $banner_section['banner']; ?>" alt="Banner">
                <div class="banner_container">
                    <div class="banner_txt">
                        <h1><?php echo $banner_section['banner_heading'];?></h1>
                        <p><?php echo $banner_section['banner_subheading'];?></p>
                        <button class="fill_btn btn-effect"><?php echo $banner_section['banner_button_cta'];?></button>
                    </div>
                </div>
            </figure>
        </section>
        <section class="about_block clip">
        <?php 
            $section_1 = get_field('section_1');
        ?>
            <div class="custom_container">
                <div class="flex_row align_center">
                    <div class="flex_col_sm_6">
                        <span class="sub_title"><?php echo $section_1['heading'];?></span>
                        <p class="commn_para"><?php echo $section_1['description'];?></p>
                    </div>
                    <div class="flex_col_sm_6">
                        <figure>
                            <img src="<?php echo $section_1['image'];?>" alt="<?php echo $section_1['heading'];?>" />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
        <section class="tailord_block">
        <?php 
            $tailored_for_section = get_field('tailored_for_section');
        ?>
            <div class="container">
                <span class="sub_title">Tailored for</span>
                <ul>
                    <li>
                        <figure>
                            <img src="<?php echo $tailored_for_section['icon_1'];?>" alt="<?php echo $tailored_for_section['heading_1'];?>" />
                        </figure>
                        <span class="xs_title"><?php echo $tailored_for_section['heading_1'];?></span>
                        <p class="commn_para"><?php echo $tailored_for_section['description_1'];?></p>
                    </li>
                    <li>
                        <figure>
                            <img src="<?php echo $tailored_for_section['icon_2'];?>" alt="<?php echo $tailored_for_section['heading_2'];?>" />
                        </figure>
                        <span class="xs_title"><?php echo $tailored_for_section['heading_2'];?></span>
                        <p class="commn_para"><?php echo $tailored_for_section['description_2'];?></p>
                    </li>
                </ul>
            </div>
        </section>
        <section class="mission_block">
            <div class="custom_container">
                <p class="sub_title"><?php echo $tailored_for_section['our_mission'];?></p>
            </div>
        </section>
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
        //echo '<pre>';
        $res = json_decode($response);
        $results = $res->result->resultData;
        //print_r($results[1]);
        ?>
        <section class="sphers_block">  
        <?php 
            $top_sphere_section = get_field('top_sphere_section');
        ?>
            <span class="title"><?php echo $top_sphere_section['top_sphere_heading']; ?></span>
            <div class="sphere_wrap">
                 <div class="owl-carousel owl-theme" id="sphere-owl-carousel"> 
                     <?php 
                     $i = 0;
                     foreach($top_sphere_section['top_sphere_gallery'] as $gallery)
                     { 
                        
                        ?>
                    <div class="item">
                        <div class="sphere">
                            <figure>
                                <img src="<?php echo $gallery['url'];?>" />
                            </figure>
                            <span class="xs_title"><?php echo $gallery['alt'];?></span>
                        </div>
                    </div>
                    <?php 
                    $i++;
                } ?>
                </div>
            </div>
        </section>
        <section class="about_block">
            <!-- <div class="custom_container"> -->
                <?php 
                    $section_2 = get_field('section_2');
                    $i = 1;
                    foreach($section_2 as $section_loop) 
                    {
                ?>
                <div class="flex_row align_center flex_mob">
                    <?php if ($i % 2 == 0) { ?>
                    <div class="flex_col_sm_6">
                        <figure>
                            <img src="<?php echo $section_loop['section_image']; ?>" alt="<?php echo $section_loop['section_heading']; ?>" />
                        </figure>
                    </div>
                    <?php } ?>
                    <div class="flex_col_sm_6">
                        <div class="content">
                            <span class="sub_title"><?php echo $section_loop['section_heading']; ?></span>
                            <p class="commn_para"><?php echo $section_loop['section_description']; ?></p>
                            <a href="<?php echo $section_loop['section_button_text_url']; ?>" class="fill_btn btn-effect"><?php echo $section_loop['section_button_text']; ?></a>
                        </div>
                    </div>
                    <?php if ($i % 2 != 0) { ?>
                    <div class="flex_col_sm_6">
                        <figure>
                            <img src="<?php echo $section_loop['section_image']; ?>" alt="<?php echo $section_loop['section_heading']; ?>" />
                        </figure>
                    </div>
                    <?php } ?>
                </div>
                <?php $i++; 
                } ?>
            <!-- </div> -->
        </section>
        <section class="features_block">
            <div class="custom_container">
                <span class="title">Six reasons the construction industry prefers Tickt</span>
                <div class="flex_row">
                <?php
                $section_reasons = get_field('section_reasons');
                $i = 1;
                foreach($section_reasons as $section_reason) 
                {
                ?>
                    <div class="flex_col_sm_4">
                        <div class="feature_wrap">
                            <figure>
                                <img src="<?php echo $section_reason['section_reason_icon']; ?>" alt="time-saver" />
                            </figure>
                            <span class="xs_title"><?php echo $section_reason['section_reason_heading']; ?></span>
                            <p class="commn_para"><?php echo $section_reason['section_reason_description']; ?></p>
                        </div>
                    </div>
                <?php } ?>
                    
                </div>
            </div>
        </section>
        <section class="jobs_block">
        
            <span class="title text-center">Active jobs</span>
            <div class="job_wrap">
                <div class="owl-carousel owl-loaded owl-drag" id="jobs-owl-carousel">
                <?php 
                foreach(array_slice($results, 0, 7) as $result) {
                    
                    ?>
                    <div class="item">
                        <div class="job_card">
                            <a href="https://ticktreactqa.appskeeper.in/login" class="more_detail circle"></a>
                            <div class="user_wrap">
                                <figure class="u_img">
                                    <img src="<?php echo $result->categories[0]->selected_url;?>" alt="<?php echo $result->jobName;?>" />
                                </figure>
                                <div class="details">
                                    <span class="name"><?php echo $result->categories[0]->trade_name;?></span>
                                    <span class="prof"><?php echo $result->jobName;?></span>
                                </div>
                            </div>
                            <div class="job_info">
                                <ul>
                                    <li class="icon clock"><?php echo time_elapsed_string(date('Y-m-d H:i:s', strtotime($result->updatedAt)));?></li>
                                    <li class="icon dollar">$<?php echo $result->totalAmounts;?> p/h</li>
                                    <li class="icon location line-1"><?php echo $result->location_name;?></li>
                                    <li class="icon calendar">2 days</li>
                                </ul>
                            </div>
                            <p class="commn_para line-2"><?php echo $result->job_description;?></p>
                            <ul class="count_wrap">
                                <li class="icon view"><?php echo $result->jobViewCount->views_count;?></li>
                                <li class="icon comment"><?php echo $result->jobView->views_count;?></li>
                            </ul>
                        </div>
                    </div>
                    <?php } ?>
                </div> 
            </div>
        </section>
        <section class="footer_banner_block">
            <figure class="banner_img">
            <?php
            $get_the_app_section = get_field('get_the_app_section');
            ?>
                <img src="<?php echo $get_the_app_section['get_app_section_banner']?>" alt="<?php echo $get_the_app_section['get_app_section_description']?>">
                <div class="banner_container">
                    <div class="banner_txt">
                        <span class="title"><?php echo $get_the_app_section['get_app_section']?></span>
                        <p class="commn_para"><?php echo $get_the_app_section['get_app_section_description']?></p>
                    </div>
                    <a href="<?php echo $get_the_app_section['apple_app_icon_url']?>">
                        <img src="<?php echo $get_the_app_section['apple_app_icon']?>" alt="play-store" />
                    </a>
                    <a href="<?php echo $get_the_app_section['google_store_url']?>">
                        <img src="<?php echo $get_the_app_section['google_store_icon']?>" alt="app-store" />
                    </a>
                </div>
            </figure>
        </section>

    <?php get_footer(); ?>

</body>

</html>


<?php 
/* $result = wp_create_user('johndoe', 'passwordgoeshere', 'john.doe@example.com');
if($result) {
    echo 'user registered';
} else {
    echo 'registeration failed';
} */
/*{
    "result": {
        "_id": "612f5ed339355f247719119b",
        "firstName": "test",
        "user_image": "",
        "trade": [
            "60486a001abc8a08073cf0e1",
            "60486a3d1abc8a08073cf0e2"
        ],
        "specialization": [
            "6049c78102f48e868d8dfdbd",
            "6049c85e02f48e868d8e0a40"
        ],
        "deviceToken": "323245356tergdfgrtuy68u566452354dcxs",
        "mobileNumber": "412345678",
        "email": "rohit.kumar@appinventiv.com",
        "user_type": 1,
        "accountType": "normal",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI2MTJmNWVkMzM5MzU1ZjI0NzcxOTExOWIiLCJlbWFpbCI6InJvaGl0Lmt1bWFyQGFwcGludmVudGl2LmNvbSIsImZpcnN0TmFtZSI6InRlc3QiLCJ0cmFkZSI6WyI2MDQ4NmEwMDFhYmM4YTA4MDczY2YwZTEiLCI2MDQ4NmEzZDFhYmM4YTA4MDczY2YwZTIiXSwic3BlY2lhbGl6YXRpb24iOlsiNjA0OWM3ODEwMmY0OGU4NjhkOGRmZGJkIiwiNjA0OWM4NWUwMmY0OGU4NjhkOGUwYTQwIl0sImRldmljZVRva2VuIjoiMzIzMjQ1MzU2dGVyZ2RmZ3J0dXk2OHU1NjY0NTIzNTRkY3hzIiwidXNlcl90eXBlIjoxLCJjdXN0b21lcklkIjoiY3VzX0s5OWFSZ0I0YUZqdkpKIiwiaWF0IjoxNjMwNDk0NDE5fQ.RJL5KGb7EkX2f_5KE6zOVEKBO3ue8Ecj6WekTedywcU",
        "createdAt": "2021-09-01T11:06:59.103Z"
    },
    "message": "Registration successful",
    "status": true,
    "status_code": 200
}*/
?>