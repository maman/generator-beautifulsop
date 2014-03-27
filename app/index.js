'use strict';
var util = require('util'),
  path = require('path'),
  yeoman = require('yeoman-generator'),
  art = require('./art');

var BeautifulsopGenerator = module.exports = function BeautifulsopGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.pkg = require('../package.json');
  this.on('end', function () {
     this.installDependencies({
       skipInstall: options['skip-install']
     });
   });
};

util.inherits(BeautifulsopGenerator, yeoman.generators.Base);

/* Your humble servant is ready */
BeautifulsopGenerator.prototype.welcome = function welcome() {
  console.log(art.beautifulsop);
};

/* What should I do, master? */
BeautifulsopGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'appName',
    message: 'What will you name this project?'
  }, {
    type: 'confirm',
    name: 'exampleFiles',
    message: 'Do you want me to generate example files?',
    default: true
  }, {
    type: 'confirm',
    name: 'ftpEnabled',
    message: 'Do you want me to push generated upload to FTP sites?',
    default: false
  }, {
    name: 'ftpHostAddr',
    message: 'Where should I upload the generated files?',
    when: function(props) {
      return props.ftpEnabled
    }
  }, {
    name: 'ftpServerDest',
    message: 'Where will I place the files on your server?',
    when: function(props) {
      return props.ftpEnabled
    }
  }, {
    name: 'ftpUsername',
    message: 'What is your username on the server?',
    when: function(props) {
      return props.ftpEnabled
    }
  }, {
    name: 'ftpPassword',
    type: 'password',
    message: 'What is your password for the server? (I\'ll be looking away!)',
    when: function(props) {
      return props.ftpEnabled
    }
  }];

  this.prompt(prompts, function(props) {
    this.appName = props.appName;
    this.exampleFiles = props.exampleFiles;
    this.ftpEnabled = props.ftpEnabled;
    this.ftpHostAddr = props.ftpHostAddr;
    this.ftpServerDest = props.ftpServerDest;
    this.ftpUsername = props.ftpUsername;
    this.ftpPassword = props.ftpPassword;
    cb();
  }.bind(this));
};

/* Basic folder structure */
BeautifulsopGenerator.prototype.basicFolders = function basicFolders() {
  this.mkdir('html');
  this.mkdir('md');
  this.mkdir('pdf');
  this.mkdir('src');
  this.mkdir('src/css');
  this.mkdir('src/img');
  this.mkdir('src/scss');
  this.mkdir('src/template');
};

BeautifulsopGenerator.prototype.mainFiles = function mainFiles() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitignore-subdir', 'html/.gitignore');
  this.copy('gitignore-subdir', 'pdf/.gitignore');
  this.copy('gitignore-subdir', 'src/css/.gitignore');

  this.template('_README.md', 'README.md');
};

BeautifulsopGenerator.prototype.srcFiles = function srcFiles() {
  this.copy('src/scss/_normalize.scss', 'src/scss/_normalize.scss');
  this.copy('src/scss/_syntax-highlighter.scss', 'src/scss/_syntax-highlighter.scss');
  this.copy('src/scss/_typeplate.scss', 'src/scss/_typeplate.scss');
  this.copy('src/scss/style.scss', 'src/scss/style.scss');

  this.template('src/template/_template.html', 'src/template/template.html');
};

BeautifulsopGenerator.prototype.exampleFiles = function exampleFiles() {
  if (this.exampleFiles) {
    this.template('_README.md', 'md/README.md');
  }
};

BeautifulsopGenerator.prototype.ftpConfig = function ftpConfig() {
  this.template('_package.json', 'package.json');
  this.template('_Gruntfile.js', 'Gruntfile.js');
  if (this.ftpEnabled) {
    this.template('_ftppass', '.ftppass');
  }
};
