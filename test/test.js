/*global describe, beforeEach, it */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('beautifulsop generator test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('beautifulsop:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      this.app.options['skip-install'] = true;

      done();
    }.bind(this));
  });

  // FTP not enabled
  it('creates expected files without FTP mode', function (done) {
    var expected = [
      '.gitignore',
      'README.md',
      'Gruntfile.js',
      'package.json',
      'src/scss/style.scss',
      'src/scss/_typeplate.scss',
      'src/scss/_syntax-highlighter.scss',
      'src/scss/_normalize.scss',
      'src/template/template.html'
    ];

    helpers.mockPrompt(this.app, {
      'ftpEnabled': false
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  // FTP Enabled
  it('creates expected files on FTP mode', function (done) {
    var expected = [
      '.gitignore',
      '.ftppass',
      'README.md',
      'Gruntfile.js',
      'package.json',
      'src/scss/style.scss',
      'src/scss/_typeplate.scss',
      'src/scss/_syntax-highlighter.scss',
      'src/scss/_normalize.scss',
      'src/template/template.html'
    ];

    helpers.mockPrompt(this.app, {
      'ftpEnabled': true
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
