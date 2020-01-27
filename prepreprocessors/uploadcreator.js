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
