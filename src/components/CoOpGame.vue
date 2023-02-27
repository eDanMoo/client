<template>
  <div>
    <canvas id="board" class="game-board"></canvas>
  </div>

  <!-- 일단 복붙해옴 -->
  <div class="answerBox">
                        <input
                            type="text"
                            id="input_answer"
                            style="width: 250px; font-size: 2rem"
                        />
                        <button
                            id="submit_answer"
                            style="margin-left: 10px; font-size: 2rem"
                        >
                            제출
                        </button>
                        <button
                            id="submit_answer2"
                            style="margin-left: 10px; font-size: 2rem"
                        >
                            제출2
                        </button>
                        <button
                            id="game_start"
                            @click="init()"
                        >
                            게임 시작
                        </button>
  </div>
</template>



<script>

import { onMounted, watch } from "vue";

  export default {

    props: {
      msg : {},
    },

    setup (props) {

      // console.log(props.msg)
      // console.log(props.msg['word2'].status)


      function init() {
        console.log('init');
      }

      onMounted(() => {  



// watch 함수 예시
        watch(props.msg, () => {
        console.log('watch는 실행됨')
        if (props.msg['word2'].status == 1) {
          console.log('변경완료 표시도 됨')
          storeInWordSet(props.msg['word'].word, props.msg['word'].left, props.msg['word'].length, -1)
          dropWord(props.msg['word'].word, props.msg['word'].fall)
        } 
      } )



      // 나중에 연결하면 살리기
      //   watch(props.msg, ()=> {
      //     if (props.msg.type == next) {  
      //       let status = props.msg.status
      //       if (status == "continue") {
      //         let word = props.msg.word;
      //         let left = props.msg.left;
      //         let length = props.msg.length;
      //         let fall = props.msg.fall

      //       storeInWordSet(word, left, length, -1)
      //       dropWord(word, fall)
      //     } else {
      //       gameover()
      //     } 
      //   } else if (props.msg.type == check) {
          
      //     answerRemove()
      //     let moveInfo = words.moveInfo;
      //     for (i=0; i < moveInfo.length; i++){
      //       let newword = moveInfo[i][0];
      //       let fall = moveInfo[i][1]
      //       dropWord(newword, fall)
      //     }
      //   }
      // })
        
        
        



// 초기화-----------------------------------------------------------------
            const COLS = 11;      // size
            const ROWS = 11;      // size
            const BLOCK_SIZE = 63;  // 700/11로 하니까 줄생김..

            const canvas = document.getElementById('board');
            const ctx = canvas.getContext('2d');

            ctx.canvas.width = COLS * BLOCK_SIZE;
            ctx.canvas.height = ROWS * BLOCK_SIZE;
            // ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

            const wordSet = {
              // 테스트용 예시모음집
              '떡볶이' : {
                left : 0,
                length : 3,
                height : -1,
                // fall : 10,
              },
              '햄버거' : {
                left : 6,
                length : 3,          
                height : -1,
                // fall : 10,
              },
              '김밥' : {
                left : 8,
                length : 2,
                height : -1,
                // fall : 9,
              },
              '감자튀김' : {
                left : 1,
                length : 4,          
                height : -1,
                // fall : 9 ,
              },
              '아이스크림' : {
                left : 4,
                length : 5,          
                height : -1,
                // fall : 8,
              }
            }
// 초기화-----------------------------------------------------------------

// -----------------------------------------> 단어 drop 함수
        function dropWord(word, fall) {
          // 단어 받기
          console.log(wordSet)
          const wordBlock = findInfoByWord(word)
          
          let left = wordBlock.left;
          let length = wordBlock.length;
          let height = wordBlock.height;

                // 높이 0일때, 주어졌을 때 구분하기



          // 단어 옮기기  
          let z = height; 
          let x = 0;
          function render() {
            for (x = left; x < left + length; x++) {
              ctx.fillStyle = "gray";

              // 이부분 삽입----------------------
              if (word == inputAnswer) {
                for (x = left; x < left + length; x++) {
                ctx.clearRect(x*BLOCK_SIZE, (z-0.1)*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);
                }
                removeWordInWordSet(word);
                inputAnswer = -1;

                // console.log(wordSet);
                // height 새로 저장하고, removeWord로 지우기
                return
              }
              // 이부분 삽입 ----------------------


              // 본체
              ctx.fillRect(x*BLOCK_SIZE, z*BLOCK_SIZE, 1*BLOCK_SIZE, 1*BLOCK_SIZE);

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

          z += 0.1      // 내려오는 속도
          
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
          // left = wordblock.left
          // length = wordblock.length
          // height = wordblock.height
        }
// <----------------------------------------- 단어로 필요한 정보 찾기

// -----------------------------------------> 단어블록 지우기 함수
        function removeWord(word) {
          // 필요한 정보(height, left, length) 찾기

          let left = wordSet[word].left;
          let length = wordSet[word].length;
          let height = wordSet[word].height;
          // 화면 지우기
          ctx.clearRect(left*BLOCK_SIZE, height *BLOCK_SIZE, length * BLOCK_SIZE, BLOCK_SIZE);

          // 단어 모음집에서 word 지우기
          removeWordInWordSet(word)
        }
// <----------------------------------------- 단어블록 지우기 함수











//-------------------------------------------> 통신

        // 실험용
        var start = document.getElementById("game_start")
            start.addEventListener('click', hi)

            function hi(e){
              console.log('hi')
            }

// --------------------------next-------------------------------
// status 확인하고, continue면---------------
// word = words.word
// left = words.left
// length = words.length
// fall = words.fall 

// storeInWordSet(word, left, length, -1)
// dropWord(word, fall)

// status 확인하고, gameover면-------------
// finish로?

        // if (message.type == next) {
        //   let status = words.status
        //   if (status == "continue") {
        //     nextBlockDrop()
        //   } else {
        //     gameover()
        //   }
        // }

        // 위에서 블록 생성하고 내려가기 
        // function nextBlockDrop () {
        //   let word = words.word;
        //   let left = words.left;
        //   let length = words.length;
        //   let fall = words.fall

        //   storeInWordSet(word, left, length, -1)
        //   dropWord(word, fall)
        // }

        function gameover () {
          // 대충 적기
          // 게임 끝났다고 서버로 보내기
          // 화면 정리.. 캔버스 지우기? 결과창 띄우기?
        }
// --------------------------next-------------------------------

// --------------------------check-------------------------------
// removeWords = words.removeWords
// for (i=0; i < removeWords.length; i++) {
//   removeWord(removeWords);
// }

// drop 실행(나중에 옮길 수 있음)
      //moveinfo에서 word로 필요한 정보(height, left, length) 찾기 + fall 로 내려올 값
// moveInfo = words.moveInfo
// let i = 0;
// for (i = 0; i < moveInfo.length; i++) {
//   // moveInfo 없을 경우 생각하기 
//   let newword = moveInfo[i][0];
//   let fall = moveInfo[i][1];
//   console.log(newword)
//   console.log(fall)
//   dropWord(newword, fall)
// }

        // 정답 맞출 경우, 해당 블록 지우고, 나머지 지우는 함수 
        function answerRemove() {
          // 단어 먼저 지우기
          let removeWords = props.msg.removeWords
          for (i=0; i<removeWords.length; i++) {
            removeWord(removeWords[i])
          }

          // 나머지 블록 내리기
          let moveInfo = props.msg.moveInfo
          for (i=0; i < moveInfo.length; i++){
            let newword = moveInfo[i][0];
            let fall = moveInfo[i][1]
            dropWord(newword, fall)
          }
        }

        //점수채우기
        

// --------------------------check-------------------------------
// <------------------------------------------- 통신---------
            




// 테스트 공간--------------------------------------
        const fallSet = [10, 10, 9, 9, 8]
          
            let i = 0;
            const testdrop = setInterval (function() {
              let word = Object.keys(wordSet)[i];
              let fall = fallSet[i]
              dropWord(word, fall)  
              i = i + 1;
              if (i > 4) {
                clearInterval(testdrop)
              }
            }, 1000);              
            
    
            let moveInfo1 = [['김밥', 1]]
            let moveInfo2 = [['아이스크림', 1]]
            
            setTimeout(removeWord, 6000, '햄버거')
            
            setTimeout(removeWord, 6000, '감자튀김')
            setTimeout(()=> {
              for (i = 0; i < moveInfo1.length; i++) {
              // moveInfo 없을 경우 생각하기 
              let newword = moveInfo1[i][0];
              let fall = moveInfo1[i][1];
              dropWord(newword, fall)
            }}, 6500)
            setTimeout(()=> {
            for (i = 0; i < moveInfo2.length; i++) {
              // moveInfo 없을 경우 생각하기 
              let newword = moveInfo2[i][0];
              let fall = moveInfo2[i][1];
              dropWord(newword, fall)
            }}, 6500)

            
            //단어 입력하면 삭제시키기
            var inputAnswer = -1
            const input = document.getElementById('input_answer');
            const button = document.getElementById('submit_answer');
            button.addEventListener('click', function(event) {
              console.log("단어 입력 함수 동작함")
              let a = input.value;
              console.log("입력값 :", a)
              let b = Object.keys(wordSet)
              for (i=0; i < b.length; i++) {
                
                if (b[i] == a && wordSet[b[i]].height != -1) {
                  removeWord(a);
                } 
                inputAnswer = a
              }
            }
            )

            const button2 = document.getElementById('submit_answer2');
            button2.addEventListener('click', function(event) {
              console.log(inputAnswer)
            })
    },)

    return { init } ;
  },
};
</script>

<style scoped>

#board {
  background-color: rgb(201, 201, 201);
}

</style>