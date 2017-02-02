//Class Term Prototype
var Term = function (triangleNumber, name, shortName) {
    this.triangleNumber = triangleNumber;
    this.name = name;
    this.shortName = shortName;
};

Term.prototype.getTriangleNumber = function () {
    return this.triangleNumber;
};

Term.prototype.getName = function () {
    return this.name;
};

Term.prototype.getShortName = function () {
    return this.shortName;
};

Term.prototype.term = function () {
    return [this.triangleNumber.leftRange, this.triangleNumber.middleRange, this.triangleNumber.rightRange];
};

Term.prototype.getPowerOfMembershipBySignal = function (signal) {
    var returnValue;

    if ( (this.triangleNumber.leftRange < signal) && (signal < this.triangleNumber.middleRange) ) {
        returnValue = (signal - this.triangleNumber.leftRange) / (this.triangleNumber.middleRange - this.triangleNumber.leftRange);
    } else if ( (this.triangleNumber.middleRange < signal) && (signal < this.triangleNumber.rightRange) ) {
        returnValue = (this.triangleNumber.rightRange - signal) / (this.triangleNumber.rightRange - this.triangleNumber.middleRange);
    } else if ( (signal <= this.triangleNumber.leftRange) || (signal >= this.triangleNumber.rightRange) ) {
        returnValue = 0;
    }

    return returnValue;
};