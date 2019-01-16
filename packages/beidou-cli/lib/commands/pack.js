'use strict';

const fs = require('fs');
const path = require('path');
const { Command } = require('egg-bin');
const { log } = require('../helper');
const {
  getArgvWithDefaultFramework = 'beidou',
  cmdName,
  configs,
} = require('../helper');
const webpack = require('webpack');

module.exports = class BuildCMD extends Command {
  constructor(rawArgv) {
    const argv = getArgvWithDefaultFramework(rawArgv);
    super(argv);
    this.usage = `Usage: ${cmdName} command [options]`;
    this.options = {
      config: {
        description: 'webpack config file path',
        alias: 'c',
        type: 'string',
      },
    };
  }

  get description() {
    return 'Beidou build assets for egg-beidou plugin';
  }

  async run(context) {
    const webpackConfig = require(configs.webpackDefaultConfig);
    if (
      !context.argv.config ||
      !fs.existsSync(path.join(context.cwd, context.argv.config))
    ) {
      log.error(`Custom webpack path error. ${context.argv.config}`);
      return;
    }
    const customConfig = require(path.join(context.cwd, context.argv.config));
    if (!context.argv.overrite) {
      Object.assign(webpackConfig, customConfig, { target: 'node' });
    }

    const compiler = webpack(webpackConfig);

    compiler.run((err, stats) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      if (stats) {
        fs.writeFileSync(path.join(process.cwd(), '.stats'), stats);
        console.log(
          stats.toString({
            colors: true,
            children: false,
          })
        );
      }
      console.log('\nBuild finished\n');
    });
  }
};
