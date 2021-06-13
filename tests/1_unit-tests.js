const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

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
    //"gal lbs mi L kg km"

    assert.equal(convertHandler.getUnit("12gal"),
     "gal", 
     'should correctly read input unit gal.');

    assert.equal(convertHandler.getUnit("12lbs"),
     "lbs", 
     'should correctly read input unit lbs.');

    assert.equal(convertHandler.getUnit("12mi"),
     "mi", 
     'should correctly read input unit mi.');

    assert.equal(convertHandler.getUnit("12L"),
     "L", 
     'should correctly read input unit L.');

     assert.equal(convertHandler.getUnit("12l"),
     "l", 
     'should correctly read input unit L.');

    assert.equal(convertHandler.getUnit("12kg"),
     "kg", 
     'should correctly read input unit kg.');

    assert.equal(convertHandler.getUnit("12km"),
     "km", 
     'should correctly read input unit km.');
  });

  test('#invalid unit', function () {
    assert.equal(convertHandler.getUnit("12mii"),
     "invalid unit", 
     'should correctly return an error for an invalid input unit.');
  });

  test('#return unit', function () {
    //"gal lbs mi L   kg  km"
    //"L   kg  km gal lbs mi"
    
    assert.equal(convertHandler.getReturnUnit("gal"),
     "L", 
     'should return unit "L" return for input gal.');

     assert.equal(convertHandler.getReturnUnit("lbs"),
     "kg", 
     'should return unit "kg" return for input lbs.');

     assert.equal(convertHandler.getReturnUnit("mi"),
     "km", 
     'should return unit "km" return for input mi.');

     assert.equal(convertHandler.getReturnUnit("L"),
     "gal", 
     'should return unit "gal" return for input L.');

     assert.equal(convertHandler.getReturnUnit("kg"),
     "lbs", 
     'should return unit "lbs" return for input kg.');

     assert.equal(convertHandler.getReturnUnit("km"),
     "mi", 
     'should return unit "mi" return for input km.');
  });

  test('#spelled-out unit', function () {
    //"gal     lbs    mi    L      kg        km"
    //"gallons pounds miles liters kilograms kilometers"

    assert.equal(convertHandler.spellOutUnit("gal"),
     "gallons", 
     'should correctly spell gallons for input gal.');

     assert.equal(convertHandler.spellOutUnit("lbs"),
     "pounds", 
     'should correctly spell pounds for input lbs.');

     assert.equal(convertHandler.spellOutUnit("mi"),
     "miles", 
     'should correctly spell miles for input mi.');

     assert.equal(convertHandler.spellOutUnit("L"),
     "liters", 
     'should correctly spell liters for input L.');

     assert.equal(convertHandler.spellOutUnit("kg"),
     "kilograms", 
     'should correctly spell kilograms for input kg.');

     assert.equal(convertHandler.spellOutUnit("km"),
     "kilometers", 
     'should correctly spell kilometers for input km.');
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