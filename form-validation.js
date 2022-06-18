const form = document.getElementById('form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const gender = document.getElementById('gender');
const dob = document.getElementById('birthday');
const city = document.getElementById('city');
const phone = document.getElementById('phone');
const email = document.getElementById('email');


form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
    addUser();
    getuserList();
});

function getName(){
    return userList.fullName;
}
function getGende(){
    return gender;
}
function getDOB(){
    return dob;
}
function getCity(){
    return city;
}
function getPhone(){
    return phone;
}
function getEmail(){
    return email;
}

function Send_Date(){
    
    var httpr = new XMLHttpRequest();
    httpr.open("POST", "get_data.php", true );
    httpr.setRequestHeader("Content-type", "application/x-www-form-url");
    httpr.onreadystatechange = function(){
        if (httpr.readyState == 4  &&  httpr.status == 200){
            document.getElementById("response").innerHTML = httpr.responseText;
        }
    }

    httpr.send("firstname= " + firstName +"&lastname" + lastName + "&gender= " +gender + "&date of birth=" +dob + "&city= " + city + "&phone= " +phone +"&email= "+email);

}

function checkInputs() {
	// trim to remove the whitespaces
	const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const phoneValue = phone.value.trim();
	const emailValue = email.value.trim();


	if(firstNameValue === '') {
		setErrorFor(firstName, 'First Name cannot be blank');
	} else if ( firstNameValue.length < 2  || firstNameValue.length > 50){
        setErrorFor(firstName , 'First Name must be greater than 1 character and less than 50 characters')
    } else {
		setSuccessFor(firstName);
	}
    if(lastNameValue === '') {
		setErrorFor(lasttName, 'Last Name cannot be blank');
	} else if ( lastNameValue.length < 2  || lastNameValue.length > 50){
        setErrorFor(lastName , 'First Name must be greater than 1 character and less than 50 characters')
    }else {
		setSuccessFor(lasttName);
	}

    const fullName = firstName + " " +lastName;

    if( gender === ''){
        setErrorFor( gender, 'Gender cannot be blank');
    } else{
        setSuccessFor(gender);
    }

    
    if( dob === ''){
        setErrorFor( dob, 'Date of birth cannot be blank');
    } else{
        setSuccessFor(dob);
    }

    if( phoneValue === ''){
        setErrorFor( phone, 'Phone number cannot be blank');
    } else if ( !isPhoneNumber (phoneValue)){
        setErrorFor(phone, 'Not a valid phone number');
    } else{
        setSuccessFor(phone);
    }

	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	

}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isPhoneNumber(phone){
    return  /^\(0?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);
}



  $(document).ready( function () {
    getUserList();
    document.getElementById('modalSubmit').addEventListener('click', modalSubmit);
  
    function modalSubmit (e) {
    
      if( checkInputs ){
        let newUser = {
            name: firstName + " " + lastName,
            gender: gender,
            dob: birthday,
            city: city,
            phone: phone,
            email: email 
         };
  
        //Add new user to localStorage. The localStorage key for all the user is userList'
        if(localStorage.getItem("userList") === null || localStorage.getItem("userList") === [] || localStorage.getItem("userList") === undefined ){
          let userList = [];
          userList.push(newUser);
          localStorage.setItem("userList", JSON.stringify(userList));
        } else {
          let userList = JSON.parse(localStorage.getItem("userList"));
          userList.push(newUser);
          localStorage.setItem("userList", JSON.stringify(userList));
        }
       } else{
         alert('All fields are required. Please check your entries again');
       }
      getUserList();
  
      
     e.preventDefault();
    }
  
  }); //DocumentBody end tag
  
  //get the data stored in the localStorage for display on load
  function getuserList() {
    if(localStorage.getItem("userList") === null){
      alert("Your dashboard is currently empty. Use the add button to add new users.");
      document.getElementById("search").disabled = true;
    } else {
      document.getElementById("search").disabled = false;
      let userList = JSON.parse(localStorage.getItem("userList"));
      let userDisplay = document.getElementById('userDisplay');
      //Display result
      userDisplay.innerHTML = '';
      for (let i = 0; i < userList.length; i++){
        
        let firstName = userList[i].firstName;
        let lastName = userList[i].lastName;
        let gender = userList[i].gender;
        let dob = userList[i].birthday;
        let city = userList[i].city;
        let phone = userList[i].phone;
        let email = userList[i].email; 
       
  
        userDisplay.innerHTML += '<li class="list-group-item"><strong>'+firstName+'</strong><p>'+lastName+'</p><p>'+gender+'</p><p><a' +
            ' href="#" onclick="editUser(\''+dob+'\')" data-toggle="modal" data-target="#addNewUserModal">' +
            '<i class="fa fa-edit green-text darken-2 "></i>&nbsp;Edit</a> &nbsp;&nbsp; ' +
            '<a href="#" id="deleteId" onclick="deleteUser(\''+phone+'\')"><i class="fa fa-trash' +
            ' red-text' +
            ' darken-2"></i>&nbsp;' +
            ' Delete</a>' +
            ' </p>' +
            '</li>';
        }
      }
    }
  
  
  // deleting the main bookmark.
  function deleteUser(id) {
    let userList = JSON.parse(localStorage.getItem("userList"));
    for(let i = 0; i < userList.length; i++){
      if (userList[i].id === id) {
        userList.splice(i,1);
        //console.log(result);
      }
    }
    localStorage.setItem("userList", JSON.stringify(userList)); //reset the values in the local storage
    getUserList(); // to quickly display what is remaining from local storage.
  }
  
  // Editing a user
  function editUser(id) {
    "use strict";
    document.getElementById('modalSubmit').style.display = "none";
    document.getElementById("addnewUserModalLabel").textContent = "Edit User";
  
    let tempId = id;
    let parentDiv = document.getElementById('modalFooter');
    let userList = JSON.parse(localStorage.getItem("userList"));
  
  
    if (parentDiv.contains(document.getElementById("editButton"))) {
      document.getElementById('editButton').disabled = false;
    } else {
      let editButton = document.createElement('button');
      editButton.id = "editButton";
      editButton.className = "fa fa-hdd-o btn btn-outline-primary btn-sm m-2";
      editButton.textContent = " Save data";
      parentDiv.appendChild(editButton);
    }
    for (let i = 0; i < userList.length; i++) {
      
        firstName = userList[i].firstName;
        lastName = userList[i].lastName;
        gender = userList[i].gender;
        dob = userList[i].birthday;
        city = userList[i].city;
        phone = userList[i].phone;
        email = userList[i].email; 
      
    }
  
    document.getElementById("editButton").addEventListener("click", function () {
      addUser();
      let userList = JSON.parse(localStorage.getItem("userList"));
      for(let i = 0; i < userList.length; i++){
        if(userList[i].id === tempId){
          userList.splice(i,1);
        }
      }
      localStorage.setItem("userList", JSON.stringify(userList));
      getUserList();

      document.getElementById("editButton").style.display = "none";
  
      $(".addNewUser").on('click');
  
    });
  
  }
  
  
  
  
  function addUser() {
    

    if ( checkInputs )  {
      let newUser = {
        name: firstName + " " + lastName,
        gender: gender,
        dob: birthday,
        city: city,
        phone: phone,
        email: email
      };

      if (localStorage.getItem("userList") === null || localStorage.getItem("userList") === [] || localStorage.getItem("userList") === undefined) {
        let userList = [];
        userList.push(newUser);
        localStorage.setItem("userList", JSON.stringify(userList));
      } else {
        let userList = JSON.parse(localStorage.getItem("userList"));
        userList.push(newUser);
        localStorage.setItem("userList", JSON.stringify(userList));
      }
    }
  }
  



