const { assert } = require('chai');
const request = require('supertest');
const app = require('../app');

const user = {
    email: "nipi.tiri@gmail.com",
    password: 'nipitiri'
}

const wrong = {
    email: "nipi@gmail.com",
    password: 'nipikas'
}

const missingEmail = {
    password: 'nipitiri'
}

const missingPassword = {
    email: "nipi.tiri@gmail.com"
}

//end to end testing
describe('GET /api/login', function() {
    it('responds with success: false', async function() {
      const res =  await request(app)
        .post('/api/login')
        .send(wrong);

        //console.log(res.body);

        assert.equal(res.statusCode, 401);
        assert.isFalse(res.body.success);
        assert.ok(res.body.message);
    });

    it('responds with success: false', async function() {
        const res =  await request(app)
          .post('/api/login')
          .send(missingEmail);
  
          //console.log(res.body);
  
          assert.equal(res.statusCode, 401);
          assert.isFalse(res.body.success);
          assert.ok(res.body.message);
      });

      it('responds with success: false', async function() {
        const res =  await request(app)
          .post('/api/login')
          .send(missingPassword);
  
          //console.log(res.body);
  
          assert.equal(res.statusCode, 400);
          assert.isFalse(res.body.success);
          assert.ok(res.body.message);
      });

  });