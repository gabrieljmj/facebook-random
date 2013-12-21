<?php
	class CountFiles{
		private $dir;

		private $totalFiles = 0;

		public function __construct( $dir ){
			$this->dir = $dir;

			$handle = opendir( $this->dir );

			while ( false !== ( $file = readdir( $handle ) ) ){ 
				if( $file != "." && $file != ".." && !( is_dir( $this->dir . $file ) ) ){ 
					$this->totalFiles++;
				} 
			}

			closedir( $handle ); 
		}

		public function getCount(){
			return $this->totalFiles;
		}
	}
?>