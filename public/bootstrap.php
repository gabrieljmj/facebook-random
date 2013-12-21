<?php
	error_reporting( E_ALL | E_STRICT );

	define( 'DS', DIRECTORY_SEPARATOR );
	define( 'APP_ROOT', realpath( __DIR__ . DS . '..' ) );
	$composer_autoload = APP_ROOT . 'autoload.php';