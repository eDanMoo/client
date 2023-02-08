<template>
  User
  <input id="userName" type="text" />
  Room
  <input id="roomId" type="text" />
  <button id="start" @click="join">Connect</button><br />
  <button id="muteVideo">Mute Video</button>
  <button id="muteAudio">Mute Audio</button>
  <button id="share" @click="share">Share</button>

  <div id="container" class="video-position">
    <video id="localVideo" autoplay="autoplay" muted="true"></video>
    <!-- <video id="remoteVideo" autoplay playsinline></video> -->
  </div>
</template>
<style>
.containers {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, 1fr);
  grid-template-rows: repeat(auto-fit, 300px);
}

.container {
  display: flex;
}

.vid {
  flex: 0 1 auto;
  height: 400px;
}

.settings {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 2px 2px;
  cursor: pointer;
}
</style>
<script>
import io from "socket.io-client";

const constraints = {
	audio: {echoCancellation: true, noiseSuppression: true, autoGainControl: false}, 
	video: {width:{max: "350"}, frameRate:{max:"2"} }
	}
const maxBitrate = 1
//const maxBitrate2 = 35

let localVideo, remoteVideo;
let localStream, localScreen;
let userName, roomId, peer;
let clients = new Map();
let streamIds = new Set();

const peerConfig = {
	iceServers: [
		{
			urls: "stun:stun.l.google.com:19302",
		  },
		  {
			  urls: 'stun:stun1.l.google.com:19302'
		  },
		  {urls: "stun:stun2.l.google.com:19302"},
		  {urls: "stun:stun3.l.google.com:19302"},
		  {urls: "stun:stun4.l.google.com:19302"},
		  {urls: "stun:stun01.sipphone.com"},
		  {urls: "stun:stun.ekiga.net"},
		  {urls: "stun:stun.fwdnet.net"},
		  {urls: "stun:stun.ideasip.com"},
		  {urls: "stun:stun.iptel.org"},
		  {urls: "stun:stun.rixtelecom.se"},
		  {urls: "stun:stun.schlund.de"},
		  {urls: "stun:stunserver.org"},
		  {urls: "stun:stun.softjoys.com"},
		  {urls: "stun:stun.voiparound.com"},
		  {urls: "stun:stun.voipbuster.com"},
		  {urls: "stun:stun.voipstunt.com"},
		  {urls: "stun:stun.voxgratia.org"},
		  {urls: "stun:stun.xten.com"},
		  {urls: ['turn:13.124.234.88:3478?transport=tcp'], 'username':'id', 'credential':'pw'},
	]
};

export default {
  name: "qq",
  data() {
    return {
      nameScene: true,
      username: null,
      socket: {},
      maxPlayers: 2,
      modalMess: [],
      totalPlayers: 0,
    };
  },
  async created() {

    this.socket = io("https://localhost:3000/api", {port:3000}); //production
    const tt = this.socket;
    
    console.log(this.socket);

    localVideo = document.getElementById('localVideo');
	  remoteVideo = document.getElementById('remoteVideo');

    this.socket.on('webrtc_offer', async (msg) => {				// Acting as remote responser
      console.log("도착했나요?");
	const offer = new RTCSessionDescription(msg.offer);	
	peer.setRemoteDescription(offer);

	const answer = await peer.createAnswer();
	//answer.sdp = updateBandwidthRestriction(answer.sdp, 'video', maxBitrate2)
	await peer.setLocalDescription(answer);
	this.socket.emit('webrtc_answer', {
		answer: answer,
	});
})


this.socket.on('join_answer', async (res) => {	
		console.log(`Socket event callback: join_answer. msg: ${res.joined} - ${res.clients}`);
		if(res.joined) {
			console.log(`This peer has been joined to the room: ${res.roomId}. SocketId: ${this.socket.id}`)
      console.log("newPeer 호출합니다");
			peer = await newPeer(this.socket.id)
			console.log(localStream.id)
      console.log(localVideo);	
      localVideo = document.getElementById('localVideo');
			localVideo.srcObject = localStream;
			localVideo.style.width = 'auto';
			//localVideo.style.width = '100%';
		}	
		else {
			alert(`Room is full`)
		}
})

this.socket.on('webrtc_answer', (msg) => {					// Acting as offerer initiator
  console.log("서버에서 webrtc_answer 받았습니다.");
	const sdp = new RTCSessionDescription(msg.answer)
	peer.setRemoteDescription(sdp)
})
this.socket.on('webrtc_icecandidate', async (msg) => {	
	const candidate = (msg.candidate) ? new RTCIceCandidate(msg.candidate) : msg.candidate;
	await peer.addIceCandidate(candidate);
})
this.socket.on('webrtc_disconnection', (msg) => {
	msg.forEach(streamId => {
		document.getElementById(streamId).remove();
	})
})
this.socket.on('removeStream', (msg) => {
	msg.forEach(streamId => {
		document.getElementById(streamId).remove();
	})
})


async function newPeer(socketId) {
  console.log(tt);
  console.log("newPeer 들어왔습니다.");
	const peer = new RTCPeerConnection(peerConfig);
  console.log(peer);
	// Needed to send a correct offer
	
  console.log("getUserMedia 불러옵니다.");
	localStream = await navigator.mediaDevices.getUserMedia(constraints);  	
  console.log("getUserMedia 에서 localStream으로 넘겨줬습니다." + localStream);
	//localStream.getTracks().forEach(track => peer.addTrack(track, localStream));	// (addTrack() looks for unused transceivers to usurp) https://blog.mozilla.org/webrtc/rtcrtptransceiver-explored/
	localStream.getTracks().forEach(track => {
		const transceiver = peer.addTransceiver( track, {direction:'sendonly', streams:[localStream]})	// Same as previous line without usurpation
    console.log(transceiver);
	})

	peer.addEventListener('negotiationneeded', async (e) => {
		console.log('Negotiation Needed')
		const offer = await peer.createOffer();		// Acting as offerer initiator
		//offer.sdp = updateBandwidthRestriction(offer.sdp, 'video', maxBitrate2)
		await peer.setLocalDescription(offer);
		tt.emit('webrtc_offer', {
			offer: offer,
		})
	})
	peer.addEventListener('icecandidate', (e) => {})		// Never used because remote peer should be always at public ip (remote peer is the one that announces candidates)
	peer.addEventListener('connectionstatechange', async (e) => {
    console.log("is connectionstatechange");
		if (peer.connectionState === 'connected') {					
			peer.getSenders().forEach( sender => {				
				if (sender.track && sender.track.kind === 'video') {
					console.log('recoding with maxbitrate: '+maxBitrate)
					let params = sender.getParameters();
					params.encodings.forEach(encoding => {
						encoding.maxBitrate = maxBitrate;
					})
					sender.setParameters(params);
				}
			})    	
		}
		else if(peer.connectionState === 'failed') {
			console.log(`peer.connectionState='failed'. It should never reach here`)
		}
	})	
	peer.addEventListener('track', ({transceiver, receiver, streams: [stream], track}) => {
		console.log('Received a track !!!!. Stream: '+stream.id)	
		if(!streamIds.has(stream.id)) {
      console.log("들어왔나요?");
      console.log(stream);
			const newVideo = document.createElement('video');
			newVideo.id = stream.id
			newVideo.autoplay = true;
      newVideo.muted = true;
			newVideo.srcObject = stream
			const container = document.getElementById('container');
			container.appendChild(newVideo);
			streamIds.add(stream.id)
		}	
	})
	return peer
}


// FUNCTIONS NOT NEEDED =========================================================

function updateBandwidthRestriction(sdp, media, bitrate) {
  var lines = sdp.split("\n");
  var line = -1;
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].indexOf("m="+media) === 0) {
      line = i;
      break;
    }
  }
  if (line === -1) {
    console.debug("Could not find the m line for", media);
    return sdp;
  }
  console.debug("Found the m line for", media, "at line", line);
 
  // Pass the m line
  line++;
 
  // Skip i and c lines
  while(lines[line].indexOf("i=") === 0 || lines[line].indexOf("c=") === 0) {
    line++;
  }
 
  // If we're on a b line, replace it
  if (lines[line].indexOf("b") === 0) {
    console.debug("Replaced b line at line", line);
    lines[line] = "b=AS:"+bitrate;
    return lines.join("\n");
  }
  
  // Add a new b line
  console.debug("Adding new b line before line", line);
  var newLines = lines.slice(0, line)
  newLines.push("b=AS:"+bitrate)
  newLines = newLines.concat(lines.slice(line, lines.length))
  return newLines.join("\n")
}

function updateBandwidthRestriction2(sdp, media, bandwidth) {
  let modifier = 'AS';
  /*
  if (adapter.browserDetails.browser === 'firefox') {
    bandwidth = (bandwidth >>> 0) * 1000;
    modifier = 'TIAS';
  }
  */
  
  if (sdp.indexOf('b=' + modifier + ':') === -1) {
    // insert b= after c= line.
    sdp = sdp.replace(/c=IN (.*)\r\n/, 'c=IN $1\r\nb=' + modifier + ':' + bandwidth + '\r\n');
  } else {
    sdp = sdp.replace(new RegExp('b=' + modifier + ':.*\r\n'), 'b=' + modifier + ':' + bandwidth + '\r\n');
  }
  return sdp;
}

function removeBandwidthRestriction(sdp) {
  return sdp.replace(/b=AS:.*\r\n/, '').replace(/b=TIAS:.*\r\n/, '');
}


    
    // this.socket = io("localhost:5000"); //develop
    //totalplayer online
    //this.socket.on("totalPlayers", data => (this.totalPlayers = data));
    //is server send message
    //this.socket.on("message", data => this.modalMess.push(data));
    //go back
  },
  methods: {
    closeModal: function () {
      this.modalMess = [];
    },
    joinRoom: function () {
      if (this.username && this.username.length > 9) {
        this.modalMess.push("Xin lỗi, tên bạn quá dài");
        return;
      }
      this.socket.emit("joinGame", {
        username: this.username || "MeowMeow",
        img: "https://i.pravatar.cc/150?u=" + this.username,
        maxPlayers: this.maxPlayers,
      });
      this.nameScene = false;
    },
    join () {
      userName = document.getElementById("userName").value;
      roomId = document.getElementById("roomId").value;
      console.log(this.socket);
      this.socket.emit("join", userName, roomId);
    },

    muteAudio(){
      if(localStream){
        localStream.getAudioTracks()[0].enabled ^= true
      }
		  document.getElementById('muteAudio').innerHTML = (localStream.getAudioTracks()[0].enabled) ? 'Mute Audio' : 'Unmute Audio'
    },
    muteVideo(){
      if(localStream){
        localStream.getVideoTracks()[0].enabled ^= true
      }
    },
    async share(){
      localScreen = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true})
		  console.log(localScreen.id)
		  localScreen.getTracks().forEach(track => peer.addTransceiver( track, {direction:'sendonly', streams:[localScreen]}))
      //localScreen.getAudioTracks().forEach(track => peer.addTrack(track, localScreen))
		  //localScreen.getVideoTracks().forEach(track => peer.addTrack(track, localScreen))
		  localScreen.getVideoTracks()[0].addEventListener('ended', () => {					
			  localScreen.getTracks().forEach(track => track.enabled = false)
			  console.log('ended')
			  socket.emit('endScreen', localScreen.id)		
		  })
    },
  },
  computed: {
    getStyle: function () {
      if (this.modalMess.length > 0)
        return { filter: "blur(5px)", "pointer-events": "none" };
      return {};
    },
  },
};



</script>
