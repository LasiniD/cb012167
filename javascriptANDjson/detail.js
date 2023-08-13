
// //creating constants for interactive elements
// const error1=document.getElementById("error1");
// const btnContinue=document.getElementById("btndetails");
// const form=document.getElementById("detailsForm");
// const fullname=document.getElementById("fullname");
// const mobilenumber=document.getElementById("mobile");
// const email=document.getElementsByClassName("email");

// //----Details form validation----------

// //add event listener
// btnContinue.addEventListener("click",validateInputs);


// //functions
// function validateInputs(){
//     console.log("hello");
//     if(fullname==""){
//         error1.innerHTML=("error");
//     }
// }


//constants
const btnContinue=document.getElementById('btndetails');
const form = document.getElementById('detailsForm');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const cemail = document.getElementById('cemail');
const gender = document.getElementById('gender');
const mobile = document.getElementById('mobile');
const txtPickDate=document.getElementById("pickedDate");
const summaryTable = document.getElementById("summaryTable");

//event listeners
window.addEventListener("load",()=>{
    init();
    summaryTable.innerHTML = localStorage.getItem("stable")
});

fullname.addEventListener('change', () => {
    validateFullName();
    validateInputs();
});
email.addEventListener('change', () => {
    validateEmail();
    validateInputs();
});
cemail.addEventListener('change', () => {
    validateCEmail();
    validateInputs();
});
mobile.addEventListener('change', () => {
    validateMobile();
    validateInputs();
});


//functions
function init(){
     
}
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateFullName=()=>{
    const fullnameValue = fullname.value.trim();
    const fullnameType = /^[A-Za-z ]+$/;

    if(fullnameValue === '') {
        setError(fullname, 'Full name is required');
    }
    else if(!fullnameType.test(fullnameValue)){
        setError(fullname,'Invalid Full name');
    } 
    else {
        setSuccess(fullname);
    }
}

const validateEmail=()=>{
    const emailValue = email.value.trim();
    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }
}

const validateCEmail=()=>{
    const emailValue2 = cemail.value.trim();
    const emailValue = email.value.trim();

    if(emailValue2 === '') {
        setError(cemail, 'Email is required');
    } else if (!isValidEmail(emailValue2)) {
        setError(cemail, 'Provide a valid email address');
    } else if(emailValue2 !== emailValue){
        setError(cemail,'The confirmation email is not equal to the email');
    } 
    else {
        setSuccess(cemail);
    }
}

const validateMobile=()=>{
    const mobileValue = mobile.value.trim();
    const mobileType =/^[0-9]+$/;

    if(mobileValue === '') {
        setError(mobile, 'Mobile number is required');
    } else if (mobileValue.length <9 || mobileValue.length > 15  ) {
        setError(mobile, 'Mobile number must have 10 characters');
    } else if(!mobileType.test(mobileValue)){
        setError(mobile, 'Mobile number is invalid');
    }
    else {
        setSuccess(mobile);
    }
}

const validateInputs = () => {
    const validForm=(
        fullname.parentElement.classList.contains('success')&&
        email.parentElement.classList.contains('success')&&

        cemail.parentElement.classList.contains('success')&&

        mobile.parentElement.classList.contains('success')
    );
    btnContinue.disabled=!validForm;

};

function updateSelectedDialCode() {
    // Find the selected country element with class "iti__active"
    const selectedCountryElement = document.querySelector('.iti__active');

    if (selectedCountryElement) {
        // Extract the dial code from the selected element
        const dialCodeElement = selectedCountryElement.querySelector('.iti__dial-code');
        const selectedDialCode = dialCodeElement ? dialCodeElement.textContent : null;

        // Display the selected dial code (without plus symbol) in the input
        const inputElement = document.getElementById('mobile');
        if (inputElement) {
            inputElement.value = selectedDialCode.replace('+', ''); // Remove plus symbol and set dial code as the new input value
        }
    }
}
updateSelectedDialCode();

// Set up an event listener for changes in the selected country
document.addEventListener('click', function(event) {
    const targetElement = event.target;

    // Check if the clicked element is part of the country list
    if (targetElement.closest('.iti__country')) {
        // Clear the input field and update the selected dial code
        const inputElement = document.getElementById('mobile');
        if (inputElement) {
            inputElement.value = ''; // Clear the input field
            setTimeout(updateSelectedDialCode, 100); // Update the selected dial code after clearing
        }
    }
});

btnContinue.addEventListener("click",(e)=>{
    e.preventDefault();
    localStorage.setItem("Full name", fullname.value);
    localStorage.setItem("Email", email.value);
    localStorage.setItem("Mobile", mobile.value);
    localStorage.setItem("Gender",gender.value);
    window.location.href=`payment.html`;

    let summaryTable = document.getElementById("summaryTable");
    let rows = summaryTable.getElementsByTagName("tr");
    let tbody = document.createElement("tbody");
    
    for (let i = 3; i < rows.length; i++) { // Start from the 4th row
      let newRow = document.createElement("tr");
      newRow.innerHTML = rows[i].innerHTML;
      tbody.appendChild(newRow);
    }
        
    localStorage.setItem("newsumtable", tbody.innerHTML);
});

