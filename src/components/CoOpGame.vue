<template>
  <div>
    <canvas id="board" class="game-board"></canvas>
  </div>
</template>



<script>

import { onMounted, watch } from "vue";

  export default {

    props: {
      msg : {},
    },

    setup (props) {

      onMounted(() => {  

        watch(() => props.msg, ()=> {

          if (props.msg.type == 'next') {  
            let status = props.msg.status
            if (status == "continue") {
              let word = props.msg.word;
              let left = props.msg.left;
              let length = props.msg.length;
              let fall = props.msg.fall

            storeInWordSet(word, left, length, -1)
            // console.log('drop 전에 저장!!!!! : ', word);
            // console.log('drop 전 word 높이!!!! : ', wordSet[word].height);
            dropWord(word, fall)
          } 
        } else if (props.msg.type == 'check') {
          
          let removeWords = props.msg.remWords
          let i = 0;
          for (i=0; i<removeWords.length; i++) {
            removeWord(removeWords[i]);
          }
          let moveInfo = props.msg.moveInfo
          for (i=0; i < moveInfo.length; i++){
            let newword = moveInfo[i][0];
            let fall = moveInfo[i][1]
            dropWord(newword, fall)


          }
        }
      })
        
// 초기화-----------------------------------------------------------------
            const COLS = 11;      // size
            const ROWS = 11;      // size
            const BLOCK_SIZE = 63;  // 700/11로 하니까 줄생김..

            const canvas = document.getElementById('board');
            const ctx = canvas.getContext('2d');

            ctx.canvas.width = COLS * BLOCK_SIZE;
            ctx.canvas.height = ROWS * BLOCK_SIZE;
            // ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

            //이미지 집어넣기
            let blockImage = new Image();
            blockImage.src = "https://i.imgur.com/zdluTLl.png"

            let wordSet = {}
            const InputWord = [];
// 초기화-----------------------------------------------------------------
            setInterval( () => {
              ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
              let i;
              let wordSetKey = Object.keys(wordSet);
              for (i=0; i < wordSetKey.length; i++) {
                
                let left = wordSet[wordSetKey[i]].left
                let length = wordSet[wordSetKey[i]].length
                let height = wordSet[wordSetKey[i]].height
                let word = wordSetKey[i]
                
                let z = height;  
                let x = 0;
                for (x = left; x < left + length; x++) {
                  
                  // 본체
                  ctx.fillStyle = "blue";
                  ctx.fillRect(x*BLOCK_SIZE, height*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);
                  // // ctx.drawImage(blockImage, x*BLOCK_SIZE, z*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);
                  
                  // // ctx.strokeRect((x+0.05)*BLOCK_SIZE, z*BLOCK_SIZE, 0.90*BLOCK_SIZE, 0.95*BLOCK_SIZE);              
                  
                  // 각종 그림자
                  
                  ctx.clearRect(x*BLOCK_SIZE, height*BLOCK_SIZE, 0.05*BLOCK_SIZE, 0.9*BLOCK_SIZE);
                  ctx.clearRect(x*BLOCK_SIZE, height*BLOCK_SIZE, 0.9*BLOCK_SIZE, 0.05*BLOCK_SIZE);
                  ctx.fillStyle = "black"
                  ctx.fillRect(x*BLOCK_SIZE + 0.9*BLOCK_SIZE, height*BLOCK_SIZE, 0.05*BLOCK_SIZE, 0.9*BLOCK_SIZE);

                  ctx.fillRect(x*BLOCK_SIZE, height*BLOCK_SIZE + 0.9*BLOCK_SIZE, 0.9*BLOCK_SIZE, 0.05*BLOCK_SIZE);
                  // 텍스트
                  ctx.fillStyle = "white"
                  ctx.font = `${48/63 * BLOCK_SIZE}px serif`;
                  ctx.fillText(word[x-left], (x+0.1)*BLOCK_SIZE, (height+1-0.2)*BLOCK_SIZE);
                    } 
                  }
             }, 50) 

              

// -----------------------------------------> 단어 drop 함수
        function dropWord(word, fall) {
          // 단어 받기

          const wordBlock = findInfoByWord(word)
          
          let left = wordBlock.left;
          let length = wordBlock.length;
          let height = wordBlock.height;

          // 단어 옮기기  
          let z = height; 
          let x = 0;

          // 윤곽선 넣는다면?
          let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16); 
          ctx.strokeStyle = `${randomColor}`
          ctx.lineWidth = 5;
          
          function render() {
            for (x = left; x < left + length; x++) {
              ctx.fillStyle = "gray";
              
              // console.log(findInfoByWord(word))
                // 이부분 삽입----------------------
                if (findInfoByWord(word) == null) {
                  console.log('작동하나?')
                  return
                }
              // 이부분 삽입 ----------------------


              // 본체
              ctx.fillRect(x*BLOCK_SIZE, z*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);
              // ctx.drawImage(blockImage, x*BLOCK_SIZE, z*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);
              // ctx.strokeRect((x+0.05)*BLOCK_SIZE, z*BLOCK_SIZE, 0.90*BLOCK_SIZE, 0.95*BLOCK_SIZE);

              // 각종 그림자
              ctx.clearRect(x*BLOCK_SIZE, z*BLOCK_SIZE, 0.05*BLOCK_SIZE, 0.9*BLOCK_SIZE);
              ctx.clearRect(x*BLOCK_SIZE, z*BLOCK_SIZE, 0.9*BLOCK_SIZE, 0.05*BLOCK_SIZE);
              ctx.fillStyle = "black"
              ctx.fillRect(x*BLOCK_SIZE + 0.9*BLOCK_SIZE, z*BLOCK_SIZE, 0.05*BLOCK_SIZE, 0.9*BLOCK_SIZE);
              ctx.fillRect(x*BLOCK_SIZE, z*BLOCK_SIZE + 0.9*BLOCK_SIZE, 0.9*BLOCK_SIZE, 0.05*BLOCK_SIZE);

              // 텍스트
              ctx.fillStyle = "white"
              ctx.font = `${48/63 * BLOCK_SIZE}px serif`;
              ctx.fillText(word[x-left], (x+0.1)*BLOCK_SIZE, (z+1-0.2)*BLOCK_SIZE);

              // 내려온 흔적 지우기
              if (z < wordBlock.height + 1) {
                ctx.clearRect(x*BLOCK_SIZE, wordBlock.height*BLOCK_SIZE, 1*BLOCK_SIZE, (z-wordBlock.height)*BLOCK_SIZE);
              } else {
                ctx.clearRect(x*BLOCK_SIZE, (z-1)*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);
              }
            } 

          z += 0.05      // 내려오는 속도
          
          stop = requestAnimationFrame(render)
          
          if (z > fall + height) {
            cancelAnimationFrame(stop);

            // height 계산하기
            let height2 = height + fall;
            // 옮긴 단어 저장하기
            storeInWordSet(word, left, length, height2)
            } 
          }
          render()
        }
// <----------------------------------------->단어 drop 함수

// -----------------------------------------> 단어 목록에 단어 저장하기 함수
        function storeInWordSet(word, left, length, height) {
          let key = word
          wordSet[key] = {
            left : left,
            length : length,
            height : height,
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

          console.log('끝에서 멈춤 : ', word)
          console.log('삭제 전 wordSet : ', wordSet)

          // InputWord.splice(i, 1);

          let left = wordSet[word].left;
          let length = wordSet[word].length;
          let height = wordSet[word].height;
          // 화면 지우기
          ctx.clearRect(left*BLOCK_SIZE, height *BLOCK_SIZE, length * BLOCK_SIZE, BLOCK_SIZE);
           
          removeWordInWordSet(word);
          console.log(word, '삭제완료')
          console.log('삭제 후 wordSet : ', wordSet)
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