<template>
    <section class="modal align_center">
        <div class="align_center whiteBox" id="resultPop">
            <div class="whiteBox_header padding">
                <b>게임결과</b>
            </div>

            <div class="modal__window align_center" id="scorePop">
                <div class="modal_cover">
                    <div class="ranking padding">
                        <span><b>순위</b></span
                        ><br />
                        <div
                            v-for="(user, index) in users"
                            :data-index="index"
                            :key="user.id"
                            style="font-size: 1.3rem"
                        >
                            | {{ user[0] }}등: {{ user[1] }}, 점수:
                            {{ user[2] }} |
                        </div>
                    </div>

                    <div class="answerLog padding">
                        <span><b>연관단어</b></span>
                        <div class="wordList scrollbar">
                            <div
                                v-for="(words, index) in answerLog"
                                :data-index="index"
                                :key="answerLog[0]"
                                style="border: 2px solid; margin-bottom: 1rem"
                            >
                                <div>
                                    <span>{{ words[0] }}번 제출: </span
                                    ><span>{{ words[1] }}</span>
                                </div>
                                <div
                                    v-for="(word, index) in words[2]"
                                    :data-index="index"
                                    :key="word"
                                    style="
                                        display: inline;
                                        word-break: keep-all;
                                    "
                                >
                                    {{ word }}&nbsp
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="closeButton padding">
                        <div @click="closeModal" style="z-index: 50">
                            <span><b>닫기</b></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="whiteBox_footer padding">
                <div>
                    <b>버전 1.0</b>
                </div>
                <div><b>정글</b> 2022.10-2023.3</div>
            </div>
        </div>
        <div class="blueScreen"></div>
    </section>
</template>

<script>
export default {
    name: "resultWindow",
    props: {
        msg: {},
    },
    data() {
        return {
            roomId: this.msg.roomId,
            users: this.msg.scores,
            answerLog: this.msg.answerLog,
        };
    },
    watch: {},
    mounted() {},
    unmounted() {},
    created() {},
    computed: {},
    methods: {
        closeModal() {
            this.$emit("sendClose", false);
        },
    },
};
</script>

<style>
.align_center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.whiteBox {
    z-index: 100;
    border: solid white;
    border-width: 1px 3px 1px 3px;
    display: flex;
    width: 50rem;
    flex-direction: column;
    justify-content: space-between;
}

.whiteBox_header {
    color: white;
    border-bottom: 1px solid white;
    align-self: stretch;
    text-align: center;
    font-size: 2rem;
}

.whiteBox_footer {
    color: white;
    border-top: 1px solid white;
    align-self: stretch;
    text-align: center;
    display: flex;
    justify-content: space-between;
}

.padding {
    padding: 10px;
}

.modal {
    position: absolute;
    width: 100%;
    height: 100%;
}

.blueScreen {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 170, 1);
    z-index: 99;
}

.modal__window {
    width: 40rem;
    height: 35rem;
    overflow: hidden;
    padding: 20px 7px 20px 7px;
    z-index: 1;
    background-color: rgb(170, 170, 170);
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-size: 1.1rem;
}

.modal_cover {
    width: 40rem;
    height: 35rem;
    border: solid;
    border-width: 2px 4px 2px 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.ranking {
    border-bottom: 2px solid;
    flex-grow: 20px;
}

.answerLog {
    flex-grow: 1;
    height: 300px;
}

.wordList {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 90%;
}

.closeButton {
    border-top: 2px solid;
    flex-grow: 20px;
    text-align: center;
}

.scrollbar::-webkit-scrollbar {
    width: 10px;
}

.scrollbar::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 0px;
    background-clip: padding-box;
    border: 2px solid transparent;
}

.scrollbar::-webkit-scrollbar-track {
    background-color: rgb(170, 170, 170);
    box-shadow: inset 0px 0px 5px white;
}
</style>
