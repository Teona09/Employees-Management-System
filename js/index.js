var rIndex,
table = document.getElementById("employees-table");

function checkEmptyInput() {
  var isEmpty = false;
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;
  email = document.getElementById("email").value;
  gender = document.getElementById("gender").value;
  birthdate = document.getElementById("birthdate").value;

  if (fname === "") {
    alert("First Name Can't Be Empty.");
    isEmpty = true;
  } else if (lname === "") {
    alert("Last Name Can't Be Empty.");
    isEmpty = true;
  } else if (email === "") {
    alert("Email Can't Be Empty.");
    isEmpty = true;
  } else if (gender === "") {
    alert("Gender Can't Be Empty.");
} else if (birthdate === "") {
    alert("Birthdate Can't Be Empty.");
  } else if (calculateAge(birthdate) < 16){
       alert("Age sould be above 16.");
  }
  return isEmpty;
}

function calculateAge(dob) {
  var today = new Date();
  var birthdate = new Date(dob);
  var age = today.getFullYear() - birthdate.getFullYear();
  var month = today.getMonth() - birthdate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
}

function addTableRow() {
  // create a new row and its cells
  // get values from input
  // set cell's values
  if (!checkEmptyInput()) {
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
}

function selectedRowToInput() {
  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function () {
      // get the selected row index
      rIndex = this.rowIndex;
      document.getElementById("fname").value = this.cells[0].innerHTML;
      document.getElementById("lname").value = this.cells[1].innerHTML;
      document.getElementById("email").value = this.cells[2].innerHTML;
      document.getElementById("gender").value = this.cells[3].innerHTML;
      document.getElementById("birthdate").value = this.cells[4].innerHTML;
    };
  }
}

selectedRowToInput();

function editTableRow() {
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;
  email = document.getElementById("email").value;
  gender = document.getElementById("gender").value;
  birthdate = document.getElementById("birthdate").value;
  if (!checkEmptyInput()) {
    var currentRow = table.rows[rIndex];
    currentRow.cells[0].innerHTML = fname;
    currentRow.cells[1].innerHTML = lname;
    currentRow.cells[2].innerHTML = email;
    currentRow.cells[3].innerHTML = gender;
    currentRow.cells[4].innerHTML = birthdate;
  }
}

function deleteSelectedRow() {
  table.deleteRow(rIndex);
  // clear input text
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("birthdate").value = "";
}
