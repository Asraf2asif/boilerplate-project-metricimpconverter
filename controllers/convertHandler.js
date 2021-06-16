function ConvertHandler() {
  const units = require('../units.json');
  const unitRegex = new RegExp(
        `(${units.map(
            ({unit}) => unit
          ).join("|")})$`, 'gi')
  
  // method to get number
  this.getNum = function(input) {
    const numRegex = /^\d+(\.(?!\.+)\d+)?(\/(?!\/+)(\d+(\.(?!\.+)\d+)?))?/g
    const withOutUnit = input.replace(unitRegex,"")

    if(withOutUnit === ""){
      return 1
    }else if(numRegex.test(withOutUnit)){
      const invalidNumInEnd = /^[\d\/\.]+$/.test(withOutUnit.replace(numRegex,""))
      const multipleFSlashDot = /\/\/+/.test(withOutUnit) || /\.\.+/.test(withOutUnit)
      const calculateNum = num => /[/]/.test(num) ? eval(num) : Number(num)
      
      if(!multipleFSlashDot && !invalidNumInEnd){
        return calculateNum(withOutUnit.match(numRegex)[0])
      }
    }
    return 'invalid number'
  };

  // method to get input
  this.getUnit = function(input) {
    return unitRegex.test(input) ?
            input.match(unitRegex)[0] :
            'invalid unit'
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
