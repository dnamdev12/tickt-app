<?php /* Template Name: Home Page */ ?>

<?php
//print_r(get_field('slider'));
if( have_rows('slider') ):

    while( have_rows('slider') ): the_row();
    
    $slider_image = get_sub_field('slider_image');
  $title = get_sub_field('title');
  $description = get_sub_field('description');
  
  foreach($slider_image as $sliders) {
      echo '<div><img src="'.$sliders['url'] .'" width="300"></div>';
     
  }
  echo '<h2>'.$title.'</h2>';
  echo '<p>'.$description.'</p>';

endwhile;
endif;
?>