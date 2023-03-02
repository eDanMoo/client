<template>
    <div class="hancomWindow" v-show="showHancom" ref="floatHancom">
        <div id="hancom">
            <div id="hancom-title" @mousedown="dragHancom">
                <span style="margin-left: 10px">정글타자연습</span>
                <img
                    src="https://storage.googleapis.com/koword_bucket/btn_close.png"
                    style="
                        width: 30px;
                        height: 30px;
                        cursor: pointer;
                        margin-right: 10px;
                    "
                    alt=""
                    @click="closeHancom()"
                />
            </div>
            <div id="hancom-menu">
                <p style="margin-left: 10px">놀이 | 산성비</p>
            </div>
            <div id="contents">
                <!-- // 밑에 있는 tajaContents Div 안에 글자를 넣어주게 됩니다. -->
                <div id="tajaContents"></div>
                <div id="inputContents">
                    <div id="inputText">
                        <input type="text" id="tajaText" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, onBeforeUnmount } from "vue";
export default {
    data() {
        return {
            hancomPos1: 0,
            hancomPos2: 0,
            hancomPos3: 0,
            hancomPos4: 0,
        };
    },
    methods: {
        closeHancom() {
            const click_sound = new Audio(
                "/assets/soundEffect/basic_click.mp3"
            );
            click_sound.volume = 0.6;
            click_sound.play();
            this.showHancom = false;
        },
        openHancom() {
            this.$refs.floatHancom.style.top = "5%";
            this.$refs.floatHancom.style.left = "5%";
            this.showHancom = true;
        },
        dragHancom(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            this.hancomPos3 = e.clientX;
            this.hancomPos4 = e.clientY;
            document.onmouseup = this.closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = this.hancomDrag;
        },
        hancomDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            this.hancomPos1 = this.hancomPos3 - e.clientX;
            this.hancomPos2 = this.hancomPos4 - e.clientY;
            this.hancomPos3 = e.clientX;
            this.hancomPos4 = e.clientY;
            // set the element's new position:
            this.$refs.floatHancom.style.top =
                Math.max(
                    Math.min(
                        this.$refs.floatHancom.offsetTop - this.hancomPos2,
                        window.innerHeight - 150
                    ),
                    -150
                ) + "px";
            this.$refs.floatHancom.style.left =
                Math.max(
                    Math.min(
                        this.$refs.floatHancom.offsetLeft - this.hancomPos1,
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
    },
    setup() {
        let showHancom = ref(false);
        let drawInterval = null;
        let downInterval = null;
        onMounted(() => {
            // 내려오게 할 단어의 목록을 배열로 선언하였습니다.
            var taja = [
                "나침반",
                "정글",
                "코드리뷰",
                "피드백",
                "몰입",
                "유사도",
                "최선",
                "눈물",
                "인생",
                "빈백",
                "머신러닝",
                "크래프톤",
                "진통제",
                "커피",
                "학습량",
                "동료",
                "정답",
                "오답",
                "박정은",
                "손창한",
                "조훈기",
                "이상준",
                "이현홍",
                "문해력",
                "나만의무기",
                "핀토스",
                "연수동",
            ];

            // 밑에 선언한 tajaContents 안에 글자로 된 Div를 넣어주게 됩니다.
            var tajaContents = document.getElementById("tajaContents");

            // 글자의 div 크기를 고정으로 주기 위한 변수입니다.
            const TAJAWIDTH = 150;
            const TAJAHEIGHT = 30;

            // 그려지는 것 보다 내려오는게 간격이 더 짧게 함( setInterval의 시간 변수)
            const DRAWTIME = 1200;
            const DOWNTIME = 300;

            // taja배열의 index 값에 대한 변수
            function drawTaja() {
                return setInterval(function () {
                    let randomPick = 0;
                    let drawWord = "";
                    randomPick = Math.round(Math.random() * (taja.length - 1));
                    drawWord = taja[randomPick];
                    var leftWidth = Math.round(Math.random() * 720);
                    var tajaDiv = document.createElement("div");
                    tajaDiv.classList.add("tajaWord");
                    tajaDiv.style.width = TAJAWIDTH + "px";
                    tajaDiv.style.height = TAJAHEIGHT + "px";
                    tajaDiv.style.position = "absolute";
                    tajaDiv.style.textAlign = "center";
                    tajaDiv.style.textAlign = "0px";
                    tajaDiv.style.top = "1px";
                    tajaDiv.innerHTML = drawWord;
                    tajaContents.appendChild(tajaDiv);
                    if (leftWidth + TAJAWIDTH >= tajaContents.offsetWidth) {
                        tajaDiv.style.left = leftWidth - TAJAWIDTH + "px";
                    } else {
                        tajaDiv.style.left = leftWidth + "px";
                    }
                }, DRAWTIME);
            }
            function downTaja() {
                return setInterval(function () {
                    document.getElementsByClassName("tajaWord");
                    let tajaContents = document.getElementById("tajaContents");
                    for (
                        let i = 0;
                        i < document.getElementsByClassName("tajaWord").length;
                        i++
                    ) {
                        document.getElementsByClassName("tajaWord")[
                            i
                        ].style.top =
                            parseInt(
                                document.getElementsByClassName("tajaWord")[i]
                                    .style.top
                            ) +
                            30 +
                            "px";
                        if (
                            600 <
                            parseInt(
                                document.getElementsByClassName("tajaWord")[i]
                                    .style.top
                            )
                        ) {
                            tajaContents.removeChild(
                                document.getElementsByClassName("tajaWord")[i]
                            );
                            i--;
                        }
                    }
                }, DOWNTIME);
            }
            var tajaText = document.getElementById("tajaText");
            tajaText.addEventListener("keydown", function (e) {
                // enter 눌렀을 때
                if (e.keyCode === 13) {
                    for (
                        let i = 0;
                        i < document.getElementsByClassName("tajaWord").length;
                        i++
                    ) {
                        // 타자 친 단어와 화면의 단어가 일치했을 때
                        if (
                            tajaText.value ===
                            document.getElementsByClassName("tajaWord")[i]
                                .innerHTML
                        ) {
                            tajaContents.removeChild(
                                document.getElementsByClassName("tajaWord")[i]
                            );
                        }
                    }
                    // enter 눌렀을 때 input 창 초기화
                    tajaText.value = "";
                }
            });
            drawInterval = drawTaja();
            downInterval = downTaja();
        });
        onBeforeUnmount(() => {
            clearInterval(drawInterval);
            clearInterval(downInterval);
        });
        return { setInterval, showHancom };
    },
};
</script>

<style scoped>
.hancomWindow {
    position: absolute;
    top: 5%;
    left: 5%;
    bottom: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 800px;
    vertical-align: top;
}

#hancom {
    background: linear-gradient(
        351.27deg,
        #ffffff -854.98%,
        #eeeeee -854.98%,
        #cacaca -91.55%
    );
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    width: 800px;
    height: 800px;
    box-shadow: 1px 1px black, inset 2px 2px white;
    border: solid black;
    font-family: "DungGeunMo";
    font-size: x-large;
    color: black;
    overflow: hidden;
}

#hancom-title {
    background-image: linear-gradient(270deg, #1085d2 0%, #00007b 100%);
    border: 2px solid rgb(80, 80, 80);
    box-shadow: 1px 1px black, inset 2px 2px white;
    color: white;
    width: 800px;
    height: 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: grab;
}

#hancom-menu {
    /* background-color: rgb(138, 137, 137); */
    background-color: rgb(172, 172, 172);
    border: 2px solid rgb(0, 0, 0);
    box-shadow: 1px 1px black, inset 2px 2px white;
    width: 800px;
    height: 35px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
}

#contents {
    width: 100%;
    height: 80%;
}
#tajaContents {
    width: 100%;
    height: 100%;
    position: relative;
}

#inputContents {
    text-align: center;
    border-top-style: solid;
    border-top-color: black;
    bottom: 1px;
}
#inputText {
    display: inline-block;
    height: 35px;
}

#tajaText {
    width: 100%;
    height: 100%;
    border: 1px solid rgb(80, 80, 80);
    box-shadow: 1px 1px black, inset 2px 2px white;
}
</style>
