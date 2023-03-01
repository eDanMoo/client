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
        // delete_board: Number,
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

              let fall = props.msg.fall
              let current = -1;
              let destination = current + fall;
              let color = colorSet[Math.floor(Math.random() * 6)]
              

            storeInWordSet(word, left, length, current, destination, color)


          } 
        } else if (props.msg.type == 'check') {
          
          let remWords = props.msg.remWords;
          let i = 0;

                        for (i = 0; i < remWords.length; i++) {
                            let word = remWords[i];
                            removeWordInWordSet(word);
                        }

          let moveInfo = props.msg.moveInfo;
          for (i=0; i < moveInfo.length; i++ ){

            let word = moveInfo[i][0];
            let fall = moveInfo[i][1];
            console.log(wordSet[word], word);
            let destination = wordSet[word].destination;
            await setDestination(word, destination, fall)
            console.log('moveInfo : ', word, fall)
    
          }
        }
      })


      // watch( () =>props.delete_board, (newValue)=> {
      //   console.log('발동')
      //   if (newValue == 1) {
      //         wordSet = []
      //         ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      //         // clearInterval(drawWord);
      //       }
      // } )


            const COLS = 11; // size
            const ROWS = 11; // size
            const BLOCK_SIZE = 63; // 700/11로 하니까 줄생김..

            const canvas = document.getElementById("board");
            const ctx = canvas.getContext("2d");

            ctx.canvas.width = COLS * BLOCK_SIZE;
            ctx.canvas.height = ROWS * BLOCK_SIZE;
            // ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

            //이미지 집어넣기
            // let blockImage = new Image();
            // blockImage.src = "https://i.imgur.com/zdluTLl.png"

            const wordSet = [];
            const colorSet = [
              ['#FFF548', '#3C1A5B'],
              ['#CED46A', '#07553B'],
              ['#FFDFDE', '#6A7BA2'],
              ['#ADEFD1', '#00203F'],
              ['#97BC62', '#2C5F2D'],
              ['#9CC3D5', '#0063B2'],
            ];
              


            let drawWord = setInterval( () => {
              ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
              let i;
              let wordSetKey = Object.keys(wordSet);
              for (i=0; i < wordSetKey.length; i++) {
                
                let left = wordSet[wordSetKey[i]].left
                let length = wordSet[wordSetKey[i]].length
                let current = wordSet[wordSetKey[i]].current
                let destination = wordSet[wordSetKey[i]].destination
                let word = wordSetKey[i]
                let colorBackground = wordSet[wordSetKey[i]].color[0];
                let colorText = wordSet[wordSetKey[i]].color[1];

                
                let x = 0;
                for (x = left; x < left + length; x++) {
                  
                  // 본체
                  ctx.fillStyle = colorBackground;
                  ctx.fillRect(x*BLOCK_SIZE, current*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);
                  // // ctx.drawImage(blockImage, x*BLOCK_SIZE, z*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);
                  
                  // // ctx.strokeRect((x+0.05)*BLOCK_SIZE, z*BLOCK_SIZE, 0.90*BLOCK_SIZE, 0.95*BLOCK_SIZE);              
                  
                  // 각종 그림자
                  
                  ctx.fillStyle = 'black';
                  // 왼쪽 윤곽
                  ctx.clearRect(x*BLOCK_SIZE, current*BLOCK_SIZE, 0.03*BLOCK_SIZE, BLOCK_SIZE);
                  // ctx.fillRect((x+0.03)*BLOCK_SIZE, current*BLOCK_SIZE, 0.05*BLOCK_SIZE, BLOCK_SIZE);
                  // // 위쪽 윤곽
                  ctx.clearRect(x*BLOCK_SIZE, current*BLOCK_SIZE, BLOCK_SIZE, 0.03*BLOCK_SIZE);
                  // ctx.fillRect(x*BLOCK_SIZE, (current+0.03)*BLOCK_SIZE, BLOCK_SIZE,0.05*BLOCK_SIZE);
                  // // 오른쪽 윤곽
                  ctx.clearRect((x+0.97)*BLOCK_SIZE, current*BLOCK_SIZE, 0.03*BLOCK_SIZE, BLOCK_SIZE);
                  // ctx.fillRect((x+0.92)*BLOCK_SIZE, current*BLOCK_SIZE, 0.05*BLOCK_SIZE, BLOCK_SIZE);
                  // // 아래쪽 윤곽
                  ctx.clearRect(x*BLOCK_SIZE, (current+0.97)*BLOCK_SIZE, BLOCK_SIZE, 0.03*BLOCK_SIZE);
                  // ctx.fillRect(x*BLOCK_SIZE, (current+0.92)*BLOCK_SIZE, BLOCK_SIZE, 0.05*BLOCK_SIZE);
                  // ctx.fillStyle = "black"
                  // ctx.fillRect(x*BLOCK_SIZE + 0.9*BLOCK_SIZE, current*BLOCK_SIZE, 0.05*BLOCK_SIZE, 0.9*BLOCK_SIZE);
                  
                  // ctx.fillRect(x*BLOCK_SIZE, current*BLOCK_SIZE + 0.9*BLOCK_SIZE, 0.9*BLOCK_SIZE, 0.05*BLOCK_SIZE);
                  // 텍스트
                  ctx.font = `${48/63 * BLOCK_SIZE}px DungGeunMo`;
                  ctx.fillText(word[x-left], (x+0.12)*BLOCK_SIZE, (current+1-0.29)*BLOCK_SIZE);
                } 
                if (current < destination) {   
                wordSet[wordSetKey[i]].current = current + 0.1;
                }
              }
            }, 5) 
            

        function setDestination(word, destination, fall) {
          wordSet[word].destination = destination + fall;
        }

// -----------------------------------------> 단어 목록에 단어 저장하기 함수
        function storeInWordSet(word, left, length, current, destination, color) {
          let key = word
          wordSet[key] = {
            left : left,
            length : length,
            current : current,
            destination : destination,
            color : color,
          }
        }
// <----------------------------------------- 단어 목록에 단어 저장하기 함수


// -----------------------------------------> 단어 목록에서 단어 삭제하기 함수
        function removeWordInWordSet(word) {
          delete wordSet[word]
        }
// <----------------------------------------- 단어 목록에서 단어 삭제하기 함수

// -----------------------------------------> 단어로 필요한 정보 찾기
        function findInfoByWord(word) {
          return wordSet[word]
        }
// <----------------------------------------- 단어로 필요한 정보 찾기

// -----------------------------------------> 단어블록 지우기 함수
        function removeWord(word) {

          let left = wordSet[word].left;
          let length = wordSet[word].length;
          let current = wordSet[word].current;
          // 화면 지우기
          ctx.clearRect(left*BLOCK_SIZE, current *BLOCK_SIZE, length * BLOCK_SIZE, BLOCK_SIZE);

        }
// <----------------------------------------- 단어블록 지우기 함수


    },)

    return { } ;
  },
};
</script>

<style scoped>
#board {
    background-color: rgba(0, 0, 0, 0.7);
    
}

@font-face {
    font-family: "DungGeunMo";
    src: url("../assets/font/digital.ttf") format("truetype");
}
</style>
