/*===== SHOW NAVBAR  =====*/ 
const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)

    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
            // show navbar
            nav.classList.toggle('showa')
            // change icon
            toggle.classList.toggle('bx-x')
            // add padding to body
            bodypd.classList.toggle('body-pd')
            // add padding to header
            headerpd.classList.toggle('body-pd')
        })
    }
}

window.addEventListener("DOMContentLoaded", ()=>{
        fetchUsers();
        fetchEmergencies();
        sessionStorage.clear()
});

showNavbar('header-toggle','nav-bar','body-pd','header')

const fetchEmergencies = async() =>{
    document.getElementById("emergencyListBody").innerHTML="";
    console.log("hi")
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' },
        mode: "cors",
      };
      try {
        await fetch(
          'https://dev-swe-sahayata.herokuapp.com/priorityMessage', requestOptions)
          .then(response => {
            response.json()
              .then(data => {
                console.log(data)
                for(i=0;i<data.length;i++){
                    var row="<tr><td>"+data[i].id+"</td><td>"+data[i].userId+"</td><td>"+data[i].location+"</td><td>"+data[i].user.contactNumber+"\n"+data[i].user.email+"</td><td>"+data[i].emergencyType+"</td><td>"+data[i].createdAt+"</td>";
                    if(data[i].notified=="FALSE"){
                        row+="<td><a href=\"#\" data-toggle=\"modal\" data-target=\"#emergencyStatus\" class=\"view\"><i class=\"material-icons\">&#xE5C8;</i></a></td>";
                    }else{
                        row+="<td>Notified</td>"
                    }
                    row+="<td><a href=\"#\" data-toggle=\"modal\" data-target=\"#details\" class=\"view\" title=\"View Details\"><i class=\"material-icons\">&#xE5C8;</i></a></td></tr>";
                    document.getElementById("emergencyMessage").innerHTML=(data[i].extraInformation!=null)?data[i].extraInformation:""+"\n"+(data[i].emergncyMessage!=null)?data[i].emergncyMessage:"";
                    document.getElementById("emergencyListBody").innerHTML+=row;
                    document.getElementById("messageID").value=data[i].id;
                  }
                  if(data.length==0){
                    document.getElementById("NoEmergencies").innerHTML="<div class=\"alert alert-info alert-dismissible fade show\" role=\"alert\" style=\"width:100%\"> No Emergencies Yet :) </div>";
                  }
              });
          })
      }
      catch (error) {
        console.error(error);
      } 
}

const fetchUsers = async() =>{
    console.log("hi")
    document.getElementById("userBody").innerHTML="";
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' },
        mode: "cors",
      };
      try {
        await fetch(
          'https://dev-swe-sahayata.herokuapp.com/users', requestOptions)
          .then(response => {
            response.json()
              .then(data => {
                console.log(data)
                for(i=0;i<data.length;i++){
                    var row="<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].address+"</td><td>"+data[i].dateOfBirth+"</td><td>"+data[i].email+"</td><td>"+data[i].contactNumber+"</td></tr>";
                    document.getElementById("userBody").innerHTML+=row;
                  }
                  if(data.length==0){
                    document.getElementById("NoUser").innerHTML="<div class=\"alert alert-info alert-dismissible fade show\" role=\"alert\" style=\"width:100%\"> No Users Yet :( </div>";
                  }
              });
          })
      }
      catch (error) {
        console.error(error);
      } 
}

async function setStatus(){
    const id = document.getElementById("messageID").value;
    const data = {id}
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      mode: "cors",
      body: JSON.stringify(data)
    };
    try {
      await fetch(
        'https://dev-swe-sahayata.herokuapp.com/priorityMessage', requestOptions)
        .then(response => {
          response.json()
            .then(data => {
              console.log(data)
              fetchEmergencies()
            });
        })
    }
    catch (error) {
      console.error(error);
    }
}

function login(){
    const username=document.getElementById('username').value;
    const password=document.getElementById('password').value;
    if(username=="admin" && password=="admin"){
        window.location.href="./index.html";
    }
}
