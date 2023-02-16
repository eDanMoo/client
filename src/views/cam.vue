<script>
import { onMounted, ref } from "vue";
import VueSocketIO from "vue-socket.io";

import WordCard from "../components/WordCard.vue";
// import MusicPlayer from "../components/MusicPlayer.vue";
// import test from "../stores/cam.js";

// let url_segs = window.location.pathname.split("/");
let url_segs = "";
// var room_name = url_segs[1];
let room_name = "";
// var uniqCode = this.getRandomInt(10000, 100000);
let uniqCode = 0;
// let current_user = url_segs[2] + "#" + uniqCode;
let current_user = "";
let isStreaming = 1;
// var intervalVid = this.setInterval(this.sendImage, 15);
let intervalVid = "";

let ws_scheme = "";

// let connection = new WebSocket(ws_scheme + location.host + "/ws/" + room_name);
let connection = "";
// let messages = document.getElementById("messages");
let messages = "";

const w = 300,
    h = 300;
// navigator.mediaDevices.getUserMedia =
//     navigator.mediaDevices.getUserMedia ||
//     navigator.mediaDevices.webkitGetUserMedia ||
//     navigator.mediaDevices.mozGetUserMedia;

const constraints = { audio: true, video: true };
// const video = document.getElementById("videoInput");
let video = "";
// video.width = w;
// video.height = h;

// navigator.getUserMedia(constraints, this.successCallback, this.errorCallback);
// var canvas = document.getElementById("videoOutput");
let canvas = "";
// canvas.width = w;
// canvas.height = h;
// var ctx = canvas.getContext("2d");
// 주석추가
let ctx = "";

let cur_timer = 0;

export default {
    name: "cam_comp",
    components: { WordCard },
    data() {
        return {
            data: null,
            my_cam: current_user,
            toggle_text: "카메라 비활성화",
            time: 100,
            ScoreVisible: true,
            LogVisible: true,
            ChatVisible: true,
            wordUpdate: null,
        };
    },
    watch: {
        time() {
            this.updateProgressbar();
        },
    },
    created() {},

    async mounted() {
        // test.inintOutputVideo();
        // test.initInputVideo();
        // test.processImage();
        connection = await new Promise((resolve, reject) => {
            if (window.location.protocol == "https:") {
                ws_scheme = "wss://";
            } else {
                ws_scheme = "ws://";
            }

            url_segs = window.location.pathname.split("/");
            console.log(url_segs);

            room_name = url_segs[1];

            uniqCode = this.getRandomInt(10000, 100000);
            current_user = url_segs[2] + "#" + uniqCode;
            //let send_url = room_name + "/" + current_user;
            //console.log(send_url);

            const socket = new WebSocket(
                ws_scheme + "webdev-test.site/ws/" + room_name
            );
            socket.addEventListener("open", () => {
                console.log("socket connect");
                resolve(socket);
            });
            socket.addEventListener("error", (error) => {
                console.log("Websocket connect error");
                reject(error);
            });
            socket.addEventListener("close", (event) => {
                console.log("WebSocket connection closed:", event);
            });
        });

        isStreaming = 1;

        intervalVid = setInterval(this.sendImage, 15);

        messages = document.getElementById("messages");

        video = document.getElementById("videoInput");

        video.width = w;
        video.height = h;

        /** 내 카메라 켜기 */
        const myCam = async (constraints) => {
            let stream = null;
            try {
                stream = await navigator.mediaDevices.getUserMedia(constraints);
                /* 스트림 사용 */
                video.srcObject = stream;
                video.play();
            } catch (error) {
                console.log(error);
            }
        };

        myCam(constraints);

        canvas = document.getElementById("videoOutput");

        canvas.width = w;
        canvas.height = h;

        ctx = canvas.getContext("2d");

        const info_obj = {
            type: "info",
            userid: current_user,
        };
        connection.send(JSON.stringify(info_obj));

        connection.onmessage = (event) => {
            // Get message back from websocket and display
            const message = document.createElement("li");
            message.setAttribute("class", "message");
            message.style.clear = "both";

            const event_data = JSON.parse(event.data);
            const text_str = event_data.message;
            const userid_str = event_data.userid;
            const text = document.createTextNode(text_str);
            const userid = document.createTextNode(userid_str);
            if (event_data.type == "message") {
                console.log("Text Recieved: " + text_str);

                const content_tag = document.createElement("div");
                content_tag.appendChild(text);
                content_tag.setAttribute("class", "content_tag");

                const userid_tag = document.createElement("div");
                userid_tag.appendChild(userid);
                userid_tag.setAttribute("class", "userid_tag");

                if (userid_str == current_user) {
                    userid_tag.setAttribute("class", "userid_tag_right");
                    content_tag.style.backgroundColor = "#ACEDFF";
                    message.style.float = "right";
                    content_tag.style.float = "right";
                } else {
                    userid_tag.setAttribute("class", "userid_tag_left");
                    content_tag.style.backgroundColor = "#CAE5FF";
                    message.style.float = "left";
                    content_tag.style.float = "left";
                }
                message.appendChild(content_tag);
                message.appendChild(userid_tag);
                messages.appendChild(message);
                messages.scrollTop = 999999999;
            } else if (event_data.type == "video") {
                if (userid_str == current_user) {
                    0;
                } else {
                    //console.log(current_user);
                    const subFrame = document.getElementById(userid_str);
                    if (subFrame) {
                        subFrame.setAttribute("src", event_data.video);
                    } else {
                        //console.log("New video is created");
                        // const videoFrame =
                        //     document.getElementById("videoFrame");
                        // const newFrame = document.createElement("img");
                        // const div = document.createElement("div");
                        // newFrame.setAttribute("id", userid_str);
                        // newFrame.setAttribute("src", event_data.video);
                        // div.setAttribute("id", "grid" + userid_str);
                        // videoFrame.appendChild(newFrame);
                    }
                }
            } else if (event_data.type == "info") {
                //console.log(userid_str + "  -- " + current_user);
                const check_score_input = document.getElementById(
                    userid_str + "_score"
                );
                if (!check_score_input) {
                    const score_board = document.getElementById("score_board");
                    const score = document.createElement("div");
                    const span = document.createElement("span");
                    const input = document.createElement("input");
                    score.setAttribute("id", userid_str + "_score");
                    span.setAttribute("id", userid_str + "_score_user");
                    span.innerHTML = userid_str + "&nbsp";
                    input.setAttribute("id", userid_str + "_score_val");
                    input.setAttribute("class", "score_value");
                    input.setAttribute("type", "text");
                    input.setAttribute("readonly", "readonly");
                    input.setAttribute("value", 0);
                    input.style.border = "none";
                    input.style.background = "transparent";
                    score_board
                        .appendChild(score)
                        .appendChild(span)
                        .appendChild(input);
                }
                if (userid_str == current_user) {
                    0;
                } else {
                    const subFrame = document.getElementById(userid_str);
                    //console.log(subFrame);
                    if (subFrame) {
                        subFrame.setAttribute("src", event_data.video);
                    } else {
                        connection.send(JSON.stringify(info_obj));
                        console.log("New video is created");
                        const videoFrame =
                            document.getElementById("videoFrame");
                        const newFrame = document.createElement("img");
                        const div = document.createElement("div");
                        newFrame.setAttribute("id", userid_str);
                        newFrame.setAttribute("src", event_data.video);
                        div.setAttribute("id", "grid" + userid_str);
                        videoFrame.appendChild(newFrame);
                    }
                }
            } else if (event_data.type == "send_user_turn") {
                console.log("now turn " + userid_str);
                const input = document.getElementById("submit_answer");
                const btn = document.getElementById("input_answer");
                if (userid_str != current_user) {
                    input.disabled = true;
                    btn.disabled = true;
                    this.time = 100;
                } else {
                    input.disabled = false;
                    btn.disabled = false;
                    this.timer(userid_str);
                }
            } else if (event_data.type == "delete_frame") {
                const delete_frame = document.getElementById(userid_str);
                if (delete_frame) {
                    delete_frame.parentNode.removeChild(delete_frame);
                }
            } else if (event_data.type == "init") {
                // console.log(typeof event_data);
                // console.log(event_data);
                this.wordUpdate = event_data;
            } else if (event_data.type == "check") {
                console.log(event_data.increment);
                this.wordUpdate = event_data;
                // if (event_data.user == current_user) {
                //     const my_score = document.getElementById(
                //         event_data.user + "_score_val"
                //     );
                //     my_score.value = parseInt(my_score.value) + parseInt(event_data.increment);
                // }
                const my_score = document.getElementById(
                    event_data.user + "_score_val"
                );
                my_score.value =
                    parseInt(my_score.value) + parseInt(event_data.increment);
            } else if (event_data.type == "game_start") {
                const game_start = document.getElementById("game_tart");
                const game_box = document.getElementById("game_box");
                console.log(game_box);
                game_start.style.display = "none";
                game_box.style.position = "position";
            }
        };

        this.processImage();
        //this.updateProgressbar();
    },
    methods: {
        testbutton() {
            this.time--;
        },
        /** 클라이언트 구분을 위해 아이디에 부여할 난수 생성 */
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
        },
        /** 웹소켓 상태 체크 */
        checkWebSocket() {
            if (connection.readyState === WebSocket.CLOSED) {
                console.log("WebSocket CLOSED: Reopening");
                connection = new WebSocket(
                    ws_scheme + "webdev-test.site" + "/ws/" + room_name
                );
            }
        },
        /** 서버에 메세지 보내기 */
        sendMessage(event) {
            const input = document.getElementById("messageText");
            if (input.value.length > 0) {
                const message_obj = {
                    type: "message",
                    message: input.value,
                    userid: current_user,
                };
                connection.send(JSON.stringify(message_obj));
                input.value = "";
            }
            this.send_user_turn();
            event.preventDefault();
        },
        processImage() {
            ctx.drawImage(video, 0, 0, w, h);
            setTimeout(this.processImage, 1);
        },
        sendImage() {
            const rawData = canvas.toDataURL("image/jpeg", 0.5);
            const jsonData = JSON.stringify({
                type: "video",
                video: rawData,
                userid: current_user,
            });
            connection.send(jsonData);
        },
        toggleVideoCamera() {
            console.log(isStreaming);
            if (!isStreaming) {
                console.log("활성화");
                isStreaming = 1;
                this.toggle_text = "카메라 비활성화";
                intervalVid = setInterval(this.sendImage, 15);
            } else {
                console.log("비활성화");
                isStreaming = 0;
                this.toggle_text = "카메라 활성화";
                clearInterval(intervalVid);
            }
        },
        send_user_turn() {
            // console.log(user_tunrs);
            // console.log(user_tunrs[user_turn_count]);
            // console.log("여긴오니?");
            console.log("서버에 턴 요청합니다.");
            const jsonData = JSON.stringify({
                type: "send_user_turn",
                userid: current_user,
            });
            connection.send(jsonData);
            clearTimeout(cur_timer);
        },
        timer(check_user) {
            if (this.time <= 0) {
                this.time = 100;
                if (this.current_user == check_user) {
                    this.send_user_turn();
                }
            } else {
                this.time--;
                cur_timer = setTimeout(this.timer, 50);
            }
        },
        // progressbar
        updateProgressbar() {
            let el = document.getElementById("timerbar");
            let width = (this.time / 100) * 100 + "%";
            width = parseFloat(width).toFixed(2);

            let widthStr = width + "%";
            el.style.width = widthStr;
        },
        boardInit() {
            this.GameStart();

            const jsonData = JSON.stringify({
                type: "game_server",
                method: "POST",
                path: "init",
                params: {
                    type: "init",
                },
            });

            connection.send(jsonData);
            this.send_user_turn();
        },
        answerCheck() {
            const answer_text_box = document.getElementById("input_answer");
            const user_answer = answer_text_box.value;
            const jsonData = JSON.stringify({
                type: "game_server",
                method: "POST",
                path: "check",
                params: {
                    type: "check",
                    answer: user_answer,
                    user: current_user,
                },
            });
            connection.send(jsonData);
            this.send_user_turn();
            answer_text_box.value = "";
        },
        GameStart() {
            const jsonData = JSON.stringify({
                type: "game_start",
                method: "POST",
                path: "check",
                params: {},
            });
            connection.send(jsonData);
        },
    },
};
</script>

<template>
    <head>
        <title>Chat</title>
    </head>
    <body class="containerBody">
        <!-- <div > -->
        <div>
            <!-- <Musicplayer /> -->
            <div class="camContainer">
                <div class="cambarcover">
                    <div class="cambar">
                        <span><b>ID :</b></span>
                        <button class="_button"></button>
                    </div>
                </div>
                <div class="container" id="videoFrame">
                    <div id="{{ my_cam }}">
                        <article>
                            <div style="width: 300px; height: 300px">
                                <canvas id="videoOutput"></canvas>
                            </div>
                        </article>
                    </div>
                    <div>
                        <article><video id="videoInput"></video><br /></article>
                    </div>
                    <br />
                    <!-- <div>
                    <article>
                        <div id="videoFrame"></div>
                    </article>
                </div> -->
                    <!-- img -->
                </div>
            </div>
            <!-- <button class="btn waves-effect" @click="send_user_turn()">
                    게임시작 {{ time }}
                </button> -->
            <button class="btn waves-effect" @click="toggleVideoCamera()">
                {{ toggle_text }}
            </button>
        </div>
        <!-- ############게임화면################# -->
        <div class="gameBox" id="game_box">
            <div>
                <WordCard :msg="wordUpdate" />
                <button id="game_tart" @click="boardInit()">게임 시작</button>
            </div>

            <div>
                <div class="progressBar">
                    <div id="timerbar" class="innerbar"></div>
                </div>
                <!-- <article>
                    <video id="videoInput"></video><br />
                    <button class="btn waves-effect" @click="send_user_turn()">
                        게임시작 {{ time }}
                    </button>
                    <button
                        class="btn waves-effect"
                        @click="toggleVideoCamera()"
                    >
                        {{ toggle_text }}
                    </button>
                    <button class="btn waves-effect" @click="boardInit()">
                        호출테스트
                    </button>
                    <button class="btn waves-effect" @click="answerCheck()">
                        답 체크
                    </button>
                </article>  -->
            </div>

            <div class="answerBox">
                <input
                    type="text"
                    id="input_answer"
                    @keyup.enter="answerCheck()"
                    style="width: 250px; font-size: 2rem"
                />
                <!-- <button
                    style="margin-left: 10px; font-size: 2rem"
                    @click="boardInit()"
                >
                    보드만들기
                </button> -->
                <button
                    id="submit_answer"
                    style="margin-left: 10px; font-size: 2rem"
                    @click="answerCheck()"
                >
                    제출
                </button>
            </div>
            <!-- <button @click="testbutton" >test</button> -->
        </div>

        <!-- ############오른쪽 화면################# -->
        <div class="rightBox">
            <!---------------------점수화면--------------------->
            <div style="height: 200px">
                <div class="barcover">
                    <div class="bar">
                        <span><b>점수</b></span
                        ><button
                            class="_button"
                            @click="ScoreVisible = !ScoreVisible"
                        ></button>
                    </div>
                </div>

                <div v-show="ScoreVisible" class="outer" id="score_board">
                    <div class="blackbox"></div>
                </div>
            </div>

            <!---------------------로그화면--------------------->
            <div style="height: 200px">
                <div class="barcover">
                    <div class="bar">
                        <span><b>정답</b></span
                        ><button
                            class="_button"
                            @click="LogVisible = !LogVisible"
                        ></button>
                    </div>
                </div>
                <div v-show="LogVisible" class="outer"></div>
            </div>
            <!---------------------채팅화면--------------------->

            <div style="height: 500px">
                <div class="barcover">
                    <div class="bar">
                        <span><b>대화</b></span
                        ><button
                            class="_button"
                            @click="ChatVisible = !ChatVisible"
                        ></button>
                    </div>
                </div>
                <div v-show="ChatVisible" class="chatBox">
                    <div class="container">
                        <ul id="messages"></ul>
                        <div class="row" id="footer">
                            <form
                                name="chat-form"
                                action=""
                                @submit.prevent="sendMessage"
                                class="col s12"
                            >
                                <div class="row">
                                    <div
                                        class="input-field col s12"
                                        style="display: inline-flex"
                                    >
                                        <input
                                            type="text"
                                            autocomplete="off"
                                            id="messageText"
                                            class="materialize-textarea"
                                            @click="checkWebSocket(event)"
                                        />
                                        <button
                                            class="btn waves-effect waves-light send-button"
                                            type="submit"
                                            name="action"
                                            id="send_message"
                                            style="background-color: #4a85d9"
                                        >
                                            <i class="material-icons right"
                                                >send</i
                                            >
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- </div> -->
    </body>
</template>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

.video-container {
    display: grid;
}

#videoInput {
    display: none;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}

/* .item1 {
    order: 1;
}
.item2 {
    order: 2;
}
.item3 {
    order: 3;
}
.item4 {
    order: 4;
} */

.containerBody {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
}

.camContainer {
    width: 330px;
    height: 600px;

    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;

    margin-right: 50px;
    margin-left: 70px;

    background: #d9d9d9;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
}

.cambar {
    width: 320px;
    height: 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cambarcover {
    width: 330px;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000000;

    background: linear-gradient(
        351.27deg,
        #ffffff -854.98%,
        #eeeeee -854.98%,
        #cacaca -91.55%
    );
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    border: 1px solid #000000;
}

.gameBox {
    display: flex;
    flex-direction: column;
    position: relative;
}

.progressBar {
    max-width: 660px;
    width: 90%;
    margin: 10px auto;
    /* margin-top: 100px; */
    height: 20px;

    border-radius: 3px;
    background: linear-gradient(#ffffff, #fffffff9);
}

.innerbar {
    max-width: 660px;
    height: 100%;
    text-align: right;
    height: 20px;
    /* same as #progressBar height if we want text middle aligned */
    width: 100%;
    border-radius: 3px;
    background: linear-gradient(#f1f80f, #c9d51a);
}

.answerBox {
    max-width: 600px;
    margin: 10px auto;
    /* margin-top: 100px; */
    height: 60px;
    display: flex;
    justify-items: center;
    border-radius: 3px;
}

.chatBox {
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    width: 300px;
    height: 400px;
    overflow-y: auto;

    background: #d9d9d9;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
}

img {
    margin: 500px;
}

.bar {
    width: 290px;
    height: 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.barcover {
    /* Rectangle 2 */
    width: 300px;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000000;

    background: linear-gradient(
        351.27deg,
        #ffffff -854.98%,
        #eeeeee -854.98%,
        #cacaca -91.55%
    );
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    border: 1px solid #000000;
}

.outer {
    width: 300px;
    height: 150px;
    margin-bottom: 10px;

    background: #d9d9d9;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
}

._button {
    width: 22px;
    height: 20px;
    background-image: url("../assets/gamecomp/_button.png");
    background-size: cover;
    /* object-fit:contain; */
}
#game_tart {
    font-size: 2rem;
    position: absolute;
    left: 40%;
    top: 40%;
}

.score_value:focus {
    outline: none;
}
</style>
