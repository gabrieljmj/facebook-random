<?php

	include_once 'classes/Composite/CompositeHead.class.php';

	$head = new CompositeHead;

	//title
	$title = ( !isset( $title ) ) ? 'LIKE TO GET LUCKY' : $title;
	echo $head->createTitle( $title );

	//links
	echo "\n";
	echo '                ';
	echo $head->createLink( array(
		'rel' => 'stylesheet',
		'href' => 'content/css/bootstrap.css',
		'type' => 'type/css'
	) );
	echo '                ';
	echo $head->createLink( array(
		'rel' => 'stylesheet',
		'href' => 'content/css/main.css',
		'type' => 'type/css'
	) );

	//encode
	echo "\n";
	echo '                ';
	echo $head->createMetaTag( array(
		'charset' => 'utf-8'
	) );

	//scripts
	echo "\n";
	echo '                ';
	echo $head->createScript( array(
		'src' => 'content/js/jquery.1.8.1.min.js',
		'type' => 'text/javascript'
	) );
	echo '                ';
	echo $head->createScript( array(
		'src' => 'content/js/otherfunctions.js',
		'type' => 'text/javascript'
	) );
	echo '                ';
	echo $head->createScript( array(
		'src' => 'content/js/main.js',
		'type' => 'text/javascript'
	) );
	echo '                ';
	echo $head->inBrowser( 'IE 9', $head->createScript( array(
		'src' => 'content/js/html5shiv.js',
		'type' => 'text/javascript'
	) ) )
?>