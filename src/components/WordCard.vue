<template>

    <div class="example">
        <transition-group mode="in-out" tag="div" class="list" v-for="n in this.width" :key="n">
            <div v-for="(item, index) in col[n - 1]" :data-index="index" :key="item.id" class="item">
                {{ item.value }}
            </div>
        </transition-group>
    </div>

    <!-- <div style="display: flex;">
        <input type="text"  style="font-size: 3rem" v-model="answer" @keydown.enter="check"/>
        <button @click="check" style="font-size: 2rem">(임시)정답제출</button>
    </div> -->

</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            words: [],
            col: [],
            answer: "",
            globalId: 0, //카드의 key가 중복되지 않게 해야 하는데 임시로 계속 증가하는 수를 부여
            width: 11
        };
    },
    created() {
        this.apitest();
    },
    computed: {
        filteredList() {
            return 0;
        },
    },
    methods: {
        async $api(url, methods, data) {
            return (
                await axios({
                    method: methods,
                    url,
                    data,
                }).catch((e) => {
                    console.log(e);
                })
            ).data;
        },
        doRemove(a, index) {
            this.col[a].splice(index, 1);
        },
        async apitest() {
            let words = await this.$api(`http://127.0.0.1:8000/init/` + this.width, "get");

            let ids = Object.keys(words);
            let values = Object.values(words);
            console.log(words)

            let mtxSize = Math.sqrt(ids.length);
            console.log(mtxSize)

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
        async check() {
            let words = Object.values(
                await this.$api(
                    `http://127.0.0.1:8000/check/` + this.answer, "get"));
            console.log(words)
            let deletebuff = [];
            let indexOf = null;
            const length = this.width;
            //Delete
            words.forEach((word) => {
                if (word[1] > (length ** 2) - 1) {
                    indexOf = (this.width - 1) - parseInt(word[0] / length);
                    deletebuff.push([word[0] % length, indexOf]);
                    // this.col[word[0] % 7].splice(indexOf, 1)
                }
            });

            deletebuff.sort((a, b) => b[1] - a[1]);
            console.log(deletebuff);
            deletebuff.forEach((buff) => {
                this.col[buff[0]].splice(buff[1], 1);
            });

            //Add
            words.forEach((word) => {
                if (word[0] < 0) {
                    // wordEelmIndex = this.col[word[1] % 7]
                    this.col[word[1] % length].push({
                        id: this.globalId,
                        value: word[2],
                    });
                    this.globalId++;
                }
            });
            this.answer="";
            console.log(this.col)
        },
    },
};
</script>

<style scoped>
@font-face {
    font-family: "tests";
    src: url(../fonts/BMYEONSUNG_ttf.ttf);
}

.example {
    display: flex;
}

.list {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    align-content: flex-end;
}

.item {
    width: 62px;
    height: 62px;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    /* mono 100 */
    background: #f6f3f3;
    box-shadow: inset -2px -2px 0px #262626, inset 2px 2px 0px #f0f0f0,
        inset -4px -4px 0px #7e7e7e;

    /* font-family: "tests"; */
    font-size: 3rem;
}

/* 트랜지션 전용 스타일 */
.v-move {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 진입 애니메이션 */
.v-enter-from {
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