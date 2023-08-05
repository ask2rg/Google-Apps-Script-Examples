
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Create a custom menu item in the spreadsheet UI.
  ui.createMenu('Adv. Tools')
    .addItem('Export Column Frequency', 'exportColAsFeqDist')
    // .addSeparator()
    // .addSubMenu(ui.createMenu('Sub-menu')
      // .addItem('Second item', 'menuItem2'))
    .addToUi();
}


// Export selected range or column into the frequency distribution in the Google Sheets allows to quickly analyze and visualize the occurrence frequency of values in a selected range or column.
function exportColAsFeqDist() {
  // Get the values from the active range in the active sheet.
  let data = SpreadsheetApp.getActiveRange().getValues();
  let colLen = data[0].length;
  let col_range;

  if (colLen > 1) {
    // If there are multiple columns selected, concatenate each row's values with '{{|}}' separator.
    col_range = data.map((row) => row.join('{{|}}'));
  } else {
    // If there is only one column, flatten the data array.
    col_range = data.flat();
  }

  // Create an object to store the frequency distribution.
  let objData = {};
  
  // Calculate the frequency of each unique value in the column.
  col_range.forEach((item) => {
    if(objData.hasOwnProperty(item)){
      objData[item] += 1
    }else{
      objData[item] = 1
    }
  });

  // Create a new sheet in the active spreadsheet to store the frequency distribution.
  var newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
  
  // Convert the object data into an array for easier manipulation.
  let feqDist = Object.entries(objData);

  if (colLen > 1) {
    // If there were multiple columns, split the keys back into separate columns.
    feqDist = feqDist.map((row) => {
      let colsRow = row[0].split('{{|}}');
      colsRow.push(row[1]);
      return colsRow;
    });
  }

  // Set the calculated frequency distribution data to the new sheet.
  newSheet.getRange(1, 1, feqDist.length, feqDist[0].length).setValues(feqDist);
}
