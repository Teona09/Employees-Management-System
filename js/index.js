/*----------------- Firebase configuration ---------------------*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiwinIJm4D2EPW_Tszx3DiupVbJtt_N7M",
  authDomain: "employees-maagement-system.firebaseapp.com",
  projectId: "employees-maagement-system",
  storageBucket: "employees-maagement-system.appspot.com",
  messagingSenderId: "7399188677",
  appId: "1:7399188677:web:53f94e250a4c3b503ba8ac",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
/*--------------------------------------------------------------*/

// Global variables
var rIndex,
  table = document.getElementById("employees-table");
var lastMemberId = 0;

// getting data
async function getAllEmployees() {
  clearTable();
  const employeesSnapshot = await getDocs(collection(db, "employeesData"));
  loadDataFromFirebase(employeesSnapshot);
}

getAllEmployees();
// show data in table format
function loadDataFromFirebase(employeesSnapshot) {
  var j = 1;
  employeesSnapshot.forEach((doc) => {
    var row = table.insertRow(j);
    var id = doc.id;
    row.id = id + "row";
    var data = doc.data();
    var cell1 = row.insertCell(0);
    cell1.innerHTML = `<img src=${data["photoSrc"]} alt="profile-picture" height=40>`;
    var cell2 = row.insertCell(1);
    cell2.innerHTML = data["fname"];
    var cell3 = row.insertCell(2);
    cell3.innerHTML = data["lname"];
    var cell4 = row.insertCell(3);
    cell4.innerHTML = data["email"];
    var cell5 = row.insertCell(4);
    cell5.innerHTML = data["gender"];
    var cell6 = row.insertCell(5);
    var birthdate = moment(data["birthdate"].toDate());
    cell6.innerHTML = birthdate.format("DD MMM YYYY");
    var cell7 = row.insertCell(6);
    cell7.innerHTML = `<button class="delete-icon"><i class="fas fa-times fa-2x"></i> </button>`;
    var toBeDeleted = document.getElementsByClassName("delete-icon");
    var currentId = id;
    toBeDeleted[row.rowIndex - 1].addEventListener("click", async function () {
      DeleteEmployeeFromTable(row, currentId);
    });
    if (id > lastMemberId) {
      lastMemberId = id;
    }
    j++;
  });
}

function DeleteEmployeeFromDatabase(currentId) {
  deleteDoc(doc(db, "employeesData", `${currentId}`));
}

function DeleteEmployeeFromTable(row, currentId) {
  var id = row.rowIndex;
  table.deleteRow(id);
  DeleteEmployeeFromDatabase(currentId);
}

function checkEmptyInput(fname, lname, email, gender, birthdate) {
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
    errors += "Age sould be above 16.\n";
  }
  if (errors.length === 0) return true;
  alert(errors);
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

function showMyImage() {
  var imageFile = document.getElementById("photo").files[0];
  console.log(imageFile);
  var img = document.getElementById("imagePlaceholder");
  if (imageFile!=null) {
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

function clearField() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("birthdate").value = "";
  document.getElementById("photo").value = "";
  document.getElementById("imagePlaceholder").src = "./images/person-icon.png";
}

document
  .getElementById("addWithModal")
  .addEventListener("click", async function () {
    openAddModal();
  });

function openAddModal() {
  var modalAdd = document.getElementById("myModal");
  var addBtn = document.getElementById("addWithModal");
  var span = document.getElementsByClassName("close")[0];
  modalAdd.style.display = "block";
  span.onclick = function () {
    modalAdd.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modalAdd) {
      modalAdd.style.display = "none";
    }
  };
}

document.getElementById("photo").addEventListener("click", async function (){
  showMyImage();
});

document.getElementById("submit").addEventListener("click", async function (){
  addEmployee();
});

function addEmployee() {
  var photoSrc = document.getElementById("imagePlaceholder").src;
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var email = document.getElementById("email").value;
  var gender = document.getElementById("gender").value;
  var birthdate = document.getElementById("birthdate").value;
  console.log("-- sunt luate datele din modal");
  if (checkEmptyInput(fname,lname,email,gender,birthdate) == true) {
    console.log("--sunt verificate datele");
    lastMemberId++;
    var formatedBirthdate = new Date(birthdate);
    var collectionRef = collection(db, "employeesData");
    setDoc(doc(collectionRef, `${lastMemberId}`),{
      fname: fname,
      lname: lname,
      email: email,
      gender: gender,
      birthdate: Timestamp.fromDate(formatedBirthdate),
      photoSrc: photoSrc
    });
    console.log("se introduc datele in db");
    getAllEmployees();
  }
  clearField();
}

function clearTable() {
  for(var i = table.rows.length - 1; i>0; i--){
    table.deleteRow(i);
  }
}