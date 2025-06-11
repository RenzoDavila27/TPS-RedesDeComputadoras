/****************************************************************
(C) 2008 Kishore Nallan for DesignShack
http://www.kishorelive.com
kishore.nc@gmail.com
*****************************************************************/

$(document).ready(function(){

	var shifton = false;
	var campoActivo="#numeroDocumento";


	$("#numeroDocumento").click(function(e) {
		campoActivo="#numeroDocumento";
	});


	
	$("#showkeyboard").click(function(e) {
		var leftVal = document.getElementById('tecladoVirtual').offsetLeft;
		var topValIE = document.getElementById('tecladoVirtual').offsetTop;
		var topValMo;
		leftVal-=10;
		topValIE-=5;
		topValMo = -5+topValIE;
		leftVal+="px";
		topValIE+="px";
		topValMo+="px";
		$('#keyboard').css({left:leftVal, _top:topValIE, top:topValMo}).show();

	});

	$("#showkeyboardX").click(function(e) {
		var height = $('#keyboard').height();
		var width = $('#keyboard').width();
		leftVal=e.pageX-40+"px";
		topVal=e.pageY+20+"px";
		$('#keyboard').css({left:leftVal,top:topVal}).hide();
	});

	
	function onShift(e) {
		var i;
		if(e==1) {
			for(i=0;i<4;i++) {
				var rowid = "#row" + i;
				$(rowid).hide();
				$(rowid+"_shift").show();
			}
		}
		else {
			for(i=0;i<4;i++) {
				var rowid = "#row" + i;
				$(rowid).show();
				$(rowid+"_shift").hide();
			}
		}
	 }

	
	$("#keyboard input").on("click", function(e) {

		if( $(this).val() == "  " ) {
			$(campoActivo).replaceSelection("", true);
			$(campoActivo).focus();
		}

		else if( $(this).val() == " " ) {
			if(shifton == false) {
				onShift(1);
				shifton = true;
			}

			else {
				onShift(0);
				shifton = false;
			}
		}

		else {
			if($(campoActivo).val().length < $(campoActivo).attr('maxlength')){
				$(campoActivo).replaceSelection($(this).val(), true);
				$(campoActivo).focus();
			}
		
			if(shifton == true) {
				onShift(0);
				shifton = false;
			}
		}
	});

});


