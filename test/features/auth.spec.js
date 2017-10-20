const expect = require('expect');
const request = require('supertest');

const helpers = require('../helpers');

const app = require('../../app');
const Company = require('../../models/company');
const User = require('../../models/user');

describe('Authentication - ', () => {
  it('Existing user can login and get JWT', async () => {
    const companyParams = {
      name: 'Cognizant',
    };
    const company = await Company.create(companyParams);
    const userParams = {
      firstName: 'Wilson',
      lastName: 'Varghese',
      companyId: company.id,
      email: 'wilson@example.com',
      password: 'password',
    };

    const user = await User.create(userParams);
    const res = await request(app)
      .post('/login')
      .send({ email: 'wilson@example.com', password: 'password' })
      .expect(200);
    expect(res.body.jwt !== undefined).toEqual(true);
    expect(res.body.user).toEqual({
      id: user.id,
      firstName: 'Wilson',
      lastName: 'Varghese',
      email: 'wilson@example.com',
      company: {
        id: company.id,
        name: 'Cognizant',
      },
    });
  });

  it('Existing user cannot login with invalid password', async () => {
    const companyParams = {
      name: 'Cognizant',
    };
    const company = await Company.create(companyParams);
    const date = new Date();
    const userParams = {
      firstName: 'Wilson',
      lastName: 'Varghese',
      companyId: company.id,
      email: 'wilson@example.com',
      password: 'password',
      createdAt: date,
      updatedAt: date,
    };

    await User.create(userParams);
    const incorrectPasswordResponse = await request(app)
      .post('/login')
      .send({ email: 'wilson@example.com', password: 'invalid' })
      .expect(200);

    expect(incorrectPasswordResponse.body.jwt).toEqual(undefined);
    expect(incorrectPasswordResponse.body.error).toEqual(
      'Email or Password is incorrect'
    );
  });

  it('User without account cannot login', async () => {
    const incorrectEmailResponse = await request(app)
      .post('/login')
      .send({ email: 'no_account@example.com', password: 'password' })
      .expect(200);

    expect(incorrectEmailResponse.body.jwt === undefined).toEqual(true);
    expect(incorrectEmailResponse.body.error).toEqual(
      'Email or Password is incorrect'
    );
  });
});
