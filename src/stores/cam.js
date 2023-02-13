function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
const socketNo = getRandomInt(100000, 1000000);
const connection = new WebSocket("wss://webdev-test.site/api/ws/" + socketNo);
console.log(connection.identifier);

const w = 300,
    h = 300;
navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
const constraints = { audio: true, video: true };
//const video = document.getElementById("videoInput");
// const video = document.getElementById("videoInput");
// var canvas = document.getElementById("videoOutput");

let video = "";
let canvas = "";

function initInputVideo() {
    video = document.getElementById("videoInput");
    video.width = w;
    video.height = h;
}

function inintOutputVideo() {
    canvas = document.getElementById("videoOutput");
    canvas.width = w;
    canvas.height = h;
}

function successCallback(stream) {
    video.srcObject = stream;
    video.play();
}

function errorCallback(error) {
    console.log(error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);

function processImage() {
    let ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);
    setTimeout(processImage, 1);
}
//processImage();

function stream() {
    setInterval(sendImage, 200);
}

function sendImage() {
    let rawData = canvas.toDataURL("image/jpeg", 0.5);
    connection.send(rawData);
}

function putImg(data) {
    return data;
}

// let putqq = "";

// const qwe = document.getElementById("wat");

// connection.onmessage = function (e) {
//     putqq = e.data;
//     qwe.src = putqq;
//     console.log(qwe);
// };

const test = {
    socketNo,
    connection,
    sendImage,
    stream,
    processImage,
    initInputVideo,
    inintOutputVideo,
    putImg,
};

export default test;
