<template>
    <div id="inGameContainer space stars1">
        <div class="main"></div>
        <div class="chuvaMeteoro"></div>
        <!-- Game End Pop -->
        <div>
            <modal
                v-if="this.openModal == true"
                @sendClose="closeModalView"
                :msg="game_over"
                style="z-index: 1000"
            />
        </div>
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
                    <div class="flowBoxWrapper">
                        <div class="flowBox">
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
                    <div class="radioBtnWrapper">
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
        <!-- Nav Bar -->
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
                    방 입장 코드: {{ enterCode }}
                </h1>
            </div>
            <div style="display: flex; align-items: center">
                <h1
                    style="
                        color: white;
                        font-size: 3.5rem;
                        margin-bottom: unset;
                        margin-top: unset;
                    "
                >
                    {{ game_time }}
                </h1>
            </div>
            <div style="display: flex; align-items: center">
                <div
                    class="flowBoxWrapper"
                    style="width: 15vw"
                    v-show="isPlaying && !openMusicPlayer"
                >
                    <div class="flowBox">
                        <span class="musicTitle" id="musicTitle3">{{
                            musicSources[musicIndex].fileName
                        }}</span>
                        <span class="musicTitle" id="musicTitle4">{{
                            musicSources[musicIndex].fileName
                        }}</span>
                    </div>
                </div>
                <div
                    v-show="!openMusicPlayer"
                    style="
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: 2px solid rgb(22, 255, 255);
                        border-radius: 5px;
                        margin: 10px;
                    "
                    @click="toggleMusic()"
                >
                    <button
                        v-show="!isPlaying"
                        style="
                            cursor: pointer;
                            box-sizing: border-box;
                            background-color: transparent;
                            border-top: 12.5px transparent;
                            border-bottom: 12.5px transparent;
                            border-left: 25px rgb(22, 255, 255);
                            border-right: 0px transparent;
                            border-style: solid;
                            margin-left: 10px;
                        "
                    ></button>
                    <button
                        v-show="isPlaying"
                        style="
                            cursor: pointer;
                            height: 30px;
                            background-color: transparent;
                            border-top: 0 transparent;
                            border-bottom: 0 transparent;
                            border-left: 7px rgb(22, 255, 255);
                            border-right: 7px rgb(22, 255, 255);
                            border-style: solid;
                        "
                    ></button>
                </div>
                <div
                    style="
                        width: 80px;
                        height: 80px;
                        overflow: hidden;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    "
                >
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
                    style="
                        width: 30px;
                        height: 45px;
                        cursor: pointer;
                        margin: 10px;
                        margin-right: 40px;
                    "
                    @click="toggleHowTo()"
                />
            </div>
        </nav>
        <!-- How To -->
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
        <div class="containerBody">
            <!-- 영상 재생부 -->
            <Transition name="left">
                <div
                    class="toggleBtn"
                    style="
                        position: absolute;
                        left: 0px;
                        width: 30px;
                        display: flex;
                        justify-content: end;
                    "
                    @click="toggleLeft()"
                    v-show="!isOpenLeft"
                >
                    <span> > </span>
                </div>
            </Transition>
            <Transition name="right">
                <div
                    class="toggleBtn"
                    style="position: absolute; right: 0px; width: 30px"
                    @click="toggleRight()"
                    v-show="!isOpenRight"
                >
                    <span> &lt; </span>
                </div>
            </Transition>
            <Transition name="left">
                <div id="leftBox" v-show="isOpenLeft">
                    <!-- 닫기 버튼 -->
                    <div class="toggleBtn" @click="toggleLeft()">
                        <span>참여자 영상</span>
                        <span> &lt; </span>
                    </div>
                    <div class="videoWindow">
                        <div class="videoBarCover">
                            <div class="videoBar">
                                <span style="color: rgb(22, 255, 94)"
                                    >내 영상</span
                                >
                            </div>
                        </div>
                        <div class="videoFrame">
                            <div class="videoStreaming">
                                <canvas
                                    v-show="isStreaming"
                                    class="videoOutput"
                                    id="videoOutput"
                                ></canvas>
                                <div v-show="!isStreaming">
                                    <img
                                        src="../assets/gamecomp/userBlank.jpg"
                                        alt="Camera Off"
                                        style="width: 300px; height: 240px"
                                    />
                                </div>
                            </div>
                            <button
                                class="hoverButton"
                                @click="toggleVideoCamera()"
                            >
                                {{ toggle_text }}
                            </button>
                            <div><video id="videoInput"></video></div>
                        </div>
                    </div>
                </div>
            </Transition>
            <!-- ############게임화면################# -->
            <div class="centerBox" id="centerBox">
                <div class="gameWindow" id="gameWindow">
                    <div id="gameBox">
                        <component :is="game_mode" :msg="wordUpdate" :delete_board="delete_board" @scriptCheck="scriptCheck"></component>
                        <button @click="loadComponent('WordCard')" v-show="!isGameStarted">경쟁</button>
                        <button @click="loadComponent('Login')" v-show="!isGameStarted">협동</button>
                        <!-- <WordCard
                            :msg="wordUpdate"
                            :delete_board="delete_board"
                            @scriptCheck="scriptCheck"
                        /> -->
                        <button
                            id="game_start"
                            @click="boardInit()"
                            v-show="!isGameStarted && game_selected"
                        ></button>
                    </div>
                </div>
            </div>
            <!-- ############오른쪽 화면################# -->
            <Transition name="right">
                <div class="rightBox" id="rightBox" v-show="isOpenRight">
                    <!--------------------- 닫기 버튼 ------------------>
                    <div class="toggleBtn" @click="toggleRight()">
                        <span> > </span>
                        <span>정보</span>
                    </div>
                    <!---------------------점수화면--------------------->
                    <div class="innerWindow">
                        <div class="barCover">
                            <div class="windowBar">
                                <span>점수</span
                                ><button
                                    class="minBtn"
                                    @click="ScoreVisible = !ScoreVisible"
                                    v-show="ScoreVisible"
                                >
                                    -
                                </button>
                                <button
                                    class="minBtn"
                                    @click="ScoreVisible = !ScoreVisible"
                                    v-show="!ScoreVisible"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div v-show="ScoreVisible" class="windowOuter">
                            <div class="blackBox" id="scoreBoard"></div>
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
                                    v-show="LogVisible"
                                >
                                    -
                                </button>
                                <button
                                    class="minBtn"
                                    @click="LogVisible = !LogVisible"
                                    v-show="!LogVisible"
                                >
                                    +
                                </button>
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
                                    v-show="ChatVisible"
                                >
                                    -
                                </button>
                                <button
                                    class="minBtn"
                                    @click="ChatVisible = !ChatVisible"
                                    v-show="!ChatVisible"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div v-show="ChatVisible" class="chatBoxOuter">
                            <div class="chatBox">
                                <div class="chatBoxChat" id="chatBoxChat">
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
                                                        width: 95%;
                                                        position: absolute;
                                                        bottom: 4px;
                                                        height: 20px;
                                                    "
                                                >
                                                    <input
                                                        type="text"
                                                        autocomplete="off"
                                                        id="messageText"
                                                        class="materialize-textarea"
                                                        @click="
                                                            checkWebSocket(
                                                                event
                                                            )
                                                        "
                                                    />
                                                    <button
                                                        type="submit"
                                                        name="action"
                                                        id="send_message"
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
            </Transition>
            <!-- 오른쪽 끝 -->
        </div>
        <div class="answerArea">
            <div class="answerLine"></div>
            <div class="innerAnswer">
                <div>
                    <div class="progressBar">
                        <div id="timerbar" class="innerbar"></div>
                    </div>
                </div>
                <div class="answerBox">
                    <input
                        type="text"
                        id="input_answer"
                        disabled
                        @keypress.enter="answerCheck()"
                        style="width: 250px; height: 38px; font-size: 2rem"
                    />
                </div>
            </div>
            <div class="answerLine"></div>
        </div>
    </div>
</template>

<script>
// import { onMounted, ref } from "vue";
// import VueSocketIO from "vue-socket.io";
//import WordCard from "../components/WordCard.vue";
import modal from "../components/ResultPop.vue";
import { defineAsyncComponent } from "vue";
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
    h = 240;
// navigator.mediaDevices.getUserMedia =
//     navigator.mediaDevices.getUserMedia ||
//     navigator.mediaDevices.webkitGetUserMedia ||
//     navigator.mediaDevices.mozGetUserMedia;

const constraints = { audio: false, video: true };
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

let process_image = "";

export default {
    name: "cam_comp",
    components: {
        modal,
    },
    data() {
        return {
            isOpenLeft: true,
            isOpenRight: true,
            data: null,
            my_cam: current_user,
            toggle_text: "카메라 비활성화",
            enterCode: "",
            time: 100,
            game_time: null,
            ScoreVisible: true,
            LogVisible: true,
            ChatVisible: true,
            wordUpdate: null,
            game_over: null,
            delete_board: 0,
            isStreaming: 1,
            // Game End Pop
            openModal: false,
            // musicPlayer
            openMusicPlayer: 0,
            game_mode: "WordCard",
            game_mode_text: "",
            musicSources: [
                {
                    fileName: "Welcome Player! - Visager.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Welcome+Player!+-+Visager.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "8 Bit Win! - HeatleyBros.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/8+Bit+Win!+-+HeatleyBros.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Kevin MacLeod - Pixelland.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Kevin+MacLeod+-+Pixelland.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "The Whole Other - 8-Bit Dreamscape.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/The+Whole+Other+-+8-Bit+Dreamscape.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Kubbi - Up In My Jam.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Kubbi+-+Up+In+My+Jam.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Kevin MacLeod - 8bit Dungeon Boss.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Kevin+MacLeod+-+8bit+Dungeon+Boss.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Move Along - SpaceRazzer.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Move+Along+-+SpaceRazzer.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "SPring - RoccoW.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/SPring+-+RoccoW.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "17092017 - RoccoW.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/17092017+-+RoccoW.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Kevin MacLeod - Itty Bitty 8 Bit.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Kevin+MacLeod+-+Itty+Bitty+8+Bit.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Splash - Spiff Tune.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Splash+-+Spiff+Tune.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Monplaisir - Soundtrack.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Monplaisir+-+Soundtrack.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Vibe Mountain - Operatic 3.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Vibe+Mountain+-+Operatic+3.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "PhilosophicalSongTitle - RoccoW.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/PhilosophicalSongTitle+-+RoccoW.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "F cking Moths - RoccoW.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/F+cking+Moths+-+RoccoW.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Jeremy Blake - Powerup!.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Jeremy+Blake+-+Powerup!.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName:
                        "Jam Jam Jam Said The Owner Of The Shop - RoccoW.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Jam+Jam+Jam+Said+The+Owner+Of+The+Shop+-+RoccoW.ogg.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Quincas Moreira - Robot City.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Quincas+Moreira+-+Robot+City.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Green Greens' Starry Skies - RoccoW.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Green+Greens'+Starry+Skies+-+RoccoW.ogg.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Messeah - RoccoW.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Messeah+-+RoccoW.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Chiptune Dream - Tim Beek.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Chiptune+Dream+-+Tim+Beek.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Krayzius & Brainstorm - Virtual Boy.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Krayzius+%26+Brainstorm+-+Virtual+Boy.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "Wasted Panther - HolFix.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/Wasted+Panther+-+HolFix.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "RGB - Stevia Sphere.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/RGB+-+Stevia+Sphere.ogg",
                    type: "audio/ogg",
                },
                {
                    fileName: "William Rosati - Floating Also.ogg",
                    src: "https://koword-file-server.s3.ap-northeast-2.amazonaws.com/music/William+Rosati+-+Floating+Also.ogg",
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
            game_selected: 0,
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
        document.body.style.background =
            "radial-gradient(circle at bottom, rgb(10, 10, 60) 0, black 100%)";
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

            room_name = url_segs[1];
            this.enterCode = room_name;
            uniqCode = this.getRandomInt(10000, 100000);
            current_user = url_segs[2] + "#" + uniqCode;

            const socket = new WebSocket(
                // ws_scheme + "webdev-test.site/ws/" + room_name
                "ws://127.0.0.1:8888/ws/" + room_name
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

        messages = document.getElementById("messages");

        video = document.getElementById("videoInput");

        video.width = w;
        video.height = h;

        canvas = document.getElementById("videoOutput");

        canvas.width = w;
        canvas.height = h;

        ctx = canvas.getContext("2d");

        const info_obj = {
            type: "info",
            video_status: true,
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
                const content_tag = document.createElement("div");
                content_tag.appendChild(text);
                content_tag.setAttribute("class", "content_tag");

                const userid_tag = document.createElement("div");
                userid_tag.appendChild(userid);
                userid_tag.setAttribute("class", "userid_tag");

                if (userid_str == current_user) {
                    userid_tag.setAttribute("class", "userid_tag_right");
                    content_tag.style.color = "rgb(255, 152, 78)";
                    message.style.float = "right";
                    content_tag.style.float = "right";
                    userid_tag.style.color = "#9d44f0";
                    userid_tag.style.backgroundColor = "userid_tag";
                } else {
                    userid_tag.setAttribute("class", "userid_tag_left");
                    content_tag.style.color = "rgb(255, 152, 78)";
                    userid_tag.style.color = "#9d44f0";
                    message.style.float = "left";
                    content_tag.style.float = "left";
                }
                message.appendChild(content_tag);
                message.appendChild(userid_tag);
                messages.appendChild(message);
                document.getElementById("chatBoxChat").scrollTop = 999999999;
            } else if (event_data.type == "video") {
                if (userid_str == current_user) {
                    0;
                } else {
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
                const check_score_input = document.getElementById(
                    userid_str + "_score"
                );
                if (!check_score_input) {
                    const scoreBoard = document.getElementById("scoreBoard");
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
                    scoreBoard.appendChild(scoreTab);
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
                            '_frame" style="width: 340px; display: flex; align-items: center; justify-items: center; flex-direction: column; border: 1px solid rgb(22, 255, 94); box-sizing: border-box;"><div style="width: 100%; height: 30px; display: flex; justify-content: center; align-items: center; border: 1px solid rgb(22, 255, 94);"><div style="width: 90%; height: 30px; display: flex; justify-content: space-between; align-items: center;"><span style="color: rgb(22, 255, 94); font-size: 1.5rem">' +
                            userid_str +
                            '의 영상</span></div></div><div style="width: 300px; display: flex; flex-wrap: wrap; justify-content: center;"><img style="margin: 10px" src="' +
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
                    this.time = 12;
                } else {
                    this.time = 12;
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
                this.isGameStarted = 1;
                this.delete_board = 0;
            } else if (event_data.type == "check") {
                console.log(event_data.increment);
                this.wordUpdate = event_data;

                const my_score = document.getElementById(
                    event_data.user + "_score_val"
                );
                my_score.innerText =
                    parseInt(my_score.innerText) +
                    parseInt(event_data.increment);

                this.isGameStarted = 1;

                const log_board = document.getElementById("logBoard");

                const log_tab = document.createElement("div");
                const span_user_id = document.createElement("span");
                const span_user_input = document.createElement("span");
                const span_remove_word = document.createElement("span");

                log_tab.style.display = "flex";
                log_tab.style.justifyContent = "space-between";
                log_tab.style.margin = "0 2% 0 2%";
                log_tab.id = "log_tab";
                span_remove_word.style.textAlign = "right";
                span_remove_word.style.width = "250px";
                span_remove_word.style.wordBreak = "keep-all";

                span_user_id.innerText = event_data.user;
                span_user_input.innerText = event_data.answer;

                event_data.removedWords.forEach((element) => {
                    span_remove_word.innerHTML += element + " ";
                });

                //log_tab.appendChild(span_user_id);
                log_tab.appendChild(span_user_input);
                log_tab.appendChild(span_remove_word);
                log_board.appendChild(log_tab);
                log_board.scrollTop = 9999999;
            } else if (event_data.type == "game_start") {
                const game_start = document.getElementById("game_start");
                const game_box = document.getElementById("game_box");
                const sejong_img = document.getElementById("initImage");
                console.log(game_box);
                game_start.style.display = "none";
                sejong_img.style.display = "none";
                game_box.style.position = "position";
            } else if (event_data.type == "game_ing") {
                connection.close();
                alert("이미 진행중인 게임입니다.");
            } else if (event_data.type == "limit_time_start") {
                //console.log(event_data.remain_time);
                this.game_time = event_data.remain_time;
                if (
                    first_turn == current_user &&
                    event_data.remain_time == "60"
                ) {
                    console.log("전체타이머 받았으니 턴 요청");
                    this.send_user_turn();
                }
            } else if (event_data.type == "turn_timer") {
                //턴이 누군지랑 몇초 인지 전달받음 userid_str
                const answer_text_box = document.getElementById("input_answer");
                if (userid_str == current_user) {
                    // 해당 턴이 내 턴이면 타이머 반영
                    answer_text_box.disabled = false;
                    answer_text_box.focus();
                    this.time = event_data.remain_time;
                    if (this.time == 0) {
                        this.send_user_turn();
                        this.time = 12;
                        answer_text_box.disabled = true;
                    }
                } else {
                    answer_text_box.disabled = true;
                }
            } else if (event_data.type == "finish") {
                this.game_over = event_data;
                this.modalOpen();
                this.delete_board = 1;
                this.isGameStarted = 0;
                this.game_time = null;
                // todo. 여기 아이디가 다 같아서 안지워지는 문제임
                const log_tab = document.getElementById("log_tab");
                log_tab.parentNode.removeChild(log_tab);

                const answer_text_box = document.getElementById("input_answer");
                answer_text_box.disabled = true;
                this.time = 12;
            } else if (event_data.type == "video_off") {
                if (current_user != userid_str) {
                    const subFrame = document.getElementById(userid_str);
                    if (subFrame) {
                        subFrame.style.display = "none";
                    }
                }
            } else if (event_data.type == "video_on") {
                if (current_user != userid_str) {
                    const subFrame = document.getElementById(userid_str);
                    if (subFrame) {
                        subFrame.style.removeProperty("display");
                    }
                }
            }
        };
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            this.checkWebcam();
        } else {
            console.log("getUserMedia not supported on this browser");
        }
        // this.updateProgressbar();
        this.playMusic();
        this.colored();
    },
    methods: {
        colored() {
            document.body.style.backgroundColor = "rgb(0, 0, 0)";
            document.body.style.background =
                "radial-gradient(circle at bottom, rgb(10, 10, 60) 0, black 100%)";
        },
        testbutton() {
            this.time--;
        },
        /** 필요시에만 컴포넌트 import */
        async loadComponent(game_mode) {
            const component = await defineAsyncComponent(() =>
                import(`../components/${game_mode}.vue`)
            );
            this.game_mode = component;
            this.game_mode_text = game_mode;
            this.game_selected = 1;
        },
        /** 유저가 웹캡이 있는지 체크 */
        async checkWebcam() {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(
                    (device) => device.kind === "videoinput"
                );
                if (videoDevices.length > 0) {
                    // User has a webcam, call the myCam function
                    this.myCam(constraints);
                    this.processImage();
                    isStreaming = 1;
                    intervalVid = setInterval(this.sendImage, 100);
                } else {
                    console.log("User does not have a webcam");
                }
            } catch (error) {
                console.log("Error while checking for video devices: ", error);
            }
        },
        /** 내 카메라 켜기 */
        async myCam(constraints) {
            let stream = null;
            try {
                stream = await navigator.mediaDevices.getUserMedia(constraints);
                /* 스트림 사용 */
                video.srcObject = stream;
                video.volume = 0;
                video.play();
            } catch (error) {
                console.log(error);
            }
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
            process_image = setTimeout(this.processImage, 1);
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
                intervalVid = setInterval(this.sendImage, 100);
                this.processImage();
                this.videoOn();
            } else {
                console.log("카메라 비활성화");
                isStreaming = 0;
                this.isStreaming = 0;
                this.toggle_text = "카메라 활성화";
                clearInterval(intervalVid);
                clearTimeout(process_image);
                this.videoOff();
            }
        },
        send_user_turn(user = "", remove_count = 0) {
            const jsonData = JSON.stringify({
                type: "get_timer",
                next_user: user,
                remove_count: remove_count,
                userid: current_user,
            });

            connection.send(jsonData);
        },
        scriptCheck(msg, answer_user = "", remove_count) {
            if (msg == "init") {
                //보드 다 만들었으면 전체 타이머 시작
                if (first_turn == current_user) {
                    this.getLimitTimer();
                }
            } else if (msg == "check" && answer_user == current_user) {
                // 단어 체크 해서 끝났으면 타이머
                this.send_user_turn("true", remove_count);
                const answer_text_box = document.getElementById("input_answer");
                answer_text_box.disabled = true;
                this.time = 12;
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
            let width = (this.time / 12) * 100 + "%";
            width = parseFloat(width).toFixed(2);
            let widthStr = width + "%";
            el.style.width = widthStr;
            switch (this.time) {
                case 12:
                    el.style.backgroundColor = "#42FF00";
                    break;
                case 11:
                    el.style.backgroundColor = "#80FF00";
                    break;
                case 10:
                    el.style.backgroundColor = "#9EFF00";
                    break;
                case 9:
                    el.style.backgroundColor = "#BDFF00";
                    break;
                case 8:
                    el.style.backgroundColor = "#DBFF00";
                    break;
                case 7:
                    el.style.backgroundColor = "#EBFF00";
                    break;
                case 6:
                    el.style.backgroundColor = "#FAFF00";
                    break;
                case 5:
                    el.style.backgroundColor = "#FFF500";
                    break;
                case 4:
                    el.style.backgroundColor = "#FFE600";
                    break;
                case 3:
                    el.style.backgroundColor = "#FFC700";
                    break;
                case 2:
                    el.style.backgroundColor = "#FF9900";
                    break;
                case 1:
                    el.style.backgroundColor = "#FF1F00";
                    break;
            }
        },
        boardInit() {
            this.GameStart();
            const audio = new Audio("../src/assets/soundEffect/gameStart.mp3");
            audio.volume = 0.6;
            audio.play();
            this.isGameStarted = 1;
            this.delete_board = 0;

            const jsonData = JSON.stringify({
                type: "game_server",
                game_mode: this.game_mode_text,
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
                game_mode: this.game_mode_text,
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
        /** Play Music */
        musicPlay() {
            this.$refs.playAudio.play();
        },
        /** Pause Music */
        musicPause() {
            this.$refs.playAudio.pause();
        },
        /** Play Music for button */
        playMusic() {
            this.isPlaying = 1;
            document.getElementById("radioPlayBtn").style.backgroundImage =
                "url('../src/assets/image/btn_insert.png')";
            document.getElementById("radioPauseBtn").style.backgroundImage =
                "url('../src/assets/image/btn_pop.png')";
            this.musicPlay();
        },
        /** Play Music for button */
        toggleMusic() {
            if (this.isPlaying) {
                this.pauseMusic();
            } else {
                this.playMusic();
            }
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
            }%, rgb(32, 32, 32) ${
                gradientValue * event.target.value
            }%, rgb(32, 32, 32) 100%)`;
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
            this.$refs.floatWindow.style.top = "5%";
            this.$refs.floatWindow.style.right = "150px";
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
            const audio = new Audio("../src/assets/soundEffect/close.wav");
            audio.volume = 0.6;
            audio.play();
            this.$router.push("/");
        },
        // Game End Pop
        closeModalView(data) {
            this.openModal = data;
        },
        modalOpen() {
            this.openModal = true;
        },
        toggleRight() {
            const audio = new Audio("../src/assets/soundEffect/page.wav");
            audio.volume = 0.6;
            audio.play();
            this.isOpenRight = !this.isOpenRight;
        },
        toggleLeft() {
            const audio = new Audio("../src/assets/soundEffect/page.wav");
            audio.volume = 0.6;
            audio.play();
            this.isOpenLeft = !this.isOpenLeft;
            this.blockVideo(this.isOpenLeft);
        },
        /** 비디오 창 접었을 시 서버에 내 비디오 상대에게서 지우라고 보내고 나는 상대들의 비디오 받지 않겠다 보내기 */
        blockVideo(status) {
            if (!status) {
                this.videoOff();
                isStreaming = 0;
                this.isStreaming = 0;
                this.toggle_text = "카메라 활성화";
                clearInterval(intervalVid);
                clearTimeout(process_image);
            }
            const jsonData = JSON.stringify({
                type: "video_status",
                video_status: status,
            });
            connection.send(jsonData);
        },
        /** 서버에 내 비디오 상대에게서 보여주라고 보내기 */
        videoOn() {
            const jsonData = JSON.stringify({
                type: "video_on",
                userid: current_user,
            });
            connection.send(jsonData);
        },
        /** 서버에 내 비디오 상대에게서 지우라고 보내기 */
        videoOff() {
            const jsonData = JSON.stringify({
                type: "video_off",
                userid: current_user,
            });
            connection.send(jsonData);
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
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow-x: hidden;
}

.video-container {
    display: grid;
}

#videoInput {
    display: none;
}

.innerWindow {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid rgb(22, 255, 94);
}

.videoWindow {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;
    border: 1px solid rgb(22, 255, 94);
}

.videoBar {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.videoBarCover {
    box-sizing: border-box;
    width: 100%;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgb(22, 255, 94);
}
.progressBar {
    max-width: 700px;
    width: 90%;
    margin: 10px auto;
    height: 20px;
    border-style: solid;
    border-radius: 3px;
    background: linear-gradient(#ffffff, #fffffff9);
}

.innerbar {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    text-align: right;
    margin: 0;
    height: 20px;
    /* same as #progressBar height if we want text middle aligned */
    border-radius: 3px;
    background-color: #42ff00;
}

.answerBox {
    width: 100%;
    margin: 10px auto;
    /* margin-top: 100px; */
    height: 50px;
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
    height: 95%;
}

.chatBoxOuter {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 200px;
    overflow-y: hidden;
    position: relative;
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
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    color: rgb(22, 255, 94);
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgb(22, 255, 94);
}

.windowOuter {
    width: 100%;
    height: 30%;
}

.minBtn {
    width: 22px;
    height: 20px;
    background-color: transparent;
    border: 2px solid rgb(22, 255, 94);
    border-radius: 3px;
    color: rgb(22, 255, 94);
    font-weight: bold;
    cursor: pointer;
}
@keyframes startPulse {
    0% {
        border-left: 100px solid rgb(22, 255, 94);
    }
    50% {
        border-left: 100px solid rgb(255, 82, 43);
    }
    100% {
        border-left: 100px solid rgb(22, 255, 94);
    }
}

#game_start {
    box-sizing: border-box;
    font-size: 2rem;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 98;
    cursor: pointer;
    background-color: transparent;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
    border-right: 0px;
    margin: -50px 0 0 -45px;
    animation: startPulse 5s linear infinite;
}
#game_start:hover {
    animation: startPulse 0.5s infinite;
}
.blackBox {
    background-color: #000000;
    color: rgb(255, 152, 78);
    font-size: 1.2rem;
}
#scoreBoard {
    max-height: 240px;
    overflow-y: scroll;
}
#scoreBoard::-webkit-scrollbar {
    display: none;
}

@media (min-width: 1420px) {
    #rightBox {
        right: 0;
    }
}

#rightBox {
    position: absolute;
    width: 340px;
    margin-left: 1070px;
    margin-right: 0;
    max-height: 80vh;
    overflow-y: scoll;
    overflow-x: hidden;
}
#rightBox::-webkit-scrollbar {
    display: none;
}
#leftBox {
    position: absolute;
    left: 0px;
    width: 340px;
    max-height: 80vh;
    overflow-y: scroll;
    overflow-x: hidden;
}
#leftBox::-webkit-scrollbar {
    display: none;
}

#centerBox {
    width: 100%;
    max-width: fit-content;
    max-height: fit-content;
    flex-direction: column;
    position: relative;
}
#gameBox {
    width: 700px;
    height: 700px;
    border: 3px solid rgb(22, 255, 94);
    border-radius: 10px;
}
.videoFrame {
    width: 300px;
}
.hoverButton {
    z-index: -1;
    position: absolute;
    color: #ffffff;
    display: none;
}
.videoFrame:hover .hoverButton {
    z-index: 2;
    margin-top: 6px;
    top: 78px;
    left: 20px;
    width: 300px;
    height: 245px;
    border: none;
    display: block;
    background-color: rgba(32, 32, 32, 0.7);
}
#gameWindow {
    box-sizing: border-box;
    width: 720px;
    height: 720px;
    border-width: 3px;
    border-style: solid;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    animation: borderPulse 7s infinite;
    margin: 50px;
    box-shadow: 0 0 50px 10px rgb(22, 255, 94);
}
.chatRow {
    width: 100%;
}
#messageText {
    width: 80%;
}
#send_message {
    width: 20%;
    background-color: rgb(22, 255, 94);
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
    z-index: 10;
    text-align: center;
    background: linear-gradient(
        351.27deg,
        #ffffff -854.98%,
        #eeeeee -854.98%,
        #cacaca -91.55%
    );
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    right: 150px;
    top: 5%;
    width: 20vw;
    min-width: 300px;
    z-index: 30;
}

#playerHeader {
    width: 100%;
    height: 30px;
    cursor: move;
    z-index: 10;
    background: linear-gradient(
        351.27deg,
        #ffffff -854.98%,
        #eeeeee -854.98%,
        #cacaca -91.55%
    );
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    border-width: 3px 3px 0px 3px;
    border-style: solid;
    border-color: #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.flowBoxWrapper {
    width: 95%;
    overflow: hidden;
    word-break: nowrap;
}

.flowBox {
    width: 1394px;
    display: flex;
    justify-content: space-between;
    word-break: nowrap;
    animation: scrollText 10s linear infinite;
}

.musicTitle {
    width: 100%;
    color: #afffb3;
    font-family: "retroFont";
    font-size: 100%;
    word-break: nowrap;
    text-shadow: -1px 0 #d0ffd2, 0 1px #d0ffd2, 1px 0 #d0ffd2, 0 -1px #d0ffd2;
}

.time {
    color: #ffffff;
}

#audioPlayer {
    width: 100%;
    height: 210px;
    background: linear-gradient(180deg, #c6c6c6 -15.29%, #ffffff 116.66%);
    border-width: 3px;
    border-style: solid;
    border-color: #000000;
}
#radioPannel {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 94%;
    height: 30%;
    margin: 0 auto;
    margin-top: 20px;
    background-image: url("../assets/image/radio_pannel.png");
    background-size: cover;
}
#radioBtnBox {
    width: 94%;
    height: 25%;
    margin: 0 auto;
    margin-top: 15px;
    background-image: url("../assets/image/radio_btnBox.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}
#radioVolume {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 94%;
    height: 14%;
    min-height: 15px;
    margin: 0 auto;
    margin-top: 15px;
    background-image: url("../assets/image/radio_volume.png");
    background-size: cover;
}
.radioBtn {
    width: 24%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/image/btn_pop.png");
    background-size: cover;
}
.radioBtnWrapper {
    width: 99%;
    height: 85%;
    margin-bottom: 1%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

#volume-slider {
    -webkit-appearance: none; /* 기본 적용 CSS 방지 */
    width: 100%;
    border-radius: 1px; /* 슬라이더 모서리 */
    float: left;
    outline: none;
    height: 70%;
    cursor: pointer;
    background: linear-gradient(
        to right,
        #0054e6 0%,
        #0054e6 60%,
        RGB(32, 32, 32) 60%,
        RGB(32, 32, 32) 100%
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
        transform: rotate(360deg);
    }
}
#playerIcon {
    width: 50px;
    height: 50px;
    animation: rotation 1s infinite linear;
    cursor: pointer;
}
#playerIconStop {
    width: 50px;
    height: 50px;
    cursor: pointer;
}
.inGamePopup {
    position: absolute;
    float: inline-start;
    width: fit-content;
    min-height: 200px;
    height: fit-content;
    max-height: 50vh;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #cacaca;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    z-index: 10;
    display: flex;
    justify-self: center;
    align-items: center;
}
#howToPopup {
    top: 60px;
    right: 50px;
}
.inGamePopup::-webkit-scrollbar {
    display: none;
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
.chatBoxChat {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -ms-overflow-style: none;
}
.chatBoxChat::-webkit-scrollbar {
    display: none;
}

#logBoard {
    height: 150px;
    overflow-y: scroll;
}
#logBoard::-webkit-scrollbar {
    display: none;
}
.btnMark {
    height: 30%;
}
span {
    font-size: 1.5rem;
    margin: 2px;
}

.toggleBtn {
    border: 1px solid rgb(22, 255, 94);
    height: fit-content;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}
.toggleBtn > span {
    color: rgb(22, 255, 94);
}
#toggleBtnLeft {
    float: left;
}
.answerArea {
    position: fixed;
    bottom: 0%;
    width: 100%;
    height: 100px;
    z-index: 100;
    display: flex;
    justify-content: center;
    background: transparent;
}

@keyframes bgPulse {
    0% {
        background-color: rgb(22, 255, 94);
    }
    50% {
        background-color: rgb(52, 255, 134);
    }
    100% {
        background-color: rgb(22, 255, 94);
    }
}
.answerLine {
    width: 25%;
    height: 5%;
    margin-top: 40px;
    background-size: 400% 400%;
    animation: bgPulse 7s ease infinite;
}
@keyframes borderPulse {
    0% {
        border-color: rgb(22, 255, 94);
    }
    50% {
        border-color: rgb(52, 255, 134);
    }
    100% {
        border-color: rgb(22, 255, 94);
    }
}
.innerAnswer {
    box-sizing: border-box;
    width: 50%;
    min-width: 600px;
    border: 3px;
    border-style: solid;
    border-radius: 5px;
    border-bottom: 0px;
    animation: borderPulse 7s infinite;
}
.left-enter-from {
    transform: translateX(-360px);
}
.left-enter-to {
    transform: translateX(-0px);
}

.left-leave-from {
    transform: translateX(-0px);
}
.left-leave-to {
    transform: translateX(-360px);
}

.left-leave-active {
    transition: all 0.4s;
}
.left-enter-active {
    transition: all 0.4s;
}

.right-enter-from {
    transform: translateX(360px);
}
.right-enter-to {
    transform: translateX(0px);
}

.right-leave-from {
    transform: translateX(0px);
}
.right-leave-to {
    transform: translateX(360px);
}

.right-leave-active {
    transition: all 0.4s;
}
.right-enter-active {
    transition: all 0.4s;
}
#inGameContainer {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.space {
    background: rgba(128, 0, 128, 0.1) center / 200px 200px round;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
}
.stars1 {
    background-image: radial-gradient(
            1px 1px at 25px 5px,
            white,
            rgba(255, 255, 255, 0)
        ),
        radial-gradient(1px 1px at 50px 25px, white, rgba(255, 255, 255, 0)),
        radial-gradient(1px 1px at 125px 20px, white, rgba(255, 255, 255, 0)),
        radial-gradient(1.5px 1.5px at 50px 75px, white, rgba(255, 255, 255, 0)),
        radial-gradient(2px 2px at 15px 125px, white, rgba(255, 255, 255, 0)),
        radial-gradient(
            2.5px 2.5px at 110px 80px,
            white,
            rgba(255, 255, 255, 0)
        );
}
.main {
    position: fixed;
    top: 50%;
    left: 50%;
    height: 1px;
    width: 1px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: -42vw -4vh 0px 0px #fff, 25vw -41vh 0px 0px #fff,
        -20vw 49vh 0px 1px #fff, 5vw 40vh 1px 1px #fff, 29vw 19vh 1px 0px #fff,
        -44vw -13vh 0px 0px #fff, 46vw 41vh 0px 1px #fff,
        -3vw -45vh 0px 1px #fff, 47vw 35vh 1px 0px #fff, 12vw -8vh 1px 0px #fff,
        -34vw 48vh 1px 1px #fff, 32vw 26vh 1px 1px #fff, 32vw -41vh 1px 1px #fff,
        0vw 37vh 1px 1px #fff, 34vw -26vh 1px 0px #fff, -14vw -49vh 1px 0px #fff,
        -12vw 45vh 0px 1px #fff, -44vw -33vh 0px 1px #fff,
        -13vw 41vh 0px 0px #fff, -36vw -11vh 0px 1px #fff,
        -23vw -24vh 1px 0px #fff, -38vw -27vh 0px 1px #fff,
        16vw -19vh 0px 0px #fff, 28vw 33vh 1px 0px #fff, -49vw -4vh 0px 0px #fff,
        16vw 32vh 0px 1px #fff, 36vw -18vh 1px 0px #fff,
        -25vw -30vh 1px 0px #fff, -23vw 24vh 0px 1px #fff,
        -2vw -35vh 1px 1px #fff, -25vw 9vh 0px 0px #fff,
        -15vw -34vh 0px 0px #fff, -8vw -19vh 1px 0px #fff,
        -20vw -20vh 1px 1px #fff, 42vw 50vh 0px 1px #fff,
        -32vw 10vh 1px 0px #fff, -23vw -17vh 0px 0px #fff,
        44vw 15vh 1px 0px #fff, -40vw 33vh 1px 1px #fff, -43vw 8vh 0px 0px #fff,
        -48vw -15vh 1px 1px #fff, -24vw 17vh 0px 0px #fff,
        -31vw 50vh 1px 0px #fff, 36vw -38vh 0px 1px #fff, -7vw 48vh 0px 0px #fff,
        15vw -32vh 0px 0px #fff, 29vw -41vh 0px 0px #fff, 2vw 37vh 1px 0px #fff,
        7vw -40vh 1px 1px #fff, 15vw 18vh 0px 0px #fff, 25vw -13vh 1px 1px #fff,
        -46vw -12vh 1px 1px #fff, -18vw 22vh 0px 0px #fff,
        23vw -9vh 1px 0px #fff, 50vw 12vh 0px 1px #fff, 45vw 2vh 0px 0px #fff,
        14vw -48vh 1px 0px #fff, 23vw 43vh 0px 1px #fff, -40vw 16vh 1px 1px #fff,
        20vw -31vh 0px 1px #fff, -17vw 44vh 1px 1px #fff,
        18vw -45vh 0px 0px #fff, 33vw -6vh 0px 0px #fff, 0vw 7vh 0px 1px #fff,
        -10vw -18vh 0px 1px #fff, -19vw 5vh 1px 0px #fff, 1vw 42vh 0px 0px #fff,
        22vw 48vh 0px 1px #fff, 39vw -8vh 1px 1px #fff, -6vw -42vh 1px 0px #fff,
        -47vw 34vh 0px 0px #fff, -46vw 19vh 0px 1px #fff,
        -12vw -32vh 0px 0px #fff, -45vw -38vh 0px 1px #fff,
        -28vw 18vh 1px 0px #fff, -38vw -46vh 1px 1px #fff,
        49vw -6vh 1px 1px #fff, -28vw 18vh 1px 1px #fff, 10vw -24vh 0px 1px #fff,
        -5vw -11vh 1px 1px #fff, 33vw -8vh 1px 0px #fff, -16vw 17vh 0px 0px #fff,
        18vw 27vh 0px 1px #fff, -8vw -10vh 1px 1px #fff;

    /* stars were too big with the layers above but left the code in case no one cares  -- as in, if noone's just that  one other loner who actually cares    */

    box-shadow: 24vw 9vh 1px 0px #fff, 12vw -24vh 0px 1px #fff,
        -45vw -22vh 0px 0px #fff, -37vw -40vh 0px 1px #fff,
        29vw 19vh 0px 1px #fff, 4vw -8vh 0px 1px #fff, -5vw 21vh 1px 1px #fff,
        -27vw 26vh 1px 1px #fff, -47vw -3vh 1px 1px #fff,
        -28vw -30vh 0px 1px #fff, -43vw -27vh 0px 1px #fff,
        4vw 22vh 1px 1px #fff, 36vw 23vh 0px 0px #fff, -21vw 24vh 1px 1px #fff,
        -16vw 2vh 1px 0px #fff, -16vw -6vh 0px 0px #fff, 5vw 26vh 0px 0px #fff,
        -34vw 41vh 0px 0px #fff, 1vw 42vh 1px 1px #fff, 11vw -13vh 1px 1px #fff,
        48vw -8vh 1px 0px #fff, 22vw -15vh 0px 0px #fff, 45vw 49vh 0px 0px #fff,
        43vw -27vh 1px 1px #fff, 20vw -2vh 0px 0px #fff, 8vw 22vh 0px 1px #fff,
        39vw 48vh 1px 1px #fff, -21vw -11vh 0px 1px #fff,
        -40vw 45vh 0px 1px #fff, 11vw -30vh 1px 0px #fff, 26vw 30vh 1px 0px #fff,
        45vw -29vh 0px 1px #fff, -2vw 18vh 0px 0px #fff,
        -29vw -45vh 1px 0px #fff, -7vw -27vh 1px 1px #fff,
        42vw 24vh 0px 0px #fff, 45vw -48vh 1px 0px #fff,
        -36vw -18vh 0px 0px #fff, -44vw 13vh 0px 1px #fff,
        36vw 16vh 0px 1px #fff, 40vw 24vh 0px 0px #fff, 18vw 11vh 0px 0px #fff,
        -15vw -23vh 1px 0px #fff, -24vw 48vh 0px 1px #fff,
        27vw -45vh 1px 0px #fff, -2vw -24vh 0px 1px #fff,
        -15vw -28vh 0px 0px #fff, -43vw 13vh 1px 0px #fff, 7vw 27vh 1px 0px #fff,
        47vw 5vh 0px 0px #fff, -45vw 15vh 1px 1px #fff, -5vw -28vh 0px 1px #fff,
        38vw 25vh 1px 1px #fff, -39vw -1vh 1px 0px #fff, 5vw 0vh 1px 0px #fff,
        49vw 13vh 0px 0px #fff, 48vw 10vh 0px 1px #fff, 19vw -28vh 0px 0px #fff,
        4vw 7vh 0px 0px #fff, 21vw 21vh 1px 1px #fff, -15vw -15vh 0px 1px #fff,
        -6vw -42vh 1px 0px #fff, -15vw 48vh 1px 1px #fff,
        -23vw 25vh 1px 1px #fff, -48vw 25vh 0px 1px #fff,
        -31vw -19vh 0px 1px #fff, 4vw 37vh 1px 1px #fff, -43vw 28vh 0px 0px #fff,
        3vw -25vh 0px 1px #fff, -39vw 14vh 0px 1px #fff, -40vw 31vh 0px 1px #fff,
        35vw -36vh 1px 1px #fff, 16vw 49vh 0px 0px #fff, 6vw 39vh 0px 0px #fff,
        3vw -35vh 0px 1px #fff, -44vw -2vh 1px 0px #fff, -6vw 21vh 1px 0px #fff,
        48vw 9vh 1px 1px #fff, -43vw 30vh 1px 1px #fff, 29vw -12vh 1px 1px #fff,
        -48vw 13vh 1px 0px #fff, -42vw 32vh 1px 1px #fff, 34vw 15vh 1px 1px #fff,
        29vw -37vh 1px 1px #fff, 28vw 2vh 0px 0px #fff;
    animation: zoom 100s alternate infinite;
}

@keyframes zoom {
    0% {
        transform: scale(1) rotate(0deg);
    }
    50% {
        transform: scale(2) rotate(360deg);
    }
    100% {
        transform: scale(1) rotate(720deg);
    }
}

.videoStreaming {
    height: fit-content;
    margin: 10px auto;
}
</style>
