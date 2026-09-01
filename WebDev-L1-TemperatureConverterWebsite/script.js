const btnChange = document.querySelector(".btn_change");

const inputValue = document.getElementById("input_value");
const selectChange = document.getElementById("select_change");

const errorMessage = document.getElementById("error_message");

const resultCelcius = document.getElementById("result_celcius");
const resultFahrenheit = document.getElementById("result_fahrenheit");
const resultKelvin = document.getElementById("result_kelvin");

btnChange.addEventListener("click", () => {
  errorMessage.textContent = "";
  resultCelcius.textContent = "-";
  resultFahrenheit.textContent = "-";
  resultKelvin.textContent = "-";

  if (inputValue.value.trim() === "" || isNaN(inputValue.value)) {
    errorMessage.textContent = "Please enter the correct number!";
    return
  }

  let temperatur = parseFloat(inputValue.value);
  let celcius = 0;

  if (selectChange.value === "C") {
    celcius = temperatur;
  } else if (selectChange.value === "F") {
    celcius = (temperatur - 32) * (5 / 9);
  } else if (selectChange.value === "K") {
    celcius = temperatur - 273.15;
  }

  if (celcius < -273.15) {
    errorMessage.textContent =
      "Error: The temperature cannot be below absolute zero (-273.15°C)!";
    return;
  }
  const fahrenheit = (celcius * 9) / 5 + 32;
  const kelvin = celcius + 273.15;

  resultCelcius.textContent = `Celsius:${celcius.toFixed(2)} °C`;
  resultFahrenheit.textContent = `Fahrenheit:${fahrenheit.toFixed(2)} °F`;
  resultKelvin.textContent = `Kelvin:${kelvin.toFixed(2)} K`;
});
