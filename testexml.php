<?php
	include_once 'classes/CountFiles.class.php';

	$f = new CountFiles( 'content/js/' );
	echo $f->getCount();
?>