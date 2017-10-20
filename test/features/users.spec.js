'use strict';

const btoa = require('btoa');
const expect = require('expect');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const helpers = require('../helpers');

const app = require('../../app');
const Company = require('../../models/company');
const User = require('../../models/user');
const serializeUser = require('../../serializers/user');

describe('Users', () => {
  let companyParams, company, userParams, user, serializedUser, token;

  beforeEach(async () => {
    companyParams = { name: 'Sheeeews' };
    company = await Company.create(companyParams);
    userParams = {
      firstName: 'Wilson',
      lastName: 'Varghese',
      companyId: company.id,
      email: 'wilson@example.com',
      password: 'password',
    };
    user = await User.create(userParams);
    serializedUser = await serializeUser(user);
    token = jwt.sign({ user: serializedUser }, process.env.JWT_SECRET);
  });

    it('guest should signup with unique email', async () => {
    const companyParams = { name: 'Cognizant' };
    const company = await Company.create(companyParams);
    const res = await request(app)
      .post('/users')
      .set('Authorization', 'Basic ' + btoa('mock:password'))
      .send({
        firstName: 'Wilson',
        lastName: 'Varghese',
        companyId: company.id,
        email: 'wilson@example.com',
        password: 'password',
      });
    expect(res.body.error).toBe('Email has already been taken');
  });

  it('cannot be accessed by guests', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', 'Basic ' + btoa('mock:password'))
      .expect(404);
    expect(res.body).toEqual({
      error: { status: 404 },
      message: 'Not Found',
    });
  });
});
