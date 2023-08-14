//constants
const btnContinue=document.getElementById('btnpayment');
const form = document.getElementById('paymentForm');
const cardNum = document.getElementById('cardnumber');
const expDate = document.getElementById('expdate');
const cvcNum = document.getElementById('cvc');
const nameOC = document.getElementById('nameoncard');
const txtPickDate=document.getElementById("pickedDate");
const summaryTable = document.getElementById("summaryTable");
const paybutton=document.getElementById("btnpayment");

//event listeners
window.addEventListener("load",()=>{
    summaryTable.innerHTML = localStorage.getItem("stable");
    paybutton.innerText= `Pay $${localStorage.getItem("Total payable")}`;
});


//adding event listeners
window.addEventListener("load",init);
cardNum.addEventListener('input',()=>{
    validateCardNum();
    validateInputs();
});
expDate.addEventListener('input',()=>{
    validateExpDate();
    validateInputs();
});
cvcNum.addEventListener('input',()=>{
    validateCvcNum();
    validateInputs();
});
nameOC.addEventListener('input',()=>{
    validateNameOC();
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

const validateCardNum =()=>{
    const cardNumValue = cardNum.value.trim();
    const cardNumType = /^[0-9]+$/;

    if(cardNumValue === '') {
        setError(cardNum, 'Card number is required');
    } 
    else if(!cardNumType.test(cardNumValue)){
        setError(cardNum,'Invalid card number');
    }
    else if(cardNumValue.length!==16){
        setError(cardNum,'Card number should have 16 digits');
    }
    else {
        setSuccess(cardNum);
    }

};

const validateExpDate=()=>{
    const expDateValue = expDate.value.trim();
    //to check if the date is expired
    const expDateType = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const currentD = new Date();
    const [mm,yy] = expDateValue.split('/').map(item => parseInt(item,10));
    const currentY = currentD.getFullYear() % 100;
    const currentM = currentD.getMonth() + 1;

    if(expDateValue === '') {
        setError(expDate, 'Expiry date is required');
    } else if(!expDateType.test(expDateValue)){
        setError(expDate,'Invalid expiry date(use MM/YY format)');
    }
    else if(yy < currentY || (yy === currentY && mm < currentM)){
        setError(expDate,'Card is expired');
    }
    else{
        setSuccess(expDate);
    }

};

const validateCvcNum=()=>{
    const cvcNumValue = cvcNum.value.trim();
    const cvcNumType = /^[0-9]+$/;

    if(cvcNumValue === '') {
        setError(cvcNum, 'CVC/CVV number is required');
    }else if(!cvcNumType.test(cvcNumValue)){
        setError(cvcNum,'Invalid CVC/CVV')
    }
    else if (cvcNumValue.length !== 3 ) {
        setError(cvcNum, 'CVC/CVV must have 3 characters');
    } else {
        setSuccess(cvcNum);
    }


};

const validateNameOC=()=>{
    const nameOCValue = nameOC.value.trim();
    const nameType = /^[A-Za-z ]+$/;

    if(nameOCValue === '') {
        setError(nameOC, 'Name is required');
    } else if (!nameType.test(nameOCValue)) {
        setError(nameOC, 'Provide a valid name');
    } else {
        setSuccess(nameOC);
    }

};


const validateInputs = () => {
    const validForm=(
        cardNum.parentElement.classList.contains('success')&&
        expDate.parentElement.classList.contains('success')&&

        cvcNum.parentElement.classList.contains('success')&&

        nameOC.parentElement.classList.contains('success')
    );
    btnContinue.disabled=!validForm;

};

btnContinue.addEventListener("click",(e)=>{
    e.preventDefault();
    localStorage.setItem("Card number", cardNum.value);
    localStorage.setItem("Expiry date", expDate.value);
    localStorage.setItem("CVC/CVV", cvcNum.value);
    localStorage.setItem("Name on card", nameOC.value);
    window.location.href=`confirm.html`;
});
