//Class Rule Base Prototype
var RuleBase = function (variables) {
    let countVariability = getCountVariability();

    this.listCharacteristicModel = new Array(countVariability);

    for (var i = 0; i < countVariability; i++) {
        this.listCharacteristicModel[i] = -1;
    }

    this.baseOfRules = new Array(countVariability);
    for (var i = 0; i < countVariability; i++) {
        this.baseOfRules[i] = new Array(variables.length);
    }

    var countRepeat;
    for (var indexVar = 0; indexVar < variables.length; indexVar++) {

        if (indexVar == 0) {
            countRepeat = countVariability / variables[indexVar].getListTerm().length;
        } else {
            countRepeat = countRepeat / variables[indexVar].getListTerm().length;
        }

        let arrayColumn = arrayWithCombination(countRepeat, variables[indexVar], countVariability);
        for (var row = 0; row < countVariability; row++) {
            this.baseOfRules[row][indexVar] = arrayColumn[row];
        }
    }
};

RuleBase.prototype.setValueCharacteristicModelAtIndex = function (value, index) {
    this.listCharacteristicModel[index] = value;
};

RuleBase.prototype.getListCharacteristicModel = function () {
    return this.listCharacteristicModel;
};

RuleBase.prototype.getListRule = function () {
    return this.baseOfRules;
};

function getCountVariability() {
    let countVariability = 1;
    for (var indexVar = 0; indexVar < variables.length; indexVar++) {
        countVariability *= variables[indexVar].getListTerm().length;
    }
    return countVariability;
}

function arrayWithCombination(repeat, baseObject, countRows) {
    var indexFromBase = 0;
    var numRepeat = 0;
    var resultArray = new Array(0);
    for (var rowIndex = 0; rowIndex < countRows; rowIndex++) {
        resultArray.push(baseObject.getListTerm()[indexFromBase]);
        numRepeat++;
        if (numRepeat == repeat) {
            numRepeat = 0;
            indexFromBase++;
            if (!(indexFromBase < baseObject.getListTerm().length)) {
                indexFromBase = 0;
            }
        }
    }
    return resultArray;
}