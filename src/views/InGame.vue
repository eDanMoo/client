<script>
import CamComp from "../components/cam.vue";
import WordCard from "../components/WordCard.vue";
import RightView from "../components/RightView.vue";
export default {
    name: 'InGame',
    components: {
        CamComp,
        WordCard,
        RightView
    }
}
</script>

<template>
    <div class="home">
        <div>
            <CamComp />
        </div>
        <div>
            <WordCard />
        </div>
        <div>
            <RightView />
        </div>
    </div>


</template>

<style scoped>
.home {
    display: grid;
    grid-template-columns: minmax(500px, 1fr) 2fr 1fr;
}

.item-a {
    grid-row-start: row1-start;
    grid-row-end: 2;
    /* third-line과 동일 */
    grid-column-start: 2;
    /* line2와 동일 */
    grid-column-end: five;
}
</style>