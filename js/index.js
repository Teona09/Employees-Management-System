function addTableRow() {
  // get table by id
  // create a new row and its cells
  // get values from input
  // set cell's values
  var table = document.getElementById("employees-table");
  newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell2 = newRow.insertCell(1);
  cell3 = newRow.insertCell(2);
  cell4 = newRow.insertCell(3);
  cell5 = newRow.insertCell(4);
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;
  email = document.getElementById("email").value;
  gender = document.getElementById("gender").value;
  birthdate = document.getElementById("birthdate").value;

  cell1.innerHTML = fname;
  cell2.innerHTML = lname;
  cell3.innerHTML = email;
  cell4.innerHTML = gender;
  cell5.innerHTML = birthdate;
  selectedRowToInput();
}

function selectedRowToInput(){
    var table = document.getElementById("employees-table");
    for (var i = 1; i < table.rows.length; i++) {
      table.rows[i].onclick = function () {
        // get the selected row index
        var rIndex = this.rowIndex;
        document.getElementById("fname").value = this.cells[0].innerHTML;
        document.getElementById("lname").value = this.cells[1].innerHTML;
        document.getElementById("email").value = this.cells[2].innerHTML;
        document.getElementById("gender").value = this.cells[3].innerHTML;
        document.getElementById("birthdate").value = this.cells[4].innerHTML;
      };
    }
}

selectedRowToInput();