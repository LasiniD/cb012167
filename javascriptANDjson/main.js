
//Calender

document.addEventListener("DOMContentLoaded", function () {
    const todayDate = new Date();
    let selectedDate = null;
    let thisMonth = todayDate.getMonth();
    let thisYear = todayDate.getFullYear();
  
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const currentMonthElement = document.getElementById("currentMonth");
    const calendarDaysElement = document.getElementById("calendarDays");
    const selectedDateElement = document.getElementById("pickedDate");
  
    renderCalendar(thisMonth, thisYear);
  
    function renderCalendar(month, year) {
      currentMonthElement.innerHTML = `${getMonthName(month)} ${year}`;
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const prevMonthDays = new Date(year, month, 0).getDate();
      const daysInMonth = lastDayOfMonth.getDate();
      const startingDay = firstDayOfMonth.getDay();
  
      calendarDaysElement.innerHTML = "";
  
      for (let i = startingDay; i > 0; i--) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = prevMonthDays - i + 1;
        calendarDaysElement.appendChild(dayElement);
      }
  
      for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = i;
  
        // Disable past dates
        if (year < todayDate.getFullYear() || (year === todayDate.getFullYear() && month < todayDate.getMonth())) {
          dayElement.classList.add("disabled");
        } else if (year === todayDate.getFullYear() && month === todayDate.getMonth() && i < todayDate.getDate()) {
          dayElement.classList.add("disabled");
        } else {
          dayElement.addEventListener("click", () => {
            if (selectedDate) {
              selectedDate.classList.remove("selected");
            }
            selectedDate = dayElement;
            selectedDate.classList.add("selected");
            saveSelectedDateToLocalStorage(i, month, year);
            displaySelectedDate();
          });
        }
  
        calendarDaysElement.appendChild(dayElement);
      }
    }
  
    function getMonthName(month) {
      const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
      ];
      return months[month];
    }
  
    function saveSelectedDateToLocalStorage(day, month, year) {
      const selectedDateObj = {
        day: day,
        month: month,
        year: year
      };
       const formattedDate = `${padNumber(day)}/${padNumber(month + 1)}/${year}`
      localStorage.setItem("Date", formattedDate);
    }
  
  
    function displaySelectedDate() {
      const selectedDateObj = localStorage.getItem("Date");
      txtPickDate.innerText = selectedDateObj ;
      updateContinueButton();
    }
     

    function padNumber(number) {
      return number.toString().padStart(2, "0");
    }
    
  
    prevButton.addEventListener("click", () => {
      thisMonth--;
      if (thisMonth < 0) {
        thisMonth = 11;
        thisYear--;
      }
      renderCalendar(thisMonth, thisYear);
      displaySelectedDate();
    });
  
    nextButton.addEventListener("click", () => {
      thisMonth++;
      if (thisMonth > 11) {
        thisMonth = 0;
        thisYear++;
      }
      renderCalendar(thisMonth, thisYear);
      displaySelectedDate();
    });
  
    // Display the selected date on page load
    displaySelectedDate();
  });












//variables
let date;
let time;
let sla,slc,fa,fc,i;
let paraID;

//references to interactive elements
const txtDate=document.getElementById("date");
const txtPickDate=document.getElementById("pickedDate");
const STable = document.getElementById("summaryTable");
const btnMinus = document.querySelectorAll(".btnminus");
const btnPlus = document.querySelectorAll(".btnplus");
const guestsForm = document.querySelectorAll("guestsForm");


//add event listeners
window.addEventListener("load",init);


//functions

function init(){
    //clear existing data in local storage
    localStorage.clear();

    Today = new Date(); //add current date to the table
    txtPickDate.innerText = Today.toLocaleDateString();
    // localStorage.setItem("Date",txtPickDate.innerText)

    localStorage.setItem("PH-count","0");
    localStorage.setItem("TotalH-count","1");
    localStorage.setItem("Ticket count for Foreigner Adult","1");
    localStorage.setItem("Ticket count for Foreigner Child","0");
    localStorage.setItem("Ticket count for SL Adult","0");
    localStorage.setItem("Ticket count for SL Child","0");
    localStorage.setItem("Ticket count for Infant","0");

    localStorage.setItem(`Charge for Foreigner Adult`,"10");
    localStorage.setItem(`Charge for Foreigner Child`,"0");
    localStorage.setItem(`Charge for SL Adult`,"0");
    localStorage.setItem(`Charge for SL Child`,"0");
    localStorage.setItem(`Charge for Infant`,"0");
    localStorage.setItem(`Total payable`,"10");
    localStorage.setItem("paraID" , "FAcount");


    // localStorage.setItem("Category name","Foreigner Adult");
    chargeCell=document.getElementById("chargeCell");

}


function addDateToTable(){
    txtPickDate.innerText=`${txtDate}`;
}





btnMinus.forEach(button => {
    button.addEventListener("click", () => {
        // button.preventDefault();
        const parentDiv = button.parentNode;
        const paraTag = parentDiv.querySelector("span");
        paraID = paraTag.id;
        localStorage.setItem("paraID", paraID)
        console.log(paraID);

        const sparentDiv = button.parentNode.parentNode;
        const categoryNameElement = sparentDiv.querySelector('p');
        const categoryName = categoryNameElement.textContent.trim();
        console.log(categoryName);

        decreaseCount();
        updateSummaryTable(categoryName);
    });
});


btnPlus.forEach(button => {
    button.addEventListener("click", () => {
        // button.preventDefault();
        const parentDiv = button.parentNode;
        const paraTag = parentDiv.querySelector("span");
        paraID = paraTag.id;

        const sparentDiv = button.parentNode.parentNode;
        const categoryNameElement = sparentDiv.querySelector('p');
        const categoryName = categoryNameElement.textContent.trim();

        increaseCount();
        updateSummaryTable(categoryName);
    });
});

function decreaseCount() {
  if (parseInt(window[paraID].innerText) > 0) {
    window[paraID].innerText = parseInt(window[paraID].innerText) - 1;
    // SLATC.innerText = SLAC.innerText;
    // SLAV.innerText = "$" + parseInt(SLAC.innerText) * 10;
  }
}

function increaseCount() {
  window[paraID].innerText = parseInt(window[paraID].innerText) + 1;
  // SLATC.innerText = SLAC.innerText;
  // SLAV.innerText = "$" + parseInt(SLAC.innerText) * 10;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//adding time slots to the table
const timeValue=document.getElementById("timeValue");
const timeChoice=document.getElementsByClassName("slot");
const timeSelect=document.getElementById("timehour");
const durationValue= document.getElementById("durationValue");

timeSelect.addEventListener("change",() =>{
    addTimeToTable();
    updateMoney();
    updateContinueButton();
});


function calculateCharge(categoryName, ticketCount) {
    
    const ph=localStorage.getItem("PH-count"); 
    const th=localStorage.getItem("TotalH-count"); 

    if (categoryName === "Foreigner Adult") {
        return ticketCount * ((13*ph)+((th-ph)*10));
    }
    if (categoryName === "Foreigner Child") {
        return ticketCount * ((8*ph)+((th-ph)*5));
    }
    if (categoryName === "SL Adult") {
        return ticketCount * ((6*ph)+((th-ph)*4));
    }
    if (categoryName === "SL Child") {
        return ticketCount * ((3*ph)+((th-ph)*2));
    }
    if (categoryName === "Infant") {
        return "0";
    }


}


function addTimeToTable(){
    const timeSelectedOptions = timeSelect.selectedOptions;
    const timeArray = Array.from(timeSelectedOptions, Option => Option.value);

    const first= timeArray[0];
    const [lhs1,rhs1]=first.split('to')
    console.log(lhs1,rhs1);

    const last= timeArray[timeArray.length-1];
    const [lhs2,rhs2]=last.split('to')
    console.log(lhs2,rhs2);

    if(lhs1>6 && rhs2>6){
        const timeRange = `${lhs1}:00am - ${rhs2}:00am`;
        localStorage.setItem("Time", timeRange);
    }else if(lhs1>6){
        const timeRange = `${lhs1}:00am - ${rhs2}:00pm`;
        localStorage.setItem("Time", timeRange);
    }else{
        const timeRange = `${lhs1}:00pm - ${rhs2}:00pm`;
        localStorage.setItem("Time", timeRange);
    }

    timeValue.innerText =localStorage.getItem("Time");

    let count=0;
    for (const i of timeSelectedOptions) {
        if (i.id === "peakH") {
            count++ ;
        }
    }

    const ph=count;
    localStorage.setItem("PH-count", ph);
    localStorage.setItem("TotalH-count", timeArray.length);
   
    const duration= `${timeArray.length}hrs(0${timeArray.length-ph} Normal:0${ph} Peak)`;

    localStorage.setItem("Duration", duration);
    durationValue.innerText=localStorage.getItem("Duration");

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    


function updateSummaryTable(categoryName) {
    const summaryTable = document.getElementById("summaryTable");
    const rows = summaryTable.querySelectorAll("tr");
    let totPay = localStorage.getItem("Total payable");
    let foundRow = null;

    // Look for an existing row with the given categoryName
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName("td");
        const span = cells[0].querySelector("span");
        if (cells.length === 2 && span && span.innerText.trim() === categoryName) {
            foundRow = row;
            break;
        }
    }

    const ticketCount = parseInt(window[paraID].innerText);

    if (ticketCount > 0) {
        if (foundRow) {
            // Update the existing row
            const charge = calculateCharge(categoryName, ticketCount);
            foundRow.cells[1].innerText = "$" + charge;

            const updateHiddenRow = `<div id="test">${ticketCount} </div><span>${categoryName}</span>`;
            foundRow.cells[0].innerHTML = updateHiddenRow;

            localStorage.setItem(`Ticket count for ${categoryName}`, ticketCount);
            localStorage.setItem(`Charge for ${categoryName}`, charge);
        } else {
            // Add a new row
            const newRow = summaryTable.insertRow(rows.length - 1);
            const categoryCell = newRow.insertCell(0);
            const chargeCell = newRow.insertCell(1);

            categoryCell.innerHTML = `<div id="test">${ticketCount} </div><span>${categoryName}</span>`;
            const charge = calculateCharge(categoryName, ticketCount);
            chargeCell.innerText = "$" + charge;

            localStorage.setItem(`Ticket count for ${categoryName}`, ticketCount);
            localStorage.setItem(`Charge for ${categoryName}`, charge);
        }
    }  else{
            const charge = calculateCharge(categoryName, ticketCount);
            localStorage.setItem(`Ticket count for ${categoryName}`, ticketCount);
            localStorage.setItem(`Charge for ${categoryName}`, charge);
          
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.getElementsByTagName("td");
            const span = cells[0].querySelector("span");
            calculateCharge(categoryName,ticketCount);
            if (cells.length === 2 && span && span.innerText === categoryName) {
              // calculateCharge(categoryName,ticketCount);
              summaryTable.deleteRow(i);
              break;
            }
          }
        }
    const txtTotalpayable = document.getElementById("totalpayable");
    const cfa=parseInt(localStorage.getItem("Charge for Foreigner Adult"));
    const cfc=parseInt(localStorage.getItem("Charge for Foreigner Child"));
    const csla=parseInt(localStorage.getItem("Charge for SL Adult"));
    const cslc=parseInt(localStorage.getItem("Charge for SL Child"));
    const ci=parseInt(localStorage.getItem("Charge for Infant"));

    totPay= cfa + cfc + csla + cslc + ci;
    localStorage.setItem("Total payable",totPay);
    txtTotalpayable.innerText="$"+totPay;
  
  }

  // }
  



function updateMoney(){
  const ticket1 = parseInt(localStorage.getItem("Ticket count for Foreigner Adult"));
  const ticket2 = parseInt(localStorage.getItem("Ticket count for Foreigner Child"));
  const ticket3 = parseInt(localStorage.getItem("Ticket count for SL Adult"));
  const ticket4 = parseInt(localStorage.getItem("Ticket count for SL Child"));
  const ticket5 = parseInt(localStorage.getItem("Ticket count for Infant"));

  const ph = localStorage.getItem("PH-count");
  const th = localStorage.getItem("TotalH-count");

  const summaryTable = document.getElementById("summaryTable");
  const rows = summaryTable.getElementsByTagName("tr");

for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const span = row.querySelector("span");
    const cells = row.getElementsByTagName("td");

    if (span && span.textContent.trim() === "Foreigner Adult") {
        const charge = ticket1 * ((13 * ph) + ((th - ph) * 10));
        localStorage.setItem(`Charge for Foreigner Adult`, charge);
        const newcharge = calculateCharge("Foreigner Adult",ticket1);
        cells[1].innerText = "$" + newcharge;
    }

    if (span && span.textContent.trim() === "Foreigner Child") {
      const charge = ticket2 * ((8 * ph) + ((th - ph) * 5));
      localStorage.setItem(`Charge for Foreigner Child`, charge);
        const newcharge = calculateCharge("Foreigner Child",ticket2);
        cells[1].innerText = "$" + newcharge;
    }

    if (span && span.textContent.trim() === "SL Adult") {
      const charge = ticket3 * ((6 * ph) + ((th - ph) * 4));
      localStorage.setItem(`Charge for SL Adult`, charge);
      const newcharge = calculateCharge("SL Adult",ticket3);
      cells[1].innerText = "$" + newcharge;
    }

    if (span && span.textContent.trim() === "SL Child") {
      const charge = ticket4 * ((3 * ph) + ((th - ph) * 2));
      localStorage.setItem(`Charge for SL Child`, charge);
      const newcharge = calculateCharge("SL Child",ticket4);
      cells[1].innerText = "$" + newcharge;
    }

    if (span && span.textContent.trim() === "Infant") {
      localStorage.setItem(`Charge for Infant`, "0");
      localStorage.getItem("Ticket count for Infant",ticket5);
    }

    
}
const txtTotalpayable = document.getElementById("totalpayable");
    const cfa=parseInt(localStorage.getItem("Charge for Foreigner Adult"));
    const cfc=parseInt(localStorage.getItem("Charge for Foreigner Child"));
    const csla=parseInt(localStorage.getItem("Charge for SL Adult"));
    const cslc=parseInt(localStorage.getItem("Charge for SL Child"));
    const ci=parseInt(localStorage.getItem("Charge for Infant"));

    totPay= cfa + cfc + csla + cslc + ci;
    localStorage.setItem("Total payable",totPay);
    txtTotalpayable.innerText="$"+totPay;


}

const btnContinue = document.getElementById("btntickets");
btnContinue.addEventListener("click",(e)=>{
    e.preventDefault();
    localStorage.setItem("stable" , STable.innerHTML);
    window.location.href=`details.html`;
});

const timeHourselect = document.getElementById("timehour");
timeHourselect.addEventListener("change",updateContinueButton);

function updateContinueButton(){
  const selectedDate = localStorage.getItem("Date");
  const selectedTimeSlots= document.getElementById("timehour").selectedOptions.length;

  if(selectedDate && selectedTimeSlots > 0){
    btnContinue.removeAttribute("disabled");
  }else {
    btnContinue.setAttribute("disabled","disabled");
  }
}