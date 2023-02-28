<template>
    <div class="ballbox">
        <transition
            @after-enter="onAfterEnter"
            @after-leave="onAfterLeave"
            name="wordBlock"
            v-for="(item, index) in wordcard"
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

    <button @click="del">del</button>
    <button @click="swit">switch</button>
    <button @click="this.wordcard[0].show = !this.wordcard[0].show">
        hide
    </button>
    <div></div>
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
                    console.log(message);
                    if (message.moves.length === 5) {
                        console.log("판갈이 셋 되어있음");
                        this.newgameFlag = true;
                    }
                    if (message.moves[0].length > 0) {
                        this.answerCheck(message.moves);
                    } else {
                        console.log("단어가 없는데");
                    }

                    //   this.$emit(
                    //       "scriptCheck",
                    //       "check",
                    //       this.msg.user,
                    //       this.msg.increment
                    //   ); // 정답 체크 완료 시 서버에 턴 요청
                } else if (message.type == "init") {
                    this.start(message.moves[0]);
                    this.startbondFlag = true;
                    // this.metamong(message.table);
                    // this.metamong(message.table);
                    this.$emit("scriptCheck", "init"); // table 생성 완료 시 서버에 턴 요청
                }
            }
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
        };
    },

    methods: {
        swit() {
            console.log("변경");
            const mode = document.getElementById("0");
            mode.style.left = 2 + "%";
            mode.setAttribute("id", "2");
            console.log(mode);
            console.log(mode.id);
        },
        onAfterEnter() {
            /* 시작했을 때 이어주는 용 */
            if (this.startbondFlag === true) {
                this.metamong(this.msg.table);
                console.log("여기는 판이 새로 만들어지면 작동하는 곳입니다.");
                console.log(this.startbondFlag);
                this.startbondFlag = false;
                console.log(this.startbondFlag);
            }

            /* 새판을 갈아주는 곳 */
            if (this.secondFlag === true) {
                console.log("끝까지 왔습니다.");
                this.secondFlag = false;
                this.checkbondFlag = false;
                this.clearmeta();
                // this.invisibleElem(this.msg.moves[3]);
                this.wordcard = [];
                // this.newtable(this.msg.moves);
                this.start(this.msg.moves[4]);
                // this.metamong(this.msg.table);
                this.startbondFlag = true;
            }

            if (this.checkbondFlag === true) {
                console.log("혹시 여기가 작동하니?");
                this.metamong(this.msg.table);
                this.checkbondFlag = false;
            }
        },

        /** 삭제 모션 후 작동 */
        onAfterLeave() {
            this.wordcard.forEach((element) => {
                element.show = true;
            });
            this.refresh();
            this.checkbondFlag = true;

            if (this.newgameFlag === true) {
                console.log("한번만 실행되어야 합니다.");
                this.newgameFlag = false;
                this.secondFlag = true;
            }
            // this.metamong(this.msg.table);
        },

        /* 삭제(1) -> 이동 -> 삭제(2) -> 추가 -> sorting -> class변경 */
        answerCheck(command) {
            // this.clearmeta();
            this.invisibleElem(command[0]);
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
        /** 삭제될 요소를 투명화 처리한다 */
        invisibleElem(command) {
            let info = Object.values(command);
            console.log("삭제");
            console.log(info);
            info.forEach((element) => {
                this.wordcard[element[0]].show = false;
            });
        },
        moveElem(command) {
            let info = Object.values(command);
            console.log("이동");
            console.log(info);
            info.forEach((element) => {
                this.wordcard[element[0]].posy = mapinfo[element[1]].posY;
                this.wordcard[element[0]].id = element[1];
            });
        },
        addElem(command) {
            let info = Object.values(command);
            // console.log("추가");
            // console.log(info);
            let i = 0;
            info[2].forEach((element) => {
                this.wordcard[info[0][i][0]].id = element[1];
                this.wordcard[info[0][i][0]].value = element[2];
                this.wordcard[info[0][i][0]].posx = mapinfo[element[1]].posX;
                this.wordcard[info[0][i][0]].posy = mapinfo[element[1]].posY;
                i++;
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
        metamong(command) {
            let index = 0;
            let info = Object.values(command);
            info.forEach((element) => {
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
                index++;
            });
        },
        refresh() {
            // this.wordcard.forEach((element,index) => {
            //   console.log(index)
            //   console.log(element.id)
            //   element.id = index;
            //   console.log(element.id)
            // });

            this.wordcard.sort((a, b) => a.id - b.id);
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
    background: rgba(0, 0, 0, 0.7);
    /* display: grid; */
    /* border: 1px solid;
  margin-left: 200px; */
}

.ball {
    box-sizing: border-box;
    width: 8.1818%;
    height: 8.1818%;
    background: rgba(32, 32, 32, 0.7);
    position: absolute;
    transition: all 0.1s;
    /* transition-delay: 0.5s; */
    z-index: 5;
    font-size: 200%;
    color: rgb(150, 150, 150);
    display: flex;
    justify-content: center;
    align-items: center;
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
    /* margin-top: -0.6%; */
    margin-top: -1.6%;
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
    margin-top: 1.6%;
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
    /* height: 10%; */
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
    /* margin-left: -0.6%; */
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
    /* width: 10%; */
    width: 11.6%;
    margin-left: -1.6%;
    animation: blinkRL 0.5s alternate infinite;
}

/* ========================== 애니메이션 =========================== */
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
    /* transition-delay: 0.2s; */
    transform: translateY(-700px);
}

.wordBlock-enter-active {
    transition: 0.4s;
    /* transition-delay: 1.5s; */
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
        transform: translateX(30px) translateY(30px) scale(2);
    }

    /* 100% {
        transform: scale(0.2);
    } */
    100% {
        transform: scale(0.2) translateX(1000px) translateY(-1000px);
        border: none;
        background-color: transparent;
        color: rgb(255, 30, 30);
    }
}
</style>
