'use strict';

const path = require('path');
const mm = require('egg-mock');

describe('test/beidou.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/test',
    });
    return app.ready();
  });
  after(() => app.close());
  afterEach(mm.restore);

  describe('static string SRR request success ', () => {
    it('simple should status 200', () => app.httpRequest(app.callback())
      .get('/')
      .expect(200));

    it('redux should status 200', () => app.httpRequest(app.callback())
      .get('/redux')
      .expect(200));

    it('spa should status 200', () => app.httpRequest(app.callback())
      .get('/spa')
      .expect(200));

    it('filepath not`t exsit, should status 500', () => app.httpRequest(app.callback())
      .get('/miss')
      .expect(500));
  });

});

describe('test/beidou.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/stream',
    });
    return app.ready();
  });
  after(() => app.close());
  afterEach(mm.restore);

  describe('static stream SRR request success ', () => {
    it('simple should status 200', () => app.httpRequest(app.callback())
      .get('/')
      .expect(200));
  });
});
