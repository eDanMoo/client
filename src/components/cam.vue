<script>
import { onMounted, ref } from "vue";
import VueSocketIO from "vue-socket.io";
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
let ctx = "";

let cur_timer = 0;

export default {
    name: "cam_comp",
    components: {},
    data() {
        return {
            data: null,
            my_cam: current_user,
            toggle_text: "카메라 비활성화",
            time: 5,
        };
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
                const input = document.getElementById("messageText");
                const btn = document.getElementById("send_message");
                if (userid_str != current_user) {
                    input.disabled = true;
                    btn.disabled = true;
                    this.time = 5;
                } else {
                    input.disabled = false;
                    btn.disabled = false;
                    this.timer(userid_str);
                }
            }
        };

        this.processImage();
    },
    methods: {
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
                this.time = 5;
                if (this.current_user == check_user) {
                    this.send_user_turn();
                }
            } else {
                this.time--;
                cur_timer = setTimeout(this.timer, 1000);
            }
        },
    },
};
</script>

<template>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <!-- <nav id="header" style="height: 70px; overflow: hidden">
            <div class="nav-wrapper" style="background: #4a85d9; height: 100%">
                <div class="container" style="width: 70%; height: 100%">
                    <a href="#" class="brand-logo"
                        >{{ user_name }} in {{ room_name }}</a
                    >
                </div>
            </div>
        </nav> -->
        <div class="container" id="videoFrame">
            <div id="{{ my_cam }}">
                <article>
                    <div style="width: 300px; height: 280">
                        <canvas id="videoOutput"></canvas>
                    </div>
                </article>
            </div>
            <div>
                <article>
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
                </article>
            </div>
            <br />
            <!-- <div>
                <article>
                    <div id="videoFrame"></div>
                </article>
            </div> -->
        </div>
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
                                <i class="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
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

.item1 {
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
}
</style>
