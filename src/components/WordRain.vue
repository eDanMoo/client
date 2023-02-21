<template>
    <div id="hancom" v-show="show">
        <div id="hancom-title">
            <span style="margin-left: 10px">정글타자연습</span>
            <img
                v-on:click="show = !show"
                src="../assets/gamecomp/Xbutton.png"
                style="
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                    margin-right: 5px;
                "
                alt=""
            />
        </div>
        <div id="hancom-menu">
            <p>게임 소개 | 놀이 | 산성비</p>
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
</template>

<script>
import { onMounted, ref } from "vue";
export default {
    setup() {
        const show = ref(true);

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
                let drawInterval = setInterval(function () {
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
                return drawInterval;
            }

            function downTaja() {
                const downInterval = setInterval(function () {
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
                        }
                    }
                }, DOWNTIME);
                return downInterval;
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
            drawTaja();
            downTaja();
        });
        return { setInterval, show };
    },
};
</script>

<style scoped>
#hancom {
    background: linear-gradient(
        351.27deg,
        #ffffff -854.98%,
        #eeeeee -854.98%,
        #cacaca -91.55%
    );
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    /* padding: 2vh; */
    width: 800px;
    height: 800px;
    box-shadow: 1px 1px black, inset 2px 2px white;
    border: solid black;
    font-family: "DungGeunMo";
    font-size: x-large;
    color: black;
    overflow: auto;
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
}

#hancom-menu {
    /* background-color: rgb(138, 137, 137); */
    background-color: rgb(172, 172, 172);
    border: 2px solid rgb(0, 0, 0);
    box-shadow: 1px 1px black, inset 2px 2px white;
    width: 100%;
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
