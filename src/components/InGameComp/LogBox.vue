<script>
// import WelcomeItem from "./WelcomeItem.vue";
</script>

<template>
    <div class="barcover">
        <div class="bar"><span><b>정답</b></span><button>x</button></div>
    </div>
    <div class="outer">
        HelloWorld
    </div>

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

    background: linear-gradient(351.27deg, #FFFFFF -854.98%, #EEEEEE -854.98%, #CACACA -91.55%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000, inset 3px 3px 0px #FFFFFF;
    border: 1px solid #000000;
}

.outer {

    width: 300px;
    height: 150px;
    margin-bottom: 10px;

    background: #D9D9D9;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000, inset 3px 3px 0px #FFFFFF;

}
</style>