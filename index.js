/*
    File: index.js
    GUI Assignment: Creating an Interactive Dynamic Table
    Graham Laroche, graham_laroche@student.uml.edu
    6/2/2024
    A script that uses a form to generate a multiplication table.
*/

const formError = { // Specifies which form error has occured
    NO_INPUT: 0,
    NOT_NUMBER: 1,
    NOT_INTEGER: 2,
    WRONG_ORDER: 3,
    OUTSIDE_RANGE: 4,
    TOO_BIG: 5,
    ERROR_COUNT: 6
}

// Either creates a table with valid input or displays an error with invalid input
function validateForm() {
    const MAX_RANGE = 100;
    const MAX_VALUE = 1e+15;

    let errors = [false, false, false, false, false, false]; // An array of booleans that describe which error(s), if any have occured
    let valid = true; // A bool that determines whether or not the form will submit
    let minCol = document.getElementById('minCol').value;
    let maxCol = document.getElementById('maxCol').value;
    let minRow = document.getElementById('minRow').value;
    let maxRow = document.getElementById('maxRow').value;

    if ( minCol == '' || maxCol == '' || 
         minRow == '' || maxRow == '') {
        errors[formError.NO_INPUT] = true;
    }

    minCol = Number(minCol);
    maxCol = Number(maxCol);
    minRow = Number(minRow);
    maxRow = Number(maxRow);

    if( isNaN(minCol) || isNaN(maxCol) ||
        isNaN(minRow) || isNaN(maxRow)) {
        errors[formError.NOT_NUMBER] = true;
    }
    if( !Number.isInteger(minCol) || !Number.isInteger(maxCol) ||
        !Number.isInteger(minRow) || !Number.isInteger(maxRow) ) {
        errors[formError.NOT_INTEGER] = true;
    }
    if (maxCol < minCol || maxRow < minRow) {
        errors[formError.WRONG_ORDER] = true;
    }
    if (maxCol - minCol > MAX_RANGE || maxRow - minRow > MAX_RANGE) {
        errors[formError.OUTSIDE_RANGE] = true;
    }
    if (minCol > MAX_VALUE || minCol < -MAX_VALUE ||
        maxCol > MAX_VALUE || maxCol < -MAX_VALUE ||
        minRow > MAX_VALUE || minRow < -MAX_VALUE ||
        maxRow > MAX_VALUE || maxRow < -MAX_VALUE
    ) {
        errors[formError.TOO_BIG] = true;
    }

    let i; //Used for iteration of the following for loop
    let errorString = ''; // The text to be displayed upon encountering an input error 
    for( i = 0; i <  formError.ERROR_COUNT; i+=1){
        if (errors[i] == true) {
            valid = false;
            errorString += createErrorString(i);
            errorString += '\n\n'
        }
    }

    if(valid){
        createTable(minCol, maxCol, minRow, maxRow);
    }
    else{
        document.getElementById("errorDisplay").innerText = errorString;
    }
}

/*
    Returns an appropiate string for the given error
    @param  errorId  Number  The ID of the error, associated with formError
    @return          String  The error message to be returned
*/
function createErrorString(errorId) {
    switch(errorId) {
        case formError.NO_INPUT:
            return 'No text input may be blank!'
        case formError.NOT_NUMBER:
            return 'Every text input must contain a number!'
        case formError.NOT_INTEGER:
            return 'Every text input must contain an integer!'
        case formError.WRONG_ORDER:
            return 'A minimum value may not be greater than the maximum value!'
        case formError.OUTSIDE_RANGE:
            return 'There cannot be more than 100 rows or 100 collumns!'
        case formError.TOO_BIG:
            return 'Numbers cannot be larger than 1 quadrillion or smaller than negative 1 quadrillion!'
    }
}

/*
    Adds rows and collumns to an HTML table element.
    @param minCol   Number   The minimum column value
    @param maxCol   Number   The maximum column value
    @param minRow   Number   The minimum row value
    @param maxRow   Number   The maximum row value
*/
function createTable(minCol, maxCol, minRow, maxRow) {
    clearTable();
    let i, j; // Used for iterating the following for loops

    appendRow();
    appendColumn(0, null, 'td')
    for (i = minCol; i <= maxCol; i+=1){
        appendColumn(0, i, 'th');
    }

    for (i = minRow; i <= maxRow; i+=1) {
        appendRow();
        appendColumn(i-minRow+1, i, 'th')
        for (j = minCol; j <= maxCol; j+=1) {
            appendColumn(i-minRow+1, i*j, 'td');
        }
    }
}

// Removes all rows from the table
function clearTable() {
    let table = document.getElementById('multTable');
    let rowCount = table.rows.length;

    for(i = 0; i < rowCount; i+=1) {
        table.deleteRow(0);
    }
}

//  Appends a <tr> tag to the multiplication table.
function appendRow() {
    let row = document.createElement("tr"); // Create table row element.
    document.getElementById("multTable").appendChild(row);
}

/*
    Appends a <td> or a <th> tag to a <tr> element.
    @param rowIndex   Number   Specifies which row is being appended to
    @param value      Number   This is what is displayed in the table data element
    @param cellType   String   The name of the html element being created
*/
function appendColumn(rowIndex, value, cellType) {
    let col = document.createElement(cellType); // Create table data element.
    col.textContent = value;
    document.getElementsByTagName("tr")[rowIndex].appendChild(col);
}

