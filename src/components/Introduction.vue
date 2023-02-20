<template>
    <div>
        <WordRain />
    </div>
</template>

<script>
import { ref } from "vue";
import WordRain from "./WordRain.vue";

export default {
    components: {
        WordRain,
    },

    setup() {
        const show = ref(true);

        return { show };
    },
};
</script>

<style scoped>

</style>
