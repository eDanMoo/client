<template>
    <nav>
        <h1 id="enterCode" style="color: white">
            방 입장 코드: {{ enterCode }}
        </h1>
    </nav>
    <div>
        <div class="containerBody">
            <!-- 영상 재생부 -->
            <div id="leftBox">
                <div class="videoWindow">
                    <div class="videoBarCover">
                        <div class="videoBar">
                            <span>내 영상</span>
                            <button class="minBtnDisabled"></button>
                        </div>
                    </div>
                    <div class="videoFrame">
                        <div style="width: 300px; height: fit-content">
                            <canvas
                                v-show="isStreaming"
                                class="videoOutput"
                                id="videoOutput myVideoFrame"
                            ></canvas>
                            <div v-show="!isStreaming">
                                <img
                                    src="../assets/gamecomp/userBlank.jpg"
                                    alt="Camera Off"
                                />
                            </div>
                            <button
                                @click="toggleVideoCamera()"
                                style="width: 90%; margin: 0 5% 5px 5%"
                            >
                                {{ toggle_text }}
                            </button>
                        </div>
                        <div><video id="videoInput"></video></div>
                    </div>
                </div>
            </div>
            <!-- ############게임화면################# -->
            <div class="centerBox" id="centerBox">
                <div class="barCover">
                    <div class="windowBar">
                        <span>놀이판</span>
                        <button class="minBtnDisabled"></button>
                    </div>
                </div>
                <div class="gameWindow" id="gameWindow">
                    <div id="gameBox">
                        <WordCard :msg="wordUpdate" />
                        <button id="game_start" @click="boardInit()">
                            게임 시작
                        </button>
                    </div>
                    <div>
                        <div class="progressBar">
                            <div id="timerbar" class="innerbar"></div>
                        </div>
                    </div>
                    <div class="answerBox">
                        <input
                            type="text"
                            id="input_answer"
                            @keyup.enter="answerCheck()"
                            style="width: 250px; font-size: 2rem"
                        />
                        <button
                            id="submit_answer"
                            style="margin-left: 10px; font-size: 2rem"
                            @click="answerCheck()"
                        >
                            제출
                        </button>
                    </div>
                </div>
            </div>

            <!-- ############오른쪽 화면################# -->
            <div class="rightBox" id="rightBox">
                <!---------------------점수화면--------------------->
                <div class="innerWindow">
                    <div class="barCover">
                        <div class="windowBar">
                            <span>점수</span
                            ><button
                                class="minBtn"
                                @click="ScoreVisible = !ScoreVisible"
                            ></button>
                        </div>
                    </div>
                    <div v-show="ScoreVisible" class="windowOuter">
                        <div class="blackBox" id="socreBoard"></div>
                    </div>
                </div>

                <!---------------------로그화면--------------------->
                <div class="innerWindow">
                    <div class="barCover">
                        <div class="windowBar">
                            <span>기록</span
                            ><button
                                class="minBtn"
                                @click="LogVisible = !LogVisible"
                            ></button>
                        </div>
                    </div>
                    <div v-show="LogVisible" class="windowOuter">
                        <div class="blackBox" id="logBoard"></div>
                    </div>
                </div>
                <!---------------------채팅화면--------------------->

                <div class="innerWindow">
                    <div class="barCover">
                        <div class="windowBar">
                            <span>대화</span
                            ><button
                                class="minBtn"
                                @click="ChatVisible = !ChatVisible"
                            ></button>
                        </div>
                    </div>
                    <div v-show="ChatVisible" class="chatBoxOuter">
                        <div class="chatBox">
                            <div style="width: 100%;">
                                <ul id="messages"></ul>
                                <div class="chatRow" id="footer">
                                    <form
                                        name="chat-form"
                                        action=""
                                        @submit.prevent="sendMessage"
                                    >
                                        <div class="chatRow">
                                            <div
                                                style="
                                                    display: inline-flex;
                                                    width: 100%;
                                                "
                                            >
                                                <input
                                                    type="text"
                                                    autocomplete="off"
                                                    id="messageText"
                                                    class="materialize-textarea"
                                                    @click="
                                                        checkWebSocket(event)
                                                    "
                                                />
                                                <button
                                                    type="submit"
                                                    name="action"
                                                    id="send_message"
                                                    style="
                                                        background-color: #4a85d9;
                                                    "
                                                >
                                                    send
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { onMounted, ref } from "vue";
// import VueSocketIO from "vue-socket.io";

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
// 주석추가33
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
            enterCode: "",
            time: 100,
            ScoreVisible: true,
            LogVisible: true,
            ChatVisible: true,
            wordUpdate: null,
            isStreaming: 1,
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
            this.enterCode = room_name;
            uniqCode = this.getRandomInt(10000, 100000);
            current_user = url_segs[2] + "#" + uniqCode;
            //let send_url = room_name + "/" + current_user;
            //console.log(send_url);

            const socket = new WebSocket(
                // ws_scheme + "webdev-test.site/ws/" + room_name
                "ws://127.0.0.1:8000/ws/" + room_name
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

        intervalVid = setInterval(this.sendImage, 150);

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
                    content_tag.style.color = "#ff0000";
                    message.style.float = "right";
                    content_tag.style.float = "right";
                    userid_tag.style.color = "#9d44f0";
                    userid_tag.style.backgroundColor = "userid_tag";
                } else {
                    userid_tag.setAttribute("class", "userid_tag_left");
                    content_tag.style.color = "#fef769";
                    userid_tag.style.color = "#9d44f0";
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
                    const socreBoard = document.getElementById("socreBoard");
                    const scoreTab = document.createElement("div");
                    const spanUserId = document.createElement("span");
                    const spanScore = document.createElement("span");
                    scoreTab.setAttribute("id", userid_str + "_score");
                    scoreTab.style.display = "flex";
                    scoreTab.style.justifyContent = "space-between";
                    scoreTab.style.margin = "0 2% 0 2%";
                    spanUserId.setAttribute("id", userid_str + "_score_user");
                    spanUserId.innerHTML = userid_str + "&nbsp";
                    spanUserId.setAttribute("class", "_score_user");
                    spanScore.setAttribute("id", userid_str + "_score_val");
                    spanScore.innerText = 0;
                    scoreTab.appendChild(spanUserId);
                    scoreTab.appendChild(spanScore);
                    socreBoard.appendChild(scoreTab);
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
                        // const videoFrame =
                        //     document.getElementById("videoFrame");
                        // const newFrame = document.createElement("img");
                        // newFrame.setAttribute("id", userid_str);
                        // newFrame.setAttribute("class", "videoOutput");
                        // newFrame.setAttribute("src", event_data.video);
                        // videoFrame.appendChild(newFrame);
                        const leftBox = document.getElementById("leftBox");
                        const newFrame =
                            '<div style="width: 320px; display: flex; align-items: center; justify-items: center; flex-direction: column; margin: 0px 5% 10px 5%; background: #d9d9d9;border: 1px solid #000000; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,inset 3px 3px 0px #ffffff;"><div style="width: 100%; height: 30px; display: flex; justify-content: center; align-items: center; border: 1px solid #000000; background: linear-gradient( 351.27deg, #ffffff -854.98%, #eeeeee -854.98%, #cacaca -91.55% ); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000, inset 3px 3px 0px #ffffff; border: 1px solid #000000;"><div style="    width: 90%; height: 30px; display: flex; justify-content: space-between; align-items: center;"><span>' +
                            userid_str +
                            '의 영상</span></div></div><div style="width: 300px; display: flex; flex-wrap: wrap; justify-content: center;"><img style="margin-bottom: 10px" src="' +
                            event_data.video +
                            '" id="' +
                            userid_str +
                            '" style="width: 95%;"/></div></div>';
                        leftBox.insertAdjacentHTML("beforeend", newFrame);
                        const div = document.createElement("div");
                        div.setAttribute("id", "grid" + userid_str);
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
                const game_start = document.getElementById("game_start");
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
                console.log("카메라 활성화");
                isStreaming = 1;
                this.isStreaming = 1;
                this.toggle_text = "카메라 비활성화";
                // intervalVid = setInterval(this.sendImage, 15);
                intervalVid = setInterval(this.sendImage, 30);
            } else {
                console.log("카메라 비활성화");
                isStreaming = 0;
                this.isStreaming = 0;
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

<style scoped>
.containerBody {
    min-width: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

#leftBox, #centerBox, #rightBox {
    flex-basis: 100%;
    margin-bottom: 20px;
}

@media screen and (min-width: 1560px) {
    #leftBox {
        flex-basis: 25%;
    }
    #rightBox {
        flex-basis: 25%;
    }

    #centerBox {
        flex-basis: 45%;
    }
}

@media screen and (max-width: 1560px) {
    #rightBox {
        flex-basis: 45%;
        width: 300px;
        order: 2;
    }
    #leftBox {
        flex-basis: 45%;
        order: 3;
    }
    #centerBox {
        flex-basis: 60%;
        order: 1;
    }
}
.video-container {
    display: grid;
}

#videoInput {
    display: none;
}

.innerWindow {
    width: 90%;
    margin: 0 0 10px 0;
    float: right;
}


.videoWindow {
    width: 320px;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;

    margin: 0px 5% 10px 5%;

    background: #d9d9d9;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
}

.videoBar {
    width: 90%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.videoBarCover {
    width: 100%;
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
    width: 100%;
    height: 100%;
    text-align: right;
    height: 20px;
    /* same as #progressBar height if we want text middle aligned */
    border-radius: 3px;
    background: linear-gradient(#f1f80f, #c9d51a);
}

.answerBox {
    max-width: 100%;
    margin: 10px auto;
    /* margin-top: 100px; */
    height: 5vh;
    min-height: 50px;
    display: flex;
    justify-content: center;
    border-radius: 3px;
}

.chatBox {
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    overflow-y: auto;
    background-color: #000000;
    width: 95%;
    height: 99%;
    min-height: 290px;
}

.chatBoxOuter {
    display: flex;
    justify-content: center;
    width: 100%;
    height: fit-content;
    min-height: 300px;
    max-height: 40vh;
    background: #d9d9d9;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
}
.windowBar {
    width: 100%;
    height: 30px;
    margin: 0 5% 0 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.barCover {
    /* Rectangle 2 */
    width: 100%;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 3px;
    border-right: 3px;
    border-style: solid;
    border-color: #000000;

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

.windowOuter {
    width: 100%;
    height: 30%;
    background: #d9d9d9;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
}

.minBtn {
    width: 22px;
    height: 20px;
    background-image: url("../assets/gamecomp/minBtn.png");
    background-size: cover;
}
.minBtnDisabled {
    width: 22px;
    height: 20px;
    background-image: url("../assets/gamecomp/minBtnDisabled.png");
    background-size: cover;
}
#game_start {
    font-size: 2rem;
    position: absolute;
    left: 40%;
    top: 40%;
}

.blackBox {
    background-color: #000000;
    border: 0px;
    border-left: 2px;
    border-right: 2px;
    border-bottom: 3px;
    border-style: solid;
    border-color: #cacaca;
    color: rgb(255, 139, 68);
}

#rightBox {
    justify-content: end;
    min-width: 300px;
    max-height: 80vh;
}

#leftBox {
    width: 370px;
    min-width: 370px;
    max-height: 80vh;
    overflow-y: scroll;
    overflow-x: hidden;
}
#centerBox {
    width: fit-content;
    max-height: 80vh;
    flex-direction: column;
    position: relative;
}
#gameBox {
    width: 100%;
    height: 100%;
}
.videoFrame {
    width: 300px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
#gameWindow {
    width: 100%;
    height: fit-content;
    background-color: #cacaca;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    margin-bottom: 15px;
}
.chatRow {
    width: 100%;
}
#messageText {
    width: 80%;
}
#send_message {
    width: 20%;
}
</style>
