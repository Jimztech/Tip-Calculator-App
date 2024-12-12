const billInput = document.getElementById("bill");
const numPeopleInput = document.getElementById("number");
const tipButtons = document.getElementsByClassName("tip-button");
const customInput = document.getElementById("custom");
const amountOutput = document.querySelector(".amount-output");
const totalOutput = document.querySelector(".total-output");
const errorMessage = document.querySelector(".error-message");

// calculates amount output
function calculateTipPerPerson(billValue, numPeopleValue, tipPercentage) {
    if(numPeopleValue === 0) {
        errorMessage.style.display = "block";
        return null;
    }
    
    errorMessage.style.display = "none";
    const tipAmount = (billValue * tipPercentage) / 100;
    return tipAmount/numPeopleValue;
}

// Updates amount output
function updateTipAmount(billValue, numPeopleValue, tipPercentage) {
    const tipAmountPerPerson = calculateTipPerPerson(billValue, numPeopleValue, tipPercentage);

    if(tipAmountPerPerson !== null) {
        amountOutput.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
    } else {
        amountOutput.textContent = "";
    }
}

// Calculates total output
function calculateTotalPerPerson(billValue, numPeopleValue, tipPercentage) {
    if(numPeopleValue === 0) {
        errorMessage.style.display = "block";
        return null;
    }

    errorMessage.style.display = "none";
    const tipAmount = (billValue * tipPercentage) / 100;
    const totalAmount =  billValue + tipAmount;
    return totalAmount / numPeopleValue;
}


// updates total output
function updateTotalOutput (billValue, numPeopleValue, tipPercentage) {
    const totalAmountPerPerson = calculateTotalPerPerson(billValue, numPeopleValue, tipPercentage);
    if(totalAmountPerPerson !== null) {
        totalOutput.textContent = `$${totalAmountPerPerson.toFixed(2)}`;
    } else {
        totalOutput.textContent = "";
    }
}


// Event Listeners.
Array.from(tipButtons).forEach((button) => {
    button.addEventListener("click", () => {
        const billValue = parseFloat(billInput.value) || 0;
        const numPeopleValue = parseInt(numPeopleInput.value, 10) || 0;
        const tipPercentage = parseFloat(button.textContent.replace("%", "")) || 0;

        // Remove the 'selected-tip' class from all buttons
        Array.from(tipButtons).forEach((btn) => btn.classList.remove("selected-tip"));

        // Add the 'selected-tip' class to the clicked button.
        button.classList.add("selected-tip");

        // Clear the custom input value (to avoid conflicts).
        customInput.value = "";

        // Update the calculations
        updateTipAmount(billValue, numPeopleValue, tipPercentage);
        updateTotalOutput(billValue, numPeopleValue, tipPercentage);
    });
});


customInput.addEventListener("input", () => {
    const billValue = parseFloat(billInput.value) || 0;
    const numPeopleValue = parseInt(numPeopleInput.value, 10) || 0;
    const tipPercentage = parseFloat(customInput.value) || 0;
  
    Array.from(tipButtons).forEach((btn) => btn.classList.remove("selected-tip"));

    updateTipAmount(billValue, numPeopleValue, tipPercentage);
    updateTotalOutput(billValue, numPeopleValue, tipPercentage);
});

numPeopleInput.addEventListener("input", () => {
    // Handle real-time changes in "Number of People"
    const billValue = parseFloat(billInput.value) || 0;
    const numPeopleValue = parseInt(numPeopleInput.value, 10) || 0;
    const tipPercentage =
      parseFloat(customInput.value) || parseFloat(document.querySelector(".selected-tip").textContent.replace("%", "")) || 0;
  
    updateTipAmount(billValue, numPeopleValue, tipPercentage);
    updateTotalOutput(billValue, numPeopleValue, tipPercentage);
});

const resetButton = document.getElementById("submit-btn"); 

// Reset functionality
resetButton.addEventListener("click", () => {
    // Clear all input values
    billInput.value = "";
    numPeopleInput.value = "";
    customInput.value = "";

    // Remove any selected state from tip buttons
    Array.from(tipButtons).forEach((button) => {
        button.classList.remove("selected-tip");
    });

    // Hide the error message
    errorMessage.style.display = "none";

    // Reset outputs
    amountOutput.textContent = "$0.00";
    totalOutput.textContent = "$0.00";
});

  