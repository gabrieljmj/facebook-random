/**
* @author @GabrielJMJ /twitter
*/
$(document).ready(function(){
	$('#raffle-type').change(function(){
		if($(this).attr('value') == 'likes'){
			$('#required-comment-type').remove();
			$('#required-comment').remove();
		}else if($(this).attr('value') == 'comments' || $(this).attr('value') == 'like-and-comment'){
			$('#required-comment-type').remove();
			$('#required-comment').remove();
			$('.required-comment-div').append('<select id="required-comment-type" required="required" class="form-control" style="margin-top: 10px;"><option disabled="disabled" selected="selected">Qual o tipo de comentário válido?</option><option value="text">Texto qualquer</option><option value="email">Email</option><option value="determined-text">Determinado texto</option></select>');
			$('#required-comment-type').change(function(){
				if($(this).attr('value') == 'determined-text'){
					$('.required-comment-div').append('<input type="text" id="required-comment" placeholder="Comentário obrigatório da pessoa" class="form-control" style="margin-top: 10px;" />');
				}if($(this).attr('value') == 'text' || $(this).attr('value') == 'email'){
					$('#required-comment').remove();
				}
			});
		}
	});

	$('#raffle').click(function(){
		if($('#raffle-type').attr('value') == 'likes'){
			var typeAllowed = 'likes';
			var urlToGetData = 'http://graph.facebook.com/[POST-ID]/likes';
		}else if($('#raffle-type').attr('value') == 'comments'){
			var typeAllowed = 'comments';
			var urlToGetData = 'http://graph.facebook.com/[POST-ID]/comments';
		}else if($('#raffle-type').attr('value') == 'like-and-comment'){
			var typeAllowed = 'like-and-comment';
			var urlToGetData = 'http://graph.facebook.com/[POST-ID]/comments';
			var urlToGetLikes = 'http://graph.facebook.com/[POST-ID]/likes';
		}

		var postId = $('#post-id').attr('value');

			var maxWinners = $('#max-winners').attr('value');

			if(!isNumeric(maxWinners)){
				$('.error').show();
				$('.error-title').html('<h2>Erro:</h2>');
				$('#error-description').html('Informe em números a quantidade de sorteados!');
				$('#load').hide();
				$('#result').html('<div class="div-title">\n</div>\n<div id="result-users">\n</div>\n<div style="clear:both;"></div>');
			}else{
				$('.error-title').html('');
				$('#error-description').html('');
				$('.error').hide();

			var urlToGetFinal = urlToGetData.replace('[POST-ID]', postId);

			var requiredComment = '';
			var requiredCommentType = $('#required-comment-type').attr('value');
			if(requiredCommentType == 'determined-text'){
				var requiredComment = $('#required-comment').attr('value');
			}
			var maxComments = $('#max-comments').attr('value');

			$.ajax({
				type: 'GET',
				url: urlToGetFinal,
				data: {
					limit: '9999999999'
				},
				dataType: 'json',
				beforeSend: function(){
					$('#load').show();
				},
				error: function(dataError){
					$('.error').show();
					$('.error-title').html('<h2>Erro:</h2>');
					$('#error-description').html('O ID da postagem é inválido!');
					$('#load').hide();
				},
				success: function(data){
					$('.error-title').html('');
					$('#error-description').html('');
					$('.error').hide();
					var amountOfComments = data.data.length;

					if(amountOfComments == 0){
						$('.error').show();
						$('.error-title').html('<h2>Erro:</h2>');
						$('#error-description').html('Esta postagem não possui comentários ou não existe!');
						$('#load').hide();
					}else{
						$('.error-title').html('');
						$('#error-description').html('');
						$('.error').hide();
						$('#result').show();

						if(typeAllowed == 'like-and-comment'){
							var fileContent = '{"winners": [';
							$.ajax({
								type: 'GET',
								url: urlToGetLikes.replace('[POST-ID]', postId),
								data: {
									limit: '9999999999'
								},
								dataType: 'json',
								async: false,
								success: function(dataLikes){
									var likes = dataLikes.data;
									var usersAllowed = new Array();

									if(likes.length > amountOfComments){
										for(i = 0; i < likes.length; i++){
											for(n = 0; n < amountOfComments; n++){
												var user = data.data[n].from.name;
												var id = data.data[n].from.id;
												var comment = data.data[n].message;
												if(likes[i].id == data.data[n].from.id){
													if(requiredCommentType == 'email'){
														if(isEmail(comment)){
															usersAllowed.push({'id': id, 'comment': comment, 'name': user});
														}
													}else if(requiredCommentType == 'text'){
														usersAllowed.push({'id': id, 'comment': comment, 'name': user});
													}else if(requiredCommentType == 'determined-text'){
														usersAllowed.push({'id': id, 'comment': comment, 'name': user});
													}
												}
											}
										}
									}else{
										for(n = 0; n < amountOfComments; n++){
											for(i = 0; i < likes.length; i++){
												var user = data.data[n].from.name;
												var id = data.data[n].from.id;
												var comment = data.data[n].message;
												if(likes[i].id == data.data[n].from.id){
													if(requiredCommentType == 'email'){
														if(isEmail(comment)){
															usersAllowed.push({'id': id, 'comment': comment, 'name': user});
														}
													}else if(requiredCommentType == 'text'){
														usersAllowed.push({'id': id, 'comment': comment, 'name': user});
													}else if(requiredCommentType == 'determined-text'){
														usersAllowed.push({'id': id, 'comment': comment, 'name': user});
													}
												}	
											}
										}
									}

									if(usersAllowed.length == 0){
										$('.error').show();
										$('.error-title').html('<h2>Erro:</h2>');
										$('#error-description').html('Esta postagem não possui comentários válidos!');
										$('#result').hide();
									}else{
										if(maxWinners > usersAllowed.length){
											maxWinners = usersAllowed.length;
										}

										if(maxWinners > 1){
											$('.div-title').html('<h2>Resultado:</h2>');
											var randoms = new Array();
											function getRandomNumber(min, max){
												random = getRandomArbitrary(min, max);
												while(verifyIfElementExists(randoms, random)){
													random = getRandomArbitrary(min, max);
												}
												if(!verifyIfElementExists(randoms, random)){
													randoms.push(random);
												}
											}

											for(i = 0; i < maxWinners; i++){
												getRandomNumber(0, usersAllowed.length - 1);
												if(randoms[i] == 'undefined'){
													getRandomNumber(0, usersAllowed.length - 1);
												}
												var randomNumber = randoms[i];
												var userId = usersAllowed[randomNumber]['id'];
												var userComment = usersAllowed[randomNumber]['comment'];
												var userName = usersAllowed[randomNumber]['name'];

												fileContent = fileContent + '\n{"id": "' + userId + '", "name": "' + userName + '", "comment": "' + userComment + '"}, ';

												$('#result-users').append('<li class="user-winner"><div class="user-img"><img class="img1" src="http://graph.facebook.com/' + userId + '/picture" width="50" height="50" /></div><div class="user-name"><a href="http://facebook.com/profile.php?id=' + userId + '" target="_blank">' + userName + '</a></div><div class="user-comment">' + userComment + '</div><div style="clear: both;"></div></li>');
											}
										}else{
											$('.div-title').html('<h2>Vencedor:</h2>');
											var randomNumber = getRandomArbitrary(0, usersAllowed.length - 1);
											var userId = usersAllowed[randomNumber]['id'];
											var userComment = usersAllowed[randomNumber]['comment'];
											var userName = usersAllowed[randomNumber]['name'];

											fileContent = fileContent + '\n{"id": "' + userId + '", "name": "' + userName + '", "comment": "' + userComment + '"}, ';
											
											$('#result-users').append('<li class="user-winner"><div class="user-img"><img class="img1" src="http://graph.facebook.com/' + userId + '/picture" width="50" height="50" /></div><div class="user-name"><a href="http://facebook.com/profile.php?id=' + userId + '" target="_blank">' + userName + '</a></div><div class="user-comment">' + userComment + '</div><div style="clear: both;"></div></li>');
										}
										fileContent = fileContent + '] }';
									}
									$('#load').hide();
								}
							});
						}else{
							var fileContent = '{"winners": [';
							var usersAllowed = new Array();
							for(i = 0; i < amountOfComments; i++){
								if(typeAllowed == 'likes'){
									var user = data.data[i].name;
									var id = data.data[i].id;
								}else if(typeAllowed == 'comments'){
									var user = data.data[i].from.name;
									var id = data.data[i].from.id;
									var comment = data.data[i].message;
								}

								if(typeAllowed == 'likes'){
									usersAllowed.push({'id': id, 'name': user});
								}else if(typeAllowed == 'comments'){
									if(requiredCommentType == 'email'){
										if(isEmail(comment)){
											usersAllowed.push({'id': id, 'comment': comment, 'name': user});
										}
									}else if(requiredCommentType == 'text'){
										usersAllowed.push({'id': id, 'comment': comment, 'name': user});
									}else if(requiredCommentType == 'determined-text'){
										if($('#required-comment').attr('value') == comment){
											usersAllowed.push({'id': id, 'comment': comment, 'name': user});
										}
									}
								}
							}

							if(usersAllowed.length == 0){
								$('.error').show();
								$('.error-title').html('<h2>Erro:</h2>');
								$('#error-description').html('Esta postagem não possui comentários válidos!');
								$('#result').hide();
							}else{
								if(maxWinners > usersAllowed.length){
									maxWinners = usersAllowed.length;
								}

								if(maxWinners > 1){
									$('.div-title').html('<h2>Resultado:</h2>');
									var randoms = new Array();
									function getRandomNumber(min, max){
										random = getRandomArbitrary(min, max);
										while(verifyIfElementExists(randoms, random)){
											random = getRandomArbitrary(min, max);
										}
										if(!verifyIfElementExists(randoms, random)){
											randoms.push(random);
										}
									}

									var fileContent = '{"winners": [';

									for(i = 0; i < maxWinners; i++){
										getRandomNumber(0, usersAllowed.length - 1);
										if(randoms[i] == 'undefined'){
											getRandomNumber(0, usersAllowed.length - 1);
										}
										var randomNumber = randoms[i];
										var userId = usersAllowed[randomNumber]['id'];
										if(typeAllowed == 'comments'){
											var userComment = usersAllowed[randomNumber]['comment'];
										}
										var userName = usersAllowed[randomNumber]['name'];

										if(typeAllowed == 'comments'){
											fileContent = fileContent + '\n{"id": "' + userId + '",\n"name": "' + userName + '",\n"comment": "' + userComment + '"\n}, \n';
										}else{
											fileContent = fileContent + '\n{\n"id": "' + userId + '",\n"name": "' + userName + '"\n},\n';
										}

										if(typeAllowed == 'likes'){
											$('#result-users').append('<li class="user-winner"><div class="user-img"><img class="img1" src="http://graph.facebook.com/' + userId + '/picture" width="50" height="50" /></div><div class="user-name"><a href="http://facebook.com/profile.php?id=' + userId + '" target="_blank">' + userName + '</a></div><div style="clear: both;"></div></li>');
										}else{
											$('#result-users').append('<li class="user-winner"><div class="user-img"><img class="img1" src="http://graph.facebook.com/' + userId + '/picture" width="50" height="50" /></div><div class="user-name"><a href="http://facebook.com/profile.php?id=' + userId + '" target="_blank">' + userName + '</a></div><div class="user-comment">' + userComment + '</div><div style="clear: both;"></div></li>');
										}
									}
								}else{
									$('.div-title').html('<h2>Resultado:</h2>');
									var randomNumber = getRandomArbitrary(0, usersAllowed.length - 1);
									var userId = usersAllowed[randomNumber]['id'];
									var userComment = usersAllowed[randomNumber]['comment'];
									var userName = usersAllowed[randomNumber]['name'];
									if( typeAllowed == 'likes' ){
										fileContent = fileContent + '\n{"id": "' + userId + '", "name": "' + userName + '"}, ';
										$('#result-users').append('<li class="user-winner"><div class="user-img"><img class="img1" src="http://graph.facebook.com/' + userId + '/picture" width="50" height="50" /></div><div class="user-name"><a href="http://facebook.com/profile.php?id=' + userId + '" target="_blank">' + userName + '</a></div><div class="user-comment"></div><div style="clear: both;"></div></li>');
									}else{
										fileContent = fileContent + '\n{"id": "' + userId + '", "name": "' + userName + '", "comment": "' + userComment + '"}, ';
										$('#result-users').append('<li class="user-winner"><div class="user-img"><img class="img1" src="http://graph.facebook.com/' + userId + '/picture" width="50" height="50" /></div><div class="user-name"><a href="http://facebook.com/profile.php?id=' + userId + '" target="_blank">' + userName + '</a></div><div class="user-comment">' + userComment + '</div><div style="clear: both;"></div></li>');
									}
								}

								fileContent = fileContent + ']\n}';
							}
							$('#load').hide();
						}
					}
				}

			});
		
	}
	});
});