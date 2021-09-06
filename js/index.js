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
    isEmpty = true;
  } else if (birthdate === "") {
    alert("Birthdate Can't Be Empty.");
    isEmpty = true;
  } else if (calculateAge(birthdate) < 16) {
    alert("Age sould be above 16.");
    isEmpty = true;
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
    cell6 = newRow.insertCell(5);
    cell7 = newRow.insertCell(6);
    var photo = null;
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      preview.src = reader.result;
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
      photo = preview.src;
    }

    if(photo==null){
      photo = "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png";
    }

    fname = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;
    email = document.getElementById("email").value;
    gender = document.getElementById("gender").value;
    birthdate = document.getElementById("birthdate").value;
    var formatedBirthdate = moment(document.getElementById("birthdate").value);
    actions = `<button onclick="editTableRow();" class="edit-icon"> <i class="fas fa-edit fa-2x"></i></button>
              <button onclick="deleteSelectedRow();" class="delete-icon"><i class="fas fa-times fa-2x"></i> </button>`;

    cell1.innerHTML = `<img src="${photo}" alt="profile-picture" height=40>`;
    cell2.innerHTML = fname;
    cell3.innerHTML = lname;
    cell4.innerHTML = email;
    cell5.innerHTML = gender;
    cell6.innerHTML = formatedBirthdate.format("DD MMM YYYY");
    cell7.innerHTML = actions;
    clearField();
  }
}

function selectedRowToInput() {
  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function () {
      // get the selected row index
      rIndex = this.rowIndex;
      document.getElementById("photo").value = this.cells[0].innerHTML;
      document.getElementById("fname").value = this.cells[1].innerHTML;
      document.getElementById("lname").value = this.cells[2].innerHTML;
      document.getElementById("email").value = this.cells[3].innerHTML;
      document.getElementById("gender").value = this.cells[4].innerHTML;
      var formatedBirthdate = moment(this.cells[5].innerHTML);
      document.getElementById("birthdate").value = formatedBirthdate.format("YYYY-MM-DD");
    };
  }
}

function editTableRow() {
  selectedRowToInput();
  photo = document.getElementById("photo").value;
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;
  email = document.getElementById("email").value;
  gender = document.getElementById("gender").value;
  birthdate = document.getElementById("birthdate").value;
  if (!checkEmptyInput()) {
    var currentRow = table.rows[rIndex];
    currentRow.cells[0].innerHTML = photo;
    currentRow.cells[1].innerHTML = fname;
    currentRow.cells[2].innerHTML = lname;
    currentRow.cells[3].innerHTML = email;
    currentRow.cells[4].innerHTML = gender;
    currentRow.cells[5].innerHTML = birthdate;
  }
}

function deleteSelectedRow() {
  selectedRowToInput();
  if (typeof rIndex == "number") {
    table.deleteRow(rIndex);
    clearField();
  }
}

function clearField(){
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("birthdate").value = "";
}

/* functions for modal window add*/
// Get the modal
var modalAdd = document.getElementById("myModal");

// Get the button that opens the modal
var addBtn = document.getElementById("addWithModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
addBtn.onclick = function() {
  modalAdd.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalAdd.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalAdd) {
    modalAdd.style.display = "none";
  }
}