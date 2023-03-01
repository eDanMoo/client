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
    },

    setup (props) {

      onMounted(() => {  

        watch(() => props.msg, async ()=> {

          if (props.msg.type == 'next') {  
            let status = props.msg.status
            if (status == "continue") {
              let word = props.msg.word;
              let left = props.msg.left;
              let length = props.msg.length;

              let fall = props.msg.fall
              let current = -1;
              let destination = current + fall;

            storeInWordSet(word, left, length, current, destination)


          } 
        } else if (props.msg.type == 'check') {
          
          let remWords = props.msg.remWords;
          let i = 0;

          for (i=0; i<remWords.length; i++) {
            let word = remWords[i]
            removeWordInWordSet(word)
          }

          let moveInfo = props.msg.moveInfo;
          for (i=0; i < moveInfo.length; i++ ){

            let word = moveInfo[i][0];
            let fall = moveInfo[i][1];
            console.log(wordSet[word]);
            let destination = wordSet[word].destination;
            await setDestination(word, destination, fall)
            console.log('moveInfo : ', word, fall)
         
            
            // 이게 동시에 안되나?
          }
        }
      })
        
// 초기화-----------------------------------------------------------------

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

            //이미지 집어넣기
            // let blockImage = new Image();
            // blockImage.src = "https://i.imgur.com/zdluTLl.png"

            const wordSet = [];
            let stopWord = [];    // 이름 고칠 것
            const InputWord = [];   // 안쓸거면 지우기
// 초기화-----------------------------------------------------------------
            setInterval( () => {
              ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
              let i;
              let wordSetKey = Object.keys(wordSet);
              for (i=0; i < wordSetKey.length; i++) {
                
                let left = wordSet[wordSetKey[i]].left
                let length = wordSet[wordSetKey[i]].length
                let current = wordSet[wordSetKey[i]].current
                let destination = wordSet[wordSetKey[i]].destination
                let word = wordSetKey[i]
                
                let x = 0;
                for (x = left; x < left + length; x++) {
                  
                  // 본체
                  ctx.fillStyle = "gray";
                  ctx.fillRect(x*BLOCK_SIZE, current*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);
                  // // ctx.drawImage(blockImage, x*BLOCK_SIZE, z*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);
                  
                  // // ctx.strokeRect((x+0.05)*BLOCK_SIZE, z*BLOCK_SIZE, 0.90*BLOCK_SIZE, 0.95*BLOCK_SIZE);              
                  
                  // 각종 그림자
                  
                  ctx.clearRect(x*BLOCK_SIZE, current*BLOCK_SIZE, 0.05*BLOCK_SIZE, 0.9*BLOCK_SIZE);
                  ctx.clearRect(x*BLOCK_SIZE, current*BLOCK_SIZE, 0.9*BLOCK_SIZE, 0.05*BLOCK_SIZE);
                  ctx.fillStyle = "black"
                  ctx.fillRect(x*BLOCK_SIZE + 0.9*BLOCK_SIZE, current*BLOCK_SIZE, 0.05*BLOCK_SIZE, 0.9*BLOCK_SIZE);
                  
                  ctx.fillRect(x*BLOCK_SIZE, current*BLOCK_SIZE + 0.9*BLOCK_SIZE, 0.9*BLOCK_SIZE, 0.05*BLOCK_SIZE);
                  // 텍스트
                  ctx.fillStyle = "white"
                  ctx.font = `${48/63 * BLOCK_SIZE}px serif`;
                  ctx.fillText(word[x-left], (x+0.1)*BLOCK_SIZE, (current+1-0.2)*BLOCK_SIZE);
                } 
                if (current < destination) {   
                wordSet[wordSetKey[i]].current = current + 0.1;
                }
              }
            }, 5) 
            
              

// -----------------------------------------> 단어 drop 함수
        function dropWord(word) {
          // 단어 받기
          const wordBlock = wordSet[word]
          
          let left = wordBlock.left;
          let length = wordBlock.length;
          let current = wordBlock.current;
          let destination = wordBlock.destination;

          // 단어 옮기기  
          let x = 0;

          // 윤곽선 넣는다면?
          // let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16); 
          // ctx.strokeStyle = `${randomColor}`
          // ctx.lineWidth = 5;
          
          function render() {
            for (x = left; x < left + length; x++) {
              ctx.fillStyle = "gray";
              
              // 이부분 삽입---------------------- 
              // if (stopWord.includes(word)) {
              //   ctx.fillRect(x*BLOCK_SIZE, z*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);
              //   delete startWord[word];
              //   console.log(`${word} 중간에 터짐`)
              //   return
              // }
              
              // 이부분 삽입 ----------------------
              
              let checkWordInWordSet = word in wordSet;
              // if (checkWordInWordSet) {
              //   ctx.clearRect(x*BLOCK_SIZE, current *BLOCK_SIZE, length * BLOCK_SIZE, BLOCK_SIZE);
              //   return
              // }


              // 본체
              ctx.fillRect(x*BLOCK_SIZE, current*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);
              // ctx.drawImage(blockImage, x*BLOCK_SIZE, z*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);
              // ctx.strokeRect((x+0.05)*BLOCK_SIZE, z*BLOCK_SIZE, 0.90*BLOCK_SIZE, 0.95*BLOCK_SIZE);

              // 각종 그림자
              ctx.clearRect(x*BLOCK_SIZE, current*BLOCK_SIZE, 0.05*BLOCK_SIZE, 0.9*BLOCK_SIZE);
              ctx.clearRect(x*BLOCK_SIZE, current*BLOCK_SIZE, 0.9*BLOCK_SIZE, 0.05*BLOCK_SIZE);
              ctx.fillStyle = "black"
              ctx.fillRect(x*BLOCK_SIZE + 0.9*BLOCK_SIZE, current*BLOCK_SIZE, 0.05*BLOCK_SIZE, 0.9*BLOCK_SIZE);
              ctx.fillRect(x*BLOCK_SIZE, current*BLOCK_SIZE + 0.9*BLOCK_SIZE, 0.9*BLOCK_SIZE, 0.05*BLOCK_SIZE);

              // 텍스트
              ctx.fillStyle = "white"
              ctx.font = `${48/63 * BLOCK_SIZE}px serif`;
              ctx.fillText(word[x-left], (x+0.1)*BLOCK_SIZE, (current+1-0.2)*BLOCK_SIZE);

              // 내려온 흔적 지우기
              if (current < wordBlock.current + 1) {
                ctx.clearRect(x*BLOCK_SIZE, current*BLOCK_SIZE, 1*BLOCK_SIZE, (current-wordBlock.height)*BLOCK_SIZE);
              } else {
                ctx.clearRect(x*BLOCK_SIZE, (current-1)*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);
              }
            } 

            current += 0.05      // 내려오는 속도
          
          stop = requestAnimationFrame(render)
          
          if (current > destination) {
            cancelAnimationFrame(stop);
            wordSet[word].current = current;
            } 
          }
          render()
        }
// <----------------------------------------->단어 drop 함수

        function setDestination(word, destination, fall) {
          wordSet[word].destination = destination + fall;
        }


// -----------------------------------------> 단어 목록에 단어 저장하기 함수
        function storeInWordSet(word, left, length, current, destination) {
          let key = word
          wordSet[key] = {
            left : left,
            length : length,
            current : current,
            destination : destination,
          }
        }
// <----------------------------------------- 단어 목록에 단어 저장하기 함수


// 새로운 함수

function storeInStartWord(word, left, length, height) {
          let key = word
          startWord[key] = {
            left : left,
            length : length,
            height : height,
          }
          console.log(`moveinfo에서 ${word} 저장 끝`)
        }

function storeInEndWord(word, left, length, height) {
          let key = word
          endWord[key] = {
            left : left,
            length : length,
            height : height,
          }
}
        








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
    background-color: rgb(201, 201, 201);
}
</style>
