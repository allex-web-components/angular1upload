(function createLib(execlib) {
  var lR = execlib.execSuite.libRegistry,
    lib = execlib.lib,
    applib = lR.get('allex_applib');
  require('./elements/uploadercreator')(lib, applib);
  require('./prepreprocessors/uploadcreator')(lib, applib);
})(ALLEX);
