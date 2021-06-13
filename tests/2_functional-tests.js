const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Convert a valid input "10L"', function (done) {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");

        assert.equal(res.body.initNum, 
          10, 
          'res.body.initNum: '+ res.body.initNum +'should be 10');

        assert.equal(res.body.initUnit,
          "L",
          'res.body.initUnit: '+ res.body.initUnit +' should be L');

        assert.equal(res.body.returnNum, 
          2.64172, 
          'res.body.returnNum: '+ res.body.returnNum +' should be 2.64172');

        assert.equal(res.body.returnUnit,
          "gal",
          'res.body.returnUnit: '+ res.body.returnUnit +' should be gal');

        assert.equal(res.body.string, 
          "10 liters converts to 2.64172 gallons", 
          'res.body.string: '+ res.body.string +' should be "10 liters converts to 2.64172 gallons"');

        done();
      });
  });

  test('Convert an invalid input "32g"', function (done) {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 
          'invalid unit', 
          "res.text: "+res.body+" should be invalid unit");

        done();
      });
  });

  test('Convert an invalid number "3/7.2/4kg"', function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 
          'invalid number', 
          "res.text: "+ res.body +" should be invalid number");

        done();
      });
  });

  test('Convert a invalid unit "3/7.2/4kilomegagram"', function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function (err, res) {
        assert.equal(res.status, 200);

        assert.equal(res.body, 
          'invalid unit', 
          'res.body: '+ res.body +'should be invalid unit');

        done();
      });
  });

  test('Convert with no number "kg"', function (done) {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");

        assert.equal(res.body.initNum, 
          1, 
          'res.body.initNum: '+ res.body.initNum +'should be 1');

        assert.equal(res.body.initUnit,
          "kg",
          'res.body.initUnit: '+ res.body.initUnit +' should be kg');

        assert.equal(res.body.returnNum, 
          2.20462, 
          'res.body.returnNum: '+ res.body.returnNum +' should be 2.20462');

        assert.equal(res.body.returnUnit,
          "lbs",
          'res.body.returnUnit: '+ res.body.returnUnit +' should be lbs');

        assert.equal(res.body.string, 
          "1 kilograms converts to 2.20462 pounds", 
          'res.body.string: '+ res.body.string +' should be "1 kilograms converts to 2.20462 pounds"');

        done();
      });
  });

  test('Convert a lowercase unit "l"', function (done) {
    chai
      .request(server)
      .get("/api/convert?input=10l")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");

        assert.equal(res.body.initNum, 
          10, 
          'res.body.initNum: '+ res.body.initNum +'should be 10');

        assert.equal(res.body.initUnit,
          "L",
          'res.body.initUnit: '+ res.body.initUnit +' should be L');

        assert.equal(res.body.returnNum, 
          2.64172, 
          'res.body.returnNum: '+ res.body.returnNum +' should be 2.64172');

        assert.equal(res.body.returnUnit,
          "gal",
          'res.body.returnUnit: '+ res.body.returnUnit +' should be gal');

        assert.equal(res.body.string, 
          "10 liters converts to 2.64172 gallons", 
          'res.body.string: '+ res.body.string +' should be "10 liters converts to 2.64172 gallons"');

        done();
      });
  });
});
