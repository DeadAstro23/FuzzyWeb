//Class Variable Prototype
var Variable = function (title, type, countTerm, listTerm, signalValue) {
    this.signalValue = signalValue;
    this.name = title;
    this.type = type;
    this.count = countTerm;
    this.list = listTerm.slice();
};

Variable.prototype.getType = function () {
    return this.type;
};

Variable.prototype.getTitle = function () {
    return this.name;
};

Variable.prototype.getCountTerm = function () {
    return this.count;
};

Variable.prototype.getSignalValue = function () {
    return this.signalValue;
};

Variable.prototype.getListTerm = function () {
    var listTerm = this.list.slice();
    return listTerm;
};

Variable.prototype.sortListTermContent = function () {
    this.list.sort(function (object1, object2) {
        if (object1.triangleNumber.getDiscreteValue() < object2.triangleNumber.getDiscreteValue()) {
            return -1;
        } else if (object1.triangleNumber.getDiscreteValue() > object2.triangleNumber.getDiscreteValue()) {
            return 1;
        }

        return 0;
    });
};