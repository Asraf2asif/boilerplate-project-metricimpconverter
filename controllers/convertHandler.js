function ConvertHandler() {
  const unitInfo = {
    "gal": {
      "opposite": "L",
      "spell": "gallons",
      "ratio": 3.78541
    },
    "lbs": {
      "opposite": "kg",
      "spell": "pounds",
      "ratio": 0.453592
    },
    "mi": {
      "opposite": "km",
      "spell": "miles",
      "ratio": 1.60934
    },
    "L": {
      "opposite": "gal",
      "spell": "liters",
      "ratio": 1 / 3.78541
    },
    "kg": {
      "opposite": "lbs",
      "spell": "kilograms",
      "ratio": 1 / 0.453592
    },
    "km": {
      "opposite": "mi",
      "spell": "kilometers",
      "ratio": 1 / 1.60934
    }
  }

  // Utility method to get number or input
  this.getnOU = function(input) {
    const regx = {
      "num": /^\d+(\.\d+)?(\/\d+(\.\d+)?)?/g,
      "unit": /(gal|lbs|mi|L|kg|km)$/gi
    }

    const result = {
      "num":0,
      "unit":""
    }

    if(regx["unit"].test(input)){
      result.unit = input.match(regx["unit"])[0]
    }else{
      result.unit = 'invalid unit'
    }

    const otherInput = input.replace(regx["unit"],"")
    if(otherInput === ""){
      result.num = 1
    }else if(regx["num"].test(otherInput)){
      // test for multiple "/" and "." and invalid num in end
      const invalidNumInEnd = /^[\d\/]+$/.test(otherInput.replace(regx["num"],""))
      if(/\/\/+/.test(otherInput)||/\.\.+/.test(otherInput) || invalidNumInEnd){
        result.num = 'invalid number'
      }else{
        result.num = otherInput.match(regx["num"])[0]
      }
    }else{
      result.num = 'invalid number'
    }

    return result;
  };

  // method to get number
  this.getNum = function(input) {
    let num = this.getnOU(input).num
 
    if(/[/]/.test(num)){
      num = eval(num)
    }
    if(/\d+/.test(num)){
      num = Number(num)
    }
    return num;
  };

  // method to get input
  this.getUnit = function(input) {
    return this.getnOU(input).unit
  };

  // method to get return unit
  this.getReturnUnit = function(initUnit) {
    return unitInfo[initUnit].opposite;
  };

  // method to get unit spell
  this.spellOutUnit = function(unit) {
    return unitInfo[unit].spell;
  };

  // method to convert unit
  this.convert = function(initNum, initUnit) {
    const result = initNum * unitInfo[initUnit].ratio;
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
