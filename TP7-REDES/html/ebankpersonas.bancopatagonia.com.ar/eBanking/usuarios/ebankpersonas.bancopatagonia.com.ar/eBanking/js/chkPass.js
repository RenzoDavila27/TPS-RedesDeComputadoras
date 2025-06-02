
function CheckPassHB(val1,val2,val3,val4, msn)
{
	return null;
//	if(val1!=null)
//		val1=val1.toLowerCase();
//	if(val2!=null)
//		val2=val2.toLowerCase();
//	return CheckPassNew(val1,val2,val3,val4,3,1,msn);
}

function CheckPass(val1,val2,val3,val4)
{
	if(val1!=null)
		val1=val1.toLowerCase();
	if(val2!=null)
		val2=val2.toLowerCase();
	return CheckPassNew(val1,val2,val3,val4,3,1,"a nueva clave");
}
function CheckPassNew(val1,val2,val3,val4,val5,val6,val7)
{

	var i = 0;
	var p = 0;
	var c3 = 1;
	var a = 0;
	var sa = 1;
	var sd = 1;
	var pa = 0;
	var ca = 0;
	var cn = 0;
	var ant = 0;
	var layout = new Array();
	var UsrId = val3.charAt(val3.length -1);

	
	var message=val7;
	layout[layout.length] = "QWERTY";
	layout[layout.length] = "YTREWQ";
	layout[layout.length] = "ASDFG";
	layout[layout.length] = "GFDSA";
	layout[layout.length] = "ZXCVB";
	layout[layout.length] = "BVCXZ";

	for (i = val3.length - 2; i >= 0; i--)
		UsrId += val3.charAt(i);

	if ((val1.indexOf(val3) != -1) || (val3.indexOf(val1) != -1))
		p = 9;



	if (p == 0 && val6 == 1)
	{
		for (i = 0; i < layout.length; i++)
		{
			if ((val1.substring(0, layout[i].length).toUpperCase() == layout[i]) ||
				(val1.substring(8 - layout[i].length).toUpperCase() == layout[i]))
			{
				p = 6;
				break;
			}
		}
	}

	if (p == 0)
	{
		if (val1.substring(0, 4) == val1.substring(4, 8))
			p = 8;
	}

	if (p == 0)
	{
		for (i = 0; i < val1.length; i++)
		{
			a = val1.charCodeAt(i);
			if (a >= 48 && a <= 57)
				cn++;
			else
				if ((a >= 65 && a <= 90) || (a >= 97 && a <= 122))
					ca++;

			if (a == ant)
			{
				if (++c3 > val5)
				{
					p = 2;
					break;
				}
			}
			else
			{
				c3 = 1;
				if (ant == a - 1)
				{
					if (++sa > val5)
					{
						p = 4;
						break;
					}
					sd = 1;
				}
				else
				{
					if (ant == a + 1)
					{
						if (++sd > val5)
						{
							p = 5;
							break;
						}
						sa = 1;
					}
					else
					{
						sa = 1;
						sd = 1;
					}
				}
			}

			if (a == val2.charCodeAt(i))
			{
				if (++pa > 5)
				{
					p = 14;
					break;
				}
			}

			ant = a;

		}
	}

	
	if (p == 0 && (ca + cn) != 8 )
		p = 11;





   
	if (p == 0 && (cn == 0 || (val4 == 0 && ca != 0) || (val4 != 0 && ca == 0)))
		p = 1;
	
	if (p != 0)
		return message;
	else
		return null;
}
function chkAlias(alias){
	var ret=0;
	var ca=0;
	var cn=0;
	var can=0;

	if(alias == null || alias.length< 8 || alias.length>15)
		ret=1;
	for (i = 0; i < alias.length; i++){
			a = alias.charCodeAt(i);
			if (a >= 48 && a <= 57)
				cn++;
			else
				if ((a >= 65 && a <= 90) || (a >= 97 && a <= 122))
					ca++;
	}

	for (i = 0; i < alias.length; i++){
		a = alias.charCodeAt(i);
		if (!( (a >= 65 && a <= 90) || (a >= 97 && a <= 122) || (a >= 48 && a <= 57) || a==32 ))
			can++;

	}

	if(can>0)
		ret=3;


	if(ca==0 )
		ret=2;

	if(ret>0)
		return false;
	

	return true;
}
function validatePrompt(Ctrl,PromptStr)
{
	Ctrl.focus();
	Ctrl.select();
	alert(PromptStr);
}

