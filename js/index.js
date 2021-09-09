/*----------------- Firebase configuration ---------------------*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js"

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiwinIJm4D2EPW_Tszx3DiupVbJtt_N7M",
  authDomain: "employees-maagement-system.firebaseapp.com",
  projectId: "employees-maagement-system",
  storageBucket: "employees-maagement-system.appspot.com",
  messagingSenderId: "7399188677",
  appId: "1:7399188677:web:53f94e250a4c3b503ba8ac"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
/*--------------------------------------------------------------*/

// Global variables
var rIndex,
  table = document.getElementById("employees-table");

async function getAllEmployees() {
  //const employeesCollection = collection(db, "employeesData");
  //const spanshot = await getDocs(employeesCollection);
  const employeesSpanshot = await getDocs(collection(db,"employeesData"));
  loadDataFromFirebase(employeesSpanshot);
  console.log("-> function getAllEmployees");
}

getAllEmployees();

function loadDataFromFirebase(employeesSpanshot) {
  var j=1;
  employeesSpanshot.forEach((doc) => {
    var row= table.insertRow(j);
    var id = doc.id;
    row.id = id+"row";
    var data = doc.data();
    var cell1 = row.insertCell(0);
    cell1.innerHTML = `<img src=${data["photoSrc"]} alt="profile-picture" height=40>`
    var cell2 = row.insertCell(1);
    cell2.innerHTML = data["fname"];
    var cell3 = row.insertCell(2);
    cell3.innerHTML = data["lname"];
    var cell4 = row.insertCell(3);
    cell4.innerHTML = data["email"];
    var cell5 = row.insertCell(4);
    cell5.innerHTML = data["gender"];
    var cell6 = row.insertCell(5);
    var birthdate = moment(data["birthdate"]);
    cell6.innerHTML = birthdate.format("DD MMM YYYY");
    var cell7 = row.insertCell(6);
    cell7.innerHTML = `<button onclick="deleteSelectedRow(this);" class="delete-icon"><i class="fas fa-times fa-2x"></i> </button>`;
    j++;
  }); 

  console.log("-> function loadDataFromFirebase");
}

function checkEmptyInput() {
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;
  email = document.getElementById("email").value;
  gender = document.getElementById("gender").value;
  birthdate = document.getElementById("birthdate").value;
  var errors = "";
  if (fname === "") {
    errors += "First Name Can't Be Empty.\n";
    isEmpty = true;
  }
  if (lname === "") {
    erorrs += "Last Name Can't Be Empty.\n";
    isEmpty = true;
  } 
  if (email === "") {
    errors += "Email Can't Be Empty.\n";
    isEmpty = true;
  } else if (!validateEmail(email)) {
    errors += "Email is not valid\n";
    isEmpty = true;
  }
  if (gender === "") {
    errors += "Gender Can't Be Empty.\n";
    isEmpty = true;
  }
  if (birthdate === "") {
    errors += "Birthdate Can't Be Empty.\n";
    isEmpty = true;
  } else if (calculateAge(birthdate) < 16) {
    errors +="Age sould be above 16.\n";
  }
  alert(errors);
  if (errors === "") 
    return true;
  return false;
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

function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
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

    photoSrc = document.getElementById("imagePlaceholder").src;
    photoSrc.replace(",", "\\\,");
    console.log(photoSrc);
    fname = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;
    email = document.getElementById("email").value;
    gender = document.getElementById("gender").value;
    birthdate = document.getElementById("birthdate").value;
    var formatedBirthdate = moment(document.getElementById("birthdate").value);

    actions = `<button onclick="deleteSelectedRow(this);" class="delete-icon"><i class="fas fa-times fa-2x"></i> </button>`;

    arrayEmployee = [];
    arrayEmployee[0] = photoSrc;
    arrayEmployee[1] = fname;
    arrayEmployee[2] = lname;
    arrayEmployee[3] = email;
    arrayEmployee[4] = gender;
    arrayEmployee[5] = formatedBirthdate.format("DD MMM YYYY");
    arrayEmployee[6] = actions;
    localStorage.setItem(`${email}`,arrayEmployee);

    archive = localStorage.getItem(`${email}`);
    arrayEmployee = archive.split(",");
    cell1.innerHTML = `<img src=${arrayEmployee[0]+","+arrayEmployee[1]} alt="profile-picture" height=40>`;
    cell2.innerHTML = arrayEmployee[2];
    cell3.innerHTML = arrayEmployee[3];
    cell4.innerHTML = arrayEmployee[4];
    cell5.innerHTML = arrayEmployee[5];
    cell6.innerHTML = arrayEmployee[6];
    cell7.innerHTML = arrayEmployee[7];

    imageSrc="";
    clearField();
  }
}

function showMyImage(fileInput) {
  var imageFile = fileInput.files[0];
  var img = document.getElementById("imagePlaceholder");
  var imageType = /image.*/;
  if (imageFile.type.match(imageType)) {
    img.file = imageFile;

    var reader = new FileReader();
    reader.onload = (function (img) {
      return function (e) {
        img.src = e.target.result;
      };
    })(img);
    reader.readAsDataURL(imageFile);
  }
}

function deleteSelectedRow(employee) {
  var result = confirm("Are you sure you want to delete this row?");
  if (result) {
      var e=employee.parentNode.parentNode;
      e.parentNode.removeChild(e);
  }
}

function clearField() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("birthdate").value = "";
  document.getElementById("photo").value = "";
  document.getElementById("imagePlaceholder").src = "./images/person-icon.png";
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