<template>
    <div class="gameBackgroud">
        <transition-group
            name="wordBlock"
            tag="div"
            class="wordList"
            v-for="n in this.tableColumns"
            :key="n"
        >
            <div
                v-for="(item, index) in col[n - 1]"
                :data-index="index"
                :key="item.id"
                class="wordElem"
                :class="{ highlight_Active: item.highlight }"
            >
                {{ item.value }}
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: "wordGame",
    emits: ["scriptCheck"],
    props: {
        msg: {},
        delete_board: Number,
    },
    data() {
        return {
            words: this.msg,
            col: [],
            globalId: 0,
            tableColumns: 11,
        };
    },
    watch: {
        msg(message) {
            this.words = this.msg;
            if (this.words != null) {
                if (message.type == "init") {
                    this.createTable();
                    this.$emit("scriptCheck", "init"); // table 생성 완료 시 서버에 턴 요청
                } else if (message.type == "check") {
                    this.answerCheck();
                    this.$emit("scriptCheck", "check", this.words.user); // 정답 체크 완료 시 서버에 턴 요청
                }
            }
        },
        delete_board(is_finish) {
            if (is_finish) {
                this.col = [];
            }
        },
    },
    mounted() {},
    created() {},
    computed: {
        filteredList() {
            return 0;
        },
    },
    methods: {
        createTable() {
            let words = this.words.wordTable;
            let highlight = this.words.possLocs;

            const length = this.tableColumns;
            let indexOf = null;
            // console.log(words)
            this.globalId = 0;

            let ids = Object.keys(words);
            let values = Object.values(words);

            let mtxSize = Math.sqrt(ids.length);
            this.col = [];

            for (let j = 0; j < mtxSize; j++) {
                this.col.push([]);
            }

            for (let i = ids.length - 1; i > -1; i--) {
                let colsOrder = i % mtxSize;
                this.col[colsOrder].push({
                    id: this.globalId,
                    value: values[i],
                    highlight: false,
                });
                this.globalId++;
            }

            highlight.forEach((pos) => {
                indexOf = length - 1 - parseInt(pos / length);
                this.col[pos % length][indexOf].highlight = true;
            });
        },
        /** 정답확인 */
        answerCheck() {
            let words = this.words.moveInfo;
            let highlight = this.words.possLocs;

            console.log(words);
            let Dbuffer = [];
            let Abuffer = [];
            let indexOf = null;
            const length = this.tableColumns;

            //highlight off
            for (let i = 0; i < length; i++) {
                this.col[i].forEach((column) => {
                    column.highlight = false;
                });
            }

            //Delete
            words.forEach((word) => {
                if (word[1] > length ** 2 - 1) {
                    indexOf = length - 1 - parseInt(word[0] / length);
                    Dbuffer.push([word[0] % length, indexOf]);
                }
            });
            Dbuffer.sort((a, b) => b[1] - a[1]);

            Dbuffer.forEach((buffer) => {
                this.col[buffer[0]].splice(buffer[1], 1);
            });

            //Add
            Abuffer = words.filter((word) => word[0] < 0);
            Abuffer.sort((a, b) => b[1] - a[1]);
            Abuffer.forEach((word) => {
                if (word[0] < 0) {
                    this.col[word[1] % length].push({
                        id: this.globalId,
                        value: word[2],
                        highlight: false,
                    });
                    this.globalId++;
                }
            });

            //highlight

            highlight.forEach((pos) => {
                indexOf = length - 1 - parseInt(pos / length);
                this.col[pos % length][indexOf].highlight = true;
            });
            // console.log(this.col);
        },
    },
};
</script>

<style scoped>
@font-face {
    font-family: "tests";
    src: url(../fonts/BMYEONSUNG_ttf.ttf);
}

.gameBackgroud {
    min-width: 680px;
    height: 830px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    overflow: hidden;
    background: rgb(32, 32, 32);
}

.wordList {
    display: flex;
    width: 80%;
    height: 1500px;
    position: relative;
    bottom: 335px;
    overflow-y: hidden;
    flex-direction: column-reverse;
    align-items: center;
    align-content: center;
    border-color: #5d5838;
    border-style: dashed;
}

.wordElem {
    width: 90%;
    min-width: 55px;
    max-width: 65px;
    height: 70px;
    margin-right: 1px;
    margin-bottom: 0.2vw;
    border-radius: 5px;
    box-shadow: 0 0 5px 5px yellow;
    display: flex;
    justify-content: center;
    align-items: center;

    /* background-image: url("../assets/gamecomp/rectangle1.png");
    background-size: cover; */
    /* mono 100 */
    background: #f6f3f3;
    box-shadow: inset -2px -2px 0px #262626, inset 5px 50px 50px #f0f0f0,
        inset -4px -4px 0px #7e7e7e;

    /* font-family: "tests"; */
    font-size: 2.2rem;
}

.wordBlock-move {
    transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 진입 애니메이션 */
.wordBlock-enter-from {
    transition-delay: 0.4s;
    transform: translateY(-860px);
}

.wordBlock-enter-active {
    transition: 1s cubic-bezier(0.5, 0.84, 0.36, 1);
    transition-delay: 1.5s;
}

/* 제거 애니메이션 */

.wordBlock-leave-from {
    background-color: rgb(180, 255, 67);
}

@keyframes test {
    0% {
        background-color: greenyellow;
    }

    70% {
        height: 70px;
        background-color: red;
        position: static;
        font-size: 2.2rem;
    }

    95% {
        opacity: 1;
        font-size: 0.1rem;
        height: 1px;
    }
    97% {
        opacity: 0;
        height: 0px;
    }

    100% {
        height: 0px;
        opacity: 0;
    }
}

.wordBlock-leave-active {
    animation: test 2s;
    z-index: 3;
    top: 1000px;
}

.highlight_Active {
    background: #e2f110;
}

/* 자작 애니메이션 */
@keyframes bounce-in {
    0% {
        transform: scale(0.2);
    }

    50% {
        transform: scale(1);
    }

    100% {
        transform: scale(0.2);
    }
}
</style>
