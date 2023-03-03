<template>
    <audio
        src="/assets/soundEffect/audio_work.mp3"
        loop
        muted
        volume="0.5"
        id="audio_work"
    ></audio>
    <div class="threeDimension">
        <div class="monitor">
            <div class="outerComputer" id="outerComputer">
                <div class="inComputer" id="inComputer">
                    <div
                        class="shutDownPage"
                        id="shutDownPage"
                        v-show="isShutdown"
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
                                        src="/assets/image/button/btn_close.png"
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
                                    <div id="alertBtn" @click="closeAlert()">
                                        닫 기
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="containerOuter">
                        <div class="container">
                            <div class="menuBar" v-show="isOpenMenuBar">
                                <div
                                    style="width: 13%; height: 98%; margin: 1%"
                                >
                                    <div id="menuColorBar"></div>
                                </div>
                                <div
                                    style="
                                        width: 85%;
                                        height: 100%;
                                        position: relative;
                                    "
                                >
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
                                            src="/assets/image/icon/icon_updates.png"
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
                                            src="/assets/image/icon/icon_programs.png"
                                            alt=""
                                        />
                                        <span style="margin-right: 10px"
                                            >프로그램(P)</span
                                        >
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
                                            src="/assets/image/icon/icon_favorites.png"
                                            alt=""
                                        />
                                        <span style="margin-right: 10px"
                                            >즐겨찾기(A)</span
                                        >
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
                                            src="/assets/image/icon/icon_documents.png"
                                            alt=""
                                        />
                                        <span style="margin-right: 10px"
                                            >문서(D)</span
                                        >
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
                                            src="/assets/image/icon/icon_settings.png"
                                            alt=""
                                        />
                                        <span style="margin-right: 10px"
                                            >설정(S)</span
                                        >
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
                                            src="/assets/image/icon/icon_find.png"
                                            alt=""
                                        />
                                        <span style="margin-right: 10px"
                                            >찾기(F)</span
                                        >
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
                                            src="/assets/image/icon/icon_help.png"
                                            alt=""
                                        />
                                        <span style="margin-right: 10px"
                                            >도움말(H)</span
                                        >
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
                                            src="/assets/image/icon/icon_run.png"
                                            alt=""
                                        />
                                        <span style="margin-right: 10px"
                                            >실행(R)</span
                                        >
                                    </div>
                                    <hr
                                        style="
                                            position: absolute;
                                            bottom: 85px;
                                            width: 99%;
                                        "
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
                                            src="/assets/image/icon/icon_logOff.png"
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
                                            src="/assets/image/icon/icon_shutdown.png"
                                            alt=""
                                        />
                                        <span style="margin-right: 10px"
                                            >시스템 종료(U)...</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <div
                                class="windowsWindow"
                                @click="closeMenuBar()"
                                v-show="isPowerOn"
                            >
                                <div class="iconBox">
                                    <div
                                        class="iconElem"
                                        id="iconExplorer"
                                        @click="openNaver()"
                                    >
                                        <div class="iconWrapper">
                                            <div
                                                class="iconImage"
                                                style="
                                                    background-image: url('/assets/image/icon/icon_explorer.png');
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
                                        @click="openHancom()"
                                    >
                                        <div class="iconWrapper">
                                            <div
                                                class="iconImage"
                                                style="
                                                    background-image: url('/assets/image/icon/icon_hancom.png');
                                                "
                                            ></div>
                                        </div>
                                        <div class="iconTitle">
                                            정글타자연습
                                        </div>
                                    </div>
                                    <div
                                        class="iconElem"
                                        id="iconWordgame"
                                        @click="openLogin()"
                                    >
                                        <div class="iconWrapper">
                                            <div
                                                class="iconImage"
                                                style="
                                                    background-image: url('/assets/image/icon/icon_wordgame.png');
                                                "
                                            ></div>
                                        </div>
                                        <div class="iconTitle">단어게임</div>
                                    </div>
                                    <div
                                        class="iconElem"
                                        id="iconLaundry"
                                        @click="openLaundry()"
                                    >
                                        <div class="iconWrapper">
                                            <div
                                                class="iconImage"
                                                style="
                                                    background-image: url('/assets/image/icon/icon_laundry.png');
                                                "
                                            ></div>
                                        </div>
                                        <div class="iconTitle">
                                            Laundry<br />
                                            Jungle
                                        </div>
                                    </div>
                                    <div
                                        class="iconElem"
                                        id="iconLaundry"
                                        @click="openCodewarts()"
                                    >
                                        <div class="iconWrapper">
                                            <div
                                                class="iconImage"
                                                style="
                                                    background-image: url('/assets/image/icon/icon_codewarts.png');
                                                    height: 52px;
                                                "
                                            ></div>
                                        </div>
                                        <div class="iconTitle">CODEWARTS</div>
                                    </div>
                                </div>
                                <WordRain ref="wordRain" />
                                <Login ref="Login" />
                            </div>
                            <div class="windowsSystemBar" v-show="isPowerOn">
                                <div
                                    class="windowsSystemButton"
                                    @click="toggleMenuBar()"
                                >
                                    <img
                                        style="
                                            height: 30px;
                                            margin-left: 7px;
                                            margin-right: 4px;
                                        "
                                        src="/assets/image/icon/icon_windows.png"
                                        alt=""
                                    />
                                    <span style="margin-right: 10px">
                                        <b>시 작</b></span
                                    >
                                </div>
                                <div id="windowTime">
                                    {{ this.ymd }} <br />
                                    {{ this.hms }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="monitorPannel" id="monitorTopPannel"></div>
            <div class="monitorPannel" id="monitorLeftPannel"></div>
            <div class="monitorPannel" id="monitorRightPannel"></div>
        </div>
        <div class="desktop">
            <div class="desktopPannel" id="frontPannel">
                <div class="pannelComp">
                    <div class="oddInput" id="cdInput"></div>
                    <div class="oddInputButton"></div>
                </div>
                <div class="pannelComp pannelComp-short">
                    <div class="oddInput" id="diskInput"></div>
                    <div
                        class="oddInputButton"
                        style="border-radius: 999%"
                    ></div>
                </div>
                <div class="pannelComp pannelComp-tall">
                    <div class="workButton" v-show="isPowerOn"></div>
                    <div class="workButtonOff" v-show="!isPowerOn"></div>
                    <div class="statusButton" v-show="isPowerOn"></div>
                    <div class="statusButtonOff" v-show="!isPowerOn"></div>
                    <div
                        class="powerButton powerButton-power"
                        @click="togglePower"
                    ></div>
                    <div
                        class="powerButton powerButton-reset"
                        @click="reload"
                    ></div>
                </div>
            </div>
            <div class="desktopPannel" id="leftPannel"></div>
            <div class="desktopPannel" id="rightPannel"></div>
        </div>
        <div class="thanksFrame">
            <div class="thanksPannel" id="thanksFront">
                <div class="innerThanks">
                    Thanks To
                    <div class="innerThanks" id="thanksContent">
                        <span>
                            DEVELOP<br />
                            <a href="https://github.com/eDanMoo"
                                class="highlightLink"
                                >@TEAM eDanMoo<br
                            /></a>
                            <br />
                            MEMBER<br />
                            <a href="https://github.com/Jungeun04"
                                class="highlightLink"
                                >PARK JUNGEUN<br
                            /></a>
                            <a href="https://github.com/sj0917"
                                class="highlightLink"
                                >LEE SANGJUN<br
                            /></a>
                            <a href="https://github.com/Heruing"
                                class="highlightLink"
                                >LEE HYUNHONG<br
                            /></a>
                            <a href="https://github.com/hierrr"
                                class="highlightLink"
                                >SON CHANGHAN<br
                            /></a>
                            <a href="https://github.com/hunkicho"
                                class="highlightLink"
                                >CHO HUNKI<br
                            /></a>
                            <br />
                            Special Thanks To<br />
                            <a href="https://jungle.krafton.com/"
                                class="highlightLink"
                                >KRAFTON Jungle</a
                            >
                        </span>
                    </div>
                </div>
            </div>
            <div class="thanksPannel" id="thanksBack"></div>
            <div class="thanksPannel" id="thanksLeft"></div>
            <div class="thanksPannel" id="thanksRight"></div>
            <div class="thanksPannel" id="thanksTop"></div>
            <div class="thanksPannel" id="thanksBottom"></div>
            <div class="thanksPannel" id="thanksrod"></div>
        </div>
        <div id="woodTable"></div>
        <div id="clock">
            <div class="clockPannel" id="clockFront"></div>
            <div class="clockPannel" id="clockPannel">
                <div id="timePannel">
                    {{ hms }}
                </div>
            </div>
            <div class="clockPannel" id="clockLeft"></div>
            <div class="clockPannel" id="clockRight"></div>
            <div class="clockPannel" id="clockTop"></div>
            <div class="clockPannel" id="clockBottom"></div>
        </div>
        <div class="cabinetBack">
            <div
                class="cabinetPannel cabinetBackPannel"
                id="cabinetBackFront"
            ></div>
            <div
                class="cabinetPannel cabinetBackPannel"
                id="cabinetBackBottom"
            ></div>
        </div>
        <div class="cabinetFront">
            <div
                class="cabinetPannel cabinetFrontPannel"
                id="cabinetFrontFront"
            ></div>
            <div
                class="cabinetPannel cabinetFrontPannel"
                id="cabinetFrontLeft"
            ></div>
            <div
                class="cabinetPannel cabinetFrontPannel"
                id="cabinetFrontTop"
            ></div>
            <div
                class="cabinetPannel cabinetFrontPannel"
                id="cabinetFrontBottom"
            ></div>
        </div>
        <div class="cube" id="cube-one">
            <div class="cubePannel" id="cubeFront"></div>
            <div class="cubePannel" id="cubeBack"></div>
            <div class="cubePannel" id="cubeLeft"></div>
            <div class="cubePannel" id="cubeRight"></div>
            <div class="cubePannel" id="cubeTop"></div>
            <div class="cubePannel" id="cubeBottom"></div>
        </div>
        <div class="cube" id="cube-two">
            <div class="cubePannel" id="cubeFront"></div>
            <div class="cubePannel" id="cubeBack"></div>
            <div class="cubePannel" id="cubeLeft"></div>
            <div class="cubePannel" id="cubeRight"></div>
            <div class="cubePannel" id="cubeTop"></div>
            <div class="cubePannel" id="cubeBottom"></div>
        </div>
        <div class="cube" id="cube-three">
            <div class="cubePannel" id="cubeFront"></div>
            <div class="cubePannel" id="cubeBack"></div>
            <div class="cubePannel" id="cubeLeft"></div>
            <div class="cubePannel" id="cubeRight"></div>
            <div class="cubePannel" id="cubeTop"></div>
            <div class="cubePannel" id="cubeBottom"></div>
        </div>
        <div class="cube" id="cube-four">
            <div class="cubePannel" id="cubeFront"></div>
            <div class="cubePannel" id="cubeBack"></div>
            <div class="cubePannel" id="cubeLeft"></div>
            <div class="cubePannel" id="cubeRight"></div>
            <div class="cubePannel" id="cubeTop"></div>
            <div class="cubePannel" id="cubeBottom"></div>
        </div>
        <div class="picture">
            <div class="picturePannel" id="pictureFront"></div>
            <div class="picturePannel" id="pictureBack"></div>
            <div class="picturePannel" id="pictureLeft"></div>
            <div class="picturePannel" id="pictureRight"></div>
            <div class="picturePannel" id="pictureTop"></div>
            <div class="picturePannel" id="pictureBottom"></div>
        </div>
    </div>
</template>

<script>
import Login from "../components/Login.vue";
import WordRain from "../components/WordRain.vue";
import { ref } from "vue";

export default {
    data() {
        return {
            isOpenMenuBar: false,
            isAccessError: false,
            isShutdown: false,
            isPowerOn: true,
            hms: "",
            ymd: "",
            bebeep: null,
        };
    },
    components: {
        Login,
        WordRain,
    },
    watch: {
        isPowerOn: function () {
            const audio_work = document.getElementById("audio_work");
            if (this.isPowerOn) {
                audio_work.play();
            } else {
                audio_work.pause();
            };
        },
    },
    methods: {
        reload() {
            new Audio("/assets/soundEffect/audio_clickAndBeep.mp3").play();
            setTimeout(() => {
                this.$router.go(this.$router.currentRoute);
            }, 600);
        },
        openHancom() {
            new Audio("/assets/soundEffect/audio_open.wav").play();
            this.$refs.wordRain.openHancom();
        },
        openLogin() {
            new Audio("/assets/soundEffect/audio_open.wav").play();
            this.$refs.Login.openLogin();
        },
        closeMenuBar() {
            this.isOpenMenuBar = false;
        },
        toggleMenuBar() {
            new Audio("/assets/soundEffect/audio_menu.wav").play();
            this.isOpenMenuBar = !this.isOpenMenuBar;
        },
        closeAlert() {
            new Audio("/assets/soundEffect/basic_click.mp3").play();
            this.isAccessError = false;
        },
        openAlert() {
            new Audio("/assets/soundEffect/audio_error.wav").play();
            this.isAccessError = true;
        },
        shutDownAll() {
            const audio = new Audio("/assets/soundEffect/shutdown.wav");
            audio.volume = 0.6;
            audio.play();
            setTimeout(() => {
                this.isShutdown = true;
            }, 1800);
            setTimeout(() => {
                this.powerOff();
            }, 3000);
        },
        openNaver() {
            this.bebeep.play();
            setTimeout(() => {
                window.location.href = "https://www.naver.com";
            }, 500);
        },
        openLaundry() {
            this.bebeep.play();
            setTimeout(() => {
                window.location.href = "http://laundry-jungle.com/";
            }, 500);
        },
        openCodewarts() {
            new Audio("/assets/soundEffect/audio_codewarts.mp3").play();
            setTimeout(() => {
                window.location.href = "https://codewarts.store/";
            }, 4200);
        },
        powerOff() {
            this.isShutdown = false;
            this.isPowerOn = false;
            this.isOpenMenuBar = false;
        },
        togglePower() {
            if (this.isPowerOn) {
                this.shutDownAll();
            } else {
                const audio_bootup = new Audio(
                    "/assets/soundEffect/audio_bootup.mp3"
                );
                const audio_startup = new Audio(
                    "/assets/soundEffect/audio_startup.wav"
                );
                audio_bootup.volume = 0.6;
                audio_startup.volume = 0.6;
                audio_bootup.play();
                setTimeout(() => {
                    this.isPowerOn = true;
                    audio_startup.play();
                }, 5000);
            }
        },
        updatePannel() {
            let pannelR = document.getElementById("monitorRightPannel");
            let pannelL = document.getElementById("monitorLeftPannel");
            let pannelT = document.getElementById("monitorTopPannel");
            let rect = document
                .getElementById("outerComputer")
                .getBoundingClientRect();
            pannelR.style.left = rect.right - 200 + "px";
            pannelR.style.height = rect.height + "px";
            pannelL.style.height = rect.height + "px";
            pannelT.style.width = rect.width + "px";
            pannelT.style.bottom = rect.height - 50 + "px";
        },

        removeScrollListener() {
            window.addEventListener("resize", this.updatePannel);
        },
        updateTime() {
            let today = new Date();
            this.ymd = today.toLocaleDateString();
            this.hms = today.toLocaleTimeString();
        },
    },
    setup() {
        let showHancom = ref(true);
        let showLogin = ref(true);
        return { showHancom, showLogin };
    },
    mounted() {
        const work = document.getElementById("audio_work");
        work.volume = 1;
        work.play();
        let pannelR = document.getElementById("monitorRightPannel");
        let pannelL = document.getElementById("monitorLeftPannel");
        let pannelT = document.getElementById("monitorTopPannel");
        document.body.style.background = "rgb(10, 45, 10)";
        this.bebeep = new Audio("/assets/soundEffect/audio_bebeep.mp3");
        this.bebeep.volume = 0.6;
        let rect = document
            .getElementById("outerComputer")
            .getBoundingClientRect();
        pannelR.style.left = rect.right - 200 + "px";
        pannelR.style.height = rect.height + "px";
        pannelL.style.height = rect.height + "px";
        pannelT.style.width = rect.width + "px";
        pannelT.style.bottom = rect.height - 50 + "px";
        window.addEventListener("resize", this.updatePannel);
        setInterval(this.updateTime, 1000);
    },
    unmounted() {
        clearInterval();
        this.removeScrollListener();
    },
};
</script>

<style scoped>
@font-face {
    font-family: "DungGeunMo";
    src: url(/assets/font/DungGeunMo.woff2);
}
.windowsWindow {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    position: relative;
    background-color: rgb(32, 119, 93);
    box-shadow: 0 0 30px 1px rgb(32, 119, 93);
}
.container {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    background-color: rgb(0, 0, 0);
}
.containerOuter {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: rgb(0, 0, 0);
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
    max-height: 90vw;
    /* overflow-y: scroll; */
    bottom: 35px;
    background-color: rgb(220, 220, 220);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    z-index: 5;
    overflow: hidden;
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
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: not-allowed;
}

.inAccessModal {
    height: 15%;
    min-height: 150px;
    width: 25%;
    min-width: 200px;
    background-color: rgb(220, 220, 220);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
}

.inAccessBar {
    margin: 5px;
    height: 25px;
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
    display: flex;
    position: absolute;
    bottom: 50px;
    left: 5vw;
    width: 90vw;
    max-width: 90vh;
    min-width: 355px;
    height: 90vw;
    max-height: 90vh;
    min-height: 355px;
    justify-content: center;
    overflow: hidden;
    align-items: center;
    background-color: rgb(245, 245, 230);
    box-sizing: border-box;
    border: 10px solid #000;
}
#inComputer {
    position: relative;
    width: 90%;
    height: 90%;
    background-color: rgb(32, 119, 93);
    border: 10px solid #000;
}

.threeDimension {
    overflow: hidden;
    width: 100%;
    height: 100%;
    min-height: 800px;
    perspective: 1000px;
}
#woodTable {
    width: 200%;
    left: -5%;
    height: 500px;
    position: fixed;
    z-index: -2;
    bottom: 0;
    background: linear-gradient(rgb(125, 25, 0), rgb(80, 20, 0));
    border: 5px solid #000;
    transform: rotateX(70deg) translateZ(-200px);
}
.desktop {
    position: absolute;
    bottom: 0;
    left: 110vh;
    width: 30vw;
    height: 100%;
    transform-style: preserve-3d;
    transform: translateZ(-250px);
    z-index: 2;
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
    position: relative;
    height: 60%;
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

@keyframes blinkGreen {
    0% {
        background: rgb(10, 225, 70);
    }
    100% {
        background: rgb(22, 255, 94);
        box-shadow: 0 0 1px 1px rgb(22, 255, 94);
    }
}
@keyframes blinkOrange {
    0% {
        background: rgb(234, 110, 0);
    }
    99% {
        background: rgb(234, 110, 0);
    }
    100% {
        background: rgb(255, 145, 40);
        box-shadow: 0 0 1px 1px rgb(255, 145, 40);
    }
}
.workButton {
    position: absolute;
    width: 10px;
    height: 10px;
    left: 50%;
    bottom: 50%;
    border-radius: 99%;
    border: 1px solid rgb(234, 110, 0);
    box-shadow: 0px 0px 1px 1px #000;
    animation: blinkOrange 0.5s alternate infinite;
}
.workButtonOff {
    position: absolute;
    width: 10px;
    height: 10px;
    left: 50%;
    bottom: 50%;
    border-radius: 99%;
    border: 1px solid rgb(234, 110, 0);
    background-color: rgb(234, 110, 0);
    box-shadow: 0px 0px 1px 1px #000;
}
.statusButton {
    position: absolute;
    width: 10px;
    height: 10px;
    left: 50%;
    bottom: 45%;
    border-radius: 99%;
    border: 1px solid rgb(10, 225, 70);
    box-shadow: 0px 0px 1px 1px #000;
    animation: blinkGreen 0.2s infinite;
}
.statusButtonOff {
    position: absolute;
    width: 10px;
    height: 10px;
    left: 50%;
    bottom: 45%;
    border-radius: 99%;
    border: 1px solid rgb(10, 225, 70);
    background: rgb(10, 225, 70);
    box-shadow: 0px 0px 1px 1px #000;
}
.powerButton {
    position: absolute;
    border-radius: 99%;
    background: radial-gradient(
        84.07% 84.07% at 26.67% 53.41%,
        #d9d9d9 0%,
        #969696 100%
    );
    border: 1px solid #000;
    box-shadow: 0px 0px 1px 1px #000;
}
.powerButton-power {
    bottom: 25%;
    left: 47.5%;
    width: 30px;
    height: 15%;
    cursor: pointer;
}
.powerButton-reset {
    bottom: 15%;
    left: 48.7%;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
.monitor {
    bottom: 0;
    height: 100%;
    transform-style: preserve-3d;
    z-index: 3;
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
    min-height: 200px;
    bottom: 50px;
    transform: translateZ(-100px) rotateX(90deg);
}
#monitorLeftPannel {
    left: 5vw;
    transform: translateZ(-100px) translateX(-100px) rotateY(90deg);
}
#monitorRightPannel {
    transform: translateZ(-100px) translateX(100px) rotateY(90deg);
}
.thanksFrame {
    position: absolute;
    bottom: 0;
    left: 170vh;
    width: 300px;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateX(30deg) translateY(-150px) translateZ(-350px);
}
.thanksPannel {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    width: 350px;
    background: rgb(0, 0, 0);
    border: 5px solid rgb(22, 255, 94);
}
#thanksFront {
    height: 600px;
    padding: 20px;
    transform: translateZ(10px);
    overflow: hidden;
}
#thanksBack {
    height: 600px;
    transform: translateZ(-10px);
}
#thanksLeft {
    width: 20px;
    height: 600px;
    transform: rotateY(-90deg) translateZ(10px);
}
#thanksRight {
    height: 600px;
    width: 20px;
    transform: rotateY(90deg) translateZ(-10px);
}
#thanksTop {
    height: 20px;
    bottom: 600px;
    transform: rotateX(-90deg) translateZ(10px);
}
#thanksBottom {
    height: 20px;
    transform: rotateX(90deg) translateZ(-10px);
}
#thanksrod {
    background-color: rgb(22, 255, 94);
    border-color: black;
    height: 200px;
    transform: rotateX(-40deg) translateZ(-100px);
}
.innerThanks {
    width: 100%;
    height: 100%;
    color: rgb(22, 255, 94);
    font-size: 2rem;
}
#thanksContent {
    width: 90%;
    height: 85%;
    border: 1px solid rgb(22, 255, 94);
    overflow: hidden;
    font-size: 1.5rem;
    padding: 5%;
}
#thanksContent > span > a {
    color: rgb(22, 255, 94);
    cursor: pointer;
}
#clock {
    position: absolute;
    top: 0;
    transform-style: preserve-3d;
    transform: translateX(-20vw) translateY(-300px) translateZ(-800px);
    z-index: -1;
}
.clockPannel {
    box-sizing: border-box;
    position: absolute;
    border: 3px solid rgb(22, 255, 94);
    background: rgba(32, 32, 32, 0.4);
}
#clockPannel {
    width: 500px;
    height: 250px;
    left: 20px;
    transform: translateZ(10px);
    display: flex;
    justify-content: center;
    align-items: center;
}
#timePannel {
    width: 98%;
    height: 95%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(22, 255, 94);
    font-size: 4.5rem;
    font-family: "retroFont";
    text-shadow: -1px 0 #d0ffd2, 0 1px #d0ffd2, 1px 0 #d0ffd2, 0 -1px #d0ffd2;
}
#clockFront {
    width: 500px;
    height: 250px;
    left: 20px;
    transform: translateZ(20px);
    background: transparent;
}
#clockLeft {
    width: 40px;
    height: 250px;
    transform: rotateY(90deg);
}
#clockRight {
    width: 40px;
    height: 250px;
    left: 500px;
    transform: rotateY(90deg);
}
#clockTop {
    width: 500px;
    height: 40px;
    left: 20px;
    transform: rotateX(90deg) translateZ(20px);
}
#clockBottom {
    width: 500px;
    height: 40px;
    left: 20px;
    top: 250px;
    transform: rotateX(90deg) translateZ(20px);
}
#windowTime {
    width: fit-content;
    height: 32px;
    background-color: rgb(220, 220, 220);
    border: 2px solid rgb(220, 220, 220);
    box-shadow: 0 0 0 1px rgb(32, 32, 32);
    display: flex;
    align-items: center;
    line-height: 96%;
}
.cabinetBack {
    position: absolute;
    transform-style: preserve-3d;
    top: 0;
    transform: translateX(-20vw) translateY(50px) translateZ(-800px);
    z-index: -100;
}

.cabinetPannel {
    box-sizing: border-box;
    position: absolute;
    border: 3px solid rgb(0, 0, 0);
    background: linear-gradient(rgb(125, 25, 0), rgb(80, 20, 0));
}
#cabinetBackFront {
    width: 3000px;
    height: 500px;
    left: 50px;
    transform: translateZ(100px);
}
#cabinetBackBottom {
    width: 3000px;
    height: 100px;
    left: 50px;
    top: 500px;
    transform: rotateX(90deg) translateZ(50px);
}
.cabinetFront {
    position: absolute;
    transform-style: preserve-3d;
    transform: translateX(-20vw) translateZ(-700px);
    top: 400px;
    left: 50px;
    z-index: -1;
}
#cabinetFrontFront {
    width: 3000px;
    height: 60px;
    transform: translateZ(300px);
}
#cabinetFrontLeft {
    width: 300px;
    height: 60px;
    transform: translateX(-150px) translateZ(150px) rotateY(90deg);
}
#cabinetFrontTop {
    width: 3000px;
    height: 300px;
    transform: translateY(-150px) translateZ(150px) rotateX(90deg);
}
#cabinetFrontBottom {
    width: 3000px;
    height: 300px;
    transform: translateY(-90px) translateZ(150px) rotateX(90deg);
    background: linear-gradient(rgb(60, 10, 0), rgb(80, 20, 0));
}
.cube {
    position: absolute;
    transform-style: preserve-3d;
    transform: translateZ(-700px);
    z-index: -2;
}
#cube-one {
    top: 200px;
    left: 2000px;
}
#cube-two {
    top: 200px;
    left: 1800px;
}
#cube-three {
    top: 200px;
    left: 1400px;
}
#cube-four {
    top: 0px;
    left: 1920px;
    z-index: -3;
}
.cubePannel {
    box-sizing: border-box;
    position: absolute;
    border: 3px solid rgba(22, 255, 94, 0.8);
    background: rgba(0, 0, 0, 0.5);
    width: 200px;
    height: 200px;
}
#cubeFront {
    transform: translateZ(200px);
}
#cubeBack {
}
#cubeLeft {
    transform: translateZ(100px) translateX(-100px) rotateY(-90deg);
}
#cubeRight {
    transform: translateZ(100px) translateX(100px) rotateY(90deg);
}
#cubeTop {
    transform: translateZ(100px) translateY(-100px) rotateX(90deg);
}
#cubeBottom {
    transform: translateZ(100px) translateY(100px) rotateX(-90deg);
}

.picture {
    position: absolute;
    transform-style: preserve-3d;
    transform: translateZ(-400px) translateY(100px) rotateX(30deg);
    z-index: -2;
    top: 100px;
    left: 30px;
}
.picturePannel {
    box-sizing: border-box;
    position: absolute;
    border: 3px solid rgb(0, 0, 0);
    width: 1000px;
    height: 300px;
    background: burlywood;
}
#pictureFront {
    transform: translateZ(50px);
}
#pictureBack {
    background: burlywood;
}
#pictureLeft {
    width: 50px;
    transform: translateZ(25px) translateX(-25px) rotateY(-90deg);
}
#pictureRight {
    width: 50px;
    transform: translateZ(25px) translateX(975px) rotateY(90deg);
}
#pictureTop {
    height: 50px;
    transform: translateZ(25px) translateY(-25px) rotateX(90deg);
}
#pictureBottom {
    height: 50px;
    transform: translateZ(25px) translateY(275px) rotateX(-90deg);
}
.highlightLink:hover {
    text-shadow: 3px 5px 10px rgb(117, 255, 161);
}
</style>
