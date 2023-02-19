<script></script>

<template>
    <div id="audioPlayer">
        <audio
            id="playAudio"
            src="./static/music/8 Bit Win! - HeatleyBros.ogg"
            loop
        ></audio>
        <div id="radioPannel">
            <div id="flowBoxWrapper">
                <div id="flowBox">
                    <span class="musicTitle" id="musicTitle1"
                        >Welcome Player! - Visager.ogg</span
                    >
                    <span class="musicTitle" id="musicTitle2"
                        >Welcome Player! - Visager.ogg</span
                    >
                </div>
            </div>
        </div>
        <div id="radioBtnBox">
            <div style="position: absolute; display: flex; margin: 6px">
                <button class="radioBtn" @click="playMusic()" id="radioPlayBtn">
                    <img
                        class="btnMark"
                        src="./static/image/btn_play.png"
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
                        src="./static/image/btn_pause.png"
                        alt=""
                    />
                </button>
                <button class="radioBtn" @click="prevMusic()" id="radioPrevBtn">
                    <img
                        class="btnMark"
                        src="./static/image/btn_prev.png"
                        alt=""
                    />
                </button>
                <button
                    class="radioBtn"
                    onclick="nextMusic()"
                    id="radioNextBtn"
                >
                    <img
                        class="btnMark"
                        src="./static/image/btn_next.png"
                        alt=""
                    />
                </button>
            </div>
        </div>
        <div id="radioVolume">
            <input type="range" id="volume-slider" max="100" value="60" />
        </div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: "retroFont";
    src: url("./static/font/digital.ttf") format("truetype");
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
    background-image: url("./static/image/radio_pannel.png");
    background-size: cover;
}

#radioBtnBox {
    width: 709px;
    height: 87px;
    margin: 0 auto;
    margin-top: 15px;
    background-image: url("./static/image/radio_btnBox.png");
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
    background-image: url("./static/image/radio_volume.png");
    background-size: cover;
}

.radioBtn {
    width: 174px;
    height: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("./static/image/btn_pop.png");
    background-size: cover;
}

#volume-slider {
    -webkit-appearance: none;
    /* 기본 적용 CSS 방지 */
    width: 98%;
    border-radius: 1px;
    /* 슬라이더 모서리 */
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
    outline: none;
    /* 슬라이더 테두리 없이 */
}

#volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* 기본 CSS 스타일을 적용하지 않기 위해서 */
    appearance: none;
    /* 기본 CSS 스타일을 적용하지 않기 위해서 */
    width: 25px;
    /* 슬라이더 핸들 길이 */
    height: 29.5px;
    /* 슬라이더 핸들 높이 */
    border-radius: 0%;
    /* 핸들 모양을 원모양으로 만들기 위함 */
    background: url("./static/image/slider_btn.png");
    /* 슬라이더 핸들 색상 */
    cursor: pointer;
    /* 슬라이더 핸들에 마우스를 갖다대면 포인터로 변경 */
}

#volume-slider::-moz-ramge-thumb {
    -webkit-appearance: none;
    /* 기본 CSS 스타일을 적용하지 않기 위해서 */
    appearance: none;
    /* 기본 CSS 스타일을 적용하지 않기 위해서 */
    width: 25px;
    /* 슬라이더 핸들 길이 */
    height: 29.5px;
    /* 슬라이더 핸들 높이 */
    border-radius: 0%;
    /* 핸들 모양을 원모양으로 만들기 위함 */
    background: url("./static/image/slider_btn.png");
    /* 슬라이더 핸들 색상 */
    cursor: pointer;
    /* 슬라이더 핸들에 마우스를 갖다대면 포인터로 변경 */
}
</style>
