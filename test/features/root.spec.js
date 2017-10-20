const btoa = require('btoa');
const expect = require('expect');
const request = require('supertest');

const helpers = require('../helpers');
const app = require('../../app');

describe('Root of API', () => {
  it('returns title of API', async () => {
    const res = await request(app)
      .get('/')
      .set('Authorization', 'Basic ' + btoa('mock:password'))
      .expect(200);

    expect(res.body).toEqual({ title: 'mock-project-server' });
  });
});
