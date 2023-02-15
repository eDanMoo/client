<script>
// import WelcomeItem from "./WelcomeItem.vue";
</script>

<template>
    <div class="barcover">
        <div class="bar">
            <span><b>정답</b></span
            ><button>x</button>
        </div>
    </div>
    <div class="outer">HelloWorld</div>
</template>

<style scoped>
.bar {
    width: 290px;
    height: 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.barcover {
    /* Rectangle 2 */
    width: 300px;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000000;

    background: linear-gradient(
        351.27deg,
        #ffffff -854.98%,
        #eeeeee -854.98%,
        #cacaca -91.55%
    );
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    border: 1px solid #000000;
}

.outer {
    width: 300px;
    height: 150px;
    margin-bottom: 10px;

    background: #d9d9d9;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
}
</style>
