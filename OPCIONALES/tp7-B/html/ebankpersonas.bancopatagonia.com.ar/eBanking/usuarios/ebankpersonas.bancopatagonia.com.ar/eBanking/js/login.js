
function enterKeyLogin(evt) {
	var evt = (evt) ? evt : event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode == 13) {
		ingresando();
	}
}

function verificarCamposVaciosLogin(){
	var formLogin = document.getElementById("formLogin");
	var usuario = formLogin.username.value;

	var clave = formLogin.password.value;
	if((usuario == "" && document.getElementById("usernameDocumento")!=null && document.getElementById("usernameDocumento").value == "") || clave == ""){
		if(document.getElementById("documento").checked)
			alert("Debe ingresar el número de Documento y una Clave para poder ingresar");
		else
			alert("Debe ingresar un Nombre de Usuario y una Clave para poder ingresar");
		return false;
	} else {
		var errorDiv = document.getElementById('errorDiv');
		if (errorDiv) {
			errorDiv.style.display='none';
		}
		document.getElementById('loadingDiv').style.display='';
		return true;

	}
}

function clear() {
	document.getElementById("formLogin").reset();
	document.getElementById('loadingDiv').style.display='none';
	var errorDiv = document.getElementById('errorDiv');
	if (errorDiv) {
		errorDiv.style.display='none';
	}
}

function isEmailAddress(email)
{
var s = email;
var filter=/^[A-Za-z0-9][A-Za-z0-9_.]*@[A-Za-z0-9_]+\.[A-Za-z0-9_.]+[A-za-z]$/;
if (s.length == 0 ) return true;
   if (filter.test(s))
      return true;

return false;
}
