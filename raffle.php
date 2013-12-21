<?php
	include_once 'classes/Composite/CompositeHead.class.php';

	$html = new CompositeHead;
?>
<!doctype html>
<html>
	<head>
		<?php include_once 'DOM/head.php'; ?>
	</head>
	<body>
	<header>
		<h1>LIKE TO GET LUCKY</h1>
	</header>
	<div class="content">
		<div class="form">	
			<div class="post-url-div">
				<input type="url" id="post-url" placeholder="URL da postagem" required="required" class="form-control" />
			</div>
			<div class="raffle-type-div">
				<select id="raffle-type" required="required" class="form-control">
					<option disabled="disabled" selected="selected">Para...</option>
					<option value="likes">quem curtiu a postagem</option>
					<option value="comments">quem comentou a postagem</option>
					<option value="like-and-comment">quem curtiu e comentou a postagem</option>
				</select>
			</div>
			<div class="required-comment-div">
			</div>
			<div class="max-winners-div">
				<input type="text" id="max-winners" placeholder="Número máximo de vencedores" class="form-control" />
			</div>
			<div class="button-div">
				<button id="raffle" class="btn btn-success" type="submit">Sortear</button>
				<br /><input type="checkbox" id="save" />
				<label for="save">Salvar resultado</label>
			</div>
		</div>
		<div class="result" id="result">
			<div class="div-title">
			</div>
			<div id="result-users">
			</div>
		</div>
		<div class="error" id="error">
			<div class="error-title">
			</div>
			<div id="error-description">
			</div>
		</div>
	</div>
	<div id="load">
		<div class="bg"></div>
		<div class="modal2">
			<div class="progress progress-striped active" style="width: 199px; margin: 0 auto;">
				<div class="progress-bar progress-bar-danger"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
					<span class='sr-only'>Sorteando</span>
				</div>
			</div>
		</div>
	</div>
	<footer class="footer">
		<ul class="ul">
			<li class="li"><a href="https://docs.google.com/forms/d/1a79BDS5zSsHm2uKWS7dzMekA-yR9a-EJ8o5paMN8EHE/viewform" target="_blank">Reportar um bug</a></li>
			<li class="li" style="border: none;"><a href="http://www.twitter.com/gabrieljmj" target="_blank">Desenvolvedor</a></li>
		</ul>
	</footer>
	</body>
</html>