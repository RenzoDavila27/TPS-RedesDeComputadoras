if (typeof dwr == 'undefined' || dwr.engine == undefined) throw new Error('You must include DWR engine before including this file');

(function() {
if (dwr.engine._getObject("LoggerAJAX") == undefined) {
var p;

p = {};





p.logError = function(p0, callback) {
return dwr.engine._execute(p._path, 'LoggerAJAX', 'logError', arguments);
};

dwr.engine._setObject("LoggerAJAX", p);
}
})();

