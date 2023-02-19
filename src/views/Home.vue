<template>
    <main>
        <div class="container">
            <div class="introduction">
                <Introduction />
            </div>
            <div class="login">
                <Login />
            </div>
        </div>
        <!-- <div class="modal-wrapper">
            <div class="modal">
              <h1>경고</h1>
              <p>
                    영문과 숫자만 입력 가능합니다!
              </p>
              <div class="close-modal">
                <button id="close-modal">close</button>
              </div>
            </div>
        </div> -->
    </main>
</template>

<script>
import Login from "../components/Login.vue";
import Introduction from "../components/Introduction.vue";
export default {
    components: {
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
    width: 100vw;
    height: 100vh;
    background-color: rgba(213, 218, 218, 0.658);
}
.introduction {
    display: inline-block;
    opacity: 0.8;
    width: 65vw;
    height: 100vh;
    vertical-align: top;
}
.login {
    display: inline-block;
    opacity: 0.8;
    width: 35vw;
    height: 100vh;
    vertical-align: auto;
    background-color: rgb(102, 98, 105);
}
</style>