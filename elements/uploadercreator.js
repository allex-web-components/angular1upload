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
