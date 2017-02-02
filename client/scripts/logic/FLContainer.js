//GLOBAL DATA
let countVariables = 0;

let currentVariable = -1;

let variables;
variables = new Array(0);

let outputVar;

let baseOfRules;
let knowledgeMatrix;

//LOCAL DATA
let currentTerm = 0;

let series;
series = new Array(0);

let terms;
terms = new Array(0);

//METHODS

function addTerm(term) {
    terms.push(term);
    repaintChart();
}

function addVariable(variable) {
    variable.sortListTermContent();
    hidePopup();

    if (variable.getType() == 1) {
        variables.push(variable);
        countVariables++;
        createVariableUIElementWithIndex(countVariables-1);
    } else if (variable.getType() == 0){
        outputVar = variable;
        createOutputVariableUIElement();
    }
}

function editTermByID(id) {
    let editableTerm = fetchTriangleDataForm();
    terms = insertObjectToListAtID(editableTerm, terms, id);
    repaintChart();
}

function editVariableWithID(id) {
    let editableVariable = fetchVariableDataForm();
    let updateListVariables = insertObjectToListAtID(editableVariable, variables, id);
    if (id != "R") {
        variables = updateListVariables;
    }
}

function getIndexByTag(index, tag) {
    return index.replace(tag,"");
}

function loadDataVariableByIndex(index) {
    let variableIndex = getIndexByTag(index, "workspace-var-");
    formWillAppearWithVariableByIndex(variableIndex);
    showPopup();
}

function loadDataTermByIndex(index) {
    let term = terms[index];
    if (term) {
        let triangleNumber = term.getTriangleNumber();
        document.getElementById("a0").valueOf().value = triangleNumber.getLeftRange();
        document.getElementById("a1").valueOf().value = triangleNumber.getMiddleRange();
        document.getElementById("a2").valueOf().value = triangleNumber.getRightRange();
        document.getElementById("name").valueOf().value = term.getName();
        document.getElementById("shortName").valueOf().value = term.getShortName();
    }
}

function insertObjectToListAtID(object, list, id) {
    let editableList = new Array(0);
    object.sortListTermContent();

    if (id == "R") {
        outputVar = object;
    } else {
        for (let i = 0; i < list.length; i++) {
            if (i == id) {
                editableList.push(object);
            } else {
                editableList.push(list[i]);
            }
        }
    }

    return editableList.slice();
}