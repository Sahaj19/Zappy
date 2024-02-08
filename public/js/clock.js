let clock = document.querySelector(".clock");

// Function to update the clock
function updateClock() {
  let date = new Date();

  let day = date.toLocaleString("en-US", { weekday: "long" }).slice(0, 3);
  let month = date.toLocaleString("en-US", { month: "long" }).slice(0, 3);
  let currDate = date.getDate();

  let hours = date.getHours();
  let mins = date.getMinutes();
  let AM_PM = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours !== 0 ? hours : 12;
  let time = `${hours}:${mins < 10 ? "0" + mins : mins} ${AM_PM}`;

  let proper_date = `${time} &#183; ${day}, ${month} ${currDate}`;

  clock.innerHTML = proper_date;
}

// Intial updation
updateClock();

// now clock will be updated after every second
setInterval(updateClock, 1000);
