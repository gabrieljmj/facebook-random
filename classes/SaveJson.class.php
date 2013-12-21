<?php
	class SaveJson extends JSonInfo implements OperationsSave{
		public function save(){
			$jsonFinal = "{\n\"user\": {\"ip\": \"" . $this->userIp . "\"},\n\"date\": \"" . $this->date . "\",\n" . substr($this->json, 1);

			$create = file_put_contents( $this->dir . '/' . $this->raffleId . '.json', $jsonFinal );
			if( $create ){
				return true;
			}
			return false;
		}
	}
?>