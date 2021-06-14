function ConvertHandler() {
  const units = require('../units.json');
  
  // Utility method to get number or input
  this.getnOU = function(input) {

    const regx = {
      "num": /^\d+(\.\d+)?(\/\d+(\.\d+)?)?/g,
      "unit": new RegExp(
        `(${units.map(
            ({unit}) => unit
          ).join("|")})$`, 'gi')
    }
    
    const result = {
      "num":0,
      "unit":""
    }

    // getUnit
    regx["unit"].test(input) ?
       result.unit = input.match(regx["unit"])[0]
      :result.unit = 'invalid unit'

    // getNum
    const otherInput = input.replace(regx["unit"],"")
    if(otherInput === ""){
      result.num = 1
    }else if(regx["num"].test(otherInput)){
      const multipleFSlashDot = /\/\/+/.test(otherInput) || /\.\.+/.test(otherInput)
      const invalidNumInEnd = /^[\d\/]+$/.test(otherInput.replace(regx["num"],""))
      const calculateNum = num => /[/]/.test(num) ? eval(num) : Number(num)

       multipleFSlashDot || invalidNumInEnd ?
         result.num = 'invalid number'
        :result.num = calculateNum(otherInput.match(regx["num"])[0])
    }else{
      result.num = 'invalid number'
    }

    return result;
  };

  // method to get number
  this.getNum = function(input) {
    return this.getnOU(input).num;
  };

  // method to get input
  this.getUnit = function(input) {
    return this.getnOU(input).unit
  };

  // method to get return unit
  this.getReturnUnit = function(initUnit) {
    return units.find(({unit}) => unit === initUnit).oposite;
  };

  // method to get unit spell
  this.spellOutUnit = function(unitName) {
    return units.find(({unit}) => unit === unitName).spell;
  };

  // method to convert unit
  this.convert = function(initNum, initUnit) {
    const ratio = units.find(({unit}) => unit === initUnit).ratio;
    const result = initNum * ratio;
    return Number(result.toFixed(5));
  };

  // method to get response details
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const fullInitUnit = this.spellOutUnit(initUnit);
    const fullReturnUnit = this.spellOutUnit(returnUnit);

    return `${initNum} ${fullInitUnit} converts to ${returnNum} ${fullReturnUnit}`;
  };

  // method to get response json
  this.getResponse = function(input) {
    const initNum = this.getNum(input);
    const initUnit = this.getUnit(input).replace(/^l$/, "L");

    if(/invalid/.test(initNum) && /invalid/.test(initUnit)){
      return "invalid number and unit"
    }
    
    if(/invalid/.test(initNum)){
      return initNum
    }

    if(/invalid/.test(initUnit)){
      return initUnit
    }

    const returnNum = this.convert(initNum, initUnit);
    const returnUnit = this.getReturnUnit(initUnit);

    return {
      "initNum": initNum,
      "initUnit": initUnit,
      "returnNum": returnNum,
      "returnUnit": returnUnit,
      "string": this.getString(initNum, initUnit, returnNum, returnUnit)
    };
  };  
}

module.exports = ConvertHandler;
