<template>
    <div class="shutDownPage" v-show="isShutdown">
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
                <div class="innerContent" style="justify-content: center">
                    <div>
                        <span>허가되지 않은 접근입니다.</span>
                    </div>
                </div>
                <div
                    style="width: 100%; display: flex; justify-content: center"
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
                    <span style="margin-right: 10px">Mindows Update</span>
                </div>
                <hr style="position: absolute; bottom: 400px; width: 99%" />
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
                <hr style="position: absolute; bottom: 85px; width: 99%" />
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
                    <span style="margin-right: 10px">시스템 종료(U)...</span>
                </div>
            </div>
        </div>
        <div class="windowsWindow" @click="closeMenuBar()">
            <div class="iconBox">
                <div class="iconElem" id="iconHancom" @dblclick="openHancom()">
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
                <div class="iconElem" id="iconHancom" @dblclick="openNaver()">
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
            </div>
            <WordRain ref="wordRain" />
        </div>
        <div class="windowsSystemBar">
            <div class="windowsSystemButton" @click="toggleMenuBar()">
                <img
                    style="height: 30px; margin-left: 7px; margin-right: 4px"
                    src="../assets/icon/icon_windows.png"
                    alt=""
                />
                <span style="margin-right: 10px"> <b>시 작</b></span>
            </div>
        </div>
        <div class="loginPannel">
            <Login />
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
            isOpenMenuBar: 0,
            isAccessError: 0,
            isShutdown: 0,
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
    },
    setup() {
        let showHancom = ref(true);
        return { showHancom };
    },
};
</script>

<style scoped>
@font-face {
    font-family: "DungGeunMo";
    src: url(../assets/font/DungGeunMo.ttf);
}
.loginPannel {
    width: 400px;
    position: fixed;
    right: 0;
}
.windowsWindow {
    width: 100%;
    /* max-width: 1700px; */
    height: 100vh;
    min-height: 800px;
    max-height: 100vh;
    display: flex;
    overflow: hidden;
    position: relative;
}
.container {
    width: 100vw;
    height: 100vh;
    min-height: 820px;
    display: flex;
    background-color: rgb(32, 119, 93);
}

.windowsSystemBar {
    position: fixed;
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
    width: 100vw;
    height: 100vh;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: not-allowed;
}

.inAccessModal {
    height: 150px;
    width: 400px;
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
    z-index: 99999999999999;
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
</style>
