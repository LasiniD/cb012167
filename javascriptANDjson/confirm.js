//constants
const txtPickDate=document.getElementById("pickedDate");
const txtNameValue = document.getElementById("nameValue");
const txtTimeValue = document.getElementById("timeValue");
const txtDurationValue = document.getElementById("durationValue");
const txtMobileValue = document.getElementById("mobileValue");
const txtEmailValue = document.getElementById("emailValue");
const txtGenderValue = document.getElementById("genderValue");




//event listeners
window.addEventListener("load",init);


//functions
function init(){
    txtPickDate.innerText = localStorage.getItem("Date");
    txtNameValue.innerText = localStorage.getItem("Full name");
    txtTimeValue.innerText = localStorage.getItem("Time");
    txtDurationValue.innerText = localStorage.getItem("Duration");
    txtMobileValue.innerText = localStorage.getItem("Mobile");
    txtEmailValue.innerText=localStorage.getItem("Email");
    txtGenderValue.innerText= localStorage.getItem("Gender");

    let summaryTable = document.getElementById("summaryTableConfirm");
    const storedTableContent = localStorage.getItem("newsumtable");
    summaryTable.innerHTML += storedTableContent;
};