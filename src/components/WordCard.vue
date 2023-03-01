<template>
    <div class="ballbox" id="backGrd">
        <transition
            @after-enter="onAfterEnter"
            @after-leave="onAfterLeave"
            name="wordBlock"
            v-for="item in wordcard"
            :key="item.primary"
            appear
        >
            <div
                v-if="item.show"
                class="ball"
                :id="item.id"
                :class="{
                    bondU: item.Up,
                    bondD: item.Down,
                    bondL: item.Left,
                    bondR: item.Right,
                    bondUD: item.Updown,
                    bondRL: item.Rleft,
                }"
                :style="{
                    top: item.posy + '%',
                    left: item.posx + '%',
                }"
            >
                {{ item.value }}
            </div>
        </transition>
    </div>
    <div v-show="nullWarning" id="nullWarning">관련 단어가 없습니다.</div>
</template>

<script>
import mapinfo from "./MappingInfo";

export default {
    name: "wordGame",
    emits: ["scriptCheck"],
    props: {
        msg: {},
        delete_board: Number,
    },
    setup() {
        mapinfo;
    },
    watch: {
        msg(message) {
            if (message != null) {
                if (message.type == "check") {
                    // console.log(message);
                    if (message.moves.length === 5) {
                        // console.log("판갈이 셋 되어있음");
                        this.newgameFlag = true;
                    }
                    if (message.moves[0].length > 0) {
                        this.answerCheck(message.moves);
                    } else {
                        console.log("단어가 없는데");
                        // this.nullWarning = true;
                        this.Warning();
                    }

                    this.$emit(
                        "scriptCheck",
                        "check",
                        this.msg.user,
                        this.msg.increase
                    ); // 정답 체크 완료 시 서버에 턴 요청
                } else if (message.type == "init") {
                    this.start(message.moves[0]);
                    this.startbondFlag = true;
                    this.$emit("scriptCheck", "init"); // table 생성 완료 시 서버에 턴 요청
                }
            }
        },
        delete_board(is_finish) {
            if (is_finish) {
                this.wordcard = [];
            }
        },

        nullWarning(message) {
            setTimeout(() => (this.nullWarning = false), 1000);
        },
    },

    data() {
        return {
            command: this.msg,
            wordcard: [],
            toggle: "",
            lastword: null,
            global: 200,
            newgameFlag: false,
            secondFlag: false,
            startbondFlag: false,
            checkbondFlag: false,
            nullWarning: false,
        };
    },

    methods: {
        onAfterEnter() {
            /* 시작했을 때 이어주는 용 */
            if (this.startbondFlag === true) {
                this.metamor(this.msg.table);
                this.startbondFlag = false;
            }

            /* 새판을 갈아주는 곳 */
            if (this.secondFlag === true) {
                this.secondFlag = false;
                this.checkbondFlag = false;
                this.clearmeta();
                this.wordcard = [];
                this.start(this.msg.moves[4]);
                this.startbondFlag = true;
            }

            if (this.checkbondFlag === true) {
                this.metamor(this.msg.table);
                this.checkbondFlag = false;
            }
        },

        /** 삭제 모션 후 작동 */
        onAfterLeave() {
            this.wordcard.forEach((element) => {
                element.show = true;
            });
            this.rearrange();
            this.checkbondFlag = true;

            if (this.newgameFlag === true) {
                this.newgameFlag = false;
                this.secondFlag = true;
            }
        },

        /** 정답 체크 과정 */
        answerCheck(command) {
            this.clearmeta();
            this.delElem(command[0]);
            this.moveElem(command[1]);
            this.addElem(command);
        },
        clearmeta() {
            this.wordcard.forEach((element) => {
                element.Up = false;
                element.Down = false;
                element.Right = false;
                element.Left = false;
                element.Updown = false;
                element.Rleft = false;
            });
        },
        /** 화면에서 블럭 삭제 */
        delElem(command) {
            let info = Object.values(command);

            info.forEach((element) => {
                this.wordcard[element[0]].show = false;
            });
        },
        moveElem(command) {
            let info = Object.values(command);
            info.forEach((element) => {
                this.wordcard[element[0]].posy = mapinfo[element[1]].posY;
                this.wordcard[element[0]].id = element[1];
            });
        },
        addElem(command) {
            let info = Object.values(command);
            info[2].forEach((element, index) => {
                this.wordcard[info[0][index][0]].id = element[1];
                this.wordcard[info[0][index][0]].value = element[2];
                this.wordcard[info[0][index][0]].posx =
                    mapinfo[element[1]].posX;
                this.wordcard[info[0][index][0]].posy =
                    mapinfo[element[1]].posY;
            });
        },
        start(command) {
            let info = Object.values(command);
            info.forEach((element) => {
                this.wordcard.push({
                    id: element[1],
                    value: element[2],
                    posx: mapinfo[element[1]].posX,
                    posy: mapinfo[element[1]].posY,
                    Up: false,
                    Down: false,
                    Left: false,
                    Right: false,
                    Updown: false,
                    Rleft: false,
                    primary: this.global,
                    show: true,
                });
                this.global++;
            });
        },
        newtable(command) {
            let info = Object.values(command);

            info[4].forEach((element, index) => {
                this.wordcard[info[3][index][0]].id = element[1];
                this.wordcard[info[3][index][0]].value = element[2];
                this.wordcard[info[3][index][0]].posx =
                    mapinfo[element[1]].posX;
                this.wordcard[info[3][index][0]].posy =
                    mapinfo[element[1]].posY;
            });
        },
        metamor(command) {
            let info = Object.values(command);
            info.forEach((element, index) => {
                switch (element[1]) {
                    case "U":
                        this.wordcard[index].Up = true;
                        break;
                    case "D":
                        this.wordcard[index].Down = true;
                        break;
                    case "R":
                        this.wordcard[index].Right = true;
                        break;
                    case "L":
                        this.wordcard[index].Left = true;
                        break;
                    case "UD":
                        this.wordcard[index].Updown = true;
                        break;
                    case "LR":
                        this.wordcard[index].Rleft = true;
                        break;
                    default:
                        break;
                }
            });
        },
        rearrange() {
            this.wordcard.sort((a, b) => a.id - b.id);
        },
        Warning() {
            document.querySelector("#backGrd").animate([
    // from keyframe
    {
        backgroundColor: 'rgba(240, 7, 7, 0.7)',
    },
    {
        backgroundColor: 'rgba(240, 7, 7, 0.1)',
    },
    {
        backgroundColor: 'rgba(240, 7, 7, 0.7)',
    }
], {duration: 400, iterations:2,});

        },
    },
};
</script>

<style scoped>
.ballbox {
    width: 700px;
    height: 700px;
    position: relative;
    overflow: hidden;
    background: rgba(240, 7, 7, 0.7);
    background: rgba(0, 0, 0, 0.7);
}

#nullWarning {
    position: absolute;
    z-index: 999;
    width: 40%;
    height: 5%;
    left: 30%;
    top: 45%;
    background-color: rgba(146, 215, 218, 0.7);
    border-radius: 20px;
    border: 2px black;
    font-size: 1.5rem;
    text-align: center;
}

.ball {
    box-sizing: border-box;
    width: 8.1818%;
    height: 8.1818%;
    background: transparent;
    position: absolute;
    transition: all 0.1s;
    z-index: 5;
    font-size: 200%;
    color: rgb(150, 150, 150);
    display: flex;
    justify-content: center;
    align-items: center;

    /* border 초기화 */
}
/* up down */
@keyframes blinkU {
    0% {
        border: 3px solid rgb(150, 0, 115);
        border-top: 3px solid transparent;
        color: rgb(0, 195, 255);
    }
    100% {
        border: 3px solid rgb(160, 10, 125);
        border-top: 3px solid transparent;
        color: rgb(0, 220, 255);
    }
}
.bondU {
    background: transparent;
    height: 8.64%;
    margin-top: -0.4%;
    animation: blinkU 0.5s alternate infinite;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
}
@keyframes blinkD {
    0% {
        border: 3px solid rgb(150, 0, 115);
        border-bottom: 3px solid transparent;
        color: rgb(0, 195, 255);
    }
    100% {
        border: 3px solid rgb(160, 10, 125);
        border-bottom: 3px solid transparent;
        color: rgb(0, 220, 255);
    }
}
.bondD {
    background: transparent;
    height: 8.64%;
    margin-top: 0.45%;
    animation: blinkD 0.5s alternate infinite;
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
}
@keyframes blinkUD {
    0% {
        border: 3px solid rgb(150, 0, 115);
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;
        color: rgb(0, 195, 255);
    }
    100% {
        border: 3px solid rgb(160, 10, 125);
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;
        color: rgb(0, 220, 255);
    }
}
.bondUD {
    background: transparent;
    height: 11.5%;
    margin-top: -1.6%;
    animation: blinkUD 0.5s alternate infinite;
}

/* left right */
@keyframes blinkL {
    0% {
        border: 3px solid rgb(80, 80, 140);
        border-left: 3px solid transparent;
        color: rgb(255, 210, 0);
    }
    100% {
        border: 3px solid rgb(80, 80, 170);
        border-left: 3px solid transparent;
        color: rgb(255, 215, 70);
    }
}
.bondL {
    background: transparent;
    width: 8.64%;
    margin-left: -1.4%;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    animation: blinkL 0.5s alternate infinite;
}
@keyframes blinkR {
    0% {
        border: 3px solid rgb(80, 80, 140);
        border-right: 3px solid transparent;
        color: rgb(255, 210, 0);
    }
    100% {
        border: 3px solid rgb(80, 80, 170);
        border-right: 3px solid transparent;
        color: rgb(255, 215, 70);
    }
}
.bondR {
    background: transparent;
    width: 8.64%;
    margin-left: 1.4%;
    border: 3px solid rgb(80, 80, 150);
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    animation: blinkR 0.5s alternate infinite;
}

@keyframes blinkRL {
    0% {
        border: 3px solid rgb(80, 80, 140);
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        color: rgb(255, 210, 0);
    }
    100% {
        border: 3px solid rgb(80, 80, 170);
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        color: rgb(255, 215, 70);
    }
}
.bondRL {
    background: transparent;
    width: 11.6%;
    margin-left: -1.6%;
    animation: blinkRL 0.5s alternate infinite;
}

/* ========================== transition 애니메이션 =========================== */
@keyframes moveBlock {
    0% {
        background-color: rgb(115, 116, 115);
    }

    70% {
        background-color: red;
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

.wordBlock-move {
    transition: moveBlock 2s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 진입 애니메이션 */
.wordBlock-enter-from {
    transform: translateY(-700px);
}

.wordBlock-enter-active {
    transition: 0.4s;
}

/* 제거 애니메이션 */
.wordBlock-leave-to,
.wordBlock-leave-from {
    opacity: 1;
}
.wordBlock-leave-active {
    animation: bounce-in 2s;
    z-index: 100;
}

/* 자작 애니메이션 */
@keyframes bounce-in {
    0% {
        transform: scale(1);
        border: none;
        background-color: transparent;
    }

    15% {
        color: rgb(22, 255, 94);
    }

    70% {
        /* transform: translateX(30px) translateY(30px) scale(2); */
        transform: scale(2);
    }

    100% {
        transform: scale(0.2) translateX(1000px) translateY(-1000px);
        border: none;
        background-color: transparent;
        color: rgb(255, 30, 30);
    }
}
</style>
