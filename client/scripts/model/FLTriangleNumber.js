//Class Triangle Number Prototype
var TriangleNumber = function (leftRange, middleRange, rightRange) {
    this.leftRange = parseInt(leftRange, 10);
    this.middleRange = parseInt(middleRange, 10);
    this.rightRange = parseInt(rightRange, 10);
};

TriangleNumber.prototype.getLeftRange = function () {
    return this.leftRange;
};

TriangleNumber.prototype.getMiddleRange = function () {
    return this.middleRange;
};

TriangleNumber.prototype.getRightRange = function () {
    return this.rightRange;
};

TriangleNumber.prototype.getDiscreteValue = function () {
    return this.leftRange + this.middleRange + this.leftRange;
};