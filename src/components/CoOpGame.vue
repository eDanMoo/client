<template>
    <div>
        <canvas id="board" class="game-board"></canvas>
    </div>
</template>

<script>
import { onMounted, watch } from "vue";

export default {
    props: {
        msg: {},
        delete_board: Number,
    },

    setup(props) {
        onMounted(() => {
            watch(
                () => props.msg,
                async () => {
                    if (props.msg.type == "next") {
                        let status = props.msg.status;
                        if (status == "continue") {
                            let word = props.msg.word;
                            let left = props.msg.left;
                            let length = props.msg.length;

                            let fall = props.msg.fall;
                            let current = -1;
                            let destination = current + fall;
                            let color =
                                colorSet[
                                    Math.floor(Math.random() * colorSet.length)
                                ];

                            storeInWordSet(
                                word,
                                left,
                                length,
                                current,
                                destination,
                                color
                            );
                        }
                    } else if (props.msg.type == "check") {
                        let remWords = props.msg.remWords;
                        let i = 0;
                        // 목록에서 단어 삭제
                        for (i = 0; i < remWords.length; i++) {
                            let word = remWords[i];
                            removeWordInWordSet(word);
                        }
                        // 남은 단어 옮기기
                        let moveInfo = props.msg.moveInfo;
                        for (i = 0; i < moveInfo.length; i++) {
                            let word = moveInfo[i][0];
                            let fall = moveInfo[i][1];
                            console.log(wordSet[word], word);
                            let destination = wordSet[word].destination;
                            await setDestination(word, destination, fall);
                            console.log("moveInfo : ", word, fall);
                        }
                    }
                }
            );

            watch(
                // 게임 끝나고 화면 지우기
                () => props.delete_board,
                (newValue) => {
                    if (newValue == 1) {
                        wordSet = {};

                        ctx.clearRect(
                            0,
                            0,
                            ctx.canvas.width,
                            ctx.canvas.height
                        );
                        // clearInterval(drawWord);
                    }
                }
            );

            const COLS = 11; // size
            const ROWS = 11; // size
            const BLOCK_SIZE = 63; // 700/11로 하니까 줄생김..

            const canvas = document.getElementById("board");
            const ctx = canvas.getContext("2d");

            ctx.canvas.width = COLS * BLOCK_SIZE;
            ctx.canvas.height = ROWS * BLOCK_SIZE;
            // ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

            let wordSet = {};
            const colorSet = [
                //원래
                ["#FFF100"],    //노랑(Yellow Rose)
                ["#FFBF00"],    //주황(Fluorescent Orange)
                ["#00F5FB"],    //청록(Aqua)
                ["#38FF12"],    //연두(Neon Green)
                ["#FF00E3"],    //자두(Fuchsia)
                ["#006FFF"],    //파랑(Brandeis Blue)
                ["#9600FF"],    //보라(Electric Violet)
                
                //추가
                ["#FF0000"],    //빨강(Red)
                ["#FF77FD"],    //약간진한분홍(Fuchsia Pink)
                ["#FFA9FD"],    //분홍(Rich Brilliant Lavender)
                ["#F7FFFC"],    //하늘(Waterspout)
                ["#F7FFFC"],    //하양(Mint Cream)
                ["#F5F8A3"],    //깔라만시(Calamansi)
                ["#00A7FA"],    //약간파랑(Vivid Cerulean)
                ["#2D9A4D"],    //초록(Sea Green)
                ["#FFFA8D"],    //파스텔 노랑(Pastel Yellow)
                ["#8001DD"],    //짙은 보라(French Violet)
            ];

            let drawWord = setInterval(() => {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                let i;
                let wordSetKey = Object.keys(wordSet);
                for (i = 0; i < wordSetKey.length; i++) {
                    let left = wordSet[wordSetKey[i]].left;
                    let length = wordSet[wordSetKey[i]].length;
                    let current = wordSet[wordSetKey[i]].current;
                    let destination = wordSet[wordSetKey[i]].destination;
                    let word = wordSetKey[i];
                    let colorBackground = wordSet[wordSetKey[i]].color;

                    let x = 0;
                    for (x = left; x < left + length; x++) {

                    //1안===========================================================

                        // ctx.fillStyle = colorBackground;
                        // ctx.fillRect(
                        //     x * BLOCK_SIZE,
                        //     current * BLOCK_SIZE,
                        //     1 * BLOCK_SIZE,
                        //     1 * BLOCK_SIZE
                        // );
                        
                        // ctx.fillStyle = "black";
                        // // 위쪽 여백
                        // ctx.clearRect(
                        //     x * BLOCK_SIZE,
                        //     current * BLOCK_SIZE,
                        //     BLOCK_SIZE,
                        //     0.03 * BLOCK_SIZE
                        // );
                        // // 아래쪽 여백
                        // ctx.clearRect(
                        //     x * BLOCK_SIZE,
                        //     (current + 0.97) * BLOCK_SIZE,
                        //     BLOCK_SIZE,
                        //     0.03 * BLOCK_SIZE
                        // );
                        // if (x == left ) {
                        // // 0.03 스킵
                        //     // 왼쪽 여백
                        //     ctx.clearRect(
                        //         x * BLOCK_SIZE,
                        //         current * BLOCK_SIZE,
                        //         0.03 * BLOCK_SIZE,
                        //         BLOCK_SIZE
                        //         );
                        // } else if (x == left + length){
                        //     // 오른쪽 여백
                        //     ctx.clearRect(
                        //         (x + 0.97) * BLOCK_SIZE,
                        //         current * BLOCK_SIZE,
                        //         0.03 * BLOCK_SIZE,
                        //         BLOCK_SIZE
                        //         );
                        //     }

                        //2안===========================================================

                        ctx.fillStyle = colorBackground;

                        if (x == left ) {
                        // 0.03 스킵
                            ctx.strokeStyle = "black";
                            ctx.beginPath();
                            ctx.roundRect(x * BLOCK_SIZE, current * BLOCK_SIZE, 1 * BLOCK_SIZE,
                            1 * BLOCK_SIZE, [20, 0, 0, 20]);
                            // ctx.stroke();
                            ctx.fill();
                            // 왼쪽 여백
                            ctx.clearRect(
                                x * BLOCK_SIZE,
                                current * BLOCK_SIZE,
                                0.03 * BLOCK_SIZE,
                                BLOCK_SIZE
                                );
                        } else if (x == left + length - 1){
                            ctx.strokeStyle = colorBackground;
                            ctx.beginPath();
                            ctx.roundRect(x * BLOCK_SIZE, current * BLOCK_SIZE, 1 * BLOCK_SIZE,
                            1 * BLOCK_SIZE, [0, 20, 20, 0]);
                            // ctx.stroke();
                            ctx.fill();

                            // 오른쪽 여백
                            ctx.clearRect(
                                (x + 0.97) * BLOCK_SIZE,
                                current * BLOCK_SIZE,
                                0.03 * BLOCK_SIZE,
                                BLOCK_SIZE
                                );
                        } else {
                            ctx.fillRect(
                                x * BLOCK_SIZE,
                                current * BLOCK_SIZE,
                                1 * BLOCK_SIZE,
                                1 * BLOCK_SIZE
                                );    
                        } 
                        
                        // 위쪽 여백
                        ctx.clearRect(
                            x * BLOCK_SIZE,
                            current * BLOCK_SIZE,
                            BLOCK_SIZE,
                            0.03 * BLOCK_SIZE
                        );
                        // 아래쪽 여백
                        ctx.clearRect(
                            x * BLOCK_SIZE,
                            (current + 0.97) * BLOCK_SIZE,
                            BLOCK_SIZE,
                            0.03 * BLOCK_SIZE
                        );

                        //3안===========================================================

                        // ctx.fillStyle = colorBackground;

                        // if (x == left ) {
                        // // 0.03 스킵
                        //     ctx.strokeStyle = "black";
                        //     ctx.beginPath();
                        //     ctx.roundRect(x * BLOCK_SIZE, current * BLOCK_SIZE, 1 * BLOCK_SIZE,
                        //     1 * BLOCK_SIZE, [20, 0, 0, 20]);
                        //     // ctx.stroke();
                        //     ctx.fill();

                        // } else if (x == left + length - 1){
                        //     ctx.strokeStyle = colorBackground;
                        //     ctx.beginPath();
                        //     ctx.roundRect(x * BLOCK_SIZE, current * BLOCK_SIZE, 1 * BLOCK_SIZE,
                        //     1 * BLOCK_SIZE, [0, 20, 20, 0]);
                        //     // ctx.stroke();
                        //     ctx.fill();

                        // } else {
                        //     ctx.fillRect(
                        //         x * BLOCK_SIZE,
                        //         current * BLOCK_SIZE,
                        //         1 * BLOCK_SIZE,
                        //         1 * BLOCK_SIZE
                        //         );    
                        // } 
                        
                        // // 위쪽 여백
                        // ctx.clearRect(
                        //     x * BLOCK_SIZE,
                        //     current * BLOCK_SIZE,
                        //     BLOCK_SIZE,
                        //     0.03 * BLOCK_SIZE
                        // );
                        // // 아래쪽 여백
                        // ctx.clearRect(
                        //     x * BLOCK_SIZE,
                        //     (current + 0.97) * BLOCK_SIZE,
                        //     BLOCK_SIZE,
                        //     0.03 * BLOCK_SIZE
                        // );

                        // // 왼쪽 여백
                        // ctx.clearRect(
                        //     x * BLOCK_SIZE,
                        //     current * BLOCK_SIZE,
                        //     0.03 * BLOCK_SIZE,
                        //     BLOCK_SIZE
                        // );
                        // // 오른쪽 여백
                        // ctx.clearRect(
                        //     (x + 0.97) * BLOCK_SIZE,
                        //     current * BLOCK_SIZE,
                        //     0.03 * BLOCK_SIZE,
                        //     BLOCK_SIZE
                        // );

                        // 텍스트
                        ctx.fillStyle = "black";
                        ctx.font = `${(48 / 63) * BLOCK_SIZE}px DungGeunMo`;
                        ctx.fillText(
                            word[x - left],
                            (x + 0.12) * BLOCK_SIZE,
                            (current + 1 - 0.29) * BLOCK_SIZE
                        );
                    }
                    if (current < destination) {
                        wordSet[wordSetKey[i]].current = current + 0.1;
                    }
                }
            }, 5);

            function setDestination(word, destination, fall) {
                wordSet[word].destination = destination + fall;
            }

            // -----------------------------------------> 단어 목록에 단어 저장하기 함수
            function storeInWordSet(
                word,
                left,
                length,
                current,
                destination,
                color
            ) {
                let key = word;
                wordSet[key] = {
                    left: left,
                    length: length,
                    current: current,
                    destination: destination,
                    color: color,
                };
            }
            // <----------------------------------------- 단어 목록에 단어 저장하기 함수

            // -----------------------------------------> 단어 목록에서 단어 삭제하기 함수
            function removeWordInWordSet(word) {
                delete wordSet[word];
            }
            // <----------------------------------------- 단어 목록에서 단어 삭제하기 함수
        });

        return {};
    },
};
</script>

<style scoped>
#board {
    background-color: rgba(0, 0, 0, 0.7);
}

@font-face {
    font-family: "DungGeunMo";
    src: url("/assets/font/DungGeunMo.woff2");
}
</style>
