//Class Knowledge Matrix Prototype
var KnowledgeMatrix = function (outputVar, baseOfRules) {
    this.listKnowledge = new Array(outputVar.getListTerm().length);
    for (var group = 0; group < outputVar.getListTerm().length; group++) {
        this.listKnowledge[group] = new Array (0);
    }

    for (var row = 0; row < baseOfRules.getListRule().length; row++) {
        var index = baseOfRules.getListCharacteristicModel()[row];
        if (index != -1) {
            this.listKnowledge[index].push(baseOfRules.getListRule()[row]);
        }
    }
};

KnowledgeMatrix.prototype.getListKnowledgeMatrix = function () {
    return this.listKnowledge;
};