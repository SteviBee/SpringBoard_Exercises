window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    // unary plus operator (+) preceeds operad and converts to # number
    // this returns an obj with the current values
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {

  // Setting intial values and calculations
  let amount = document.getElementById("loan-amount")
  amount.value = 350000

  let years = document.getElementById("loan-years")
  years.value = 30; 

  let rate = document.getElementById("loan-rate")
  rate.value = 2.5;

  let payment = document.getElementById("monthly-payment")

  // Calculate current monthly payment
  let inputObj = getCurrentUIValues();
  let result = calculateMonthlyPayment(inputObj);
  payment.innerText = "$ " + result;
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let updatedObj = getCurrentUIValues()
  let result = calculateMonthlyPayment(updatedObj);
  updateMonthly(result);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let calcPayment = ((values.amount * (values.rate)) / (1-((1+values.rate)^(-values.years*12))))

  return calcPayment.toFixed(2);

}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let payment = document.getElementById("monthly-payment")
  payment.innerText = "$ " + monthly;
}
