<?php
	interface Head{
		public function createTitle( $title );
		public function createScript( array $attributes, $code = false );
		public function createMetaTag( array $attributes );
		public function createLink( array $attributes );
		public function inBrowser( $broser, $whatDo );
	}

	class CompositeHead implements Head{
		public function createTitle( $title ){
			return "<title>{$title}</title>\n";
		}

		public function createScript( array $attributes, $code = false ){
			$attributesKeys = array_keys( $attributes );
			$attributesValues = array_values( $attributes );

			$attributesAll = '';

			for($i = 0; $i < count($attributes); $i++){
				$attributesAll .= $attributesKeys[$i] . '="' . $attributesValues[$i] . '" ';
			}

			if( $code ){
				return "<script {$attributesAll}> " . htmlspecialchars( $code ) . "</script>\n";
			}else{
				return "<script {$attributesAll}></script>\n";
			}
		}

		public function createMetaTag( array $attributes ){
			$attributesKeys = array_keys( $attributes );
			$attributesValues = array_values( $attributes );

			$attributesAll = '';

			for($i = 0; $i < count($attributes); $i++){
				$attributesAll .= $attributesKeys[$i] . '="' . $attributesValues[$i] . '" ';
			}

			return "<meta {$attributesAll}/>\n";
		}

		public function createLink( array $attributes ){
			$attributesKeys = array_keys( $attributes );
			$attributesValues = array_values( $attributes );

			$attributesAll = '';

			for($i = 0; $i < count($attributes); $i++){
				$attributesAll .= $attributesKeys[$i] . '="' . $attributesValues[$i] . '" ';
			}

			return "<link {$attributesAll}/>\n";
		}

		public function inBrowser( $broser, $whatDo ){
			return "<!--[if lt $broser]>
			$whatDo
		<![endif]-->\n";
		}
	}
?>