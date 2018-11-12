import React, { Component } from 'react';
import firebase from 'firebase';

class Camera extends Component {
  constructor(props) {
    super(props);

    this.database = firebase.database().ref('camera');
    this.yourId = 975286682;
    console.log('this.yourId', this.yourId);
    this.servers = {
      iceServers: [
        { urls: 'stun:stun.services.mozilla.com' },
        { urls: 'stun:stun.l.google.com:19302' },
        {
          urls: 'turn:numb.viagenie.ca',
          credential: 'webrtc',
          username: 'test@mail.com',
        },
      ],
    };

    this.pc = new RTCPeerConnection(this.servers);
    // this.pc.onicecandidate = event =>
    //   event.candidate
    //     ? this.sendMessage(
    //         this.yourId,
    //         JSON.stringify({ ice: event.candidate }),
    //         "icecandidate",
    //       )
    //     : console.log("Sent All Ice");
    this.pc.onaddstream = event => {
      console.log('event', event);
      // this.friendsVideo.srcObject = event.stream;
    };
    this.friendsVideo = [];
    this.yourVideo = null;
  }

  componentDidMount() {
    this.showMyFace();
  }

  sendMessage = (data, type, id = this.yourId) => {
    firebase
      .database()
      .ref('camera/' + id)
      .push({ message: data, type, sender: this.yourId });
  };

  readMessage = data => {
    var msg = JSON.parse(data.val().message);
    var sender = data.val().sender;
    if (sender != this.yourId) {
      if (msg.ice != undefined) {
        console.log('msg ice', msg);
        this.pc.addIceCandidate(new RTCIceCandidate(msg.ice));
      } else if (msg.sdp.type == 'offer') {
        console.log('msg offer', msg);
        this.pc
          .setRemoteDescription(new RTCSessionDescription(msg.sdp))
          .then(() => this.pc.createAnswer())
          .then(answer => this.pc.setLocalDescription(answer))
          .then(() =>
            this.sendMessage(
              this.yourId,
              JSON.stringify({ sdp: this.pc.localDescription })
            )
          );
      } else if (msg.sdp.type == 'answer') {
        console.log('msg answer', msg);
        this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
      }
    }
  };

  showMyFace = () => {
    firebase
      .database()
      .ref('camera/' + this.yourId + '/isConnected')
      .set(true);

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(stream => (this.yourVideo.srcObject = stream))
      .then(stream => {
        this.pc.addStream(stream);

        firebase
          .database()
          .ref('/camera')
          .once('value')
          .then(snapshot => {
            this.pc
              .createOffer()
              .then(offer => this.pc.setLocalDescription(offer))
              .then(() => {
                Object.keys(snapshot.val()).map(key => {
                  if (parseInt(key) !== this.yourId) {
                    this.sendMessage(
                      JSON.stringify({ sdp: this.pc.localDescription }),
                      'offer',
                      key
                    );
                  }
                });
              });
          })
          .catch(error => {
            console.log('error', error);
          });

        firebase
          .database()
          .ref('camera/' + this.yourId)
          .on('value', snapshot => {
            Object.keys(snapshot.val()).map(key => {
              if (snapshot.val()[key].type === 'offer') {
                const msg = JSON.parse(snapshot.val()[key].message);
                const test = [...this.friendsVideo];
                test.push(new RTCPeerConnection(this.servers));
                test[test.length - 1]
                  .setRemoteDescription(new RTCSessionDescription(msg.sdp))
                  .then(() => test[test.length - 1].createAnswer())
                  .then(answer =>
                    test[test.length - 1].setLocalDescription(answer)
                  )
                  .then(() => {
                    this.sendMessage(
                      JSON.stringify({
                        sdp: test[test.length - 1].localDescription,
                      }),
                      'answer',
                      snapshot.val()[key].sender
                    );
                    this.friendsVideo = [...test];
                  });
              }
            });
          });
      });
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
        <video
          ref={audio => {
            this.friendsVideo = audio;
          }}
          autoPlay
          muted
        />

        <button onClick={this.showFriendsFace}>Call</button>
      </div>
    );
  }
}

export default Camera;
