<template>
    <div v-show="!isPowerOn"></div>
    <div class="computerSet" v-show="isPowerOn">
        <div class="monitor">
            <div class="outerComputer" id="outerComputer">
                <div class="inComputer" id="inComputer">
                    <div
                        class="shutDownPage"
                        id="shutDownPage"
                        v-show="isShutdown"
                        @click="powerOff"
                    >
                        이제 전원을<br />
                        끄셔도 됩니다.
                    </div>
                    <div class="inAccessable" v-show="isAccessError">
                        <div class="inAccessModal">
                            <div class="inAccessBar">
                                <div
                                    class="innerContent"
                                    style="
                                        justify-content: space-between;
                                        color: white;
                                        cursor: not-allowed;
                                    "
                                >
                                    <span>경고</span>
                                    <img
                                        src="../assets/gamecomp/Xbutton.png"
                                        alt=""
                                        style="width: 24px; cursor: pointer"
                                        @click="closeAlert()"
                                    />
                                </div>
                            </div>
                            <div class="inAccessContent">
                                <div
                                    class="innerContent"
                                    style="justify-content: center"
                                >
                                    <div>
                                        <span>허가되지 않은 접근입니다.</span>
                                    </div>
                                </div>
                                <div
                                    style="
                                        width: 100%;
                                        display: flex;
                                        justify-content: center;
                                    "
                                >
                                    <div id="alertBtn" @click="closeAlert()">닫 기</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="menuBar" v-show="isOpenMenuBar">
                            <div style="width: 13%; height: 98%; margin: 1%">
                                <div id="menuColorBar"></div>
                            </div>
                            <div style="width: 85%; height: 100%; position: relative">
                                <div
                                    class="menuItems"
                                    style="bottom: 410px"
                                    @click="openAlert()"
                                >
                                    <img
                                        style="
                                            height: 45px;
                                            margin-left: 7px;
                                            margin-right: 4px;
                                        "
                                        src="../assets/icon/icon_updates.png"
                                        alt=""
                                    />
                                    <span style="margin-right: 10px"
                                        >Mindows Update</span
                                    >
                                </div>
                                <hr
                                    style="
                                        position: absolute;
                                        bottom: 400px;
                                        width: 99%;
                                    "
                                />
                                <div
                                    class="menuItems"
                                    style="bottom: 360px"
                                    @click="openAlert()"
                                >
                                    <img
                                        style="
                                            height: 45px;
                                            margin-left: 7px;
                                            margin-right: 4px;
                                        "
                                        src="../assets/icon/icon_programs.png"
                                        alt=""
                                    />
                                    <span style="margin-right: 10px">프로그램(P)</span>
                                </div>
                                <div
                                    class="menuItems"
                                    style="bottom: 315px"
                                    @click="openAlert()"
                                >
                                    <img
                                        style="
                                            height: 45px;
                                            margin-left: 7px;
                                            margin-right: 4px;
                                        "
                                        src="../assets/icon/icon_favorites.png"
                                        alt=""
                                    />
                                    <span style="margin-right: 10px">즐겨찾기(A)</span>
                                </div>
                                <div
                                    class="menuItems"
                                    style="bottom: 270px"
                                    @click="openAlert()"
                                >
                                    <img
                                        style="
                                            height: 45px;
                                            margin-left: 7px;
                                            margin-right: 4px;
                                        "
                                        src="../assets/icon/icon_documents.png"
                                        alt=""
                                    />
                                    <span style="margin-right: 10px">문서(D)</span>
                                </div>
                                <div
                                    class="menuItems"
                                    style="bottom: 225px"
                                    @click="openAlert()"
                                >
                                    <img
                                        style="
                                            height: 45px;
                                            margin-left: 7px;
                                            margin-right: 4px;
                                        "
                                        src="../assets/icon/icon_settings.png"
                                        alt=""
                                    />
                                    <span style="margin-right: 10px">설정(S)</span>
                                </div>
                                <div
                                    class="menuItems"
                                    style="bottom: 180px"
                                    @click="openAlert()"
                                >
                                    <img
                                        style="
                                            height: 45px;
                                            margin-left: 7px;
                                            margin-right: 4px;
                                        "
                                        src="../assets/icon/icon_find.png"
                                        alt=""
                                    />
                                    <span style="margin-right: 10px">찾기(F)</span>
                                </div>
                                <div
                                    class="menuItems"
                                    style="bottom: 135px"
                                    @click="openAlert()"
                                >
                                    <img
                                        style="
                                            height: 45px;
                                            margin-left: 7px;
                                            margin-right: 4px;
                                        "
                                        src="../assets/icon/icon_help.png"
                                        alt=""
                                    />
                                    <span style="margin-right: 10px">도움말(H)</span>
                                </div>
                                <div
                                    class="menuItems"
                                    style="bottom: 90px"
                                    @click="openAlert()"
                                >
                                    <img
                                        style="
                                            height: 45px;
                                            margin-left: 7px;
                                            margin-right: 4px;
                                        "
                                        src="../assets/icon/icon_run.png"
                                        alt=""
                                    />
                                    <span style="margin-right: 10px">실행(R)</span>
                                </div>
                                <hr
                                    style="position: absolute; bottom: 85px; width: 99%"
                                />
                                <div
                                    class="menuItems"
                                    style="bottom: 45px"
                                    @click="openAlert()"
                                >
                                    <img
                                        style="
                                            height: 45px;
                                            margin-left: 7px;
                                            margin-right: 4px;
                                        "
                                        src="../assets/icon/icon_logOff.png"
                                        alt=""
                                    />
                                    <span style="margin-right: 10px"
                                        >나만무 로그오프(L)...</span
                                    >
                                </div>
                                <div
                                    class="menuItems"
                                    style="bottom: 0px"
                                    @click="shutDownAll()"
                                >
                                    <img
                                        style="
                                            height: 45px;
                                            margin-left: 7px;
                                            margin-right: 4px;
                                        "
                                        src="../assets/icon/icon_shutdown.png"
                                        alt=""
                                    />
                                    <span style="margin-right: 10px"
                                        >시스템 종료(U)...</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="windowsWindow" @click="closeMenuBar()">
                            <div class="iconBox">
                                <div
                                    class="iconElem"
                                    id="iconExplorer"
                                    @dblclick="openNaver()"
                                >
                                    <div class="iconWrapper">
                                        <div
                                            class="iconImage"
                                            style="
                                                background-image: url('src/assets/icon/icon_explorer.png');
                                            "
                                        ></div>
                                    </div>
                                    <div class="iconTitle">
                                        Internet<br />
                                        Explorer
                                    </div>
                                </div>
                                <div
                                    class="iconElem"
                                    id="iconHancom"
                                    @dblclick="openHancom()"
                                >
                                    <div class="iconWrapper">
                                        <div
                                            class="iconImage"
                                            style="
                                                background-image: url('src/assets/icon/icon_hancom.png');
                                            "
                                        ></div>
                                    </div>
                                    <div class="iconTitle">정글타자연습</div>
                                </div>
                                <div
                                    class="iconElem"
                                    id="iconWordgame"
                                    @dblclick="openLogin()"
                                >
                                    <div class="iconWrapper">
                                        <div
                                            class="iconImage"
                                            style="
                                                background-image: url('src/assets/icon/icon_wordgame.png');
                                            "
                                        ></div>
                                    </div>
                                    <div class="iconTitle">단어게임</div>
                                </div>
                                <div
                                    class="iconElem"
                                    id="iconLaundry"
                                    @dblclick="openLaundry()"
                                >
                                    <div class="iconWrapper">
                                        <div
                                            class="iconImage"
                                            style="
                                                background-image: url('src/assets/icon/icon_laundry.png');
                                            "
                                        ></div>
                                    </div>
                                    <div class="iconTitle">
                                        Laundry<br />
                                        Jungle
                                    </div>
                                </div>
                            </div>
                            <WordRain ref="wordRain" />
                            <Login ref="Login" />
                        </div>
                        <div class="windowsSystemBar">
                            <div class="windowsSystemButton" @click="toggleMenuBar()">
                                <img
                                    style="
                                        height: 30px;
                                        margin-left: 7px;
                                        margin-right: 4px;
                                    "
                                    src="../assets/icon/icon_windows.png"
                                    alt=""
                                />
                                <span style="margin-right: 10px"> <b>시 작</b></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="monitorPannel" id="monitorTopPannel"></div>
            <div class="monitorPannel" id="monitorLeftPannel"></div>
            <div class="monitorPannel" id="monitorRightPannel"></div>
            <div class="monitorPannel" id="monitorBackPannel"></div>
        </div>
        <div class="desktop">
            <div class="desktopPannel" id="frontPannel">
                <div class="pannelComp">
                    <div class="oddInput" id="cdInput"></div>
                    <div class="oddInputButton"></div>
                </div>
                <div class="pannelComp pannelComp-short">
                    <div class="oddInput" id="diskInput"></div>
                    <div class="oddInputButton" style="border-radius: 999%;"></div>
                </div>
                <div class="pannelComp pannelComp-tall">
                    <div class="powerButton powerButton-power"></div>
                    <div class="powerButton powerButton-reset"></div>
                </div>
            </div>
            <div class="desktopPannel" id="backPannel"></div>
            <div class="desktopPannel" id="leftPannel"></div>
            <div class="desktopPannel" id="rightPannel"></div>
        </div>
        <div v-show="isPowerOn" id="woodTable"></div>
    </div>
</template>

<script>
import Login from "../components/Login.vue";
import WordRain from "../components/WordRain.vue";
import { ref } from "vue";

export default {
    data() {
        return {
            isOpenMenuBar: 0,
            isAccessError: 0,
            isShutdown: 0,
            isPowerOn: 1,
        };
    },
    components: {
        Login,
        WordRain,
    },
    methods: {
        openHancom() {
            this.$refs.wordRain.openHancom();
        },
        openLogin() {
            this.$refs.Login.openLogin();
        },
        closeMenuBar() {
            this.isOpenMenuBar = 0;
        },
        toggleMenuBar() {
            this.isOpenMenuBar = (this.isOpenMenuBar + 1) % 2;
        },
        closeAlert() {
            this.isAccessError = 0;
        },
        openAlert() {
            this.isAccessError = 1;
        },
        shutDownAll() {
            const audio = new Audio("../src/assets/soundEffect/shutdown.wav");
            audio.volume = 0.6;
            audio.play();
            this.isShutdown = 1;
        },

        openNaver() {
            window.location.href = "https://www.naver.com";
        },
        openLaundry() {
            window.location.href = "http://laundry-jungle.com/";
        },
        powerOff() {
            this.isShutdown = 0;
            this.isPowerOn = 0;
        },
    },
    setup() {
        let showHancom = ref(true);
        let showLogin = ref(true);
        return { showHancom, showLogin };
    },
    mounted() {
        document.body.style.backgroundImage =
            "url('../src/assets/image/background.gif')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPositionX = -500 + "px";
        document.body.animate(
            [
                { backgroundPositionX: "0px" },
                { backgroundPositionX: "-900px" },
                { backgroundPositionX: "0px" },
            ],
            {
                duration: 100000,
                iterations: Infinity,
            }
        );
        window.addEventListener("resize", () => {
            var rect = document
                .getElementById("outerComputer")
                .getBoundingClientRect();
            var pannelR = document.getElementById("monitorRightPannel");
            var pannelL = document.getElementById("monitorLeftPannel");
            var pannelT = document.getElementById("monitorTopPannel");
            pannelR.style.left = rect.right - 200 + "px";
            pannelR.style.height = rect.height + "px";
            pannelL.style.height = rect.height + "px";
            pannelT.style.width = rect.width + "px";
            pannelT.style.bottom = rect.height -125 + "px";
        });
    },
    unmounted() {
        clearInterval();
    },
};
</script>

<style scoped>
@font-face {
    font-family: "DungGeunMo";
    src: url(../assets/font/DungGeunMo.ttf);
}
.windowsWindow {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    position: relative;
}
.container {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgb(32, 119, 93);
}

.windowsSystemBar {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 35px;
    background-color: rgb(220, 220, 220);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.windowsSystemButton {
    width: fit-content;
    height: 32px;
    background-color: rgb(220, 220, 220);
    border: 1px solid #afafaf;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    display: flex;
    align-items: center;
}

.iconBox {
    position: absolute;
    top: 20px;
    left: 20px;
}
.iconElem {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    cursor: pointer;
    margin-bottom: 10px;
}
.iconImage {
    width: 60px;
    height: 60px;
    background-size: cover;
}
.iconWrapper {
    width: 75px;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.iconTitle {
    width: fit-content;
    max-width: 99px;
    word-wrap: normal;
    color: #ffffff;
    line-height: 100%;
}

.menuBar {
    position: absolute;
    width: 280px;
    height: 460px;
    max-height: 100vw;
    /* overflow-y: scroll; */
    bottom: 35px;
    background-color: rgb(220, 220, 220);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    z-index: 5;
    display: flex;
}
.menuBar::-webkit-scrollbar {
    display: none;
}

.menuItems {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    position: absolute;
}

.menuItems:hover {
    background-color: rgb(71, 71, 255);
}

#menuColorBar {
    width: 100%;
    height: 100%;
    background: linear-gradient(
        180deg,
        #001459 54.41%,
        #2555ff 82.76%,
        #001250 100%
    );
}
.inAccessable {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: not-allowed;
}

.inAccessModal {
    height: 15%;
    width: 25%;
    background-color: rgb(220, 220, 220);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
}

.inAccessBar {
    margin: 5px;
    height: 30px;
    background: linear-gradient(270deg, #1085d2 0%, #00007b 100%);
    cursor: not-allowed;
}
.inAccessContent {
    height: 70px;
}
.innerContent {
    width: 98%;
    height: 98%;
    display: flex;
    align-items: center;
    cursor: default;
}

#alertBtn {
    width: 74px;
    height: 25px;
    background-color: rgb(220, 220, 220);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.shutDownPage {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    color: orange;
    font-size: 4vw;
    text-align: center;
}
#outerComputer {
    box-sizing: border-box;
    position: absolute;
    bottom: 50px;
    left: 5vw;
    width: 90vw;
    max-width: 90vh;
    min-width: 355px;
    height: 90vw;
    max-height: 90vh;
    min-height: 355px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    box-sizing: border-box;
    border: 30px solid rgb(245, 245, 230);
    border-radius: 5%;
    transform: translateZ(100px);
}
#inComputer {
    position: relative;
    width: 90%;
    height: 90%;
    background-color: rgb(32, 119, 93);
}

.computerSet {
    overflow: hidden;
    width: 100%;
    height: 100%;
    perspective: 1000px;
}
#woodTable {
    width: 100%;
    height: 500px;
    position: fixed;
    z-index: -2;
    bottom: 0;
    background: linear-gradient(rgb(125, 25, 0), rgb(80, 20, 0));
    border: 5px solid #000;
    transform: rotateX(90deg) translateZ(-250px);
}
.desktop {
    position: absolute;
    bottom: 0;
    left: 110vh;
    width: 30vw;
    height: 100%;
    transform-style: preserve-3d;
    transform: translateZ(-200px);
    z-index: -1;
}
.desktopPannel {
    position: absolute;
    bottom: 0;
    width: 500px;
    height: 50vh;
    background: rgb(245, 245, 200);
    box-sizing: border-box;
    border: 10px solid rgb(0, 0, 0);
}
#frontPannel {
    height: 100vh;
    background: rgb(245, 245, 230);
    transform: translateZ(100px);
}
#backPannel {
    height: 100vh;
    background: rgb(245, 245, 230);
    transform: translateZ(-100px);
}
#leftPannel {
    width: 200px;
    height: 100vh;
    background: rgb(235, 235, 210);
    transform: rotateY(90deg) translateZ(-100px);
}
#rightPannel {
    width: 200px;
    height: 100vh;
    background: rgb(235, 235, 210);
    transform: rotateY(-90deg) translateZ(-100px);
}
.pannelComp {
    position: relative;
    box-sizing: border-box;
    margin-top: 10%;
    margin-left: 10%;
    width: 80%;
    height: 10%;
    background: rgb(240, 240, 220);
    border: 3px solid rgb(50, 50, 50);
}
.pannelComp-short {
    height: 5%;
}
.pannelComp-tall {
    height: 65%;
    box-shadow: inset 2px 2px 5px 3px rgb(60, 60, 60);
}
.oddInput {
    position: absolute;
    box-sizing: border-box;
    width: 98%;
    height: 50%;
    background: rgb(245, 245, 230);
    top: 1%;
    left: 1%;
    border: 2px solid #000;
    box-shadow: inset 1px 1px 0px 2px rgb(32, 32, 32);
}
#diskInput {
    width: 70%;
    height: 50%;
    left: 15%;
    top: 20%;
}
.oddInputButton {
    position: absolute;
    width: 10%;
    height: 10%;
    min-height: 10px;
    border: 1px solid #000;
    right: 1%;
    bottom: 30%;
    box-shadow: 1px 1px 2px 1px #000;
}

.powerButton {
    position: absolute;
    border-radius: 99%;
    background: radial-gradient(84.07% 84.07% at 26.67% 53.41%, #D9D9D9 0%, #969696 100%);
    border: 1px solid #000;
    box-shadow: 0px 0px 1px 1px #000;
}
.powerButton-power {
    bottom: 25%;
    left: 50%;
    width: 30px;
    height: 15%;
}
.powerButton-reset {
    bottom: 15%;
    left: 52%;
    width: 20px;
    height: 20px;
}
.monitor {
    position: relative;
    bottom: 0;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: translateZ(-100px);
}
.monitorPannel {
    box-sizing: border-box;
    position: absolute;
    bottom: 50px;
    width: 200px;
    height: 90vw;
    max-height: 90vh;
    min-height: 355px;
    border: 10px solid #000;
    background: rgb(240, 240, 220);
    border-radius: 5%;
}
#monitorTopPannel {
    left: 5vw;
    height: 200px;
    bottom: -2000px;
    transform: rotateX(90deg) translateY(-100px);
}
#monitorLeftPannel {
    left: 5vw;
    transform: rotateY(90deg) translateZ(-100px);
}
#monitorRightPannel {
    transform: rotateY(-90deg) translateZ(-100px);
}
#monitorBackPannel {
    transform: translateZ(-100px);
    bottom: 50px;
    left: 5vw;
    width: 90vw;
    max-width: 90vh;
    min-width: 355px;
    height: 90vw;
    max-height: 90vh;
    min-height: 355px;
    transform: translateZ(-100px);
}
</style>
