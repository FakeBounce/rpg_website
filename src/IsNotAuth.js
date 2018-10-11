import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";

class IsNotAuth extends Component {
    handleKeyPress = event => {
        if (event.key === "Enter") {
            this.signIn();
        }
    };

    signIn = () => {
        const {
            email,
            password,
            triggerError,
            doSetState,
            loadUsers,
            loadStories,
        } = this.props;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                firebase
                    .database()
                    .ref("/users/" + firebase.auth().currentUser.uid)
                    .once("value")
                    .then(snapshot => {
                        doSetState(
                            {
                                ...snapshot.val(),
                                isAuth: true,
                                uid: firebase.auth().currentUser.uid,
                            },
                            () => {
                                loadUsers();
                                loadStories();
                            },
                        );
                    });
            })
            .catch(error => {
                // Handle Errors here.
                triggerError(error);
            });
    };

    signUp = () => {
        const {
            email,
            password,
            doSetState,
            triggerError,
            loadUsers,
            loadStories,
        } = this.props;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase
                    .database()
                    .ref("users/" + firebase.auth().currentUser.uid)
                    .set({
                        photoUrl: firebase.auth().currentUser.photoURL,
                        name: firebase.auth().currentUser.displayName,
                    })
                    .catch(error => {
                        triggerError(error);
                    });
                doSetState({
                    isAuth: true,
                    uid: firebase.auth().currentUser.uid,
                });
                loadUsers();
                loadStories();
            })
            .catch(error => {
                // Handle Errors here.
                triggerError(error);
            });
    };

    render() {
        const { email, password, onChange } = this.props;

        return (
            <div style={{height: "100%"}}>
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    autoComplete={true}
                    value={email}
                    onChange={e => {
                        onChange(e.target.name, e.target.value);
                    }}
                    onKeyPress={this.handleKeyPress}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    autoComplete={true}
                    value={password}
                    onChange={e => {
                        onChange(e.target.name, e.target.value);
                    }}
                    onKeyPress={this.handleKeyPress}
                />
                <button onClick={this.signIn}>Sign In</button>
                <button onClick={this.signUp}>Sign Up</button>

                <div style={{overflowY:'auto', height: '90%'}}><div className="commit"> fakebounce, le 2018-10-11 : Added white arrows to map </div>
                    <div className="commit"> fakebounce, le 2018-10-11 : Fixed some CharacterPanel bugs </div>
                    <div className="commit"> fakebounce, le 2018-10-10 : Added illustrations for items </div>
                    <div className="commit"> FakeBounce, le 2018-10-09 : Fixed map player view. Fixed quest bugs. GM can now switch between GM view and Player view. Did some style to Town gestion </div>
                    <div className="commit"> fakebounce, le 2018-10-09 : Positionned towns. Now GM can add and remove quests/merchants from towns dynamically. Style need to be reviewed </div>
                    <div className="commit"> FakeBounce, le 2018-10-08 : Formatted map, added NoFog tile and arrows to navigate </div>
                    <div className="commit"> fakebounce, le 2018-10-07 : Added zoom on the map </div>
                    <div className="commit"> fakebounce, le 2018-10-07 : Added a map navigator </div>
                    <div className="commit"> fakebounce, le 2018-10-07 : Added scaling on map edition </div>
                    <div className="commit"> fakebounce, le 2018-10-07 : Added towns, quests and tileTypes to firebase. Now loading them from db; Enlarged map and reviewed the way tiles are displayed; Working on Map edition for GM </div>
                    <div className="commit"> fakebounce, le 2018-10-06 : Added transition while changing music + reset music button and display current music </div>
                    <div className="commit"> fakebounce, le 2018-10-06 : Added debounce for adjusting sound volume </div>
                    <div className="commit"> FakeBounce, le 2018-10-04 : Did some css for Gm music panel and cleaned some code </div>
                    <div className="commit"> FakeBounce, le 2018-10-04 : GM can now play musics and noises </div>
                    <div className="commit"> fakebounce, le 2018-10-03 : Game master is now Up ! He can modify a character directly by clicking on a team portrait. Can also add gold. Fixed some number inputs which sends strings and character Tabs if array was empty </div>
                    <div className="commit"> fakebounce, le 2018-10-03 : Moved some values to constants </div>
                    <div className="commit"> fakebounce, le 2018-10-03 : Transformed high value item to unknown if the character has not enough education </div>
                    <div className="commit"> fakebounce, le 2018-10-03 : Added function to modify items in inventory </div>
                    <div className="commit"> FakeBounce, le 2018-10-03 : Corrected life input and changed gold algo on character creation </div>
                    <div className="commit"> fakebounce, le 2018-10-02 : Removed hydratation on start </div>
                    <div className="commit"> fakebounce, le 2018-10-02 : Artefacts are now genereted separately; no more duplicates on artefacts generation for merchants. Reviewed merchant hydration to remove potentially duplicates items. Did some css to add overflow on some critical views </div>
                    <div className="commit"> FakeBounce, le 2018-10-02 : Saved merchants items and corrected quantities when buying </div>
                    <div className="commit"> fakebounce, le 2018-10-01 : Merchants generation for a story </div>
                    <div className="commit"> FakeBounce, le 2018-09-28 : Finalized random merchant items+artefacts and added limitations on rare items </div>
                    <div className="commit"> fakebounce, le 2018-09-28 : Loading random items for merchants </div>
                    <div className="commit"> FakeBounce, le 2018-09-27 : Get datas from spreadsheet and store it in the state </div>
                    <div className="commit"> FakeBounce, le 2018-09-26 : Added aura images </div>
                    <div className="commit"> FakeBounce, le 2018-09-25 : Logged values from Items spreadsheet </div>
                    <div className="commit"> FakeBounce, le 2018-09-25 : Added logs + corrected some errors </div>
                    <div className="commit"> FakeBounce, le 2018-09-25 : Added Items spreadsheet url + key </div>
                    <div className="commit"> fakebounce, le 2018-09-24 : Modified header style and added symbol for music muting </div>
                    <div className="commit"> fakebounce, le 2018-09-24 : Added images and musics </div>
                    <div className="commit"> fakebounce, le 2018-09-24 : Added click on team to chat function + GameMaster character to team </div>
                    <div className="commit"> fakebounce, le 2018-09-24 : Added sound story dependancy and regrouped items by quantity </div>
                    <div className="commit"> fakebounce, le 2018-09-22 : Finalized quests style + Load map and chat after choosing history </div>
                    <div className="commit"> fakebounce, le 2018-09-21 : Quest fullscreen </div>
                    <div className="commit"> fakebounce, le 2018-09-21 : Real quest pannel </div>
                    <div className="commit"> fakebounce, le 2018-09-20 : Added quests </div>
                    <div className="commit"> fakebounce, le 2018-09-20 : Reviewed merchants and item css. Can buy an item. Added music package. </div>
                    <div className="commit"> FakeBounce, le 2018-09-19 : Added character modification </div>
                    <div className="commit"> fakebounce, le 2018-09-18 : Restructured code and corrected all errors from console </div>
                    <div className="commit"> FakeBounce, le 2018-09-18 : Corrected Chat GM, Team display, Gold input and window overflow </div>
                    <div className="commit"> fakebounce, le 2018-09-18 : Finalized Character Panel with story bound. Team tab on progress. </div>
                    <div className="commit"> FakeBounce, le 2018-09-17 : Added stories and corrected some styles issue, code not structured </div>
                    <div className="commit"> fakebounce, le 2018-09-16 : UI images </div>
                    <div className="commit"> fakebounce, le 2018-09-16 : Corrected some rules </div>
                    <div className="commit"> fakebounce, le 2018-09-16 : Character panel for players </div>
                    <div className="commit"> fakebounce, le 2018-09-16 : Added toggle for chat help. Now can return to map panel. </div>
                    <div className="commit"> fakebounce, le 2018-09-16 : Added chat commands </div>
                    <div className="commit"> fakebounce, le 2018-09-15 : Corrected character auto creation </div>
                    <div className="commit"> fakebounce, le 2018-09-15 : Chat and character creation correction </div>
                    <div className="commit"> fakebounce, le 2018-09-15 : Restructured code </div>
                    <div className="commit"> FakeBounce, le 2018-09-14 : Began file restructuration </div>
                    <div className="commit"> FakeBounce, le 2018-09-14 : Added map edition for Admins and chat /dice function </div>
                    <div className="commit"> fakebounce, le 2018-09-14 : Finished character creation form and added chat </div>
                    <div className="commit"> FakeBounce, le 2018-09-13 : Merge pull request #1 from FakeBounce/feature/loadMapFromDb </div>
                    <div className="commit"> FakeBounce, le 2018-09-13 : Added a map loader from DB </div>
                    <div className="commit"> fakebounce, le 2018-09-12 : Character creation </div>
                    <div className="commit"> fakebounce, le 2018-09-12 : Added firebase correctly, plus account name selection (Pseudo) </div>
                    <div className="commit"> fakebounce, le 2018-09-11 : Added tiles to update map </div>
                    <div className="commit"> fakebounce, le 2018-09-11 : updated gitignore </div>
                    <div className="commit"> fakebounce, le 2018-09-11 : Added Firebase and auth plugin, running as admin for now </div>
                    <div className="commit"> fakebounce, le 2018-09-11 : MAJ TODO </div>
                    <div className="commit"> fakebounce, le 2018-09-11 : Added image for transparency </div>
                    <div className="commit"> fakebounce, le 2018-09-11 : Screen ready </div>
                    <div className="commit"> FakeBounce, le 2018-09-10 : Update readme without format </div>
                    <div className="commit"> fakebounce, le 2018-09-10 : Constructed base of the website </div>
                    <div className="commit"> FakeBounce, le 2018-09-10 : Initial commit </div>
                </div>
            </div>
        );
    }
}

IsNotAuth.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
    loadUsers: PropTypes.func.isRequired,
    loadStories: PropTypes.func.isRequired,
};

export default IsNotAuth;
