function getUserInfo(id){
	$.ajax({
		type: 'GET',
		url: 'http://graph.facebook.com/' + id,
		dataType: 'json',
		success: function(data){
			return data;
		}
	});
}