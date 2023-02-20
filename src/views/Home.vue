<template>
    <div class="container">
        <div class="windowsWindow">
            <div class="introduction">
                <Introduction />
            </div>
        </div>
        <div class="login">
            <Login />
        </div>
    </div>
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
.windowsWindow {
    width: 1200px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container {
    width: 1600px;
    height: 100vh;
    display: flex;
    background-color: rgb(32, 119, 93);
}
.introduction {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1160px;
    height: 800px;
    vertical-align: top;
}
</style>
