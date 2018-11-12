import React, { Component } from "react";
import firebase from "firebase";

class Camera extends Component {
  constructor(props) {
    super(props);

    this.database = firebase.database().ref("camera");
    this.yourId = 975286681;
    console.log("this.yourId", this.yourId);
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
    this.friendsIndex = {};
    this.friendsVideoLocal = [];
    this.friendsVideoRemote = [];
    this.yourVideo = null;
  }

  componentDidMount() {
    this.showMyFace();
  }

  sendMessage = (data, type, id = this.yourId) => {
    firebase
      .database()
      .ref("camera/" + id)
      .push({ message: data, type, sender: this.yourId });
  };

  sendIce = (data, id, isRemote = false) => {
    firebase
      .database()
      .ref("camera/" + id)
      .push({
        type: "ice",
        isRemote,
        message: data,
        sender: this.yourId,
      });
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
                const localFriend = [...this.friendsVideoLocal];
                localFriend.push(new RTCPeerConnection(this.servers));
                const localIndex = localFriend.length - 1;
                this.friendsIndex[key] = localIndex;

                //Adding ice candidates
                localFriend[localIndex].onicecandidate = e => {
                  e.candidate
                    ? this.sendIce(e.candidate, key)
                    : console.log("Sent all ice, local, offer, " + key);
                };

                const remoteFriend = [...this.friendsVideoRemote];
                remoteFriend.push(new RTCPeerConnection(this.servers));
                const remoteIndex = remoteFriend.length - 1;

                //Adding ice candidates
                remoteFriend[remoteIndex].onicecandidate = e => {
                  console.log("e", e.candidate);
                  e.candidate
                    ? this.sendIce(e.candidate, key, true)
                    : console.log("Sent all ice, remote, offer, " + key);
                };

                remoteFriend[remoteIndex].ontrack = e =>
                  this.setUpRemoteStream(e, remoteIndex, true);

                window.localStream
                  .getTracks()
                  .forEach(track =>
                    localFriend[localIndex].addTrack(track, window.localStream),
                  );
                localFriend[localIndex]
                  .createOffer({
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1,
                  })
                  .then(offer => {
                    localFriend[localIndex].setLocalDescription(offer);
                    remoteFriend[remoteIndex].setRemoteDescription(offer);
                  })
                  .then(() => {
                    this.sendMessage(
                      JSON.stringify({
                        sdp: localFriend[localIndex].localDescription,
                      }),
                      "offer",
                      key,
                    );
                    this.friendsVideoLocal = [...localFriend];
                    this.friendsVideoRemote = [...remoteFriend];
                  });
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
            if (snapshot.val().type === "offer") {
              const msg = JSON.parse(snapshot.val().message);
              const remoteFriend = [...this.friendsVideoRemote];
              remoteFriend.push(new RTCPeerConnection(this.servers));
              const remoteIndex = remoteFriend.length - 1;
              this.friendsIndex[snapshot.val().sender] = remoteIndex;
              //Adding ice candidates
              remoteFriend[remoteIndex].onicecandidate = e => {
                e.candidate
                  ? this.sendIce(e.candidate, snapshot.val().sender, true)
                  : console.log(
                      "Sent all ice, remote, answer, " + snapshot.val().sender,
                    );
              };

              remoteFriend[remoteIndex].ontrack = e =>
                this.setUpRemoteStream(e, remoteIndex, true);

              const localFriend = [...this.friendsVideoLocal];
              localFriend.push(new RTCPeerConnection(this.servers));
              const localIndex = localFriend.length - 1;

              //Adding ice candidates
              localFriend[localIndex].onicecandidate = e => {
                e.candidate
                  ? this.sendIce(e.candidate, snapshot.val().sender)
                  : console.log(
                      "Sent all ice, local, answer, " + snapshot.val().sender,
                    );
              };

              //Providing answer
              remoteFriend[remoteIndex]
                .setRemoteDescription(new RTCSessionDescription(msg.sdp))
                .then(() => remoteFriend[remoteIndex].createAnswer())
                .then(answer => {
                  remoteFriend[remoteIndex].setLocalDescription(answer);
                  localFriend[localIndex].setRemoteDescription(answer);
                })
                .then(() => {
                  this.sendMessage(
                    JSON.stringify({
                      sdp: remoteFriend[remoteIndex].localDescription,
                    }),
                    "answer",
                    snapshot.val().sender,
                  );
                  this.friendsVideoRemote = [...remoteFriend];
                });
            }
            if (snapshot.val().type === "answer") {
              const msg = JSON.parse(snapshot.val().message);

              console.log(
                "this.friendsVideoRemote",
                this.friendsVideoRemote,
                snapshot.val().sender,
                this.friendsIndex[snapshot.val().sender],
                this.friendsIndex,
              );
              this.friendsVideoRemote[
                this.friendsIndex[snapshot.val().sender]
              ].setLocalDescription(new RTCSessionDescription(msg.sdp));
              this.friendsVideoLocal[
                this.friendsIndex[snapshot.val().sender]
              ].setRemoteDescription(new RTCSessionDescription(msg.sdp));
            }
            if (snapshot.val().type === "ice") {
              const msg = JSON.parse(snapshot.val().message);
              if (snapshot.val().isRemote) {
                this.friendsVideoRemote[
                  this.friendsIndex[snapshot.val().sender]
                ]
                  .addIceCandidate(new RTCIceCandidate(msg.message))
                  .then(() => {
                    console.log(
                      "Added remote ice candidates for sender " +
                        snapshot.val().sender,
                    );
                  });
              } else {
                this.friendsVideoLocal[this.friendsIndex[snapshot.val().sender]]
                  .addIceCandidate(new RTCIceCandidate(msg.message))
                  .then(() => {
                    console.log(
                      "Added local ice candidates for sender " +
                        snapshot.val().sender,
                    );
                  });
              }
            }
          });
      });
  };

  setUpRemoteStream = (e, index, isRemote = false) => {
    if (isRemote) {
      if (this.friendsVideoRemote[index].srcObject !== e.streams[0]) {
        this.friendsVideoRemote[index].srcObject = e.streams[0];
        console.log(index + ": received remote stream");
      }
    } else {
      if (this.friendsVideoLocal[index].srcObject !== e.streams[0]) {
        this.friendsVideoLocal[index].srcObject = e.streams[0];
        console.log(index + ": received local stream");
      }
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
        {this.friendsVideoRemote.map(fv => {
          return (
            <video
              ref={audio => {
                fv = audio;
              }}
              autoPlay
              muted
            />
          );
        })}

        <button onClick={this.showFriendsFace}>Call</button>
      </div>
    );
  }
}

export default Camera;
