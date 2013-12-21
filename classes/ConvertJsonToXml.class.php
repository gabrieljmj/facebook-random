<?php
	class ConvertJsonToXml{
		private $oldJson;
		private $newXml;

		private $serializer;

		public function __construct( $json ){
			$this->oldJson = $json;
		}

		public function setClassSerializer( XML_Serializer $serializer ){
			$this->serializer = $serializer;
		}

		public function convert(){
			$json_decoded = json_decode( $this->oldJson );
			if( $this->serializer->serialize( $json_decoded ) ){
				return $this->serializer->getSerializedData();
			}else{
				return false;
			}
		}
	}
?>