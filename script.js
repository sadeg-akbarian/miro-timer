const minutesAll = document.querySelectorAll("#minutes");
const secondsAll = document.querySelectorAll("#seconds");
const minusButton = document.querySelector("#minus");
const plusButton = document.querySelector("#plus");
const playButton = document.querySelector("#play");
const timeUpContainer = document.querySelector("#timeUp");
const play2Button = document.querySelector("#play2");
const pauseButton = document.querySelector("#pause");

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
    playButton.disabled = true;
    playButton.style.opacity = "0.25";
  } else {
    playButton.disabled = false;
    playButton.style.opacity = "1";
  }
  const wasLooped = JSON.parse(localStorage.getItem("wasLooped"));
  const buttonStatus = JSON.parse(localStorage.getItem("buttonStatus"));
  const firstContainer = document.querySelector("#first");
  const runningTimeContainer = document.querySelector("#runningTime");
  const stopContainer = document.querySelector("#stopContainer");
  if (wasLooped === null && buttonStatus.play === "no") {
    firstContainer.style.display = "grid";
    runningTimeContainer.style.display = "none";
    timeUpContainer.style.display = "none";
    stopContainer.style.display = "none";
  } else if (wasLooped === null && buttonStatus.play === "yes") {
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
      const changeTimeContainer = document.querySelectorAll("#change_time");
      for (let i = 0; i < changeTimeContainer.length; i++) {
        if (i === 1) {
          changeTimeContainer[i].style.opacity = "" + xxx;
        }
      }
    }

    if (buttonStatus.pause === "yes") {
      play2Button.style.display = "block";
      pauseButton.style.display = "none";
      theOpacity(0.15);
    } else if (buttonStatus.play2 === "yes") {
      play2Button.style.display = "none";
      pauseButton.style.display = "block";
      theOpacity(1);
    } else if (buttonStatus.stop === "yes") {
      runningTimeContainer.style.display = "none";
      stopContainer.style.display = "flex";
    }
  } else if (wasLooped !== null && buttonStatus.play === "yes") {
    firstContainer.style.display = "none";
    runningTimeContainer.style.display = "none";
    timeUpContainer.style.display = "block";
  }
}

renderState();

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

for (let entry of minutesAll) {
  entry.addEventListener("click", function (event) {
    event.target.select();
    const currentTime = JSON.parse(localStorage.getItem("currentTime"));
    currentTime.minutes = event.target.value;
    localStorage.setItem("currentTime", JSON.stringify(currentTime));
  });
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

for (let entry of secondsAll) {
  entry.addEventListener("click", function (event) {
    event.target.select();
    const currentTime = JSON.parse(localStorage.getItem("currentTime"));
    currentTime.seconds = event.target.value;
    localStorage.setItem("currentTime", JSON.stringify(currentTime));
  });
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function changeTime(event) {
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  let changedValue = event.target.value;
  if (changedValue.length === 1) {
    changedValue = 0 + changedValue;
  }
  currentTime[event.target.id] = changedValue;
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
  let minutesInNumbers = parseInt(currentTime.minutes);
  if (event.target === minusButton) {
    if (minutesInNumbers !== 0) {
      minutesInNumbers--;
    }
  } else if (event.target === plusButton) {
    if (minutesInNumbers !== 59) {
      minutesInNumbers++;
    }
  }
  let minutesInString = "" + minutesInNumbers;
  if (minutesInString.length === 1) {
    minutesInString = 0 + minutesInString;
  }

  currentTime.minutes = minutesInString;
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
  let changedMinutes = parseInt(currentTime.minutes);
  let changedSeconds = parseInt(currentTime.seconds);
  const summary = changedMinutes * 60 + changedSeconds;
  localStorage.setItem(
    "currentNumberForImageBackground",
    JSON.stringify(summary - 1)
  );
  if (changedSeconds === 0) {
    changedMinutes--;
    let changedMinutesInString = "" + changedMinutes;
    if (changedMinutesInString.length === 1) {
      changedMinutesInString = 0 + changedMinutesInString;
    }
    currentTime.minutes = changedMinutesInString;
    changedSeconds = 59;
  } else {
    changedSeconds--;
  }
  let changedSecondsInString = "" + changedSeconds;
  if (changedSecondsInString.length === 1) {
    changedSecondsInString = 0 + changedSecondsInString;
  }
  currentTime.seconds = changedSecondsInString;
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
    timeUpP.classList.add("timeUp_up");
    setTimeout(() => {
      timeUpP.classList.remove("timeUp_up");
    }, 300);
    timeUpContainer.addEventListener("click", function () {
      clearInterval(myInterval);
      cleanStorage();
      renderState();
    });
  }
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function addMinutes(xxx) {
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  let newMinutes = "" + (parseInt(currentTime.minutes) + xxx);
  if (newMinutes.length === 1) {
    newMinutes = 0 + newMinutes;
  }
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

const button1m = document.querySelector("#button1m");
button1m.addEventListener("click", function () {
  addMinutes(1);
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const button5m = document.querySelector("#button5m");
button5m.addEventListener("click", function () {
  addMinutes(5);
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function forThePlayButtons() {
  const buttonStatus = JSON.parse(localStorage.getItem("buttonStatus"));
  buttonStatus.play = "yes";
  buttonStatus.play2 = "yes";
  localStorage.setItem("buttonStatus", JSON.stringify(buttonStatus));
  localStorage.setItem("buttonStatusBeforeStop", JSON.stringify(buttonStatus));
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));

  let startNumberForImageBackground = JSON.parse(
    localStorage.getItem("startNumberForImageBackground")
  );
  if (startNumberForImageBackground === null) {
    startNumberForImageBackground =
      parseInt(currentTime.minutes) * 60 + parseInt(currentTime.seconds);
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
  function playFunction() {
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
    const stopButton = document.querySelector("#stopButton");
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
        const wasLooped = JSON.parse(localStorage.getItem("wasLooped"));
        if (wasLooped !== null) {
          timesUp();
        }
      }
    }
  }
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

playButton.addEventListener("click", function (event) {
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  const startDuration = {
    startMinute: currentTime.minutes,
    startSecond: currentTime.seconds,
  };
  localStorage.setItem("startDuration", JSON.stringify(startDuration));

  forThePlayButtons();
});

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

const cancelButton = document.querySelector("#cancel");
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

const stopTimerButton = document.querySelector("#stopTimer");
stopTimerButton.addEventListener("click", function () {
  const currentTime = JSON.parse(localStorage.getItem("currentTime"));
  const startDuration = JSON.parse(localStorage.getItem("startDuration"));
  currentTime.minutes = startDuration.startMinute;
  currentTime.seconds = startDuration.startSecond;
  localStorage.setItem("currentTime", JSON.stringify(currentTime));
  cleanStorage();
  renderState();
});
