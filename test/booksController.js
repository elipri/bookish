const { assert } = require('chai');
const request = require('supertest');
const app = require('../app');
const authService = require('../api/services/authService');
const user = {
    email: "nipi.tiri@gmail.com",
    password: 'nipitiri'
}

//end to end testing
describe('GET /api/books', function() {
    /* it('responds with success: true', async function() {
      const res =  await request(app)
        .get('/api/ping');
        assert.equal(res.statusCode, 200);
        assert.isTrue(res.body.success);
    }); */
    it('responds with success: true', async function() {
        const token = await authService.login(user.email, user.password);
        const res = await request(app).get('/api/books').set('Authorization', 'Bearer'+token);
          assert.equal(res.statusCode, 200);
          assert.isTrue(res.body.success);
          assert.ok(res.body.books);
          console.log(res.body.books);
      });
  });