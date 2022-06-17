const form = document.getElementById('form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const gender = document.getElementById('gender');


const email = document.getElementById('email');


form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

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
    return  /^\+?([8]{1})\)?[-. ]([8]{1})\)?[-. ]([0]{1})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(phone);
}
