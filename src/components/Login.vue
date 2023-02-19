<template>
    <div id="login-wrapper">
        <div id="loginbox">
            <div id="logo">
                <!-- <div id="title"> -->
                <h1>로고</h1>
                <!-- <img alt="로고" src="../assets/image/logo.png"> -->
                <!-- </div> -->
            </div>
            <div id="entrance">
                <input
                    id="input-room-id"
                    type="text"
                    v-model="room_code"
                    placeholder="입장코드 입력(영문, 숫자)"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = '입장코드 or 만들기(영문, 숫자)'"
                    oninput="javascript: 
                    if ((/[^A-Za-z0-9]$/ig).test(this.value) == true) {

                        this.value = ''; 
                        const modal = document.querySelector('.modal-wrapper');
                        modal.style.display = 'flex'; 
                                                } "
                    :maxlength="6"
                />
                <input
                    id="input-user-id"
                    type="text"
                    v-model="user_id"
                    placeholder="닉네임 입력(영문, 숫자)"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = '닉네임 입력(영문, 숫자)'"
                    oninput="javascript: 
                    if ((/[^A-Za-z0-9]$/ig).test(this.value) == true) {

                        this.value = ''; 
                        const modal = document.querySelector('.modal-wrapper');
                        modal.style.display = 'flex'; 
                                                } "
                    :maxlength="6"
                />

                <br />
                <button @click="createPage" id="create-button">만들기</button>
                <button @click="joinPage" id="join-buttom">입장</button>
            </div>
            <!-- <button id="open-modal">Open Modal</button>                       -->
        </div>
    </div>
    <div class="modal-wrapper">
        <div class="modal">
            <div id="modal-title">경고</div>
            <div id="modal-content">
                <div>영문과 숫자만 입력 가능합니다!</div>
                <div class="close-modal">
                    <button id="close-modal">알겠습니다</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
    setup() {
        onMounted(() => {
            //모달창
            // const openModal = document.getElementById("open-modal");
            const closeModal = document.getElementById("close-modal");

            const modal = document.querySelector(".modal-wrapper");

            closeModal.onclick = () => {
                modal.style.display = "none";
            };
        });

        const router = useRouter();

        const room_code = ref("");
        const user_id = ref("");

        const joinPage = () => {
            //     let check = (/[^A-Za-z]$/ig).test(room_code.value)
            // if (check == false) {
            //     console.log('범위 내 입니다')
            //     room_code.value = "";
            // }
            // const name = document.getElementById('input-room-id').value;
            // console.log(name);


            router.push({
                name: "inGame",
                params: {
                    room_code: `${room_code.value}`,
                    user_id: `${user_id.value}`,
                },
            });
        };

        const createPage = () => {
            const new_room_code = generateRandomCode(6);
            router.push({
                name: "inGame",
                params: {
                    room_code: `${new_room_code}`,
                    user_id: `${user_id.value}`,
                },
            });
        };

        function generateRandomCode(n) {
            const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
            let randomcode = "";
            const charactersLength = characters.length;
            for (let i = 0; i < n; i++) {
                randomcode += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            return randomcode;
        }

        return { room_code, user_id, joinPage, createPage, generateRandomCode };
    },
};
</script>

<style scoped>
#login-wrapper {
    height: 100vh;
    background-color: rgb(172, 172, 172);
    display: flex;
    flex-direction: column;
    justify-content: center;
}
#loginbox {
    width: 400px;
    height: 800px;
}

#logo {
    height: 40%;
    text-align: center;
    background-color: rgb(172, 172, 172);
}
#entrance {
    text-align: center;
    background-color: rgb(172, 172, 172);
    /* border: 1px solid black; */
    height: 50%;
    padding-top: 20%;
}
#input-room-id {
    margin: 5px;
    box-shadow: 1px 1px black, inset 2px 2px white;
    width: 325px;
    height: 50px;
    font-family: "DungGeunMo";
    font-size: large;
    text-align: center;
}

#input-user-id {
    margin: 5px;
    box-shadow: 1px 1px black, inset 2px 2px white;
    width: 325px;
    height: 50px;
    font-family: "DungGeunMo";
    font-size: large;
    text-align: center;
}

#create-button {
    background-image: radial-gradient(
        #d7d7d7 0%,
        #f3f3f3 47.92%,
        #e6e6e6 100%,
        #dbdbdb 100%
    );
    width: 160px;
    height: 50px;
    display: inline-block;
    border: 1px solid rgb(80, 80, 80);
    box-shadow: 1px 1px black, inset 2px 2px white;
    margin-right: 5px;
    margin-top: 10px;
    font-family: "DungGeunMo";
    font-size: x-large;
}

#join-buttom {
    background-image: radial-gradient(
        #d7d7d7 0%,
        #f3f3f3 47.92%,
        #e6e6e6 100%,
        #dbdbdb 100%
    );
    width: 160px;
    height: 50px;
    display: inline-block;
    border: 1px solid rgb(80, 80, 80);
    margin-top: 10px;
    box-shadow: 1px 1px black, inset 2px 2px white;
    font-family: "DungGeunMo";
    font-size: x-large;
}

.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    /* background: rgba(0, 0, 0, 0.5); */
    display: none;
    /* display: flex; */
    justify-content: center;
    align-items: center;
    font-family: "DungGeunMo";
    font-size: x-large;
}

.modal {
    background-color: rgb(172, 172, 172);
    padding: 10px;
    width: 25vw;
    height: 30vh;
    border: 2px solid rgb(80, 80, 80);
    box-shadow: 1px 1px black, inset 2px 2px white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

#modal-title {
    background-image: linear-gradient(270deg, #1085d2 0%, #00007b 100%);
    flex-basis: 10%;
    border: 2px solid rgb(80, 80, 80);
    box-shadow: 1px 1px black, inset 2px 2px white;
    padding-left: 10px;
    color: white;
}

#modal-content {
    background-color: rgb(172, 172, 172);
    flex-basis: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    font-size: large;
}

.close-modal {
    align-items: center;
    flex-basis: 20%;
    display: flex;
    justify-content: center;
}

#close-modal {
    border: 2px solid rgb(80, 80, 80);
    box-shadow: 1px 1px black, inset 2px 2px white;
}
</style>
