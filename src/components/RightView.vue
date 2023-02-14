<script>
import chatbox from "./InGameComp/ChatBox.vue";
import logbox from "./InGameComp/LogBox.vue";
import scorebox from "./InGameComp/ScoreBox.vue";

export default {
    name: 'RightView',
    components: {
        chatbox,
        logbox,
        scorebox
    }
}
</script>

<template>
    <div class="container">
        <div>
            <scorebox />
        </div>
        <div>
            <logbox />
        </div>
        <div>
            <chatbox />
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
</style>