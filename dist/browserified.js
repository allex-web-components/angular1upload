(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function createUploader (lib, applib) {
  'use strict';

  var q = lib.q,
    BasicElement = applib.BasicElement;

  function Angular1UploaderElement (id, options) {
    BasicElement.call(this, id, options);
    this.disableProgress = null;
    this.url = null;
    if (options) {
      this.set('url', options.url);
      this.set('disableProgress', !!options.disableProgress);
    }
  }
  lib.inherit(Angular1UploaderElement, BasicElement);
  Angular1UploaderElement.prototype.upload = function (data) {
    var Upload = angular.element(document).injector().get('Upload'),
      url = this.get('url');
    if (!url) {
      return q.reject(new Error('No url set'));
    }
    return Upload.upload ({
      url: url,
      data: data,
      disableProgress: this.get('disableProgress')
    });
  };

  applib.registerElementType('Angular1Uploader', Angular1UploaderElement);
}

module.exports = createUploader;

},{}],2:[function(require,module,exports){
(function createLib(execlib) {
  var lR = execlib.execSuite.libRegistry,
    lib = execlib.lib,
    applib = lR.get('allex_applib');
  require('./elements/uploadercreator')(lib, applib);
  require('./prepreprocessors/uploadcreator')(lib, applib);
})(ALLEX);

},{"./elements/uploadercreator":1,"./prepreprocessors/uploadcreator":3}],3:[function(require,module,exports){
function createUploadPreprocessor (lib, applib, utils) {
  'use strict';

  var BasicProcessor = applib.BasicProcessor;

  function UploadPrePreprocessor () {
    BasicProcessor.call(this);
  }
  lib.inherit(UploadPrePreprocessor, BasicProcessor);
  UploadPrePreprocessor.prototype.process = function (desc) {
    var envname = this.config.environment,
      uploadurlname = this.config.uploadurlname;

    desc.elements = desc.elements || [];
    desc.elements.push({
      type: 'Angular1Uploader',
      name: uploadurlname
    });
    desc.preprocessors = desc.preprocessors || {};
    desc.preprocessors.DataSource= desc.preprocessors.DataSource || [];
    desc.preprocessors.DataSource.push({
      environment: envname,
      entity: {
        name: uploadurlname,
        type: 'allexstate',
        options: {
          sink: '.',
          path: uploadurlname
        }
      }
    });
    desc.links = desc.links || [];
    desc.links.push({
      source: 'datasource.'+uploadurlname+':data',
      target: 'element.'+uploadurlname+':url'
    });
  };

  applib.registerPrePreprocessor('Upload', UploadPrePreprocessor);
}

module.exports = createUploadPreprocessor;

},{}]},{},[2]);
