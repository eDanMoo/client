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
                        let audio_block = new Audio('/assets/soundEffect/blockstart.mp3');
                        let status = props.msg.status;
                        if (status == "continue") {
                            let word = props.msg.word;
                            let left = props.msg.left;
                            let length = props.msg.length;

                            let fall = props.msg.fall * 63;
                            let current = -63;
                            let destination = current + fall;
                            let color = get_color();

                            storeInWordSet(
                                word,
                                left,
                                length,
                                current,
                                destination,
                                color
                            );

                            audio_block.play();
                        }
                    } else if (props.msg.type == "check") {
                        let remWords = props.msg.remWords;
                        let i = 0;
                        let audio_remove = new Audio('/assets/soundEffect/blockremove.mp3');
                        // 목록에서 단어 삭제
                        for (i = 0; i < remWords.length; i++) {
                            audio_remove.play();
                            let word = remWords[i];
                            removeWordInWordSet(word);
                            
                        }
                        // 남은 단어 옮기기
                        let moveInfo = props.msg.moveInfo;
                        for (i = 0; i < moveInfo.length; i++) {
                            let word = moveInfo[i][0];
                            let fall = moveInfo[i][1];
                            let destination = wordSet[word].destination;
                            await setDestination(word, destination, fall);
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
                    }
                }
            );

            const COLS = 11; // size
            const ROWS = 11; // size
            const BLOCK_SIZE = 63;

            const canvas = document.getElementById("board");
            const ctx = canvas.getContext("2d");

            ctx.canvas.width = COLS * BLOCK_SIZE;
            ctx.canvas.height = ROWS * BLOCK_SIZE;
            // ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

            let wordSet = {};

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

                    ctx.fillStyle = colorBackground;
                    ctx.strokeStyle = "#FFFFFF";
                    ctx.fillRect(
                        left * BLOCK_SIZE + 3,
                        current + 5,
                        length * BLOCK_SIZE - 3,
                        1 * BLOCK_SIZE - 6
                    );
                    ctx.fillStyle = "black";
                    ctx.font = `${(48 / 63) * BLOCK_SIZE}px DungGeunMo`;
                    ctx.fillText(
                        word,
                        left * BLOCK_SIZE + (BLOCK_SIZE / 9) * length,
                        current + BLOCK_SIZE * 0.7
                    );
                    if (current < destination) {
                        wordSet[wordSetKey[i]].current = current + 7;
                    }
                }
            }, 15);

            function get_color() {
            	// get random integer between 45 and 255 (inclusive)
            	const getRandomInt = () => Math.floor(Math.random() * 211) + 45;
            	let r = 0, g = 0, b = 0;
            	// get rgb code
            	while (true) {
            		r = getRandomInt();
            		g = getRandomInt();
            		b = getRandomInt();
            		if (r + g + b > 200) {
            			break;
            		}
            	}
            	// rgb to hex
            	const hex = "#" + r.toString(16).padStart(2, "0")
            					+ g.toString(16).padStart(2, "0")
            					+ b.toString(16).padStart(2, "0");
            	return hex;
            }


            function setDestination(word, destination, fall) {
                wordSet[word].destination = destination + fall * 63;
            }

            // 단어 목록에 단어 저장하기 함수
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

            // 단어 목록에서 단어 삭제하기 함수
            function removeWordInWordSet(word) {
                delete wordSet[word];
            }
        });

        return {};
    },
};
</script>

<style scoped>
#board {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    margin: 5px;
}

@font-face {
    font-family: "DungGeunMo";
    src: url("/assets/font/DungGeunMo.woff2");
}
</style>
