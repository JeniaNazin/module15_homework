const wsUrl = "ws://echo-ws-service.herokuapp.com";

const result = document.querySelector("#chat");
const btnSend = document.querySelector("#messanger_btnSend");
const btnGetLocation = document.querySelector("#messanger_btnLocation");

let websocket;

function writeToScreen (message) {
  let pre = document.createElement("div");
  pre.style.border = "rgb(118, 195, 219) solid 3px";
  pre.style.borderRadius = "10px";
  pre.style.width = "max-content";
  pre.style.marginTop = "5px";
  pre.style.alignSelf = "end";
  pre.style.padding = "5px";
  pre.innerHTML = message;
  result.appendChild(pre);
}



btnSend.addEventListener('click', () => {
  websocket = new WebSocket(wsUrl);
  websocket.onopen = function(evt) {
    websocket.send(message);
  };
  websocket.onmessage = function(evt) {
    let answer = document.createElement("div");
    answer.style.border = "rgb(118, 195, 219) solid 3px";
    answer.style.borderRadius = "10px";
    answer.style.alignSelf = "start";
    answer.style.color = "blue";
    answer.style.width = "max-content";
    answer.style.marginTop = "5px";
    answer.style.padding = "5px";
    answer.innerHTML = evt.data;
    result.appendChild(answer);
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
  const message = document.querySelector('#message').value;
  writeToScreen(message);
})

const error = () => {
  console.log('Невозможно получить ваше местоположение');
}

const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  writeToScreen(
    `<a href=https://www.openstreetmap.org/#map=18/${latitude}/${longitude}>Геолокация</a>`
  )
}

btnGetLocation.addEventListener('click', () => {
  if (!navigator.geolocation) {
    console.log('Geolocation не поддерживается вашим браузером');
  } else {
    console.log('Определение местоположения…');
    navigator.geolocation.getCurrentPosition(success, error);
  }
})