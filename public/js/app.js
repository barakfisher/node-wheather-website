console.log("cs js file loaded");
// fetch('http://puzzle.mead.io/puzzle').then((res)=>{
//     res.json().then((data)=>{
//         console.log(data)

//     })

// })

const weatherFrom = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetchWeather(location);
});

const fetchWeather = (location) => {
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data[0].error) {
        messageOne.textContent = data[0].error;
        messageOne.textContent = "";
      } else {
        console.log(data);
        messageOne.textContent = data[0].location;
        messageTwo.textContent = data[0].forcastData;
      }
    });
  });
};
