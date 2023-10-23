const changeTimeContainer = document.querySelectorAll("#change_time");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const minutesAll = document.querySelectorAll("#minutes");
const secondsAll = document.querySelectorAll("#seconds");
const minusButton = document.querySelector("#minus");
const plusButton = document.querySelector("#plus");
const playButton = document.querySelector("#play");
const timeUpContainer = document.querySelector("#timeUp");
const runningTimeContainer = document.querySelector("#runningTime");
const stopButton = document.querySelector("#stopButton");
// const allPlayButtons = document.querySelectorAll("#play");
const play2Button = document.querySelector("#play2");
const pauseButton = document.querySelector("#pause");
const button1m = document.querySelector("#button1m");
const button5m = document.querySelector("#button5m");
const stopContainer = document.querySelector("#stopContainer");
const stopTimerButton = document.querySelector("#stopTimer");
const cancelButton = document.querySelector("#cancel");

localStorage.clear();

const currentTime = {
  minutes: "02",
  seconds: "00",
};

localStorage.setItem("currentTime", JSON.stringify(currentTime));

const buttonStatus = {
  play: "no",
  stop: "no",
  play2: "no",
  pause: "no",
};

localStorage.setItem("buttonStatus", JSON.stringify(buttonStatus));

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function renderState() {
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  console.log(currentTime);
  for (let entry of minutesAll) {
    entry.value = currentTime.minutes;
  }
  for (let entry of secondsAll) {
    entry.value = currentTime.seconds;
  }
  if (currentTime.minutes === "00") {
    minusButton.disabled = true;
    minusButton.style.opacity = "0.25";
  } else if (currentTime.minutes === "59") {
    plusButton.disabled = true;
    plusButton.style.opacity = "0.25";
  } else if (currentTime.minutese !== "00" && currentTime.minutes !== "59") {
    minusButton.disabled = false;
    minusButton.style.opacity = "1";
    plusButton.disabled = false;
    plusButton.style.opacity = "1";
  }
  if (currentTime.minutes === "00" && currentTime.seconds === "00") {
    console.log(playButton.disabled);
    playButton.disabled = true;
    playButton.style.opacity = "0.25";
  } else {
    console.log(playButton.disabled);
    playButton.disabled = false;
    playButton.style.opacity = "1";
  }
  console.log(playButton.disabled);
  const wasLooped = JSON.parse(localStorage.getItem("wasLooped"));
  console.log(wasLooped);
  const buttonStatus = JSON.parse(localStorage.getItem("buttonStatus"));
  console.log(buttonStatus);
  const firstContainer = document.querySelector("#first");
  if (wasLooped === null && buttonStatus.play === "no") {
    console.log("yes");
    firstContainer.style.display = "grid";
    runningTimeContainer.style.display = "none";
    timeUpContainer.style.display = "none";
    stopContainer.style.display = "none";
  } else if (wasLooped === null && buttonStatus.play === "yes") {
    console.log("yes");
    firstContainer.style.display = "none";
    runningTimeContainer.style.display = "grid";
    timeUpContainer.style.display = "none";
    stopContainer.style.display = "none";

    const numberForBackgroundImage =
      (parseInt(
        JSON.parse(localStorage.getItem("currentNumberForImageBackground"))
      ) /
        parseInt(
          JSON.parse(localStorage.getItem("startNumberForImageBackground"))
        )) *
      100;
    runningTimeContainer.style.backgroundImage = `linear-gradient(to right, var(--timer-background-color) ${numberForBackgroundImage}%, white ${numberForBackgroundImage}%)`;

    function theOpacity(xxx) {
      for (let i = 0; i < changeTimeContainer.length; i++) {
        if (i === 1) {
          changeTimeContainer[i].style.opacity = "" + xxx;
        }
      }
    }

    if (buttonStatus.pause === "yes") {
      console.log("Zigil");
      play2Button.style.display = "block";
      pauseButton.style.display = "none";
      theOpacity(0.15);
    } else if (buttonStatus.play2 === "yes") {
      console.log("Zigil");
      play2Button.style.display = "none";
      pauseButton.style.display = "block";
      theOpacity(1);
    } else if (buttonStatus.stop === "yes") {
      console.log("Zigil");
      console.log("Jigga");
      runningTimeContainer.style.display = "none";
      stopContainer.style.display = "flex";
    }
  } else if (wasLooped !== null && buttonStatus.play === "yes") {
    console.log("yes");
    firstContainer.style.display = "none";
    runningTimeContainer.style.display = "none";
    timeUpContainer.style.display = "block";
  }
}

renderState();

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

for (let entry of minutesAll) {
  entry.addEventListener("click", function (event) {
    console.log("Sadeg");
    console.log(minutesAll);
    console.log(event.target.value);
    event.target.select();
    const currentTime = JSON.parse(localStorage.getItem("currentTime"));
    console.log(currentTime);
    currentTime.minutes = event.target.value;
    localStorage.setItem("currentTime", JSON.stringify(currentTime));
  });
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

for (let entry of secondsAll) {
  entry.addEventListener("click", function (event) {
    console.log("Matin");
    console.log(secondsAll);
    console.log(event.target.value);
    event.target.select();
    const currentTime = JSON.parse(localStorage.getItem("currentTime"));
    console.log(currentTime);
    currentTime.seconds = event.target.value;
    localStorage.setItem("currentTime", JSON.stringify(currentTime));
  });
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function changeTime(event) {
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  let changedValue = event.target.value;
  console.log(event.target.value);
  console.log(changedValue.length);
  if (changedValue.length === 1) {
    changedValue = 0 + changedValue;
  }
  console.log(event.target.value);
  console.log(changedValue);
  console.log(event.target.id);
  console.log(currentTime[event.target.id]);
  currentTime[event.target.id] = changedValue;
  console.log(currentTime[event.target.id]);
  localStorage.setItem("currentTime", JSON.stringify(currentTime));
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

for (let entry of minutesAll) {
  entry.addEventListener("change", function (event) {
    changeTime(event);
    renderState();
  });
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

for (let entry of secondsAll) {
  entry.addEventListener("change", function (event) {
    changeTime(event);
    renderState();
  });
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function plusMinus(event) {
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  console.log(currentTime);
  console.log("qqqqqqqqqqq");
  let minutesInNumbers = parseInt(currentTime.minutes);
  console.log(minutesInNumbers);
  console.log(event.target);
  if (event.target === minusButton) {
    console.log("yes");
    if (minutesInNumbers !== 0) {
      minutesInNumbers--;
    }
  } else if (event.target === plusButton) {
    console.log("yes");
    if (minutesInNumbers !== 59) {
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
  let changedMinutes = parseInt(currentTime.minutes);
  console.log(changedMinutes);
  let changedSeconds = parseInt(currentTime.seconds);
  console.log(changedSeconds);
  const summary = changedMinutes * 60 + changedSeconds;
  console.log(summary);
  localStorage.setItem(
    "currentNumberForImageBackground",
    JSON.stringify(summary - 1)
  );
  if (changedSeconds === 0) {
    changedMinutes--;
    console.log(changedMinutes);
    let changedMinutesInString = "" + changedMinutes;
    console.log(changedMinutesInString);
    if (changedMinutesInString.length === 1) {
      changedMinutesInString = 0 + changedMinutesInString;
    }
    console.log(changedMinutesInString);
    currentTime.minutes = changedMinutesInString;
    changedSeconds = 59;
  } else {
    changedSeconds--;
  }
  console.log(changedSeconds);
  let changedSecondsInString = "" + changedSeconds;
  console.log(changedSecondsInString);
  if (changedSecondsInString.length === 1) {
    changedSecondsInString = 0 + changedSecondsInString;
  }
  console.log(changedSecondsInString);
  currentTime.seconds = changedSecondsInString;
  console.log(currentTime);
  localStorage.setItem("currentTime", JSON.stringify(currentTime));
  if (currentTime.minutes === "00" && currentTime.seconds === "00") {
    localStorage.setItem("wasLooped", JSON.stringify({ wasLooped: "yes" }));
  }
  renderState();
}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function cleanStorage() {
  localStorage.removeItem("startNumberForImageBackground");
  localStorage.removeItem("currentNumberForImageBackground");
  localStorage.removeItem("wasLooped");
  localStorage.removeItem("startDuration");
  localStorage.removeItem("buttonStatusBeforeStop");
  localStorage.removeItem("buttonStatus");
  localStorage.setItem("buttonStatus", JSON.stringify(buttonStatus));
}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function timesUp() {
  const myInterval = setInterval(startAnimation, 900);

  function startAnimation() {
    const timeUpP = document.querySelector("#timeUp_p");
    console.log(timeUpP);
    timeUpP.classList.add("timeUp_up");
    setTimeout(() => {
      timeUpP.classList.remove("timeUp_up");
    }, 300);
    timeUpContainer.addEventListener("click", function () {
      clearInterval(myInterval);
      cleanStorage();
      console.log("Iyyyeeeaaaah");
      renderState();
    });
  }
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function addMinutes(xxx) {
  console.log("üüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüü");
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  console.log(currentTime);
  let newMinutes = "" + (parseInt(currentTime.minutes) + xxx);
  if (newMinutes.length === 1) {
    newMinutes = 0 + newMinutes;
  }
  console.log(newMinutes);
  currentTime.minutes = newMinutes;
  const startNumberForImageBackground =
    parseInt(currentTime.minutes) * 60 + parseInt(currentTime.seconds);
  localStorage.setItem(
    "startNumberForImageBackground",
    JSON.stringify(startNumberForImageBackground)
  );
  localStorage.setItem(
    "currentNumberForImageBackground",
    JSON.stringify(startNumberForImageBackground)
  );
  localStorage.setItem("currentTime", JSON.stringify(currentTime));
  renderState();
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

button1m.addEventListener("click", function () {
  addMinutes(1);
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

button5m.addEventListener("click", function () {
  addMinutes(5);
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function forThePlayButtons() {
  const buttonStatus = JSON.parse(localStorage.getItem("buttonStatus"));
  console.log(buttonStatus);
  buttonStatus.play = "yes";
  buttonStatus.play2 = "yes";
  console.log(buttonStatus);
  localStorage.setItem("buttonStatus", JSON.stringify(buttonStatus));
  localStorage.setItem("buttonStatusBeforeStop", JSON.stringify(buttonStatus));
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  console.log(currentTime);

  let startNumberForImageBackground = JSON.parse(
    localStorage.getItem("startNumberForImageBackground")
  );
  if (startNumberForImageBackground === null) {
    startNumberForImageBackground =
      parseInt(currentTime.minutes) * 60 + parseInt(currentTime.seconds);
    console.log(startNumberForImageBackground);
    localStorage.setItem(
      "startNumberForImageBackground",
      JSON.stringify(startNumberForImageBackground)
    );
    localStorage.setItem(
      "currentNumberForImageBackground",
      JSON.stringify(startNumberForImageBackground)
    );
  }
  renderState();
  const tillZero = setInterval(playFunction, 1000);
  console.log("sssssssss");
  function playFunction() {
    console.log("üüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüü");
    countDown();
    const actualizedTime = JSON.parse(localStorage.getItem("currentTime"));
    const buttonStatus = JSON.parse(localStorage.getItem("buttonStatus"));
    pauseButton.addEventListener("click", function () {
      clearInterval(tillZero);
      buttonStatus.stop = "no";
      buttonStatus.play2 = "no";
      buttonStatus.pause = "yes";
      localStorage.setItem("buttonStatus", JSON.stringify(buttonStatus));
      localStorage.setItem(
        "buttonStatusBeforeStop",
        JSON.stringify(buttonStatus)
      );

      renderState();
    });
    stopButton.addEventListener("click", function () {
      clearInterval(tillZero);
      buttonStatus.stop = "yes";
      buttonStatus.play2 = "no";
      buttonStatus.pause = "no";
      localStorage.setItem("buttonStatus", JSON.stringify(buttonStatus));
      renderState();
    });
    if (actualizedTime.seconds === "00") {
      if (actualizedTime.minutes === "00") {
        clearInterval(tillZero);
        console.log("Jetzt");
        const wasLooped = JSON.parse(localStorage.getItem("wasLooped"));
        if (wasLooped !== null) {
          console.log(wasLooped);
          timesUp();
        }
      }
    }
  }
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

playButton.addEventListener("click", function (event) {
  console.log(event.target);
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  console.log("oh jaaaaaaaaaaaa");
  const startDuration = {
    startMinute: currentTime.minutes,
    startSecond: currentTime.seconds,
  };
  localStorage.setItem("startDuration", JSON.stringify(startDuration));

  forThePlayButtons();
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

play2Button.addEventListener("click", function () {
  buttonStatus.stop = "no";
  buttonStatus.play2 = "yes";
  buttonStatus.pause = "no";
  localStorage.setItem("buttonStatus", JSON.stringify(buttonStatus));
  localStorage.setItem("buttonStatusBeforeStop", JSON.stringify(buttonStatus));
  forThePlayButtons();
  renderState();
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

cancelButton.addEventListener("click", function () {
  const buttonStatusBeforeStop = JSON.parse(
    localStorage.getItem("buttonStatusBeforeStop")
  );
  localStorage.setItem("buttonStatus", JSON.stringify(buttonStatusBeforeStop));
  if (buttonStatusBeforeStop.play2 === "yes") {
    forThePlayButtons();
  }
  renderState();
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

stopTimerButton.addEventListener("click", function () {
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  const startDuration = JSON.parse(localStorage.getItem("startDuration"));
  currentTime.minutes = startDuration.startMinute;
  currentTime.seconds = startDuration.startSecond;
  localStorage.setItem("currentTime", JSON.stringify(currentTime));
  cleanStorage();
  renderState();
});
