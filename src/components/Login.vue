<template>
  <div id="loginbox">
    <div id="logo">
      <div id="title">
        <h1>로고</h1>
      </div>
    </div>
    <div id="entrance">
      <input id="input-room-id" type="text" v-model="room_code" placeholder="입장코드 or 만들기">
      <input id="input-user-id" type="text" v-model="user_id" placeholder="닉네임 입력">
      <!-- <div> {{  room_code }}</div>
      <div> {{  user_id }}</div> -->
      <br>
      <button @click="createPage" id="create-button">만들기</button>
      <button @click="joinPage" id="join-buttom">입장</button>
      <!-- <RouterLink to="/IngameIView"><button id="create-button">create</button></RouterLink>
      <RouterLink to="/IngameView"><button id="join-buttom">join</button></RouterLink> -->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter, RouterLink, RouterView } from 'vue-router'

export default {
  setup () {
    const router = useRouter();
    // console.log(router);

    const room_code = ref('');
    const user_id = ref('');
    // console.log(room_code.value);
    // console.log(user_id.value);

    const joinPage = () => {
      router.push({ name: 'ingame', params: { room_code: `${room_code.value}`, user_id: `${user_id.value}` } })
      // router.push(`/${room_code.value}/${user_id.value}`)
      // console.log(room_code.value);
      // console.log(user_id.value);
    };

    function generateRandomCode(n) {
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let randomcode = '';
      const charactersLength = characters.length;
      for (let i = 0; i < n; i++) {
        randomcode += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return randomcode
  }

    const createPage = () => {

      const new_room_code = generateRandomCode(6);
      console.log(new_room_code)
      // router.push(`/${new_room_code}/${user_id.value}`)
      router.push({ name: 'ingame', params: { room_code: `${new_room_code}`,user_id: `${user_id.value}` } })
    }

    return { room_code, user_id, joinPage, createPage, generateRandomCode}
  }
}
</script>

<style scoped>

#loginbox {
  height: 100%;
  background-color: rgb(172, 172, 172);
  vertical-align: auto;
  /* border: solid black; */
}

#logo {
  height: 40%;
  /* margin: auto; */
  text-align: center;
  background-color: rgb(172, 172, 172);
  /* border: solid black; */
}

#title {
  padding-top: 50%;
  /* margin-top: 20%; */
}

#entrance {
  text-align: center;
  background-color: rgb(172, 172, 172);
  height: 30%;
  padding-top: 20%;
  /* border: solid black; */
}

#input-room-id {
  margin: 5px;
  box-shadow: 1px 1px black, inset 2px 2px white;
  width: 250px;
  height: 40px;
}

#input-user-id {
  margin: 5px;
  box-shadow: 1px 1px black, inset 2px 2px white;
  width: 250px;
  height: 40px;
}

#create-button {
  background-image: radial-gradient(#D7D7D7 0%, #F3F3F3 47.92%, #E6E6E6 100%, #DBDBDB 100%);
  width: 160px;
  height: 40px;
  display: inline-block;
  border: 1px solid rgb(80, 80, 80);
  box-shadow: 1px 1px black, inset 2px 2px white;
  margin-right: 5px;
  margin-top: 10px;
  font-family: 'DungGeunMo';
  font-size: x-large;
}

#join-buttom {
  background-image: radial-gradient(#D7D7D7 0%, #F3F3F3 47.92%, #E6E6E6 100%, #DBDBDB 100%);
  width: 160px;
  height: 40px;
  display: inline-block;
  border: 1px solid rgb(80, 80, 80);
  margin-top: 10px;
  box-shadow: 1px 1px black, inset 2px 2px white;
  font-family: 'DungGeunMo';
  font-size: x-large;
}


</style>