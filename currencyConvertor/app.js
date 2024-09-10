const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate the dropdowns with currency options
for (let select of dropdowns) {
  for (const [currCode] of Object.entries(countryList)) {
    let newOption = document.createElement("option");
    newOption.textContent = currCode;  // Display currency code
    newOption.value = currCode;

    // Set default selection
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }

  // Update flag when currency is changed
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Function to fetch and update exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = parseFloat(amount.value);

  // Handle invalid amount
  if (isNaN(amtVal) || amtVal <= 0) {
    amtVal = 1;
    amount.value = "1";
  }

  const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  console.log("Fetching from URL:", url);

  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    // Handle missing rate
    if (rate === undefined) {
      msg.innerText = "Exchange rate not available.";
      return;
    }

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    msg.innerText = "Error fetching exchange rate.";
  }
};

// Function to update currency flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Event listener for button click
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Call updateExchangeRate on page load
window.addEventListener("load", () => {
  updateExchangeRate();
});
