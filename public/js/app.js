const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
messageOne.textContent = "";
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(
    "https://shrouded-tor-50257.herokuapp.com/weather/?address=" + search.value
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      console.log(data);
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast + "     " + data.temp;
      console.log(data.forecast);
    });
  });
});
