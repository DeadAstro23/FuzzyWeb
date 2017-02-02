function resetFormData() {
    document.getElementById("typeVar").valueOf().value = 1;
    document.getElementById("titleVar").valueOf().value = "";
    document.getElementById("countTerm").valueOf().value = "0";
    document.getElementById("signalValue").valueOf().value = 0;
    document.getElementById("signalValue").disabled = false;

    resetTriangleDataForm();
    hideTriangleDataForm();

    terms.length = 0;
    series.length = 0;
    currentTerm = 0;
    currentVariable = -1;

    chart.update;
}

function fetchTriangleDataForm() {
    let triangleNumber = new TriangleNumber(
        document.getElementById("a0").valueOf().value,
        document.getElementById("a1").valueOf().value,
        document.getElementById("a2").valueOf().value
    );
    let termData = new Term(
        triangleNumber,
        document.getElementById("name").valueOf().value,
        document.getElementById("shortName").valueOf().value
    );
    return termData;
}

function fetchVariableDataForm() {
    let variableData = new Variable(
        document.getElementById("titleVar").valueOf().value,
        document.getElementById("typeVar").valueOf().value,
        document.getElementById("countTerm").valueOf().value,
        terms,
        document.getElementById("signalValue").valueOf().value
    );
    return variableData;
}

function fetchRulesDataForm() {
    for (var row = 0; row < baseOfRules.getListRule().length; row++) {
        var select = document.getElementById('select-'+row);
        baseOfRules.setValueCharacteristicModelAtIndex(select.selectedIndex, row);
    }
}

function resetTriangleDataForm() {
    document.getElementById("name").valueOf().value = "";
    document.getElementById("shortName").valueOf().value = "";
    document.getElementById("a0").valueOf().value = "";
    document.getElementById("a1").valueOf().value = "";
    document.getElementById("a2").valueOf().value = "";
}

function isEmptyFields() {
    if (terms.length == document.getElementById("countTerm").valueOf().value && document.getElementById("titleVar").valueOf().value != "" && document.getElementById("countTerm").valueOf().value > 0){
        return false;
    }
    return true;
}

function showTriangleDataForm() {
    $(".term-data").height("100%");
    $(".term-data").css('visibility', 'visible');
}

function hideTriangleDataForm() {
    $(".term-data").height(0);
    $(".term-data").css('visibility','hidden');
}

function formWillAppearWithVariableByIndex(index) {
    var currentVar;

    if (index == "R") {
        currentVar = outputVar;
    } else {
        currentVar = variables[index];
    }

    document.getElementById("titleVar").valueOf().value = currentVar.getTitle();
    document.getElementById("typeVar").value = currentVar.getType();
    document.getElementById("countTerm").valueOf().value = currentVar.getCountTerm();
    document.getElementById("signalValue").valueOf().value = currentVar.getSignalValue();
    terms = currentVar.getListTerm();
    currentTerm = 0;
    currentVariable = index;
    loadDataTermByIndex(currentTerm);
    changeCountTerms();
    repaintChart();
}