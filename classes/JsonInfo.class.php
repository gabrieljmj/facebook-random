<?php
	abstract class JSonInfo{
		protected $dir;
		protected $userId;
		protected $userIp;
		protected $json;
		protected $raffleId;

		public function setId( $countFiles ){
			$this->raffleId = $countFiles;
		}

		public function setDir( $dir ){
			$this->dir = $dir;
		}

		public function setJson( $json ){
			$this->json = str_replace("\\", '', $json );
		}

		public function setUserIp( $ip ){
			$this->userIp = $ip;
		}

		public function setDate( $date ){
			$this->date = $date;
		}
	}
?>