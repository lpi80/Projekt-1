var rows = 10;
var number = 1;
var maxRows = 0;
var maxNumber = 10;
var minNumber = 1;

var myTable = document.querySelector('#payoutTable');
var myRow = myTable.querySelectorAll('.table__row--single');

var myPagination = document.querySelector('#payuotPagination');
var myPaginationElement = myPagination.querySelectorAll('.pagination__list');
var myPaginationIcon = myPagination.querySelectorAll('.pagination__list--icon');


function tableHiddenAll(element, index, array) {
    element.style.display = 'none' //hide each row
    maxRows++; //information about quantity of rows
}

function myPaginationClear(element, index, array) {
    element.classList.remove('pagination__list--active'); //deactivation set field --> each field
    if ((index + minNumber - 1)  * rows + 1 <= maxRows) { //check the next list --> if not empty
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

showRows();

//pagination field (numbet) is clicked
buttonClickCallback = function(event) {
    number=Number(this.innerText);  //set active field
    showRows();
}

//waiting for information
for (step = 1; step <= 10; step++) { //html is ready for 10 elements!!
    myPaginationElement[step - 1].addEventListener('click', buttonClickCallback);
}

buttonClickCallbackPrevious = function(event) { //Previous
    if (minNumber > 1) { //permition to shift max and min
        maxNumber--;
        minNumber--;
    }
    number--;
    if (number < 1) {number = 1;} //set min value
    showRows();
}

buttonClickCallbackNext = function(event) { //Next
    if (number  * rows + 1 <= maxRows) {
        number++;
        if (number > maxNumber) { //permition to shift max and min
            maxNumber++; 
            minNumber++;
        }
    }
    showRows();
}

myPaginationIcon[0].addEventListener('click', buttonClickCallbackPrevious); //Previous
myPaginationIcon[1].addEventListener('click', buttonClickCallbackNext); //Next