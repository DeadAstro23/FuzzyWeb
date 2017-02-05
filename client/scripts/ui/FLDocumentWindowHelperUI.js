//WINDOW ACTIVITY
$(document).ready(function() {
    $(".popup_bg").click(function(){
        hidePopup();
    });
});

function createOutputVariableUIElement() {
    let title = outputVar.getTitle();
    let workspace = document.getElementById('workspace');
    let divElem = document.createElement('div');

    divElem.id = "workspace-var-" + "R";
    divElem.className = 'div-variable';
    divElem.innerHTML = title;
    divElem.onclick = function () {
        loadDataVariableByIndex(divElem.id);
    };

    let rectWorkspace = workspace.getBoundingClientRect();
    let width = rectWorkspace.right - rectWorkspace.left;
    divElem.style.left = width / 2 + "px";
    workspace.appendChild(divElem);
}

function createVariableUIElementWithIndex(index) {
    let title = variables[index].getTitle();
    let workspace = document.getElementById('workspace');
    let divElem = document.createElement('div');

    divElem.id = "workspace-var-" + index.toString();
    divElem.className = 'div-variable';
    divElem.innerHTML = title;
    divElem.onclick = function () {
        loadDataVariableByIndex(divElem.id);
    };
    if (index > 0) {
        let lastVariableElement = workspace.lastChild;
        let rect = lastVariableElement.getBoundingClientRect();
        let resultTop = 15 + rect.bottom;
        divElem.style.top = resultTop.toString() + "px";
    }

    workspace.appendChild(divElem);
}

function createFuzzyDSSUIElement() {
    let title = "Fuzzy DSS";
    let workspace = document.getElementById('workspace');
    let divElem = document.createElement('div');
    divElem.className = 'div-variable';
    divElem.innerHTML = title;

    let rectWorkspace = workspace.getBoundingClientRect();
    let width = rectWorkspace.right - rectWorkspace.left;
    divElem.style.left = "0px";
    divElem.style.right = '0px';
    divElem.style.position = 'absolute';
    divElem.style.marginTop = '75px';

    divElem.onclick = function () {
        createPopup();
        showPopupDss();
    };

    workspace.appendChild(divElem);
}

function createPopup() {
    let popup = document.createElement('div');
    popup.className = 'popup_dss';

    let popup_bg = document.createElement('div');
    popup_bg.className = 'popup_bg_dss';
    popup_bg.onclick = function () {
        hidePopupDss();
    };

    let form = document.createElement('form');

    form.className = 'form';
    form.id = 'rule-form';

    tableWithRulesToParent(form);
    addAcceptButtonWithParent(form);

    popup.appendChild(popup_bg);
    popup.appendChild(form);

    document.body.appendChild(popup);
}

function buildRules() {
    if (variables.length == 0 || !outputVar) {
        alert("You need create input and output variable");
    } else {
        baseOfRules = new RuleBase(variables);
``        createFuzzyDSSUIElement();
    }
}

function addAcceptButtonWithParent(parent) {
    alert('addAcceptButtonWithParent');
    var inputTag = document.createElement('div');
    inputTag.innerHTML = "<input type = 'button' value = 'Accept' onclick = 'btnAcceptRules();'>";
    parent.appendChild(inputTag);
}

function tableWithRulesToParent(parent) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
    var titleRow = document.createElement('tr');

    for (var i = 0; i < variables.length; i++) {
        var cell = document.createElement('th');
        var cellText = document.createTextNode(variables[i].getTitle());
        cell.appendChild(cellText);
        titleRow.appendChild(cell);
    }
    var cell = document.createElement('th');
    var cellText = document.createTextNode(outputVar.getTitle());
    cell.appendChild(cellText);
    titleRow.appendChild(cell);
    tableBody.appendChild(titleRow);

    for (var j = 0; j < baseOfRules.getListRule().length; j++) {
        var row = document.createElement('tr');
        for (var i = 0; i <= baseOfRules.getListRule()[j].length; i++) {
            var cell = document.createElement('td');
            if (i == baseOfRules.getListRule()[j].length) {
                var select = document.createElement('select');
                var array = new Array(0);
                for (var index = 0; index < outputVar.getListTerm().length; index++) {
                    array.push(outputVar.getListTerm()[index].getShortName());
                }
                for (var i = 0; i < array.length; i++) {
                    var option = document.createElement("option");
                    option.value = array[i];
                    option.text = array[i];
                    select.id = 'select-' + j;

                    select.appendChild(option);
                }
                if (baseOfRules.getListCharacteristicModel()[j] == -1) {
                    select.selectedIndex = -1;
                } else {
                    select.selectedIndex = baseOfRules.getListCharacteristicModel()[j];
                }

                cell.appendChild(select);
            } else {
                var cellText = document.createTextNode(baseOfRules.getListRule()[j][i].getShortName());
                cell.appendChild(cellText);
            }
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    table.setAttribute("border", "1");
    parent.appendChild(table);
}

function showRules() {
    let debugString = "";
    var arrayWithRules = baseOfRules.getListRule();

    for (var row = 0; row < arrayWithRules.length; row++) {
        for (var column = 0; column < arrayWithRules[row].length; column++) {
            debugString += arrayWithRules[row][column].getShortName() + " ";
        }
        debugString += "\n";
    }

    alert ("debug: " + debugString);
}

function indexAtMaximalElementInArray(array) {
    let indexMax = 0;
    let max = array[0];
    for (var index = 1; index < array.length; index++) {
        if (array[index] > max) {
            max = array[index];
            indexMax = index;
        }
    }
    return indexMax;
}

function getResultGroup(vectorFuziification) {
    let group = outputVar.getListTerm()[indexAtMaximalElementInArray(vectorFuziification)];
    return group;
}

let resultGroupArray = [];
let variablesGroupArray = [];

function run() {
    let vector = fuzzificationVector();

    if(vector.length > 0) {
        vector.join();

        let resultGroup = getResultGroup(vector);
        resultGroupArray.push(resultGroup);

        let result = resultGroup.getName();
        let workspace = document.getElementById('workspace');

        let a = document.createElement('span');
        a.innerHTML = "vector: " + vector.join() + '<br/>' + 'result Group: ' + result + '<br/>';
        a.className = 'vector-info';

        let workspaceContent = workspace.innerHTML;
        let workspaceCopy = document.createElement('div');
        workspaceCopy.className = 'workspace-copy';
        workspaceCopy.innerHTML = a.outerHTML + workspaceContent;

        //document.body.insertBefore(a, workspace);

        document.body.appendChild(workspaceCopy);

        workspace.innerHTML = '';

        let b = JSON.stringify(resultGroup);

        variables[0].list.forEach(function (variable) {
            let a = JSON.stringify(variable);

            if (a === b) {
                variablesGroupArray.push(variable)
            }
        });

        variablesOut[0].list.forEach(function (variable) {
            let a = JSON.stringify(variable);
            if (a === b) {
                variablesGroupArray = variablesOut[0];
            }
        });

        /* ------------- */
        countVariables = 0;

        currentVariable = -1;

        variables = [];
        variablesOut = [];

        outputVar = undefined;

        baseOfRules = undefined;
        knowledgeMatrix = undefined;

        currentTerm = 0;

        series = [];

        terms = [];

        chart = new Chartist.Line('.ct-chart', data, plotOptions);
        /* ------------- */

    }
    else {
        alert('You haven\'t filled all the needed info !');
    }

    if ( resultGroupArray.length >= 2) {
        variables = variablesGroupArray;
        console.log('IT WORKS!!!!', variables);
        // нужно додумать как рисовать график повторно и дизейблить лишние кнопки
        // + выяснить по шагам какие данные приходят в функции run и модифицировать run1
    }

}

function run1() {
    let vector = resultGroupArray;

    if(vector.length > 0) {
        let resultGroup = getResultGroup(vector);
        alert("result Group: " + resultGroup.getName());
    }
}

function hidePopup() {
    $(".popup").fadeOut(400);
    resetFormData();
}

function showPopup() {
    $(".popup").fadeIn(400);

    if (outputVar) {
        var select = document.getElementById('typeVar');
        select.options['1'].setAttribute("disabled","disabled");
    }

    chart.update();
}

function hidePopupDss() {
    $(".popup_bg_dss").remove();
    $(".popup_dss").remove();
}

function showPopupDss() {
    $(".popup_dss").fadeIn(400);
}

function changeSelectTypeVariable() {
    var select = document.getElementById('typeVar');
    var signalInputValue = document.getElementById('signalValue');

    if (select.selectedIndex == 1) {
        signalInputValue.disabled = true;
    } else {
        signalInputValue.disabled = false;
    }
}

function changeCountTerms() {
    let countTerm = document.getElementById("countTerm").valueOf().value;

    if (countTerm > 0) {
        showTriangleDataForm();
    } else if (countTerm == 0) {
        hideTriangleDataForm();
    }

    document.getElementById("termPages").innerHTML = (currentTerm+1) + " of " +countTerm;
}

//HANDLERS
function btnNext() {
    if (((currentTerm + 1) + 1) <= document.getElementById("countTerm").valueOf().value) {
        currentTerm++;
        if (currentTerm < terms.length){
            loadDataTermByIndex(currentTerm);
        } else {
            resetTriangleDataForm();
        }
        document.getElementById("termPages").innerHTML = (currentTerm+1) + " of " + document.getElementById("countTerm").valueOf().value;
    } else {
        alert("LAST ITEM TERM LIST");
    }
}

function btnPreview() {
    if (((currentTerm + 1) - 1) > 0) {
        currentTerm--;
        if (currentTerm < terms.length) {
            loadDataTermByIndex(currentTerm);
        }
        document.getElementById("termPages").innerHTML = (currentTerm+1) + " of " + document.getElementById("countTerm").valueOf().value;
    } else {
        alert("FIRST ITEM TERM LIST");
    }
}

function btnAccept() {
    if (currentTerm >= terms.length) {
        var temp = fetchTriangleDataForm();
        addTerm(temp);
    } else {
        editTermByID(currentTerm);
    }
}

function btnDone() {
    if (!isEmptyFields()){
        if (currentVariable == -1) {
            addVariable(fetchVariableDataForm());
        } else {
            editVariableWithID(currentVariable);
            hidePopup();
        }
    } else {
        alert("Please, input data for variable");
    }
}

function btnAcceptRules() {
    fetchRulesDataForm();
    knowledgeMatrix = new KnowledgeMatrix(outputVar, baseOfRules);
    hidePopupDss();
}