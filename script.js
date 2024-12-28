const config = {
  delay: 500,
  delay: 2000,
}

const state = {
  omino: 0,
  currentPosition: {x: 0, y: 0, turn: 0},
};

// start();

async function start() {
  let action;
  let delayLeft = 0;

  chooseOmino();
  chooseCurrentPosition();

  while (true) {
    clearScreen();
    showOminoAtCurrentPosition();
    delayLeft ||= config.delay;
    ({action, delayLeft} = await waitForInputOrDelay(delayLeft));
    updateOminoCurrentPosition(action);
  }
}

function chooseOmino() {
  const omino = Math.floor(Math.random() * 7);
  state.omino = omino;
}

function chooseCurrentPosition() {
  const currentPosition = {x: 4, y: 0, turn: 0};
  state.currentPosition = currentPosition;
}

function updateOminoCurrentPosition(action) {
  const {currentPosition} = state;

  if (action === "down") currentPosition.y++;
  if (action === "left") currentPosition.x--;
  if (action === "right") currentPosition.x++;
  if (action === "rotate") currentPosition.turn = (currentPosition.turn + 1) % 4;
}

function showOminoAtCurrentPosition() {
  const {omino, currentPosition: {x, y, turn}} = state;
  console.log({omino, x, y, turn});
}

function waitForInputOrDelay(delay) {
  const getInterval = markIntervalStart();
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({action: "down", delayLeft: 0});
    }, delay);

    window.onkeydown = (e) => {
      const action = getActionFromEvent(e);

      if (!action) return;

      resolve({action, delayLeft: delay - getInterval()});
    };
  });
}

function markIntervalStart() {
  const start = getCurrentTime();
  return function getInterval() {
    return getCurrentTime() - start;
  }
}

function getCurrentTime() {
  return new Date().getTime();
}

function getActionFromEvent(e) {
  if (e.key === "ArrowDown") return "down";
  if (e.key === "ArrowLeft") return "left";
  if (e.key === "ArrowRight") return "right";
  if (e.key === "ArrowUp") return "rotate";
}

function clearScreen() {
  // console.clear();
}
