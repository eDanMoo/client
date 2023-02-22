<template>
    <!-- Music Player -->
    <div id="floatWindow" ref="floatWindow" v-show="openMusicPlayer">
        <div id="playerHeader" @mousedown="dragMouseDown">
            <span style="margin-left: 10px">음악 재생기</span>
            <img
                src="../assets/gamecomp/Xbutton.png"
                style="
                    width: 22px;
                    height: 22px;
                    margin-right: 10px;
                    cursor: pointer;
                "
                alt=""
                @click="closePlayer()"
            />
        </div>
        <div id="audioPlayer">
            <audio ref="playAudio" loop volume="0.6">
                <source
                    v-for="(source, index) in musicSources"
                    :key="index"
                    :src="source.src"
                    :type="source.type"
                />
            </audio>
            <div id="radioPannel">
                <div id="flowBoxWrapper">
                    <div id="flowBox">
                        <span class="musicTitle" id="musicTitle1">{{
                            musicSources[musicIndex].fileName
                        }}</span>
                        <span class="musicTitle" id="musicTitle2">{{
                            musicSources[musicIndex].fileName
                        }}</span>
                    </div>
                </div>
            </div>
            <div id="radioBtnBox">
                <div style="position: absolute; display: flex; margin: 6px">
                    <button
                        class="radioBtn"
                        @click="playMusic()"
                        id="radioPlayBtn"
                    >
                        <img
                            class="btnMark"
                            src="../assets/image/btn_play.png"
                            alt=""
                        />
                    </button>
                    <button
                        class="radioBtn"
                        @click="pauseMusic()"
                        id="radioPauseBtn"
                    >
                        <img
                            class="btnMark"
                            src="../assets/image/btn_pause.png"
                            alt=""
                        />
                    </button>
                    <button
                        class="radioBtn"
                        @click="prevMusic()"
                        id="radioPrevBtn"
                    >
                        <img
                            class="btnMark"
                            src="../assets/image/btn_prev.png"
                            alt=""
                        />
                    </button>
                    <button
                        class="radioBtn"
                        @click="nextMusic()"
                        id="radioNextBtn"
                    >
                        <img
                            class="btnMark"
                            src="../assets/image/btn_next.png"
                            alt=""
                        />
                    </button>
                </div>
            </div>
            <div id="radioVolume">
                <input
                    type="range"
                    ref="volumeSlider"
                    id="volume-slider"
                    max="100"
                    value="60"
                    @input="onVolumeChange"
                />
            </div>
        </div>
    </div>
    <nav style="display: flex; justify-content: space-between">
        <div style="display: flex; align-items: center">
            <img
                src="../assets/image/exit_Icon.svg"
                alt=""
                style="
                    width: 40px;
                    height: 40px;
                    padding-right: 20px;
                    cursor: pointer;
                "
                @click="backHome"
            />
            <h1 id="enterCode" style="color: white">
                {{ time }}방 입장 코드: {{ enterCode }}
            </h1>
        </div>
        <div style="display: flex; align-items: center">
            <div style="width: 80px; height: 80px; overflow: hidden">
                <img
                    v-show="isPlaying"
                    src="../assets/image/playerIcon.png"
                    alt="cdP"
                    id="playerIcon"
                    @click="toggleMusicBox()"
                />
                <img
                    v-show="!isPlaying"
                    src="../assets/image/playerIcon.png"
                    alt="cdP"
                    id="playerIconStop"
                    @click="toggleMusicBox()"
                />
            </div>
            <img
                src="../assets/image/questionIcon.png"
                alt=""
                style="width: 100px; height: 100px; cursor: pointer"
                @click="toggleHowTo()"
            />
        </div>
    </nav>
    <div v-show="showHowTo" class="inGamePopup" id="howToPopup">
        <div class="popupWrapper">
            <div class="popupBar">
                <p style="margin-left: 10px">설명</p>
                <img
                    src="../assets/gamecomp/Xbutton.png"
                    style="
                        width: 22px;
                        height: 22px;
                        margin-right: 10px;
                        cursor: pointer;
                    "
                    alt=""
                    @click="closeHowTo()"
                />
            </div>
            <div class="popupContent">
                <p style="margin: 10px 10px 0 10px">
                    본 게임은 놀이판 내에 존재하는 <br />
                    단어를 없애는 게임입니다. <br />
                    그러나, 놀이판 내에 있는 단어를 <br />
                    직접 입력하면 1점만 얻을 수 있습니다. <br />
                    가능한 많은 단어를 없애려면 <br />
                    많은 단어와 연관있는 단어를 입력해보세요!
                </p>
            </div>
        </div>
    </div>
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
                                id="videoOutput"
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
                        <WordCard
                            :msg="wordUpdate"
                            @scriptCheck="scriptCheck"
                        />
                        <img
                            id="initImage"
                            src="../assets/image/kingSejong.png"
                            alt=""
                            v-show="!isGameStarted"
                        />
                        <button
                            id="game_start"
                            @click="boardInit()"
                            v-show="!isGameStarted"
                        >
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
                            @keypress.enter="answerCheck()"
                            style="width: 250px; height: 38px; font-size: 2rem"
                        />
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
                            <div style="width: 100%">
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
                                                    보내기
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

let first_turn = "";

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
            // musicPlayer
            openMusicPlayer: 1,
            musicSources: [
                {
                    fileName: "Welcome Player! - Visager.ogg",
                    src: "../src/assets/music/Welcome Player! - Visager.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Kevin MacLeod - Pixelland.ogg",
                    src: "../src/assets/music/Kevin MacLeod - Pixelland.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "The Whole Other - 8-Bit Dreamscape.ogg",
                    src: "../src/assets/music/The Whole Other - 8-Bit Dreamscape.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Kubbi - Up In My Jam.ogg",
                    src: "../src/assets/music/Kubbi - Up In My Jam.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Kevin MacLeod - 8bit Dungeon Boss.ogg",
                    src: "../src/assets/music/Kevin MacLeod - 8bit Dungeon Boss.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Move Along - SpaceRazzer.ogg",
                    src: "../src/assets/music/Move Along - SpaceRazzer.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "SPring - RoccoW.ogg",
                    src: "../src/assets/music/SPring - RoccoW.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "17092017 - RoccoW.ogg",
                    src: "../src/assets/music/17092017 - RoccoW.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Kevin MacLeod - Itty Bitty 8 Bit.ogg",
                    src: "../src/assets/music/Kevin MacLeod - Itty Bitty 8 Bit.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Splash - Spiff Tune.ogg",
                    src: "../src/assets/music/Splash - Spiff Tune.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Monplaisir - Soundtrack.ogg",
                    src: "../src/assets/music/Monplaisir - Soundtrack.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Vibe Mountain - Operatic 3.ogg",
                    src: "../src/assets/music/Vibe Mountain - Operatic 3.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "8 Bit Win! - HeatleyBros.ogg",
                    src: "../src/assets/music/8 Bit Win! - HeatleyBros.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "PhilosophicalSongTitle - RoccoW.ogg",
                    src: "../src/assets/music/PhilosophicalSongTitle - RoccoW.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "F cking Moths - RoccoW.ogg",
                    src: "../src/assets/music/F cking Moths - RoccoW.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Jeremy Blake - Powerup!.ogg",
                    src: "../src/assets/music/Jeremy Blake - Powerup!.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName:
                        "Jam Jam Jam Said The Owner Of The Shop - RoccoW.ogg",
                    src: "../src/assets/music/Jam Jam Jam Said The Owner Of The Shop - RoccoW.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Quincas Moreira - Robot City.ogg",
                    src: "../src/assets/music/Quincas Moreira - Robot City.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Green Greens' Starry Skies - RoccoW.ogg",
                    src: "../src/assets/music/Green Greens' Starry Skies - RoccoW.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Messeah - RoccoW.ogg",
                    src: "../src/assets/music/Messeah - RoccoW.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Chiptune Dream - Tim Beek.ogg",
                    src: "../src/assets/music/Chiptune Dream - Tim Beek.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Krayzius & Brainstorm - Virtual Boy.ogg",
                    src: "../src/assets/music/Krayzius & Brainstorm - Virtual Boy.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Wasted Panther - HolFix.ogg",
                    src: "../src/assets/music/Wasted Panther - HolFix.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "RGB - Stevia Sphere.ogg",
                    src: "../src/assets/music/RGB - Stevia Sphere.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "William Rosati - Floating Also.ogg",
                    src: "../src/assets/music/William Rosati - Floating Also.ogg",
                    type: "audio/ogg",
                },
            ],
            musicIndex: 0,
            isPlaying: 0,
            pos1: 0,
            pos2: 0,
            pos3: 0,
            pos4: 0,
            showHowTo: 0,
            isGameStarted: 0,
        };
    },
    watch: {
        time() {
            this.updateProgressbar();
        },
    },
    created() {},
    unmounted() {
        connection.close();
    },
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
                ws_scheme + "webdev-test.site/ws/" + room_name
                //"ws://127.0.0.1:8888/ws/" + room_name
            );
            socket.addEventListener("open", () => {
                console.log("socket connect");
                resolve(socket);
            });
            socket.addEventListener("error", (error) => {
                console.log("Websocket connect error");
                alert("게임서버와의 연결이 종료되었습니다.");
                location.href = "/";
                reject(error);
            });
            socket.addEventListener("close", (event) => {
                console.log("WebSocket connection closed:", event);
                alert("게임서버와의 연결이 종료되었습니다.");
                location.href = "/";
            });
        });

        isStreaming = 1;

        intervalVid = setInterval(this.sendImage, 30);

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
                            '<div id="' +
                            userid_str +
                            '_frame" style="width: 320px; display: flex; align-items: center; justify-items: center; flex-direction: column; margin: 0px 5% 10px 5%; background: #d9d9d9;border: 1px solid #000000; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,inset 3px 3px 0px #ffffff;"><div style="width: 100%; height: 30px; display: flex; justify-content: center; align-items: center; border: 1px solid #000000; background: linear-gradient( 351.27deg, #ffffff -854.98%, #eeeeee -854.98%, #cacaca -91.55% ); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000, inset 3px 3px 0px #ffffff; border: 1px solid #000000;"><div style="    width: 90%; height: 30px; display: flex; justify-content: space-between; align-items: center;"><span>' +
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
                const btn = document.getElementById("input_answer");
                if (userid_str != current_user) {
                    btn.disabled = true;
                    this.time = 100;
                } else {
                    this.time = 100;
                    btn.disabled = false;
                }
            } else if (event_data.type == "delete_frame") {
                const delete_frame = document.getElementById(
                    userid_str + "_frame"
                );
                const delete_score_user = document.getElementById(
                    userid_str + "_score_user"
                );
                const delete_score_val = document.getElementById(
                    userid_str + "_score_val"
                );
                if (delete_frame) {
                    delete_frame.parentNode.removeChild(delete_frame);
                    delete_score_user.parentNode.removeChild(delete_score_user);
                    delete_score_val.parentNode.removeChild(delete_score_val);
                }
            } else if (event_data.type == "init") {
                // console.log(typeof event_data);
                // console.log(event_data);
                this.wordUpdate = event_data;
                first_turn = event_data.users[0];
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
                my_score.innerText =
                    parseInt(my_score.innerText) +
                    parseInt(event_data.increment);
            } else if (event_data.type == "game_start") {
                const game_start = document.getElementById("game_start");
                const game_box = document.getElementById("game_box");
                const sejong_img = document.getElementById("initImage");
                console.log(game_box);
                game_start.style.display = "none";
                sejong_img.style.display = "none";
                game_box.style.position = "position";
            } else if (event_data.type == "game_ing") {
                alert("이미 진행중인 게임입니다.");
                connection.close();
            } else if (event_data.type == "limit_time_start") {
                //console.log(event_data.remain_time);
                if (
                    first_turn == current_user &&
                    event_data.remain_time == "5"
                ) {
                    console.log("전체타이머 받았으니 턴 요청");
                    this.send_user_turn();
                }
                if (event_data.remain_time == "0") {
                    console.log("죽여?");
                    clearTimeout(cur_timer);
                }
            } else if (event_data.type == "turn_timer") {
                //턴이 누군지랑 몇초 인지 전달받음 userid_str
                const answer_text_box = document.getElementById("input_answer");
                if (userid_str == current_user) {
                    // 해당 턴이 내 턴이면 타이머 반영
                    answer_text_box.disabled = false;
                    this.time = event_data.remain_time;
                    if (this.time == 0) {
                        this.send_user_turn();
                        this.time = 100;
                        answer_text_box.disabled = true;
                    }
                } else {
                    answer_text_box.disabled = true;
                }
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
        send_user_turn(user = "") {
            const jsonData = JSON.stringify({
                type: "get_timer",
                next_user: user,
                userid: current_user,
            });

            connection.send(jsonData);
        },
        scriptCheck(msg, answer_user = "") {
            if (msg == "init") {
                //보드 다 만들었으면 전체 타이머 시작
                if (first_turn == current_user) {
                    this.getLimitTimer();
                }
            } else if (msg == "check" && answer_user == current_user) {
                // 단어 체크 해서 끝났으면 타이머
                this.send_user_turn("true");
                this.time = 100;
            }
        },
        getLimitTimer() {
            const jsonData = JSON.stringify({
                type: "limit_time_start",
            });

            connection.send(jsonData);
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
            const audio = new Audio("../src/assets/soundEffect/gameStart.mp3");
            audio.play();
            this.isGameStarted = 1;

            const jsonData = JSON.stringify({
                type: "game_server",
                method: "POST",
                path: "init",
                params: {
                    type: "init",
                },
            });

            connection.send(jsonData);
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
        // musicPlayer Methods
        musicPlay() {
            this.$refs.playAudio.play();
        },
        musicPause() {
            this.$refs.playAudio.pause();
        },
        playMusic() {
            this.isPlaying = 1;
            document.getElementById("radioPlayBtn").style.backgroundImage =
                "url('../src/assets/image/btn_insert.png')";
            document.getElementById("radioPauseBtn").style.backgroundImage =
                "url('../src/assets/image/btn_pop.png')";
            this.musicPlay();
        },
        pauseMusic() {
            this.isPlaying = 0;
            document.getElementById("radioPlayBtn").style.backgroundImage =
                "url('../src/assets/image/btn_pop.png')";
            document.getElementById("radioPauseBtn").style.backgroundImage =
                "url('../src/assets/image/btn_insert.png')";
            this.musicPause();
        },
        reloadMusic() {
            this.$refs.playAudio.src = this.musicSources[this.musicIndex].src;
            this.$refs.playAudio.load();
            if (this.isPlaying) {
                this.musicPlay();
            }
        },
        nextMusic() {
            if (this.musicIndex == 24) {
                this.musicIndex = 0;
            } else {
                this.musicIndex++;
            }
            this.reloadMusic();
        },
        prevMusic() {
            if (this.musicIndex == 0) {
                this.musicIndex = 24;
            } else {
                this.musicIndex--;
            }
            this.reloadMusic();
        },
        onVolumeChange(event) {
            const audio = this.$refs.playAudio;
            const gradientValue = 100 / event.target.max;
            audio.volume = (gradientValue * event.target.value) / 100;
            event.target.style.background = `linear-gradient(to right, #0054e6 0%, #0054e6 ${
                gradientValue * event.target.value
            }%, rgb(62, 62, 62) ${
                gradientValue * event.target.value
            }%, rgb(62, 62, 62) 100%)`;
        },
        dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;
            document.onmouseup = this.closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = this.elementDrag;
        },
        elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            this.pos1 = this.pos3 - e.clientX;
            this.pos2 = this.pos4 - e.clientY;
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;
            // set the element's new position:
            this.$refs.floatWindow.style.top =
                Math.max(
                    Math.min(
                        this.$refs.floatWindow.offsetTop - this.pos2,
                        window.innerHeight - 150
                    ),
                    -150
                ) + "px";
            this.$refs.floatWindow.style.left =
                Math.max(
                    Math.min(
                        this.$refs.floatWindow.offsetLeft - this.pos1,
                        window.innerWidth - 150
                    ),
                    -500
                ) + "px";
        },
        closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        },
        toggleMusicBox() {
            this.openMusicPlayer = (this.openMusicPlayer + 1) % 2;
            this.$refs.floatWindow.style.top = "50px";
            this.$refs.floatWindow.style.left = "50px";
        },
        closePlayer() {
            this.openMusicPlayer = 0;
        },
        toggleHowTo() {
            this.showHowTo = (this.showHowTo + 1) % 2;
        },
        closeHowTo() {
            this.showHowTo = 0;
        },
        backHome() {
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
@font-face {
    font-family: "Dunggeunmo";
    src: url("../assets/font/DungGeunMo.ttf");
}

button {
    font-family: "Dunggeunmo";
}
.containerBody {
    min-width: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

#leftBox,
#centerBox,
#rightBox {
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
    border-style: dashed;
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
    background: linear-gradient(#ffac2e, #ffcf3e, #ffac2e);
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
    max-width: 800px;
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
/*############################### Music Player */
@font-face {
    font-family: "retroFont";
    src: url("../assets/font/digital.ttf") format("truetype");
}
@keyframes scrollText {
    from {
        transform: translateX(0px);
        -moz-transform: translateX(0px);
        -webkit-transform: translateX(0px);
        -o-transform: translateX(0px);
        -ms-transform: translateX(0px);
    }
    to {
        transform: translateX(-697px);
        -moz-transform: translateX(-697px);
        -webkit-transform: translateX(-697px);
        -o-transform: translateX(-697px);
        -ms-transform: translateX(-697px);
    }
}

#floatWindow {
    position: absolute;
    z-index: 9;
    background-color: #f1f1f1;
    border: 2px solid #000000;
    text-align: center;
    box-shadow: 4px 4px 4px 2px #121212;
    left: 50px;
    top: 50%;
}

#playerHeader {
    width: 755px;
    height: 30px;
    cursor: move;
    z-index: 10;
    background-color: #003a9f;
    color: #fff;
    border-width: 3px 5px 0px 3px;
    border-style: solid;
    border-color: #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#flowBoxWrapper {
    width: 697px;
    overflow: hidden;
    word-break: nowrap;
}

#flowBox {
    width: 1394px;
    display: flex;
    justify-content: space-between;
    word-break: nowrap;
    animation: scrollText 10s linear infinite;
}

.musicTitle {
    width: 697px;
    color: #afffb3;
    font-family: "retroFont";
    font-size: 1.2rem;
    word-break: nowrap;
    text-shadow: -1px 0 #d0ffd2, 0 1px #d0ffd2, 1px 0 #d0ffd2, 0 -1px #d0ffd2;
}

.time {
    color: #ffffff;
}

#audioPlayer {
    width: 755px;
    height: 307.3px;
    background: linear-gradient(180deg, #c6c6c6 -15.29%, #ffffff 116.66%);
    border-width: 3px 5px 7px 3px;
    border-style: solid;
    border-color: #000000;
}
#radioPannel {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 709px;
    height: 102px;
    margin: 0 auto;
    margin-top: 20px;
    background-image: url("../assets/image/radio_pannel.png");
    background-size: cover;
}
#radioBtnBox {
    width: 709px;
    height: 87px;
    margin: 0 auto;
    margin-top: 15px;
    background-image: url("../assets/image/radio_btnBox.png");
    background-size: cover;
}
#radioVolume {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 709px;
    height: 42px;
    margin: 0 auto;
    margin-top: 15px;
    background-image: url("../assets/image/radio_volume.png");
    background-size: cover;
}
.radioBtn {
    width: 174px;
    height: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/image/btn_pop.png");
    background-size: cover;
}

#volume-slider {
    -webkit-appearance: none; /* 기본 적용 CSS 방지 */
    width: 98%;
    border-radius: 1px; /* 슬라이더 모서리 */
    float: left;
    outline: none;
    height: 70%;
    cursor: pointer;
    background: linear-gradient(
        to right,
        #0054e6 0%,
        #0054e6 60%,
        #3e3e3e 60%,
        #3e3e3e 100%
    );
    outline: none; /* 슬라이더 테두리 없이 */
}

#volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* 기본 CSS 스타일을 적용하지 않기 위해서 */
    appearance: none; /* 기본 CSS 스타일을 적용하지 않기 위해서 */
    width: 25px; /* 슬라이더 핸들 길이 */
    height: 29.5px; /* 슬라이더 핸들 높이 */
    border-radius: 0%; /* 핸들 모양을 원모양으로 만들기 위함 */
    background: url("../assets/image/slider_btn.png"); /* 슬라이더 핸들 색상 */
    cursor: pointer; /* 슬라이더 핸들에 마우스를 갖다대면 포인터로 변경 */
}
#volume-slider::-moz-ramge-thumb {
    -webkit-appearance: none; /* 기본 CSS 스타일을 적용하지 않기 위해서 */
    appearance: none; /* 기본 CSS 스타일을 적용하지 않기 위해서 */
    width: 25px; /* 슬라이더 핸들 길이 */
    height: 29.5px; /* 슬라이더 핸들 높이 */
    border-radius: 0%; /* 핸들 모양을 원모양으로 만들기 위함 */
    background: url("../assets/image/slider_btn.png"); /* 슬라이더 핸들 색상 */
    cursor: pointer; /* 슬라이더 핸들에 마우스를 갖다대면 포인터로 변경 */
}
@keyframes rotation {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}
#playerIcon {
    width: 80px;
    height: 80px;
    animation: rotation 2s infinite linear;
    cursor: pointer;
}
#playerIconStop {
    width: 80px;
    height: 80px;
    cursor: pointer;
}
.inGamePopup {
    position: absolute;
    float: inline-start;
    top: 80px;
    right: 5vw;
    width: 400px;
    min-height: 200px;
    height: fit-content;
    max-height: 50vh;
    overflow-y: scroll;
    background-color: #cacaca;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    z-index: 10;
    display: flex;
    justify-self: center;
    align-items: center;
}
.popupBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    width: 100%;
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
.popupWrapper {
    width: 100%;
    min-height: 200px;
    height: 100%;
}

#initImage {
    width: 600px;
    height: 600px;
    left: 3vw;
    top: 120px;
    position: absolute;
}
</style>
