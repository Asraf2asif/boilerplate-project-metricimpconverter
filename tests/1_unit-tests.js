const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
const units = require('../units.json');

suite('Unit Tests', function(){
  test('#whole number', function () {
    assert.equal(convertHandler.getNum("12mi"),
     12, 
     'should correctly read a whole number input.');
  });

  test('#decimal number', function () {
    assert.equal(convertHandler.getNum("12.5mi"),
     12.5, 
     'should correctly read a decimal number input.');

    assert.equal(convertHandler.getNum("12..5mi"),
     "invalid number", 
     'should not contain double "."');
  });

  test('#fractional', function () {
    assert.equal(convertHandler.getNum("1/2mi"),
     .5, 
     'should correctly read a fractional input.');
  });

  test('#fractional with a decimal', function () {
    assert.equal(convertHandler.getNum("12.33/2mi"),
     6.165, 
     'should correctly read a fractional input with a decimal in numerator.');

    assert.equal(convertHandler.getNum("12/2.67mi"),
     4.494382022471910, 
     'should correctly read a fractional input with a decimal in denominator.');

    assert.equal(convertHandler.getNum("12.56/2.65mi"),
     4.739622641509435, 
     'should correctly read a fractional input with a decimal in both numerator and denominator.');
  });

  test('#double-fraction', function () {
    const expresion = convertHandler.getNum("12//5mi");
    assert.equal(expresion,
     "invalid number", 
     'should correctly return an error on a double-fraction (i.e. 3/2/3).');
  });

  test('#no numerical', function () {
    assert.equal(convertHandler.getNum("mi"),
     1, 
     'should correctly default to a numerical input of 1 when no numerical input is provided.');
  });
  
  test('#unit', function () {
    units.forEach(({unit}) => {
      assert.equal(convertHandler.getUnit("12" + unit),
        unit,
        "should correctly read input unit: " + unit)
      });
  });

  test('#invalid unit', function () {
    assert.equal(convertHandler.getUnit("12mii"),
     "invalid unit", 
     'should correctly return an error for an invalid input unit.');
  });

  test('#return unit', function () {
    units.forEach(({unit, oposite}) => {
      assert.equal(convertHandler.getReturnUnit(unit),
        oposite,
        'should return oposite unit: ' + oposite + 'for input: ' + unit)
      });
  });

  test('#spelled-out unit', function () {
    units.forEach(({unit, spell}) => {
      assert.equal(convertHandler.spellOutUnit(unit),
        spell,
        'should return spell: ' + spell + 'for input: ' + unit)
      });
  });

  test('#gal to L', function () {
    assert.equal(convertHandler.convert(12, "gal"),
     45.42492, 
     'should correctly convert gal to L.');
  });

  test('#L to gal', function () {
    assert.equal(convertHandler.convert(12, "L"),
     3.17007,
     'should correctly convert L to gal.');
  });

  test('#mi to km', function () {
    assert.equal(convertHandler.convert(12, "mi"),
     19.31208,
     'should correctly convert mi to km.');
  });

  test('#km to mi', function () {
    assert.equal(convertHandler.convert(12, "km"),
     7.45647,
     'should correctly convert km to mi.');
  });

  test('#lbs to kg', function () {
    assert.equal(convertHandler.convert(12, "lbs"),
     5.44310,
     'should correctly convert lbs to kg.');
  });

  test('#kg to lbs', function () {
    assert.equal(convertHandler.convert(12, "kg"),
     26.45549,
     'should correctly convert kg to lbs.');
  });
});
