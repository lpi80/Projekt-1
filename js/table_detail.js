'use strict';

var headerText = [];
var columns = 4;
var rows;
var number = 1;
var maxRows = 0;
var maxNumber = 0;
var minNumber = 1;
var paginationNumber = 9;

var step;


var myTable = document.querySelector('#payoutTable');
var myRow = myTable.querySelectorAll('.table__row--single');
var myHeaders = myTable.querySelectorAll(".table__ceil--header");

var myTableChecked = myTable.querySelectorAll('.table__checked');
var myTableUnchecked = myTable.querySelectorAll('.table__unchecked');

var myPagination = document.querySelector('#payuotPagination');
var myPaginationElement = myPagination.querySelectorAll('.pagination__list');
var myPaginationIcon = myPagination.querySelectorAll('.pagination__list--icon');

///set content to table__ceil--header::before
function setContentBefore() {
    for(var i = 0; i < myHeaders.length; i++) {
        var current = myHeaders[i];
        headerText.push(current.textContent.replace(/\r?\n|\r/,""));
    } 
    for (var i = 0; i < myRow.length; i++) {
        for (var j = 0; j < myRow[i].children.length; j++) {
            myRow[i].children[j].setAttribute("data-th", headerText[j]);
        } 
    }
}


function paginationParameters() {
    if (window.innerWidth < 1000) {
        rows = 10;
        paginationNumber = 3;
    }
    else {
        rows = 10;
        paginationNumber = 10;
        
    }
    maxNumber = minNumber + paginationNumber - 1;
}

function tableHiddenAll(element, index, array) {
    
    element.style.display = 'none' //hide each row
    maxRows++; //information about quantity of rows
}

function myPaginationClear(element, index, array) {
    element.classList.remove('pagination__list--active'); //deactivation set field --> each field
    if (((index + minNumber - 1)  * rows + 1 <= maxRows) && (index < paginationNumber)) { //check the next list --> if not empty
        element.style.display = 'block';    //show field
        element.innerText = '' + (index + minNumber); //number of field (list)
    }
    else {
        element.style.display = 'none';  //hide field
    }
    
}

function showRows() {
    maxRows = 0; //important --> next line count it one more time!!!
    myRow.forEach(tableHiddenAll);

    myPaginationElement.forEach(myPaginationClear);  //Clear active for all fields
    myPaginationElement[number - minNumber].classList.add('pagination__list--active'); //show active field

    //show rows
    for (step = ((number - 1 ) * rows); step < ((number - 1 ) * rows) + rows; step++) {
        if (step < maxRows) { //protection <-- less data then fields
            myRow[step].style.display = 'table-row';
        }
    }
}


var newTable = [];
function sortByCol(arr, colIndex,direction){
    arr.sort(sortFunction);
    function sortFunction(a, b) {
        a = a[colIndex];
        b = b[colIndex];

        if (direction === 'asc') {
            return (a === b) ? 0 : (a < b) ? -1 : 1
        }

        if (direction === 'desc') {
            return (a === b) ? 0 : (a > b) ? -1 : 1
        }
        
    }
}

function getData() {
    var i, j;
    for (i = 0; i < myRow.length; i++){
        newTable[i]=[];
        for (j = 0; j < myRow[i].children.length; j++){
            newTable[i][j] = myRow[i].children[j].innerText;
        }
    }
}

function setData() {
    var i, j;
    for (i = 0; i < myRow.length; i++){
        for (j = 0; j < myRow[i].children.length; j++){
            myRow[i].children[j].innerText = newTable[i][j];
        }
    }
}

//initialization

setContentBefore()
paginationParameters();
showRows();
getData();

//pagination field (numbet) is clicked
var buttonClickCallback = function(event) {
    number=Number(this.innerText);  //set active field
    showRows();
}

var buttonClickCallbackPrevious = function(event) { //Previous
    if (minNumber > 1) { //permition to shift max and min
        maxNumber--;
        minNumber--;
    }
    number--;
    if (number < 1) {number = 1;} //set min value
    showRows();
}

var buttonClickCallbackNext = function(event) { //Next
    if (number  * rows + 1 <= maxRows) {
        number++;
        if (number > maxNumber) { //permition to shift max and min
            maxNumber++; 
            minNumber++;
        }
    }
    showRows();
}

var paginationParametersCallBack = function(event) {
    paginationParameters();
    showRows();
}

var sortUpClickCallback = function(index) {
    return function() {
        console.log(index);
        getData();
        sortByCol(newTable, index - 1, 'asc');
        setData();
    }
}

var sortDownClickCallback = function(index) {
    return function() {
        console.log(index);
        getData();
        sortByCol(newTable, index - 1, 'desc');
        setData();
    }
}


myPaginationIcon[0].addEventListener('click', buttonClickCallbackPrevious); //Previous
myPaginationIcon[1].addEventListener('click', buttonClickCallbackNext); //Next
window.addEventListener('resize', paginationParametersCallBack);

var i;
for (i = 1; i <= columns; i++) { //html is ready for 4 elements!!
    myTableChecked[i - 1].addEventListener('click', sortUpClickCallback(i));
    myTableUnchecked[i - 1].addEventListener('click', sortDownClickCallback(i));
}


//waiting for information
for (step = 1; step <= paginationNumber; step++) { //html is ready for 10 elements!!
    myPaginationElement[step - 1].addEventListener('click', buttonClickCallback);
}
