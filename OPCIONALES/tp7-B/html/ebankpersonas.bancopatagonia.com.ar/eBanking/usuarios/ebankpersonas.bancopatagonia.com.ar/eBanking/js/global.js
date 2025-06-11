function invoke(url, callback) {
    wait =
        new YAHOO.widget.Panel("wait",
            {
                width: "240px",
                fixedcenter: true,
                close: false,
                draggable: false,
                zindex: 4,
                modal: true,
                visible: true
            }
        );
    wait.setHeader("Ejecutando ...");
    wait.setBody('<img src="../images/rel_interstitial_loading.gif" />');
    wait.render(document.body);
    var _callback =
        {
            success: function (o) {
                wait.hide();
                callback.success(o);
            },
            failure: function (o) {
                wait.hide();
                error =
                    new YAHOO.widget.SimpleDialog("error",
                        {
                            width: "240px",
                            fixedcenter: true,
                            close: true,
                            draggable: true,
                            zindex: 4,
                            modal: true,
                            visible: true,
                            icon: YAHOO.widget.SimpleDialog.ICON_WARN,
                            text: "Ha ocurrido un error inesperado, por favor intente nuevamente",
                            buttons: [{
                                text: "Cerrar",
                                handler: function () {
                                    this.hide();
                                }, isDefault: true
                            }]
                        }
                    );
                error.setHeader("Aviso");
                error.render(document.body);
            },
            argument: callback.arguments
        };
    var transaction = YAHOO.util.Connect.asyncRequest('GET', url, _callback);
}


function initYUI(base, modules) {
    initYUI(base, modules, function () {
    });
}

function initYUI(base, modules, success) {
    var loader = new YAHOO.util.YUILoader({
        require: modules,
        loadOptional: true,
        base: base + "/js/yui/build/",
        onSuccess: success,
        onFailure: function (msg, xhrobj) {
        }
    });

    loader.insert();

}

function printPartOfPage(elementId) {
    var printContent = document.getElementById(elementId).innerHTML;
    var fr = document.createElement("<iframe id='print_me' style='display:none;'></iframe>");
    var fr_body = document.createElement("body");
    fr_body.appendChild(printContent);
    fr.appendChild(fr_body);
    document.body.appendChild(fr);
    fr.focus();
    fr.print();
}

function sendMail(elementId) {
    var printContent = document.getElementById(elementId);
    var fr = document.createElement("<iframe name='mailFrame' src='' width='1px' height='1px' style='border:0;background:transparent;'>");
    var fr_body = document.createElement("body");
    fr_body.appendChild(printContent);
    fr.appendChild(fr_body);
    document.body.appendChild(fr);
    fr.focus();
    fr.print();
}


function ajaxFunction() {
    var xmlHttp;
    try {
        xmlHttp = new XMLHttpRequest();
        return xmlHttp;
    } catch (e) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            return xmlHttp;
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                return xmlHttp;
            } catch (e) {
                alert("Your browser does not support AJAX!");
                return false;
            }
        }
    }
}


function diasEntreFechas(e_dia, e_mes, e_anio) {
    var hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    e_mes--;
    var fechaX = new Date(e_anio, e_mes, e_dia);
    var daysApart = 0;
    if (fechaX != null && fechaX.getTime() > hoy.getTime()) {
        daysApart = Math.abs(Math.round((fechaX - hoy) / 86400000));
    }
    return daysApart;
}

function fechaSeleccionada(e_dia, e_mes, e_anio) {

    var fechaX = new Date(e_anio, e_mes, e_dia);
    return fechaX;
}


function cambiarSeleccion(id) {
    var list = document.getElementById("tabs").getElementsByTagName("li");
    for (i = 0; i < list.length; i++) {
        list[i].className = "select";
    }
    var divId = document.getElementById(id);
    divId.className = "current";
    var subDivId = document.getElementById(id + id);
    if (subDivId != null) {
        subDivId.className = "select_sub show";


        var menuWidth = document.getElementsByTagName("div")["menu"].offsetWidth;
        subDivId.style.width = menuWidth;
    }
    current = id;
}


var ticket_pago = null;

function mostrarTicket(nroPago, url) {
    var responseSuccess = function (o) {
        if (ticket_pago) {

            ticket_pago.destroy();

        }

        var panel = new YAHOO.widget.SimpleDialog("ticket_pago" + nroPago,
            {
                width: "300px",
                height: "400px",
                visible: true,
                draggable: true,
                close: true,
                zIndex: 0,
                x: 300,
                y: 40,
                fixedcenter: false,
                constraintoviewport: false,
                buttons: [{
                    text: "Imprimir",
                    handler: function () {
                        printContenido(o.responseText), {
                            text: "Volver",
                            handler: function () {
                                this.hide();
                            }, isDefault: true
                        };
                    }
                }]
            });

        panel.setHeader("Ticket");
        panel.setBody(o.responseText);
        panel.setFooter("");
        panel.render(document.body);
        ticket_pago = panel;

    };
    var callback = {
        success: responseSuccess
    };
    invoke(url + '?nroPago=' + nroPago, callback);
}

function mostrarCBU(id_cuenta, ctx) {

    var args = [];


    var idCuenta = id_cuenta.replace(/\+/, "%2B");
    var responseSuccess = function (o) {

        var panel = new YAHOO.widget.SimpleDialog("cbu_panel_" + id_cuenta,
            {
                width: "320px",
                visible: true,
                draggable: true,
                close: true,
                fixedcenter: true,
                constraintoviewport: true,
                buttons: [{
                    text: "Cerrar",
                    handler: function () {
                        this.hide();
                    }, isDefault: true
                }, {
                    text: "Imprimir",
                    handler: function () {
                        printContenido(o.responseText);
                    }
                }
                ]
            });
        panel.setHeader("Consulta de CBU");
        panel.setBody(o.responseText);
        panel.setFooter("");
        panel.render("contenido");
    };

    var responseFailure = function (o) {

    }

    var callback =
        {
            success: responseSuccess,
            failure: responseFailure,
            argument: args
        };


    invoke(ctx + '/cuentas/CBUDesdeCuenta.htm?id_cuenta=' + idCuenta, callback);
}

function comprobanteCBU(id_cuenta, ctx) {

    var args = [];

    var responseSuccess = function (o) {

        var panel = new YAHOO.widget.SimpleDialog("cbu_panel_" + id_cuenta,
            {
                width: "340px",
                visible: true,
                draggable: true,
                close: true,
                fixedcenter: true,
                constraintoviewport: true,
                buttons: [{
                    text: "Cerrar",
                    handler: function () {
                        this.hide();
                    }, isDefault: true
                }, {
                    text: "Imprimir",
                    handler: function () {
                        printContenido(o.responseText);
                    }
                }]
            });
        panel.setHeader("");
        panel.setBody(o.responseText);
        panel.setFooter("");
        panel.render("contenido");
    };

    var responseFailure = function (o) {

    }

    var callback =
        {
            success: responseSuccess,
            failure: responseFailure,
            argument: args
        };

    invoke(ctx + '/cuentas/comprobanteCBU.htm?id_cuenta=' + id_cuenta, callback);
}


var varFecha;
var cal;

function initCalendar() {

    var navConfig = {
        strings: {
            month: "Mes",
            year: "A&ntilde;o",
            submit: "OK",
            cancel: "Cancel",
            invalidYear: "Ingrese un a&ntilde;o v&aacute;lido"
        },
        monthFormat: YAHOO.widget.Calendar.LONG,
        initialFocus: "year"
    };


    cal = new YAHOO.widget.Calendar("cal", "calContainer", {
        title: "Seleccione la fecha",
        navigator: navConfig,
        close: true
    });
    if (cal != null && cal.cfg != null) {
        cal.cfg.setProperty("DATE_FIELD_DELIMITER", "/");

        cal.cfg.setProperty("MDY_DAY_POSITION", 1);
        cal.cfg.setProperty("MDY_MONTH_POSITION", 2);
        cal.cfg.setProperty("MDY_YEAR_POSITION", 3);
        cal.cfg.setProperty("MD_DAY_POSITION", 1);
        cal.cfg.setProperty("MD_MONTH_POSITION", 2);
        cal.cfg.setProperty("MONTHS_SHORT", ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]);
        cal.cfg.setProperty("MONTHS_LONG", ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]);
        cal.cfg.setProperty("WEEKDAYS_1CHAR", ["D", "L", "M", "M", "J", "V", "S"]);
        cal.cfg.setProperty("WEEKDAYS_SHORT", ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]);
        cal.cfg.setProperty("WEEKDAYS_MEDIUM", ["Dom", "Lun", "Mar", "Mi?", "Jue", "Vie", "Sab"]);
        cal.cfg.setProperty("WEEKDAYS_LONG", ["Domingo", "Lunes", "Martes", "Mi?rcoles", "Jueves", "Viernes", "Sabado"]);
    }

}

function renderDateDisable(workingDate,cell){

}
function subscribeCalendarFondo(form,dates) {
    if (cal == null)
        initCalendar();

    cal.addRenderer(dates,function (workingDate, cell){
        YAHOO.util.Dom.removeClass(cell,this.Style.CSS_CELL_TODAY);
        YAHOO.util.Dom.addClass(cell, this.Style.CSS_CELL);
        YAHOO.util.Dom.addClass(cell, this.Style.CSS_CELL_OOB);
        cell.innerHTML=workingDate.getDate();
        return YAHOO.widget.Calendar.STOP_RENDER;
    });
    cal.render();
    cal.selectEvent.subscribe(function (p_sType, p_aArgs) {
        var aDate;

        if (p_aArgs) {

            aDate = p_aArgs[0][0];
            if (varFecha != null)
                var dd = aDate[2];
            if (dd < 10)
                dd = '0' + dd;
            var mm = aDate[1];
            if (mm < 10)
                mm = '0' + mm;

            document.getElementById(varFecha).value = dd + "/" + mm + "/" + aDate[0];
            document.getElementById("selectDesde").value = dd + "/" + mm + "/" + aDate[0];
        }

        cal.hide();

    });

}
function subscribeCalendar(form) {
    if (cal == null)
        initCalendar();
    cal.render();
    cal.selectEvent.subscribe(function (p_sType, p_aArgs) {
        var aDate;

        if (p_aArgs) {

            aDate = p_aArgs[0][0];
            if (varFecha != null)
                var dd = aDate[2];
            if (dd < 10)
                dd = '0' + dd;
            var mm = aDate[1];
            if (mm < 10)
                mm = '0' + mm;

            document.getElementById(varFecha).value = dd + "/" + mm + "/" + aDate[0];

            if (varFecha == "fechaDesde")
                document.getElementById("selectDesde").value = dd + "/" + mm + "/" + aDate[0];
            else if (varFecha == "fechaHasta")
                document.getElementById("selectHasta").value = dd + "/" + mm + "/" + aDate[0];
        }

        cal.hide();

    });

}

function subscribeCalendarProductos(form) {
    if (cal == null)
        initCalendar();
    cal.render();
    cal.selectEvent.subscribe(function (p_sType, p_aArgs) {
        var aDate;

        if (p_aArgs) {

            aDate = p_aArgs[0][0];
            if (varFecha != null)
                var dd = aDate[2];
            if (dd < 10)
                dd = '0' + dd;
            var mm = aDate[1];
            if (mm < 10)
                mm = '0' + mm;

            document.getElementById(varFecha).value = dd + "/" + mm + "/" + aDate[0];
            if (varFecha == "fechaDesde")
                document.getElementById("selectDesde").value = dd + "/" + mm + "/" + aDate[0];
            else if (varFecha == "fechaHasta")
                document.getElementById("selectHasta").value = dd + "/" + mm + "/" + aDate[0];
        }

        cal.hide();
    });

}

function subscribeCalendarFondos(form) {

    if (cal == null)
        initCalendar();
    cal.render();
    var submit = true;
    cal.selectEvent.subscribe(function (p_sType, p_aArgs) {
        var aDate;
        if (p_aArgs) {

            aDate = p_aArgs[0][0];
            if (varFecha != null) {
                var hoy = new Date();
                var fechaX = new Date(aDate[0], aDate[1] - 1, aDate[2]);
                if (fechaX != null && fechaX.getTime() < hoy.getTime()) {

                    var dd = aDate[2];
                    if (dd < 10)
                        dd = '0' + dd;
                    var mm = aDate[1];
                    if (mm < 10)
                        mm = '0' + mm;

                    submit = true;

                    document.getElementById(varFecha).value = dd + "/" + mm + "/" + aDate[0];
                } else {
                    alert("La fecha ingresada no puede ser mayor al d\u00eda de hoy.")
                    p_aArgs[0][0] = null;
                    submit = false;
                }
            }
        }

        cal.hide();
        if (form != null && submit) {
            showWaitPanel();
            form.submit();
        }

    });

}

function subscribeCalendarDias(dias) {
    var ocultar = true;
    if (cal == null)
        initCalendar();

    cal.render();
    cal.selectEvent.subscribe(function (p_sType, p_aArgs) {
        var aDate;

        if (p_aArgs) {

            aDate = p_aArgs[0][0];
            if (varFecha != null) {
                var df = diasEntreFechas(aDate[2], aDate[1], aDate[0]);
                if (df > 0) {
                    document.getElementById(varFecha).value = df;
                    ocultar = true;
                } else {
                    p_aArgs[0][0] = null;
                    alert("La fecha ingresada debe ser mayor al d\u00eda de hoy")
                    ocultar = false;
                }
                cal.reset();
            }

        }
        if (ocultar)
            cal.hide();

    });

}


function subscribeCalendarEmision(form) {
    var ocultar = true;
    if (cal == null)
        initCalendar();

    cal.render();
    cal.selectEvent.subscribe(function (p_sType, p_aArgs) {
        var aDate;
        if (p_aArgs) {
            aDate = p_aArgs[0][0];
            if (varFecha != null) {
                var hoy = new Date();
                var fechaX = fechaSeleccionada(aDate[2], aDate[1], aDate[0]);
                ;
                if (fechaX != null) {
                    var dd = aDate[2];
                    if (dd < 10) dd = '0' + dd;

                    var mm = aDate[1];
                    if (mm < 10) mm = '0' + mm;

                    document.getElementById(varFecha).value = dd + "/" + mm + "/" + aDate[0];
                    ocultar = true;
                }
                cal.reset();
            }

        }
        if (ocultar)
            cal.hide();

    });

}

function showCalFondos(fecha, mensaje, form, disableDates) {
    var dates = ""
    if(disableDates != null && disableDates !== ""){
        dates = disableDates.substr(1,disableDates.length-2);
    }
    varFecha = fecha;
    var xy = YAHOO.util.Dom.getXY(fecha);
    YAHOO.util.Dom.setStyle('calContainer', 'display', 'block');
    xy[0] = xy[0] + 10;
    xy[1] = xy[1] - 100;

    YAHOO.util.Dom.setXY('calContainer', xy);
    var auxDia = new Date();
    var minDate = (auxDia.getDate()+1) + "/" + (auxDia.getMonth()+1) + "/" + auxDia.getFullYear();
    var today = (auxDia.getDate()) + "/" + (auxDia.getMonth()+1) + "/" + auxDia.getFullYear();
    dates = today+","+dates;
    cal.cfg.setProperty("mindate", minDate);
    var auxStringDia = auxDia.getDate() + "/" + (auxDia.getMonth() + 13) + "/" + (auxDia.getFullYear());
    cal.cfg.setProperty("maxdate", auxStringDia);
        seleccion = document.getElementById("selectDesde").value||minDate;
    var split = seleccion.split("/");
    cal.cfg.setProperty("selected", seleccion, false);
    var mes = split[1] + "/" + split[2];
    cal.cfg.setProperty("pagedate", mes, false);
    subscribeCalendarFondo(form,dates);
    cal.createTitleBar(mensaje);
    cal.show();

}

function showCal(fecha, mensaje) {
    showCal(fecha, mensaje, null);
}

function showCal(fecha, mensaje,form) {
			varFecha=fecha;
		    var xy = YAHOO.util.Dom.getXY(fecha);

	    	YAHOO.util.Dom.setStyle('calContainer', 'display', 'block');
	    	xy[0]=xy[0]+10;
		    xy[1] = xy[1] -100;

		    YAHOO.util.Dom.setXY('calContainer', xy);
			var hoy = new Date();
			var auxDia = new Date();
			if(form=="fondos"){
				if (hoy.getMonth() >= 2) {
					auxDia.setDate(hoy.getDate());
					auxDia.setMonth(hoy.getMonth() - 2);
					auxDia.setYear(hoy.getYear());
				} 
				else {
					auxDia.setDate(hoy.getDate());
					auxDia.setMonth(12 - hoy.getMonth());
					auxDia.setYear(hoy.getYear() - 1);
				}
				
			} else {
				if(form=="denuncia"){
					var auxDia2 = new Date(new Date().setDate(new Date().getDate() - 30));
					auxDia.setDate(auxDia2.getDate());
					auxDia.setMonth(auxDia2.getMonth());
					auxDia.setYear(auxDia2.getYear());
				} else {
					if (hoy.getMonth() > 2) {
						auxDia.setDate(hoy.getDate());
						auxDia.setMonth(hoy.getMonth() - 3);
						auxDia.setYear(hoy.getYear());
					}
					else {
						auxDia.setDate(hoy.getDate());
						auxDia.setMonth(12 - hoy.getMonth());
						auxDia.setYear(hoy.getYear() - 1);
					}
				}
				
			}
			if (navigator.appName.indexOf('Microsoft') != -1) {
				cal.cfg.setProperty("mindate",auxDia);
			}
			else{
				var auxStringDia = auxDia.getDate()+"/"+(auxDia.getMonth()+1)+"/"+(auxDia.getYear()+3800);
				cal.cfg.setProperty("mindate",auxStringDia);
			}

			cal.cfg.setProperty("maxdate",hoy);

			var seleccion;

			if (varFecha == "fechaNacimiento"){
				seleccion = document.getElementById("fechaDesde").value;
			} else {
				if (varFecha == "fechaDesde")
					seleccion = document.getElementById("selectDesde").value;
				else
					seleccion = document.getElementById("selectHasta").value;
			}

			var split = seleccion.split("/");
			cal.cfg.setProperty("selected",seleccion,false);
			var mes = split[1] + "/" + split[2];
			cal.cfg.setProperty("pagedate",mes,false);


			subscribeCalendar(form);
			cal.createTitleBar(mensaje);
			cal.show();

}

function showCalendarNotMaxDate(fecha, form) {
    varFecha = fecha;
    var xy = YAHOO.util.Dom.getXY(fecha);

    YAHOO.util.Dom.setStyle('calContainer', 'display', 'block');
    xy[0] = xy[0] + 10;
    xy[1] = xy[1] - 100;

    YAHOO.util.Dom.setXY('calContainer', xy);
	var hoy = new Date();
    cal.cfg.setProperty("mindate", hoy);    
    var seleccion;
    seleccion = document.getElementById("fechaDesde").value;

    var split = seleccion.split("/");
    cal.cfg.setProperty("selected", seleccion, false);
    var mes = split[1] + "/" + split[2];
    cal.cfg.setProperty("pagedate", mes, false);
    subscribeCalendar(form);
    cal.show();
}

function showCalSinMinDate(fecha, form) {
    varFecha = fecha;
    var xy = YAHOO.util.Dom.getXY(fecha);

    YAHOO.util.Dom.setStyle('calContainer', 'display', 'block');
    xy[0] = xy[0] + 10;
    xy[1] = xy[1] - 100;

    YAHOO.util.Dom.setXY('calContainer', xy);
    var hoy = new Date();
    var auxDia = new Date();

    cal.cfg.setProperty("maxdate", hoy);

    var seleccion;

    if (varFecha == "fechaNacimiento") {
        seleccion = document.getElementById("fechaDesde").value;
    } else {
        if (varFecha == "fechaDesde")
            seleccion = document.getElementById("selectDesde").value;
        else
            seleccion = document.getElementById("selectHasta").value;
    }

    var split = seleccion.split("/");
    cal.cfg.setProperty("selected", seleccion, false);
    var mes = split[1] + "/" + split[2];
    cal.cfg.setProperty("pagedate", mes, false);

    subscribeCalendar(form);
    cal.createTitleBar(mensaje);
    cal.show();
}

// function showCalFondos(fecha, mensaje, form) {
//     showCal(fecha, mensaje, form);
// }

function showCalProductos(fecha, mensaje, form) {
    varFecha = fecha;
    var xy = YAHOO.util.Dom.getXY(fecha);

    YAHOO.util.Dom.setStyle('calContainer', 'display', 'block');
    xy[0] = xy[0] + 10;
    xy[1] = xy[1] - 100;

    YAHOO.util.Dom.setXY('calContainer', xy);
    var hoy = new Date();
    cal.cfg.setProperty("maxdate", hoy);
    subscribeCalendarProductos(form);
    cal.createTitleBar(mensaje);
    cal.show();

}


function showCalendar(fecha, pos, mensaje, form) {
    varFecha = fecha;
    var xy = YAHOO.util.Dom.getXY(pos);

    YAHOO.util.Dom.setStyle('calContainer', 'display', 'block');
    xy[0] = xy[0] + 50;
    xy[1] = xy[1] - 50;

    YAHOO.util.Dom.setXY('calContainer', xy);

    subscribeCalendarFondos(form);

    cal.createTitleBar(mensaje);
    cal.show();

}


function showCalDias(dd, mensaje) {
    varFecha = dd;
    var xy = YAHOO.util.Dom.getXY(dd);

    YAHOO.util.Dom.setStyle('calContainer', 'display', 'block');
    xy[0] = xy[0] + 110;
    xy[1] = xy[1] - 80;

    YAHOO.util.Dom.setXY('calContainer', xy);

    subscribeCalendarDias(dd);

    cal.createTitleBar(mensaje);
    cal.show();

}

function showCalEmision(dd, mensaje, form) {
    var hoy = new Date();
    hoy.setDate(hoy.getDate() + 1);
    cal.cfg.setProperty("mindate", hoy);
    var hasta = new Date();
    hasta.setDate(hasta.getDate() + 365);
    cal.cfg.setProperty("maxdate", hasta);
    varFecha = dd;
    var xy = YAHOO.util.Dom.getXY(dd);

    YAHOO.util.Dom.setStyle('calContainer', 'display', 'block');
    xy[0] = xy[0] + 110;
    xy[1] = xy[1] - 80;

    YAHOO.util.Dom.setXY('calContainer', xy);

    subscribeCalendarEmision(form);
    cal.createTitleBar(mensaje);
    cal.show();

}


function toPrint(str) {
    try {

        var oContent = document.getElementById(str).innerHTML;
        var iframe = document.frames ? document.frames['printFrame'] : document.getElementById('printFrame');
        var oDoc = iframe.contentWindow || iframe;

        if (oDoc.document) oDoc = oDoc.document;
        oDoc.write("<html><head><title></title>");
        oDoc.write("</head><body>");
        oDoc.write(oContent + "<script type=\"text/javascript\">setTimeout('this.focus()',1000); setTimeout('this.print()',1000);</script></body></html>");
        oDoc.close();
    } catch (e) {
        self.print();
    }
}


function printContenido(str) {
    window.frames["printFrame"].document.open();
    window.frames["printFrame"].document.write(str);
    window.frames["printFrame"].document.close();
    window.frames["printFrame"].focus();
    window.frames["printFrame"].print();

}


function detalleCuota(id_prestamo, ctx) {
    var args = [];

    var responseSuccess = function (o) {

        var panel = new YAHOO.widget.SimpleDialog("detalleCuota_" + id_prestamo,
            {
                width: "380px",
                visible: true,
                draggable: true,
                close: true,
                fixedcenter: true,
                constraintoviewport: true,
                buttons: [{
                    text: "Cerrar",
                    handler: function () {
                        this.hide();
                    }, isDefault: true
                }, {
                    text: "Imprimir",
                    handler: function () {
                        printContenido(o.responseText);
                    }
                }
                ]
            });
        panel.setHeader("");
        panel.setBody(o.responseText);
        panel.setFooter("");
        panel.render("contenido");
    };

    var responseFailure = function (o) {
    }

    var callback =
        {
            success: responseSuccess,
            failure: responseFailure,
            argument: args
        };


    invoke(ctx + '/prestamos/detalleCuota.htm?id_prestamoOtorgado=' + id_prestamo, callback);
}


function initWaitPanel() {
    try {
        YAHOO.namespace("example.container");
        if (YAHOO.example != null && YAHOO.example.container != null && YAHOO.example.container.waitPanel) {
            YAHOO.example.container.waitPanel.destroy();
        }
    } catch (e) {
    }
}

var timeOutModal = 120000;

function showWaitPanelModal() {

    showWaitPanel(true);
    //setTimeout(initWaitPanel, timeOutModal);
}

function showWaitPanel() {

    showWaitPanel(true);
    //setTimeout(initWaitPanel, timeOutModal);

}


function showWaitPanel(modal1) {

    setTimeout(initWaitPanel, timeOutModal);
    YAHOO.namespace("example.container");
    YAHOO.example.container.waitPanel = new YAHOO.widget.Panel("panel2", {
        width: "183px", height: "80px",
        fixedcenter: true,
        close: false,
        draggable: false,
        zindex: 1000,
        modal: modal1,
        visible: true
    });
    YAHOO.example.container.waitPanel.setBody('<div class="showWaitPanel"><div class="showWaitPanelTexto"> Ejecutando...</div><div class="showWaitPanelBarra"><br/></div></div>');
    YAHOO.example.container.waitPanel.render(document.body);


}

function showWaitPanelConFlash() {

    var modal1 = true;
    showWaitPanelConFlash(modal1);
    setTimeout(initWaitPanel, timeOutModal);

}

function showWaitPanelConFlash(modal1) {

    setTimeout(initWaitPanel, timeOutModal);
    YAHOO.namespace("example.container");
    YAHOO.example.container.waitPanel = new YAHOO.widget.Panel("panel2", {
        width: "183px", height: "80px",
        fixedcenter: true,
        close: false,
        draggable: false,
        zindex: 1000,
        modal: modal1,
        visible: true
    });


    YAHOO.example.container.waitPanel.setBody('<div style="border:0px; height: 78px; background: #FFFFFF url(' + contextPath + '/images/fondoEjecutando.gif) no-repeat ;"><div  style="padding-bottom:0px; padding-left:14px; padding-top:12px; font-size:12px; font-weight:bolder; color:#0C2E72;"> Ejecutando...</div><div style="background: #FFFFFF no-repeat ; margin:10px; margin-left:12px;"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" height="18" width="155" codebase="https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="movie" value="../images/ejecutando.swf" /><param name="quality" value="high"/><param name="wmode" value="transparent"/><embed height="18" width="155" src="../images/ejecutando.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent"></embed></object></div></div>');

    YAHOO.example.container.waitPanel.render(document.body);


}

function addWaitPanel(obj1) {
    var obj = $(obj1).parent()


    if ($(obj).html() != null && ($(obj).html().indexOf("return") < 0 && $(obj).html().indexOf("window.open") < 0 && $(obj).html().indexOf("poptastic") < 0
        && $(obj).html().indexOf("_blank") < 0)) {
        if ($(obj).html().indexOf("<div") < 0 && $(obj).html().indexOf("<li") < 0 && $(obj).html().indexOf("<ul") < 0 && $(obj).html().indexOf("PDF") < 0
            && $(obj).html().indexOf("XLS") < 0 && $(obj).html().indexOf("Excel") < 0 && $(obj).html().indexOf("/catalogoClubPatagonia/canje/iconoEliminar.gif") < 0
            && $(obj).html().indexOf("toPrint(") < 0 && $(obj).html().indexOf("modificarMailEditable();") < 0 && $(obj).html().indexOf("generateToolTip(") < 0
            && $(obj).html().indexOf("generatePopUp(") < 0 && $(obj).html().indexOf("<a href=\"#tab") < 0) {


            $(obj).click(function (e) {
                showWaitPanelModal();
            });
        }
    }
}

function listen(event, elem, func) {
    var elements = getElementsByClass(elem);

    var length = elements.length;
    var elem;
    for (i = 0; i < length; i++) {
        elem = elements[i];
        if (elem.addEventListener) {
            elem.addEventListener(event, func, false);
        } else if (elem.attachEvent) {
            elem.attachEvent("on" + event, func);
        }
    }
}

function getElementsByClass(searchClass, node, tag) {
    var classElements = new Array();
    if (node == null)
        node = document;
    if (tag == null)
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp('(^|\\\\s)' + searchClass + '(\\\\s|$)');
    for (i = 0, j = 0; i < elsLen; i++) {
        if (pattern.test(els[i].className)) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}


function habilidarDeshabilitar(id, val) {
    var campo = document.getElementById(id);
    if (campo != null) {
        campo.disabled = val;
    }
}

function clearImport(campo) {

    var importe = document.getElementById(campo);
    importe.value = "";
}

function monedaCuenta() {
    if (document.getElementById('cuentaDebito') != null) {
        var moneda = document.getElementById('moneda');
        var indice = document.getElementById('cuentaDebito').selectedIndex
        if (indice >= 0) {
            var valor = document.getElementById('cuentaDebito').options[indice].title;
            if (moneda != null && "" != moneda) {
                moneda.style.display = "block";
                moneda.innerHTML = valor;
            } else {
                moneda.style.display = "none";
            }
        }
    }
}

function tipoPago() {
    var tp = document.getElementById('otro');
    if (tp != null && tp.checked)
        habilidarDeshabilitar('importeAPagar', false);
}

function printResumen(print) {
    var pr = document.getElementById(print);
    printContenido(pr.innerHTML);
}


function urlDetalle(nombreFondo) {
    ConsultaCotizacionesFondosComunesAJAX.getURL(nombreFondo, {
        callback: function (data) {
            window.open(data);
        }
    });

}


function isNumber(character) {
    var ValidChars = "0123456789";
    if (ValidChars.indexOf(character) == -1) {
        return false;
    }
    return true;

}

function isNumeric(sText) {
    var Char;
    for (i = 0; i < sText.length; i++) {
        Char = sText.charAt(i);
        if (!isNumber(Char)) {
            return false;
        }
    }
    return true;

}

function cargarComprobante() {
    var comprobante = document.getElementById('comprobanteCBU').innerHTML;
    var st1 = document.getElementsByTagName('link');
    var style = "<ht" + "ml><he" + "ad><link href=\'" + st1[0].href + "/styles/global.css\'"
    style = style + "type=\'" + st1[0].type + "\' rel=\'" + st1[0].rel + "\'></he" + "ad><bo" + "dy>";
    document.getElementById('comprobante').value = "<p" + ">" + style + document.getElementById('body').value + "</p>" + comprobante + "</bo" + "dy></ht" + "ml>";
}

function printCheckBox() {

    if (navigator.userAgent.indexOf('MSIE') > -1) {

        if (navigator.userAgent.indexOf('Windows') > -1) {
            document.write('<input');
            document.write(' type="checkbox"');
            document.write(' name="WordWrap"');
            document.write(' onclick="doWordWrap(this.form)">');
            document.write('Word Wrap<br>');
        }
    }
}

function doWordWrap(d) {
    if (d.WordWrap.checked == true) {
        d.myfield.wrap = 'soft';
    } else {
        d.myfield.wrap = 'off';
    }
}

function TAlimit(s, maxChar) {
    var maxlength = maxChar;
    if (s.value.length > maxlength)
        s.value = s.value.substring(0, maxlength);
}

function textoBold(id) {
    var element = document.getElementById(id);

    if (document.getElementById) {
        element.style.fontWeight = 'bold';
    } else if (document.all) {
        element.style.setAttribute('cssText', 'font-weight:bold;', 0);
    }

}

function textoNormal(id) {
    var element = document.getElementById(id);

    if (document.getElementById) {
        element.style.fontWeight = 'normal';
    } else if (document.all) {
        element.style.setAttribute('cssText', 'font-weight:normal;', 0);
    }


}

function importe(character) {
    var ValidChars = "0123456789,";
    if (ValidChars.indexOf(character) == -1) {
        return false;
    }
    return true;

}

function importeValido(sText) {
    var Char;
    if (sText == null || "" == sText)
        return "Debe ingresar un importe.";
    for (i = 0; i < sText.length; i++) {
        Char = sText.charAt(i);
        if (!importe(Char)) {
            if (Char == '.')
                return ("Debe ingresar los decimales separados por coma.")
            else
                return "Debe ingresar un importe v�lido.";
        }
    }
    return null;

}

function selectFormaDeCobroBeneficiosSMS() {
    if ($("input[@name='tipoCobro']:checked").val() == 'CUENTA') {
        if ($("#spanTarjetaCredito").length) {
            textoNormal("spanTarjetaCredito");
            $("#tarjetaCredito").attr("disabled", "disabled");
        }
        textoBold("spanCuenta");
        $("#cuenta").attr("disabled", "");

    } else if ($("input[@name='tipoCobro']:checked").val() == 'TARJETA_CREDITO') {
        if ($("#spanCuenta").length) {
            textoNormal("spanCuenta");
            $("#cuenta").attr("disabled", "disabled");
        }
        textoBold("spanTarjetaCredito");
        $("#tarjetaCredito").attr("disabled", "");
    } else {
        $("#tarjetaCredito").attr("disabled", "disabled");
        $("#cuenta").attr("disabled", "disabled");
    }
}

function cargarFechaActual(destino) {
    if (destino == "Desde") {
        if (document.getElementById("fechaDesde").value == "") {
            var hoy = new Date();
            var dia = hoy.getDate();
            var mes = hoy.getMonth();
            mes = mes + 1;
            var anio = hoy.getFullYear();
            dia = dia + "/" + mes + "/" + anio;
            if (document.getElementById("selectDesde").value == "")
                document.getElementById("selectDesde").value = dia;
        } else
            document.getElementById("selectDesde").value = document.getElementById("fechaDesde").value;
    } else {
        if (document.getElementById("fechaHasta").value == "") {
            var hoy = new Date();
            var dia = hoy.getDate();
            var mes = hoy.getMonth();
            mes = mes + 1;
            var anio = hoy.getFullYear();
            dia = dia + "/" + mes + "/" + anio;
            if (document.getElementById("selectHasta").value == "")
                document.getElementById("selectHasta").value = dia;
        } else {
            document.getElementById("selectHasta").value = document.getElementById("fechaHasta").value;
        }
    }
}

function isValidDate(dateString) {
    const parts = dateString.split('/');
    if (parts.length !== 3) {
        return false;
    }
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year) || month < 0 || month > 11 || day < 1 || day > 31) {
        return false;
    }

    const dateObj = new Date(year, month, day);

    return (
        dateObj.getFullYear() === year &&
        dateObj.getMonth() === month &&
        dateObj.getDate() === day
    );
}

function restringirAlfanumericoPuntoYComa(e) {
	return /^[a-z0-9 .,]+$/i.test(e.key);
}

function restringirAlfanumerico(e) {
	return /^[a-z0-9 ]+$/i.test(e.key);
}

function restringirInputNumero(e) {

    return !(e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57));

}

function manejarPegadoNumerico(event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData('text');

    if (/^[0-9]+$/.test(pastedData)) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
}

function restringirInputNumeroPuntoYComa(e) {
    var charCode = e.which || e.keyCode;

    return (charCode >= 48 && charCode <= 57) || charCode === 46 || charCode === 44 || charCode === 8;
}

function manejarPegadoNumerosPuntoComa(event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData('text');

    if (/^[0-9.,]+$/.test(pastedData)) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
}

function manejarPegadoNumericoPuntoYComa(event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData('text');

    if (/^[0-9.,]+$/.test(pastedData)) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
}

function manejarPegadoSoloLetras(event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData('text');

    if (/^[a-zA-Z]+$/.test(pastedData)) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
}

function restringirInputLetrasYBarra(event) {
    var charCode = event.which || event.keyCode;

    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 47) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
}

function manejarPegadoLetrasYBarra(event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData('text');

    if (/^[a-zA-Z/]+$/.test(pastedData)) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
}

function disableCopyPaste(elements) {
    elements.forEach(function(elem) {
        var elemento = document.getElementById(elem);
        $(elemento).bind("cut copy paste", function(e) {
            e.preventDefault();
        });
    });
}