
call = () => {
  // Create an RTCPeerConnection via the polyfill.
  const servers = null;
  this.pc1Local = new RTCPeerConnection(servers);
  this.pc1Remote = new RTCPeerConnection(servers);
  this.pc1Remote.ontrack = this.gotRemoteStream1;
  this.pc1Local.onicecandidate = this.iceCallback1Local;
  this.pc1Remote.onicecandidate = this.iceCallback1Remote;
  console.log("pc1: created local and remote peer connection objects");
  console.log('this.pc',this.pc);
  console.log('window',window);
  this.pc.localStream
    .getTracks()
    .forEach(track => this.pc1Local.addTrack(track, this.pc.localStream));
  console.log("Adding local stream to pc1Local");
  this.pc1Local
    .createOffer()
    .then(this.gotDescription1Local, this.onCreateSessionDescriptionError);
};

gotDescription1Local = desc => {
  this.pc1Local.setLocalDescription(desc);
  console.log(`Offer from pc1Local\n${desc.sdp}`);
  this.pc1Remote.setRemoteDescription(desc);
  // Since the 'remote' side has no media stream we need
  // to pass in the right constraints in order for it to
  // accept the incoming offer of audio and video.
  this.pc1Remote
    .createAnswer()
    .then(this.gotDescription1Remote, this.onCreateSessionDescriptionError);
};

gotDescription1Remote = desc => {
  this.pc1Remote.setLocalDescription(desc);
  console.log(`Answer from pc1Remote\n${desc.sdp}`);
  this.pc1Local.setRemoteDescription(desc);
};

onCreateSessionDescriptionError = error => {
  console.log(`Failed to create session description: ${error.toString()}`);
};

gotRemoteStream1 = e => {
  console.log("e", e);
  // if (video2.srcObject !== e.streams[0]) {
  //   video2.srcObject = e.streams[0];
  //   console.log('pc1: received remote stream');
  // }
};

iceCallback1Local = event => {
  this.handleCandidate(event.candidate, this.pc1Remote, "pc1: ", "local");
};

iceCallback1Remote = event => {
  this.handleCandidate(event.candidate, this.pc1Local, "pc1: ", "remote");
};

handleCandidate = (candidate, dest, prefix, type) => {
  dest
    .addIceCandidate(candidate)
    .then(this.onAddIceCandidateSuccess, this.onAddIceCandidateError);
  console.log(
    `${prefix}New ${type} ICE candidate: ${
      candidate ? candidate.candidate : "(null)"
      }`,
  );
};

onAddIceCandidateSuccess = () => {
  console.log("AddIceCandidate success.");
};

onAddIceCandidateError = error => {
  console.log(`Failed to add ICE candidate: ${error.toString()}`);
};