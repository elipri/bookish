//var assert = require('assert');
const { assert } = require("chai");
const hashService = require("../api/services/hashService");
const bcrypt = require("bcrypt");
//const { saltRounds } = require("../config"); //pane sama asi hashservicesse
const saltRounds = 10;

const wrong = "vale"; //vale parool
const password = "nipitiri";

//unit tests
describe("Hash service", function () {
  describe("hash", function () {
    it("should return hashed password", async function () {
      const hash = await hashService.hash(password);
      const match = await bcrypt.compare(password, hash);
      console.log(hash); //seda ei tohiks siia jätta, aga hea vaadata
      assert.ok(hash); //kas hash sisaldab mingit väärtust?
      assert.isTrue(match);
    });

    it("should return false if wrong password", async function () {
      const hash = await hashService.hash(password);
      const match = await bcrypt.compare(wrong, hash);
      assert.ok(hash); //kas hash sisaldab mingit väärtust?
      assert.isFalse(match); //peaks olema false, kuna võrreldakse erinevaid asju
    });

    it("should return true", async function () {
      const hash = await bcrypt.hash(password, saltRounds);
      const match = await bcrypt.compare(password, hash);
      assert.isTrue(match); //peaks olema false, kuna võrreldakse erinevaid asju
    });
  });
});
