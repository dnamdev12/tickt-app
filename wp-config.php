<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
// For Local 
$hostname = $_SERVER['SERVER_NAME']; 

//VERIFY WHICH ENVIRONMENT THE APP IS RUNNING
switch ($hostname) {
    case 'localhost':
        define( 'DB_NAME', 'tickt' ); //he name of the database for WordPress
		define( 'DB_USER', 'root' ); // MySQL database username
		define( 'DB_PASSWORD', 'root' ); //MySQL database password
		define( 'DB_HOST', 'localhost' ); // MySQL Hostname
        break;
    case 'ticktwp.appskeeper.in':
        define( 'DB_NAME', 'ticktwp_usr' );
		define( 'DB_USER', 'ticktwp_usr' );
		define( 'DB_PASSWORD', 'Z5PdpTNUR479hNOM' );
		define( 'DB_HOST', '52.9.226.235' );
		define( 'DB_HOST_SLAVE', '52.9.226.235' );
        break;
	case 'ticktstgwp.appskeeper.in':
		define( 'DB_NAME', 'tickt_stgwp' );
		define( 'DB_USER', 'ticktwp_usr' );
		define( 'DB_PASSWORD', 'Z5PdpTNUR479hNOM' );
		define( 'DB_HOST', '52.9.226.235' );
		define( 'DB_HOST_SLAVE', '52.9.226.235' );
		break;
    default:
		define( 'DB_NAME', 'ticktwp_usr' );
		define( 'DB_USER', 'ticktwp_usr' );
		define( 'DB_PASSWORD', 'Z5PdpTNUR479hNOM' );
		define( 'DB_HOST', '52.9.226.235' );
		define( 'DB_HOST_SLAVE', '52.9.226.235' );
}

/* define( 'DB_NAME', 'tickt' ); //he name of the database for WordPress
define( 'DB_USER', 'root' ); // MySQL database username
define( 'DB_PASSWORD', 'root' ); //MySQL database password
define( 'DB_HOST', 'localhost' ); // MySQL Hostname */

// For Dev Server
/* define( 'DB_NAME', 'ticktwp_usr' );
define( 'DB_USER', 'ticktwp_usr' );
define( 'DB_PASSWORD', 'Z5PdpTNUR479hNOM' );
define( 'DB_HOST', '52.9.226.235' );
define( 'DB_HOST_SLAVE', '52.9.226.235' ); */

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );


/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '@c-z rH[!<EOgU4Cc!mC>RhO|oLCGjMD4O6-&(l_1-p%AaOo++=Vb`^tvf *$~XP' );
define( 'SECURE_AUTH_KEY',  'li;Da91=/TzUU!?d9a7b8 >.QVk<3o#CWmJUv^=j>+].WK]> S*$^|=GxDK;3*G_' );
define( 'LOGGED_IN_KEY',    ' zhaFGxd)~6>!6F2RAMm1U4Z`=cK,38ty)~b FQpo&`lwBad|cZ&6)sUp<:h[:5*' );
define( 'NONCE_KEY',        '_H<VK[}iB3E5eSryT;~Ui)%e[#p{];mO]KLY@ri~^G1+s)8L>>P45i#C$JCzYX3-' );
define( 'AUTH_SALT',        '-F7l9B@XQqvrmCI,|%<1{(A`D.R:9UJ=O.awj12<mNQ?GLhEL4%k)hBN0Z)?La3/' );
define( 'SECURE_AUTH_SALT', 'Ox?kVcJ:7_]PL@RKUgyv,m.:4R1ZJ{>.TfIV({v6o0<J;OSL sZUO,B/a&)GD|e%' );
define( 'LOGGED_IN_SALT',   '%NbWT}5F,3v0![j_|-2$d~hu/+9uB}m,Xaszxd9~^E,tZ}ZmFnp t{!x[k63M*c:' );
define( 'NONCE_SALT',       '@m`Wym>BkNC1r)Upo04^eTp(eJCPdQ|z%4@v6gS/}S;4V<MY2~#$Xl^*7>KibQ6J' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */

define( 'WP_DEBUG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'WP_DEBUG_LOG', true );
define('FS_METHOD','direct');

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

define('FS_METHOD', 'direct');
/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
