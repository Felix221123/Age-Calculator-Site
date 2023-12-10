// getting all varibles needed inside the document
const daysInput = document.getElementById('days')
const monthInput = document.getElementById('months')
const yearsInput = document.getElementById('years')
const datesSubmitBtn = document.getElementById('myage')

//getting where the dates will displayed
const yearAge = document.getElementById('years-age')
const monthAge = document.getElementById('months-age')
const dayAge = document.getElementById('days-age')

// error text from the document
const onErrorDayDisplay = document.getElementById('wrong-day-input')
const onErrorMonthDisplay = document.getElementById('wrong-month-input')
const onErrorYearDisplay = document.getElementById('wrong-year-input')

//my current dates 
const currentDate = new Date()


//user display style 
const onErrorClrDisplayDay = document.getElementById('onError-day')
const onErrorClrDisplayMonth = document.getElementById('onError-month')
const onErrorClrDisplayYear = document.getElementById('onError-year')

//months with days
const monthsWithDays = {
    0: 31,
    1: 29,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
};

let isError = false; // Variable to track error state

//function to calculate the age 
async function calculateAge() {
    let userYearInput = yearsInput.value
    let userMonthInput = monthInput.value
    let userDayInput = daysInput.value

    return new Promise((resolve) => {
        //setting all boxes to check errors before any calulations begins
        if (isNaN(userYearInput) ) {

            isError = true;
            console.log('not a number');
            onErrorYearDisplay.classList.add('transition-all')
            onErrorYearDisplay.style.display = 'block'
            onErrorClrDisplayYear.classList.add('error-clr-display');
            yearsInput.style.borderColor = '#FF5959';
        }
        else if (userYearInput.trim() === '' || userYearInput > currentDate.getFullYear() || userYearInput < 0) {
            isError = true;
            console.log('input box is empty');
            onErrorYearDisplay.classList.add('transition-all')
            onErrorYearDisplay.style.display = 'block'
            onErrorClrDisplayYear.classList.add('error-clr-display');
            yearsInput.style.borderColor = '#FF5959';
            
        }
        else if (isNaN(userMonthInput)) {
            isError = true;
            console.log('not a number');
            onErrorMonthDisplay.classList.add('transition-all')
            onErrorMonthDisplay.style.display = 'block'
            onErrorClrDisplayMonth.classList.add('error-clr-display');
            monthInput.style.borderColor = '#FF5959';
            
        }
        else if (userMonthInput.trim() === '' || userMonthInput > 12 || userMonthInput < 0) {
            isError = true;
            console.log('not a number');
            onErrorMonthDisplay.classList.add('transition-all')
            onErrorMonthDisplay.style.display = 'block'
            onErrorClrDisplayMonth.classList.add('error-clr-display');
            monthInput.style.borderColor = '#FF5959';
        }
        else if (isNaN(userDayInput)) {
            isError = true;
            console.log('not a number');
            onErrorDayDisplay.classList.add('transition-all')
            onErrorDayDisplay.style.display = 'block'
            onErrorClrDisplayDay.classList.add('error-clr-display');
            daysInput.style.borderColor = '#FF5959';

        }
        else if (userDayInput.trim() === '' || userDayInput > 31 || userDayInput < 0 ) {
            isError = true;
            console.log('not a number');
            onErrorDayDisplay.classList.add('transition-all')
            onErrorDayDisplay.style.display = 'block'
            onErrorClrDisplayDay.classList.add('error-clr-display');
            daysInput.style.borderColor = '#FF5959';
        } else if (userDayInput.trim() === '' && userMonthInput.trim() === '' && userYearInput.trim() === '') {
            isError = true
            onErrorYearDisplay.classList.add('transition-all')
            onErrorYearDisplay.style.display = 'block'
            onErrorClrDisplayYear.classList.add('error-clr-display');
            yearsInput.style.borderColor = '#FF5959';

            onErrorMonthDisplay.classList.add('transition-all')
            onErrorMonthDisplay.style.display = 'block'
            onErrorClrDisplayMonth.classList.add('error-clr-display');
            monthInput.style.borderColor = '#FF5959';
            
            onErrorDayDisplay.classList.add('transition-all')
            onErrorDayDisplay.style.display = 'block'
            onErrorClrDisplayDay.classList.add('error-clr-display');
            daysInput.style.borderColor = '#FF5959';
        }
        else {
            isError = false
            //removing all errors styles if iserror is set to false
            onErrorYearDisplay.classList.remove('transition-all')
            onErrorYearDisplay.style.display = 'none'
            onErrorClrDisplayYear.classList.remove('error-clr-display');
            yearsInput.style.borderColor = '';

            onErrorMonthDisplay.classList.remove('transition-all')
            onErrorMonthDisplay.style.display = 'none'
            onErrorClrDisplayMonth.classList.remove('error-clr-display');
            monthInput.style.borderColor = '';
            
            onErrorDayDisplay.classList.remove('transition-all')
            onErrorDayDisplay.style.display = 'none'
            onErrorClrDisplayDay.classList.remove('error-clr-display');
            daysInput.style.borderColor = '';

            //calculations starts here
            let ageInYears = currentDate.getFullYear() - userYearInput;
            let ageInMonths = currentDate.getMonth() - userMonthInput;
            let ageInDays = currentDate.getDate() - userDayInput;

            // Adjust for cases where the birth date hasn't occurred yet in the current year
            if (currentDate.getMonth() < userMonthInput || (currentDate.getMonth() === userMonthInput && currentDate.getDate() < userDayInput)) {
                ageInYears--;
                ageInMonths += 12;
            }

            // Adjust for cases where the birth day hasn't occurred yet in the current month
            if (currentDate.getDate() < userDayInput) {
                ageInMonths--;
                const lastMonthDays = monthsWithDays[(currentDate.getMonth() + 11) % 12]; // Get days of the previous month
                ageInDays += lastMonthDays;
            }
            if (ageInMonths < 0) {
                ageInMonths = 0 
            }
            if (ageInMonths > 1) {
                ageInMonths += 1
            }
            if (ageInYears < 1) {
                ageInYears = 0
            }
            
            // Update this part to include the animation
            animateNumbers(ageInYears, ageInMonths, ageInDays);
            
            resolve();
        }
    })
    
}




async function animateNumbers(years, months, days) {

    // Add the fade-in class to trigger the animation
    yearAge.classList.add('fade-in');
    monthAge.classList.add('fade-in');
    dayAge.classList.add('fade-in');

    // Update the text content with the calculated values
    yearAge.textContent = years;
    monthAge.textContent = months;
    dayAge.textContent = days;

    // Remove the fade-in class to reset for the next animation
    await new Promise(resolve => setTimeout(resolve, 600)); // Using async/await for better readability
    yearAge.classList.remove('fade-in');
    monthAge.classList.remove('fade-in');
    dayAge.classList.remove('fade-in');
}





//event btn listner to check age
datesSubmitBtn.addEventListener('click', function () {

    // User display
    if (isError === false) {
        calculateAge()
    } else {
        console.log('it seems an error happened while getting the date of birth');
    }

});


