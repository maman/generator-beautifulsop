'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var DocGenerator = module.exports = function DocGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(DocGenerator, yeoman.generators.NamedBase);

DocGenerator.prototype.files = function files() {
  this.write('md/' + this._.slugify(this.name) + '.md', '# ' + this.name);
};
