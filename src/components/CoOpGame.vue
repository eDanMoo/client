<template>
    <div>
        <canvas id="board" class="game-board"></canvas>
    </div>

    <!-- 일단 복붙해옴 -->
    <!-- <div class="answerBox">
                        <input
                            type="text"
                            id="input_answer"
                            style="width: 250px; font-size: 2rem"
                        />
                        <button
                            id="submit_answer"
                            style="margin-left: 10px; font-size: 2rem"
                        >
                            제출
                        </button>
                        <button
                            id="submit_answer2"
                            style="margin-left: 10px; font-size: 2rem"
                        >
                            제출2
                        </button>
                        <button
                            id="game_start"
                            @click="init()"
                        >
                            게임 시작
                        </button>
  </div> -->
</template>

<script>
import { onMounted, watch } from "vue";

export default {
    props: {
        msg: {},
    },

    setup(props) {
        onMounted(() => {
            // 나중에 연결하면 살리기
            watch(
                () => props.msg,
                () => {
                    console.log(props.msg);
                    if (props.msg.type == "next") {
                        let status = props.msg.status;
                        if (status == "continue") {
                            let word = props.msg.word;
                            let left = props.msg.left;
                            let length = props.msg.length;
                            let fall = props.msg.fall;

                            storeInWordSet(word, left, length, -1);
                            dropWord(word, fall);
                        }
                    } else if (props.msg.type == "check") {
                        let removeWords = props.msg.removeWords;
                        for (i = 0; i < removeWords.length; i++) {
                            removeWord(removeWords[i]);
                        }
                        let moveInfo = props.msg.moveInfo;
                        for (i = 0; i < moveInfo.length; i++) {
                            let newword = moveInfo[i][0];
                            let fall = moveInfo[i][1];
                            dropWord(newword, fall);

                            // 떨어지는 글자 사라지게 구현하기
                        }
                    }
                }
            );

            //단어 입력하면 삭제시키기
            // var inputAnswer = -1

            // button.addEventListener('click', function(event) {
            //   console.log("단어 입력 함수 동작함")
            //   let a = input.value;
            //   console.log("입력값 :", a)
            //   let b = Object.keys(wordSet)
            //   for (i=0; i < b.length; i++) {

            //     if (b[i] == a && wordSet[b[i]].height != -1) {
            //       removeWord(a);
            //     }
            //     inputAnswer = a
            //   }
            // }
            // )

            //점수채우기

            // 초기화-----------------------------------------------------------------
            const COLS = 11; // size
            const ROWS = 11; // size
            const BLOCK_SIZE = 63; // 700/11로 하니까 줄생김..

            const canvas = document.getElementById("board");
            const ctx = canvas.getContext("2d");

            ctx.canvas.width = COLS * BLOCK_SIZE;
            ctx.canvas.height = ROWS * BLOCK_SIZE;
            // ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

            const wordSet = {};
            // 초기화-----------------------------------------------------------------

            // -----------------------------------------> 단어 drop 함수
            function dropWord(word, fall) {
                // 단어 받기
                console.log(wordSet);
                const wordBlock = findInfoByWord(word);

                let left = wordBlock.left;
                let length = wordBlock.length;
                let height = wordBlock.height;

                // 높이 0일때, 주어졌을 때 구분하기

                // 단어 옮기기
                let z = height;
                let x = 0;
                function render() {
                    for (x = left; x < left + length; x++) {
                        ctx.fillStyle = "gray";

                        // 이부분 삽입----------------------
                        if (word == inputAnswer) {
                            for (x = left; x < left + length; x++) {
                                ctx.clearRect(
                                    x * BLOCK_SIZE,
                                    (z - 0.1) * BLOCK_SIZE,
                                    1 * BLOCK_SIZE,
                                    1 * BLOCK_SIZE
                                );
                            }
                            removeWordInWordSet(word);
                            inputAnswer = -1;

                            // height 새로 저장하고, removeWord로 지우기
                            return;
                        }
                        // 이부분 삽입 ----------------------

                        // 본체
                        ctx.fillRect(
                            x * BLOCK_SIZE,
                            z * BLOCK_SIZE,
                            1 * BLOCK_SIZE,
                            1 * BLOCK_SIZE
                        );

                        // 각종 그림자
                        ctx.clearRect(
                            x * BLOCK_SIZE,
                            z * BLOCK_SIZE,
                            0.05 * BLOCK_SIZE,
                            0.9 * BLOCK_SIZE
                        );
                        ctx.clearRect(
                            x * BLOCK_SIZE,
                            z * BLOCK_SIZE,
                            0.9 * BLOCK_SIZE,
                            0.05 * BLOCK_SIZE
                        );
                        ctx.fillStyle = "black";
                        ctx.fillRect(
                            x * BLOCK_SIZE + 0.9 * BLOCK_SIZE,
                            z * BLOCK_SIZE,
                            0.05 * BLOCK_SIZE,
                            0.9 * BLOCK_SIZE
                        );
                        ctx.fillRect(
                            x * BLOCK_SIZE,
                            z * BLOCK_SIZE + 0.9 * BLOCK_SIZE,
                            0.9 * BLOCK_SIZE,
                            0.05 * BLOCK_SIZE
                        );

                        // 텍스트
                        ctx.fillStyle = "white";
                        ctx.font = `${(48 / 63) * BLOCK_SIZE}px serif`;
                        ctx.fillText(
                            word[x - left],
                            (x + 0.1) * BLOCK_SIZE,
                            (z + 1 - 0.2) * BLOCK_SIZE
                        );

                        // 내려온 흔적 지우기
                        if (z < wordBlock.height + 1) {
                            ctx.clearRect(
                                x * BLOCK_SIZE,
                                wordBlock.height * BLOCK_SIZE,
                                1 * BLOCK_SIZE,
                                (z - wordBlock.height) * BLOCK_SIZE
                            );
                        } else {
                            ctx.clearRect(
                                x * BLOCK_SIZE,
                                (z - 1) * BLOCK_SIZE,
                                1 * BLOCK_SIZE,
                                1 * BLOCK_SIZE
                            );
                        }
                    }

                    z += 0.1; // 내려오는 속도

                    stop = requestAnimationFrame(render);

                    if (z > fall + height) {
                        cancelAnimationFrame(stop);

                        // height 계산하기
                        let height2 = height + fall;
                        // 옮긴 단어 저장하기
                        storeInWordSet(word, left, length, height2);
                    }
                }
                render();
            }
            // <----------------------------------------->단어 drop 함수

            // -----------------------------------------> 단어 목록에 단어 저장하기 함수
            function storeInWordSet(word, left, length, height) {
                let key = word;
                wordSet[key] = {
                    left: left,
                    length: length,
                    height: height,
                };
            }
            // <----------------------------------------- 단어 목록에 단어 저장하기 함수

            // -----------------------------------------> 단어 목록에서 단어 삭제하기 함수
            function removeWordInWordSet(word) {
                delete wordSet[word];
            }
            // <----------------------------------------- 단어 목록에서 단어 삭제하기 함수

            // -----------------------------------------> 단어로 필요한 정보 찾기
            function findInfoByWord(word) {
                return wordSet[word];
                // left = wordblock.left
                // length = wordblock.length
                // height = wordblock.height
            }
            // <----------------------------------------- 단어로 필요한 정보 찾기

            // -----------------------------------------> 단어블록 지우기 함수
            function removeWord(word) {
                // 필요한 정보(height, left, length) 찾기

                let left = wordSet[word].left;
                let length = wordSet[word].length;
                let height = wordSet[word].height;
                // 화면 지우기
                ctx.clearRect(
                    left * BLOCK_SIZE,
                    height * BLOCK_SIZE,
                    length * BLOCK_SIZE,
                    BLOCK_SIZE
                );

                // 단어 모음집에서 word 지우기
                removeWordInWordSet(word);
            }
            // <----------------------------------------- 단어블록 지우기 함수

            // 테스트 공간--------------------------------------

            //단어 입력하면 삭제시키기
            var inputAnswer = -1;
            // const input = document.getElementById('input_answer');
            // const button = document.getElementById('submit_answer');
            // button.addEventListener('click', function(event) {
            //   console.log("단어 입력 함수 동작함")
            //   let a = input.value;
            //   console.log("입력값 :", a)
            //   let b = Object.keys(wordSet)
            //   for (i=0; i < b.length; i++) {

            //     if (b[i] == a && wordSet[b[i]].height != -1) {
            //       removeWord(a);
            //     }
            //     inputAnswer = a
            //   }
            // }
            // )
        });

        return {};
    },
};
</script>

<style scoped>
#board {
    background-color: rgb(201, 201, 201);
}
</style>
