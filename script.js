const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const minusButton = document.querySelector("#minus");
const plusButton = document.querySelector("#plus");
const playButton = document.querySelector("#play");

localStorage.clear();

const currentTime = {
  minutes: "02",
  seconds: "00",
};

localStorage.setItem("currentTime", JSON.stringify(currentTime));

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function renderState() {
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  console.log(currentTime);
  minutes.value = currentTime.minutes;
  seconds.value = currentTime.seconds;
}

renderState();

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

minutes.addEventListener("click", function (event) {
  console.log(event.target.value);
  event.target.select();
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  console.log(currentTime);
  currentTime.minutes = event.target.value;
  localStorage.setItem("currentTime", JSON.stringify(currentTime));
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

seconds.addEventListener("click", function (event) {
  console.log(event.target.value);
  event.target.select();
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  console.log(currentTime);
  currentTime.seconds = event.target.value;
  localStorage.setItem("currentTime", JSON.stringify(currentTime));
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function degdeg(event, xxx) {
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  let changedValue = event.target.value;
  console.log(event.target.value);
  console.log(changedValue.length);
  if (changedValue.length === 1) {
    changedValue = 0 + changedValue;
  }
  console.log(event.target.value);
  console.log(changedValue);
  const timePart = xxx.id;
  console.log(timePart);
  console.log(currentTime[timePart]);
  currentTime[timePart] = changedValue;
  console.log(currentTime[timePart]);
  localStorage.setItem("currentTime", JSON.stringify(currentTime));
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

minutes.addEventListener("change", function (event) {
  degdeg(event, minutes);
  renderState();
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

seconds.addEventListener("change", function (event) {
  degdeg(event, seconds);
  renderState();
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function plusMinus(event) {
  console.log(minutes.value);
  console.log("qqqqqqqqqqq");
  let minutesInNumbers = parseInt(minutes.value);
  console.log(minutesInNumbers);
  console.log(event.target);
  if (event.target === minusButton) {
    console.log("yes");
    if (minutes.value !== "00") {
      minutesInNumbers--;
    }
  } else if (event.target === plusButton) {
    console.log("yes");
    if (minutes.value !== "59") {
      minutesInNumbers++;
    }
  }
  console.log(minutesInNumbers);
  let minutesInString = "" + minutesInNumbers;
  console.log(minutesInString);
  if (minutesInString.length === 1) {
    minutesInString = 0 + minutesInString;
    console.log(minutesInString);
  }
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  console.log(currentTime);
  currentTime.minutes = minutesInString;
  console.log(currentTime);
  localStorage.setItem("currentTime", JSON.stringify(currentTime));
  renderState();
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

minusButton.addEventListener("click", plusMinus);

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

plusButton.addEventListener("click", plusMinus);

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function countDown() {
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  console.log(currentTime);
  let changedSeconds = parseInt(currentTime.seconds);
  console.log(changedSeconds);
  if (changedSeconds === 0) {
    console.log("yes");
    let changedMinutes = parseInt(currentTime.minutes);
    console.log(changedMinutes);
    if (changedMinutes !== 0) {
      console.log("Iiiiiiiyyyeeeaaahhhh");
      changedMinutes--;
      console.log(changedMinutes);
      let changedMinutesInString = "" + changedMinutes;
      console.log(changedMinutesInString);
      if (changedMinutesInString.length === 1) {
        console.log("yes");
        changedMinutesInString = 0 + changedMinutesInString;
      }
      console.log(changedMinutesInString);
      currentTime.minutes = changedMinutesInString;
    }
    changedSeconds = 59;
  } else {
    console.log("yes");
    changedSeconds--;
  }
  console.log(changedSeconds);
  let changedSecondsInString = "" + changedSeconds;
  console.log(changedSecondsInString);
  if (changedSecondsInString.length === 1) {
    console.log("yes");
    changedSecondsInString = 0 + changedSecondsInString;
  }
  console.log(changedSecondsInString);
  currentTime.seconds = changedSecondsInString;
  console.log(currentTime);
  localStorage.setItem("wasLooped", JSON.stringify({ wasLooped: "yes" }));
  localStorage.setItem("currentTime", JSON.stringify(currentTime));
  renderState();
}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

playButton.addEventListener("click", function () {
  const summary = parseInt(minutes.value) * 60 + parseInt(seconds.value);
  console.log(summary);
  if (summary !== 0) {
    const minutesDown = setInterval(playFunction, 1000);
    console.log("sssssssss");
    function playFunction() {
      console.log("Hier issssssssssssssssss");
      countDown();
      if (minutes.value === "00") {
        clearInterval(minutesDown);
        console.log("Jetzt");
        const secondsDown = setInterval(playFunction, 1000);
        console.log("sssssssss");
        function playFunction() {
          console.log("üüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüü");
          countDown();
          if (seconds.value === "00") {
            console.log("Jetzt");
            clearInterval(secondsDown);
          }
        }
        localStorage.removeItem("wasLooped");
      }
    }
  }

  const wasLooped = JSON.parse(localStorage.getItem("wasLooped"));
  if (wasLooped !== null) {
    console.log(wasLooped);
  }
  console.log(wasLooped);
});
