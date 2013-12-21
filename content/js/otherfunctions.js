function end (arr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Legaev Andrey
  // +    revised by: J A R
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   restored by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Uses global: php_js to store the array pointer
  // *     example 1: end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
  // *     returns 1: 'Zonneveld'
  // *     example 2: end(['Kevin', 'van', 'Zonneveld']);
  // *     returns 2: 'Zonneveld'
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.pointers = this.php_js.pointers || [];
  var indexOf = function (value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };
  // END REDUNDANT
  var pointers = this.php_js.pointers;
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      ct++;
      var val = arr[k];
    }
    if (ct === 0) {
      return false; // Empty
    }
    pointers[arrpos + 1] = ct - 1;
    return val;
  }
  if (arr.length === 0) {
    return false;
  }
  pointers[arrpos + 1] = arr.length - 1;
  return arr[pointers[arrpos + 1]];
}

function jsGet(name, wl){

	if(wl == 'undefined'){
		wl = window.location.href;
	}

    var vars = [], hash;
    var hashes = wl.slice(wl.indexOf('?') + 1).split('&');
 
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
		hash[1] = unescape(hash[1]);
		vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
 
    return vars[name];
}

function getRandomArbitrary(min, max) {
	  return Math.floor((Math.random() * (max + 1 - min)) + min);
}

function verifyIfElementExists(array, element){
	var results = 0;
	for(i = 0; i < array.length; i++){
		if(array[i] == element){
			results += 1;
		}
	}
	if(results == 0){
		return false;
	}else{
		return true;
	}
}

function isEmail(mail){
	var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
	if(typeof(mail) == "string"){
		if(er.test(mail)){ return true; }
	}else if(typeof(mail) == "object"){
		if(er.test(mail.value)){ 
					return true; 
				}
	}else{
		return false;
		}
}

function verifyRamdoms(array, element, valueToPush){
	if(verifyIfElementExists(element)){
		array.push(valueToPush);
		return verifyRamdoms(array, element, valueToPush);
	}
}

function verifyUrl(host, url){
	var hostSeparated = host.split('/');
	var hostFinal = hostSeparated[2];

	if(hostFinal == url){
		return true;
	}else{
		return false;
	}
}

function getPostType(url){
	var urlSeparated = url.split('/');
	var urlSeparated2 = urlSeparated[3].split('?');
	var type = urlSeparated2[0];
	return type;
}

function isNumeric(str){
	var er = /^[0-9]+$/;
	return (er.test(str));
}

function createTxt(folder, fileName, fileContent){
		alert(fileContent);
		var fileDir = 'C:/wamp/www/fb-rd/' + folder + '/' + fileName;
		alert(fileDir);
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var s = fso.CreateTextFile(fileDir, false);
		s.WriteLine(fileContent);
		s.Close();
}