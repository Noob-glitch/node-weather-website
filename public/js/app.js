const form = document.querySelector("form");
const input = document.querySelector("input");
const error = document.querySelector("#error");

//const result = document.querySelector("#result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value;
  error.textContent = "loading";
  result.textContent = "";
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          error.textContent = data.error;
        }
        error.textContent = data.location;
        result.textContent = data.weather;
      });
    }
  );
});
