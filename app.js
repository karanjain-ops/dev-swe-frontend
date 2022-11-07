const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".contain");

window.addEventListener("load", () => {
  var username = sessionStorage.getItem("username");
  if (username) {
    if (document.getElementById("NoEmergencies")) {
      fetchEmergenciesList();
    }
    console.log(sessionStorage.getItem("token"));
    console.log(username);
    document.getElementById('nav_sign').hidden = true;
    document.getElementById('nav_un').hidden = false;
    document.getElementById('us_name').innerHTML = username;
  }
  else {
    sessionStorage.clear();
  }
});
if (sign_up_btn) {
  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });
}

if (sign_in_btn) {
  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });
}
const firebaseConfig = {
  apiKey: "AIzaSyD4bX50s5gvY71LZCZHebqmGc_S-UQhT8A",
  authDomain: "devswemergencyresponse.firebaseapp.com",
  projectId: "devswemergencyresponse",
  storageBucket: "devswemergencyresponse.appspot.com",
  messagingSenderId: "498370827044",
  appId: "1:498370827044:web:474bbfdb8b3419a7a599b1",
  measurementId: "G-MK814HRKE9"
}


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
async function getMoreDetails() {
  try {
    const email = document.getElementById("sumail").value
    const password = document.getElementById("supassword").value
    const name = document.getElementById('nm').value;
    const contactNumber = document.getElementById('ph').value;
    const dateOfBirth = document.getElementById('dob').value;
    const address = document.getElementById('add').value;
    const bloodGroup = document.getElementById('bg').value;
    const promise = await auth.createUserWithEmailAndPassword(email, password)
    var token = ""
    await auth.currentUser.getIdToken(true).then((idToken) => {
      console.log(idToken)
      token = idToken
      sessionStorage.setItem("token", token);
    })
    const data = { name, contactNumber, dateOfBirth, address, bloodGroup }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token, 'Access-Control-Allow-Origin': '*' },
      mode: "cors",
      body: JSON.stringify(data)
    };
    await fetch(
      'https://dev-swe-sahayata.herokuapp.com/user', requestOptions)
      .then(response => {
        response.json()
          .then(data => {
            console.log(data)
            sessionStorage.setItem("username", data.name);
            document.getElementById('nav_sign').hidden = true;
            document.getElementById('nav_un').hidden = false;
            document.getElementById('us_name').innerHTML = data.name;
            window.location.href = "/emergency_contact.html";
          });
      })
  } catch (error) {
    console.error(error)
  }
}

const signIn = async () => {
  try {
    const email = document.getElementById("simail").value
    const password = document.getElementById("sipassword").value
    const promise = await firebase.auth().signInWithEmailAndPassword(email, password)
    var token = ""
    await auth.currentUser.getIdToken(true).then((idToken) => {
      token = idToken
      sessionStorage.setItem("token", token);
      console.log(idToken)
    })

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token, 'Access-Control-Allow-Origin': '*' },
      mode: "cors",
    };
    await fetch(
      'https://dev-swe-sahayata.herokuapp.com/user', requestOptions)
      .then(response => {
        response.json()
          .then(data => {
            console.log(data)
            activate_un(data);
            window.location.href = "/index.html";
          });
      })
  }
  catch (error) {
    console.error(error);
    if((error+"")=="FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."){
      alert("No such user exists!! Sign Up to Proceed.");
    }
  }
}

function activate_un(data) {
  const nav_un = document.getElementById('nav_un');
  const nav_sign = document.getElementById('nav_sign');
  const span_un = document.getElementById('us_name');
  nav_sign.hidden = true;
  nav_un.hidden = false;
  span_un.innerHTML = data[0].name;
  sessionStorage.setItem("username", data[0].name);
}

const getEmergencyContact = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const name = document.getElementById("enm").value
    const address = document.getElementById("eadd").value
    const contactNo = document.getElementById('eph').value;
    const data = { name, address, contactNo }
    console.log(data)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token, 'Access-Control-Allow-Origin': '*' },
      mode: "cors",
      body: JSON.stringify(data)
    };
    await fetch(
      'https://dev-swe-sahayata.herokuapp.com/emergencyContactInfo', requestOptions)
      .then(response => {
        response.json()
          .then(data => {
            console.log(data)
            window.location.href = "/index.html";
          });
      })
  }
  catch (error) {
    console.error(error);
  }
}


const resgisterCrime = async () => {
  try {
    document.getElementById("s2ta").value = "";
    sessionStorage.setItem("typeofhealthemergency", "");
    sessionStorage.setItem("typeofemergency", "POLICE");
    const token = sessionStorage.getItem("token");
    const crimeCategory = document.getElementById("typeOfCrime").value
    const victimName = document.getElementById("victimName").value
    const victimAge = parseInt(document.getElementById("victimAge").value);
    const data = { crimeCategory, victimName, victimAge }
    console.log(data)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token, 'Access-Control-Allow-Origin': '*' },
      mode: "cors",
      body: JSON.stringify(data)
    };
    console.log(requestOptions)
    await fetch(
      'https://dev-swe-sahayata.herokuapp.com/police', requestOptions)
      .then(response => {
        response.json()
          .then(data => {
            console.log(data)
          });
      })
  }
  catch (error) {
    console.error(error);
  }
}

const getlocation = () => {
  document.getElementById("currloc_div").style.display = "block";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPos, showErr);
  }
  else {
    alert("Sorry! your Browser does not support Geolocation API")
  }
}
//Showing Current Poistion on Google Map  
function showPos(position) {
  latt = position.coords.latitude;
  long = position.coords.longitude;
  const pos = latt + " " + long;
  sessionStorage.setItem("loc", pos);
  var lattlong = new google.maps.LatLng(latt, long);
  var myOptions = {
    center: lattlong,
    zoom: 15,
    mapTypeControl: true,
    navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
  }
  var maps = new google.maps.Map(document.getElementById("currloc1"), myOptions);
  var markers =
    new google.maps.Marker({ position: lattlong, map: maps, title: "You are here!" });
}

//Handling Error and Rejection  
function showErr(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation API.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("USer location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

async function saveLoc() {
  const pos = sessionStorage.getItem("loc");
  const data = { pos }
  console.log(data)
  // const requestOptions = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token, 'Access-Control-Allow-Origin': '*' },
  //   mode: "cors",
  //   body: JSON.stringify(data)
  // };
  // console.log(requestOptions)
  // try {
  //   await fetch(
  //     'https://dev-swe-sahayata.herokuapp.com/police', requestOptions)
  //     .then(response => {
  //       response.json()
  //         .then(data => {
  //           console.log(data)
  //         });
  //     })
  // }
  // catch (error) {
  //   console.error(error);
  // }
}

function selectSOS() {
  if (sessionStorage.getItem("token")) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPos, showErr);
    }
    else {
      alert("Sorry! your Browser does not support Geolocation API")
    }
    sessionStorage.setItem("typeofemergency", "SOS");
    sessionStorage.setItem("typeofhealthemergency", "");
    sendMessage();
  } else {
    window.location.href = "/signin.html"
  }
}

function selectFire() {
  if (sessionStorage.getItem("token")) {
    sessionStorage.setItem("typeofemergency", "FIRE");
    sessionStorage.setItem("typeofhealthemergency", "");
    document.getElementById("s2ta").value = "";
  } else {
    window.location.href = "/signin.html"
  }
}

function selectHealth() {
  if (sessionStorage.getItem("token")) {
    sessionStorage.setItem("typeofemergency", "MEDICAL");
    sessionStorage.setItem("typeofhealthemergency", "");
    document.getElementById("s2ta").value = "";
  } else {
    window.location.href = "/signin.html"
  }
}
function selectPolice() {
  if (!sessionStorage.getItem("token")) {
    window.location.href = "/signin.html"
  }

}
function setHealthEmergency() {
  if (sessionStorage.getItem("token")) {
    const tohe = document.getElementById("TypeofMedicalEmergency").value;
    sessionStorage.setItem("typeofhealthemergency", tohe);
    document.getElementById("s2ta").value = "";
  }
  else {
    window.location.href = "/signin.html"
  }
}

async function sendMessage() {
  try {
    const emergencyType = sessionStorage.getItem("typeofemergency");
    var emergencyMessage = " ";
    if (emergencyType != "SOS") {
      emergencyMessage = (document.getElementById("s2ta").value).split("\n").join(" ");
    }
    const token = sessionStorage.getItem("token");
    const location = sessionStorage.getItem("loc");
    const extraInformation = sessionStorage.getItem("typeofhealthemergency");
    const data = { emergencyMessage, location, extraInformation, emergencyType };
    console.log(data)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token, 'Access-Control-Allow-Origin': '*' },
      mode: "cors",
      body: JSON.stringify(data)
    };
    console.log(requestOptions)
    await fetch(
      'https://dev-swe-sahayata.herokuapp.com/messages', requestOptions)
      .then(response => {
        response.json()
          .then(data => {
            console.log(data)
          });
      })
  }
  catch (error) {
    console.error(error);
  }
}

function logout() {
  sessionStorage.clear();
  console.log("user loged out")
  window.location.href = "/signin.html"
}

async function fetchEmergenciesList() {
  try {
    document.getElementById("emergencyListBody").innerHTML = "";
    console.log("hi")
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      mode: "cors",
    };
    await fetch(
      'https://dev-swe-sahayata.herokuapp.com/priorityMessage', requestOptions)
      .then(response => {
        response.json()
          .then(data => {
            console.log(data)
            j = 0
            for (i = 0; i < data.length; i++) {
              if (data[i].user.name == sessionStorage.getItem("username")) {
                var row = "<tr><td>" + ++j + "</td><td>" + data[i].location + "</td><td>" + data[i].emergencyType + "</td><td>" + (data[i].extraInformation + " " + data[i].emergencyMessage + "</td><td>" + data[i].createdAt).substring(0, 20) + "</td>";
                if (data[i].notified == "FALSE") {
                  row += "<td>Yet To Notify</td>";
                } else {
                  row += "<td>Notified</td>"
                }
                row += "</tr>";
                document.getElementById("emergencyListBody").innerHTML += row;
              }
            }
            if (j == 0) {
              document.getElementById("NoEmergencies").innerHTML = "<div class=\"alert alert-info alert-dismissible fade show\" role=\"alert\" style=\"width:100%\"> No Ongoing Emergencies :) </div>";
            }
          });
      })
  }
  catch (error) {
    console.error(error);
  }
}