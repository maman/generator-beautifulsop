'use strict';
var chalk = require('chalk');

module.exports = {
    beautifulsop: [
        '',
        chalk.grey('             ___'),
        chalk.grey('           .\'   \'.\''),
        chalk.grey('          /    /  \\\''),
        chalk.grey('          |___/`._|'),
        chalk.grey('          |') + chalk.grey.bgWhite('  ō ō  ') + chalk.grey('|'),
        chalk.yellow('          (   )   )'),
        chalk.grey('          |') + chalk.yellow('\\ ') + chalk.bold.red('\'=\' ') + chalk.yellow('/') + chalk.grey('|'),
        chalk.grey('          )') + chalk.yellow(' \'._.\' ') + chalk.grey('('),
        chalk.magenta('         ;--\' ') + chalk.grey('_') + chalk.magenta(' \'--;'),
        chalk.magenta('        /    ') + chalk.grey('(_)') + chalk.magenta('    \\'),
        chalk.magenta('       |  <   ') + chalk.grey('|') + chalk.magenta('   >  |'),
        chalk.magenta('       \\   \'._') + chalk.grey('|') + chalk.magenta('_.\'   /'),
        chalk.grey('       _') + chalk.magenta('\'.') + chalk.grey('__/___\\__') + chalk.magenta('.\'') + chalk.grey('_'),
        chalk.grey('      |       ') + chalk.red('____') + chalk.grey('    |'),
        chalk.grey('      |      ') + chalk.red('/ __ )') + chalk.grey('   |'),
        chalk.grey('      |     ') + chalk.red('/ __  |') + chalk.grey('   |'),
        chalk.grey('      |    ') + chalk.red('/ /_/ /') + chalk.grey('    |'),
        chalk.grey('      |   ') + chalk.red('/_____/') + chalk.grey('     |'),
        ''
  ].join('\n')
};
