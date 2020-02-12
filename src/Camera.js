import React, { Component } from "react";
import firebase from "firebase";
import ButtonLarge from "./components/Utils/ButtonLarge";
import { heightHeader } from "./components/Utils/StyleConstants";
import { colors } from "./components/Utils/Constants";
import { connect } from "react-redux";

const styledVideoContainer = {
  width: (window.innerWidth - 300) / 7 - 7,
  height: heightHeader,
  float: "left",
  position: "relative",
  marginLeft: 7,
};
const styledVideo = {
  width: (window.innerWidth - 300) / 7 - 12,
  height: heightHeader,
  float: "left",
  position: "relative",
};

const styledCall = {
  position: "absolute",
  left: 6,
  top: 15,
  width: (window.innerWidth - 300) / 7 - 12,
};

const styledMuteImg = {
  position: "absolute",
  float: "left",
  width: 41,
  height: 22,
  zIndex: 10,
  left: 0,
  bottom: 0,
  color: colors.text,
};

const styledCloseRoomImg = {
  position: "absolute",
  float: "left",
  width: 41,
  height: 22,
  zIndex: 10,
  left: 0,
  bottom: 22,
  color: colors.text,
};

const styledRoomImg = {
  position: "absolute",
  float: "left",
  width: 41,
  height: 22,
  zIndex: 10,
  left: 0,
  bottom: 22,
  color: colors.text,
};

const styledCameraCadre = {
  height: heightHeader,
  width: (window.innerWidth - 300) / 7,
  position: "relative",
  float: "left",
};

const styledCadresContainer = {
  position: "absolute",
  left: 0,
  top: 0,
  height: heightHeader,
  width: window.innerWidth,
};

class Camera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friendsVideoRemote: {},
      isDisabled: false,
      friendsMute: {},
      room: [],
    };
    this.database = firebase.database().ref("camera");
    this.yourId = props.uid;
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
    this.localStream = null;
  }

  componentDidMount() {
    firebase
      .database()
      .ref("camera/room")
      .on("value", snapshot => {
        this.setState(state => ({
          ...state,
          room: snapshot.val() || [],
        }));
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  componentWillUnmount() {
    this.closeLocalstream();
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
    this.setState(state => ({
      ...state,
      isDisabled: true,
    }));

    firebase
      .database()
      .ref("camera/" + this.yourId + "/isConnected")
      .set(true);

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(stream => (this.yourVideo.srcObject = stream))
      .then(stream => {
        window.localStream = stream;
        this.localStream = stream;

        firebase
          .database()
          .ref("/camera")
          .once("value")
          .then(snapshot => {
            Object.keys(snapshot.val()).map(key => {
              if (key !== this.yourId) {
                this.friendsVideoLocal[key] = new RTCPeerConnection(
                  this.servers,
                );

                // Adding ice candidates
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
              return null;
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

      // @TODO check that
      this.friendsVideoRemote[index].onconnectionstatechange = state => {
        console.log("state on change", state);
      };

      const tempRemoteVideos = { ...this.state.friendsVideoRemote };

      tempRemoteVideos[index] = e.streams[0];
      this.setState(state => ({
        ...state,
        friendsVideoRemote: { ...tempRemoteVideos },
        // friendsVideoRemoteVolume: {
        //   ...state.friendsVideoRemoteVolume,
        //   [index]: 1,
        // },
      }));
    }
  };

  muteSomeone = key => () => {
    const newFriendsMute = { ...this.state.friendsMute };
    newFriendsMute[key] = !newFriendsMute[key];
    this.setState(state => ({
      ...state,
      friendsMute: newFriendsMute,
    }));
  };

  closeLocalstream = () => {
    if (window.localStream) {
      window.localStream.getTracks().forEach(track => {
        track.stop();
      });
      this.setState(
        state => ({
          ...state,
          isDisabled: false,
        }),
        () => {
          firebase
            .database()
            .ref("camera/" + this.yourId + "/isConnected")
            .set(false);
        },
      );
    }
  };

  createPrivateRoom = key => () => {
    const { room } = this.state;
    if (room.length > 0) {
      const newRoom = [...room, key];
      firebase
        .database()
        .ref("camera/room")
        .set(newRoom);
    } else {
      firebase
        .database()
        .ref("camera/room")
        .set([this.yourId, key]);
    }
  };

  closePrivateRoom = () => {
    firebase
      .database()
      .ref("camera/room")
      .set([]);
  };

  render() {
    const { isDisabled, friendsMute, friendsVideoRemote, room } = this.state;
    const { isGameMaster } = this.props;

    return (
      <div>
        <div style={styledCadresContainer}>
          <img
            src={"./common/info2.png"}
            alt="cadre"
            style={styledCameraCadre}
          />
          <img
            src={"./common/info2.png"}
            alt="cadre"
            style={styledCameraCadre}
          />
          <img
            src={"./common/info2.png"}
            alt="cadre"
            style={styledCameraCadre}
          />
          <img
            src={"./common/info2.png"}
            alt="cadre"
            style={styledCameraCadre}
          />
          <img
            src={"./common/info2.png"}
            alt="cadre"
            style={styledCameraCadre}
          />
          <img
            src={"./common/info2.png"}
            alt="cadre"
            style={styledCameraCadre}
          />
          <img
            src={"./common/info2.png"}
            alt="cadre"
            style={styledCameraCadre}
          />
        </div>
        <div style={styledVideoContainer}>
          <video
            ref={audio => {
              this.yourVideo = audio;
            }}
            style={styledVideo}
            autoPlay
            muted
          />
          {isGameMaster && room.length > 0 && (
            <ButtonLarge
              onClick={this.closePrivateRoom}
              style={styledCloseRoomImg}
            >
              R
            </ButtonLarge>
          )}
          {isDisabled && (
            <ButtonLarge onClick={this.closeLocalstream} style={styledMuteImg}>
              X
            </ButtonLarge>
          )}
        </div>
        {Object.keys(friendsVideoRemote).map(key => {
          return (
            <div style={styledVideoContainer}>
              <video
                autoPlay
                style={styledVideo}
                muted={
                  friendsMute[key] ||
                  (room.length > 0 &&
                    room.indexOf(key) > -1 &&
                    room.indexOf(this.yourId) === -1)
                }
                controls
                ref={vid => {
                  if (vid) {
                    vid.srcObject = friendsVideoRemote[key];
                  }
                }}
              />

              <img
                onClick={this.muteSomeone(key)}
                src={
                  friendsMute[key]
                    ? "./common/soundMuted.png"
                    : "./common/soundUnmuted.png"
                }
                style={styledMuteImg}
                alt="sound muted or not"
              />
              {isGameMaster && (
                <img
                  onClick={this.createPrivateRoom(key)}
                  src={
                    room.indexOf([key]) > -1
                      ? "./common/soundUnmuted.png"
                      : "./common/soundMuted.png"
                  }
                  style={styledRoomImg}
                  alt="sound muted or not"
                />
              )}
            </div>
          );
        })}
        {!isDisabled && (
          <ButtonLarge onClick={this.showMyFace} style={styledCall}>
            Call
          </ButtonLarge>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isGameMaster: store.appState.isGameMaster,
  uid: store.userInfos.uid,
});

export default connect(mapStateToProps)(Camera);
