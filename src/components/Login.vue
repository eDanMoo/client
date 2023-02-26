<template>
    <div id="login-wrapper">
        <div id="loginbox">
            <div id="logo">
                <img
                    src="../assets/image/logo.png"
                    alt=""
                    style="width: 50%; margin-bottom: 5vh"
                />
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
                        const modal = document.getElementById('modal-wrapper');
                        modal.style.display = 'flex'; 

                        document.getElementById('close-modal').focus();
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
                        const modal = document.getElementById('modal-wrapper');
                        modal.style.display = 'flex'; 

                        document.getElementById('close-modal').focus();
                                                } "
                    :maxlength="6"
                />

                <br />
                <button @click="createPage" id="create-button">만들기</button>
                <button @click="joinPage" id="join-buttom">입장</button>
            </div>
        </div>
    </div>
    <div id="modal-wrapper">
        <div id="modal">
            <div id="modal-title">경고</div>
            <div id="modal-content">
                <div>영문과 숫자만 입력 가능합니다!</div>
                <div class="close-modal">
                    <button id="close-modal">알겠습니다</button>
                </div>
            </div>
        </div>
    </div>
    <div id="modal-wrapper-2">
        <div id="modal-2">
            <div id="modal-title-2">경고</div>
            <div id="modal-content-2">
                <div>입력값을 적어주세요</div>
                <div class="close-modal-2">
                    <button id="close-modal-2">알겠습니다</button>
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
            const closeModal = document.getElementById("close-modal");
            const closeModal2 = document.getElementById("close-modal-2");

            const modal = document.getElementById("modal-wrapper");
            const modal2 = document.getElementById("modal-wrapper-2");

            closeModal.onclick = () => {
                modal.style.display = "none";
            };

            closeModal.addEventListener("keydown", function (e) {
                if (e.keyCode === 13) {
                    if (modal.style.display === "flex") {
                        modal.style.display = "none";
                    }
                }
            });

            closeModal2.onclick = () => {
                modal2.style.display = "none";
            };

            closeModal2.addEventListener("keydown", function (e) {
                if (e.keyCode === 13) {
                    if (modal2.style.display === "flex") {
                        modal2.style.display = "none";
                    }
                }
            });
        });

        const router = useRouter();

        const room_code = ref("");
        const user_id = ref("");

        const joinPage = () => {
            const roomID = document.getElementById("input-room-id");
            const userID = document.getElementById("input-user-id");
            const modal2 = document.getElementById("modal-wrapper-2");

            if (userID.value == "" || roomID.value == "") {
                modal2.style.display = "flex";
                document.getElementById("close-modal-2").focus();
            }

            const audio = new Audio("../src/assets/soundEffect/enterRoom.wav");
            audio.volume = 0.6;
            audio.play();
            router.push({
                name: "inGame",
                params: {
                    room_code: `${room_code.value}`,
                    user_id: `${user_id.value}`,
                },
            });
        };

        const createPage = () => {
            const userID = document.getElementById("input-user-id");
            const modal2 = document.getElementById("modal-wrapper-2");

            if (userID.value == "") {
                modal2.style.display = "flex";
                document.getElementById("close-modal-2").focus();
            }
            const new_room_code = generateRandomCode(6);
            const audio = new Audio("../src/assets/soundEffect/enterRoom.wav");
            audio.volume = 0.6;
            audio.play();
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
    height: 100%;
    min-height: 100vh;
    max-width: 100%;
    background: linear-gradient(
        351.27deg,
        #ffffff -854.98%,
        #eeeeee -854.98%,
        #cacaca -91.55%
    );
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 1px 1px 0px #000000,
        inset 3px 3px 0px #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#loginbox {
    width: fit-content;
    height: fit-content;
}

#logo {
    /* height: 40%; */
    text-align: center;
}
#entrance {
    text-align: center;
    /* height: 50%; */
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

#modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: none;
    justify-content: center;
    align-items: center;
    font-family: "DungGeunMo";
    font-size: x-large;
}

#modal {
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

#modal-wrapper-2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: none;
    justify-content: center;
    align-items: center;
    font-family: "DungGeunMo";
    font-size: x-large;
}

#modal-2 {
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

#modal-title-2 {
    background-image: linear-gradient(270deg, #1085d2 0%, #00007b 100%);
    flex-basis: 10%;
    border: 2px solid rgb(80, 80, 80);
    box-shadow: 1px 1px black, inset 2px 2px white;
    padding-left: 10px;
    color: white;
}

#modal-content-2 {
    background-color: rgb(172, 172, 172);
    flex-basis: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    font-size: large;
}

.close-modal-2 {
    align-items: center;
    flex-basis: 20%;
    display: flex;
    justify-content: center;
}

#close-modal-2 {
    border: 2px solid rgb(80, 80, 80);
    box-shadow: 1px 1px black, inset 2px 2px white;
}
</style>
