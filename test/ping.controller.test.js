const { assert } = require('chai');
const request = require('supertest');
const app = require('../app');

//end to end testing
describe('GET /api/ping', function() {
    it('responds with success: true', async function() {
      const res =  await request(app)
        .get('/api/ping');

        //console.log(res);

        /* .expect('Content-Type', /json/)
        .expect(200, done); */
        assert.equal(res.statusCode, 200);
        assert.isTrue(res.body.success);
    });
  });