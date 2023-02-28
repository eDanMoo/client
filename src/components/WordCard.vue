<template>
  <div class="ballbox">
    <transition @after-enter="onAfterEnter" @after-leave="onAfterLeave" name="wordBlock" v-for="(item, index) in wordcard"
      :key="item.primary" appear>
      <div v-if="item.show" class="ball" :id="item.id" :class="{
        bondU: item.Up,
        bondD: item.Down,
        bondL: item.Left,
        bondR: item.Right,
        bondUD: item.Updown,
        bondRL: item.Rleft
      }" :style="{
  top: item.posy + '%',
  left: item.posx + '%'
}">{{ item.value }}</div>
    </transition>
  </div>

  <button @click="del">del</button>
  <button @click="swit">switch</button>
  <button @click="this.wordcard[0].show = !this.wordcard[0].show">hide</button>
  <div>
  </div>
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
    mapinfo
  },
  watch: {

    msg(message) {
      if (message != null) {
        if (message.type == "init") {
          this.start(message.moves[0]);
          this.startbondFlag = true;
          // this.metamong(message.table);
          // this.metamong(message.table);
          this.$emit("scriptCheck", "init"); // table 생성 완료 시 서버에 턴 요청
        } else if (message.type == "check") {
          console.log(message);
          if (message.moves.length === 5) {
            console.log("판갈이 셋 되어있음");
            this.newgameFlag = true;
          }
          if (message.moves[0].length > 0) {
            this.answerCheck(message.moves);
          }
          else {
            console.log("단어가 없는데");
          }


          //   this.$emit(
          //       "scriptCheck",
          //       "check",
          //       this.msg.user,
          //       this.msg.increment
          //   ); // 정답 체크 완료 시 서버에 턴 요청
        }
      }
    },
  },

  data() {
    return {
      command: this.msg,
      wordcard: [],
      toggle: '',
      lastword: null,
      global: 200,
      newgameFlag: false,
      secondFlag: false,
      startbondFlag: false,
      checkbondFlag: false
    }
  },


  methods: {
    swit() {
      console.log("변경")
      const mode = document.getElementById("0");
      mode.style.left = 2 + '%';
      mode.setAttribute("id", "2");
      console.log(mode)
      console.log(mode.id)

    },
    onAfterEnter(el) {

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
        console.log("끝까지 왔습니다.")
        this.secondFlag = false;
        this.checkbondFlag = false;
        this.clearmeta();
        // this.invisibleElem(this.msg.moves[3]);
        this.wordcard = []
        // this.newtable(this.msg.moves);
        this.start(this.msg.moves[4]);
        // this.metamong(this.msg.table);
        this.startbondFlag = true;
      }



      if (this.checkbondFlag === true) {
        console.log("혹시 여기가 작동하니?")
        this.metamong(this.msg.table);
        this.checkbondFlag = false;
      }
    },

    /** 삭제 모션 후 작동 */
    onAfterLeave(el) {
      this.wordcard.forEach(element => {
        element.show = true;
      });
      this.refresh();
      this.checkbondFlag = true;

      if (this.newgameFlag === true) {
        console.log("한번만 실행되어야 합니다.")
        this.newgameFlag = false;
        this.secondFlag = true;
      }
      // this.metamong(this.msg.table);

    },

    /* 삭제(1) -> 이동 -> 삭제(2) -> 추가 -> sorting -> class변경 */
    answerCheck(command) {
      this.clearmeta();
      this.invisibleElem(command[0]);
      this.moveElem(command[1]);
      this.addElem(command);


    },
    /** 삭제될 요소를 투명화 처리한다 */
    invisibleElem(command) {
      let info = Object.values(command);
      console.log("삭제")
      console.log(info)
      info.forEach(element => {
        this.wordcard[element[0]].show = false;
      });
    },
    moveElem(command) {
      let info = Object.values(command);
      console.log("이동");
      console.log(info);
      info.forEach(element => {
        this.wordcard[element[0]].posy = mapinfo[element[1]].posY;
        this.wordcard[element[0]].id = element[1];
      });
    },
    start(command) {
      let info = Object.values(command);
      info.forEach(element => {
        this.wordcard.push({
          'id': element[1],
          'value': element[2],
          'posx': mapinfo[element[1]].posX,
          'posy': mapinfo[element[1]].posY,
          'Up': false,
          'Down': false,
          'Left': false,
          'Right': false,
          'Updown': false,
          'Rleft': false,
          'primary': this.global,
          'show': true
        })
        this.global++;
      });
    },

    addElem(command) {
      let info = Object.values(command);
      // console.log("추가");
      // console.log(info);
      let i = 0;
      info[2].forEach(element => {
        this.wordcard[info[0][i][0]].id = element[1];
        this.wordcard[info[0][i][0]].value = element[2];
        this.wordcard[info[0][i][0]].posx = mapinfo[element[1]].posX;
        this.wordcard[info[0][i][0]].posy = mapinfo[element[1]].posY;
        i++;
      });
    },

    newtable(command) {
      let info = Object.values(command);

      info[4].forEach((element, index) => {
        this.wordcard[info[3][index][0]].id = element[1];
        this.wordcard[info[3][index][0]].value = element[2];
        this.wordcard[info[3][index][0]].posx = mapinfo[element[1]].posX;
        this.wordcard[info[3][index][0]].posy = mapinfo[element[1]].posY;
      });
    },
    metamong(command) {
      let index = 0;
      let info = Object.values(command);
      info.forEach(element => {

        switch (element[1]) {

          case 'U':
            this.wordcard[index].Up = true;
            break;
          case 'D':
            this.wordcard[index].Down = true;
            break;
          case 'R':
            this.wordcard[index].Right = true;
            break;
          case 'L':
            this.wordcard[index].Left = true;
            break;
          case 'UD':
            this.wordcard[index].Updown = true;
            break;
          case 'LR':
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
    clearmeta() {
      this.wordcard.forEach(element => {
        element.Up = false;
        element.Down = false;
        element.Right = false;
        element.Left = false;
        element.Updown = false;
        element.Rleft = false;
      });

    }


  },

}
</script>
   
   
<style scoped>
.ballbox {
  width: 700px;
  height: 700px;
  position: relative;
  overflow: hidden;
  /* display: grid; */
  /* border: 1px solid;
  margin-left: 200px; */
}

.ball {
  border-radius: 5px;
  width: 8.1818%;
  height: 8.1818%;
  background: #ccc;
  position: absolute;
  transition: all 0.1s;
  /* transition-delay: 0.5s; */
  z-index: 5;
  font-size: 1.3rem;
}

.bondU {
  background: #be7655;
  height: 8.64%;
  margin-top: -0.6%;

}

.bondD {
  height: 8.64%;
  background: #be7655;
}

.bondL {
  background: #be7655;
  width: 8.64%;
  margin-left: -0.6%;
}

.bondR {
  width: 8.64%;
  background: #be7655;

}

.bondUD {
  background: #be7655;
  height: 10%;
  margin-top: -0.6%;
}

.bondRL {
  background: #be7655;
  width: 10%;
  margin-left: -0.6%;

}


/* ========================== 애니메이션 =========================== */
.wordBlock-move {
  transition: test 2s cubic-bezier(0.55, 0, 0.1, 1);
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

@keyframes test {
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

.wordBlock-leave-active {
  animation: bounce-in 2s;
  z-index: 100;
}

/* 자작 애니메이션 */
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }

  5% {
    transform: scale(2);
  }

  90% {
    transform: scale(2);
  }

  100% {
    transform: scale(0.2);
  }
}
</style>