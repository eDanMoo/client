<template>
    <div>
        <div id="hancom">
            <div id="hancom-title">
                <p>정글타자연습</p>
            </div>
            <div id="hancom-menu">
                <p>게임 소개 | 놀이 | 산성비</p>
            </div>
            <new_wordrain />
            <!-- <div id="wordrain-wrapper">
      </div> -->

            <!-- <h2> 이단무 - ~~기반 신개념 단어 퍼즐 게임</h2>
      <p> 1. 음성 입력 </p>
      <p> 2. 입력한 단어와 유사한 단어들이 지워집니다 </p>
      <p> 3. 지워진 단어들의 칸수에 비례하여 점수가 올라갑니다 </p>
      <p> 유사도란? </p>
      <button @click="show = !show">연습</button>
      <Transition name="slide-fade">
        
        <p v-if="show"> 안녕하세요 </p>
        
      </Transition> -->
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import new_wordrain from "./new_wordrain.vue";

export default {
    components: {
        new_wordrain,
    },

    setup() {
        const show = ref(true);

        return { show };
    },
};
</script>

<style scoped>
#hancom {
    background-color: rgb(172, 172, 172);
    /* margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%; */
    padding: 2vh;
    height: 100vh;

    /* border: 2px solid rgb(80, 80, 80); */
    box-shadow: 1px 1px black, inset 2px 2px white;
    border: solid black;
    /* box-shadow: inset 2px 2px white; */
    font-family: "DungGeunMo";
    font-size: x-large;
    color: black;
    overflow: auto;
}

#hancom-title {
    background-image: linear-gradient(270deg, #1085d2 0%, #00007b 100%);
    border: 2px solid rgb(80, 80, 80);
    box-shadow: 1px 1px black, inset 2px 2px white;
    color: white;
    width: 62vw;
    height: 50px;
    padding-left: 20px;
    padding-top: 4px;
    margin-right: 5px;
    margin-left: 5px;
}

#hancom-menu {
    /* background-color: rgb(138, 137, 137); */
    background-color: rgb(172, 172, 172);
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    margin-left: 5px;
    border: 2px solid rgb(80, 80, 80);
    box-shadow: 1px 1px black, inset 2px 2px white;
    width: 62vw;
    height: 50px;
    padding-left: 20px;
    padding-top: 4px;
}

#wordrain-wrapper {
    background-color: #979899;
    height: 90%;
    /* width: 900px; */
    padding: 50px;
    border: 2px solid rgb(80, 80, 80);
    box-shadow: 2px 2px black;
    box-shadow: inset 2px 2px white;
}
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(500px);
    opacity: 0;
}
</style>
