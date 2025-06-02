//<!--
/* CertiSur Seal - JavaScript version 1.0 */

function showSeal(host_name,lang,transparent,folder,filename,swfwidth,swfheight)
{
  if (transparent == "yes"){
    var trans = "transparent";
  } else {
    var trans = "window";
  }
  document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+swfwidth+'" height="'+swfheight+'" id="'+filename+'" align="middle">\n');
  document.write('<param name="movie" value="'+folder+filename+'.swf?host_name='+host_name+'&amp;lang='+lang+'" />\n');
  document.write('<param name="loop" value="false" />\n');
  document.write('<param name="menu" value="false" />\n');
  document.write('<param name="quality" value="best" />\n');
  document.write('<param name="wmode" value="'+trans+'" />\n');
  document.write('<param name="bgcolor" value="#ffffff" />\n');
  document.write('<param name="allowScriptAccess" value="always" />\n');
  document.write('<embed src="'+folder+filename+'.swf?host_name='+host_name+'&amp;lang='+lang+'" loop="false" menu="false" quality="best" wmode="'+trans+'" bgcolor="#ffffff" width="'+swfwidth+'" height="'+swfheight+'" name="'+filename+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="https://www.macromedia.com/go/getflashplayer" />\n');
  document.write('</object>\n');
}

function Seal_Certificado(host_name,lang,version)
{
  u1="https://seal.certisur.com/getseal?host_name="+host_name+"&lang="+lang+"&version="+version;
  if (opener && !opener.closed) {
    opener.focus();
  } else {
    var w = 810;
    var h = 512;
    var x = (screen.width/2) - (w/2);
    var y = (screen.height/2) - (h/2) - 30;
    tbar = 'location=yes,status=yes,resizable=yes,scrollbars=yes,width='+w+',height='+h+',left='+x+',top='+y;
    var sw = window.open(u1,'CS_Seal',tbar);
    if (sw) {
      sw.focus();
      opener=sw;
    }
  }
}
// -->