import React, { Component } from "react";
import firebase from "firebase";

class Camera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friendsVideoRemote: {},
    };
    this.database = firebase.database().ref("camera");
    this.yourId = 975286681;
    this.servers = {
      iceServers: [
        { urls: "stun:stun.services.mozilla.com" },
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "webrtc",
          username: "test@mail.com",
        },
      ],
    };

    this.pc = new RTCPeerConnection(this.servers);
    this.friendsVideoLocal = {};
    this.friendsVideoRemote = {};
    this.yourVideo = null;
  }

  componentDidMount() {
    this.showMyFace();
  }

  sendMessage = (data, type, id = this.yourId) => {
    const msg = firebase
      .database()
      .ref("camera/" + id)
      .push({ message: data, type, sender: this.yourId });
    msg.remove();
  };

  sendIce = (data, id, isRemote = false) => {
    const msg = firebase
      .database()
      .ref("camera/" + id)
      .push({
        type: "ice",
        isRemote,
        message: JSON.stringify(data),
        sender: this.yourId,
      });
    msg.remove();
  };

  showMyFace = () => {
    firebase
      .database()
      .ref("camera/" + this.yourId + "/isConnected")
      .set(true);

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(stream => (this.yourVideo.srcObject = stream))
      .then(stream => {
        window.localStream = stream;

        firebase
          .database()
          .ref("/camera")
          .once("value")
          .then(snapshot => {
            Object.keys(snapshot.val()).map(key => {
              if (parseInt(key) !== this.yourId) {
                this.friendsVideoLocal[key] = new RTCPeerConnection(
                  this.servers,
                );

                //Adding ice candidates
                this.friendsVideoLocal[key].onicecandidate = e => {
                  e.candidate
                    ? this.sendIce(e.candidate, key)
                    : console.log("Sent all ice, local, offer, " + key);
                };

                window.localStream
                  .getTracks()
                  .forEach(track =>
                    this.friendsVideoLocal[key].addTrack(
                      track,
                      window.localStream,
                    ),
                  );
                this.friendsVideoLocal[key]
                  .createOffer({
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1,
                  })
                  .then(offer =>
                    this.setDescriptionsFromOffer(offer, key, "askingOffer"),
                  );
              }
            });
          })
          .catch(error => {
            console.log("error", error);
          });

        firebase
          .database()
          .ref("camera/" + this.yourId)
          .on("child_added", snapshot => {
            if (snapshot.val().type === "askingOffer") {
              const msg = JSON.parse(snapshot.val().message);
              this.friendsVideoRemote[
                snapshot.val().sender
              ] = new RTCPeerConnection(this.servers);

              //Adding ice candidates
              this.friendsVideoRemote[
                snapshot.val().sender
              ].onicecandidate = e => {
                e.candidate
                  ? this.sendIce(e.candidate, snapshot.val().sender, true)
                  : console.log(
                      "Sent all ice, remote, answer, " + snapshot.val().sender,
                    );
              };

              this.friendsVideoRemote[snapshot.val().sender].ontrack = e =>
                this.setUpRemoteStream(e, snapshot.val().sender);

              //Providing answer
              this.friendsVideoRemote[snapshot.val().sender]
                .setRemoteDescription(new RTCSessionDescription(msg.sdp))
                .then(() =>
                  this.friendsVideoRemote[snapshot.val().sender].createAnswer(),
                )
                .then(answer =>
                  this.setDescriptionsFromAnswer(answer, snapshot.val().sender),
                );
              this.friendsVideoLocal[
                snapshot.val().sender
              ] = new RTCPeerConnection(this.servers);

              //Adding ice candidates
              this.friendsVideoLocal[
                snapshot.val().sender
              ].onicecandidate = e => {
                e.candidate
                  ? this.sendIce(e.candidate, snapshot.val().sender)
                  : console.log(
                      "Sent all ice, local, offer, " + snapshot.val().sender,
                    );
              };

              window.localStream
                .getTracks()
                .forEach(track =>
                  this.friendsVideoLocal[snapshot.val().sender].addTrack(
                    track,
                    window.localStream,
                  ),
                );
              this.friendsVideoLocal[snapshot.val().sender]
                .createOffer({
                  offerToReceiveAudio: 1,
                  offerToReceiveVideo: 1,
                })
                .then(offer =>
                  this.setDescriptionsFromOffer(
                    offer,
                    snapshot.val().sender,
                    "offer",
                  ),
                );
            }
            if (snapshot.val().type === "offer") {
              const msg = JSON.parse(snapshot.val().message);
              this.friendsVideoRemote[
                snapshot.val().sender
              ] = new RTCPeerConnection(this.servers);

              //Adding ice candidates
              this.friendsVideoRemote[
                snapshot.val().sender
              ].onicecandidate = e => {
                e.candidate
                  ? this.sendIce(e.candidate, snapshot.val().sender, true)
                  : console.log(
                      "Sent all ice, remote, answer, " + snapshot.val().sender,
                    );
              };

              this.friendsVideoRemote[snapshot.val().sender].ontrack = e =>
                this.setUpRemoteStream(e, snapshot.val().sender);

              //Providing answer
              this.friendsVideoRemote[snapshot.val().sender]
                .setRemoteDescription(new RTCSessionDescription(msg.sdp))
                .then(() =>
                  this.friendsVideoRemote[snapshot.val().sender].createAnswer(),
                )
                .then(answer =>
                  this.setDescriptionsFromAnswer(answer, snapshot.val().sender),
                );
            }
            if (snapshot.val().type === "answer") {
              const msg = JSON.parse(snapshot.val().message);
              this.friendsVideoLocal[
                snapshot.val().sender
              ].setRemoteDescription(new RTCSessionDescription(msg.sdp));
            }
            if (snapshot.val().type === "ice") {
              const msg = JSON.parse(snapshot.val().message);
              if (snapshot.val().isRemote) {
                this.friendsVideoLocal[snapshot.val().sender]
                  .addIceCandidate(new RTCIceCandidate(msg))
                  .then(() => {
                    console.log(
                      "Added local ice candidates for sender " +
                        snapshot.val().sender,
                    );
                  });
              } else {
                this.friendsVideoRemote[snapshot.val().sender]
                  .addIceCandidate(new RTCIceCandidate(msg))
                  .then(() => {
                    console.log(
                      "Added remote ice candidates for sender " +
                        snapshot.val().sender,
                    );
                  });
              }
            }
          });
      });
  };

  setDescriptionsFromOffer = (offer, sender, type) => {
    this.friendsVideoLocal[sender].setLocalDescription(offer).then(() => {
      this.sendMessage(
        JSON.stringify({
          sdp: this.friendsVideoLocal[sender].localDescription,
        }),
        type,
        sender,
      );
    });
  };

  setDescriptionsFromAnswer = (answer, sender) => {
    this.friendsVideoRemote[sender].setLocalDescription(answer).then(() => {
      this.sendMessage(
        JSON.stringify({
          sdp: this.friendsVideoRemote[sender].localDescription,
        }),
        "answer",
        sender,
      );
    });
  };

  setUpRemoteStream = (e, index) => {
    if (this.friendsVideoRemote[index].srcObject !== e.streams[0]) {
      this.friendsVideoRemote[index].srcObject = e.streams[0];

      const tempRemoteVideos = { ...this.state.friendsVideoRemote };
      tempRemoteVideos[index] = window.URL.createObjectURL(e.streams[0]);
      this.setState(state => ({
        ...state,
        friendsVideoRemote: { ...tempRemoteVideos },
      }));
    }
  };

  showFriendsFace = () => {
    // this.pc
    //   .createOffer()
    //   .then(offer => this.pc.setLocalDescription(offer))
    //   .then(() =>
    //     this.sendMessage(
    //       this.yourId,
    //       JSON.stringify({ sdp: this.pc.localDescription }),
    //     ),
    //   );
  };

  render() {
    return (
      <div>
        <video
          ref={audio => {
            this.yourVideo = audio;
          }}
          autoPlay
          muted
        />
        {Object.keys(this.state.friendsVideoRemote).map(key => {
          return (
            <video src={this.state.friendsVideoRemote[key]} autoPlay muted />
          );
        })}
        <button onClick={this.showFriendsFace}>Call</button>
      </div>
    );
  }
}

export default Camera;
