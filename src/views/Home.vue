<template>
    <!-- <main>
    <TheWelcome />
  </main> -->
    <main>
        <div class="container">
            <div class="introduction">
                <Introduction />
            </div>
            <div class="login">
                <Login />
            </div>
            <!-- <div>
        <wordrain/>
      </div> -->
        </div>
    </main>
</template>

<script>
// import TheWelcome from '../components/TheWelcome.vue'
// import { RouterLink, RouterView } from 'vue-router'
import Login from "../components/Login.vue";
import Introduction from "../components/Introduction.vue";
// import wordrain from './AboutView.vue'

export default {
    components: {
        // wordrain,
        Login,
        Introduction,
    },

    setup() {
        return {};
    },
};
</script>

<style scoped>
@font-face {
    font-family: "DungGeunMo";
    src: url(../assets/font/DungGeunMo.ttf);
}

.container {
    /* width: 1300px; */
    /* height: 700px; */
    width: 100vw;
    height: 100vh;
    /* padding: 5px; */
    /* border: 1px solid black;     */
    background-color: rgba(213, 218, 218, 0.658);
}

.introduction {
    display: inline-block;
    /* border: 1px solid black; */
    opacity: 0.8;
    width: 65vw;
    height: 100vh;
    /* margin : 5px; */
    vertical-align: top;
}

.login {
    display: inline-block;
    /* border: 1px solid black; */
    opacity: 0.8;
    width: 25vw;
    height: 100vh;
    /* margin : 5px; */
    vertical-align: auto;
    background-color: rgb(102, 98, 105);
}
</style>
