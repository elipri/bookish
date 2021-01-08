const { assert } = require('chai');
const request = require('supertest');
const app = require('../app');
const authService = require('../api/services/authService');

const path = '/api/users';

const user = {
  email: 'sammal.habe@gmail.com',
  password: 'sammal'
};
let token;

before(async () => {
  token = await authService.login(user.email, user.password);
});

describe(`GET ${ path }`, () => {
  it('Responds with success: true and list of users', async () => {
    const res = await request(app)
      .get(path)
      .set('Authorization', 'Bearer ' + token);
    assert.equal(res.statusCode, 200);
    assert.isTrue(res.body.success);
    assert.ok(res.body.users);
  });
});

