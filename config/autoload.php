<?php
	define( 'CLASSES', 'classes/' );
	define( 'COMPOSITE', CLASSES . 'Composite' );
	define( 'DB', CLASSES . 'DataBase' );

	function classLoad( string $type = null, string $file = null ){
		if( $type != null ){
			if( $type == 'composite' ){
				if( $file != null ){
					include_once COMPOSITE . $file . '.class.php';
				}else{
					include_once COMPOSITE . '.class.php';
				}
			}elseif( $type == 'database' ){
				if( $file != null ){
					include_once DB . $file . '.class.php';
				}else{
					include_once DB . '.class.php';
				}
			}
		}else{
			include_once DB . '.class.php';
		}
	}
?>