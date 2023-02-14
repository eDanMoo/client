<script>
export default {
    data() {
        return {
            visible: true,
        };
    },
    methods: {
        // enter(el) {
        //     el.style.height = 'auto';
        //     const height = getComputedStyle(el).height;
        //     el.style.height = 0;

        //     getComputedStyle(el);

        //     setTimeout(() => {
        //         el.style.height = height;
        //     });
        // },
        // afterEnter(el) {
        //     el.style.height = 'auto';
        // },
        // leave(el) {
        //     const height = getComputedStyle(el).height;
        //     getComputedStyle(el);
        //     setTimeout(() => {
        //         el.style.height = 0;
        //     });
        // }
        
    },
};
</script>

<template>
    <div class="barcover">
        <div class="bar"><span><b>점수</b></span><button @click="visible=!visible" style="box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000, inset 1px 1px 0px #FFFFFF;">X</button></div>
    </div><i></i>
    <transition name="bad">
        <div v-show="visible" class="outer">
            <div class="blackbox"></div>
        </div>
    </transition>


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

    display: flex;
    align-items: center;
    justify-content: center;

}

.blackbox{
    background: rgba(0, 0, 0, 1);

    width: 280px;
    height: 130px;

}

.bad-enter-active, .bad-leave-active {
    overflow: hidden;
}

</style>