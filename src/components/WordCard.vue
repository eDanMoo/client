<template>
    <div class="gameBackgroud">
        <transition-group
            tag="div"
            class="wordList"
            v-for="n in this.width"
            :key="n"
        >
            <div
                v-for="(item, index) in col[n - 1]"
                :data-index="index"
                :key="item.id"
                class="wordElem"
            >
                {{ item.value }}
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: "wordGame",
    props: {
        msg: {},
    },
    data() {
        return {
            words: this.msg,
            col: [],
            globalId: 0,
            width: 11,
        };
    },
    watch: {
        msg(message) {
            this.words = this.msg;
            if (this.words != null) {
                if (message.type == "init") {
                    this.createTable();
                } else if (message.type == "check") {
                    this.check();
                }
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
                });
                this.globalId++;
            }
        },
        /** 정답확인 */
        check() {
            let words = this.words.moveInfo;
            console.log(words);
            let Dbuffer = [];
            let Abuffer = [];
            let indexOf = null;
            const length = this.width;

            //Delete
            words.forEach((word) => {
                if (word[1] > length ** 2 - 1) {
                    indexOf = this.width - 1 - parseInt(word[0] / length);
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
                    });
                    this.globalId++;
                }
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
    min-height: 680px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    overflow: hidden;
    background: rgb(32, 32, 32);
}

.wordList {
    display: flex;
    width: 80%;
    flex-direction: column-reverse;
    align-items: center;
    align-content: center;
}

.wordElem {
    width: 90%;
    height: 100%;
    min-width: 55px;
    min-height: 57px;
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
.v-move {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 진입 애니메이션 */
.v-enter-from {
    transform: translateY(-700px);
    position: static;
    opacity: 0;
}

.v-enter-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    transition-delay: 0.4s;
}

.v-enter-to {
    position: static;
}

/* 제거 애니메이션 */

.v-leave-from {
    opacity: 0;
    /* transition: rotateY('-180deg'); */
}

.v-leave-active {
    /* opacity: 0; */
    /* z-index: 1; */
    position: absolute;
}

.v-leave-to {
    opacity: 0;
}

/* 자작 애니메이션 */
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(12);
    }

    100% {
        transform: scale(1);
    }
}
</style>
