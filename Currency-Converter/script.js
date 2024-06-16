// Select the DOM elements for interaction
const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");

// Add options to currency dropdowns
[fromCur, toCur].forEach((select, i) => {
  for (let curCode in Country_List) {
    const selected =
      (i === 0 && curCode === "INR") || (i === 1 && curCode === "USD")
        ? "selected"
        : "";
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${curCode}" ${selected}>${curCode}</option>`
    );
  }
  // Add event listener to update flag images on currency change
  select.addEventListener("change", () => {
    const code = select.value;
    const imgTag = select.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/48x36/${Country_List[
      code
    ].toLowerCase()}.png`;
  });
});

// Function to get exchange rate from API
async function getExchangeRate() {
  const amountVal = amount.value || 1;
  exRateTxt.innerText = " ";
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/ad644e40cbab4da4ddf6d134/latest/${fromCur.value}`
    );
    const result = await response.json();
    const exchangeRate = result.conversion_rates[toCur.value];
    const totalExRate = (amountVal * exchangeRate).toFixed(2);
    exRateTxt.innerText = `${amountVal} ${fromCur.value} = ${totalExRate} ${toCur.value}`;
  } catch (error) {
    exRateTxt.innerText = "Something went wrong...";
  }
}

// Event listeners for button and exchange icon click
window.addEventListener("load", getExchangeRate);
// Prevent form submission and get exchange rate on button click
getBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

// Swap the currencies and update the exchange rate on icon click
exIcon.addEventListener("click", () => {
  [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
  [fromCur, toCur].forEach((select) => {
    const code = select.value;
    const imgTag = select.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/48x36/${Country_List[
      code
    ].toLowerCase()}.png`;
  });
  getExchangeRate();
});
