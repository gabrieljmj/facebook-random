<?php
	include_once 'classes/InterfaceOperationsSave.php';
	include_once 'classes/JsonInfo.class.php';
	include_once 'classes/SaveJson.class.php';
	include_once 'classes/CountFiles.class.php';

	if( isset( $_POST['json'] ) ){
		$json = $_POST['json'];

		$date = new DateTime( null, new DateTimeZone( 'America/Sao_Paulo' ) );
		$date =  $date->format( 'd/m/Y H:i' );

		$id = new CountFiles( 'raffles' );
		$id = $id->getCount() + 1;

		$save = new SaveJson;
		$save->setId( $id );
		$save->setDate( $date );
		$save->setUserIp( $_SERVER['REMOTE_ADDR'] );
		$save->setDir( 'raffles' );
		$save->setJson( $json );
		if( $save->save() ){
			echo '{ 
				    "errors": 0,
					"randomId": ' . $id . '
				}';
		}else{
			echo '{ 
				"errors": 1 
			}';
		}
	}else{
		include_once 'page_errors/404.php';
	}
?>