'use strict';

exports.index = async function (ctx) {
  ctx.app.beidou.options.static = false;
  ctx.body = await ctx.beidou('redux/page.js', { ctx });
};
